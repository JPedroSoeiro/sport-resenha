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
        <h2 className="text-2xl font-bold text-[#f0f0f5] mb-2" style={{ fontFamily: 'var(--font-oswald)' }}>
          SORTEIO DE CARTAS
        </h2>
        <p className="text-[#888899]">
          Turno do <span className="font-bold text-[#f0f0f5]">{currentTeam.name}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
        {/* Presidential Decree Card */}
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border-2 p-6 transition-all cursor-pointer",
            drawnDecree
              ? "border-[#f59e0b] bg-[#f59e0b]/10"
              : "border-[#2a2a38] bg-[#12121a] hover:border-[#f59e0b]/50",
            isDrawing === "decree" && "animate-pulse"
          )}
          onClick={handleDrawDecree}
        >
          {isDrawing === "decree" && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f]/80 z-10">
              <Shuffle className="w-8 h-8 text-[#f59e0b] animate-spin" />
            </div>
          )}
          
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f59e0b]/20 border border-[#f59e0b]/30">
              <FileText className="h-6 w-6 text-[#f59e0b]" />
            </div>
            <div>
              <h3 className="font-bold text-[#f0f0f5]">Decreto Presidencial</h3>
              <p className="text-xs text-[#888899]">Regra obrigatória</p>
            </div>
          </div>

          {drawnDecree && currentTeam.presidentialDecree ? (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[#f59e0b]">
                {currentTeam.presidentialDecree.name}
              </p>
              <p className="text-xs text-[#888899]">
                {currentTeam.presidentialDecree.description}
              </p>
              <div className="flex items-center gap-1 mt-3">
                <Check className="w-4 h-4 text-[#00ff88]" />
                <span className="text-xs text-[#00ff88]">Decreto sorteado</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-20 rounded-lg border-2 border-dashed border-[#2a2a38]">
              <p className="text-sm text-[#666677]">Clique para sortear</p>
            </div>
          )}
        </div>

        {/* Financial Card */}
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border-2 p-6 transition-all",
            drawnFinancial
              ? currentTeam.financialCard?.effect === "add"
                ? "border-[#00ff88] bg-[#00ff88]/10"
                : currentTeam.financialCard?.isJoker
                ? "border-[#8b5cf6] bg-[#8b5cf6]/10"
                : "border-[#dc2626] bg-[#dc2626]/10"
              : drawnDecree
              ? "border-[#2a2a38] bg-[#12121a] hover:border-[#00ff88]/50 cursor-pointer"
              : "border-[#2a2a38]/50 bg-[#12121a]/50 cursor-not-allowed opacity-50"
          )}
          onClick={handleDrawFinancial}
        >
          {isDrawing === "financial" && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0f]/80 z-10">
              <Shuffle className="w-8 h-8 text-[#00ff88] animate-spin" />
            </div>
          )}

          <div className="flex items-center gap-3 mb-4">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl border",
              drawnFinancial
                ? currentTeam.financialCard?.effect === "add"
                  ? "bg-[#00ff88]/20 border-[#00ff88]/30"
                  : currentTeam.financialCard?.isJoker
                  ? "bg-[#8b5cf6]/20 border-[#8b5cf6]/30"
                  : "bg-[#dc2626]/20 border-[#dc2626]/30"
                : "bg-[#00ff88]/20 border-[#00ff88]/30"
            )}>
              {currentTeam.financialCard?.isJoker ? (
                <Sparkles className="h-6 w-6 text-[#8b5cf6]" />
              ) : (
                <Wallet className={cn(
                  "h-6 w-6",
                  drawnFinancial && currentTeam.financialCard?.effect === "subtract"
                    ? "text-[#dc2626]"
                    : "text-[#00ff88]"
                )} />
              )}
            </div>
            <div>
              <h3 className="font-bold text-[#f0f0f5]">Carta Financeira</h3>
              <p className="text-xs text-[#888899]">Evento aleatório</p>
            </div>
          </div>

          {drawnFinancial && currentTeam.financialCard ? (
            <div className="space-y-2">
              <p className={cn(
                "text-sm font-semibold",
                currentTeam.financialCard.effect === "add"
                  ? "text-[#00ff88]"
                  : currentTeam.financialCard.isJoker
                  ? "text-[#8b5cf6]"
                  : "text-[#dc2626]"
              )}>
                {currentTeam.financialCard.name}
              </p>
              <p className="text-xs text-[#888899]">
                {currentTeam.financialCard.description}
              </p>
              {!currentTeam.financialCard.isJoker && (
                <p className={cn(
                  "text-lg font-bold",
                  currentTeam.financialCard.effect === "add" ? "text-[#00ff88]" : "text-[#dc2626]"
                )}>
                  {currentTeam.financialCard.effect === "add" ? "+" : "-"}
                  {formatCurrency(currentTeam.financialCard.value)}
                </p>
              )}
              <div className="flex items-center gap-1 mt-3">
                <Check className="w-4 h-4 text-[#00ff88]" />
                <span className="text-xs text-[#00ff88]">Carta aplicada</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-20 rounded-lg border-2 border-dashed border-[#2a2a38]">
              <p className="text-sm text-[#666677]">
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
          className="mt-8 px-8 py-4 text-lg font-bold bg-[#00ff88] hover:bg-[#00dd77] text-[#0a0a0f]"
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
                ? "bg-[#00ff88]"
                : team.id === currentTeam.id
                ? "bg-[#f59e0b]"
                : "bg-[#2a2a38]"
            )}
          />
        ))}
      </div>
    </div>
  )
}
