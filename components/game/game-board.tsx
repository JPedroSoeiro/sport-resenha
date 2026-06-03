"use client"

import { useEffect, useRef, useState } from "react"
import { useGame } from "@/lib/game-context"
import { POSITION_LABELS } from "@/lib/game-types"
import { GameHeader } from "./game-header"
import { TeamPanel } from "./team-panel"
import { SplashView } from "./splash-view"
import { HostSetupView } from "./host-setup-view"
import { PlayerSetupView } from "./player-setup-view"
import { DrawCardsView } from "./draw-cards-view"
import { DecisionView } from "./decision-view"
import { MarketPreviewView } from "./market-preview-view"
import { MarketView } from "./market-view"
import { BiddingView } from "./bidding-view"
import { EvaluationView } from "./evaluation-view"
import { SpecialEventView } from "./special-event-view"

// ─── Overlay de transição entre posições ──────────────────────────────────────
function RoundTransition({
  positionLabel,
  roundNum,
  totalRounds,
  onDone,
}: {
  positionLabel: string
  roundNum: number
  totalRounds: number
  onDone: () => void
}) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/95 cursor-pointer"
      onClick={onDone}
      style={{ animation: "screen-in 0.25s ease-out" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative text-center select-none">
        <p className="text-white/40 text-sm uppercase tracking-[0.3em] mb-4 font-medium">
          Rodada {roundNum} de {totalRounds}
        </p>

        <h1
          className="text-white font-bold leading-none mb-6"
          style={{
            fontFamily: "var(--font-oswald)",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            textShadow: "0 0 60px rgba(0,255,135,0.3)",
          }}
        >
          {positionLabel.toUpperCase()}
        </h1>

        {/* Animated progress bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-primary rounded-full"
            style={{ animation: "shimmer 2.2s linear forwards", width: "100%" }}
          />
        </div>

        <p className="text-white/20 text-xs mt-5 uppercase tracking-widest">
          Clique para avançar
        </p>
      </div>
    </div>
  )
}

// ─── GameBoard ─────────────────────────────────────────────────────────────────
export function GameBoard() {
  const { state, getCurrentPosition } = useGame()

  // Transição de rodada
  const [showTransition, setShowTransition] = useState(false)
  const [transitionLabel, setTransitionLabel] = useState("")
  const [transitionRound, setTransitionRound] = useState(0)
  const prevIndexRef = useRef<number | null>(null)
  const prevPhaseRef = useRef<string | null>(null)

  useEffect(() => {
    const isDecision = state.phase === "decision"
    const idx = state.currentPositionIndex

    // Só mostra transição quando:
    // 1. Estamos na fase decision
    // 2. O índice de posição mudou
    // 3. Não é a rodada inicial (quando o jogo começa)
    if (
      isDecision &&
      prevIndexRef.current !== null &&
      prevIndexRef.current !== idx &&
      prevPhaseRef.current !== null
    ) {
      setTransitionLabel(POSITION_LABELS[getCurrentPosition()])
      setTransitionRound(idx + 1)
      setShowTransition(true)
    }

    prevIndexRef.current = idx
    prevPhaseRef.current = state.phase
  }, [state.phase, state.currentPositionIndex, getCurrentPosition])

  if (state.phase === "splash")       return <SplashView />
  if (state.phase === "host-setup")   return <HostSetupView />
  if (state.phase === "player-setup") return <PlayerSetupView />
  if (state.phase === "special-event") return (
    <div className="min-h-screen bg-background">
      <GameHeader />
      <SpecialEventView />
    </div>
  )
  if (state.phase === "evaluation")   return (
    <div className="min-h-screen bg-background">
      <GameHeader />
      <EvaluationView />
    </div>
  )

  const renderAction = () => {
    switch (state.phase) {
      case "draw-cards":      return <DrawCardsView />
      case "decision":        return <DecisionView />
      case "market-preview":  return <MarketPreviewView />
      case "market":          return <MarketView />
      default:           return null
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GameHeader />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Team panels — left sidebar */}
        <div className="
          flex-shrink-0
          lg:w-72 xl:w-80
          flex flex-row lg:flex-col
          gap-2 p-2
          border-b lg:border-b-0 lg:border-r border-border
          overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden
          scrollbar-thin
        ">
          {state.teams.map((team, i) => (
            <div key={team.id} className="flex-shrink-0 lg:flex-shrink w-56 sm:w-64 lg:w-full">
              <TeamPanel
                team={team}
                isActive={state.gameStarted && !state.gameEnded && i === state.currentTeamIndex}
              />
            </div>
          ))}
        </div>

        {/* Action centre */}
        <div className="flex-1 overflow-auto screen-enter">
          {renderAction()}
        </div>
      </div>

      {/* Bidding overlay */}
      {state.phase === "bidding" && <BiddingView />}

      {/* Round transition overlay */}
      {showTransition && (
        <RoundTransition
          positionLabel={transitionLabel}
          roundNum={transitionRound}
          totalRounds={state.positionRounds.length}
          onDone={() => setShowTransition(false)}
        />
      )}
    </div>
  )
}
