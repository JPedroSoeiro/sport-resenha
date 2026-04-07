"use client"

import { useState } from "react"
import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { FileText, Wallet, Shuffle, Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function DrawCardsView() {
  const { state, dispatch, formatCurrency } = useGame()
  const [drawnDecree, setDrawnDecree] = useState(false)
  const [drawnFinancial, setDrawnFinancial] = useState(false)
  const [isDrawing, setIsDrawing] = useState<"decree" | "financial" | null>(null)

  const currentTeam = state.teams[state.currentTeamIndex]
  const hasCompletedSetup = state.setupComplete.includes(currentTeam.id)

  const handleDrawDecree = () => {
    if (drawnDecree || hasCompletedSetup) return
    setIsDrawing("decree")
    setTimeout(() => {
      dispatch({ type: "DRAW_DECREE", teamId: currentTeam.id })
      setDrawnDecree(true)
      setIsDrawing(null)
    }, 800)
  }

  const handleDrawFinancial = () => {
    if (drawnFinancial || !drawnDecree || hasCompletedSetup) return
    setIsDrawing("financial")
    setTimeout(() => {
      dispatch({ type: "DRAW_FINANCIAL", teamId: currentTeam.id })
      setDrawnFinancial(true)
      setIsDrawing(null)
    }, 800)
  }

  const handleCompleteSetup = () => {
    if (!drawnDecree || !drawnFinancial) return
    dispatch({ type: "COMPLETE_SETUP", teamId: currentTeam.id })
    setDrawnDecree(false)
    setDrawnFinancial(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-oswald)' }}>
          SORTEIO DE CARTAS
        </h2>
        <p className="text-muted-foreground">
          Turno do <span className="font-bold text-foreground">{currentTeam.name}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
        {/* Presidential Decree Card */}
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border-2 p-6 transition-all cursor-pointer",
            drawnDecree
              ? "border-amber-500 bg-amber-500/10"
              : "border-border bg-card hover:border-amber-500/50",
            isDrawing === "decree" && "animate-pulse"
          )}
          onClick={handleDrawDecree}
        >
          {isDrawing === "decree" && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <Shuffle className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
          )}
          
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/30">
              <FileText className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Decreto Presidencial</h3>
              <p className="text-xs text-muted-foreground">Regra obrigatória</p>
            </div>
          </div>

          {drawnDecree && currentTeam.presidentialDecree ? (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                {currentTeam.presidentialDecree.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {currentTeam.presidentialDecree.description}
              </p>
              <div className="flex items-center gap-1 mt-3">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary">Decreto sorteado</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-20 rounded-lg border-2 border-dashed border-border">
              <p className="text-sm text-muted-foreground/70">Clique para sortear</p>
            </div>
          )}
        </div>

        {/* Financial Card */}
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border-2 p-6 transition-all",
            drawnFinancial
              ? currentTeam.financialCard?.effect === "add"
                ? "border-primary bg-primary/10"
                : currentTeam.financialCard?.isJoker
                ? "border-violet-500 bg-violet-500/10"
                : "border-destructive bg-destructive/10"
              : drawnDecree
              ? "border-border bg-card hover:border-primary/50 cursor-pointer"
              : "border-border/50 bg-card/50 cursor-not-allowed opacity-50"
          )}
          onClick={handleDrawFinancial}
        >
          {isDrawing === "financial" && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <Shuffle className="w-8 h-8 text-primary animate-spin" />
            </div>
          )}

          <div className="flex items-center gap-3 mb-4">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl border",
              drawnFinancial
                ? currentTeam.financialCard?.effect === "add"
                  ? "bg-primary/20 border-primary/30"
                  : currentTeam.financialCard?.isJoker
                  ? "bg-violet-500/20 border-violet-500/30"
                  : "bg-destructive/20 border-destructive/30"
                : "bg-primary/20 border-primary/30"
            )}>
              {currentTeam.financialCard?.isJoker ? (
                <Sparkles className="h-6 w-6 text-violet-500" />
              ) : (
                <Wallet className={cn(
                  "h-6 w-6",
                  drawnFinancial && currentTeam.financialCard?.effect === "subtract"
                    ? "text-destructive"
                    : "text-primary"
                )} />
              )}
            </div>
            <div>
              <h3 className="font-bold text-foreground">Carta Financeira</h3>
              <p className="text-xs text-muted-foreground">Evento aleatório</p>
            </div>
          </div>

          {drawnFinancial && currentTeam.financialCard ? (
            <div className="space-y-2">
              <p className={cn(
                "text-sm font-semibold",
                currentTeam.financialCard.effect === "add"
                  ? "text-primary"
                  : currentTeam.financialCard.isJoker
                  ? "text-violet-500"
                  : "text-destructive"
              )}>
                {currentTeam.financialCard.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {currentTeam.financialCard.description}
              </p>
              {!currentTeam.financialCard.isJoker && (
                <p className={cn(
                  "text-lg font-bold",
                  currentTeam.financialCard.effect === "add" ? "text-primary" : "text-destructive"
                )}>
                  {currentTeam.financialCard.effect === "add" ? "+" : "-"}
                  {formatCurrency(currentTeam.financialCard.value)}
                </p>
              )}
              <div className="flex items-center gap-1 mt-3">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary">Carta aplicada</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-20 rounded-lg border-2 border-dashed border-border">
              <p className="text-sm text-muted-foreground/70">
                {drawnDecree ? "Clique para sortear" : "Sorteie o decreto primeiro"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Continue Button */}
      {drawnDecree && drawnFinancial && (
        <Button
          onClick={handleCompleteSetup}
          className="mt-8 px-8 py-4 text-lg font-bold"
        >
          <Check className="w-5 h-5 mr-2" />
          Confirmar e Passar Turno
        </Button>
      )}

      {/* Progress */}
      <div className="mt-8 flex items-center gap-2">
        {state.teams.map((team) => (
          <div
            key={team.id}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              state.setupComplete.includes(team.id)
                ? "bg-primary"
                : team.id === currentTeam.id
                ? "bg-amber-500"
                : "bg-border"
            )}
          />
        ))}
      </div>
    </div>
  )
}
