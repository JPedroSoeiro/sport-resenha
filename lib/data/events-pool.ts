// Pool de Eventos Especiais
// Disparados após as rodadas de posição 3 e 7 (de 11 no total).
// Cada time recebe um evento INDEPENDENTE e aleatório.

export type EventEffectType =
  | "budget_add"     // + orçamento fixo
  | "budget_pct_add" // + % do orçamento inicial
  | "budget_sub"     // - orçamento fixo
  | "budget_pct_sub" // - % do orçamento inicial
  | "free_player"    // jogador T3 grátis
  | "injury"         // posição titular aleatória bloqueada (usa reserva)
  | "none"           // sem efeito

export interface SpecialEventDef {
  id: string
  name: string
  description: string
  icon: string
  theme: "positive" | "negative" | "neutral"
  effect: EventEffectType
  value?: number   // para budget_add/sub
  pct?: number     // para budget_pct (0.0–1.0)
  severity: "mild" | "strong"
}

export const EVENTS_POOL: SpecialEventDef[] = [
  // ── POSITIVOS ──────────────────────────────────────────────────────────────
  {
    id: "patrocinio",
    name: "Patrocínio Relâmpago",
    description: "Uma empresa quer seu espaço! Caixa reforçado.",
    icon: "💰",
    theme: "positive",
    effect: "budget_add",
    value: 15_000_000,
    severity: "mild",
  },
  {
    id: "investidor",
    name: "Novo Investidor",
    description: "Um grupo empresarial entra no clube com aportes milionários.",
    icon: "🤝",
    theme: "positive",
    effect: "budget_add",
    value: 20_000_000,
    severity: "strong",
  },
  {
    id: "naming_rights",
    name: "Venda de Naming Rights",
    description: "O nome do estádio foi vendido. Dinheiro garantido!",
    icon: "🏟️",
    theme: "positive",
    effect: "budget_pct_add",
    pct: 0.12,
    severity: "mild",
  },
  {
    id: "tv_bonus",
    name: "Bônus de Transmissão",
    description: "Contrato de TV renegociado com aumento expressivo.",
    icon: "📺",
    theme: "positive",
    effect: "budget_add",
    value: 12_000_000,
    severity: "mild",
  },
  {
    id: "revelacao",
    name: "Revelação da Base",
    description: "Um jovem talento sobe das categorias de base — de graça!",
    icon: "⭐",
    theme: "positive",
    effect: "free_player",
    severity: "mild",
  },
  {
    id: "superpatrocinio",
    name: "Superpatrocinador",
    description: "Marca global fecha patrocínio máster. Caixa transbordando!",
    icon: "🚀",
    theme: "positive",
    effect: "budget_pct_add",
    pct: 0.20,
    severity: "strong",
  },

  // ── NEGATIVOS ──────────────────────────────────────────────────────────────
  {
    id: "multa",
    name: "Multa da Federação",
    description: "Irregularidade detectada pela CBF/FA. Caixa penalizado.",
    icon: "⚖️",
    theme: "negative",
    effect: "budget_sub",
    value: 10_000_000,
    severity: "mild",
  },
  {
    id: "divida",
    name: "Dívida da Gestão Anterior",
    description: "Passivos herdados chegam à vista para pagamento imediato.",
    icon: "📄",
    theme: "negative",
    effect: "budget_sub",
    value: 15_000_000,
    severity: "mild",
  },
  {
    id: "crise",
    name: "Crise Financeira",
    description: "Problemas internos abalam as finanças do clube.",
    icon: "🔴",
    theme: "negative",
    effect: "budget_pct_sub",
    pct: 0.15,
    severity: "strong",
  },
  {
    id: "lesao",
    name: "Lesão Surpresa",
    description: "Um titular sofreu lesão no treino! O reserva entra em campo.",
    icon: "🩹",
    theme: "negative",
    effect: "injury",
    severity: "strong",
  },
]

// Eventos separados por intensidade para as 2 rodadas especiais
export const MILD_EVENTS = EVENTS_POOL.filter(e => e.severity === "mild")
export const STRONG_EVENTS = EVENTS_POOL
