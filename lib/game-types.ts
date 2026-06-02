// Game Types

export type Position =
  | "Goleiro"
  | "Zaga-1"
  | "Zaga-2"
  | "Lateral-Direito"
  | "Lateral-Esquerdo"
  | "Primeiro-Volante"
  | "Segundo-Volante"
  | "Meia-Armador"
  | "Ponta-Direita"
  | "Ponta-Esquerdo"
  | "Centroavante"

export type Tier = 1 | 2 | 3

export type Category = "veterano" | "joia" | "operario"

export type Nationality =
  | "Brasileiro"
  | "Argentino"
  | "Uruguaio"
  | "Colombiano"
  | "Chileno"
  | "Paraguaio"
  | "Peruano"
  | "Espanhol"
  | "Português"
  | "Inglês"
  | "Francês"
  | "Alemão"
  | "Italiano"
  | "Holandês"
  | "Belga"
  | "Africano"
  | "Outro"

export interface Player {
  id: number
  name: string
  teamId: number | null
  position: Position
  value: number
  tier: Tier
  category: Category
  nationality: Nationality
  isReserva: boolean
  sold?: boolean
  activatedFromReserve?: boolean
  lostAuction?: boolean
  sourceClub?: string  // Clube de origem para agentes livres (usado para filtragem no mercado)
}

export interface PlayerManager {
  id: number
  name: string
  teamId: number
}

export interface FinancialHistoryEntry {
  type: "sale" | "auction_win" | "auction_loss" | "signing" | "financial_card"
  playerName: string
  position: Position
  amount: number
  timestamp: number
  details?: string
}

export interface Team {
  id: number
  name: string
  shortName: string
  primaryColor: string
  secondaryColor: string
  initialBudget: number
  currentBudget: number
  presidentialDecree: PresidentialDecree | null
  financialCard: FinancialCard | null
  managerId: number | null
  blockedPositions: Position[]
  financialHistory: FinancialHistoryEntry[]
}

export interface PresidentialDecree {
  id: number
  name: string
  description: string
  teamId: number
  validate: (player: Player, team: Team) => boolean
  penaltyMessage: string
}

export interface FinancialCard {
  id: number
  name: string
  description: string
  effect: "add" | "subtract" | "joker"
  value: number
  isJoker?: boolean
}

export type ChampionshipId = "brasileirao" | "premier-league"

export type GamePhase =
  | "splash"
  | "host-setup"
  | "player-setup"
  | "draw-cards"
  | "decision"
  | "market"
  | "bidding"
  | "special-event"
  | "evaluation"

export interface SpecialEventResult {
  eventId: string
  name: string
  icon: string
  theme: "positive" | "negative" | "neutral"
  description: string
  budgetDelta: number       // valor já calculado (+/-)
  playerName?: string       // para "revelacao" ou "injury"
  injuredPosition?: string  // para "injury"
}

export interface PendingSpecialEvent {
  roundIndex: number
  teamResults: Record<number, SpecialEventResult>  // teamId → resultado
}

export interface RoundTransferOption {
  tier: Tier
  player: Player
}

export interface BiddingState {
  player: Player | null
  teams: number[]
  currentBids: Record<number, number>
  activeTeamIndex: number
}

export interface GameState {
  phase: GamePhase
  championship: ChampionshipId
  currentTeamIndex: number
  currentPositionIndex: number
  globalBudget: number
  playerCount: number
  managers: PlayerManager[]
  teams: Team[]
  players: Player[]
  freeAgents: Player[]
  positionRounds: Position[]
  soldInCurrentRound: number[]
  marketSelections: Record<number, number | null>
  roundTransferOptions: RoundTransferOption[]
  bidding: BiddingState
  decreePool: PresidentialDecree[]
  financialPool: FinancialCard[]
  usedDecrees: number[]
  usedFinancials: number[]
  setupComplete: number[]
  gameStarted: boolean
  gameEnded: boolean
  auctionLosers: Record<number, Position[]>
  pendingSpecialEvent?: PendingSpecialEvent
}

// 11 positions in game order (decision rounds sequence)
export const POSITION_ROUNDS: Position[] = [
  "Goleiro",
  "Zaga-1",
  "Lateral-Direito",
  "Ponta-Direita",
  "Primeiro-Volante",
  "Segundo-Volante",
  "Lateral-Esquerdo",
  "Zaga-2",
  "Meia-Armador",
  "Ponta-Esquerdo",
  "Centroavante",
]

// Display order for squad lists (defensive to offensive)
export const POSITION_ORDER: Position[] = [
  "Goleiro",
  "Zaga-1",
  "Zaga-2",
  "Lateral-Direito",
  "Lateral-Esquerdo",
  "Primeiro-Volante",
  "Segundo-Volante",
  "Meia-Armador",
  "Ponta-Direita",
  "Ponta-Esquerdo",
  "Centroavante",
]

export const POSITION_LABELS: Record<Position, string> = {
  "Goleiro": "Goleiro",
  "Zaga-1": "Zagueiro 1",
  "Zaga-2": "Zagueiro 2",
  "Lateral-Direito": "Lateral Direito",
  "Lateral-Esquerdo": "Lateral Esquerdo",
  "Primeiro-Volante": "1º Volante",
  "Segundo-Volante": "2º Volante",
  "Meia-Armador": "Meia Armador",
  "Ponta-Direita": "Ponta Direita",
  "Ponta-Esquerdo": "Ponta Esquerdo",
  "Centroavante": "Centroavante",
}

export const POSITION_SHORT: Record<Position, string> = {
  "Goleiro": "GOL",
  "Zaga-1": "ZG1",
  "Zaga-2": "ZG2",
  "Lateral-Direito": "LD",
  "Lateral-Esquerdo": "LE",
  "Primeiro-Volante": "PV",
  "Segundo-Volante": "SV",
  "Meia-Armador": "MEI",
  "Ponta-Direita": "PD",
  "Ponta-Esquerdo": "PE",
  "Centroavante": "CA",
}

// Tactical field positions (percentage-based: left%, top%)
export const FIELD_POSITIONS: Record<Position, { left: number; top: number }> = {
  "Goleiro":          { left: 50, top: 88 },
  "Lateral-Esquerdo": { left: 12, top: 68 },
  "Zaga-1":           { left: 35, top: 68 },
  "Zaga-2":           { left: 65, top: 68 },
  "Lateral-Direito":  { left: 88, top: 68 },
  "Primeiro-Volante": { left: 35, top: 48 },
  "Segundo-Volante":  { left: 65, top: 48 },
  "Meia-Armador":     { left: 50, top: 32 },
  "Ponta-Esquerdo":   { left: 15, top: 16 },
  "Centroavante":     { left: 50, top: 8  },
  "Ponta-Direita":    { left: 85, top: 16 },
}
