"use client"

import { useState } from "react"
import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, DollarSign, Sparkles, Users, Minus, Plus, ChevronRight, Globe } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { CHAMPIONSHIPS } from "@/lib/data/championships"
import type { ChampionshipId } from "@/lib/game-types"
import { cn } from "@/lib/utils"

const BUDGET_PRESETS_BR = [
  { label: "€30M",  value:  30_000_000, description: "Modo Difícil" },
  { label: "€50M",  value:  50_000_000, description: "Recomendado" },
  { label: "€75M",  value:  75_000_000, description: "Modo Fácil" },
  { label: "€100M", value: 100_000_000, description: "Dinheiro Infinito" },
]

const BUDGET_PRESETS_PL = [
  { label: "€100M", value: 100_000_000, description: "Modo Difícil" },
  { label: "€150M", value: 150_000_000, description: "Recomendado" },
  { label: "€200M", value: 200_000_000, description: "Modo Fácil" },
  { label: "€300M", value: 300_000_000, description: "Dinheiro Infinito" },
]

export function HostSetupView() {
  const { dispatch, formatCurrency } = useGame()

  // Step 1: championship; Step 2: budget + players
  const [step, setStep] = useState<1 | 2>(1)
  const [championship, setChampionship] = useState<ChampionshipId>("brasileirao")
  const [selectedBudget, setSelectedBudget] = useState(50_000_000)
  const [customBudget, setCustomBudget] = useState("")
  const [playerCount, setPlayerCount] = useState(3)

  const selectedChamp = CHAMPIONSHIPS.find(c => c.id === championship)!
  const BUDGET_PRESETS = championship === "premier-league" ? BUDGET_PRESETS_PL : BUDGET_PRESETS_BR

  const handleContinue = () => {
    if (step === 1) {
      // Ao mudar de campeonato, resetar o budget para o padrão do novo campeonato
      setSelectedBudget(championship === "premier-league" ? 150_000_000 : 50_000_000)
      setCustomBudget("")
      setStep(2)
      return
    }
    const budget = customBudget ? parseInt(customBudget) * 1_000_000 : selectedBudget
    dispatch({ type: "SET_GLOBAL_BUDGET", budget, playerCount, championship })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="text-center max-w-xl w-full">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 mb-6">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-oswald)" }}>
          SPORT RESENHA
        </h1>
        <p className="text-lg text-muted-foreground mb-1">Gerente de Futebol</p>
        <p className="text-sm text-muted-foreground/70 mb-8">Configure o jogo antes de começar</p>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[
            { n: 1, label: "Campeonato" },
            { n: 2, label: "Orçamento" },
          ].map(({ n, label }) => (
            <div key={n} className="flex items-center gap-2">
              <div className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all",
                step === n
                  ? "border-primary bg-primary/20 text-primary scale-110"
                  : step > n
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary text-muted-foreground"
              )}>
                {step > n ? "✓" : n}
              </div>
              <span className={cn("text-xs font-medium", step === n ? "text-primary" : "text-muted-foreground")}>
                {label}
              </span>
              {n < 2 && <div className={cn("w-8 h-0.5", step > n ? "bg-primary" : "bg-border")} />}
            </div>
          ))}
        </div>

        {/* ── STEP 1: Championship Selection ── */}
        {step === 1 && (
          <>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Escolha o Campeonato</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-8">
              {CHAMPIONSHIPS.map((champ) => {
                const isSelected = championship === champ.id
                return (
                  <button
                    key={champ.id}
                    onClick={() => setChampionship(champ.id)}
                    className={cn(
                      "p-5 rounded-xl border-2 transition-all text-left flex items-center gap-4",
                      isSelected
                        ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                        : "border-border bg-card hover:border-primary/50"
                    )}
                  >
                    {/* Flag / Icon */}
                    <div className="text-4xl flex-shrink-0">{champ.flag}</div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={cn("font-bold text-lg", isSelected ? "text-primary" : "text-foreground")}>
                          {champ.name}
                        </span>
                        <span className="text-xs text-muted-foreground">{champ.country}</span>
                      </div>
                      <p className="text-xs text-muted-foreground/80">{champ.description}</p>

                      {/* Pool badge */}
                      <div className={cn(
                        "inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold border",
                        champ.poolRegion === "sul-americana"
                          ? "bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400"
                          : "bg-blue-500/10 text-blue-600 border-blue-500/30 dark:text-blue-400"
                      )}>
                        🌎 Mercado {champ.poolRegion === "sul-americana" ? "Sul-Americano" : "Europeu"}
                      </div>
                    </div>

                    {/* Selected indicator */}
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-foreground text-[10px] font-bold">✓</span>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* ── STEP 2: Budget + Players ── */}
        {step === 2 && (
          <>
            {/* Selected championship badge */}
            <div className="flex items-center justify-center gap-2 mb-6 p-3 rounded-xl bg-primary/5 border border-primary/20">
              <span className="text-2xl">{selectedChamp.flag}</span>
              <div>
                <span className="font-bold text-foreground">{selectedChamp.name}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  — Mercado {selectedChamp.poolRegion === "sul-americana" ? "Sul-Americano" : "Europeu"}
                </span>
              </div>
              <button
                onClick={() => setStep(1)}
                className="ml-auto text-xs text-primary hover:underline"
              >
                Trocar
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Configuração do Host</h2>
            </div>

            {/* Player Count */}
            <div className="mb-6 p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Users className="w-5 h-5 text-primary" />
                <Label className="text-sm font-medium text-foreground">Número de Jogadores</Label>
              </div>
              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" size="icon" onClick={() => playerCount > 2 && setPlayerCount(p => p - 1)} disabled={playerCount <= 2} className="h-10 w-10">
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-16 text-center text-3xl font-bold text-primary">{playerCount}</span>
                <Button variant="outline" size="icon" onClick={() => playerCount < 5 && setPlayerCount(p => p + 1)} disabled={playerCount >= 5} className="h-10 w-10">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Mínimo 2, máximo 5 jogadores</p>
            </div>

            {/* Budget presets */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {BUDGET_PRESETS.map(preset => (
                <button
                  key={preset.value}
                  onClick={() => { setSelectedBudget(preset.value); setCustomBudget("") }}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all text-left",
                    selectedBudget === preset.value && !customBudget
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className={cn("w-4 h-4", selectedBudget === preset.value && !customBudget ? "text-primary" : "text-muted-foreground")} />
                    <span className={cn("font-bold text-lg", selectedBudget === preset.value && !customBudget ? "text-primary" : "text-foreground")}>
                      {preset.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{preset.description}</p>
                </button>
              ))}
            </div>

            {/* Custom budget */}
            <div className="mb-6">
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
                    onChange={e => setCustomBudget(e.target.value)}
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
                  <p className="text-2xl font-bold text-primary" suppressHydrationWarning>
                    {formatCurrency(customBudget ? parseInt(customBudget) * 1_000_000 : selectedBudget)}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Continue button */}
        <Button onClick={handleContinue} className="w-full h-14 text-lg font-bold">
          {step === 1
            ? (<>Próximo: Configurar Orçamento <ChevronRight className="w-5 h-5 ml-1" /></>)
            : "Continuar para Seleção de Jogadores"
          }
        </Button>
      </div>
    </div>
  )
}
