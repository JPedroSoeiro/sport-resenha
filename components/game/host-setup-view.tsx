"use client"

import { useState } from "react"
import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, DollarSign, Sparkles, Users, Minus, Plus } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
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
  const [playerCount, setPlayerCount] = useState(3)

  const handleContinue = () => {
    const budget = customBudget ? parseInt(customBudget) * 1000000 : selectedBudget
    dispatch({ type: "SET_GLOBAL_BUDGET", budget, playerCount })
  }

  const decrementPlayers = () => {
    if (playerCount > 2) setPlayerCount(playerCount - 1)
  }

  const incrementPlayers = () => {
    if (playerCount < 5) setPlayerCount(playerCount + 1)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-background">
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="text-center max-w-xl w-full">
        {/* Logo/Title */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 mb-6">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-oswald)' }}>
          RECONSTRUÇÃO
        </h1>
        <p className="text-lg text-muted-foreground mb-2">
          Gerente de Futebol
        </p>
        <p className="text-sm text-muted-foreground/70 mb-8">
          Configure o jogo antes de começar
        </p>

        {/* Settings Icon */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Configuração do Host</h2>
        </div>

        {/* Player Count Selection */}
        <div className="mb-8 p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Users className="w-5 h-5 text-primary" />
            <Label className="text-sm font-medium text-foreground">Número de Jogadores</Label>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={decrementPlayers}
              disabled={playerCount <= 2}
              className="h-10 w-10"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <div className="w-16 text-center">
              <span className="text-3xl font-bold text-primary">{playerCount}</span>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={incrementPlayers}
              disabled={playerCount >= 5}
              className="h-10 w-10"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Mínimo 2, máximo 5 jogadores</p>
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
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className={cn(
                  "w-4 h-4",
                  selectedBudget === preset.value && !customBudget ? "text-primary" : "text-muted-foreground"
                )} />
                <span className={cn(
                  "font-bold text-lg",
                  selectedBudget === preset.value && !customBudget ? "text-primary" : "text-foreground"
                )}>
                  {preset.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{preset.description}</p>
            </button>
          ))}
        </div>

        {/* Custom Budget */}
        <div className="mb-8">
          <Label htmlFor="custom-budget" className="text-sm text-muted-foreground mb-2 block text-left">
            Ou defina um valor personalizado (em milhões de euros):
          </Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
              <Input
                id="custom-budget"
                type="number"
                placeholder="Ex: 60"
                value={customBudget}
                onChange={(e) => setCustomBudget(e.target.value)}
                className="pl-8"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">M</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 rounded-xl bg-card border border-border mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Jogadores</p>
              <p className="text-2xl font-bold text-primary">{playerCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Orçamento por time</p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(customBudget ? parseInt(customBudget) * 1000000 : selectedBudget)}
              </p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          className="w-full h-14 text-lg font-bold"
        >
          Continuar para Seleção de Jogadores
        </Button>
      </div>
    </div>
  )
}
