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
} from "./game-types"
import { AVAILABLE_TEAMS, getTeamPlayers, getAllFreePlayers, EUROPEAN_TRANSFER_OPTIONS } from "./team-data"

// Re-export types for backward compatibility
export type { Player, Team, Position, GamePhase, PresidentialDecree, FinancialCard }

// Presidential Decrees
const PRESIDENTIAL_DECREES: Omit<PresidentialDecree, "teamId">[] = [
  {
    id: 1,
    name: "Sem Atacantes Baratos",
    description: "Não pode contratar jogadores Tier 3 nas posições de Ponta ou Centroavante",
    validate: (player) => {
      if ((player.position === "Ponta-Direita" || player.position === "Ponta-Esquerda" || player.position === "Centroavante") && player.tier === 3) {
        return false
      }
      return true
    },
    penaltyMessage: "Decreto violado! Contratação de atacante barato bloqueada.",
  },
  {
    id: 2,
    name: "Estrangeiro no Meio",
    description: "Deve contratar pelo menos um Argentino ou Uruguaio como Meia/Volante",
    validate: () => true,
    penaltyMessage: "Decreto não cumprido! Faltou estrangeiro no meio-campo.",
  },
  {
    id: 3,
    name: "Sem Tier 1",
    description: "Não pode contratar nenhum jogador de Tier 1",
    validate: (player) => player.tier !== 1,
    penaltyMessage: "Decreto violado! Contratação de jogador Tier 1 bloqueada.",
  },
  {
    id: 4,
    name: "Só Brasileiros",
    description: "Só pode contratar jogadores brasileiros",
    validate: (player) => player.nationality === "Brasileiro",
    penaltyMessage: "Decreto violado! Apenas brasileiros permitidos.",
  },
  {
    id: 5,
    name: "Juventude da Base",
    description: "Deve manter pelo menos 3 jogadores Tier 3 no elenco",
    validate: () => true,
    penaltyMessage: "Decreto não cumprido! Poucos jovens da base.",
  },
  {
    id: 6,
    name: "Economia Total",
    description: "Não pode gastar mais de 30M em contratações",
    validate: () => true,
    penaltyMessage: "Decreto não cumprido! Gastos excessivos.",
  },
  {
    id: 7,
    name: "Zaga de Aço",
    description: "Deve ter zagueiros apenas de Tier 1 ou Tier 2",
    validate: (player) => {
      if (player.position === "Zagueiro" && player.tier === 3) {
        return false
      }
      return true
    },
    penaltyMessage: "Decreto violado! Zagueiro Tier 3 não permitido.",
  },
  {
    id: 8,
    name: "Ataque Milionário",
    description: "Deve ter um Centroavante de Tier 1",
    validate: () => true,
    penaltyMessage: "Decreto não cumprido! Faltou centroavante de elite.",
  },
]

// Financial Cards
const FINANCIAL_CARDS: FinancialCard[] = [
  { id: 1, name: "Patrocínio Master", description: "+€10M de patrocínio", effect: "add", value: 10000000 },
  { id: 2, name: "Venda de Jóia", description: "+€25M por venda de jovem promessa", effect: "add", value: 25000000 },
  { id: 3, name: "Dívida Antiga", description: "-€10M por dívida antiga", effect: "subtract", value: 10000000 },
  { id: 4, name: "Multa FIFA", description: "-€15M por irregularidade", effect: "subtract", value: 15000000 },
  { id: 5, name: "Prêmio Libertadores", description: "+€20M por classificação", effect: "add", value: 20000000 },
  { id: 6, name: "Crise Financeira", description: "-€20M por crise no clube", effect: "subtract", value: 20000000 },
  { id: 7, name: "Coringa - Contratação Surpresa", description: "Jogador aleatório grátis, mas orçamento é cortado pela metade!", effect: "joker", value: 0, isJoker: true },
]

// Actions
type GameAction =
  | { type: "SET_GLOBAL_BUDGET"; budget: number }
  | { type: "ADD_MANAGER"; name: string }
  | { type: "SELECT_TEAM"; managerId: number; teamId: number }
  | { type: "START_GAME" }
  | { type: "DRAW_DECREE"; teamId: number }
  | { type: "DRAW_FINANCIAL"; teamId: number }
  | { type: "COMPLETE_SETUP"; teamId: number }
  | { type: "KEEP_PLAYER"; teamId: number }
  | { type: "SELL_PLAYER"; teamId: number; playerId: number }
  | { type: "NEXT_TEAM" }
  | { type: "START_MARKET" }
  | { type: "SELECT_PLAYER"; teamId: number; playerId: number | null }
  | { type: "CONFIRM_SELECTIONS" }
  | { type: "START_BIDDING"; player: Player; teams: number[] }
  | { type: "PLACE_BID"; teamId: number; amount: number }
  | { type: "WITHDRAW_BID"; teamId: number }
  | { type: "END_BIDDING"; winnerId: number; finalPrice: number }
  | { type: "SIGN_PLAYER"; teamId: number; playerId: number; price: number }
  | { type: "ACTIVATE_RESERVE"; teamId: number; position: Position }
  | { type: "NEXT_POSITION" }
  | { type: "END_GAME" }
  | { type: "ADD_PLAYER"; player: Omit<Player, "id"> }
  | { type: "RESET_GAME" }

function getInitialState(): GameState {
  return {
    phase: "host-setup",
    currentTeamIndex: 0,
    currentPositionIndex: 0,
    globalBudget: 50000000, // Default 50M€
    managers: [],
    teams: [],
    players: [],
    freeAgents: getAllFreePlayers(),
    positionRounds: POSITION_ROUNDS,
    soldInCurrentRound: [],
    marketSelections: {},
    roundTransferOptions: [],
    bidding: {
      player: null,
      teams: [],
      currentBids: {},
      activeTeamIndex: 0,
    },
    decreePool: PRESIDENTIAL_DECREES.map((d) => ({ ...d, teamId: 0 })),
    financialPool: FINANCIAL_CARDS.map((f) => ({ ...f })),
    usedDecrees: [],
    usedFinancials: [],
    setupComplete: [],
    gameStarted: false,
    gameEnded: false,
    auctionLosers: {},
  }
}

// Generate 3 transfer options for a position (Tier 1, 2, 3)
function generateTransferOptions(position: Position, freeAgents: Player[]): RoundTransferOption[] {
  const options: RoundTransferOption[] = []
  const positionPlayers = freeAgents.filter(p => p.position === position)
  
  // Try to get one player from each tier
  for (const tier of [1, 2, 3] as Tier[]) {
    const tierPlayers = positionPlayers.filter(p => p.tier === tier)
    if (tierPlayers.length > 0) {
      const randomPlayer = tierPlayers[Math.floor(Math.random() * tierPlayers.length)]
      options.push({ tier, player: randomPlayer })
    }
  }
  
  // If we don't have 3 options, fill with available players
  while (options.length < 3 && positionPlayers.length > options.length) {
    const usedIds = options.map(o => o.player.id)
    const available = positionPlayers.filter(p => !usedIds.includes(p.id))
    if (available.length > 0) {
      const player = available[Math.floor(Math.random() * available.length)]
      options.push({ tier: player.tier, player })
    } else {
      break
    }
  }
  
  // Add European options if available and position matches
  const europeanOptions = EUROPEAN_TRANSFER_OPTIONS.filter(p => p.position === position)
  if (europeanOptions.length > 0 && options.length < 3) {
    const euroPlayer = europeanOptions[Math.floor(Math.random() * europeanOptions.length)]
    const nextId = Math.max(...freeAgents.map(p => p.id), 1000) + 1
    options.push({
      tier: euroPlayer.tier,
      player: {
        ...euroPlayer,
        id: nextId,
        teamId: null,
        sold: false,
      }
    })
  }
  
  return options.sort((a, b) => a.tier - b.tier)
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SET_GLOBAL_BUDGET":
      return {
        ...state,
        globalBudget: action.budget,
        phase: "player-setup",
      }

    case "ADD_MANAGER": {
      const newManager: PlayerManager = {
        id: state.managers.length + 1,
        name: action.name,
        teamId: 0,
      }
      return {
        ...state,
        managers: [...state.managers, newManager],
      }
    }

    case "SELECT_TEAM": {
      const teamConfig = AVAILABLE_TEAMS.find(t => t.id === action.teamId)
      if (!teamConfig) return state

      // Check if team is already selected
      if (state.teams.some(t => t.id === action.teamId)) return state

      const teamPlayers = getTeamPlayers(action.teamId)
      
      const newTeam: Team = {
        ...teamConfig,
        initialBudget: state.globalBudget,
        currentBudget: state.globalBudget,
        presidentialDecree: null,
        financialCard: null,
        managerId: action.managerId,
        blockedPositions: [],
      }

      const updatedManagers = state.managers.map(m =>
        m.id === action.managerId ? { ...m, teamId: action.teamId } : m
      )

      // Check if all 3 managers have selected teams
      const allTeamsSelected = updatedManagers.filter(m => m.teamId !== 0).length === 3

      return {
        ...state,
        teams: [...state.teams, newTeam],
        players: [...state.players, ...teamPlayers],
        managers: updatedManagers,
        phase: allTeamsSelected ? "draw-cards" : "player-setup",
      }
    }

    case "START_GAME":
      return {
        ...state,
        phase: "draw-cards",
        gameStarted: true,
      }

    case "DRAW_DECREE": {
      const availableDecrees = state.decreePool.filter(
        (d) => !state.usedDecrees.includes(d.id)
      )
      if (availableDecrees.length === 0) return state

      const randomIndex = Math.floor(Math.random() * availableDecrees.length)
      const selectedDecree = { ...availableDecrees[randomIndex], teamId: action.teamId }

      return {
        ...state,
        teams: state.teams.map((t) =>
          t.id === action.teamId ? { ...t, presidentialDecree: selectedDecree } : t
        ),
        usedDecrees: [...state.usedDecrees, selectedDecree.id],
      }
    }

    case "DRAW_FINANCIAL": {
      const availableCards = state.financialPool.filter(
        (f) => !state.usedFinancials.includes(f.id)
      )
      if (availableCards.length === 0) return state

      const randomIndex = Math.floor(Math.random() * availableCards.length)
      const selectedCard = availableCards[randomIndex]

      let newBudget = state.teams.find((t) => t.id === action.teamId)!.currentBudget
      let newFreeAgents = [...state.freeAgents]
      let newPlayers = [...state.players]

      if (selectedCard.effect === "add") {
        newBudget += selectedCard.value
      } else if (selectedCard.effect === "subtract") {
        newBudget = Math.max(0, newBudget - selectedCard.value)
      } else if (selectedCard.isJoker) {
        // Joker: Random free agent joins, budget halved
        if (newFreeAgents.length > 0) {
          const randomPlayerIndex = Math.floor(Math.random() * newFreeAgents.length)
          const randomPlayer = { ...newFreeAgents[randomPlayerIndex], teamId: action.teamId }
          newFreeAgents = newFreeAgents.filter((_, i) => i !== randomPlayerIndex)
          newPlayers = [...newPlayers, randomPlayer]
        }
        newBudget = Math.floor(newBudget / 2)
      }

      return {
        ...state,
        teams: state.teams.map((t) =>
          t.id === action.teamId
            ? { ...t, financialCard: selectedCard, currentBudget: newBudget }
            : t
        ),
        players: newPlayers,
        freeAgents: newFreeAgents,
        usedFinancials: [...state.usedFinancials, selectedCard.id],
      }
    }

    case "COMPLETE_SETUP": {
      const newSetupComplete = [...state.setupComplete, action.teamId]
      const allComplete = newSetupComplete.length === 3

      return {
        ...state,
        setupComplete: newSetupComplete,
        phase: allComplete ? "decision" : "draw-cards",
        currentTeamIndex: allComplete ? 0 : (state.currentTeamIndex + 1) % 3,
        gameStarted: allComplete,
      }
    }

    case "KEEP_PLAYER": {
      const nextTeamIndex = (state.currentTeamIndex + 1) % 3
      const roundComplete = nextTeamIndex === 0

      if (roundComplete) {
        // Check if anyone sold, if so go to market
        if (state.soldInCurrentRound.length > 0) {
          // Generate transfer options for current position
          const currentPosition = state.positionRounds[state.currentPositionIndex]
          const options = generateTransferOptions(currentPosition, state.freeAgents)
          
          return {
            ...state,
            phase: "market",
            currentTeamIndex: 0,
            roundTransferOptions: options,
            // Clear blocked positions for new round
            teams: state.teams.map(t => ({ ...t, blockedPositions: [] })),
          }
        }
        // Otherwise, next position
        const nextPositionIndex = state.currentPositionIndex + 1
        if (nextPositionIndex >= state.positionRounds.length) {
          return {
            ...state,
            phase: "evaluation",
            gameEnded: true,
          }
        }
        return {
          ...state,
          currentPositionIndex: nextPositionIndex,
          currentTeamIndex: 0,
          soldInCurrentRound: [],
          // Clear blocked positions for new round
          teams: state.teams.map(t => ({ ...t, blockedPositions: [] })),
          auctionLosers: {},
        }
      }

      return {
        ...state,
        currentTeamIndex: nextTeamIndex,
      }
    }

    case "SELL_PLAYER": {
      const player = state.players.find((p) => p.id === action.playerId)
      if (!player) return state

      // NO OPEN MARKET: Player is removed from game, not added to free agents
      const newPlayers = state.players.map((p) =>
        p.id === action.playerId ? { ...p, teamId: null, sold: true } : p
      )
      
      const team = state.teams.find((t) => t.id === action.teamId)!
      const newBudget = team.currentBudget + player.value

      const nextTeamIndex = (state.currentTeamIndex + 1) % 3
      const roundComplete = nextTeamIndex === 0

      const newState = {
        ...state,
        players: newPlayers,
        // Don't add to free agents - player is removed from game
        teams: state.teams.map((t) =>
          t.id === action.teamId ? { ...t, currentBudget: newBudget } : t
        ),
        soldInCurrentRound: [...state.soldInCurrentRound, action.teamId],
      }

      if (roundComplete) {
        // Generate transfer options for current position
        const currentPosition = state.positionRounds[state.currentPositionIndex]
        const options = generateTransferOptions(currentPosition, state.freeAgents)
        
        return {
          ...newState,
          phase: "market",
          currentTeamIndex: 0,
          roundTransferOptions: options,
          teams: newState.teams.map(t => ({ ...t, blockedPositions: [] })),
        }
      }

      return {
        ...newState,
        currentTeamIndex: nextTeamIndex,
      }
    }

    case "START_MARKET": {
      const currentPosition = state.positionRounds[state.currentPositionIndex]
      const options = generateTransferOptions(currentPosition, state.freeAgents)
      
      return {
        ...state,
        phase: "market",
        marketSelections: {},
        roundTransferOptions: options,
      }
    }

    case "SELECT_PLAYER":
      return {
        ...state,
        marketSelections: {
          ...state.marketSelections,
          [action.teamId]: action.playerId,
        },
      }

    case "CONFIRM_SELECTIONS": {
      const selections = state.marketSelections
      const selectedPlayers: Record<number, number[]> = {}

      // Group teams by selected player
      Object.entries(selections).forEach(([teamId, playerId]) => {
        if (playerId !== null) {
          if (!selectedPlayers[playerId]) {
            selectedPlayers[playerId] = []
          }
          selectedPlayers[playerId].push(Number(teamId))
        }
      })

      // Check for conflicts (multiple teams want same player)
      const conflicts = Object.entries(selectedPlayers).filter(
        ([, teams]) => teams.length > 1
      )

      if (conflicts.length > 0) {
        // Start MANUAL bidding for first conflict
        const [playerId, teams] = conflicts[0]
        const player = state.freeAgents.find((p) => p.id === Number(playerId)) ||
                       state.roundTransferOptions.find(o => o.player.id === Number(playerId))?.player
        
        if (!player) return state

        return {
          ...state,
          phase: "bidding",
          bidding: {
            player,
            teams,
            currentBids: Object.fromEntries(teams.map((t) => [t, player.value])),
            activeTeamIndex: 0,
          },
        }
      }

      // No conflicts, process all signings
      let newState = { ...state }
      const currentPosition = state.positionRounds[state.currentPositionIndex]
      
      Object.entries(selections).forEach(([teamId, playerId]) => {
        if (playerId !== null) {
          const player = newState.freeAgents.find((p) => p.id === playerId) ||
                        newState.roundTransferOptions.find(o => o.player.id === playerId)?.player
          
          if (player) {
            const team = newState.teams.find((t) => t.id === Number(teamId))!
            if (team.currentBudget >= player.value) {
              newState = {
                ...newState,
                players: [...newState.players, { ...player, teamId: Number(teamId) }],
                freeAgents: newState.freeAgents.filter((p) => p.id !== playerId),
                teams: newState.teams.map((t) =>
                  t.id === Number(teamId)
                    ? { ...t, currentBudget: t.currentBudget - player.value }
                    : t
                ),
              }
            }
          }
        } else {
          // Team chose to use reserve (no selection)
          // Activate reserve for this position
          const teamIdNum = Number(teamId)
          const reserve = newState.players.find(
            p => p.teamId === teamIdNum && p.position === currentPosition && p.isReserva && !p.sold
          )
          if (reserve) {
            newState = {
              ...newState,
              players: newState.players.map(p =>
                p.id === reserve.id ? { ...p, activatedFromReserve: true, isReserva: false } : p
              ),
            }
          }
        }
      })

      // Move to next position
      const nextPositionIndex = newState.currentPositionIndex + 1
      if (nextPositionIndex >= newState.positionRounds.length) {
        return {
          ...newState,
          phase: "evaluation",
          gameEnded: true,
          marketSelections: {},
          soldInCurrentRound: [],
          roundTransferOptions: [],
        }
      }

      return {
        ...newState,
        phase: "decision",
        currentPositionIndex: nextPositionIndex,
        currentTeamIndex: 0,
        marketSelections: {},
        soldInCurrentRound: [],
        roundTransferOptions: [],
        auctionLosers: {},
        teams: newState.teams.map(t => ({ ...t, blockedPositions: [] })),
      }
    }

    case "PLACE_BID": {
      return {
        ...state,
        bidding: {
          ...state.bidding,
          currentBids: {
            ...state.bidding.currentBids,
            [action.teamId]:
              (state.bidding.currentBids[action.teamId] || 0) + action.amount,
          },
          activeTeamIndex: (state.bidding.activeTeamIndex + 1) % state.bidding.teams.length,
        },
      }
    }

    case "WITHDRAW_BID": {
      const remainingTeams = state.bidding.teams.filter((t) => t !== action.teamId)
      const currentPosition = state.positionRounds[state.currentPositionIndex]

      // RESERVE PENALTY: Loser is blocked from signing anyone else at this position
      // and must use their reserve
      const loserTeamId = action.teamId
      
      // Find and activate the reserve for the losing team
      let newPlayers = [...state.players]
      const reserve = newPlayers.find(
        p => p.teamId === loserTeamId && p.position === currentPosition && p.isReserva && !p.sold
      )
      
      if (reserve) {
        newPlayers = newPlayers.map(p =>
          p.id === reserve.id ? { ...p, activatedFromReserve: true, isReserva: false } : p
        )
      }

      // Update auction losers tracking
      const newAuctionLosers = {
        ...state.auctionLosers,
        [loserTeamId]: [...(state.auctionLosers[loserTeamId] || []), currentPosition],
      }

      // Block the position for the losing team
      const newTeams = state.teams.map(t =>
        t.id === loserTeamId
          ? { ...t, blockedPositions: [...t.blockedPositions, currentPosition] }
          : t
      )

      if (remainingTeams.length === 1) {
        // Winner found
        const winnerId = remainingTeams[0]
        const finalPrice = state.bidding.currentBids[winnerId]
        const player = state.bidding.player!

        return {
          ...state,
          phase: "market",
          players: [...newPlayers, { ...player, teamId: winnerId }],
          freeAgents: state.freeAgents.filter((p) => p.id !== player.id),
          teams: newTeams.map((t) =>
            t.id === winnerId
              ? { ...t, currentBudget: t.currentBudget - finalPrice }
              : t
          ),
          marketSelections: Object.fromEntries(
            Object.entries(state.marketSelections).filter(
              ([teamId]) => Number(teamId) !== winnerId && Number(teamId) !== action.teamId
            )
          ),
          bidding: {
            player: null,
            teams: [],
            currentBids: {},
            activeTeamIndex: 0,
          },
          auctionLosers: newAuctionLosers,
        }
      }

      return {
        ...state,
        players: newPlayers,
        teams: newTeams,
        bidding: {
          ...state.bidding,
          teams: remainingTeams,
          activeTeamIndex: state.bidding.activeTeamIndex % remainingTeams.length,
        },
        auctionLosers: newAuctionLosers,
      }
    }

    case "ACTIVATE_RESERVE": {
      const reserve = state.players.find(
        p => p.teamId === action.teamId && p.position === action.position && p.isReserva && !p.sold
      )
      
      if (!reserve) return state

      return {
        ...state,
        players: state.players.map(p =>
          p.id === reserve.id ? { ...p, activatedFromReserve: true, isReserva: false } : p
        ),
      }
    }

    case "SIGN_PLAYER": {
      const player = state.freeAgents.find((p) => p.id === action.playerId)
      if (!player) return state

      const team = state.teams.find((t) => t.id === action.teamId)!
      
      // Validate against presidential decree
      if (team.presidentialDecree) {
        const isValid = team.presidentialDecree.validate(player, team)
        if (!isValid) {
          return state // Block the signing
        }
      }

      if (team.currentBudget < action.price) return state

      return {
        ...state,
        players: [...state.players, { ...player, teamId: action.teamId }],
        freeAgents: state.freeAgents.filter((p) => p.id !== action.playerId),
        teams: state.teams.map((t) =>
          t.id === action.teamId
            ? { ...t, currentBudget: t.currentBudget - action.price }
            : t
        ),
      }
    }

    case "NEXT_POSITION": {
      const nextPositionIndex = state.currentPositionIndex + 1
      if (nextPositionIndex >= state.positionRounds.length) {
        return {
          ...state,
          phase: "evaluation",
          gameEnded: true,
        }
      }

      return {
        ...state,
        phase: "decision",
        currentPositionIndex: nextPositionIndex,
        currentTeamIndex: 0,
        soldInCurrentRound: [],
        marketSelections: {},
        roundTransferOptions: [],
        auctionLosers: {},
        teams: state.teams.map(t => ({ ...t, blockedPositions: [] })),
      }
    }

    case "END_GAME":
      return {
        ...state,
        phase: "evaluation",
        gameEnded: true,
      }

    case "ADD_PLAYER": {
      const newId = Math.max(...state.players.map((p) => p.id), ...state.freeAgents.map((p) => p.id)) + 1
      const newPlayer: Player = { ...action.player, id: newId }

      if (newPlayer.teamId === null) {
        return {
          ...state,
          freeAgents: [...state.freeAgents, newPlayer],
        }
      }

      return {
        ...state,
        players: [...state.players, newPlayer],
      }
    }

    case "RESET_GAME":
      return getInitialState()

    default:
      return state
  }
}

// Context
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
  getMarketPlayers: (position: Position) => Player[]
  getTransferOptions: () => RoundTransferOption[]
  formatCurrency: (value: number) => string
  validateSigning: (teamId: number, player: Player) => { valid: boolean; message?: string }
  calculateTeamScore: (teamId: number) => { grade: string; score: number; details: string }
  getManagerName: (teamId: number) => string
  isPositionBlocked: (teamId: number, position: Position) => boolean
  availableTeams: typeof AVAILABLE_TEAMS
}

const GameContext = createContext<GameContextType | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, getInitialState())

  const getCurrentTeam = () => state.teams[state.currentTeamIndex]

  const getCurrentPosition = () => state.positionRounds[state.currentPositionIndex]

  const getTeamPlayers = (teamId: number) =>
    state.players.filter((p) => p.teamId === teamId && !p.sold)

  const getTeamTitulares = (teamId: number) =>
    state.players.filter((p) => p.teamId === teamId && !p.isReserva && !p.sold)

  const getTeamReservas = (teamId: number) =>
    state.players.filter((p) => p.teamId === teamId && p.isReserva && !p.sold)

  const getPlayerForPosition = (teamId: number, position: Position) =>
    state.players.find((p) => p.teamId === teamId && p.position === position && !p.isReserva && !p.sold)

  const getReserveForPosition = (teamId: number, position: Position) =>
    state.players.find((p) => p.teamId === teamId && p.position === position && p.isReserva && !p.sold)

  const getMarketPlayers = (position: Position) =>
    state.freeAgents.filter((p) => p.position === position)

  const getTransferOptions = () => state.roundTransferOptions

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value)

  const validateSigning = (teamId: number, player: Player) => {
    const team = state.teams.find((t) => t.id === teamId)!
    
    if (team.currentBudget < player.value) {
      return { valid: false, message: "Orçamento insuficiente!" }
    }

    // Check if position is blocked due to auction loss
    if (team.blockedPositions.includes(player.position)) {
      return { valid: false, message: "Posição bloqueada! Use o reserva." }
    }

    if (team.presidentialDecree) {
      const isValid = team.presidentialDecree.validate(player, team)
      if (!isValid) {
        return { valid: false, message: team.presidentialDecree.penaltyMessage }
      }
    }

    return { valid: true }
  }

  const calculateTeamScore = (teamId: number) => {
    const team = state.teams.find((t) => t.id === teamId)!
    const teamPlayers = getTeamPlayers(teamId)
    
    // Average tier (lower is better)
    const avgTier = teamPlayers.reduce((sum, p) => sum + p.tier, 0) / teamPlayers.length
    const tierScore = ((3 - avgTier) / 2) * 40 // Max 40 points

    // Budget health
    const budgetRatio = team.currentBudget / team.initialBudget
    const budgetScore = Math.min(budgetRatio * 30, 30) // Max 30 points

    // Reserve penalty - deduct points for each activated reserve
    const activatedReserves = teamPlayers.filter(p => p.activatedFromReserve).length
    const reservePenalty = activatedReserves * 5

    // Decree compliance (simplified)
    const decreeScore = team.presidentialDecree ? 30 : 30 // Max 30 points

    const totalScore = Math.max(0, tierScore + budgetScore + decreeScore - reservePenalty)

    let grade = "C"
    if (totalScore >= 90) grade = "A+"
    else if (totalScore >= 80) grade = "A"
    else if (totalScore >= 70) grade = "B+"
    else if (totalScore >= 60) grade = "B"
    else if (totalScore >= 50) grade = "C+"

    const details = `Qualidade: ${tierScore.toFixed(0)}/40 | Finanças: ${budgetScore.toFixed(0)}/30 | Decretos: ${decreeScore}/30 | Penalidades: -${reservePenalty}`

    return { grade, score: totalScore, details }
  }

  const getManagerName = (teamId: number) => {
    const team = state.teams.find(t => t.id === teamId)
    if (!team || !team.managerId) return "Gerente"
    const manager = state.managers.find(m => m.id === team.managerId)
    return manager?.name || "Gerente"
  }

  const isPositionBlocked = (teamId: number, position: Position) => {
    const team = state.teams.find(t => t.id === teamId)
    return team?.blockedPositions.includes(position) || false
  }

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        getCurrentTeam,
        getCurrentPosition,
        getTeamPlayers,
        getTeamTitulares,
        getTeamReservas,
        getPlayerForPosition,
        getReserveForPosition,
        getMarketPlayers,
        getTransferOptions,
        formatCurrency,
        validateSigning,
        calculateTeamScore,
        getManagerName,
        isPositionBlocked,
        availableTeams: AVAILABLE_TEAMS,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}
