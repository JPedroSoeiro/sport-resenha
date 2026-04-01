"use client"

import { useState } from "react"
import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Check, UserPlus, Shield } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function PlayerSetupView() {
  const { state, dispatch, formatCurrency, availableTeams } = useGame()
  const [currentStep, setCurrentStep] = useState<"names" | "teams">("names")
  const [playerNames, setPlayerNames] = useState<string[]>(Array(state.playerCount).fill(""))
  const [currentPlayerSelecting, setCurrentPlayerSelecting] = useState(0)

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames]
    newNames[index] = name
    setPlayerNames(newNames)
  }

  const handleConfirmNames = () => {
    // Add all managers
    playerNames.forEach((name) => {
      if (name.trim()) {
        dispatch({ type: "ADD_MANAGER", name: name.trim() })
      }
    })
    setCurrentStep("teams")
  }

  const handleSelectTeam = (teamId: number) => {
    const manager = state.managers[currentPlayerSelecting]
    if (!manager) return

    dispatch({ type: "SELECT_TEAM", managerId: manager.id, teamId })
    
    if (currentPlayerSelecting < state.playerCount - 1) {
      setCurrentPlayerSelecting(prev => prev + 1)
    }
  }

  const allNamesValid = playerNames.every((name) => name.trim().length > 0)
  const selectedTeamIds = state.teams.map(t => t.id)

  if (currentStep === "names") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-background">
        {/* Theme Toggle - Top Right */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="text-center max-w-md w-full">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 mb-6">
            <Users className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-oswald)' }}>
            JOGADORES
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            Insira os nomes dos {state.playerCount} gerentes que participarão do jogo
          </p>

          <div className="space-y-4 mb-8">
            {Array.from({ length: state.playerCount }, (_, index) => (
              <div key={index} className="text-left">
                <Label htmlFor={`player-${index}`} className="text-sm text-muted-foreground mb-2 block">
                  Gerente {index + 1}
                </Label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id={`player-${index}`}
                    type="text"
                    placeholder={`Nome do Gerente ${index + 1}`}
                    value={playerNames[index]}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    className="pl-10"
                  />
                  {playerNames[index].trim() && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-card border border-border mb-6">
            <p className="text-xs text-muted-foreground">Orçamento por time</p>
            <p className="text-xl font-bold text-primary">{formatCurrency(state.globalBudget)}</p>
          </div>

          <Button
            onClick={handleConfirmNames}
            disabled={!allNamesValid}
            className="w-full h-12 font-bold"
          >
            Continuar para Seleção de Times
          </Button>
        </div>
      </div>
    )
  }

  // Team Selection
  const currentManager = state.managers[currentPlayerSelecting]

  return (
    <div className="flex flex-col items-center min-h-screen p-8 bg-background">
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="text-center max-w-4xl w-full">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 mb-6">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-oswald)' }}>
          SELEÇÃO DE TIMES
        </h2>
        
        {currentManager && (
          <div className="mb-6">
            <p className="text-muted-foreground">Vez de</p>
            <p className="text-xl font-bold text-primary">{currentManager.name}</p>
            <p className="text-sm text-muted-foreground/70">Escolha seu time do Brasileirão</p>
          </div>
        )}

        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
          {state.managers.map((manager, index) => {
            const hasSelected = manager.teamId !== 0
            const isCurrent = index === currentPlayerSelecting
            
            return (
              <div key={manager.id} className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all",
                    hasSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCurrent
                      ? "border-primary bg-transparent text-primary"
                      : "border-border bg-card text-muted-foreground"
                  )}
                >
                  {hasSelected ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                {index < state.managers.length - 1 && (
                  <div className={cn(
                    "w-8 h-0.5",
                    hasSelected ? "bg-primary" : "bg-border"
                  )} />
                )}
              </div>
            )
          })}
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {availableTeams.map((team) => {
            const isSelected = selectedTeamIds.includes(team.id)
            const selectedByManager = state.managers.find(m => m.teamId === team.id)
            
            return (
              <button
                key={team.id}
                onClick={() => !isSelected && handleSelectTeam(team.id)}
                disabled={isSelected}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all",
                  isSelected
                    ? "border-border bg-card/50 opacity-50 cursor-not-allowed"
                    : "border-border bg-card hover:border-primary cursor-pointer"
                )}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-xl mx-auto mb-3 border-2"
                  style={{
                    backgroundColor: team.primaryColor,
                    color: team.secondaryColor,
                    borderColor: team.primaryColor === "#000000" ? "#333" : team.primaryColor,
                  }}
                >
                  {team.shortName}
                </div>
                <p className="font-bold text-foreground text-sm">{team.name}</p>
                {isSelected && selectedByManager && (
                  <p className="text-xs text-primary mt-1">{selectedByManager.name}</p>
                )}
              </button>
            )
          })}
        </div>

        {/* Selected Teams Summary */}
        {state.teams.length > 0 && (
          <div className="mt-8 p-4 rounded-xl bg-card border border-border">
            <h3 className="text-sm font-bold text-muted-foreground mb-3">Times Selecionados</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {state.teams.map((team) => {
                const manager = state.managers.find(m => m.teamId === team.id)
                return (
                  <div key={team.id} className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs border"
                      style={{
                        backgroundColor: team.primaryColor,
                        color: team.secondaryColor,
                        borderColor: team.primaryColor === "#000000" ? "#333" : team.primaryColor,
                      }}
                    >
                      {team.shortName}
                    </div>
                    <span className="text-sm text-foreground">{manager?.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
