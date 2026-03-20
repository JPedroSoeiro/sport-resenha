"use client"

import { useGame } from "@/lib/game-context"
import { POSITION_ORDER } from "@/lib/game-types"
import { Button } from "@/components/ui/button"
import { Trophy, Star, DollarSign, FileText, Users, RotateCcw, Award, TrendingUp, TrendingDown, UserCheck, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const GRADE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "A+": { bg: "bg-[#ffd700]/20", text: "text-[#ffd700]", border: "border-[#ffd700]" },
  "A": { bg: "bg-[#00ff88]/20", text: "text-[#00ff88]", border: "border-[#00ff88]" },
  "B+": { bg: "bg-[#3b82f6]/20", text: "text-[#3b82f6]", border: "border-[#3b82f6]" },
  "B": { bg: "bg-[#8b5cf6]/20", text: "text-[#8b5cf6]", border: "border-[#8b5cf6]" },
  "C+": { bg: "bg-[#f59e0b]/20", text: "text-[#f59e0b]", border: "border-[#f59e0b]" },
  "C": { bg: "bg-[#dc2626]/20", text: "text-[#dc2626]", border: "border-[#dc2626]" },
}

const TIER_COLORS = {
  1: "bg-[#ffd700]/20 text-[#ffd700] border-[#ffd700]/30",
  2: "bg-[#c0c0d0]/20 text-[#c0c0d0] border-[#c0c0d0]/30",
  3: "bg-[#cd7f32]/20 text-[#cd7f32] border-[#cd7f32]/30",
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
  const { state, dispatch, getTeamPlayers, formatCurrency, calculateTeamScore, getManagerName } = useGame()

  const handleRestart = () => {
    dispatch({ type: "RESET_GAME" })
  }

  // Calculate scores for all teams
  const teamScores = state.teams.map((team) => ({
    team,
    ...calculateTeamScore(team.id),
  }))

  const sortedTeams = [...teamScores].sort((a, b) => b.score - a.score)
  const winner = sortedTeams[0]

  return (
    <div className="min-h-screen p-6 bg-[#0a0a0f]">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#ffd700]/20 border border-[#ffd700]/30 mb-4">
          <Trophy className="w-10 h-10 text-[#ffd700]" />
        </div>
        <h2 className="text-3xl font-bold text-[#f0f0f5] mb-2" style={{ fontFamily: 'var(--font-oswald)' }}>
          AVALIAÇÃO FINAL
        </h2>
        <p className="text-[#888899]">Análise completa das reconstruções</p>
      </div>

      {/* Winner Banner */}
      <div className="max-w-2xl mx-auto mb-8 p-6 rounded-2xl bg-gradient-to-r from-[#ffd700]/10 via-[#ffd700]/20 to-[#ffd700]/10 border border-[#ffd700]/30">
        <div className="flex items-center justify-center gap-4">
          <Award className="w-8 h-8 text-[#ffd700]" />
          <div className="text-center">
            <p className="text-sm text-[#ffd700] uppercase tracking-wider">Melhor Reconstrução</p>
            <h3 className="text-2xl font-bold text-[#f0f0f5]">{winner.team.name}</h3>
            <p className="text-sm text-[#888899]">
              Gerente: <span className="text-[#f0f0f5]">{getManagerName(winner.team.id)}</span> | 
              Nota: {winner.grade} ({winner.score.toFixed(0)} pontos)
            </p>
          </div>
          <Award className="w-8 h-8 text-[#ffd700]" />
        </div>
      </div>

      {/* Managers Comparison */}
      <div className="max-w-4xl mx-auto mb-8 p-4 rounded-xl bg-[#12121a] border border-[#2a2a38]">
        <h3 className="text-center text-sm font-bold text-[#888899] uppercase tracking-wider mb-4">
          Comparativo dos Gerentes
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {sortedTeams.map(({ team, grade, score }, index) => {
            const teamPlayers = getTeamPlayers(team.id)
            const reservesUsed = teamPlayers.filter(p => p.activatedFromReserve).length
            const gradeStyle = GRADE_COLORS[grade] || GRADE_COLORS["C"]
            
            return (
              <div
                key={team.id}
                className={cn(
                  "p-4 rounded-xl text-center",
                  index === 0 ? "bg-[#ffd700]/10 border border-[#ffd700]/30" : "bg-[#1a1a24]"
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
                <p className="font-bold text-[#f0f0f5]">{getManagerName(team.id)}</p>
                <p className="text-xs text-[#888899] mb-2">{team.name}</p>
                <div className={cn(
                  "inline-flex px-3 py-1 rounded-full text-sm font-bold",
                  gradeStyle.bg,
                  gradeStyle.text
                )}>
                  {grade}
                </div>
                <div className="mt-2 text-xs text-[#666677]">
                  <span className="text-[#00ff88]">{formatCurrency(team.currentBudget)}</span> restante
                </div>
                {reservesUsed > 0 && (
                  <div className="mt-1 text-xs text-[#f59e0b]">
                    {reservesUsed} reserva{reservesUsed > 1 ? "s" : ""} ativado{reservesUsed > 1 ? "s" : ""}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
                index === 0 ? "border-[#ffd700]/50 bg-[#ffd700]/5" : "border-[#2a2a38] bg-[#12121a]"
              )}
            >
              {/* Position Badge */}
              {index < 3 && (
                <div className={cn(
                  "py-2 px-4 text-center font-bold text-sm",
                  index === 0 ? "bg-[#ffd700]/20 text-[#ffd700]" :
                  index === 1 ? "bg-[#c0c0d0]/20 text-[#c0c0d0]" :
                  "bg-[#cd7f32]/20 text-[#cd7f32]"
                )}>
                  {index === 0 ? "1º LUGAR" : index === 1 ? "2º LUGAR" : "3º LUGAR"}
                </div>
              )}

              {/* Team Header */}
              <div className="p-6 border-b border-[#2a2a38]">
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
                    <h3 className="text-xl font-bold text-[#f0f0f5]">{team.name}</h3>
                    <p className="text-sm text-[#00ff88]">{getManagerName(team.id)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Users className="w-4 h-4 text-[#888899]" />
                      <span className="text-sm text-[#888899]">{teamPlayers.length} jogadores</span>
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
              <div className="p-4 grid grid-cols-2 gap-4 border-b border-[#2a2a38]">
                <div className="p-3 rounded-lg bg-[#1a1a24]">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className={cn(
                      "w-4 h-4",
                      budgetHealth > 50 ? "text-[#00ff88]" : budgetHealth > 25 ? "text-[#f59e0b]" : "text-[#dc2626]"
                    )} />
                    <span className="text-xs text-[#888899]">Orçamento</span>
                  </div>
                  <p className={cn(
                    "font-bold",
                    budgetHealth > 50 ? "text-[#00ff88]" : budgetHealth > 25 ? "text-[#f59e0b]" : "text-[#dc2626]"
                  )}>
                    {formatCurrency(team.currentBudget)}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {budgetHealth > 50 ? (
                      <TrendingUp className="w-3 h-3 text-[#00ff88]" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-[#dc2626]" />
                    )}
                    <span className="text-xs text-[#888899]">{budgetHealth.toFixed(0)}% do inicial</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#1a1a24]">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-[#f59e0b]" />
                    <span className="text-xs text-[#888899]">Qualidade Média</span>
                  </div>
                  <p className="font-bold text-[#f0f0f5]">
                    Tier {avgTier.toFixed(1)}
                  </p>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3].map((t) => (
                      <div
                        key={t}
                        className={cn(
                          "w-2 h-2 rounded-full",
                          avgTier <= t ? "bg-[#00ff88]" : "bg-[#2a2a38]"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Reserve Penalty Warning */}
              {reservesUsed > 0 && (
                <div className="px-4 py-3 border-b border-[#2a2a38] bg-[#f59e0b]/5">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#f59e0b]" />
                    <p className="text-xs text-[#f59e0b]">
                      <strong>{reservesUsed} jogador{reservesUsed > 1 ? "es" : ""}</strong> ativado{reservesUsed > 1 ? "s" : ""} do banco de reservas (penalidade de leilão)
                    </p>
                  </div>
                </div>
              )}

              {/* Presidential Decree */}
              {team.presidentialDecree && (
                <div className="px-4 py-3 border-b border-[#2a2a38] bg-[#8b5cf6]/5">
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-[#8b5cf6] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[#8b5cf6]">{team.presidentialDecree.name}</p>
                      <p className="text-[10px] text-[#666677] mt-0.5">{team.presidentialDecree.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Squad */}
              <div className="p-4 max-h-72 overflow-auto">
                <h4 className="text-xs font-semibold text-[#888899] uppercase tracking-wider mb-3">
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
                          player.activatedFromReserve ? "bg-[#f59e0b]/10 border border-[#f59e0b]/30" : "bg-[#1a1a24]"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "w-6 h-6 rounded text-[10px] font-bold flex items-center justify-center border",
                            TIER_COLORS[player.tier]
                          )}>
                            T{player.tier}
                          </span>
                          <span className="text-sm text-[#f0f0f5]">{player.name}</span>
                          {player.activatedFromReserve && (
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#f59e0b]/20 text-[#f59e0b]">
                              RESERVA
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#888899]">{position}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Critique */}
              <div className="p-4 border-t border-[#2a2a38] bg-[#0a0a0f]">
                <p className="text-xs text-[#888899] italic leading-relaxed">
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
          className="px-8 py-4 text-lg font-bold bg-[#00ff88] hover:bg-[#00dd77] text-[#0a0a0f]"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Jogar Novamente
        </Button>
      </div>
    </div>
  )
}
