"use client"

import { useGame } from "@/lib/game-context"
import { Trophy, Zap, User } from "lucide-react"

export function GameHeader() {
  const { state, getCurrentPosition, getManagerName } = useGame()

  const getPhaseLabel = () => {
    switch (state.phase) {
      case "host-setup":
        return "Configuração do Anfitrião"
      case "player-setup":
        return "Configuração dos Jogadores"
      case "draw-cards":
        return "Sorteio de Cartas"
      case "decision":
        return `Decisão: ${getCurrentPosition()}`
      case "market":
        return `Mercado: ${getCurrentPosition()}`
      case "bidding":
        return "Leilão em Andamento"
      case "evaluation":
        return "Avaliação Final"
      default:
        return ""
    }
  }

  const currentTeam = state.teams[state.currentTeamIndex]
  const currentManagerName = currentTeam ? getManagerName(currentTeam.id) : ""
  const isSetupPhase = state.phase === "host-setup" || state.phase === "player-setup"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2a2a38] bg-[#0a0a0f]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0f]/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30">
              <Trophy className="h-5 w-5 text-[#00ff88]" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-[#f0f0f5]" style={{ fontFamily: 'var(--font-oswald)' }}>
                RECONSTRUÇÃO
              </h1>
              <p className="text-xs text-[#888899] -mt-1">GERENTE DE FUTEBOL</p>
            </div>
          </div>

          {/* Phase Tracker */}
          {state.gameStarted && !state.gameEnded && !isSetupPhase && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a24] border border-[#2a2a38]">
                <Zap className="h-4 w-4 text-[#f59e0b]" />
                <span className="text-sm font-medium text-[#f0f0f5]">
                  Rodada {state.currentPositionIndex + 1}/{state.positionRounds.length}
                </span>
              </div>
              
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#12121a] border border-[#00ff88]/30">
                <span className="text-sm text-[#888899]">Fase:</span>
                <span className="text-sm font-semibold text-[#00ff88]">{getPhaseLabel()}</span>
              </div>

              {state.phase !== "evaluation" && currentTeam && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg border"
                  style={{
                    borderColor: currentTeam.primaryColor === "#000000" ? '#333' : currentTeam.primaryColor,
                    backgroundColor: `${currentTeam.primaryColor}20`,
                  }}
                >
                  <span className="text-sm text-[#888899]">Turno:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-[#f0f0f5]">{currentTeam.name}</span>
                    <span className="text-[10px] text-[#888899]">|</span>
                    <User className="h-3 w-3 text-[#00ff88]" />
                    <span className="text-xs text-[#00ff88]">{currentManagerName}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Position Progress */}
          {state.gameStarted && !state.gameEnded && !isSetupPhase && (
            <div className="hidden lg:flex items-center gap-1">
              {state.positionRounds.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index < state.currentPositionIndex
                      ? "bg-[#00ff88]"
                      : index === state.currentPositionIndex
                      ? "bg-[#f59e0b]"
                      : "bg-[#2a2a38]"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
