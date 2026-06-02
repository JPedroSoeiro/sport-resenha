"use client"

import { useGame } from "@/lib/game-context"
import { GameHeader } from "./game-header"
import { TeamPanel } from "./team-panel"
import { SplashView } from "./splash-view"
import { HostSetupView } from "./host-setup-view"
import { PlayerSetupView } from "./player-setup-view"
import { DrawCardsView } from "./draw-cards-view"
import { DecisionView } from "./decision-view"
import { MarketView } from "./market-view"
import { BiddingView } from "./bidding-view"
import { EvaluationView } from "./evaluation-view"

export function GameBoard() {
  const { state } = useGame()

  if (state.phase === "splash")       return <SplashView />
  if (state.phase === "host-setup")   return <HostSetupView />
  if (state.phase === "player-setup") return <PlayerSetupView />
  if (state.phase === "evaluation")   return (
    <div className="min-h-screen bg-background">
      <GameHeader />
      <EvaluationView />
    </div>
  )

  const renderAction = () => {
    switch (state.phase) {
      case "draw-cards": return <DrawCardsView />
      case "decision":   return <DecisionView />
      case "market":     return <MarketView />
      default:           return null
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GameHeader />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Team panels — fixed left sidebar */}
        <div className="
          flex-shrink-0
          lg:w-72 xl:w-80
          flex flex-row lg:flex-col
          gap-3 p-3
          border-b lg:border-b-0 lg:border-r border-border
          overflow-x-auto lg:overflow-y-auto lg:overflow-x-hidden
        ">
          {state.teams.map((team, i) => (
            <div key={team.id} className="flex-shrink-0 lg:flex-shrink w-64 lg:w-full">
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
    </div>
  )
}
