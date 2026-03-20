"use client"

import { useState } from "react"
import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, DollarSign, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const BUDGET_PRESETS = [
  { label: "€30M", value: 30000000, description: "Modo Difícil" },
  { label: "€50M", value: 50000000, description: "Recomendado" },
  { label: "€75M", value: 75000000, description: "Modo Fácil" },
  { label: "€100M", value: 100000000, description: "Dinheiro Infinito" },
]

export function HostSetupView() {
  const { dispatch, formatCurrency } = useGame()
  const [selectedBudget, setSelectedBudget] = useState(50000000)
  const [customBudget, setCustomBudget] = useState("")

  const handleContinue = () => {
    const budget = customBudget ? parseInt(customBudget) * 1000000 : selectedBudget
    dispatch({ type: "SET_GLOBAL_BUDGET", budget })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-[#0a0a0f]">
      <div className="text-center max-w-xl w-full">
        {/* Logo/Title */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#00ff88]/10 border border-[#00ff88]/30 mb-6">
          <Sparkles className="w-10 h-10 text-[#00ff88]" />
        </div>
        
        <h1 className="text-4xl font-bold text-[#f0f0f5] mb-2" style={{ fontFamily: 'var(--font-oswald)' }}>
          RECONSTRUÇÃO
        </h1>
        <p className="text-lg text-[#888899] mb-2">
          Gerente de Futebol
        </p>
        <p className="text-sm text-[#666677] mb-8">
          Configure o orçamento inicial que todos os times receberão
        </p>

        {/* Settings Icon */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-[#00ff88]" />
          <h2 className="text-xl font-bold text-[#f0f0f5]">Configuração do Host</h2>
        </div>

        {/* Budget Presets */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {BUDGET_PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => {
                setSelectedBudget(preset.value)
                setCustomBudget("")
              }}
              className={cn(
                "p-4 rounded-xl border-2 transition-all text-left",
                selectedBudget === preset.value && !customBudget
                  ? "border-[#00ff88] bg-[#00ff88]/10"
                  : "border-[#2a2a38] bg-[#12121a] hover:border-[#3a3a48]"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className={cn(
                  "w-4 h-4",
                  selectedBudget === preset.value && !customBudget ? "text-[#00ff88]" : "text-[#888899]"
                )} />
                <span className={cn(
                  "font-bold text-lg",
                  selectedBudget === preset.value && !customBudget ? "text-[#00ff88]" : "text-[#f0f0f5]"
                )}>
                  {preset.label}
                </span>
              </div>
              <p className="text-xs text-[#888899]">{preset.description}</p>
            </button>
          ))}
        </div>

        {/* Custom Budget */}
        <div className="mb-8">
          <Label htmlFor="custom-budget" className="text-sm text-[#888899] mb-2 block text-left">
            Ou defina um valor personalizado (em milhões de euros):
          </Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888899]">€</span>
              <Input
                id="custom-budget"
                type="number"
                placeholder="Ex: 60"
                value={customBudget}
                onChange={(e) => setCustomBudget(e.target.value)}
                className="pl-8 bg-[#12121a] border-[#2a2a38] text-[#f0f0f5] placeholder:text-[#666677]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888899]">M</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 rounded-xl bg-[#12121a] border border-[#2a2a38] mb-8">
          <p className="text-sm text-[#888899] mb-1">Orçamento por time</p>
          <p className="text-3xl font-bold text-[#00ff88]">
            {formatCurrency(customBudget ? parseInt(customBudget) * 1000000 : selectedBudget)}
          </p>
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          className="w-full h-14 text-lg font-bold bg-[#00ff88] hover:bg-[#00dd77] text-[#0a0a0f]"
        >
          Continuar para Seleção de Jogadores
        </Button>
      </div>
    </div>
  )
}
