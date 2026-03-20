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
      return "bg-[#ffd700]/20 text-[#ffd700] border-[#ffd700]/30"
    case 2:
      return "bg-[#c0c0d0]/20 text-[#c0c0d0] border-[#c0c0d0]/30"
    case 3:
      return "bg-[#cd7f32]/20 text-[#cd7f32] border-[#cd7f32]/30"
  }
}

function PlayerCard({ player, showSold }: { player: Player; showSold?: boolean }) {
  const isReserveActivated = player.activatedFromReserve
  
  return (
    <div
      className={cn(
        "relative flex items-center gap-2 p-2 rounded-lg border transition-all",
        player.sold
          ? "bg-[#1a1a24]/50 border-[#2a2a38]/50 opacity-50"
          : isReserveActivated
          ? "bg-[#f59e0b]/10 border-[#f59e0b]/30"
          : player.isReserva
          ? "bg-[#1a1a24]/50 border-[#2a2a38]/50 opacity-70"
          : "bg-[#1a1a24] border-[#2a2a38] hover:border-[#00ff88]/30"
      )}
    >
      {player.sold && showSold && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#dc2626]/20 rounded-lg">
          <span className="text-xs font-bold text-[#dc2626] uppercase tracking-wider">Vendido</span>
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
          <p className="text-sm font-medium text-[#f0f0f5] truncate">{player.name}</p>
          {isReserveActivated && (
            <UserCheck className="w-3 h-3 text-[#f59e0b] flex-shrink-0" />
          )}
          {player.isReserva && !isReserveActivated && (
            <span className="text-[8px] text-[#888899] uppercase">(RES)</span>
          )}
        </div>
        <p className="text-xs text-[#888899]">{player.position}</p>
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
  const budgetColor = budgetPercentage > 50 ? "#00ff88" : budgetPercentage > 25 ? "#f59e0b" : "#dc2626"
  const managerName = getManagerName(team.id)
  const activatedReserves = teamPlayers.filter(p => p.activatedFromReserve).length

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border transition-all h-full",
        "border-[#2a2a38] bg-[#12121a]",
        isActive && "ring-2 ring-[#00ff88] ring-offset-2 ring-offset-[#0a0a0f]"
      )}
    >
      {/* Team Header */}
      <div className="p-4 border-b border-[#2a2a38]">
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
            <h2 className="text-lg font-bold text-[#f0f0f5]" style={{ fontFamily: 'var(--font-oswald)' }}>
              {team.name.toUpperCase()}
            </h2>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3 text-[#00ff88]" />
              <span className="text-xs text-[#00ff88] font-medium">{managerName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-[#888899]" />
              <span className="text-xs text-[#888899]">{titulares.filter(p => !p.sold).length} titulares</span>
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-4 w-4" style={{ color: budgetColor }} />
              <span className="text-sm text-[#888899]">Orçamento</span>
            </div>
            <span className="text-lg font-bold" style={{ color: budgetColor }}>
              {formatCurrency(team.currentBudget)}
            </span>
          </div>
          <div className="h-2 rounded-full bg-[#1a1a24] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(budgetPercentage, 100)}%`,
                backgroundColor: budgetColor,
              }}
            />
          </div>
        </div>

        {/* Reserve Penalty Indicator */}
        {activatedReserves > 0 && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#f59e0b]">
            <UserCheck className="h-3 w-3" />
            <span>{activatedReserves} reserva{activatedReserves > 1 ? "s" : ""} ativado{activatedReserves > 1 ? "s" : ""}</span>
          </div>
        )}
      </div>

      {/* Presidential Decree */}
      {team.presidentialDecree && (
        <div className="px-4 py-3 border-b border-[#2a2a38] bg-[#8b5cf6]/5">
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-[#8b5cf6] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#8b5cf6]">Decreto Presidencial</p>
              <p className="text-xs text-[#888899] mt-0.5">{team.presidentialDecree.name}</p>
              <p className="text-[10px] text-[#666677] mt-0.5">{team.presidentialDecree.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Financial Card Effect */}
      {team.financialCard && (
        <div className={cn(
          "px-4 py-3 border-b border-[#2a2a38]",
          team.financialCard.effect === "add" ? "bg-[#00ff88]/5" : team.financialCard.isJoker ? "bg-[#8b5cf6]/5" : "bg-[#dc2626]/5"
        )}>
          <div className="flex items-start gap-2">
            <AlertTriangle className={cn(
              "h-4 w-4 flex-shrink-0 mt-0.5",
              team.financialCard.effect === "add" ? "text-[#00ff88]" : team.financialCard.isJoker ? "text-[#8b5cf6]" : "text-[#dc2626]"
            )} />
            <div>
              <p className={cn(
                "text-xs font-semibold",
                team.financialCard.effect === "add" ? "text-[#00ff88]" : team.financialCard.isJoker ? "text-[#8b5cf6]" : "text-[#dc2626]"
              )}>
                {team.financialCard.name}
              </p>
              <p className="text-[10px] text-[#666677] mt-0.5">{team.financialCard.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Squad List - Titulares */}
      <div className="flex-1 overflow-auto p-4">
        <h3 className="text-xs font-semibold text-[#888899] uppercase tracking-wider mb-3">Titulares</h3>
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
            <h3 className="text-xs font-semibold text-[#888899] uppercase tracking-wider mt-4 mb-3">
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
