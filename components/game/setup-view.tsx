"use client"

import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { Play, Sparkles } from "lucide-react"

export function SetupView() {
  const { state, dispatch } = useGame()

  const handleStartGame = () => {
    dispatch({ type: "START_GAME" })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="text-center max-w-2xl">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/30 mb-6">
          <Sparkles className="w-10 h-10 text-[#00ff88]" />
        </div>
        
        <h2 className="text-4xl font-bold text-[#f0f0f5] mb-4" style={{ fontFamily: 'var(--font-oswald)' }}>
          RECONSTRUÇÃO
        </h2>
        <p className="text-lg text-[#888899] mb-2">
          Gerente de Futebol
        </p>
        <p className="text-sm text-[#666677] mb-8 max-w-md mx-auto">
          Assuma o controle de Corinthians, São Paulo e Santos. 
          Reconstrua os elencos, navegue pelos decretos presidenciais e 
          dispute leilões para montar o time perfeito.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {state.teams.map((team) => (
            <div
              key={team.id}
              className="p-4 rounded-xl border border-[#2a2a38] bg-[#12121a]"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg mx-auto mb-3 border"
                style={{
                  backgroundColor: team.primaryColor,
                  color: team.secondaryColor,
                  borderColor: team.id === 2 ? "#dc2626" : "#333",
                }}
              >
                {team.shortName}
              </div>
              <p className="font-semibold text-[#f0f0f5]">{team.name}</p>
              <p className="text-xs text-[#00ff88]">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  notation: "compact",
                }).format(team.initialBudget)}
              </p>
            </div>
          ))}
        </div>

        <Button
          onClick={handleStartGame}
          className="px-8 py-6 text-lg font-bold bg-[#00ff88] hover:bg-[#00dd77] text-[#0a0a0f]"
        >
          <Play className="w-5 h-5 mr-2" />
          Iniciar Jogo
        </Button>
      </div>
    </div>
  )
}
