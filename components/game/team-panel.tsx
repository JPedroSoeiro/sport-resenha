"use client"

import { useGame, Team, Player } from "@/lib/game-context"
import { POSITION_ORDER, Position } from "@/lib/game-types"
import { DollarSign, FileText, Users, AlertTriangle, User, UserCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface TeamPanelProps {
  team: Team
  isActive?: boolean
}

const POSITION_SHORT: Record<Position, string> = {
  "Goleiro": "GOL",
  "Zagueiro": "ZAG",
  "Lateral-Direito": "LD",
  "Lateral-Esquerdo": "LE",
  "Primeiro-Volante": "VOL",
  "Segundo-Volante": "VOL",
  "Meia-Armador": "MEI",
  "Ponta-Direita": "PD",
  "Ponta-Esquerda": "PE",
  "Centroavante": "ATA",
}

function getTierColor(tier: 1 | 2 | 3) {
  switch (tier) {
    case 1:
      return "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30"
    case 2:
      return "bg-slate-400/20 text-slate-600 dark:text-slate-400 border-slate-400/30"
    case 3:
      return "bg-orange-700/20 text-orange-700 dark:text-orange-400 border-orange-700/30"
  }
}

function PlayerCard({ player, showSold }: { player: Player; showSold?: boolean }) {
  const isReserveActivated = player.activatedFromReserve
  const lostAuction = player.lostAuction
  
  return (
    <div
      className={cn(
        "relative flex items-center gap-2 p-2 rounded-lg border transition-all",
        player.sold
          ? "bg-secondary/50 border-border/50 opacity-50"
          : lostAuction
          ? "bg-destructive/10 border-destructive/30"
          : isReserveActivated
          ? "bg-amber-500/10 border-amber-500/30"
          : player.isReserva
          ? "bg-secondary/50 border-border/50 opacity-70"
          : "bg-secondary border-border hover:border-primary/30"
      )}
    >
      {player.sold && showSold && (
        <div className="absolute inset-0 flex items-center justify-center bg-destructive/20 rounded-lg">
          <span className="text-xs font-bold text-destructive uppercase tracking-wider">Vendido</span>
        </div>
      )}
      
      {/* Lost Auction Badge */}
      {lostAuction && (
        <div className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded text-[8px] font-bold bg-destructive text-destructive-foreground uppercase tracking-wider z-10">
          LEILAO PERDIDO
        </div>
      )}
      
      <div className="flex-shrink-0">
        <span className={cn(
          "inline-flex items-center justify-center w-8 h-8 rounded text-xs font-bold border",
          getTierColor(player.tier)
        )}>
          {POSITION_SHORT[player.position]}
        </span>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <p className="text-sm font-medium text-foreground truncate">{player.name}</p>
          {lostAuction && (
            <span className="w-3 h-3 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[8px] text-destructive font-bold">!</span>
            </span>
          )}
          {isReserveActivated && !lostAuction && (
            <UserCheck className="w-3 h-3 text-amber-500 flex-shrink-0" />
          )}
          {player.isReserva && !isReserveActivated && (
            <span className="text-[8px] text-muted-foreground uppercase">(RES)</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{player.position}</p>
      </div>
      
      <div className="flex-shrink-0 text-right">
        <span className={cn(
          "inline-block px-1.5 py-0.5 rounded text-[10px] font-bold",
          getTierColor(player.tier)
        )}>
          T{player.tier}
        </span>
      </div>
    </div>
  )
}

export function TeamPanel({ team, isActive }: TeamPanelProps) {
  const { getTeamPlayers, getTeamTitulares, getTeamReservas, formatCurrency, state, getManagerName } = useGame()
  const teamPlayers = getTeamPlayers(team.id)
  const titulares = getTeamTitulares(team.id)
  const reservas = getTeamReservas(team.id)

  // Group titulares by position
  const titularesByPosition = POSITION_ORDER.reduce((acc, pos) => {
    acc[pos] = titulares.filter((p) => p.position === pos)
    return acc
  }, {} as Record<Position, Player[]>)

  const budgetPercentage = (team.currentBudget / team.initialBudget) * 100
  const budgetColor = budgetPercentage > 50 ? "text-primary" : budgetPercentage > 25 ? "text-amber-500" : "text-destructive"
  const budgetBgColor = budgetPercentage > 50 ? "bg-primary" : budgetPercentage > 25 ? "bg-amber-500" : "bg-destructive"
  const managerName = getManagerName(team.id)
  const activatedReserves = teamPlayers.filter(p => p.activatedFromReserve).length

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border transition-all h-full",
        "border-border bg-card",
        isActive && "ring-2 ring-primary ring-offset-2 ring-offset-background"
      )}
    >
      {/* Team Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-lg font-bold text-lg border-2"
            style={{
              backgroundColor: team.primaryColor,
              color: team.secondaryColor,
              borderColor: team.primaryColor === "#000000" ? "#333" : team.primaryColor,
            }}
          >
            {team.shortName}
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: 'var(--font-oswald)' }}>
              {team.name.toUpperCase()}
            </h2>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3 text-primary" />
              <span className="text-xs text-primary font-medium">{managerName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{titulares.filter(p => !p.sold).length} titulares</span>
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <DollarSign className={cn("h-4 w-4", budgetColor)} />
              <span className="text-sm text-muted-foreground">Orçamento</span>
            </div>
            <span className={cn("text-lg font-bold", budgetColor)}>
              {formatCurrency(team.currentBudget)}
            </span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-500", budgetBgColor)}
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Reserve Penalty Indicator */}
        {activatedReserves > 0 && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-500">
            <UserCheck className="h-3 w-3" />
            <span>{activatedReserves} reserva{activatedReserves > 1 ? "s" : ""} ativado{activatedReserves > 1 ? "s" : ""}</span>
          </div>
        )}
      </div>

      {/* Presidential Decree */}
      {team.presidentialDecree && (
        <div className="px-4 py-3 border-b border-border bg-violet-500/5">
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-violet-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">Decreto Presidencial</p>
              <p className="text-xs text-muted-foreground mt-0.5">{team.presidentialDecree.name}</p>
              <p className="text-[10px] text-muted-foreground/70 mt-0.5">{team.presidentialDecree.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Financial Card Effect */}
      {team.financialCard && (
        <div className={cn(
          "px-4 py-3 border-b border-border",
          team.financialCard.effect === "add" ? "bg-primary/5" : team.financialCard.isJoker ? "bg-violet-500/5" : "bg-destructive/5"
        )}>
          <div className="flex items-start gap-2">
            <AlertTriangle className={cn(
              "h-4 w-4 flex-shrink-0 mt-0.5",
              team.financialCard.effect === "add" ? "text-primary" : team.financialCard.isJoker ? "text-violet-500" : "text-destructive"
            )} />
            <div>
              <p className={cn(
                "text-xs font-semibold",
                team.financialCard.effect === "add" ? "text-primary" : team.financialCard.isJoker ? "text-violet-500" : "text-destructive"
              )}>
                {team.financialCard.name}
              </p>
              <p className="text-[10px] text-muted-foreground/70 mt-0.5">{team.financialCard.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Squad List - Titulares */}
      <div className="flex-1 overflow-auto p-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Titulares</h3>
        <div className="space-y-2">
          {POSITION_ORDER.map((position) => {
            const players = titularesByPosition[position]
            if (players.length === 0) return null
            
            return players.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                showSold={state.phase !== "host-setup" && state.phase !== "player-setup"}
              />
            ))
          })}
        </div>

        {/* Reservas Section */}
        {reservas.length > 0 && (
          <>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4 mb-3">
              Banco de Reservas ({reservas.length})
            </h3>
            <div className="space-y-2">
              {reservas.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  showSold={state.phase !== "host-setup" && state.phase !== "player-setup"}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
