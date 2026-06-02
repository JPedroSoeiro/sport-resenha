import type { PresidentialDecree, FinancialCard, Player, Team } from "../game-types"

type DecreeTemplate = Omit<PresidentialDecree, "teamId">

// ─── Presidential Decrees ─────────────────────────────────────────────────────
// Regras: NENHUM decreto usa nacionalidade (funciona nos dois campeonatos).
// Decrees devem criar tensão estratégica, nunca tornar o jogo inviável.
// Todos os decretos de validação-em-compra têm T2 disponível para cada posição.

export const DECREES_POOL: DecreeTemplate[] = [
  {
    id: 1,
    name: "Zaga de Aço",
    description: "Zagueiros contratados devem ser Tier 1 ou Tier 2 obrigatoriamente",
    validate: (player: Player) => {
      if ((player.position === "Zaga-1" || player.position === "Zaga-2") && player.tier === 3) return false
      return true
    },
    penaltyMessage: "Decreto violado! Zagueiro Tier 3 não é permitido.",
  },
  {
    id: 2,
    name: "Prata da Casa",
    description: "Proibido contratar jogadores Tier 1 nesta janela de transferências",
    validate: (player: Player) => player.tier !== 1,
    penaltyMessage: "Decreto violado! Jogadores Tier 1 estão proibidos nesta janela.",
  },
  {
    id: 3,
    name: "Sem Artilheiros Baratos",
    description: "Pontas e centroavante não podem ser Tier 3",
    validate: (player: Player) => {
      const attackPositions = ["Ponta-Direita", "Ponta-Esquerdo", "Centroavante"]
      if (attackPositions.includes(player.position) && player.tier === 3) return false
      return true
    },
    penaltyMessage: "Decreto violado! Atacante Tier 3 bloqueado nesta janela.",
  },
  {
    id: 4,
    name: "Juventude Obrigatória",
    description: "Deve manter ao menos 3 jogadores Tier 3 no elenco final",
    validate: () => true, // Verificado na avaliação final
    penaltyMessage: "Decreto não cumprido! Faltam jovens da base no elenco.",
  },
  {
    id: 5,
    name: "Goleiro de Respeito",
    description: "O goleiro contratado deve ser Tier 1 ou Tier 2 obrigatoriamente",
    validate: (player: Player) => {
      if (player.position === "Goleiro" && player.tier === 3) return false
      return true
    },
    penaltyMessage: "Decreto violado! Goleiro Tier 3 não é permitido.",
  },
  {
    id: 6,
    name: "Centroavante de Qualidade",
    description: "O centroavante contratado deve ser Tier 1 ou Tier 2",
    validate: (player: Player) => {
      if (player.position === "Centroavante" && player.tier === 3) return false
      return true
    },
    penaltyMessage: "Decreto violado! Centroavante Tier 3 não é permitido.",
  },
  {
    id: 7,
    name: "Meio-Campo Técnico",
    description: "Volantes e meias contratados devem ser Tier 1 ou Tier 2",
    validate: (player: Player) => {
      const midPositions = ["Primeiro-Volante", "Segundo-Volante", "Meia-Armador"]
      if (midPositions.includes(player.position) && player.tier === 3) return false
      return true
    },
    penaltyMessage: "Decreto violado! Volante/Meia Tier 3 bloqueado.",
  },
  {
    id: 8,
    name: "Laterais Qualificados",
    description: "Laterais contratados devem ser Tier 1 ou Tier 2",
    validate: (player: Player) => {
      if ((player.position === "Lateral-Direito" || player.position === "Lateral-Esquerdo") && player.tier === 3) return false
      return true
    },
    penaltyMessage: "Decreto violado! Lateral Tier 3 não é permitido.",
  },
  {
    id: 9,
    name: "Orçamento Disciplinado",
    description: "Nenhum jogador contratado pode custar mais que 50% do seu caixa atual",
    validate: (player: Player, team: Team) => {
      return player.value <= team.currentBudget * 0.5
    },
    penaltyMessage: "Decreto violado! Contratação excede 50% do caixa disponível.",
  },
  {
    id: 10,
    name: "Pressão Máxima",
    description: "Proibido contratar Tier 2 — apenas Tier 1 (estrelas) ou Tier 3 (aposta)",
    validate: (player: Player) => player.tier !== 2,
    penaltyMessage: "Decreto violado! Jogadores Tier 2 são proibidos nesta janela.",
  },
]

// ─── Financial Cards ──────────────────────────────────────────────────────────
// Valores proporcionais: bônus e penalidades representam ±25-40% de um orçamento médio.
// Isso mantém impacto em qualquer campeonato sem ser devastador.

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
