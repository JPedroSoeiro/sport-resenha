"use client"

import { useGame } from "@/lib/game-context"
import { POSITION_ORDER } from "@/lib/game-types"
import { Button } from "@/components/ui/button"
import { Trophy, Star, DollarSign, FileText, Users, RotateCcw, Award, TrendingUp, TrendingDown, UserCheck, Share2, Copy, Check, History, Gavel } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const GRADE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "A+": { bg: "bg-amber-500/20", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500" },
  "A": { bg: "bg-primary/20", text: "text-primary", border: "border-primary" },
  "B+": { bg: "bg-blue-500/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500" },
  "B": { bg: "bg-violet-500/20", text: "text-violet-600 dark:text-violet-400", border: "border-violet-500" },
  "C+": { bg: "bg-orange-500/20", text: "text-orange-600 dark:text-orange-400", border: "border-orange-500" },
  "C": { bg: "bg-destructive/20", text: "text-destructive", border: "border-destructive" },
}

const TIER_COLORS = {
  1: "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
  2: "bg-slate-400/20 text-slate-600 dark:text-slate-400 border-slate-400/30",
  3: "bg-orange-700/20 text-orange-700 dark:text-orange-400 border-orange-700/30",
}

function getTeamCritique(grade: string, budgetHealth: number, avgTier: number, reservePenalties: number): string {
  if (grade === "A+" || grade === "A") {
    return "Excelente trabalho de reconstrução! O elenco tem qualidade de elite e as finanças estão saudáveis. Temporada promissora pela frente."
  }
  if (grade === "B+" || grade === "B") {
    if (reservePenalties > 2) {
      return "Perdeu muitos leilões e teve que usar reservas demais. A falta de competitividade no mercado custou caro."
    }
    if (budgetHealth < 30) {
      return "Elenco competitivo, mas as finanças estão apertadas. Cuidado com possíveis dificuldades no meio da temporada."
    }
    return "Bom trabalho geral. O elenco tem potencial, mas há espaço para melhorias em algumas posições-chave."
  }
  if (avgTier > 2.5) {
    return "Elenco com muitos jogadores de nível inferior. A luta contra o rebaixamento pode ser realidade."
  }
  if (reservePenalties > 3) {
    return "Muitas penalidades de leilão! O gerente precisa aprender a negociar melhor no mercado."
  }
  return "Reconstrução abaixo do esperado. O torcedor merecia mais ambição nas contratações."
}

export function EvaluationView() {
  const { state, dispatch, getTeamPlayers, formatCurrency, calculateTeamScore, getManagerName, exportSquadText, getFinancialHistory } = useGame()
  const [copiedTeamId, setCopiedTeamId] = useState<number | null>(null)
  const [showHistoryTeamId, setShowHistoryTeamId] = useState<number | null>(null)

  const handleRestart = () => {
    dispatch({ type: "RESET_GAME" })
  }

  const handleExportSquad = async (teamId: number) => {
    const text = exportSquadText(teamId)
    try {
      await navigator.clipboard.writeText(text)
      setCopiedTeamId(teamId)
      setTimeout(() => setCopiedTeamId(null), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopiedTeamId(teamId)
      setTimeout(() => setCopiedTeamId(null), 2000)
    }
  }

  // Calculate scores for all teams
  const teamScores = state.teams.map((team) => ({
    team,
    ...calculateTeamScore(team.id),
  }))

  const sortedTeams = [...teamScores].sort((a, b) => b.score - a.score)
  const winner = sortedTeams[0]

  return (
    <div className="min-h-screen p-6 bg-background">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-500/20 border border-amber-500/30 mb-4">
          <Trophy className="w-10 h-10 text-amber-500" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-oswald)' }}>
          AVALIAÇÃO FINAL
        </h2>
        <p className="text-muted-foreground">Análise completa das reconstruções</p>
      </div>

      {/* Winner Banner */}
      <div className="max-w-2xl mx-auto mb-8 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/30">
        <div className="flex items-center justify-center gap-4">
          <Award className="w-8 h-8 text-amber-500" />
          <div className="text-center">
            <p className="text-sm text-amber-600 dark:text-amber-400 uppercase tracking-wider">Melhor Reconstrução</p>
            <h3 className="text-2xl font-bold text-foreground">{winner.team.name}</h3>
            <p className="text-sm text-muted-foreground">
              Gerente: <span className="text-foreground">{getManagerName(winner.team.id)}</span> | 
              Nota: {winner.grade} ({winner.score.toFixed(0)} pontos)
            </p>
          </div>
          <Award className="w-8 h-8 text-amber-500" />
        </div>
      </div>

      {/* Managers Comparison */}
      <div className="max-w-4xl mx-auto mb-8 p-4 rounded-xl bg-card border border-border">
        <h3 className="text-center text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
          Comparativo dos Gerentes
        </h3>
        <div className={cn(
          "grid gap-4",
          state.playerCount === 2 ? "grid-cols-2" : 
          state.playerCount === 3 ? "grid-cols-3" : 
          state.playerCount === 4 ? "grid-cols-4" : 
          "grid-cols-5"
        )}>
          {sortedTeams.map(({ team, grade }, index) => {
            const teamPlayers = getTeamPlayers(team.id)
            const reservesUsed = teamPlayers.filter(p => p.activatedFromReserve).length
            const gradeStyle = GRADE_COLORS[grade] || GRADE_COLORS["C"]
            
            return (
              <div
                key={team.id}
                className={cn(
                  "p-4 rounded-xl text-center",
                  index === 0 ? "bg-amber-500/10 border border-amber-500/30" : "bg-secondary"
                )}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center font-bold mx-auto mb-2 border-2"
                  style={{
                    backgroundColor: team.primaryColor,
                    color: team.secondaryColor,
                    borderColor: team.primaryColor === "#000000" ? "#333" : team.primaryColor,
                  }}
                >
                  {team.shortName}
                </div>
                <p className="font-bold text-foreground">{getManagerName(team.id)}</p>
                <p className="text-xs text-muted-foreground mb-2">{team.name}</p>
                <div className={cn(
                  "inline-flex px-3 py-1 rounded-full text-sm font-bold",
                  gradeStyle.bg,
                  gradeStyle.text
                )}>
                  {grade}
                </div>
                <div className="mt-2 text-xs text-muted-foreground/70">
                  <span className="text-primary">{formatCurrency(team.currentBudget)}</span> restante
                </div>
                {reservesUsed > 0 && (
                  <div className="mt-1 text-xs text-amber-500">
                    {reservesUsed} reserva{reservesUsed > 1 ? "s" : ""} ativado{reservesUsed > 1 ? "s" : ""}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Team Cards */}
      <div className={cn(
        "grid gap-6 max-w-7xl mx-auto",
        state.playerCount === 2 ? "grid-cols-1 lg:grid-cols-2" : 
        state.playerCount <= 3 ? "grid-cols-1 lg:grid-cols-3" : 
        "grid-cols-1 lg:grid-cols-3 xl:grid-cols-4"
      )}>
        {sortedTeams.map(({ team, grade, score, details }, index) => {
          const teamPlayers = getTeamPlayers(team.id).filter((p) => !p.sold)
          const avgTier = teamPlayers.length > 0
            ? teamPlayers.reduce((sum, p) => sum + p.tier, 0) / teamPlayers.length
            : 3
          const budgetHealth = (team.currentBudget / team.initialBudget) * 100
          const gradeStyle = GRADE_COLORS[grade] || GRADE_COLORS["C"]
          const reservesUsed = teamPlayers.filter(p => p.activatedFromReserve).length
          const critique = getTeamCritique(grade, budgetHealth, avgTier, reservesUsed)

          return (
            <div
              key={team.id}
              className={cn(
                "rounded-2xl border-2 overflow-hidden transition-all",
                index === 0 ? "border-amber-500/50 bg-amber-500/5" : "border-border bg-card"
              )}
            >
              {/* Position Badge */}
              {index < 3 && (
                <div className={cn(
                  "py-2 px-4 text-center font-bold text-sm",
                  index === 0 ? "bg-amber-500/20 text-amber-600 dark:text-amber-400" :
                  index === 1 ? "bg-slate-400/20 text-slate-600 dark:text-slate-400" :
                  "bg-orange-700/20 text-orange-700 dark:text-orange-400"
                )}>
                  {index === 0 ? "1º LUGAR" : index === 1 ? "2º LUGAR" : "3º LUGAR"}
                </div>
              )}

              {/* Team Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-xl border-2"
                    style={{
                      backgroundColor: team.primaryColor,
                      color: team.secondaryColor,
                      borderColor: team.primaryColor === "#000000" ? "#333" : team.primaryColor,
                    }}
                  >
                    {team.shortName}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground">{team.name}</h3>
                    <p className="text-sm text-primary">{getManagerName(team.id)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{teamPlayers.length} jogadores</span>
                    </div>
                  </div>
                  <div className={cn(
                    "w-16 h-16 rounded-xl flex items-center justify-center font-bold text-2xl border-2",
                    gradeStyle.bg,
                    gradeStyle.text,
                    gradeStyle.border
                  )}>
                    {grade}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="p-4 grid grid-cols-2 gap-4 border-b border-border">
                <div className="p-3 rounded-lg bg-secondary">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className={cn(
                      "w-4 h-4",
                      budgetHealth > 50 ? "text-primary" : budgetHealth > 25 ? "text-amber-500" : "text-destructive"
                    )} />
                    <span className="text-xs text-muted-foreground">Orçamento</span>
                  </div>
                  <p className={cn(
                    "font-bold",
                    budgetHealth > 50 ? "text-primary" : budgetHealth > 25 ? "text-amber-500" : "text-destructive"
                  )}>
                    {formatCurrency(team.currentBudget)}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {budgetHealth > 50 ? (
                      <TrendingUp className="w-3 h-3 text-primary" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-destructive" />
                    )}
                    <span className="text-xs text-muted-foreground">{budgetHealth.toFixed(0)}% do inicial</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-secondary">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-amber-500" />
                    <span className="text-xs text-muted-foreground">Qualidade Média</span>
                  </div>
                  <p className="font-bold text-foreground">
                    Tier {avgTier.toFixed(1)}
                  </p>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3].map((t) => (
                      <div
                        key={t}
                        className={cn(
                          "w-2 h-2 rounded-full",
                          avgTier <= t ? "bg-primary" : "bg-border"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Reserve Penalty Warning */}
              {reservesUsed > 0 && (
                <div className="px-4 py-3 border-b border-border bg-amber-500/5">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-amber-500" />
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      <strong>{reservesUsed} jogador{reservesUsed > 1 ? "es" : ""}</strong> ativado{reservesUsed > 1 ? "s" : ""} do banco de reservas (penalidade de leilão)
                    </p>
                  </div>
                </div>
              )}

              {/* Presidential Decree */}
              {team.presidentialDecree && (
                <div className="px-4 py-3 border-b border-border bg-violet-500/5">
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">{team.presidentialDecree.name}</p>
                      <p className="text-[10px] text-muted-foreground/70 mt-0.5">{team.presidentialDecree.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Squad */}
              <div className="p-4 max-h-72 overflow-auto">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Elenco Final
                </h4>
                <div className="space-y-1.5">
                  {POSITION_ORDER.map((position) => {
                    const player = teamPlayers.find((p) => p.position === position)
                    if (!player) return null

                    return (
                      <div
                        key={player.id}
                        className={cn(
                          "flex items-center justify-between p-2 rounded-lg",
                          player.lostAuction ? "bg-destructive/10 border border-destructive/30" :
                          player.activatedFromReserve ? "bg-amber-500/10 border border-amber-500/30" : "bg-secondary"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "w-6 h-6 rounded text-[10px] font-bold flex items-center justify-center border",
                            TIER_COLORS[player.tier]
                          )}>
                            T{player.tier}
                          </span>
                          <span className="text-sm text-foreground">{player.name}</span>
                          {player.lostAuction && (
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-destructive text-destructive-foreground">
                              LEILAO PERDIDO
                            </span>
                          )}
                          {player.activatedFromReserve && !player.lostAuction && (
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400">
                              RESERVA
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{position}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Financial History Modal */}
              {showHistoryTeamId === team.id && (
                <div className="p-4 border-t border-border bg-secondary/50 max-h-48 overflow-auto">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <History className="w-3 h-3" />
                      Historico Financeiro
                    </h4>
                    <button 
                      onClick={() => setShowHistoryTeamId(null)}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Fechar
                    </button>
                  </div>
                  {(() => {
                    const history = getFinancialHistory(team.id)
                    if (history.length === 0) {
                      return <p className="text-xs text-muted-foreground">Nenhuma transacao registrada.</p>
                    }
                    return (
                      <div className="space-y-2">
                        {history.map((entry, idx) => (
                          <div 
                            key={idx} 
                            className={cn(
                              "flex items-center justify-between p-2 rounded text-xs",
                              entry.type === "sale" && "bg-primary/10",
                              entry.type === "signing" && "bg-blue-500/10",
                              entry.type === "auction_win" && "bg-amber-500/10",
                              entry.type === "auction_loss" && "bg-destructive/10"
                            )}
                          >
                            <div className="flex items-center gap-2">
                              {entry.type === "sale" && <DollarSign className="w-3 h-3 text-primary" />}
                              {entry.type === "signing" && <Users className="w-3 h-3 text-blue-500" />}
                              {entry.type === "auction_win" && <Gavel className="w-3 h-3 text-amber-500" />}
                              {entry.type === "auction_loss" && <Gavel className="w-3 h-3 text-destructive" />}
                              <span className="text-foreground">{entry.playerName}</span>
                              <span className="text-muted-foreground">({entry.position})</span>
                            </div>
                            <span className={cn(
                              "font-medium",
                              entry.type === "sale" && "text-primary",
                              entry.type === "signing" && "text-blue-500",
                              entry.type === "auction_win" && "text-amber-500",
                              entry.type === "auction_loss" && "text-destructive"
                            )}>
                              {entry.type === "sale" ? "+" : entry.type === "auction_loss" ? "-" : "-"}
                              {formatCurrency(entry.amount)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )
                  })()}
                </div>
              )}

              {/* Action Buttons */}
              <div className="p-4 border-t border-border flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHistoryTeamId(showHistoryTeamId === team.id ? null : team.id)}
                  className="flex-1"
                >
                  <History className="w-4 h-4 mr-1" />
                  Historico
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExportSquad(team.id)}
                  className="flex-1"
                >
                  {copiedTeamId === team.id ? (
                    <>
                      <Check className="w-4 h-4 mr-1 text-primary" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 mr-1" />
                      Exportar
                    </>
                  )}
                </Button>
              </div>

              {/* Critique */}
              <div className="p-4 border-t border-border bg-secondary/50">
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  &ldquo;{critique}&rdquo;
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Restart Button */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={handleRestart}
          className="px-8 py-4 text-lg font-bold"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Jogar Novamente
        </Button>
      </div>
    </div>
  )
}
