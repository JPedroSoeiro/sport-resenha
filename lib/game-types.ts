// Game Types

export type Position = 
  | "Goleiro" 
  | "Zagueiro" 
  | "Lateral-Direito" 
  | "Lateral-Esquerdo" 
  | "Primeiro-Volante" 
  | "Segundo-Volante" 
  | "Meia-Armador" 
  | "Ponta-Direita" 
  | "Ponta-Esquerda" 
  | "Centroavante"

export type Tier = 1 | 2 | 3

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

export interface Player {
  id: number
  name: string
  teamId: number | null
  position: Position
  value: number
  tier: Tier
  nationality: Nationality
  isReserva: boolean
  sold?: boolean
  activatedFromReserve?: boolean // Track if this player was activated due to auction loss
}

export interface PlayerManager {
  id: number
  name: string
  teamId: number
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
  blockedPositions: Position[] // Positions blocked for this round due to auction loss
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

export type GamePhase = 
  | "host-setup"     // Host defines global budget
  | "player-setup"   // Players enter names and choose teams
  | "draw-cards"     // Draw decrees and financial cards
  | "position-round" 
  | "decision"       // Keep or Sell
  | "market"         // Select from 3 pre-defined options
  | "bidding"        // Manual auction when conflict
  | "evaluation"

export interface RoundTransferOption {
  tier: Tier
  player: Player
}

export interface BiddingState {
  player: Player | null
  teams: number[]
  currentBids: Record<number, number>
  activeTeamIndex: number
  // No timer - manual auction
}

export interface GameState {
  phase: GamePhase
  currentTeamIndex: number
  currentPositionIndex: number
  globalBudget: number
  managers: PlayerManager[]
  teams: Team[]
  players: Player[]
  freeAgents: Player[]
  positionRounds: Position[]
  soldInCurrentRound: number[]
  marketSelections: Record<number, number | null>
  roundTransferOptions: RoundTransferOption[] // 3 options per round (Tier 1, 2, 3)
  bidding: BiddingState
  decreePool: PresidentialDecree[]
  financialPool: FinancialCard[]
  usedDecrees: number[]
  usedFinancials: number[]
  setupComplete: number[]
  gameStarted: boolean
  gameEnded: boolean
  auctionLosers: Record<number, Position[]> // Track teams that lost auctions and for which positions
}

export const POSITION_ROUNDS: Position[] = [
  "Goleiro",
  "Zagueiro",
  "Primeiro-Volante",
  "Lateral-Direito",
  "Ponta-Direita",
  "Segundo-Volante",
  "Lateral-Esquerdo",
  "Zagueiro",
  "Meia-Armador",
  "Ponta-Esquerda",
  "Centroavante",
]

export const POSITION_ORDER: Position[] = [
  "Goleiro",
  "Zagueiro",
  "Lateral-Direito",
  "Lateral-Esquerdo",
  "Primeiro-Volante",
  "Segundo-Volante",
  "Meia-Armador",
  "Ponta-Direita",
  "Ponta-Esquerda",
  "Centroavante",
]
