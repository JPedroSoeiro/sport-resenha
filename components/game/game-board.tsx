"use client"

import { useGame } from "@/lib/game-context"
import { GameHeader } from "./game-header"
import { TeamPanel } from "./team-panel"
import { HostSetupView } from "./host-setup-view"
import { PlayerSetupView } from "./player-setup-view"
import { DrawCardsView } from "./draw-cards-view"
import { DecisionView } from "./decision-view"
import { MarketView } from "./market-view"
import { BiddingView } from "./bidding-view"
import { EvaluationView } from "./evaluation-view"
import { AddPlayerButton } from "./add-player-button"

export function GameBoard() {
  const { state } = useGame()

  // Host setup phase - full screen
  if (state.phase === "host-setup") {
    return <HostSetupView />
  }

  // Player setup phase - full screen
  if (state.phase === "player-setup") {
    return <PlayerSetupView />
  }

  // Full-screen evaluation view
  if (state.phase === "evaluation") {
    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <GameHeader />
        <EvaluationView />
      </div>
    )
  }

  const renderActionCenter = () => {
    switch (state.phase) {
      case "draw-cards":
        return <DrawCardsView />
      case "decision":
        return <DecisionView />
      case "market":
        return <MarketView />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <GameHeader />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Team Panels - Left Side on Desktop */}
        <div className="lg:w-80 xl:w-96 flex-shrink-0 p-4 border-b lg:border-b-0 lg:border-r border-[#2a2a38] overflow-auto">
          <div className="space-y-4">
            {state.teams.map((team, index) => (
              <TeamPanel
                key={team.id}
                team={team}
                isActive={state.gameStarted && !state.gameEnded && index === state.currentTeamIndex}
              />
            ))}
          </div>
        </div>

        {/* Action Center - Main Area */}
        <div className="flex-1 overflow-auto">
          {renderActionCenter()}
        </div>
      </div>

      {/* Bidding Overlay */}
      {state.phase === "bidding" && <BiddingView />}

      {/* Add Player FAB */}
      <AddPlayerButton />
    </div>
  )
}
