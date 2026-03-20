"use client"

import { useState } from "react"
import { useGame, Position, Tier, Nationality } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, X, UserPlus, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const POSITIONS: Position[] = [
  "Goleiro",
  "Zagueiro",
  "Lateral-Direito",
  "Lateral-Esquerdo",
  "Primeiro-Volante",
  "Segundo-Volante",
  "Meia-Armador",
  "Ponta-Direita",
  "Ponta-Esquerda",
  "Centroavante",
]

const TIERS: Tier[] = [1, 2, 3]

const NATIONALITIES: Nationality[] = [
  "Brasileiro",
  "Argentino",
  "Uruguaio",
  "Colombiano",
  "Chileno",
  "Paraguaio",
  "Peruano",
  "Espanhol",
  "Português",
]

export function AddPlayerButton() {
  const { state, dispatch } = useGame()
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [position, setPosition] = useState<Position>("Goleiro")
  const [tier, setTier] = useState<Tier>(2)
  const [value, setValue] = useState("5000000")
  const [nationality, setNationality] = useState<Nationality>("Brasileiro")
  const [teamId, setTeamId] = useState<number | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) return

    dispatch({
      type: "ADD_PLAYER",
      player: {
        name: name.trim(),
        position,
        tier,
        value: Number(value),
        nationality,
        teamId,
      },
    })

    // Reset form
    setName("")
    setPosition("Goleiro")
    setTier(2)
    setValue("5000000")
    setNationality("Brasileiro")
    setTeamId(null)
    
    // Show success
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#00ff88] hover:bg-[#00dd77] text-[#0a0a0f] shadow-lg shadow-[#00ff88]/20 transition-all hover:scale-105"
      >
        <Plus className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0f]/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#2a2a38] bg-[#12121a] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#2a2a38]">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#00ff88]" />
            <h3 className="font-bold text-[#f0f0f5]">Adicionar Jogador</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-[#2a2a38] text-[#888899] hover:text-[#f0f0f5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="p-3 bg-[#00ff88]/10 border-b border-[#00ff88]/30">
            <div className="flex items-center gap-2 text-[#00ff88]">
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Jogador adicionado com sucesso!</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-[#888899] mb-1.5">
              Nome do Jogador
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Neymar Jr"
              className="bg-[#1a1a24] border-[#2a2a38] text-[#f0f0f5] placeholder:text-[#666677]"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-xs font-medium text-[#888899] mb-1.5">
              Posição
            </label>
            <div className="flex flex-wrap gap-1.5">
              {POSITIONS.map((pos) => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => setPosition(pos)}
                  className={cn(
                    "px-2 py-1 rounded text-xs font-medium transition-colors",
                    position === pos
                      ? "bg-[#00ff88] text-[#0a0a0f]"
                      : "bg-[#1a1a24] text-[#888899] hover:bg-[#2a2a38] hover:text-[#f0f0f5]"
                  )}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>

          {/* Tier */}
          <div>
            <label className="block text-xs font-medium text-[#888899] mb-1.5">
              Tier (Qualidade)
            </label>
            <div className="flex gap-2">
              {TIERS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTier(t)}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-sm font-bold transition-colors border",
                    tier === t
                      ? t === 1
                        ? "bg-[#ffd700]/20 text-[#ffd700] border-[#ffd700]"
                        : t === 2
                        ? "bg-[#c0c0d0]/20 text-[#c0c0d0] border-[#c0c0d0]"
                        : "bg-[#cd7f32]/20 text-[#cd7f32] border-[#cd7f32]"
                      : "bg-[#1a1a24] text-[#888899] border-[#2a2a38] hover:bg-[#2a2a38]"
                  )}
                >
                  Tier {t}
                </button>
              ))}
            </div>
          </div>

          {/* Value */}
          <div>
            <label className="block text-xs font-medium text-[#888899] mb-1.5">
              Valor (R$)
            </label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              min={0}
              step={1000000}
              className="bg-[#1a1a24] border-[#2a2a38] text-[#f0f0f5]"
            />
          </div>

          {/* Nationality */}
          <div>
            <label className="block text-xs font-medium text-[#888899] mb-1.5">
              Nacionalidade
            </label>
            <div className="flex flex-wrap gap-1.5">
              {NATIONALITIES.map((nat) => (
                <button
                  key={nat}
                  type="button"
                  onClick={() => setNationality(nat)}
                  className={cn(
                    "px-2 py-1 rounded text-xs font-medium transition-colors",
                    nationality === nat
                      ? "bg-[#00ff88] text-[#0a0a0f]"
                      : "bg-[#1a1a24] text-[#888899] hover:bg-[#2a2a38] hover:text-[#f0f0f5]"
                  )}
                >
                  {nat}
                </button>
              ))}
            </div>
          </div>

          {/* Initial Team */}
          <div>
            <label className="block text-xs font-medium text-[#888899] mb-1.5">
              Time Inicial (opcional)
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTeamId(null)}
                className={cn(
                  "flex-1 py-2 rounded-lg text-xs font-medium transition-colors border",
                  teamId === null
                    ? "bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]"
                    : "bg-[#1a1a24] text-[#888899] border-[#2a2a38] hover:bg-[#2a2a38]"
                )}
              >
                Livre
              </button>
              {state.teams.map((team) => (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => setTeamId(team.id)}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-xs font-medium transition-colors border",
                    teamId === team.id
                      ? "bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]"
                      : "bg-[#1a1a24] text-[#888899] border-[#2a2a38] hover:bg-[#2a2a38]"
                  )}
                >
                  {team.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={!name.trim()}
            className="w-full h-12 bg-[#00ff88] hover:bg-[#00dd77] text-[#0a0a0f] font-bold"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Adicionar Jogador
          </Button>
        </form>
      </div>
    </div>
  )
}
