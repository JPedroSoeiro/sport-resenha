"use client"

import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { Gavel, Plus, X, DollarSign, TrendingUp, Flag, Shield, AlertTriangle, UserCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const TIER_COLORS = {
  1: { bg: "bg-[#ffd700]/20", border: "border-[#ffd700]/30", text: "text-[#ffd700]", label: "Elite" },
  2: { bg: "bg-[#c0c0d0]/20", border: "border-[#c0c0d0]/30", text: "text-[#c0c0d0]", label: "Regular" },
  3: { bg: "bg-[#cd7f32]/20", border: "border-[#cd7f32]/30", text: "text-[#cd7f32]", label: "Econômico" },
}

export function BiddingView() {
  const { state, dispatch, formatCurrency, getManagerName, getReserveForPosition, getCurrentPosition } = useGame()

  const { bidding } = state
  const player = bidding.player
  const biddingTeams = bidding.teams.map((id) => state.teams.find((t) => t.id === id)!)
  const currentPosition = getCurrentPosition()

  if (!player) return null

  const tierStyle = TIER_COLORS[player.tier]
  const highestBid = Math.max(...Object.values(bidding.currentBids))
  const highestBidder = Object.entries(bidding.currentBids).find(
    ([, bid]) => bid === highestBid
  )?.[0]

  const handleBid = (teamId: number, amount: number) => {
    const team = state.teams.find((t) => t.id === teamId)!
    const currentBid = bidding.currentBids[teamId] || player.value
    const newBid = currentBid + amount

    if (newBid > team.currentBudget) return

    dispatch({ type: "PLACE_BID", teamId, amount })
  }

  const handleWithdraw = (teamId: number) => {
    dispatch({ type: "WITHDRAW_BID", teamId })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]/95 backdrop-blur-sm overflow-auto py-8">
      <div className="w-full max-w-4xl mx-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#dc2626]/20 border border-[#dc2626]/30 mb-4">
            <Gavel className="w-5 h-5 text-[#dc2626]" />
            <span className="text-sm font-bold text-[#dc2626] uppercase tracking-wider">Leilão Manual</span>
          </div>
          <h2 className="text-3xl font-bold text-[#f0f0f5]" style={{ fontFamily: 'var(--font-oswald)' }}>
            DISPUTA POR {player.name.toUpperCase()}
          </h2>
          <p className="text-[#888899] mt-2">Dois ou mais times querem o mesmo jogador!</p>
        </div>

        {/* Player Card */}
        <div className={cn(
          "mx-auto max-w-md rounded-2xl border-2 p-6 mb-6",
          tierStyle.border,
          "bg-[#12121a]"
        )}>
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl",
              tierStyle.bg,
              tierStyle.text
            )}>
              T{player.tier}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#f0f0f5]">{player.name}</h3>
              <p className="text-[#888899]">{player.position}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-xs text-[#666677]">
                  <Flag className="w-3 h-3" />
                  <span>{player.nationality}</span>
                </div>
                <div className={cn("flex items-center gap-1 text-xs", tierStyle.text)}>
                  <Shield className="w-3 h-3" />
                  <span>{tierStyle.label}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#888899]">Valor Base</p>
              <p className="text-lg font-bold text-[#00ff88]">{formatCurrency(player.value)}</p>
            </div>
          </div>

          {/* Current Highest Bid */}
          <div className="mt-6 p-4 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#00ff88]" />
                <span className="text-sm text-[#888899]">Lance Atual Mais Alto</span>
              </div>
              <span className="text-2xl font-bold text-[#00ff88]">
                {formatCurrency(highestBid)}
              </span>
            </div>
            {highestBidder && (
              <p className="text-xs text-[#888899] mt-1">
                Líder: {state.teams.find((t) => t.id === Number(highestBidder))?.name}
              </p>
            )}
          </div>
        </div>

        {/* Bidding Teams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {biddingTeams.map((team, index) => {
            const isActive = index === bidding.activeTeamIndex
            const currentBid = bidding.currentBids[team.id] || player.value
            const isHighest = currentBid === highestBid && currentBid > player.value
            const canBid1M = team.currentBudget >= currentBid + 1000000
            const canBid5M = team.currentBudget >= currentBid + 5000000
            const reserve = getReserveForPosition(team.id, currentPosition)

            return (
              <div
                key={team.id}
                className={cn(
                  "rounded-2xl border-2 p-5 transition-all",
                  isActive
                    ? "border-[#00ff88] bg-[#00ff88]/5 ring-2 ring-[#00ff88] ring-offset-2 ring-offset-[#0a0a0f]"
                    : "border-[#2a2a38] bg-[#12121a]"
                )}
              >
                {/* Team Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center font-bold border-2"
                      style={{
                        backgroundColor: team.primaryColor,
                        color: team.secondaryColor,
                        borderColor: team.primaryColor === "#000000" ? "#333" : team.primaryColor,
                      }}
                    >
                      {team.shortName}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#f0f0f5]">{team.name}</h4>
                      <p className="text-xs text-[#888899]">{getManagerName(team.id)}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <DollarSign className="w-3 h-3 text-[#00ff88]" />
                        <span className="text-sm text-[#00ff88]">
                          {formatCurrency(team.currentBudget)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {isHighest && (
                      <div className="px-2 py-1 rounded bg-[#00ff88]/20 text-[#00ff88] text-xs font-bold">
                        LÍDER
                      </div>
                    )}
                    {isActive && (
                      <div className="px-2 py-1 rounded bg-[#ffd700]/20 text-[#ffd700] text-xs font-bold">
                        SUA VEZ
                      </div>
                    )}
                  </div>
                </div>

                {/* Current Team Bid */}
                <div className="p-3 rounded-lg bg-[#1a1a24] border border-[#2a2a38] mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#888899]">Seu Lance</span>
                    <span className="text-xl font-bold text-[#f0f0f5]">
                      {formatCurrency(currentBid)}
                    </span>
                  </div>
                  <p className="text-xs text-[#666677] mt-1">
                    Saldo após lance: {formatCurrency(team.currentBudget - currentBid)}
                  </p>
                </div>

                {/* Actions - Only for active team */}
                {isActive ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => handleBid(team.id, 1000000)}
                        disabled={!canBid1M}
                        className="bg-[#00ff88] hover:bg-[#00dd77] text-[#0a0a0f] font-bold disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        €1M
                      </Button>
                      <Button
                        onClick={() => handleBid(team.id, 5000000)}
                        disabled={!canBid5M}
                        className="bg-[#00ff88] hover:bg-[#00dd77] text-[#0a0a0f] font-bold disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        €5M
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleWithdraw(team.id)}
                      variant="outline"
                      className="w-full border-[#dc2626] text-[#dc2626] hover:bg-[#dc2626]/10"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Desistir do Leilão
                    </Button>
                    
                    {reserve && (
                      <div className="p-2 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/30 mt-2">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-[#f59e0b]" />
                          <p className="text-xs text-[#f59e0b]">
                            Ao desistir, usará reserva: <strong>{reserve.name}</strong> (T{reserve.tier})
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-center text-sm text-[#888899] py-4">
                    Aguardando turno do adversário...
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Warning */}
        <div className="p-4 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/30 max-w-2xl mx-auto">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#f59e0b] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-[#f59e0b] font-bold">Regra de Penalidade do Reserva</p>
              <p className="text-xs text-[#f59e0b]/80 mt-1">
                O time que <strong>desistir</strong> ou <strong>perder</strong> o leilão será automaticamente 
                bloqueado de contratar nesta posição pelo resto da rodada e deverá usar seu <strong>jogador reserva</strong>.
                O dinheiro da venda anterior permanece no banco.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
