import type { PresidentialDecree, FinancialCard, Player, Team, FinancialHistoryEntry } from "../game-types"

type DecreeTemplate = Omit<PresidentialDecree, "teamId">

// ─── Presidential Decrees ─────────────────────────────────────────────────────
// validate:            sempre retorna true — o jogo não bloqueia compras
// evaluateCompliance:  checado na avaliação final — viola → perde os 20 pts de decreto
//
// Todos os checks são sobre o ELENCO FINAL (mais simples e consistente):
//   - Se trouxe um T3 zagueiro → violou Zaga de Aço, não importa quando comprou
//   - Isso cria tensão real: o jogador vê o decreto e TEM que lembrar durante o jogo

export const DECREES_POOL: DecreeTemplate[] = [
  {
    id: 1,
    name: "Zaga de Aço",
    description: "Elenco final não pode ter zagueiros Tier 3",
    validate: () => true,
    evaluateCompliance: (players) =>
      !players.some(p => (p.position === "Zaga-1" || p.position === "Zaga-2") && p.tier === 3),
    penaltyMessage: "Zagueiro Tier 3 no elenco — Decreto violado!",
  },
  {
    id: 2,
    name: "Prata da Casa",
    description: "Elenco final não pode ter nenhum jogador Tier 1",
    validate: () => true,
    evaluateCompliance: (players) =>
      !players.some(p => p.tier === 1),
    penaltyMessage: "Jogador Tier 1 encontrado no elenco — Decreto violado!",
  },
  {
    id: 3,
    name: "Sem Artilheiros Baratos",
    description: "Pontas e centroavante no elenco final não podem ser Tier 3",
    validate: () => true,
    evaluateCompliance: (players) => {
      const attackPositions = ["Ponta-Direita", "Ponta-Esquerdo", "Centroavante"]
      return !players.some(p => attackPositions.includes(p.position) && p.tier === 3)
    },
    penaltyMessage: "Atacante Tier 3 no elenco — Decreto violado!",
  },
  {
    id: 4,
    name: "Juventude Obrigatória",
    description: "Elenco final deve ter ao menos 3 jogadores Tier 3",
    validate: () => true,
    evaluateCompliance: (players) =>
      players.filter(p => p.tier === 3).length >= 3,
    penaltyMessage: "Menos de 3 jogadores Tier 3 no elenco — Decreto não cumprido!",
  },
  {
    id: 5,
    name: "Goleiro de Respeito",
    description: "O goleiro no elenco final não pode ser Tier 3",
    validate: () => true,
    evaluateCompliance: (players) => {
      const gk = players.find(p => p.position === "Goleiro")
      return !gk || gk.tier !== 3
    },
    penaltyMessage: "Goleiro Tier 3 no elenco — Decreto violado!",
  },
  {
    id: 6,
    name: "Centroavante de Qualidade",
    description: "O centroavante no elenco final não pode ser Tier 3",
    validate: () => true,
    evaluateCompliance: (players) => {
      const ca = players.find(p => p.position === "Centroavante")
      return !ca || ca.tier !== 3
    },
    penaltyMessage: "Centroavante Tier 3 no elenco — Decreto violado!",
  },
  {
    id: 7,
    name: "Meio-Campo Técnico",
    description: "Volantes e meia no elenco final não podem ser Tier 3",
    validate: () => true,
    evaluateCompliance: (players) => {
      const midPositions = ["Primeiro-Volante", "Segundo-Volante", "Meia-Armador"]
      return !players.some(p => midPositions.includes(p.position) && p.tier === 3)
    },
    penaltyMessage: "Volante/Meia Tier 3 no elenco — Decreto violado!",
  },
  {
    id: 8,
    name: "Laterais Qualificados",
    description: "Laterais no elenco final não podem ser Tier 3",
    validate: () => true,
    evaluateCompliance: (players) => {
      return !players.some(
        p => (p.position === "Lateral-Direito" || p.position === "Lateral-Esquerdo") && p.tier === 3
      )
    },
    penaltyMessage: "Lateral Tier 3 no elenco — Decreto violado!",
  },
  {
    id: 9,
    name: "Orçamento Disciplinado",
    description: "Não pode ter gasto mais de 70% do orçamento inicial no total",
    validate: () => true,
    evaluateCompliance: (_players, team) => {
      const spent = team.initialBudget - team.currentBudget
      return spent <= team.initialBudget * 0.70
    },
    penaltyMessage: "Gastos acima de 70% do orçamento — Decreto violado!",
  },
  {
    id: 10,
    name: "Pressão Máxima",
    description: "Elenco final não pode ter nenhum jogador Tier 2 (só Tier 1 ou Tier 3)",
    validate: () => true,
    evaluateCompliance: (players) =>
      !players.some(p => p.tier === 2),
    penaltyMessage: "Jogador Tier 2 encontrado — Decreto violado! (só T1 ou T3)",
  },
]

// ─── Financial Cards ──────────────────────────────────────────────────────────

export const FINANCIAL_CARDS_POOL: FinancialCard[] = [
  { id: 1,  name: "Patrocínio Master",         description: "+€15M de patrocínio corporativo",                effect: "add",      value: 15_000_000 },
  { id: 2,  name: "Venda de Jóia da Base",      description: "+€20M por transferência de jovem promessa",     effect: "add",      value: 20_000_000 },
  { id: 3,  name: "Receita de Transmissão",     description: "+€12M de contrato de transmissão global",       effect: "add",      value: 12_000_000 },
  { id: 4,  name: "Bônus de Classificação",     description: "+€18M por avançar na competição continental",   effect: "add",      value: 18_000_000 },
  { id: 5,  name: "Venda de Naming Rights",     description: "+€10M de venda do nome do estádio",             effect: "add",      value: 10_000_000 },
  { id: 6,  name: "Dívida da Gestão Anterior",  description: "-€10M por passivos herdados da diretoria",      effect: "subtract", value: 10_000_000 },
  { id: 7,  name: "Multa por Irregularidade",   description: "-€12M por infração contratual na federação",    effect: "subtract", value: 12_000_000 },
  { id: 8,  name: "Crise no Caixa",             description: "-€15M por problemas administrativos graves",    effect: "subtract", value: 15_000_000 },
  { id: 9,  name: "Perda de Patrocinador",      description: "-€8M por rescisão de contrato comercial",       effect: "subtract", value:  8_000_000 },
  { id: 10, name: "Coringa: Reforço Surpresa",  description: "Jogador aleatório grátis, mas caixa reduzido à metade!", effect: "joker", value: 0, isJoker: true },
]
