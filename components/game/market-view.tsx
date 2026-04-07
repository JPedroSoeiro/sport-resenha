"use client"

import { useState } from "react"
import { useGame, Player } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check, DollarSign, AlertTriangle, Flag, Shield, Users, Ban, UserCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const TIER_COLORS = {
  1: { bg: "bg-amber-500/20", border: "border-amber-500/30", text: "text-amber-600 dark:text-amber-400", label: "Elite" },
  2: { bg: "bg-slate-400/20", border: "border-slate-400/30", text: "text-slate-600 dark:text-slate-400", label: "Regular" },
  3: { bg: "bg-orange-700/20", border: "border-orange-700/30", text: "text-orange-700 dark:text-orange-400", label: "Econômico" },
}

interface PlayerCardProps {
  player: Player
  isSelected: boolean
  onSelect: () => void
  canAfford: boolean
  validationMessage?: string
  isBlocked?: boolean
}

function PlayerMarketCard({ player, isSelected, onSelect, canAfford, validationMessage, isBlocked }: PlayerCardProps) {
  const { formatCurrency } = useGame()
  const tierStyle = TIER_COLORS[player.tier]
  const isDisabled = !canAfford || !!validationMessage || isBlocked

  return (
    <div
      onClick={() => !isDisabled && onSelect()}
      className={cn(
        "relative rounded-xl border-2 p-5 transition-all cursor-pointer",
        isSelected
          ? "border-primary bg-primary/10 ring-2 ring-primary ring-offset-2 ring-offset-background"
          : isDisabled
          ? "border-border/50 bg-card/50 cursor-not-allowed opacity-60"
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      {/* Tier Badge */}
      <div className={cn(
        "absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold",
        tierStyle.bg,
        tierStyle.text,
        "border",
        tierStyle.border
      )}>
        TIER {player.tier}
      </div>

      {/* Selected Check */}
      {isSelected && (
        <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-4 h-4 text-primary-foreground" />
        </div>
      )}

      {/* Blocked Badge */}
      {isBlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-xl">
          <div className="text-center">
            <Ban className="w-8 h-8 text-destructive mx-auto mb-2" />
            <p className="text-xs text-destructive font-bold">BLOQUEADO</p>
          </div>
        </div>
      )}

      {/* Player Info */}
      <div className="mb-4">
        <h4 className="font-bold text-foreground text-lg">{player.name}</h4>
        <p className="text-sm text-muted-foreground">{player.position}</p>
      </div>

      {/* Details */}
      <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground/70">
        <div className="flex items-center gap-1">
          <Flag className="w-4 h-4" />
          <span>{player.nationality}</span>
        </div>
        <div className={cn("flex items-center gap-1", tierStyle.text)}>
          <Shield className="w-4 h-4" />
          <span>{tierStyle.label}</span>
        </div>
      </div>

      {/* Value */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
        <span className="text-sm text-muted-foreground">Valor</span>
        <span className={cn(
          "font-bold text-lg",
          canAfford ? "text-primary" : "text-destructive"
        )}>
          {formatCurrency(player.value)}
        </span>
      </div>

      {/* Validation Warning */}
      {validationMessage && !isBlocked && (
        <div className="mt-3 p-2 rounded-lg bg-destructive/10 border border-destructive/30">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-xs text-destructive">{validationMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export function MarketView() {
  const { 
    state, 
    dispatch, 
    getCurrentPosition, 
    getTransferOptions, 
    getReserveForPosition,
    formatCurrency, 
    validateSigning,
    getManagerName,
    isPositionBlocked,
  } = useGame()
  
  const [selections, setSelections] = useState<Record<number, number | null>>({})
  const [currentTeamSelecting, setCurrentTeamSelecting] = useState(0)

  const currentPosition = getCurrentPosition()
  const transferOptions = getTransferOptions()
  const teamsThatSold = state.soldInCurrentRound

  // Only teams that sold need to buy
  const teamsNeedingPlayers = state.teams.filter((t) => teamsThatSold.includes(t.id))

  if (teamsNeedingPlayers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary mb-6">
            <Users className="w-8 h-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Nenhuma Venda
          </h2>
          <p className="text-muted-foreground mb-6">
            Nenhum time vendeu seu jogador de {currentPosition}
          </p>
          <Button
            onClick={() => dispatch({ type: "NEXT_POSITION" })}
          >
            Próxima Posição
          </Button>
        </div>
      </div>
    )
  }

  const currentTeam = teamsNeedingPlayers[currentTeamSelecting]
  const isBlocked = isPositionBlocked(currentTeam.id, currentPosition)
  const reserve = getReserveForPosition(currentTeam.id, currentPosition)

  // If this team is blocked (lost auction), show reserve activation
  if (isBlocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-destructive/10 border border-destructive/30 mb-6">
            <Ban className="w-10 h-10 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-oswald)' }}>
            PENALIDADE DE LEILÃO
          </h2>
          <p className="text-muted-foreground mb-4">
            <span className="font-bold text-foreground">{currentTeam.name}</span> perdeu o leilão e está bloqueado para contratar nesta posição.
          </p>
          
          {reserve && (
            <div className="p-4 rounded-xl bg-card border border-border mb-6">
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-foreground">Jogador Reserva Ativado</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm border",
                  TIER_COLORS[reserve.tier].bg,
                  TIER_COLORS[reserve.tier].text,
                  TIER_COLORS[reserve.tier].border
                )}>
                  T{reserve.tier}
                </div>
                <div className="text-left">
                  <p className="font-bold text-foreground">{reserve.name}</p>
                  <p className="text-xs text-muted-foreground">{reserve.position}</p>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={() => {
              if (currentTeamSelecting < teamsNeedingPlayers.length - 1) {
                setCurrentTeamSelecting((prev) => prev + 1)
              } else {
                dispatch({ type: "CONFIRM_SELECTIONS" })
              }
            }}
            className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold"
          >
            Continuar
          </Button>
        </div>
      </div>
    )
  }

  const handleSelectPlayer = (playerId: number) => {
    setSelections((prev) => ({
      ...prev,
      [currentTeam.id]: prev[currentTeam.id] === playerId ? null : playerId,
    }))
  }

  const handleSelectReserve = () => {
    setSelections((prev) => ({
      ...prev,
      [currentTeam.id]: null,
    }))
  }

  const handleConfirmSelection = () => {
    if (currentTeamSelecting < teamsNeedingPlayers.length - 1) {
      setCurrentTeamSelecting((prev) => prev + 1)
    } else {
      // All teams selected, process selections
      Object.entries(selections).forEach(([teamId, playerId]) => {
        dispatch({ type: "SELECT_PLAYER", teamId: Number(teamId), playerId })
      })
      dispatch({ type: "CONFIRM_SELECTIONS" })
    }
  }

  const currentSelection = selections[currentTeam.id]

  return (
    <div className="flex flex-col min-h-[400px] p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShoppingCart className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'var(--font-oswald)' }}>
            MERCADO DE TRANSFERÊNCIAS
          </h2>
        </div>
        <p className="text-muted-foreground">
          Posição: <span className="font-bold text-foreground">{currentPosition}</span>
        </p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Escolha entre as 3 opções disponíveis ou use seu reserva
        </p>
      </div>

      {/* Current Team Info */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl border-2"
          style={{
            borderColor: currentTeam.primaryColor === "#000000" ? "#333" : currentTeam.primaryColor,
            backgroundColor: `${currentTeam.primaryColor}10`,
          }}
        >
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center font-bold border-2"
            style={{
              backgroundColor: currentTeam.primaryColor,
              color: currentTeam.secondaryColor,
              borderColor: currentTeam.primaryColor === "#000000" ? "#333" : currentTeam.primaryColor,
            }}
          >
            {currentTeam.shortName}
          </div>
          <div>
            <p className="font-bold text-foreground">{currentTeam.name}</p>
            <p className="text-xs text-muted-foreground">{getManagerName(currentTeam.id)}</p>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-primary" />
              <span className="text-sm text-primary font-bold">{formatCurrency(currentTeam.currentBudget)}</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          Time {currentTeamSelecting + 1} de {teamsNeedingPlayers.length}
        </div>
      </div>

      {/* Transfer Options - 3 Cards */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {transferOptions.map((option) => {
            const validation = validateSigning(currentTeam.id, option.player)
            return (
              <PlayerMarketCard
                key={option.player.id}
                player={option.player}
                isSelected={currentSelection === option.player.id}
                onSelect={() => handleSelectPlayer(option.player.id)}
                canAfford={currentTeam.currentBudget >= option.player.value}
                validationMessage={!validation.valid ? validation.message : undefined}
              />
            )
          })}
        </div>
      </div>

      {/* Reserve Option */}
      {reserve && (
        <div className="mt-6 p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-sm text-muted-foreground">Opção Alternativa</p>
                <p className="font-bold text-foreground">Usar Reserva: {reserve.name}</p>
                <p className="text-xs text-muted-foreground/70">Tier {reserve.tier} - Sem custo adicional</p>
              </div>
            </div>
            <Button
              onClick={handleSelectReserve}
              variant="outline"
              className={cn(
                currentSelection === null && "border-amber-500 ring-2 ring-amber-500 ring-offset-2 ring-offset-background"
              )}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Usar Reserva
            </Button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-border">
        <Button
          onClick={handleConfirmSelection}
          className="h-12 px-8 font-bold"
        >
          <Check className="w-4 h-4 mr-2" />
          Confirmar Escolha
        </Button>
      </div>

      {/* Warning about auction */}
      <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 max-w-2xl mx-auto">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-600 dark:text-amber-400">
            <strong>Atenção:</strong> Se dois ou mais times escolherem o mesmo jogador, haverá um leilão manual. 
            O time que perder ou desistir será <strong>bloqueado</strong> e deverá usar seu reserva automaticamente.
          </p>
        </div>
      </div>
    </div>
  )
}
