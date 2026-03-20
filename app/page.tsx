"use client"

import { GameProvider } from "@/lib/game-context"
import { GameBoard } from "@/components/game/game-board"

export default function Home() {
  return (
    <GameProvider>
      <GameBoard />
    </GameProvider>
  )
}
