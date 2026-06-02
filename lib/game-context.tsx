"use client"

import React, { createContext, useContext, useReducer, ReactNode } from "react"
import {
  Player,
  Team,
  Position,
  GamePhase,
  GameState,
  PresidentialDecree,
  FinancialCard,
  BiddingState,
  RoundTransferOption,
  PlayerManager,
  POSITION_ROUNDS,
  Tier,
  FinancialHistoryEntry,
} from "./game-types"
import { AVAILABLE_TEAMS, getTeamPlayers } from "./team-data"
import { AVAILABLE_TEAMS_PL, getPLTeamPlayers } from "./team-data-pl"
import { FREE_AGENTS_POOL } from "./data/players-pool"
import { FREE_AGENTS_POOL_EUROPE } from "./data/players-pool-europe"
import { DECREES_POOL, FINANCIAL_CARDS_POOL } from "./data/cards-pool"
import { EVENTS_POOL, MILD_EVENTS, type SpecialEventDef } from "./data/events-pool"
import type { ChampionshipId, PendingSpecialEvent, SpecialEventResult } from "./game-types"

export type { Player, Team, Position, GamePhase, PresidentialDecree, FinancialCard }

// ─── Actions ─────────────────────────────────────────────────────────────────
type GameAction =
  | { type: "ADVANCE_FROM_SPLASH" }
  | { type: "LOAD_STATE"; state: GameState }
  | { type: "SET_GLOBAL_BUDGET"; budget: number; playerCount: number; championship: ChampionshipId }
  | { type: "ADD_MANAGER"; name: string }
  | { type: "SELECT_TEAM"; managerId: number; teamId: number }
  | { type: "DRAW_DECREE"; teamId: number }
  | { type: "DRAW_FINANCIAL"; teamId: number }
  | { type: "COMPLETE_SETUP"; teamId: number }
  | { type: "KEEP_PLAYER"; teamId: number }
  | { type: "SELL_PLAYER"; teamId: number; playerId: number }
  | { type: "SELECT_PLAYER"; teamId: number; playerId: number | null }
  | { type: "CONFIRM_SELECTIONS" }
  | { type: "PLACE_BID"; teamId: number; amount: number }
  | { type: "WITHDRAW_BID"; teamId: number }
  | { type: "DISMISS_SPECIAL_EVENT" }
  | { type: "RESET_GAME" }

// ─── Initial State ────────────────────────────────────────────────────────────
function getInitialState(): GameState {
  const decreePool = DECREES_POOL.map(d => ({ ...d, teamId: 0 }))
  const financialPool = FINANCIAL_CARDS_POOL.map(f => ({ ...f }))
  const freeAgents = FREE_AGENTS_POOL.map(p => ({ ...p }))

  return {
    phase: "splash",
    championship: "brasileirao",
    currentTeamIndex: 0,
    currentPositionIndex: 0,
    globalBudget: 50_000_000,
    playerCount: 3,
    managers: [],
    teams: [],
    players: [],
    freeAgents,
    positionRounds: POSITION_ROUNDS,
    soldInCurrentRound: [],
    marketSelections: {},
    roundTransferOptions: [],
    bidding: { player: null, teams: [], currentBids: {}, activeTeamIndex: 0 },
    decreePool,
    financialPool,
    usedDecrees: [],
    usedFinancials: [],
    setupComplete: [],
    gameStarted: false,
    gameEnded: false,
    auctionLosers: {},
    pendingSpecialEvent: undefined,
  }
}

// ─── Rodadas que disparam eventos especiais (índice 0-based) ─────────────────
const SPECIAL_EVENT_ROUNDS = new Set([2, 6]) // após posições 3 e 7

function pickEvent(pool: SpecialEventDef[], usedIds: Set<string>): SpecialEventDef {
  const available = pool.filter(e => !usedIds.has(e.id))
  if (available.length === 0) return pool[Math.floor(Math.random() * pool.length)]
  return available[Math.floor(Math.random() * available.length)]
}

function buildTeamResults(
  state: GameState,
  usedEventIds: Set<string>
): Record<number, SpecialEventResult> {
  const results: Record<number, SpecialEventResult> = {}
  const pool = SPECIAL_EVENT_ROUNDS.has(state.currentPositionIndex) && state.currentPositionIndex <= 3
    ? MILD_EVENTS
    : EVENTS_POOL

  for (const team of state.teams) {
    const ev = pickEvent(pool, usedEventIds)
    usedEventIds.add(ev.id)

    let budgetDelta = 0
    let playerName: string | undefined
    let injuredPosition: string | undefined

    if (ev.effect === "budget_add") budgetDelta = ev.value ?? 0
    else if (ev.effect === "budget_sub") budgetDelta = -(ev.value ?? 0)
    else if (ev.effect === "budget_pct_add") budgetDelta = Math.floor(team.initialBudget * (ev.pct ?? 0.1))
    else if (ev.effect === "budget_pct_sub") budgetDelta = -Math.floor(team.initialBudget * (ev.pct ?? 0.1))
    else if (ev.effect === "free_player") {
      const freeT3 = state.freeAgents.filter(p => p.tier === 3)
      const pick = freeT3[Math.floor(Math.random() * freeT3.length)]
      playerName = pick?.name
    }
    else if (ev.effect === "injury") {
      const titulares = state.players.filter(p => p.teamId === team.id && !p.isReserva && !p.sold)
      const pick = titulares[Math.floor(Math.random() * titulares.length)]
      if (pick) { injuredPosition = pick.position; playerName = pick.name }
    }

    results[team.id] = {
      eventId: ev.id,
      name: ev.name,
      icon: ev.icon,
      theme: ev.theme,
      description: ev.description,
      budgetDelta,
      playerName,
      injuredPosition,
    }
  }
  return results
}

// ─── Market Generation (bug-fixed: strict 1×T1, 1×T2, 1×T3, no repeats) ────
function generateTransferOptions(position: Position, freeAgents: Player[]): RoundTransferOption[] {
  const byTier = (tier: Tier) =>
    freeAgents.filter(p => p.position === position && p.tier === tier && !p.sold)

  const pickOne = (pool: Player[], usedIds: number[]): Player | null => {
    const available = pool.filter(p => !usedIds.includes(p.id))
    if (available.length === 0) return null
    return available[Math.floor(Math.random() * available.length)]
  }

  const options: RoundTransferOption[] = []
  const usedIds: number[] = []

  for (const tier of [1, 2, 3] as Tier[]) {
    const pick = pickOne(byTier(tier), usedIds)
    if (pick) {
      options.push({ tier, player: pick })
      usedIds.push(pick.id)
    }
  }

  return options
}

// ─── Reducer ──────────────────────────────────────────────────────────────────
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "ADVANCE_FROM_SPLASH":
      return { ...state, phase: "host-setup" }

    case "LOAD_STATE":
      return action.state

    case "SET_GLOBAL_BUDGET": {
      // Troca o pool de agentes livres conforme o campeonato
      const pool = action.championship === "premier-league"
        ? FREE_AGENTS_POOL_EUROPE.map(p => ({ ...p }))
        : FREE_AGENTS_POOL.map(p => ({ ...p }))
      return {
        ...state,
        globalBudget: action.budget,
        playerCount: action.playerCount,
        championship: action.championship,
        freeAgents: pool,
        phase: "player-setup",
      }
    }

    case "ADD_MANAGER": {
      const newManager: PlayerManager = { id: state.managers.length + 1, name: action.name, teamId: 0 }
      return { ...state, managers: [...state.managers, newManager] }
    }

    case "SELECT_TEAM": {
      const allTeams = state.championship === "premier-league" ? AVAILABLE_TEAMS_PL : AVAILABLE_TEAMS
      const teamConfig = allTeams.find(t => t.id === action.teamId)
      if (!teamConfig) return state
      if (state.teams.some(t => t.id === action.teamId)) return state

      const teamPlayers = state.championship === "premier-league"
        ? getPLTeamPlayers(action.teamId)
        : getTeamPlayers(action.teamId)
      const newTeam: Team = {
        ...teamConfig,
        initialBudget: state.globalBudget,
        currentBudget: state.globalBudget,
        presidentialDecree: null,
        financialCard: null,
        managerId: action.managerId,
        blockedPositions: [],
        financialHistory: [],
      }
      const updatedManagers = state.managers.map(m =>
        m.id === action.managerId ? { ...m, teamId: action.teamId } : m
      )
      const allSelected = updatedManagers.filter(m => m.teamId !== 0).length === state.playerCount

      // Remove do mercado livre qualquer jogador cujo clube de origem é o time recém-selecionado
      const filteredFreeAgents = state.freeAgents.filter(
        p => !p.sourceClub || p.sourceClub !== teamConfig.name
      )

      return {
        ...state,
        teams: [...state.teams, newTeam],
        players: [...state.players, ...teamPlayers],
        freeAgents: filteredFreeAgents,
        managers: updatedManagers,
        phase: allSelected ? "draw-cards" : "player-setup",
      }
    }

    case "DRAW_DECREE": {
      const available = state.decreePool.filter(d => !state.usedDecrees.includes(d.id))
      if (available.length === 0) return state
      const decree = { ...available[Math.floor(Math.random() * available.length)], teamId: action.teamId }
      return {
        ...state,
        teams: state.teams.map(t => t.id === action.teamId ? { ...t, presidentialDecree: decree } : t),
        usedDecrees: [...state.usedDecrees, decree.id],
      }
    }

    case "DRAW_FINANCIAL": {
      const available = state.financialPool.filter(f => !state.usedFinancials.includes(f.id))
      if (available.length === 0) return state
      const card = available[Math.floor(Math.random() * available.length)]

      let newBudget = state.teams.find(t => t.id === action.teamId)!.currentBudget
      let newFreeAgents = [...state.freeAgents]
      let newPlayers = [...state.players]
      let jokerPlayer: Player | undefined

      if (card.effect === "add") {
        newBudget += card.value
      } else if (card.effect === "subtract") {
        newBudget = Math.max(0, newBudget - card.value)
      } else if (card.isJoker) {
        if (newFreeAgents.length > 0) {
          const idx = Math.floor(Math.random() * newFreeAgents.length)
          jokerPlayer = { ...newFreeAgents[idx], teamId: action.teamId }
          newFreeAgents = newFreeAgents.filter((_, i) => i !== idx)
          newPlayers = [...newPlayers, jokerPlayer]
        }
        newBudget = Math.floor(newBudget / 2)
      }

      const entry: FinancialHistoryEntry = {
        type: "financial_card",
        playerName: card.name,
        position: "Goleiro", // placeholder for card entries
        amount: card.effect === "add" ? card.value : card.effect === "subtract" ? -card.value : 0,
        timestamp: Date.now(),
        details: card.description,
      }

      return {
        ...state,
        teams: state.teams.map(t =>
          t.id === action.teamId
            ? { ...t, financialCard: card, currentBudget: newBudget, financialHistory: [...t.financialHistory, entry] }
            : t
        ),
        players: newPlayers,
        freeAgents: newFreeAgents,
        usedFinancials: [...state.usedFinancials, card.id],
      }
    }

    case "COMPLETE_SETUP": {
      const completed = [...state.setupComplete, action.teamId]
      const allDone = completed.length === state.playerCount
      return {
        ...state,
        setupComplete: completed,
        phase: allDone ? "decision" : "draw-cards",
        currentTeamIndex: allDone ? 0 : (state.currentTeamIndex + 1) % state.playerCount,
        gameStarted: allDone,
      }
    }

    case "KEEP_PLAYER": {
      const next = (state.currentTeamIndex + 1) % state.playerCount
      const roundDone = next === 0

      if (roundDone) {
        if (state.soldInCurrentRound.length > 0) {
          const pos = state.positionRounds[state.currentPositionIndex]
          return {
            ...state,
            phase: "market",
            currentTeamIndex: 0,
            roundTransferOptions: generateTransferOptions(pos, state.freeAgents),
            teams: state.teams.map(t => ({ ...t, blockedPositions: [] })),
          }
        }
        const nextIdx = state.currentPositionIndex + 1
        if (nextIdx >= state.positionRounds.length) return { ...state, phase: "evaluation", gameEnded: true }
        return {
          ...state,
          currentPositionIndex: nextIdx,
          currentTeamIndex: 0,
          soldInCurrentRound: [],
          teams: state.teams.map(t => ({ ...t, blockedPositions: [] })),
          auctionLosers: {},
        }
      }
      return { ...state, currentTeamIndex: next }
    }

    case "SELL_PLAYER": {
      const player = state.players.find(p => p.id === action.playerId)
      if (!player) return state
      const team = state.teams.find(t => t.id === action.teamId)!

      const entry: FinancialHistoryEntry = {
        type: "sale",
        playerName: player.name,
        position: player.position,
        amount: player.value,
        timestamp: Date.now(),
      }
      const newPlayers = state.players.map(p => p.id === action.playerId ? { ...p, teamId: null, sold: true } : p)
      const next = (state.currentTeamIndex + 1) % state.playerCount
      const roundDone = next === 0

      const mid = {
        ...state,
        players: newPlayers,
        teams: state.teams.map(t =>
          t.id === action.teamId
            ? { ...t, currentBudget: team.currentBudget + player.value, financialHistory: [...t.financialHistory, entry] }
            : t
        ),
        soldInCurrentRound: [...state.soldInCurrentRound, action.teamId],
      }

      if (roundDone) {
        const pos = mid.positionRounds[mid.currentPositionIndex]
        return {
          ...mid,
          phase: "market",
          currentTeamIndex: 0,
          roundTransferOptions: generateTransferOptions(pos, mid.freeAgents),
          teams: mid.teams.map(t => ({ ...t, blockedPositions: [] })),
        }
      }
      return { ...mid, currentTeamIndex: next }
    }

    case "SELECT_PLAYER":
      return { ...state, marketSelections: { ...state.marketSelections, [action.teamId]: action.playerId } }

    case "CONFIRM_SELECTIONS": {
      const sels = state.marketSelections
      const grouped: Record<number, number[]> = {}
      Object.entries(sels).forEach(([tid, pid]) => {
        if (pid !== null) {
          if (!grouped[pid]) grouped[pid] = []
          grouped[pid].push(Number(tid))
        }
      })

      const conflicts = Object.entries(grouped).filter(([, teams]) => teams.length > 1)
      if (conflicts.length > 0) {
        const [pidStr, teams] = conflicts[0]
        const pid = Number(pidStr)
        const player =
          state.freeAgents.find(p => p.id === pid) ||
          state.roundTransferOptions.find(o => o.player.id === pid)?.player
        if (!player) return state
        return {
          ...state,
          phase: "bidding",
          bidding: {
            player,
            teams,
            currentBids: Object.fromEntries(teams.map(t => [t, player.value])),
            activeTeamIndex: 0,
          },
        }
      }

      // No conflicts – process all signings
      let ns = { ...state }
      const pos = state.positionRounds[state.currentPositionIndex]

      Object.entries(sels).forEach(([tidStr, pid]) => {
        const tid = Number(tidStr)
        if (pid !== null) {
          const pl =
            ns.freeAgents.find(p => p.id === pid) ||
            ns.roundTransferOptions.find(o => o.player.id === pid)?.player
          if (!pl) return
          const team = ns.teams.find(t => t.id === tid)!
          if (team.currentBudget < pl.value) return
          const entry: FinancialHistoryEntry = {
            type: "signing",
            playerName: pl.name,
            position: pl.position,
            amount: pl.value,
            timestamp: Date.now(),
          }
          ns = {
            ...ns,
            players: [...ns.players, { ...pl, teamId: tid }],
            freeAgents: ns.freeAgents.filter(p => p.id !== pid),
            teams: ns.teams.map(t =>
              t.id === tid
                ? { ...t, currentBudget: t.currentBudget - pl.value, financialHistory: [...t.financialHistory, entry] }
                : t
            ),
          }
        } else {
          const reserve = ns.players.find(p => p.teamId === tid && p.position === pos && p.isReserva && !p.sold)
          if (reserve) {
            ns = { ...ns, players: ns.players.map(p => p.id === reserve.id ? { ...p, activatedFromReserve: true, isReserva: false } : p) }
          }
        }
      })

      const nextIdx = ns.currentPositionIndex + 1
      if (nextIdx >= ns.positionRounds.length) {
        return { ...ns, phase: "evaluation", gameEnded: true, marketSelections: {}, soldInCurrentRound: [], roundTransferOptions: [] }
      }

      const baseNext = {
        ...ns,
        currentPositionIndex: nextIdx,
        currentTeamIndex: 0,
        marketSelections: {},
        soldInCurrentRound: [],
        roundTransferOptions: [],
        auctionLosers: {},
        teams: ns.teams.map(t => ({ ...t, blockedPositions: [] })),
      }

      // Verificar se esta é uma rodada de evento especial (usando nextIdx-1 = posição que acabou)
      if (SPECIAL_EVENT_ROUNDS.has(ns.currentPositionIndex)) {
        const usedIds = new Set<string>()
        const teamResults = buildTeamResults(ns, usedIds)
        const pending: PendingSpecialEvent = { roundIndex: ns.currentPositionIndex, teamResults }
        return { ...baseNext, phase: "special-event", pendingSpecialEvent: pending }
      }

      return { ...baseNext, phase: "decision" }
    }

    case "DISMISS_SPECIAL_EVENT": {
      const pending = state.pendingSpecialEvent
      if (!pending) return { ...state, phase: "decision" }

      let ns = { ...state }

      // Aplicar efeitos de todos os times
      for (const [tidStr, result] of Object.entries(pending.teamResults)) {
        const tid = Number(tidStr)
        const team = ns.teams.find(t => t.id === tid)
        if (!team) continue

        // Efeito de orçamento
        if (result.budgetDelta !== 0) {
          const entry: FinancialHistoryEntry = {
            type: "financial_card",
            playerName: result.name,
            position: "Goleiro",
            amount: result.budgetDelta,
            timestamp: Date.now(),
            details: result.description,
          }
          ns = {
            ...ns,
            teams: ns.teams.map(t =>
              t.id === tid
                ? { ...t, currentBudget: Math.max(0, t.currentBudget + result.budgetDelta), financialHistory: [...t.financialHistory, entry] }
                : t
            ),
          }
        }

        // Revelação da base — jogador T3 grátis
        if (result.eventId === "revelacao" && result.playerName) {
          const freePlayer = ns.freeAgents.find(p => p.name === result.playerName && p.tier === 3)
          if (freePlayer) {
            ns = {
              ...ns,
              players: [...ns.players, { ...freePlayer, teamId: tid }],
              freeAgents: ns.freeAgents.filter(p => p.id !== freePlayer.id),
            }
          }
        }

        // Lesão — bloqueia a posição (reserva ativa)
        if (result.eventId === "lesao" && result.injuredPosition) {
          const pos = result.injuredPosition as import("./game-types").Position
          // Marcar o titular como lesionado (sold=true) e ativar reserva
          const injuredPlayer = ns.players.find(p => p.teamId === tid && p.position === pos && !p.isReserva && !p.sold)
          const reserve = ns.players.find(p => p.teamId === tid && p.position === pos && p.isReserva && !p.sold)
          if (injuredPlayer) {
            ns = {
              ...ns,
              players: ns.players.map(p => {
                if (p.id === injuredPlayer.id) return { ...p, sold: true }
                if (reserve && p.id === reserve.id) return { ...p, activatedFromReserve: true, isReserva: false, lostAuction: true }
                return p
              }),
            }
          }
        }
      }

      return { ...ns, phase: "decision", pendingSpecialEvent: undefined }
    }

    case "PLACE_BID": {
      // O novo lance deve superar o lance mais alto atual
      const highestBid = Math.max(...Object.values(state.bidding.currentBids))
      const newBid = highestBid + action.amount
      return {
        ...state,
        bidding: {
          ...state.bidding,
          currentBids: { ...state.bidding.currentBids, [action.teamId]: newBid },
          activeTeamIndex: (state.bidding.activeTeamIndex + 1) % state.bidding.teams.length,
        },
      }
    }

    case "WITHDRAW_BID": {
      const remaining = state.bidding.teams.filter(t => t !== action.teamId)
      const pos = state.positionRounds[state.currentPositionIndex]
      const player = state.bidding.player!

      const lossEntry: FinancialHistoryEntry = {
        type: "auction_loss",
        playerName: player.name,
        position: player.position,
        amount: state.bidding.currentBids[action.teamId] || player.value,
        timestamp: Date.now(),
      }

      let newPlayers = [...state.players]
      const reserve = newPlayers.find(p => p.teamId === action.teamId && p.position === pos && p.isReserva && !p.sold)
      if (reserve) {
        newPlayers = newPlayers.map(p =>
          p.id === reserve.id ? { ...p, activatedFromReserve: true, isReserva: false, lostAuction: true } : p
        )
      }

      const newAuctionLosers = {
        ...state.auctionLosers,
        [action.teamId]: [...(state.auctionLosers[action.teamId] || []), pos],
      }
      let newTeams = state.teams.map(t =>
        t.id === action.teamId
          ? { ...t, blockedPositions: [...t.blockedPositions, pos], financialHistory: [...t.financialHistory, lossEntry] }
          : t
      )

      if (remaining.length === 1) {
        const winnerId = remaining[0]
        const finalPrice = state.bidding.currentBids[winnerId]
        const winEntry: FinancialHistoryEntry = {
          type: "auction_win",
          playerName: player.name,
          position: player.position,
          amount: finalPrice,
          timestamp: Date.now(),
        }

        // Estado base após resolver o leilão (vencedor leva o jogador, perdedor fica com reserva)
        let ns: GameState = {
          ...state,
          players: [...newPlayers, { ...player, teamId: winnerId }],
          freeAgents: state.freeAgents.filter(p => p.id !== player.id),
          teams: newTeams.map(t =>
            t.id === winnerId
              ? { ...t, currentBudget: t.currentBudget - finalPrice, financialHistory: [...t.financialHistory, winEntry] }
              : t
          ),
          bidding: { player: null, teams: [], currentBids: {}, activeTeamIndex: 0 },
          auctionLosers: newAuctionLosers,
        }

        // Processar seleções restantes (times que não participaram do leilão já haviam escolhido)
        const remainingSelections = Object.fromEntries(
          Object.entries(state.marketSelections).filter(
            ([tid]) => Number(tid) !== winnerId && Number(tid) !== action.teamId
          )
        )

        for (const [tidStr, pid] of Object.entries(remainingSelections)) {
          const tid = Number(tidStr)
          if (pid !== null) {
            const pl =
              ns.freeAgents.find(p => p.id === pid) ||
              ns.roundTransferOptions.find(o => o.player.id === pid)?.player
            if (!pl) continue
            const team = ns.teams.find(t => t.id === tid)
            if (!team || team.currentBudget < pl.value) continue
            const signingEntry: FinancialHistoryEntry = {
              type: "signing",
              playerName: pl.name,
              position: pl.position,
              amount: pl.value,
              timestamp: Date.now(),
            }
            ns = {
              ...ns,
              players: [...ns.players, { ...pl, teamId: tid }],
              freeAgents: ns.freeAgents.filter(p => p.id !== pid),
              teams: ns.teams.map(t =>
                t.id === tid
                  ? { ...t, currentBudget: t.currentBudget - pl.value, financialHistory: [...t.financialHistory, signingEntry] }
                  : t
              ),
            }
          } else {
            // Time escolheu usar o reserva
            const teamReserve = ns.players.find(
              p => p.teamId === tid && p.position === pos && p.isReserva && !p.sold
            )
            if (teamReserve) {
              ns = {
                ...ns,
                players: ns.players.map(p =>
                  p.id === teamReserve.id ? { ...p, activatedFromReserve: true, isReserva: false } : p
                ),
              }
            }
          }
        }

        // Avançar para a próxima posição (ou evento especial / avaliação)
        const nextIdx = ns.currentPositionIndex + 1
        if (nextIdx >= ns.positionRounds.length) {
          return {
            ...ns,
            phase: "evaluation",
            gameEnded: true,
            marketSelections: {},
            soldInCurrentRound: [],
            roundTransferOptions: [],
          }
        }

        const baseNext: GameState = {
          ...ns,
          phase: "decision",
          currentPositionIndex: nextIdx,
          currentTeamIndex: 0,
          marketSelections: {},
          soldInCurrentRound: [],
          roundTransferOptions: [],
          auctionLosers: {},
          teams: ns.teams.map(t => ({ ...t, blockedPositions: [] })),
        }

        if (SPECIAL_EVENT_ROUNDS.has(ns.currentPositionIndex)) {
          const usedIds = new Set<string>()
          const teamResults = buildTeamResults(ns, usedIds)
          return {
            ...baseNext,
            phase: "special-event",
            pendingSpecialEvent: { roundIndex: ns.currentPositionIndex, teamResults },
          }
        }

        return baseNext
      }

      return {
        ...state,
        players: newPlayers,
        teams: newTeams,
        bidding: {
          ...state.bidding,
          teams: remaining,
          activeTeamIndex: state.bidding.activeTeamIndex % remaining.length,
        },
        auctionLosers: newAuctionLosers,
      }
    }

    case "RESET_GAME":
      return getInitialState()

    default:
      return state
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
interface GameContextType {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  getCurrentTeam: () => Team | undefined
  getCurrentPosition: () => Position
  getTeamPlayers: (teamId: number) => Player[]
  getTeamTitulares: (teamId: number) => Player[]
  getTeamReservas: (teamId: number) => Player[]
  getPlayerForPosition: (teamId: number, position: Position) => Player | undefined
  getReserveForPosition: (teamId: number, position: Position) => Player | undefined
  getTransferOptions: () => RoundTransferOption[]
  formatCurrency: (value: number) => string
  validateSigning: (teamId: number, player: Player) => { valid: boolean; message?: string }
  calculateTeamScore: (teamId: number) => { grade: string; score: number; details: string }
  getManagerName: (teamId: number) => string
  isPositionBlocked: (teamId: number, position: Position) => boolean
  getFinancialHistory: (teamId: number) => FinancialHistoryEntry[]
  exportSquadText: (teamId: number) => string
  availableTeams: typeof AVAILABLE_TEAMS
  championship: ChampionshipId
}

const GameContext = createContext<GameContextType | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, getInitialState())

  const getCurrentTeam = () => state.teams[state.currentTeamIndex]
  const getCurrentPosition = () => state.positionRounds[state.currentPositionIndex]

  const getTeamPlayers = (teamId: number) => state.players.filter(p => p.teamId === teamId && !p.sold)
  const getTeamTitulares = (teamId: number) => state.players.filter(p => p.teamId === teamId && !p.isReserva && !p.sold)
  const getTeamReservas = (teamId: number) => state.players.filter(p => p.teamId === teamId && p.isReserva && !p.sold)
  const getPlayerForPosition = (teamId: number, position: Position) =>
    state.players.find(p => p.teamId === teamId && p.position === position && !p.isReserva && !p.sold)
  const getReserveForPosition = (teamId: number, position: Position) =>
    state.players.find(p => p.teamId === teamId && p.position === position && p.isReserva && !p.sold)
  const getTransferOptions = () => state.roundTransferOptions

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "EUR", notation: "compact", maximumFractionDigits: 1 }).format(value)

  const validateSigning = (teamId: number, player: Player) => {
    const team = state.teams.find(t => t.id === teamId)!
    if (team.currentBudget < player.value) return { valid: false, message: "Orçamento insuficiente!" }
    if (team.blockedPositions.includes(player.position)) return { valid: false, message: "Posição bloqueada! Use o reserva." }
    if (team.presidentialDecree) {
      const ok = team.presidentialDecree.validate(player, team)
      if (!ok) return { valid: false, message: team.presidentialDecree.penaltyMessage }
    }
    return { valid: true }
  }

  const calculateTeamScore = (teamId: number) => {
    const team = state.teams.find(t => t.id === teamId)!
    const players = getTeamPlayers(teamId)
    if (players.length === 0) return { grade: "C", score: 0, details: "Sem jogadores" }

    const avgTier = players.reduce((s, p) => s + p.tier, 0) / players.length
    const tierScore = ((3 - avgTier) / 2) * 40
    const budgetRatio = team.currentBudget / team.initialBudget
    const budgetScore = Math.min(budgetRatio * 30, 30)
    const penalties = players.filter(p => p.activatedFromReserve).length * 5
    const total = Math.max(0, tierScore + budgetScore + 30 - penalties)

    let grade = "C"
    if (total >= 90) grade = "A+"
    else if (total >= 80) grade = "A"
    else if (total >= 70) grade = "B+"
    else if (total >= 60) grade = "B"
    else if (total >= 50) grade = "C+"

    return {
      grade,
      score: total,
      details: `Qualidade: ${tierScore.toFixed(0)}/40 | Finanças: ${budgetScore.toFixed(0)}/30 | Decretos: 30/30 | Penalidades: -${penalties}`,
    }
  }

  const getManagerName = (teamId: number) => {
    const team = state.teams.find(t => t.id === teamId)
    if (!team?.managerId) return "Gerente"
    return state.managers.find(m => m.id === team.managerId)?.name || "Gerente"
  }

  const isPositionBlocked = (teamId: number, position: Position) =>
    state.teams.find(t => t.id === teamId)?.blockedPositions.includes(position) ?? false

  const getFinancialHistory = (teamId: number) =>
    state.teams.find(t => t.id === teamId)?.financialHistory ?? []

  const exportSquadText = (teamId: number): string => {
    const team = state.teams.find(t => t.id === teamId)
    if (!team) return ""
    const { grade, score } = calculateTeamScore(teamId)
    const players = getTeamPlayers(teamId)
    const history = getFinancialHistory(teamId)
    const wins = history.filter(h => h.type === "auction_win")
    const losses = history.filter(h => h.type === "auction_loss")
    const sales = history.filter(h => h.type === "sale")

    let t = `⚽ RECONSTRUÇÃO: ${team.name.toUpperCase()}\n`
    t += `👤 Gerente: ${getManagerName(teamId)}\n`
    t += `🏆 Nota Final: ${grade} (${score.toFixed(0)} pts)\n`
    t += `💰 Orçamento Final: ${formatCurrency(team.currentBudget)}\n\n`
    t += `📋 ELENCO FINAL:\n`
    players.forEach(p => {
      const tag = p.lostAuction ? " [RESERVA-LEILÃO]" : p.activatedFromReserve ? " [RESERVA]" : ""
      t += `• ${p.position}: ${p.name} (T${p.tier})${tag}\n`
    })
    if (wins.length) { t += `\n✅ LEILÕES VENCIDOS (${wins.length}):\n`; wins.forEach(h => { t += `  ✓ ${h.playerName} — ${formatCurrency(h.amount)}\n` }) }
    if (losses.length) { t += `\n❌ LEILÕES PERDIDOS (${losses.length}):\n`; losses.forEach(h => { t += `  ✗ ${h.playerName}\n` }) }
    if (sales.length) { t += `\n💸 VENDAS (${sales.length}):\n`; sales.forEach(h => { t += `  + ${h.playerName} — ${formatCurrency(h.amount)}\n` }) }
    if (team.presidentialDecree) t += `\n📜 DECRETO: ${team.presidentialDecree.name}\n`
    t += `\n#Reconstrução #SportResenha`
    return t
  }

  const availableTeams = state.championship === "premier-league" ? AVAILABLE_TEAMS_PL : AVAILABLE_TEAMS

  return (
    <GameContext.Provider value={{
      state, dispatch,
      getCurrentTeam, getCurrentPosition,
      getTeamPlayers, getTeamTitulares, getTeamReservas,
      getPlayerForPosition, getReserveForPosition,
      getTransferOptions, formatCurrency, validateSigning,
      calculateTeamScore, getManagerName, isPositionBlocked,
      getFinancialHistory, exportSquadText,
      availableTeams,
      championship: state.championship,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error("useGame must be used within a GameProvider")
  return ctx
}
