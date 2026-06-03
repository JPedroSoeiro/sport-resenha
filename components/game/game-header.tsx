"use client"

import { useState } from "react"
import { useGame } from "@/lib/game-context"
import { Trophy, Zap, User, Save, Check, LogOut, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { POSITION_LABELS } from "@/lib/game-types"
import { serializeState, copyToClipboard } from "@/lib/save-load"
import { cn } from "@/lib/utils"

const SAVEABLE_PHASES = ["draw-cards", "decision", "market-preview", "market", "bidding", "evaluation", "special-event"]
const GAME_ACTIVE_PHASES = ["draw-cards", "decision", "market-preview", "market", "bidding", "evaluation", "special-event", "player-setup", "host-setup"]

export function GameHeader() {
  const { state, dispatch, getCurrentPosition, getManagerName } = useGame()
  const [saved, setSaved] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)

  const canExit = GAME_ACTIVE_PHASES.includes(state.phase) && state.phase !== "splash"

  const getPhaseLabel = () => {
    switch (state.phase) {
      case "splash":      return "Início"
      case "host-setup":  return "Configuração"
      case "player-setup":return "Escolha de Times"
      case "draw-cards":  return "Sorteio de Cartas"
      case "decision":    return `Decisão — ${POSITION_LABELS[getCurrentPosition()]}`
      case "market-preview": return `Revelação — ${POSITION_LABELS[getCurrentPosition()]}`
      case "market":         return `Mercado — ${POSITION_LABELS[getCurrentPosition()]}`
      case "bidding":     return "Leilão em Andamento"
      case "evaluation":  return "Avaliação Final"
      default:            return ""
    }
  }

  const handleSave = async () => {
    const code = serializeState(state)
    const ok = await copyToClipboard(code)
    if (ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    }
  }

  const currentTeam = state.teams[state.currentTeamIndex]
  const currentManagerName = currentTeam ? getManagerName(currentTeam.id) : ""
  const isSetup = state.phase === "host-setup" || state.phase === "player-setup" || state.phase === "splash"
  const canSave = SAVEABLE_PHASES.includes(state.phase)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Logo — clicável para sair */}
          <button
            onClick={() => canExit && setShowExitModal(true)}
            className={cn(
              "flex items-center gap-2.5 flex-shrink-0 rounded-lg transition-colors",
              canExit && "hover:bg-secondary/60 active:bg-secondary px-2 py-1 -mx-2 -my-1"
            )}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
              <Trophy className="h-4 w-4 text-primary" />
            </div>
            <div className="hidden sm:block text-left">
              <h1 className="text-base font-bold tracking-tight text-foreground leading-tight" style={{ fontFamily: "var(--font-oswald)" }}>
                SPORT RESENHA
              </h1>
              <p className="text-[10px] text-muted-foreground -mt-0.5 uppercase tracking-wider">Gerente de Futebol</p>
            </div>
          </button>

          {/* Phase + Team tracker */}
          {state.gameStarted && !state.gameEnded && !isSetup && (
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border flex-shrink-0">
                <Zap className="h-3.5 w-3.5 text-warning" />
                <span className="text-xs font-semibold text-foreground">
                  {state.currentPositionIndex + 1}/{state.positionRounds.length}
                </span>
              </div>

              <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-primary/20 min-w-0">
                <span className="text-[11px] text-primary font-semibold truncate">{getPhaseLabel()}</span>
              </div>

              {state.phase !== "evaluation" && currentTeam && (
                <div
                  className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border flex-shrink-0"
                  style={{
                    borderColor: currentTeam.primaryColor === "#1a1a1a" ? "#444" : currentTeam.primaryColor,
                    backgroundColor: `${currentTeam.primaryColor}18`,
                  }}
                >
                  <span className="text-xs font-bold text-foreground">{currentTeam.shortName}</span>
                  <span className="text-border">|</span>
                  <User className="h-3 w-3 text-primary" />
                  <span className="text-xs text-primary">{currentManagerName}</span>
                </div>
              )}
            </div>
          )}

          {/* Right: progress dots + save + theme */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {state.gameStarted && !state.gameEnded && !isSetup && (
              <div className="hidden lg:flex items-center gap-1 mr-1">
                {state.positionRounds.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full transition-all ${
                      i < state.currentPositionIndex  ? "bg-primary" :
                      i === state.currentPositionIndex ? "bg-amber-400 scale-125" :
                      "bg-border"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Save button */}
            {canSave && (
              <button
                onClick={handleSave}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all",
                  saved
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
                title="Salvar progresso (copia código para a área de transferência)"
              >
                {saved ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Salvar</span>
                  </>
                )}
              </button>
            )}

            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Modal de saída */}
      {showExitModal && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={e => { if (e.target === e.currentTarget) setShowExitModal(false) }}
        >
          <div className="w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl p-6 screen-enter">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 border border-destructive/20">
                  <LogOut className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Sair da partida?</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Todo o progresso não salvo será perdido</p>
                </div>
              </div>
              <button
                onClick={() => setShowExitModal(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Aviso */}
            <div className="p-3 rounded-lg bg-amber-500/8 border border-amber-500/20 mb-5">
              <p className="text-xs text-amber-600 dark:text-amber-400">
                💡 Dica: antes de sair, salve o progresso clicando em{" "}
                <strong>Salvar</strong> no cabeçalho para poder continuar depois.
              </p>
            </div>

            {/* Botões */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setShowExitModal(false)}
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors"
              >
                Continuar jogando
              </button>
              <button
                onClick={() => { dispatch({ type: "RESET_GAME" }); setShowExitModal(false) }}
                className="w-full h-11 rounded-xl border border-destructive/40 text-destructive font-semibold text-sm hover:bg-destructive/10 transition-colors"
              >
                Sair e voltar ao início
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
