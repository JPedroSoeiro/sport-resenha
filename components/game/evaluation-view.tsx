"use client"

import { useRef, useState } from "react"
import { useGame } from "@/lib/game-context"
import { POSITION_ORDER, POSITION_LABELS, POSITION_SHORT, type Position } from "@/lib/game-types"
import { TacticalField } from "./tactical-field"
import { Button } from "@/components/ui/button"
import {
  Trophy, DollarSign, RotateCcw, Award,
  TrendingUp, TrendingDown, UserCheck, Share2, Check,
  History, Gavel, FileText, Star, Image,
} from "lucide-react"
import { toPng } from "html-to-image"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const GRADE_STYLE: Record<string, { bg: string; text: string; border: string; glow?: string }> = {
  "A+": { bg: "bg-amber-500/20",   text: "text-amber-500 dark:text-amber-400",   border: "border-amber-500",   glow: "neon-amber" },
  "A":  { bg: "bg-primary/20",     text: "text-primary",                          border: "border-primary",     glow: "neon-green" },
  "B+": { bg: "bg-blue-500/20",    text: "text-blue-500 dark:text-blue-400",      border: "border-blue-500" },
  "B":  { bg: "bg-violet-500/20",  text: "text-violet-500 dark:text-violet-400",  border: "border-violet-500" },
  "C+": { bg: "bg-orange-500/20",  text: "text-orange-500",                       border: "border-orange-500" },
  "C":  { bg: "bg-destructive/20", text: "text-destructive",                      border: "border-destructive" },
}

const TIER_CLS = {
  1: "bg-amber-500/20 text-amber-500 border-amber-500/30 dark:text-amber-400",
  2: "bg-slate-400/20 text-slate-500 border-slate-400/30 dark:text-slate-300",
  3: "bg-orange-800/20 text-orange-700 border-orange-700/30 dark:text-orange-400",
}

function critique(grade: string, budgetPct: number, avgTier: number, penalties: number): string {
  if (grade === "A+" || grade === "A") return "Excelente reconstrução! Elenco de elite, finanças saudáveis. Temporada promissora."
  if (grade === "B+" || grade === "B") {
    if (penalties > 2) return "Perdeu muitos leilões e abusou dos reservas. A falta de estratégia no mercado custou caro."
    if (budgetPct < 30) return "Elenco competitivo, mas caixa em frangalhos. Cuidado na reta final da temporada."
    return "Bom trabalho geral. Potencial existe, mas há margem para evolução em posições-chave."
  }
  if (avgTier > 2.5) return "Elenco muito modesto. A luta contra o rebaixamento pode ser a realidade desta temporada."
  if (penalties > 3) return "Muitas penalidades! Aprenda a negociar no mercado antes da próxima janela."
  return "Reconstrução abaixo do esperado. A torcida merecia mais ambição."
}

export function EvaluationView() {
  const { state, dispatch, getTeamPlayers, formatCurrency, calculateTeamScore, getManagerName, exportSquadText, getFinancialHistory } = useGame()
  const [copied, setCopied] = useState<number | null>(null)
  const [historyId, setHistoryId] = useState<number | null>(null)
  const [fieldId, setFieldId] = useState<number | null>(null)
  const [exportingId, setExportingId] = useState<number | null>(null)
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set())
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({})

  const scores = state.teams.map(team => ({ team, ...calculateTeamScore(team.id) }))
  // Pior para melhor — order de reveal (suspense: revela do pior para o campeão)
  const sorted = [...scores].sort((a, b) => b.score - a.score)
  const winner = sorted[0]
  const allRevealed = revealedIds.size === state.teams.length

  const handleReveal = (teamId: number) => {
    setRevealedIds(prev => new Set([...prev, teamId]))
  }

  const handleExportImage = async (teamId: number) => {
    const el = cardRefs.current[teamId]
    if (!el) return
    setExportingId(teamId)
    try {
      const dataUrl = await toPng(el, { cacheBust: true, quality: 0.95, pixelRatio: 2 })
      const link = document.createElement("a")
      link.download = `elenco-${state.teams.find(t => t.id === teamId)?.shortName ?? teamId}.png`
      link.href = dataUrl
      link.click()
      toast.success("Imagem exportada!", { description: "Download iniciado automaticamente." })
    } catch {
      toast.error("Erro ao exportar imagem", { description: "Tente novamente." })
    } finally {
      setExportingId(null)
    }
  }

  const handleCopy = async (teamId: number) => {
    const text = exportSquadText(teamId)
    try { await navigator.clipboard.writeText(text) } catch {
      const el = document.createElement("textarea")
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
    }
    setCopied(teamId)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background p-6 screen-enter">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 mb-4">
          <Trophy className="w-8 h-8 text-amber-500" />
        </div>
        <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-oswald)" }}>
          AVALIAÇÃO FINAL
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          {allRevealed ? "Análise completa das reconstruções" : `Revele os resultados — do pior ao campeão`}
        </p>
      </div>

      {/* Winner banner — só aparece quando tudo foi revelado */}
      {allRevealed && (
        <div className="max-w-2xl mx-auto mb-8 p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 border border-amber-500/30 screen-enter">
          <div className="flex items-center justify-center gap-4">
            <Award className="w-7 h-7 text-amber-500 flex-shrink-0" />
            <div className="text-center">
              <p className="text-xs text-amber-500 uppercase tracking-widest font-bold mb-0.5">🏆 Campeão da Reconstrução</p>
              <h3 className="text-2xl font-bold text-foreground">{winner.team.name}</h3>
              <p className="text-sm text-muted-foreground">
                {getManagerName(winner.team.id)} · Nota {winner.grade} · {winner.score.toFixed(0)} pts
              </p>
            </div>
            <Award className="w-7 h-7 text-amber-500 flex-shrink-0" />
          </div>
        </div>
      )}

      {/* Reveal progress */}
      {!allRevealed && (
        <div className="max-w-2xl mx-auto mb-6 flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(revealedIds.size / state.teams.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {revealedIds.size}/{state.teams.length} revelados
          </span>
        </div>
      )}

      {/* Quick comparison — só após tudo revelado */}
      {allRevealed && (
      <div className="max-w-4xl mx-auto mb-8 p-4 rounded-xl bg-card border border-border">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center mb-4">Comparativo</p>
        <div className={cn("grid gap-3", state.playerCount <= 3 ? "grid-cols-3" : "grid-cols-4")}>
          {sorted.map(({ team, grade }, i) => {
            const gs = GRADE_STYLE[grade] || GRADE_STYLE["C"]
            return (
              <div key={team.id} className={cn("p-3 rounded-xl text-center", i === 0 ? "bg-amber-500/10 border border-amber-500/30" : "bg-secondary")}>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm mx-auto mb-2 border-2"
                  style={{ backgroundColor: team.primaryColor, color: team.secondaryColor, borderColor: team.primaryColor === "#1a1a1a" ? "#444" : team.primaryColor }}
                >
                  {team.shortName}
                </div>
                <p className="text-xs font-bold text-foreground">{getManagerName(team.id)}</p>
                <p className="text-[10px] text-muted-foreground mb-1.5">{team.name}</p>
                <div className={cn("inline-flex px-2 py-0.5 rounded-full text-sm font-bold border", gs.bg, gs.text, gs.border)}>
                  {grade}
                </div>
                <p className="text-[10px] text-primary mt-1 font-semibold">{formatCurrency(team.currentBudget)}</p>
              </div>
            )
          })}
        </div>
      </div>
      )}

      {/* Team detail cards — revelação com suspense, do pior para o melhor */}
      <div className={cn("grid gap-6 max-w-7xl mx-auto", state.playerCount <= 2 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 lg:grid-cols-3")}>
        {/* Exibe na ordem inversa para o reveal (pior primeiro, campeão por último) */}
        {[...sorted].reverse().map(({ team, grade, score, details, decreeComplied }, revIdx) => {
          const isRevealed = revealedIds.has(team.id)
          const rankPos = sorted.findIndex(s => s.team.id === team.id)  // 0 = campeão
          const players = getTeamPlayers(team.id).filter(p => !p.sold)
          const avgTier = players.length ? players.reduce((s, p) => s + p.tier, 0) / players.length : 3
          const budgetPct = (team.currentBudget / team.initialBudget) * 100
          const penalties = players.filter(p => p.activatedFromReserve).length
          const gs = GRADE_STYLE[grade] || GRADE_STYLE["C"]
          const history = getFinancialHistory(team.id)
          const totalSpent = history.filter(h => h.type === "signing" || h.type === "auction_win").reduce((s, h) => s + h.amount, 0)
          const totalEarned = history.filter(h => h.type === "sale").reduce((s, h) => s + h.amount, 0)
          const i = rankPos  // mantém compatibilidade com código abaixo

          // ── Card ainda não revelado ──────────────────────────────────────
          const posLabel =
            rankPos === 0 ? "1º Lugar" :
            rankPos === 1 ? "2º Lugar" :
            rankPos === 2 ? "3º Lugar" :
            `${rankPos + 1}º Lugar`

          if (!isRevealed) {
            return (
              <div
                key={team.id}
                className="rounded-2xl border-2 border-border bg-card overflow-hidden flex flex-col items-center justify-center min-h-[240px]"
              >
                {/* Apenas a posição — sem revelar o time */}
                <p className="text-5xl font-bold text-muted-foreground/20 mb-1" style={{ fontFamily: "var(--font-oswald)" }}>?</p>
                <p className="text-lg font-bold text-foreground mb-1" style={{ fontFamily: "var(--font-oswald)" }}>
                  {posLabel.toUpperCase()}
                </p>
                <p className="text-xs text-muted-foreground mb-6">Clique para revelar</p>

                <button
                  onClick={() => handleReveal(team.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/10 border border-primary/30 text-primary font-bold hover:bg-primary/20 transition-all"
                >
                  <Star className="w-4 h-4" />
                  Revelar resultado
                </button>
              </div>
            )
          }

          // ── Card revelado ─────────────────────────────────────────────────
          return (
            <div
              key={team.id}
              ref={(el) => { cardRefs.current[team.id] = el }}
              className={cn(
                "rounded-2xl border-2 overflow-hidden flex flex-col screen-enter",
                rankPos === 0 ? "border-amber-500/50 bg-amber-500/3" : "border-border bg-card"
              )}
            >
              {/* Rank bar */}
              {i < 3 && (
                <div className={cn(
                  "py-1.5 px-4 text-center text-xs font-bold uppercase tracking-widest",
                  i === 0 ? "bg-amber-500/20 text-amber-500 dark:text-amber-400" :
                  i === 1 ? "bg-slate-400/15 text-slate-500 dark:text-slate-300" :
                            "bg-orange-800/15 text-orange-600 dark:text-orange-400"
                )}>
                  {i === 0 ? "🥇 1º Lugar" : i === 1 ? "🥈 2º Lugar" : "🥉 3º Lugar"}
                </div>
              )}

              {/* Team header */}
              <div className="p-5 border-b border-border">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg border-2 flex-shrink-0"
                    style={{ backgroundColor: team.primaryColor, color: team.secondaryColor, borderColor: team.primaryColor === "#1a1a1a" ? "#555" : team.primaryColor }}
                  >
                    {team.shortName}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-foreground truncate" style={{ fontFamily: "var(--font-oswald)" }}>{team.name}</h3>
                    <p className="text-sm text-primary">{getManagerName(team.id)}</p>
                    <p className="text-xs text-muted-foreground">{players.length} jogadores</p>
                  </div>
                  <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center font-bold text-2xl border-2 flex-shrink-0", gs.bg, gs.text, gs.border, gs.glow)}>
                    {grade}
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-3 p-4 border-b border-border">
                {/* Budget */}
                <div className="p-3 rounded-lg bg-secondary">
                  <div className="flex items-center gap-1.5 mb-1">
                    <DollarSign className={cn("w-3.5 h-3.5", budgetPct > 50 ? "text-primary" : budgetPct > 25 ? "text-amber-500" : "text-destructive")} />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Orçamento</span>
                  </div>
                  <p className={cn("font-bold text-sm", budgetPct > 50 ? "text-primary" : budgetPct > 25 ? "text-amber-500" : "text-destructive")}>
                    {formatCurrency(team.currentBudget)}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {budgetPct > 50 ? <TrendingUp className="w-3 h-3 text-primary" /> : <TrendingDown className="w-3 h-3 text-destructive" />}
                    <span className="text-[10px] text-muted-foreground">{budgetPct.toFixed(0)}% restante</span>
                  </div>
                </div>
                {/* Quality */}
                <div className="p-3 rounded-lg bg-secondary">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Qualidade</span>
                  </div>
                  <p className="font-bold text-sm text-foreground">Tier {avgTier.toFixed(1)}</p>
                  <div className="flex gap-1 mt-0.5">
                    {[1,2,3].map(t => <div key={t} className={cn("w-1.5 h-1.5 rounded-full", avgTier <= t ? "bg-primary" : "bg-border")} />)}
                  </div>
                </div>
              </div>

              {/* Score breakdown */}
              <div className="px-4 py-2.5 border-b border-border bg-secondary/30">
                <p className="text-[10px] text-muted-foreground/70">{details}</p>
              </div>

              {/* Penalties / decree */}
              {penalties > 0 && (
                <div className="px-4 py-2.5 border-b border-border bg-amber-500/5">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-amber-500" />
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      <strong>{penalties} reserva{penalties > 1 ? "s" : ""}</strong> ativado{penalties > 1 ? "s" : ""} por penalidade de leilão
                    </p>
                  </div>
                </div>
              )}
              {team.presidentialDecree && (
                <div className={cn(
                  "px-4 py-2.5 border-b border-border",
                  decreeComplied ? "bg-violet-500/5" : "bg-destructive/5"
                )}>
                  <div className="flex items-start gap-2">
                    <FileText className={cn("w-3.5 h-3.5 flex-shrink-0 mt-0.5", decreeComplied ? "text-violet-500" : "text-destructive")} />
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-xs font-semibold", decreeComplied ? "text-violet-500 dark:text-violet-400" : "text-destructive")}>
                        {team.presidentialDecree.name}
                        {decreeComplied
                          ? <span className="ml-2 text-[9px] bg-primary/15 text-primary px-1.5 py-0.5 rounded-full">✓ CUMPRIDO +20 pts</span>
                          : <span className="ml-2 text-[9px] bg-destructive/15 text-destructive px-1.5 py-0.5 rounded-full">✗ VIOLADO −20 pts</span>
                        }
                      </p>
                      <p className="text-[10px] text-muted-foreground/70 leading-tight mt-0.5">{team.presidentialDecree.description}</p>
                      {!decreeComplied && (
                        <p className="text-[10px] text-destructive/80 mt-0.5 font-medium">{team.presidentialDecree.penaltyMessage}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tactical field toggle */}
              <div className="px-4 py-3 border-b border-border">
                <button
                  onClick={() => setFieldId(fieldId === team.id ? null : team.id)}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  {fieldId === team.id ? "▲ Ocultar campo tático" : "▼ Ver campo tático"}
                </button>
                {fieldId === team.id && (
                  <div className="mt-3">
                    <TacticalField teamId={team.id} compact />
                  </div>
                )}
              </div>

              {/* Squad list */}
              <div className="p-4 max-h-64 overflow-auto border-b border-border">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Elenco Final</p>
                <div className="space-y-1">
                  {POSITION_ORDER.map(pos => {
                    const pl = players.find(p => p.position === pos)
                    if (!pl) return null
                    return (
                      <div
                        key={pl.id}
                        className={cn(
                          "flex items-center justify-between p-2 rounded-lg text-xs",
                          pl.lostAuction ? "bg-destructive/10 border border-destructive/20" :
                          pl.activatedFromReserve ? "bg-amber-500/10 border border-amber-500/20" :
                          "bg-secondary"
                        )}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={cn("w-6 h-6 rounded text-[9px] font-bold flex items-center justify-center border flex-shrink-0", TIER_CLS[pl.tier as 1|2|3])}>
                            T{pl.tier}
                          </span>
                          <span className="font-medium text-foreground truncate">{pl.name}</span>
                          {pl.lostAuction && <span className="text-[8px] font-bold text-destructive uppercase bg-destructive/10 px-1 rounded flex-shrink-0">Leilão</span>}
                          {pl.activatedFromReserve && !pl.lostAuction && <UserCheck className="w-3 h-3 text-amber-500 flex-shrink-0" />}
                        </div>
                        <span className="text-[10px] text-muted-foreground flex-shrink-0 ml-2">{POSITION_SHORT[pos as Position]}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Financial history toggle */}
              {historyId === team.id && (
                <div className="p-4 border-b border-border bg-secondary/30 max-h-48 overflow-auto">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Extrato Financeiro</p>
                    <button onClick={() => setHistoryId(null)} className="text-[10px] text-muted-foreground hover:text-foreground">Fechar</button>
                  </div>
                  {(() => {
                    const hist = getFinancialHistory(team.id)
                    if (!hist.length) return <p className="text-xs text-muted-foreground">Sem transações.</p>
                    return (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground pb-1 border-b border-border">
                          <span>Total gasto: <span className="text-destructive">{formatCurrency(totalSpent)}</span></span>
                          <span>Total arrecadado: <span className="text-primary">{formatCurrency(totalEarned)}</span></span>
                        </div>
                        {hist.map((e, idx) => (
                          <div key={idx} className={cn(
                            "flex items-center justify-between p-1.5 rounded text-[11px]",
                            e.type === "sale" && "bg-primary/8",
                            e.type === "signing" && "bg-blue-500/8",
                            e.type === "auction_win" && "bg-amber-500/8",
                            e.type === "auction_loss" && "bg-destructive/8",
                            e.type === "financial_card" && "bg-violet-500/8",
                          )}>
                            <div className="flex items-center gap-1.5 min-w-0">
                              {e.type === "sale" && <DollarSign className="w-3 h-3 text-primary flex-shrink-0" />}
                              {e.type === "signing" && <UserCheck className="w-3 h-3 text-blue-500 flex-shrink-0" />}
                              {e.type === "auction_win" && <Gavel className="w-3 h-3 text-amber-500 flex-shrink-0" />}
                              {e.type === "auction_loss" && <Gavel className="w-3 h-3 text-destructive flex-shrink-0" />}
                              {e.type === "financial_card" && <FileText className="w-3 h-3 text-violet-500 flex-shrink-0" />}
                              <span className="text-foreground truncate">{e.playerName}</span>
                            </div>
                            <span className={cn(
                              "font-semibold flex-shrink-0 ml-2",
                              e.type === "sale" || e.type === "auction_loss" ? "text-primary" : "text-destructive"
                            )}>
                              {e.type === "sale" ? "+" : e.amount > 0 ? "-" : ""}{formatCurrency(Math.abs(e.amount))}
                            </span>
                          </div>
                        ))}
                      </div>
                    )
                  })()}
                </div>
              )}

              {/* Critique */}
              <div className="px-4 py-3 border-b border-border bg-secondary/20">
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  &ldquo;{critique(grade, budgetPct, avgTier, penalties)}&rdquo;
                </p>
              </div>

              {/* Actions */}
              <div className="p-4 flex gap-2 mt-auto flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setHistoryId(historyId === team.id ? null : team.id)}
                >
                  <History className="w-3.5 h-3.5 mr-1" />
                  Extrato
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleCopy(team.id)}
                >
                  {copied === team.id
                    ? <><Check className="w-3.5 h-3.5 mr-1 text-primary" />Copiado!</>
                    : <><Share2 className="w-3.5 h-3.5 mr-1" />Texto</>
                  }
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleExportImage(team.id)}
                  disabled={exportingId === team.id}
                >
                  {exportingId === team.id
                    ? <><span className="w-3.5 h-3.5 mr-1 animate-spin inline-block border-2 border-primary border-t-transparent rounded-full" />Gerando...</>
                    : <><Image className="w-3.5 h-3.5 mr-1" />Imagem</>
                  }
                </Button>
              </div>
            </div>
          )  // end revealed card
        })}
      </div>

      <div className="flex justify-center mt-10">
        <Button onClick={() => dispatch({ type: "RESET_GAME" })} size="lg" className="font-bold px-8">
          <RotateCcw className="w-4 h-4 mr-2" />
          Jogar Novamente
        </Button>
      </div>
    </div>
  )
}
