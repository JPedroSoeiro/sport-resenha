"use client"

import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { POSITION_LABELS } from "@/lib/game-types"
import { cn } from "@/lib/utils"
import { Zap, ChevronRight } from "lucide-react"

const THEME_STYLE = {
  positive: {
    bg: "bg-primary/10 border-primary/40",
    icon: "bg-primary/20 text-primary",
    title: "text-primary",
    badge: "bg-primary/15 text-primary border-primary/30",
    badgeText: "BÔNUS",
    glow: "neon-green",
  },
  negative: {
    bg: "bg-destructive/10 border-destructive/40",
    icon: "bg-destructive/20 text-destructive",
    title: "text-destructive",
    badge: "bg-destructive/15 text-destructive border-destructive/30",
    badgeText: "PENALIDADE",
    glow: "neon-red",
  },
  neutral: {
    bg: "bg-secondary border-border",
    icon: "bg-secondary text-foreground",
    title: "text-foreground",
    badge: "bg-muted text-muted-foreground border-border",
    badgeText: "EVENTO",
    glow: "",
  },
}

export function SpecialEventView() {
  const { state, dispatch, formatCurrency, getManagerName } = useGame()
  const pending = state.pendingSpecialEvent
  if (!pending) return null

  const handleContinue = () => dispatch({ type: "DISMISS_SPECIAL_EVENT" })

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center p-6 screen-enter">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/30 mb-4">
          <Zap className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-bold text-amber-500 uppercase tracking-widest">Evento Especial</span>
          <Zap className="w-4 h-4 text-amber-500" />
        </div>
        <h2
          className="text-3xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          ALGO ACONTECEU!
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Cada time recebeu um evento diferente — veja o que mudou
        </p>
      </div>

      {/* Team event cards */}
      <div className={cn(
        "grid gap-5 w-full max-w-4xl mb-8",
        state.teams.length <= 2 ? "grid-cols-1 sm:grid-cols-2" :
        state.teams.length === 3 ? "grid-cols-1 md:grid-cols-3" :
        "grid-cols-2"
      )}>
        {state.teams.map(team => {
          const result = pending.teamResults[team.id]
          if (!result) return null
          const style = THEME_STYLE[result.theme]

          return (
            <div
              key={team.id}
              className={cn(
                "rounded-2xl border-2 p-5 flex flex-col gap-3 transition-all",
                style.bg,
                style.glow
              )}
            >
              {/* Team header */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm border-2 flex-shrink-0"
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
                  <p className="text-xs text-muted-foreground">{getManagerName(team.id)}</p>
                </div>
                <div className={cn("ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold border", style.badge)}>
                  {style.badgeText}
                </div>
              </div>

              {/* Event */}
              <div className="flex items-start gap-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0", style.icon)}>
                  {result.icon}
                </div>
                <div>
                  <p className={cn("font-bold text-base leading-tight", style.title)}>{result.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{result.description}</p>
                </div>
              </div>

              {/* Effect summary */}
              <div className="p-3 rounded-xl bg-background/50 border border-border/50 space-y-1.5">
                {result.budgetDelta !== 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Impacto no caixa</span>
                    <span className={cn("font-bold", result.budgetDelta > 0 ? "text-primary" : "text-destructive")}>
                      {result.budgetDelta > 0 ? "+" : ""}{formatCurrency(result.budgetDelta)}
                    </span>
                  </div>
                )}
                {result.playerName && result.eventId === "revelacao" && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Jogador recebido</span>
                    <span className="font-bold text-primary">{result.playerName}</span>
                  </div>
                )}
                {result.playerName && result.eventId === "lesao" && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Lesionado</span>
                    <div className="text-right">
                      <p className="font-bold text-destructive">{result.playerName}</p>
                      {result.injuredPosition && (
                        <p className="text-[10px] text-muted-foreground">
                          {POSITION_LABELS[result.injuredPosition as keyof typeof POSITION_LABELS]} — reserva ativado
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Novo saldo */}
                {result.budgetDelta !== 0 && (
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-border/30">
                    <span className="text-muted-foreground/70">Novo saldo</span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(Math.max(0, team.currentBudget + result.budgetDelta))}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <Button onClick={handleContinue} className="h-12 px-10 font-bold text-base">
        Continuar para próxima posição
        <ChevronRight className="w-5 h-5 ml-1" />
      </Button>
    </div>
  )
}
