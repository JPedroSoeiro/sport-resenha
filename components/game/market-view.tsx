"use client"

import { useState } from "react"
import { useGame, type Player } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check, DollarSign, AlertTriangle, Flag, Shield, Ban, UserCheck, ChevronRight } from "lucide-react"
import { POSITION_LABELS } from "@/lib/game-types"
import { cn } from "@/lib/utils"

const TIER_STYLE = {
  1: {
    border: "border-amber-500/40",
    selectedBorder: "border-amber-500 ring-2 ring-amber-500/40",
    badge: "bg-amber-500/20 text-amber-500 border-amber-500/30 dark:text-amber-400",
    value: "text-amber-500 dark:text-amber-400",
    label: "Veterano de Grife",
    accent: "bg-amber-500/10",
  },
  2: {
    border: "border-slate-400/30",
    selectedBorder: "border-primary ring-2 ring-primary/30",
    badge: "bg-slate-400/20 text-slate-600 border-slate-400/30 dark:text-slate-300",
    value: "text-slate-600 dark:text-slate-300",
    label: "Joia Promissora",
    accent: "bg-slate-400/10",
  },
  3: {
    border: "border-orange-700/30",
    selectedBorder: "border-orange-600 ring-2 ring-orange-500/30",
    badge: "bg-orange-800/20 text-orange-700 border-orange-700/30 dark:text-orange-400",
    value: "text-orange-700 dark:text-orange-400",
    label: "Operário",
    accent: "bg-orange-800/10",
  },
} as const

interface PlayerCardProps {
  player: Player
  isSelected: boolean
  onSelect: () => void
  canAfford: boolean
  blockMsg?: string
}

function PlayerMarketCard({ player, isSelected, onSelect, canAfford, blockMsg }: PlayerCardProps) {
  const { formatCurrency } = useGame()
  const ts = TIER_STYLE[player.tier as 1 | 2 | 3]
  const disabled = !canAfford || !!blockMsg

  return (
    <div
      onClick={() => !disabled && onSelect()}
      className={cn(
        "relative rounded-xl border-2 p-5 transition-all select-none",
        isSelected
          ? ts.selectedBorder + " bg-card"
          : disabled
          ? "border-border/40 bg-card/50 cursor-not-allowed opacity-55"
          : cn("cursor-pointer bg-card hover:border-primary/40", ts.border)
      )}
    >
      {/* Tier label — inline no topo do card */}
      <div className="flex items-center justify-between mb-3">
        <div className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold border", ts.badge)}>
          TIER {player.tier} — {ts.label.toUpperCase()}
        </div>
        {isSelected && (
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
            <Check className="w-3 h-3 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Blocked overlay */}
      {blockMsg && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-xl gap-1">
          <Ban className="w-7 h-7 text-destructive" />
          <span className="text-[10px] font-bold text-destructive uppercase text-center px-2">{blockMsg}</span>
        </div>
      )}

      <div className="mb-3 mt-2">
        <h4 className="font-bold text-foreground text-lg leading-tight">{player.name}</h4>
        <p className="text-xs text-muted-foreground">{POSITION_LABELS[player.position]}</p>
      </div>

      <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Flag className="w-3 h-3" />{player.nationality}</span>
        <span className={cn("flex items-center gap-1", ts.value)}><Shield className="w-3 h-3" />{player.category}</span>
      </div>

      <div className={cn("flex items-center justify-between p-3 rounded-lg", ts.accent, "border border-border/40")}>
        <span className="text-xs text-muted-foreground">Valor</span>
        <span className={cn("font-bold text-lg", canAfford ? ts.value : "text-destructive")}>
          {formatCurrency(player.value)}
        </span>
      </div>
    </div>
  )
}

export function MarketView() {
  const {
    state, dispatch,
    getCurrentPosition, getTransferOptions, getReserveForPosition,
    formatCurrency, validateSigning, getManagerName, isPositionBlocked,
  } = useGame()

  const [selections, setSelections] = useState<Record<number, number | null>>({})
  const [teamIdx, setTeamIdx] = useState(0)

  const currentPosition = getCurrentPosition()
  const options = getTransferOptions()
  const teamsSold = state.soldInCurrentRound
  const teamsNeeding = state.teams.filter(t => teamsSold.includes(t.id))

  if (teamsNeeding.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 screen-enter">
        <div className="text-center max-w-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary border border-border mb-5">
            <ShoppingCart className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">Nenhuma Venda</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Nenhum time vendeu o seu {POSITION_LABELS[currentPosition]}
          </p>
          <Button onClick={() => dispatch({ type: "CONFIRM_SELECTIONS" })}>
            Próxima Posição <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    )
  }

  const currentTeam = teamsNeeding[teamIdx]
  const blocked = isPositionBlocked(currentTeam.id, currentPosition)
  const reserve = getReserveForPosition(currentTeam.id, currentPosition)

  if (blocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 screen-enter">
        <div className="text-center max-w-sm">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-destructive/10 border border-destructive/30 mb-5">
            <Ban className="w-10 h-10 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
            PENALIDADE
          </h2>
          <p className="text-sm text-muted-foreground mb-2">
            <span className="font-bold text-foreground">{currentTeam.name}</span> perdeu o leilão e está bloqueado.
          </p>
          {reserve && (
            <div className="p-4 rounded-xl bg-card border border-border mb-5 text-left">
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-foreground">Reserva Ativado Automaticamente</span>
              </div>
              <p className="font-semibold text-foreground">{reserve.name}</p>
              <p className="text-xs text-muted-foreground">{POSITION_LABELS[reserve.position]} — Tier {reserve.tier}</p>
            </div>
          )}
          <Button
            onClick={() => {
              if (teamIdx < teamsNeeding.length - 1) setTeamIdx(i => i + 1)
              else dispatch({ type: "CONFIRM_SELECTIONS" })
            }}
            className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold"
          >
            Continuar <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    )
  }

  const handleSelect = (pid: number) =>
    setSelections(s => ({ ...s, [currentTeam.id]: s[currentTeam.id] === pid ? null : pid }))

  const handleReserve = () => setSelections(s => ({ ...s, [currentTeam.id]: null }))

  const handleConfirm = () => {
    if (teamIdx < teamsNeeding.length - 1) {
      setTeamIdx(i => i + 1)
    } else {
      Object.entries(selections).forEach(([tid, pid]) =>
        dispatch({ type: "SELECT_PLAYER", teamId: Number(tid), playerId: pid })
      )
      dispatch({ type: "CONFIRM_SELECTIONS" })
    }
  }

  const sel = selections[currentTeam.id]

  return (
    <div className="flex flex-col min-h-[400px] p-5 screen-enter">
      {/* Header */}
      <div className="text-center mb-5">
        <div className="flex items-center justify-center gap-2 mb-1">
          <ShoppingCart className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-oswald)" }}>
            MERCADO DE TRANSFERÊNCIAS
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Posição: <span className="font-semibold text-foreground">{POSITION_LABELS[currentPosition]}</span>
        </p>
      </div>

      {/* Current team info */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl border-2"
          style={{
            borderColor: currentTeam.primaryColor === "#1a1a1a" ? "#444" : currentTeam.primaryColor,
            backgroundColor: `${currentTeam.primaryColor}14`,
          }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm border-2"
            style={{
              backgroundColor: currentTeam.primaryColor,
              color: currentTeam.secondaryColor,
              borderColor: currentTeam.primaryColor === "#1a1a1a" ? "#555" : currentTeam.primaryColor,
            }}
          >
            {currentTeam.shortName}
          </div>
          <div>
            <p className="font-bold text-foreground text-sm">{currentTeam.name}</p>
            <p className="text-[11px] text-muted-foreground">{getManagerName(currentTeam.id)}</p>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-primary" />
              <span className="text-sm text-primary font-bold">{formatCurrency(currentTeam.currentBudget)}</span>
            </div>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">Time {teamIdx + 1}/{teamsNeeding.length}</span>
      </div>

      {/* 3 Transfer options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full mb-5">
        {options.map(opt => {
          const val = validateSigning(currentTeam.id, opt.player)
          return (
            <PlayerMarketCard
              key={opt.player.id}
              player={opt.player}
              isSelected={sel === opt.player.id}
              onSelect={() => handleSelect(opt.player.id)}
              canAfford={currentTeam.currentBudget >= opt.player.value}
              blockMsg={!val.valid ? val.message : undefined}
            />
          )
        })}
      </div>

      {/* Reserve option */}
      {reserve && (
        <div className="max-w-4xl mx-auto w-full mb-4 p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <UserCheck className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground">Usar Reserva: {reserve.name}</p>
              <p className="text-xs text-muted-foreground">Tier {reserve.tier} — Sem custo adicional</p>
            </div>
          </div>
          <Button
            onClick={handleReserve}
            variant="outline"
            size="sm"
            className={cn(sel === null && "border-amber-500 text-amber-500 bg-amber-500/10")}
          >
            <UserCheck className="w-4 h-4 mr-1" />
            Selecionar
          </Button>
        </div>
      )}

      {/* Confirm + warning */}
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center gap-3">
        <Button onClick={handleConfirm} className="h-11 px-8 font-bold text-base">
          <Check className="w-4 h-4 mr-2" />
          Confirmar Escolha
        </Button>
        <div className="p-3 rounded-lg bg-amber-500/8 border border-amber-500/25 max-w-xl text-center">
          <div className="flex items-start gap-2 text-left">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-600 dark:text-amber-400">
              <strong>Atenção:</strong> Se dois times escolherem o mesmo jogador, abrirá leilão manual.
              O time que <strong>desistir</strong> será bloqueado e usará o reserva automaticamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
