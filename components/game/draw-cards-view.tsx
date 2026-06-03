"use client"

import { useState } from "react"
import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { FileText, Wallet, Shuffle, Check, Sparkles } from "lucide-react"
import { FORMATIONS, type FormationId } from "@/lib/game-types"
import { cn } from "@/lib/utils"

export function DrawCardsView() {
  const { state, dispatch, formatCurrency } = useGame()
  const [drawnDecree, setDrawnDecree] = useState(false)
  const [drawnFinancial, setDrawnFinancial] = useState(false)
  const [selectedFormation, setSelectedFormation] = useState<FormationId | null>(null)
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
    if (!drawnDecree || !drawnFinancial || !selectedFormation) return
    dispatch({ type: "SET_FORMATION", teamId: currentTeam.id, formation: selectedFormation })
    dispatch({ type: "COMPLETE_SETUP", teamId: currentTeam.id })
    setDrawnDecree(false)
    setDrawnFinancial(false)
    setSelectedFormation(null)
  }

  const canChooseFormation = drawnDecree && drawnFinancial
  const canConfirm = drawnDecree && drawnFinancial && !!selectedFormation

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
          SORTEIO DE CARTAS
        </h2>
        <p className="text-muted-foreground text-sm">
          Turno do <span className="font-bold text-foreground">{currentTeam.name}</span>
        </p>
      </div>

      {/* Passo 1 e 2: Decreto + Carta financeira */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl w-full mb-6">
        {/* Decreto */}
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border-2 p-5 transition-all cursor-pointer",
            drawnDecree ? "border-amber-500 bg-amber-500/10" : "border-border bg-card hover:border-amber-500/50",
            isDrawing === "decree" && "animate-pulse"
          )}
          onClick={handleDrawDecree}
        >
          {isDrawing === "decree" && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <Shuffle className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
          )}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/30">
              <FileText className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">Decreto Presidencial</h3>
              <p className="text-xs text-muted-foreground">Regra obrigatória</p>
            </div>
          </div>
          {drawnDecree && currentTeam.presidentialDecree ? (
            <div className="space-y-1">
              <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">{currentTeam.presidentialDecree.name}</p>
              <p className="text-xs text-muted-foreground">{currentTeam.presidentialDecree.description}</p>
              <p className="text-[10px] text-destructive/70 italic mt-1">{currentTeam.presidentialDecree.penaltyMessage}</p>
              <div className="flex items-center gap-1 mt-2">
                <Check className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-primary">Decreto sorteado</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-16 rounded-lg border-2 border-dashed border-border">
              <p className="text-xs text-muted-foreground/70">Clique para sortear</p>
            </div>
          )}
        </div>

        {/* Carta financeira */}
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border-2 p-5 transition-all",
            drawnFinancial
              ? currentTeam.financialCard?.effect === "add" ? "border-primary bg-primary/10"
              : currentTeam.financialCard?.isJoker ? "border-violet-500 bg-violet-500/10"
              : "border-destructive bg-destructive/10"
              : drawnDecree ? "border-border bg-card hover:border-primary/50 cursor-pointer"
              : "border-border/50 bg-card/50 cursor-not-allowed opacity-50"
          )}
          onClick={handleDrawFinancial}
        >
          {isDrawing === "financial" && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <Shuffle className="w-8 h-8 text-primary animate-spin" />
            </div>
          )}
          <div className="flex items-center gap-3 mb-3">
            <div className={cn(
              "flex h-11 w-11 items-center justify-center rounded-xl border",
              drawnFinancial
                ? currentTeam.financialCard?.effect === "add" ? "bg-primary/20 border-primary/30"
                : currentTeam.financialCard?.isJoker ? "bg-violet-500/20 border-violet-500/30"
                : "bg-destructive/20 border-destructive/30"
                : "bg-primary/20 border-primary/30"
            )}>
              {currentTeam.financialCard?.isJoker
                ? <Sparkles className="h-5 w-5 text-violet-500" />
                : <Wallet className={cn("h-5 w-5", drawnFinancial && currentTeam.financialCard?.effect === "subtract" ? "text-destructive" : "text-primary")} />
              }
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">Carta Financeira</h3>
              <p className="text-xs text-muted-foreground">Evento aleatório</p>
            </div>
          </div>
          {drawnFinancial && currentTeam.financialCard ? (
            <div className="space-y-1">
              <p className={cn("text-sm font-semibold",
                currentTeam.financialCard.effect === "add" ? "text-primary"
                : currentTeam.financialCard.isJoker ? "text-violet-500"
                : "text-destructive"
              )}>{currentTeam.financialCard.name}</p>
              <p className="text-xs text-muted-foreground">{currentTeam.financialCard.description}</p>
              {!currentTeam.financialCard.isJoker && (
                <p className={cn("text-base font-bold", currentTeam.financialCard.effect === "add" ? "text-primary" : "text-destructive")}>
                  {currentTeam.financialCard.effect === "add" ? "+" : "-"}{formatCurrency(currentTeam.financialCard.value)}
                </p>
              )}
              <div className="flex items-center gap-1 mt-1">
                <Check className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-primary">Carta aplicada</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-16 rounded-lg border-2 border-dashed border-border">
              <p className="text-xs text-muted-foreground/70">{drawnDecree ? "Clique para sortear" : "Sorteie o decreto primeiro"}</p>
            </div>
          )}
        </div>
      </div>

      {/* Passo 3: Escolha da formação */}
      <div className={cn(
        "w-full max-w-2xl rounded-2xl border-2 p-5 transition-all",
        canChooseFormation ? "border-border bg-card" : "border-border/40 bg-card/40 opacity-50 pointer-events-none"
      )}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">🏟️</span>
          <div>
            <h3 className="font-bold text-foreground text-sm">Esquema Tático</h3>
            <p className="text-xs text-muted-foreground">Escolha a formação — define bônus de pontuação (+15 pts)</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {FORMATIONS.map(f => (
            <button
              key={f.id}
              onClick={() => canChooseFormation && setSelectedFormation(f.id)}
              className={cn(
                "p-3 rounded-xl border-2 text-left transition-all",
                selectedFormation === f.id
                  ? "border-primary bg-primary/10"
                  : "border-border bg-secondary/50 hover:border-primary/40"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{f.icon}</span>
                <span className="font-bold text-foreground text-xs">{f.name}</span>
                {selectedFormation === f.id && <Check className="w-3.5 h-3.5 text-primary ml-auto" />}
              </div>
              <p className="text-[10px] text-muted-foreground leading-tight">{f.description}</p>
              <p className="text-[10px] text-primary/80 mt-1">{f.bonusDescription}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Confirmar */}
      {canConfirm && (
        <Button onClick={handleCompleteSetup} className="mt-6 px-8 h-12 text-base font-bold">
          <Check className="w-4 h-4 mr-2" />
          Confirmar e Passar Turno
        </Button>
      )}

      {/* Progress dots */}
      <div className="mt-6 flex items-center gap-2">
        {state.teams.map(team => (
          <div
            key={team.id}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              state.setupComplete.includes(team.id) ? "bg-primary"
              : team.id === currentTeam.id ? "bg-amber-500"
              : "bg-border"
            )}
          />
        ))}
      </div>
    </div>
  )
}
