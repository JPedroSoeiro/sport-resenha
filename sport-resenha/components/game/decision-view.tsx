"use client"

import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { Check, X, DollarSign, Shield, Flag, User } from "lucide-react"
import { cn } from "@/lib/utils"

const TIER_COLORS = {
  1: { bg: "bg-[#ffd700]/20", border: "border-[#ffd700]/30", text: "text-[#ffd700]" },
  2: { bg: "bg-[#c0c0d0]/20", border: "border-[#c0c0d0]/30", text: "text-[#c0c0d0]" },
  3: { bg: "bg-[#cd7f32]/20", border: "border-[#cd7f32]/30", text: "text-[#cd7f32]" },
}

export function DecisionView() {
  const { state, dispatch, getCurrentTeam, getCurrentPosition, getPlayerForPosition, formatCurrency, getManagerName } = useGame()
  
  const currentTeam = getCurrentTeam()
  const currentPosition = getCurrentPosition()
  const player = getPlayerForPosition(currentTeam.id, currentPosition)
  const managerName = getManagerName(currentTeam.id)
  
  // Handle case where player already sold or doesn't exist
  if (!player || player.sold) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2a2a38] mb-6">
            <X className="w-8 h-8 text-[#888899]" />
          </div>
          <h2 className="text-xl font-bold text-[#f0f0f5] mb-2">
            Sem jogador nesta posição
          </h2>
          <p className="text-[#888899] mb-6">
            {currentTeam.name} não possui jogador de {currentPosition}
          </p>
          <Button
            onClick={() => dispatch({ type: "KEEP_PLAYER", teamId: currentTeam.id })}
            className="bg-[#2a2a38] hover:bg-[#3a3a48] text-[#f0f0f5]"
          >
            Próximo Time
          </Button>
        </div>
      </div>
    )
  }
  
  const tierStyle = TIER_COLORS[player.tier]
  
  const handleKeep = () => {
    dispatch({ type: "KEEP_PLAYER", teamId: currentTeam.id })
  }
  
  const handleSell = () => {
    dispatch({ type: "SELL_PLAYER", teamId: currentTeam.id, playerId: player.id })
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="text-center mb-6">
        <p className="text-sm text-[#888899] mb-1">Rodada {state.currentPositionIndex + 1}</p>
        <h2 className="text-2xl font-bold text-[#f0f0f5]" style={{ fontFamily: 'var(--font-oswald)' }}>
          {currentPosition.toUpperCase()}
        </h2>
        <p className="text-[#888899] mt-1">
          Turno do <span className="font-bold text-[#f0f0f5]">{currentTeam.name}</span>
        </p>
        <div className="flex items-center justify-center gap-1 mt-1">
          <User className="w-3 h-3 text-[#00ff88]" />
          <span className="text-sm text-[#00ff88]">{managerName}</span>
        </div>
      </div>
      
      {/* Player Card */}
      <div className="w-full max-w-sm">
        <div className={cn(
          "relative rounded-2xl border-2 p-6 transition-all",
          tierStyle.border,
          "bg-[#12121a]"
        )}>
          {/* Tier Badge */}
          <div className={cn(
            "absolute -top-3 -right-3 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg",
            tierStyle.bg,
            tierStyle.text,
            "border",
            tierStyle.border
          )}>
            T{player.tier}
          </div>
          
          {/* Player Info */}
          <div className="flex items-start gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-xl font-bold text-xl border-2 flex-shrink-0"
              style={{
                backgroundColor: currentTeam.primaryColor,
                color: currentTeam.secondaryColor,
                borderColor: currentTeam.primaryColor === "#000000" ? "#333" : currentTeam.primaryColor,
              }}
            >
              {currentTeam.shortName}
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#f0f0f5]">{player.name}</h3>
              <p className="text-sm text-[#888899]">{player.position}</p>
              
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  <Flag className="w-3.5 h-3.5 text-[#888899]" />
                  <span className="text-xs text-[#888899]">{player.nationality}</span>
                </div>
                <div className={cn("flex items-center gap-1", tierStyle.text)}>
                  <Shield className="w-3.5 h-3.5" />
                  <span className="text-xs">Tier {player.tier}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Value */}
          <div className="mt-6 p-4 rounded-xl bg-[#1a1a24] border border-[#2a2a38]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#00ff88]" />
                <span className="text-sm text-[#888899]">Valor de Mercado</span>
              </div>
              <span className="text-xl font-bold text-[#00ff88]">
                {formatCurrency(player.value)}
              </span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <Button
              onClick={handleKeep}
              variant="outline"
              className="h-14 border-[#2a2a38] bg-[#1a1a24] hover:bg-[#2a2a38] text-[#f0f0f5]"
            >
              <Check className="w-5 h-5 mr-2 text-[#00ff88]" />
              Manter
            </Button>
            <Button
              onClick={handleSell}
              className="h-14 bg-[#dc2626] hover:bg-[#b91c1c] text-white"
            >
              <DollarSign className="w-5 h-5 mr-2" />
              Vender
            </Button>
          </div>
        </div>
      </div>
      
      {/* Team Progress */}
      <div className="mt-8 flex items-center gap-4">
        {state.teams.map((team, index) => {
          const isCurrent = index === state.currentTeamIndex
          const isPast = index < state.currentTeamIndex
          
          return (
            <div key={team.id} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-all",
                  isCurrent
                    ? "border-[#00ff88] bg-[#00ff88]/20 text-[#00ff88]"
                    : isPast
                    ? "border-[#00ff88] bg-[#00ff88] text-[#0a0a0f]"
                    : "border-[#2a2a38] bg-[#1a1a24] text-[#888899]"
                )}
                style={{
                  borderColor: isCurrent ? "#00ff88" : isPast ? "#00ff88" : undefined,
                }}
              >
                {isPast ? <Check className="w-4 h-4" /> : team.shortName}
              </div>
              {index < state.teams.length - 1 && (
                <div className={cn(
                  "w-8 h-0.5",
                  isPast ? "bg-[#00ff88]" : "bg-[#2a2a38]"
                )} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
