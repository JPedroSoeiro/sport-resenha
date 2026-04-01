"use client"

import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { Gavel, Plus, X, DollarSign, TrendingUp, Flag, Shield, AlertTriangle, UserCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const TIER_COLORS = {
  1: { bg: "bg-amber-500/20", border: "border-amber-500/30", text: "text-amber-600 dark:text-amber-400", label: "Elite" },
  2: { bg: "bg-slate-400/20", border: "border-slate-400/30", text: "text-slate-600 dark:text-slate-400", label: "Regular" },
  3: { bg: "bg-orange-700/20", border: "border-orange-700/30", text: "text-orange-700 dark:text-orange-400", label: "Econômico" },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm overflow-auto py-8">
      <div className="w-full max-w-4xl mx-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-destructive/20 border border-destructive/30 mb-4">
            <Gavel className="w-5 h-5 text-destructive" />
            <span className="text-sm font-bold text-destructive uppercase tracking-wider">Leilão Manual</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-oswald)' }}>
            DISPUTA POR {player.name.toUpperCase()}
          </h2>
          <p className="text-muted-foreground mt-2">Dois ou mais times querem o mesmo jogador!</p>
        </div>

        {/* Player Card */}
        <div className={cn(
          "mx-auto max-w-md rounded-2xl border-2 p-6 mb-6",
          tierStyle.border,
          "bg-card"
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
              <h3 className="text-2xl font-bold text-foreground">{player.name}</h3>
              <p className="text-muted-foreground">{player.position}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground/70">
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
              <p className="text-xs text-muted-foreground">Valor Base</p>
              <p className="text-lg font-bold text-primary">{formatCurrency(player.value)}</p>
            </div>
          </div>

          {/* Current Highest Bid */}
          <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Lance Atual Mais Alto</span>
              </div>
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(highestBid)}
              </span>
            </div>
            {highestBidder && (
              <p className="text-xs text-muted-foreground mt-1">
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
                    ? "border-primary bg-primary/5 ring-2 ring-primary ring-offset-2 ring-offset-background"
                    : "border-border bg-card"
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
                      <h4 className="font-bold text-foreground">{team.name}</h4>
                      <p className="text-xs text-muted-foreground">{getManagerName(team.id)}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <DollarSign className="w-3 h-3 text-primary" />
                        <span className="text-sm text-primary">
                          {formatCurrency(team.currentBudget)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {isHighest && (
                      <div className="px-2 py-1 rounded bg-primary/20 text-primary text-xs font-bold">
                        LÍDER
                      </div>
                    )}
                    {isActive && (
                      <div className="px-2 py-1 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold">
                        SUA VEZ
                      </div>
                    )}
                  </div>
                </div>

                {/* Current Team Bid */}
                <div className="p-3 rounded-lg bg-secondary border border-border mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Seu Lance</span>
                    <span className="text-xl font-bold text-foreground">
                      {formatCurrency(currentBid)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground/70 mt-1">
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
                        className="font-bold"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        €1M
                      </Button>
                      <Button
                        onClick={() => handleBid(team.id, 5000000)}
                        disabled={!canBid5M}
                        className="font-bold"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        €5M
                      </Button>
                    </div>
                    <Button
                      onClick={() => handleWithdraw(team.id)}
                      variant="outline"
                      className="w-full border-destructive text-destructive hover:bg-destructive/10"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Desistir do Leilão
                    </Button>
                    
                    {reserve && (
                      <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 mt-2">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-amber-500" />
                          <p className="text-xs text-amber-600 dark:text-amber-400">
                            Ao desistir, usará reserva: <strong>{reserve.name}</strong> (T{reserve.tier})
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-center text-sm text-muted-foreground py-4">
                    Aguardando turno do adversário...
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Warning */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 max-w-2xl mx-auto">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-600 dark:text-amber-400 font-bold">Regra de Penalidade do Reserva</p>
              <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1">
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
