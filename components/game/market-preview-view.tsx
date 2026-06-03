"use client"

import { useGame } from "@/lib/game-context"
import { POSITION_LABELS } from "@/lib/game-types"
import { Flag, Shield, DollarSign, ArrowRight, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const TIER_STYLE = {
  1: {
    label: "Veterano de Grife",
    badge: "bg-amber-500/15 text-amber-500 border-amber-500/40 dark:text-amber-400",
    card: "border-amber-500/30 bg-amber-500/5",
    glow: "tier-1-glow",
    value: "text-amber-500 dark:text-amber-400",
    header: "bg-amber-500/10",
    rank: "🥇",
  },
  2: {
    label: "Joia Promissora",
    badge: "bg-slate-400/15 text-slate-600 border-slate-400/30 dark:text-slate-300",
    card: "border-slate-400/25 bg-slate-400/5",
    glow: "tier-2-glow",
    value: "text-slate-600 dark:text-slate-300",
    header: "bg-slate-400/10",
    rank: "🥈",
  },
  3: {
    label: "Operário",
    badge: "bg-orange-800/15 text-orange-700 border-orange-700/30 dark:text-orange-400",
    card: "border-orange-700/25 bg-orange-800/5",
    glow: "tier-3-glow",
    value: "text-orange-700 dark:text-orange-400",
    header: "bg-orange-800/10",
    rank: "🥉",
  },
} as const

export function MarketPreviewView() {
  const { state, dispatch, getCurrentPosition, getTransferOptions, formatCurrency } = useGame()

  const position = getCurrentPosition()
  const options = getTransferOptions()
  const teamsSold = state.teams.filter(t => state.soldInCurrentRound.includes(t.id))

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-6 screen-enter">
      {/* Header */}
      <div className="text-center mb-2">
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
          Rodada {state.currentPositionIndex + 1} de {state.positionRounds.length}
        </span>
        <h2
          className="text-4xl font-bold text-foreground mt-1 mb-2"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {POSITION_LABELS[position].toUpperCase()}
        </h2>
        <p className="text-muted-foreground text-sm">
          Os reforços disponíveis foram revelados — discutam antes de escolher!
        </p>
      </div>

      {/* Times que participarão */}
      {teamsSold.length > 0 && (
        <div className="flex items-center gap-2 mb-6 flex-wrap justify-center">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Vão ao mercado:</span>
          {teamsSold.map(team => (
            <div
              key={team.id}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold"
              style={{
                borderColor: team.primaryColor === "#1a1a1a" ? "#555" : team.primaryColor,
                backgroundColor: `${team.primaryColor}18`,
                color: "var(--foreground)",
              }}
            >
              <span className="font-bold">{team.shortName}</span>
            </div>
          ))}
        </div>
      )}

      {/* 3 Opções reveladas — sem possibilidade de seleção */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl w-full mb-8">
        {options.map(opt => {
          const ts = TIER_STYLE[opt.tier as 1 | 2 | 3]
          return (
            <div
              key={opt.player.id}
              className={cn(
                "rounded-2xl border-2 overflow-hidden flex flex-col",
                ts.card
              )}
            >
              {/* Tier header */}
              <div className={cn("px-4 py-2.5 flex items-center justify-between", ts.header)}>
                <div className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold border", ts.badge)}>
                  {ts.rank} TIER {opt.tier} — {ts.label.toUpperCase()}
                </div>
              </div>

              {/* Player info */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-foreground mb-0.5">{opt.player.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{POSITION_LABELS[opt.player.position]}</p>

                <div className="flex items-center gap-4 mb-5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Flag className="w-3.5 h-3.5" />
                    {opt.player.nationality}
                  </span>
                  <span className={cn("flex items-center gap-1.5", ts.value)}>
                    <Shield className="w-3.5 h-3.5" />
                    {opt.player.category === "veterano" ? "Veterano" : opt.player.category === "joia" ? "Joia" : "Operário"}
                  </span>
                </div>

                <div className={cn("flex items-center justify-between p-3 rounded-xl mt-auto border", ts.card)}>
                  <div className="flex items-center gap-1.5">
                    <DollarSign className={cn("w-4 h-4", ts.value)} />
                    <span className="text-xs text-muted-foreground">Valor</span>
                  </div>
                  <span className={cn("text-xl font-bold", ts.value)}>
                    {formatCurrency(opt.player.value)}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-3">
          Cada gerente escolherá em segredo — sem ver a escolha dos outros
        </p>
        <Button
          onClick={() => dispatch({ type: "ADVANCE_TO_MARKET" })}
          className="h-12 px-10 font-bold text-base"
        >
          Iniciar Seleção
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}
