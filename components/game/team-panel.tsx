"use client"

import { useGame, type Team, type Player } from "@/lib/game-context"
import { POSITION_ORDER, POSITION_SHORT, type Position } from "@/lib/game-types"
import { DollarSign, FileText, Users, User, UserCheck, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface TeamPanelProps {
  team: Team
  isActive?: boolean
}

function TierBadge({ tier }: { tier: 1 | 2 | 3 }) {
  const cls = {
    1: "bg-amber-500/20 text-amber-500 border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400",
    2: "bg-slate-400/20 text-slate-500 border-slate-400/30 dark:text-slate-300",
    3: "bg-orange-800/20 text-orange-700 border-orange-700/30 dark:text-orange-400",
  }[tier]
  return (
    <span className={cn("inline-flex items-center justify-center w-7 h-7 rounded text-[10px] font-bold border", cls)}>
      T{tier}
    </span>
  )
}

function PlayerRow({ player }: { player: Player }) {
  const short = POSITION_SHORT[player.position as Position]
  return (
    <div className={cn(
      "flex items-center gap-2 px-2 py-1.5 rounded-lg border text-xs transition-all",
      player.lostAuction
        ? "bg-destructive/10 border-destructive/30"
        : player.activatedFromReserve
        ? "bg-amber-500/10 border-amber-500/30"
        : player.isReserva
        ? "bg-secondary/50 border-transparent opacity-70"
        : "bg-secondary/50 border-transparent hover:border-border"
    )}>
      <TierBadge tier={player.tier as 1 | 2 | 3} />
      <span className="text-muted-foreground w-7 font-mono text-[9px] uppercase">{short}</span>
      <span className="flex-1 font-medium text-foreground truncate">{player.name}</span>
      {player.lostAuction && (
        <span className="text-[8px] font-bold text-destructive uppercase">leilão</span>
      )}
      {player.activatedFromReserve && !player.lostAuction && (
        <UserCheck className="w-3 h-3 text-amber-500 flex-shrink-0" />
      )}
      {player.isReserva && !player.activatedFromReserve && (
        <span className="text-[8px] text-muted-foreground/60 uppercase">res</span>
      )}
    </div>
  )
}

export function TeamPanel({ team, isActive }: TeamPanelProps) {
  const { getTeamTitulares, getTeamReservas, formatCurrency, getManagerName } = useGame()
  const titulares = getTeamTitulares(team.id)
  const reservas  = getTeamReservas(team.id)

  const budgetPct = (team.currentBudget / team.initialBudget) * 100
  const budgetColor =
    budgetPct > 60 ? "text-primary" : budgetPct > 30 ? "text-amber-500" : "text-destructive"
  const barColor =
    budgetPct > 60 ? "budget-shimmer" : budgetPct > 30 ? "bg-amber-500" : "bg-destructive"
  const managerName = getManagerName(team.id)
  const activatedReserves = titulares.filter(p => p.activatedFromReserve).length

  return (
    <div className={cn(
      "flex flex-col rounded-xl border transition-all overflow-hidden",
      "border-border bg-card",
      isActive && "ring-2 ring-primary dark:neon-green"
    )}>
      {/* Active indicator bar */}
      {isActive && <div className="h-0.5 bg-primary w-full" />}

      {/* Header */}
      <div className="p-3.5 border-b border-border">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-lg font-bold text-base border-2 flex-shrink-0"
            style={{
              backgroundColor: team.primaryColor,
              color: team.secondaryColor,
              borderColor: team.primaryColor === "#1a1a1a" ? "#444" : team.primaryColor,
            }}
          >
            {team.shortName}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-foreground truncate leading-tight" style={{ fontFamily: "var(--font-oswald)", fontSize: 15 }}>
              {team.name.toUpperCase()}
            </h2>
            <div className="flex items-center gap-1 mt-0.5">
              <User className="h-3 w-3 text-primary flex-shrink-0" />
              <span className="text-xs text-primary font-medium truncate">{managerName}</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Users className="h-3 w-3 text-muted-foreground flex-shrink-0" />
              <span className="text-[11px] text-muted-foreground">{titulares.filter(p => !p.sold).length} titulares</span>
            </div>
          </div>
        </div>

        {/* Budget */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1">
              <DollarSign className={cn("h-3.5 w-3.5", budgetColor)} />
              <span className="text-[11px] text-muted-foreground">Orçamento</span>
            </div>
            <span className={cn("text-base font-bold", budgetColor)}>
              {formatCurrency(team.currentBudget)}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-700", barColor)}
              style={{ width: `${Math.min(budgetPct, 100)}%` }}
            />
          </div>
        </div>

        {activatedReserves > 0 && (
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-500">
            <UserCheck className="h-3 w-3" />
            <span>{activatedReserves} reserva{activatedReserves > 1 ? "s" : ""} ativado{activatedReserves > 1 ? "s" : ""}</span>
          </div>
        )}
      </div>

      {/* Decree */}
      {team.presidentialDecree && (
        <div className="px-3.5 py-2.5 border-b border-border bg-violet-500/5">
          <div className="flex items-start gap-2">
            <FileText className="h-3.5 w-3.5 text-violet-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-semibold text-violet-500 dark:text-violet-400">{team.presidentialDecree.name}</p>
              <p className="text-[10px] text-muted-foreground/70 mt-0.5 leading-tight">{team.presidentialDecree.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Financial card */}
      {team.financialCard && (
        <div className={cn(
          "px-3.5 py-2.5 border-b border-border",
          team.financialCard.effect === "add"   ? "bg-primary/5"     :
          team.financialCard.isJoker             ? "bg-violet-500/5"  :
                                                   "bg-destructive/5"
        )}>
          <div className="flex items-start gap-2">
            <AlertTriangle className={cn(
              "h-3.5 w-3.5 flex-shrink-0 mt-0.5",
              team.financialCard.effect === "add"   ? "text-primary"    :
              team.financialCard.isJoker             ? "text-violet-500" :
                                                       "text-destructive"
            )} />
            <div>
              <p className={cn(
                "text-[11px] font-semibold",
                team.financialCard.effect === "add"   ? "text-primary"    :
                team.financialCard.isJoker             ? "text-violet-500" :
                                                         "text-destructive"
              )}>
                {team.financialCard.name}
              </p>
              <p className="text-[10px] text-muted-foreground/70 mt-0.5 leading-tight">{team.financialCard.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Squad list */}
      <div className="flex-1 overflow-auto p-3">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Titulares</p>
        <div className="space-y-1">
          {POSITION_ORDER.map(pos => {
            const player = titulares.find(p => p.position === pos)
            if (!player) return null
            return <PlayerRow key={player.id} player={player} />
          })}
        </div>

        {reservas.length > 0 && (
          <>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-3 mb-2">
              Banco ({reservas.length})
            </p>
            <div className="space-y-1">
              {reservas.map(p => <PlayerRow key={p.id} player={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
