"use client"

import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { Gavel, Plus, X, DollarSign, TrendingUp, Flag, Shield, AlertTriangle, UserCheck, Zap } from "lucide-react"
import { POSITION_LABELS } from "@/lib/game-types"
import { cn } from "@/lib/utils"

const TIER_STYLE = {
  1: { badge: "bg-amber-500/20 text-amber-500 border-amber-500/30 tier-1-glow", val: "text-amber-500" },
  2: { badge: "bg-slate-400/20 text-slate-400 border-slate-400/30",               val: "text-slate-400" },
  3: { badge: "bg-orange-800/20 text-orange-500 border-orange-700/30",             val: "text-orange-500" },
} as const

export function BiddingView() {
  const { state, dispatch, formatCurrency, getManagerName, getReserveForPosition, getCurrentPosition } = useGame()
  const { bidding } = state
  const player = bidding.player
  const pos = getCurrentPosition()

  if (!player) return null

  const ts = TIER_STYLE[player.tier as 1 | 2 | 3]
  const bids = Object.entries(bidding.currentBids).map(([tid, v]) => ({ teamId: Number(tid), bid: v }))
  const highest = Math.max(...bids.map(b => b.bid))
  const leaderId = bids.find(b => b.bid === highest)?.teamId

  const handleBid = (teamId: number, inc: number) => {
    const team = state.teams.find(t => t.id === teamId)!
    const newBid = highest + inc
    if (newBid > team.currentBudget) return
    dispatch({ type: "PLACE_BID", teamId, amount: inc })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-auto py-4 px-3 bg-background/96 backdrop-blur-sm">
      <div className="w-full max-w-3xl screen-enter">
        {/* Header badge */}
        <div className="flex justify-center mb-5">
          <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-destructive/15 border border-destructive/30">
            <Gavel className="w-5 h-5 text-destructive" />
            <span className="text-sm font-bold text-destructive uppercase tracking-widest">Leilão Manual</span>
            <Zap className="w-4 h-4 text-destructive animate-pulse" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
          DISPUTA POR {player.name.toUpperCase()}
        </h2>
        <p className="text-center text-sm text-muted-foreground mb-6">
          Dois ou mais times querem o mesmo {POSITION_LABELS[player.position]}!
        </p>

        {/* Player summary card */}
        <div className={cn("mx-auto max-w-md rounded-2xl border-2 p-5 bg-card mb-6", `border-${player.tier === 1 ? "amber" : player.tier === 2 ? "slate" : "orange"}-500/40`)}>
          <div className="flex items-center gap-4">
            <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl border-2", ts.badge)}>
              T{player.tier}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground">{player.name}</h3>
              <p className="text-sm text-muted-foreground">{POSITION_LABELS[player.position]}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Flag className="w-3 h-3" />{player.nationality}
                </span>
                <span className={cn("flex items-center gap-1 text-xs", ts.val)}>
                  <Shield className="w-3 h-3" />{player.category}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Valor base</p>
              <p className={cn("text-lg font-bold", ts.val)}>{formatCurrency(player.value)}</p>
            </div>
          </div>

          {/* Highest bid display */}
          <div className="mt-4 p-3 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Lance mais alto</span>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-primary">{formatCurrency(highest)}</span>
              {leaderId && (
                <p className="text-[10px] text-muted-foreground">
                  {state.teams.find(t => t.id === leaderId)?.name}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bidding team cards */}
        <div className={cn(
          "grid gap-4 mb-6",
          bidding.teams.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 max-w-sm mx-auto"
        )}>
          {bidding.teams.map((tid, idx) => {
            const team = state.teams.find(t => t.id === tid)!
            const isActive = idx === bidding.activeTeamIndex
            const curBid = bidding.currentBids[tid] || player.value
            const isLeader = curBid === highest && curBid > player.value
            // O próximo lance precisa superar o maior lance atual
            const can1M = team.currentBudget >= highest + 1_000_000
            const can5M = team.currentBudget >= highest + 5_000_000
            const reserve = getReserveForPosition(tid, pos)

            return (
              <div
                key={tid}
                className={cn(
                  "rounded-2xl border-2 p-5 transition-all",
                  isActive
                    ? "border-primary bg-primary/5 dark:neon-green"
                    : "border-border bg-card"
                )}
              >
                {/* Team header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center font-bold text-sm border-2"
                      style={{
                        backgroundColor: team.primaryColor,
                        color: team.secondaryColor,
                        borderColor: team.primaryColor === "#1a1a1a" ? "#555" : team.primaryColor,
                      }}
                    >
                      {team.shortName}
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{team.name}</p>
                      <p className="text-[11px] text-muted-foreground">{getManagerName(tid)}</p>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-primary" />
                        <span className="text-xs text-primary font-semibold">{formatCurrency(team.currentBudget)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {isLeader && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary uppercase">Líder</span>
                    )}
                    {isActive && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-500 uppercase animate-pulse">
                        Sua Vez
                      </span>
                    )}
                  </div>
                </div>

                {/* Current bid */}
                <div className="p-3 rounded-lg bg-secondary border border-border mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {isActive ? "Lance mais alto (adversário)" : "Lance mais alto"}
                    </span>
                    <span className={cn("text-lg font-bold", isLeader ? "text-primary" : "text-muted-foreground")}>
                      {formatCurrency(highest)}
                    </span>
                  </div>
                  {!isActive && curBid > player.value && (
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-muted-foreground">Seu lance atual</span>
                      <span className={cn("text-sm font-semibold", isLeader ? "text-primary" : "text-foreground")}>
                        {formatCurrency(curBid)}
                      </span>
                    </div>
                  )}
                </div>

                {isActive ? (
                  <div className="space-y-2">
                    {/* Bid option cards — mostram exatamente o que será pago */}
                    {[
                      { inc: 1_000_000, label: "+€1M", can: can1M },
                      { inc: 5_000_000, label: "+€5M", can: can5M },
                    ].map(({ inc, label, can }) => {
                      const nextBid = highest + inc
                      const remaining = team.currentBudget - nextBid
                      return (
                        <button
                          key={inc}
                          onClick={() => can && handleBid(tid, inc)}
                          disabled={!can}
                          className={cn(
                            "w-full rounded-xl border-2 p-3 text-left transition-all",
                            can
                              ? "border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary cursor-pointer"
                              : "border-border/30 bg-secondary/30 opacity-40 cursor-not-allowed"
                          )}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <Plus className="w-3.5 h-3.5 text-primary" />
                              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{label}</span>
                            </div>
                            <span className="text-base font-bold text-primary">
                              {formatCurrency(nextBid)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-muted-foreground">Saldo restante</span>
                            <span className={cn(
                              "text-[11px] font-semibold",
                              remaining > 0 ? "text-muted-foreground" : "text-destructive"
                            )}>
                              {remaining >= 0 ? formatCurrency(remaining) : "Insuficiente"}
                            </span>
                          </div>
                        </button>
                      )
                    })}

                    <Button
                      onClick={() => dispatch({ type: "WITHDRAW_BID", teamId: tid })}
                      variant="outline"
                      className="w-full h-11 border-destructive text-destructive hover:bg-destructive/10 font-bold"
                    >
                      <X className="w-4 h-4 mr-2" />Desistir
                    </Button>
                    {reserve && (
                      <div className="p-2.5 rounded-lg bg-amber-500/8 border border-amber-500/25">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-3.5 h-3.5 text-amber-500" />
                          <p className="text-[11px] text-amber-600 dark:text-amber-400">
                            Ao desistir usará: <strong>{reserve.name}</strong> (T{reserve.tier})
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-center text-sm text-muted-foreground py-4">
                    Aguardando adversário…
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Rule reminder */}
        <div className="p-4 rounded-xl bg-amber-500/8 border border-amber-500/25 max-w-xl mx-auto">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-0.5">Regra do Reserva</p>
              <p className="text-xs text-amber-600/80 dark:text-amber-400/80">
                O time que <strong>desistir</strong> é bloqueado de contratar nesta posição.
                Seu <strong>reserva</strong> entra automaticamente e o dinheiro da venda fica no caixa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
