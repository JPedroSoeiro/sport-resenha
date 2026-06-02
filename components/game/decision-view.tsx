"use client"

import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { Check, DollarSign, Shield, Flag, User, X, ChevronRight } from "lucide-react"
import { POSITION_LABELS } from "@/lib/game-types"
import { cn } from "@/lib/utils"

const TIER_STYLE = {
  1: {
    border: "border-amber-500/50",
    badge: "bg-amber-500/20 text-amber-500 border-amber-500/40 dark:text-amber-400 tier-1-glow",
    value: "text-amber-500 dark:text-amber-400",
    label: "Veterano de Grife",
  },
  2: {
    border: "border-slate-400/40",
    badge: "bg-slate-400/20 text-slate-600 border-slate-400/30 dark:text-slate-300",
    value: "text-slate-600 dark:text-slate-300",
    label: "Joia Promissora",
  },
  3: {
    border: "border-orange-700/40",
    badge: "bg-orange-800/20 text-orange-700 border-orange-700/30 dark:text-orange-400",
    value: "text-orange-700 dark:text-orange-400",
    label: "Operário",
  },
} as const

export function DecisionView() {
  const { state, dispatch, getCurrentTeam, getCurrentPosition, getPlayerForPosition, formatCurrency, getManagerName } = useGame()
  const currentTeam = getCurrentTeam()
  const currentPosition = getCurrentPosition()

  if (!currentTeam) return null

  const player = getPlayerForPosition(currentTeam.id, currentPosition)
  const managerName = getManagerName(currentTeam.id)

  if (!player || player.sold) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 screen-enter">
        <div className="text-center max-w-sm">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary border border-border mb-5">
            <X className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">Sem jogador nesta posição</h2>
          <p className="text-sm text-muted-foreground mb-6">
            {currentTeam.name} não possui titular de {POSITION_LABELS[currentPosition]}
          </p>
          <Button onClick={() => dispatch({ type: "KEEP_PLAYER", teamId: currentTeam.id })}>
            Próximo Time <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    )
  }

  const ts = TIER_STYLE[player.tier as 1 | 2 | 3]

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 sm:p-10 screen-enter">
      {/* Round header */}
      <div className="text-center mb-6">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          Rodada {state.currentPositionIndex + 1} de {state.positionRounds.length}
        </span>
        <h2
          className="text-3xl font-bold text-foreground mt-1 tracking-tight"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {POSITION_LABELS[currentPosition].toUpperCase()}
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg font-bold text-xs border-2"
            style={{
              backgroundColor: currentTeam.primaryColor,
              color: currentTeam.secondaryColor,
              borderColor: currentTeam.primaryColor === "#1a1a1a" ? "#555" : currentTeam.primaryColor,
            }}
          >
            {currentTeam.shortName}
          </div>
          <span className="font-semibold text-foreground">{currentTeam.name}</span>
          <span className="text-muted-foreground/40">·</span>
          <User className="w-3.5 h-3.5 text-primary" />
          <span className="text-sm text-primary font-medium">{managerName}</span>
        </div>
      </div>

      {/* Player card */}
      <div className={cn("w-full max-w-sm rounded-2xl border-2 p-6 bg-card shadow-lg", ts.border)}>
        {/* Tier badge */}
        <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold mb-5", ts.badge)}>
          <Shield className="w-3 h-3" />
          TIER {player.tier} — {ts.label}
        </div>

        {/* Name & details */}
        <h3 className="text-2xl font-bold text-foreground mb-1">{player.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{POSITION_LABELS[player.position]}</p>

        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Flag className="w-3.5 h-3.5" />
            {player.nationality}
          </div>
          <div className={cn("flex items-center gap-1.5 text-sm font-medium", ts.value)}>
            <Shield className="w-3.5 h-3.5" />
            {player.category === "veterano" ? "Veterano" : player.category === "joia" ? "Joia" : "Operário"}
          </div>
        </div>

        {/* Value box */}
        <div className="p-4 rounded-xl bg-secondary border border-border mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Valor de Mercado</span>
            </div>
            <span className={cn("text-xl font-bold", ts.value)}>{formatCurrency(player.value)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => dispatch({ type: "KEEP_PLAYER", teamId: currentTeam.id })}
            variant="outline"
            className="h-12 font-semibold hover:border-primary hover:text-primary"
          >
            <Check className="w-4 h-4 mr-2" />
            Manter
          </Button>
          <Button
            onClick={() => dispatch({ type: "SELL_PLAYER", teamId: currentTeam.id, playerId: player.id })}
            variant="destructive"
            className="h-12 font-semibold"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Vender
          </Button>
        </div>
      </div>

      {/* Team progress stepper */}
      <div className="flex items-center gap-2 mt-8">
        {state.teams.map((team, i) => {
          const isCurrent = i === state.currentTeamIndex
          const isDone = i < state.currentTeamIndex
          return (
            <div key={team.id} className="flex items-center gap-2">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold border-2 transition-all",
                isCurrent ? "border-primary bg-primary/20 text-primary scale-110" :
                isDone     ? "border-primary bg-primary text-primary-foreground" :
                             "border-border bg-secondary text-muted-foreground"
              )}>
                {isDone ? <Check className="w-4 h-4" /> : team.shortName}
              </div>
              {i < state.teams.length - 1 && (
                <div className={cn("w-6 h-0.5", isDone ? "bg-primary" : "bg-border")} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
