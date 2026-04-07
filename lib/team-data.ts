// Team Data - 10 Brasileirão Teams with Titular and Reserva players
import { Player, Position, Nationality, Tier } from "./game-types"

export interface TeamConfig {
  id: number
  name: string
  shortName: string
  primaryColor: string
  secondaryColor: string
  crest?: string
}

export const AVAILABLE_TEAMS: TeamConfig[] = [
  { id: 1, name: "Corinthians", shortName: "COR", primaryColor: "#000000", secondaryColor: "#FFFFFF" },
  { id: 2, name: "São Paulo", shortName: "SAO", primaryColor: "#FF0000", secondaryColor: "#FFFFFF" },
  { id: 3, name: "Santos", shortName: "SAN", primaryColor: "#000000", secondaryColor: "#FFFFFF" },
  { id: 4, name: "Palmeiras", shortName: "PAL", primaryColor: "#006437", secondaryColor: "#FFFFFF" },
  { id: 5, name: "Flamengo", shortName: "FLA", primaryColor: "#C4161C", secondaryColor: "#000000" },
  { id: 6, name: "Vasco", shortName: "VAS", primaryColor: "#000000", secondaryColor: "#FFFFFF" },
  { id: 7, name: "Internacional", shortName: "INT", primaryColor: "#E30613", secondaryColor: "#FFFFFF" },
  { id: 8, name: "Grêmio", shortName: "GRE", primaryColor: "#0066B3", secondaryColor: "#000000" },
  { id: 9, name: "Atlético-MG", shortName: "CAM", primaryColor: "#000000", secondaryColor: "#FFFFFF" },
  { id: 10, name: "Cruzeiro", shortName: "CRU", primaryColor: "#003DA5", secondaryColor: "#FFFFFF" },
]

// Helper to create player
let playerId = 1
function createPlayer(
  name: string,
  teamId: number,
  position: Position,
  value: number,
  tier: Tier,
  nationality: Nationality,
  isReserva: boolean = false
): Player {
  return {
    id: playerId++,
    name,
    teamId,
    position,
    value,
    tier,
    nationality,
    isReserva,
    sold: false,
  }
}

// Team rosters with Titular and Reserva players
export function getTeamPlayers(teamId: number): Player[] {
  playerId = (teamId - 1) * 20 + 1 // Reset ID based on team
  
  switch (teamId) {
    case 1: // Corinthians
      return [
        // Titulares
        createPlayer("Hugo Souza", 1, "Goleiro", 10000000, 1, "Brasileiro"),
        createPlayer("Félix Torres", 1, "Zagueiro", 8000000, 1, "Colombiano"),
        createPlayer("Cacá", 1, "Zagueiro", 5000000, 2, "Brasileiro"),
        createPlayer("Matheuzinho", 1, "Lateral-Direito", 6000000, 2, "Brasileiro"),
        createPlayer("Hugo", 1, "Lateral-Esquerdo", 4000000, 2, "Brasileiro"),
        createPlayer("Raniele", 1, "Primeiro-Volante", 7000000, 2, "Brasileiro"),
        createPlayer("Breno Bidon", 1, "Segundo-Volante", 5000000, 2, "Brasileiro"),
        createPlayer("Rodrigo Garro", 1, "Meia-Armador", 12000000, 1, "Argentino"),
        createPlayer("Wesley", 1, "Ponta-Direita", 8000000, 2, "Brasileiro"),
        createPlayer("Romero", 1, "Ponta-Esquerda", 6000000, 2, "Paraguaio"),
        createPlayer("Yuri Alberto", 1, "Centroavante", 15000000, 1, "Brasileiro"),
        // Reservas
        createPlayer("Matheus Donelli", 1, "Goleiro", 2000000, 3, "Brasileiro", true),
        createPlayer("Raul Gustavo", 1, "Zagueiro", 2000000, 3, "Brasileiro", true),
        createPlayer("Léo Mana", 1, "Lateral-Direito", 1500000, 3, "Brasileiro", true),
        createPlayer("Diego Palacios", 1, "Lateral-Esquerdo", 2000000, 3, "Colombiano", true),
        createPlayer("Ryan", 1, "Primeiro-Volante", 1500000, 3, "Brasileiro", true),
        createPlayer("Alex Santana", 1, "Segundo-Volante", 2000000, 3, "Brasileiro", true),
        createPlayer("Igor Coronado", 1, "Meia-Armador", 3000000, 3, "Brasileiro", true),
        createPlayer("Talles Magno", 1, "Ponta-Direita", 3000000, 3, "Brasileiro", true),
        createPlayer("Pedro Raul", 1, "Ponta-Esquerda", 2500000, 3, "Brasileiro", true),
        createPlayer("Giovane", 1, "Centroavante", 3000000, 3, "Brasileiro", true),
      ]
    
    case 2: // São Paulo
      return [
        createPlayer("Rafael", 2, "Goleiro", 8000000, 1, "Brasileiro"),
        createPlayer("Arboleda", 2, "Zagueiro", 7000000, 2, "Colombiano"),
        createPlayer("Alan Franco", 2, "Zagueiro", 6000000, 2, "Paraguaio"),
        createPlayer("Rafinha", 2, "Lateral-Direito", 4000000, 2, "Brasileiro"),
        createPlayer("Welington", 2, "Lateral-Esquerdo", 8000000, 1, "Brasileiro"),
        createPlayer("Luiz Gustavo", 2, "Primeiro-Volante", 5000000, 2, "Brasileiro"),
        createPlayer("Alisson", 2, "Segundo-Volante", 6000000, 2, "Brasileiro"),
        createPlayer("Lucas Moura", 2, "Meia-Armador", 10000000, 1, "Brasileiro"),
        createPlayer("Ferreirinha", 2, "Ponta-Direita", 9000000, 1, "Brasileiro"),
        createPlayer("Luciano", 2, "Ponta-Esquerda", 8000000, 2, "Brasileiro"),
        createPlayer("Calleri", 2, "Centroavante", 12000000, 1, "Argentino"),
        // Reservas
        createPlayer("Jandrei", 2, "Goleiro", 2500000, 3, "Brasileiro", true),
        createPlayer("Diego Costa", 2, "Zagueiro", 3000000, 3, "Brasileiro", true),
        createPlayer("Moreira", 2, "Lateral-Direito", 1500000, 3, "Brasileiro", true),
        createPlayer("Patryck", 2, "Lateral-Esquerdo", 2000000, 3, "Brasileiro", true),
        createPlayer("Pablo Maia", 2, "Primeiro-Volante", 4000000, 2, "Brasileiro", true),
        createPlayer("Rodrigo Nestor", 2, "Segundo-Volante", 4000000, 2, "Brasileiro", true),
        createPlayer("Michel Araújo", 2, "Meia-Armador", 3000000, 3, "Uruguaio", true),
        createPlayer("Erick", 2, "Ponta-Direita", 2000000, 3, "Brasileiro", true),
        createPlayer("Wellington Rato", 2, "Ponta-Esquerda", 3000000, 3, "Brasileiro", true),
        createPlayer("André Silva", 2, "Centroavante", 3500000, 3, "Brasileiro", true),
      ]
    
    case 3: // Santos
      return [
        createPlayer("Gabriel Brazão", 3, "Goleiro", 6000000, 2, "Brasileiro"),
        createPlayer("Gil", 3, "Zagueiro", 3000000, 3, "Brasileiro"),
        createPlayer("Jair", 3, "Zagueiro", 4000000, 2, "Brasileiro"),
        createPlayer("JP Chermont", 3, "Lateral-Direito", 5000000, 2, "Brasileiro"),
        createPlayer("Escobar", 3, "Lateral-Esquerdo", 4000000, 2, "Brasileiro"),
        createPlayer("Diego Pituca", 3, "Primeiro-Volante", 5000000, 2, "Brasileiro"),
        createPlayer("Tomás Rincón", 3, "Segundo-Volante", 3000000, 3, "Chileno"),
        createPlayer("Giuliano", 3, "Meia-Armador", 4000000, 2, "Brasileiro"),
        createPlayer("Otero", 3, "Ponta-Direita", 5000000, 2, "Colombiano"),
        createPlayer("Pedrinho", 3, "Ponta-Esquerda", 6000000, 2, "Brasileiro"),
        createPlayer("Wendel Silva", 3, "Centroavante", 4000000, 2, "Brasileiro"),
        // Reservas
        createPlayer("João Paulo", 3, "Goleiro", 2000000, 3, "Brasileiro", true),
        createPlayer("Alex", 3, "Zagueiro", 1500000, 3, "Brasileiro", true),
        createPlayer("Hayner", 3, "Lateral-Direito", 1500000, 3, "Brasileiro", true),
        createPlayer("Kevyson", 3, "Lateral-Esquerdo", 1000000, 3, "Brasileiro", true),
        createPlayer("Sandry", 3, "Primeiro-Volante", 2000000, 3, "Brasileiro", true),
        createPlayer("Lucas Braga", 3, "Segundo-Volante", 1500000, 3, "Brasileiro", true),
        createPlayer("Soteldo", 3, "Meia-Armador", 3000000, 2, "Chileno", true),
        createPlayer("Lucas Barbosa", 3, "Ponta-Direita", 1500000, 3, "Brasileiro", true),
        createPlayer("Ângelo", 3, "Ponta-Esquerda", 2500000, 3, "Brasileiro", true),
        createPlayer("Furch", 3, "Centroavante", 2500000, 3, "Argentino", true),
      ]
    
    case 4: // Palmeiras
      return [
        createPlayer("Weverton", 4, "Goleiro", 8000000, 1, "Brasileiro"),
        createPlayer("Gustavo Gómez", 4, "Zagueiro", 12000000, 1, "Paraguaio"),
        createPlayer("Murilo", 4, "Zagueiro", 10000000, 1, "Brasileiro"),
        createPlayer("Mayke", 4, "Lateral-Direito", 5000000, 2, "Brasileiro"),
        createPlayer("Piquerez", 4, "Lateral-Esquerdo", 10000000, 1, "Uruguaio"),
        createPlayer("Zé Rafael", 4, "Primeiro-Volante", 8000000, 1, "Brasileiro"),
        createPlayer("Richard Ríos", 4, "Segundo-Volante", 12000000, 1, "Colombiano"),
        createPlayer("Raphael Veiga", 4, "Meia-Armador", 15000000, 1, "Brasileiro"),
        createPlayer("Estêvão", 4, "Ponta-Direita", 40000000, 1, "Brasileiro"),
        createPlayer("Dudu", 4, "Ponta-Esquerda", 8000000, 2, "Brasileiro"),
        createPlayer("Endrick", 4, "Centroavante", 30000000, 1, "Brasileiro"),
        // Reservas
        createPlayer("Marcelo Lomba", 4, "Goleiro", 2000000, 3, "Brasileiro", true),
        createPlayer("Luan", 4, "Zagueiro", 3000000, 3, "Brasileiro", true),
        createPlayer("Marcos Rocha", 4, "Lateral-Direito", 2000000, 3, "Brasileiro", true),
        createPlayer("Vanderlan", 4, "Lateral-Esquerdo", 3000000, 3, "Brasileiro", true),
        createPlayer("Gabriel Menino", 4, "Primeiro-Volante", 6000000, 2, "Brasileiro", true),
        createPlayer("Aníbal Moreno", 4, "Segundo-Volante", 5000000, 2, "Argentino", true),
        createPlayer("Rômulo", 4, "Meia-Armador", 3000000, 3, "Brasileiro", true),
        createPlayer("Lázaro", 4, "Ponta-Direita", 4000000, 3, "Brasileiro", true),
        createPlayer("Artur", 4, "Ponta-Esquerda", 3000000, 3, "Brasileiro", true),
        createPlayer("Flaco López", 4, "Centroavante", 8000000, 2, "Argentino", true),
      ]
    
    case 5: // Flamengo
      return [
        createPlayer("Rossi", 5, "Goleiro", 6000000, 2, "Argentino"),
        createPlayer("Fabrício Bruno", 5, "Zagueiro", 8000000, 2, "Brasileiro"),
        createPlayer("Léo Ortiz", 5, "Zagueiro", 9000000, 1, "Brasileiro"),
        createPlayer("Varela", 5, "Lateral-Direito", 6000000, 2, "Uruguaio"),
        createPlayer("Ayrton Lucas", 5, "Lateral-Esquerdo", 7000000, 2, "Brasileiro"),
        createPlayer("Gerson", 5, "Primeiro-Volante", 20000000, 1, "Brasileiro"),
        createPlayer("Allan", 5, "Segundo-Volante", 5000000, 2, "Brasileiro"),
        createPlayer("De Arrascaeta", 5, "Meia-Armador", 18000000, 1, "Uruguaio"),
        createPlayer("John Arias", 5, "Ponta-Direita", 18000000, 1, "Colombiano"),
        createPlayer("Everton Cebolinha", 5, "Ponta-Esquerda", 12000000, 1, "Brasileiro"),
        createPlayer("Pedro", 5, "Centroavante", 25000000, 1, "Brasileiro"),
        // Reservas
        createPlayer("Matheus Cunha", 5, "Goleiro", 1500000, 3, "Brasileiro", true),
        createPlayer("Cleiton", 5, "Zagueiro", 2000000, 3, "Brasileiro", true),
        createPlayer("Wesley França", 5, "Lateral-Direito", 2000000, 3, "Brasileiro", true),
        createPlayer("Viña", 5, "Lateral-Esquerdo", 4000000, 2, "Uruguaio", true),
        createPlayer("Pulgar", 5, "Primeiro-Volante", 6000000, 2, "Chileno", true),
        createPlayer("Victor Hugo", 5, "Segundo-Volante", 4000000, 2, "Brasileiro", true),
        createPlayer("Everton Ribeiro", 5, "Meia-Armador", 5000000, 2, "Brasileiro", true),
        createPlayer("Bruno Henrique", 5, "Ponta-Direita", 7000000, 2, "Brasileiro", true),
        createPlayer("Michael", 5, "Ponta-Esquerda", 8000000, 2, "Brasileiro", true),
        createPlayer("Gabigol", 5, "Centroavante", 10000000, 2, "Brasileiro", true),
      ]
    
    case 6: // Vasco
      return [
        createPlayer("Léo Jardim", 6, "Goleiro", 5000000, 2, "Brasileiro"),
        createPlayer("João Victor", 6, "Zagueiro", 6000000, 2, "Brasileiro"),
        createPlayer("Maicon", 6, "Zagueiro", 3000000, 3, "Brasileiro"),
        createPlayer("Paulo Henrique", 6, "Lateral-Direito", 4000000, 2, "Brasileiro"),
        createPlayer("Lucas Piton", 6, "Lateral-Esquerdo", 5000000, 2, "Brasileiro"),
        createPlayer("Sforza", 6, "Primeiro-Volante", 4000000, 2, "Argentino"),
        createPlayer("Hugo Moura", 6, "Segundo-Volante", 3000000, 3, "Brasileiro"),
        createPlayer("Dimitri Payet", 6, "Meia-Armador", 4000000, 2, "Português"),
        createPlayer("Adson", 6, "Ponta-Direita", 5000000, 2, "Brasileiro"),
        createPlayer("David", 6, "Ponta-Esquerda", 4000000, 2, "Brasileiro"),
        createPlayer("Vegetti", 6, "Centroavante", 6000000, 2, "Argentino"),
        // Reservas
        createPlayer("Keiller", 6, "Goleiro", 1500000, 3, "Brasileiro", true),
        createPlayer("Léo", 6, "Zagueiro", 2000000, 3, "Brasileiro", true),
        createPlayer("Puma Rodríguez", 6, "Lateral-Direito", 3000000, 3, "Uruguaio", true),
        createPlayer("Leandrinho", 6, "Lateral-Esquerdo", 1500000, 3, "Brasileiro", true),
        createPlayer("Mateus Carvalho", 6, "Primeiro-Volante", 2500000, 3, "Brasileiro", true),
        createPlayer("Galdames", 6, "Segundo-Volante", 2000000, 3, "Chileno", true),
        createPlayer("Gary Medel", 6, "Meia-Armador", 2000000, 3, "Chileno", true),
        createPlayer("Rossi", 6, "Ponta-Direita", 2000000, 3, "Brasileiro", true),
        createPlayer("Clayton", 6, "Ponta-Esquerda", 1500000, 3, "Brasileiro", true),
        createPlayer("GB", 6, "Centroavante", 2000000, 3, "Brasileiro", true),
      ]
    
    case 7: // Internacional
      return [
        createPlayer("Rochet", 7, "Goleiro", 8000000, 1, "Uruguaio"),
        createPlayer("Vitão", 7, "Zagueiro", 7000000, 2, "Brasileiro"),
        createPlayer("Mercado", 7, "Zagueiro", 5000000, 2, "Argentino"),
        createPlayer("Bustos", 7, "Lateral-Direito", 6000000, 2, "Argentino"),
        createPlayer("Renê", 7, "Lateral-Esquerdo", 3000000, 3, "Brasileiro"),
        createPlayer("Fernando", 7, "Primeiro-Volante", 4000000, 2, "Brasileiro"),
        createPlayer("Bruno Henrique", 7, "Segundo-Volante", 3000000, 3, "Brasileiro"),
        createPlayer("Alan Patrick", 7, "Meia-Armador", 8000000, 1, "Brasileiro"),
        createPlayer("Wesley", 7, "Ponta-Direita", 12000000, 1, "Brasileiro"),
        createPlayer("Wanderson", 7, "Ponta-Esquerda", 4000000, 2, "Brasileiro"),
        createPlayer("Valencia", 7, "Centroavante", 6000000, 2, "Colombiano"),
        // Reservas
        createPlayer("Anthoni", 7, "Goleiro", 1500000, 3, "Brasileiro", true),
        createPlayer("Robert Renan", 7, "Zagueiro", 3000000, 3, "Brasileiro", true),
        createPlayer("Aguirre", 7, "Lateral-Direito", 2500000, 3, "Uruguaio", true),
        createPlayer("Bernabei", 7, "Lateral-Esquerdo", 4000000, 2, "Argentino", true),
        createPlayer("Rômulo", 7, "Primeiro-Volante", 2500000, 3, "Brasileiro", true),
        createPlayer("Mauricio", 7, "Segundo-Volante", 3000000, 3, "Brasileiro", true),
        createPlayer("Hyoran", 7, "Meia-Armador", 2500000, 3, "Brasileiro", true),
        createPlayer("Gustavo Prado", 7, "Ponta-Direita", 3000000, 3, "Brasileiro", true),
        createPlayer("Lucca", 7, "Ponta-Esquerda", 2000000, 3, "Brasileiro", true),
        createPlayer("Borré", 7, "Centroavante", 8000000, 2, "Colombiano", true),
      ]
    
    case 8: // Grêmio
      return [
        createPlayer("Marchesín", 8, "Goleiro", 5000000, 2, "Argentino"),
        createPlayer("Geromel", 8, "Zagueiro", 3000000, 3, "Brasileiro"),
        createPlayer("Kannemann", 8, "Zagueiro", 4000000, 2, "Argentino"),
        createPlayer("João Pedro", 8, "Lateral-Direito", 5000000, 2, "Brasileiro"),
        createPlayer("Reinaldo", 8, "Lateral-Esquerdo", 4000000, 2, "Brasileiro"),
        createPlayer("Villasanti", 8, "Primeiro-Volante", 10000000, 1, "Paraguaio"),
        createPlayer("Pepê", 8, "Segundo-Volante", 6000000, 2, "Brasileiro"),
        createPlayer("Cristaldo", 8, "Meia-Armador", 7000000, 2, "Argentino"),
        createPlayer("Pavon", 8, "Ponta-Direita", 8000000, 2, "Argentino"),
        createPlayer("Nathan", 8, "Ponta-Esquerda", 5000000, 2, "Brasileiro"),
        createPlayer("Diego Costa", 8, "Centroavante", 6000000, 2, "Brasileiro"),
        // Reservas
        createPlayer("Gabriel Grando", 8, "Goleiro", 1500000, 3, "Brasileiro", true),
        createPlayer("Rodrigo Ely", 8, "Zagueiro", 2000000, 3, "Brasileiro", true),
        createPlayer("Fábio", 8, "Lateral-Direito", 1500000, 3, "Brasileiro", true),
        createPlayer("Mayk", 8, "Lateral-Esquerdo", 1500000, 3, "Brasileiro", true),
        createPlayer("Du Queiroz", 8, "Primeiro-Volante", 3000000, 3, "Brasileiro", true),
        createPlayer("Edenilson", 8, "Segundo-Volante", 2500000, 3, "Brasileiro", true),
        createPlayer("Carballo", 8, "Meia-Armador", 3000000, 3, "Uruguaio", true),
        createPlayer("Everton Galdino", 8, "Ponta-Direita", 2500000, 3, "Brasileiro", true),
        createPlayer("Soteldo", 8, "Ponta-Esquerda", 4000000, 2, "Chileno", true),
        createPlayer("André", 8, "Centroavante", 2500000, 3, "Brasileiro", true),
      ]
    
    case 9: // Atlético-MG
      return [
        createPlayer("Everson", 9, "Goleiro", 7000000, 2, "Brasileiro"),
        createPlayer("Jemerson", 9, "Zagueiro", 4000000, 2, "Brasileiro"),
        createPlayer("Battaglia", 9, "Zagueiro", 5000000, 2, "Argentino"),
        createPlayer("Saravia", 9, "Lateral-Direito", 4000000, 2, "Argentino"),
        createPlayer("Guilherme Arana", 9, "Lateral-Esquerdo", 12000000, 1, "Brasileiro"),
        createPlayer("Otávio", 9, "Primeiro-Volante", 8000000, 1, "Brasileiro"),
        createPlayer("Alan Franco", 9, "Segundo-Volante", 5000000, 2, "Paraguaio"),
        createPlayer("Gustavo Scarpa", 9, "Meia-Armador", 8000000, 1, "Brasileiro"),
        createPlayer("Paulinho", 9, "Ponta-Direita", 15000000, 1, "Brasileiro"),
        createPlayer("Hulk", 9, "Ponta-Esquerda", 10000000, 1, "Brasileiro"),
        createPlayer("Eduardo Vargas", 9, "Centroavante", 5000000, 2, "Chileno"),
        // Reservas
        createPlayer("Matheus Mendes", 9, "Goleiro", 1500000, 3, "Brasileiro", true),
        createPlayer("Rômulo", 9, "Zagueiro", 2000000, 3, "Brasileiro", true),
        createPlayer("Mariano", 9, "Lateral-Direito", 2000000, 3, "Brasileiro", true),
        createPlayer("Rubens", 9, "Lateral-Esquerdo", 3000000, 3, "Brasileiro", true),
        createPlayer("Igor Gomes", 9, "Primeiro-Volante", 4000000, 2, "Brasileiro", true),
        createPlayer("Fausto Vera", 9, "Segundo-Volante", 5000000, 2, "Argentino", true),
        createPlayer("Matías Zaracho", 9, "Meia-Armador", 6000000, 2, "Argentino", true),
        createPlayer("Alisson", 9, "Ponta-Direita", 3000000, 3, "Brasileiro", true),
        createPlayer("Pedrinho", 9, "Ponta-Esquerda", 4000000, 3, "Brasileiro", true),
        createPlayer("Alan Kardec", 9, "Centroavante", 2500000, 3, "Brasileiro", true),
      ]
    
    case 10: // Cruzeiro
      return [
        createPlayer("Cássio", 10, "Goleiro", 3000000, 3, "Brasileiro"),
        createPlayer("Zé Ivaldo", 10, "Zagueiro", 4000000, 2, "Brasileiro"),
        createPlayer("João Marcelo", 10, "Zagueiro", 3000000, 3, "Brasileiro"),
        createPlayer("William", 10, "Lateral-Direito", 4000000, 2, "Brasileiro"),
        createPlayer("Marlon", 10, "Lateral-Esquerdo", 3000000, 3, "Brasileiro"),
        createPlayer("Lucas Romero", 10, "Primeiro-Volante", 5000000, 2, "Argentino"),
        createPlayer("Matheus Henrique", 10, "Segundo-Volante", 6000000, 2, "Brasileiro"),
        createPlayer("Matheus Pereira", 10, "Meia-Armador", 10000000, 1, "Brasileiro"),
        createPlayer("Gabriel Verón", 10, "Ponta-Direita", 6000000, 2, "Brasileiro"),
        createPlayer("Álvaro Barreal", 10, "Ponta-Esquerda", 5000000, 2, "Argentino"),
        createPlayer("Juan Dinenno", 10, "Centroavante", 7000000, 2, "Argentino"),
        // Reservas
        createPlayer("Anderson", 10, "Goleiro", 1000000, 3, "Brasileiro", true),
        createPlayer("Neris", 10, "Zagueiro", 2000000, 3, "Brasileiro", true),
        createPlayer("Wesley Gasolina", 10, "Lateral-Direito", 2500000, 3, "Brasileiro", true),
        createPlayer("Kaiki Bruno", 10, "Lateral-Esquerdo", 1500000, 3, "Brasileiro", true),
        createPlayer("Walace", 10, "Primeiro-Volante", 3000000, 3, "Brasileiro", true),
        createPlayer("Ramiro", 10, "Segundo-Volante", 2500000, 3, "Brasileiro", true),
        createPlayer("Vitinho", 10, "Meia-Armador", 2000000, 3, "Brasileiro", true),
        createPlayer("Arthur Gomes", 10, "Ponta-Direita", 2500000, 3, "Brasileiro", true),
        createPlayer("Lautaro Díaz", 10, "Ponta-Esquerda", 3000000, 3, "Argentino", true),
        createPlayer("Rafa Silva", 10, "Centroavante", 3000000, 3, "Brasileiro", true),
      ]
    
    default:
      return []
  }
}

// European Transfer Options (15M-25M value range)
export const EUROPEAN_TRANSFER_OPTIONS: Omit<Player, "id" | "teamId">[] = [
  // Tier 1 - European stars (20-25M)
  { name: "Dani Olmo", position: "Meia-Armador", value: 25000000, tier: 1, nationality: "Espanhol", isReserva: false },
  { name: "Fabian Ruiz", position: "Segundo-Volante", value: 22000000, tier: 1, nationality: "Espanhol", isReserva: false },
  { name: "Nico Williams", position: "Ponta-Esquerda", value: 25000000, tier: 1, nationality: "Espanhol", isReserva: false },
  { name: "Rodrigo Bentancur", position: "Primeiro-Volante", value: 20000000, tier: 1, nationality: "Uruguaio", isReserva: false },
  { name: "Julián Álvarez", position: "Centroavante", value: 25000000, tier: 1, nationality: "Argentino", isReserva: false },
  
  // Tier 2 - Solid Europeans (15-20M)
  { name: "Vitinha", position: "Meia-Armador", value: 18000000, tier: 2, nationality: "Português", isReserva: false },
  { name: "Gonçalo Ramos", position: "Centroavante", value: 20000000, tier: 2, nationality: "Português", isReserva: false },
  { name: "Bryan Gil", position: "Ponta-Direita", value: 15000000, tier: 2, nationality: "Espanhol", isReserva: false },
  { name: "Alex Grimaldo", position: "Lateral-Esquerdo", value: 18000000, tier: 2, nationality: "Espanhol", isReserva: false },
  { name: "Diogo Costa", position: "Goleiro", value: 20000000, tier: 2, nationality: "Português", isReserva: false },
  { name: "Gonçalo Inácio", position: "Zagueiro", value: 18000000, tier: 2, nationality: "Português", isReserva: false },
  { name: "Nélson Semedo", position: "Lateral-Direito", value: 15000000, tier: 2, nationality: "Português", isReserva: false },
]

// Get all available free agents (players not assigned to any team in current game)
export function getAllFreePlayers(): Player[] {
  let id = 500
  return EUROPEAN_TRANSFER_OPTIONS.map(p => ({
    ...p,
    id: id++,
    teamId: null,
    sold: false,
  }))
}
