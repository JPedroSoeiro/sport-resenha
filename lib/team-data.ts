// Team Data – 10 Brasileirão Teams with 11 Titulares + 11 Reservas each
import type { Player, Position, Nationality, Tier, Category } from "./game-types"

export interface TeamConfig {
  id: number
  name: string
  shortName: string
  primaryColor: string
  secondaryColor: string
}

export const AVAILABLE_TEAMS: TeamConfig[] = [
  { id: 1,  name: "Corinthians",   shortName: "COR", primaryColor: "#1a1a1a", secondaryColor: "#FFFFFF" },
  { id: 2,  name: "São Paulo",     shortName: "SAO", primaryColor: "#CC0000", secondaryColor: "#FFFFFF" },
  { id: 3,  name: "Santos",        shortName: "SAN", primaryColor: "#1a1a1a", secondaryColor: "#FFFFFF" },
  { id: 4,  name: "Palmeiras",     shortName: "PAL", primaryColor: "#006437", secondaryColor: "#FFFFFF" },
  { id: 5,  name: "Flamengo",      shortName: "FLA", primaryColor: "#C4161C", secondaryColor: "#000000" },
  { id: 6,  name: "Vasco",         shortName: "VAS", primaryColor: "#1a1a1a", secondaryColor: "#FFFFFF" },
  { id: 7,  name: "Internacional", shortName: "INT", primaryColor: "#E30613", secondaryColor: "#FFFFFF" },
  { id: 8,  name: "Grêmio",        shortName: "GRE", primaryColor: "#0066B3", secondaryColor: "#000000" },
  { id: 9,  name: "Atlético-MG",   shortName: "CAM", primaryColor: "#1a1a1a", secondaryColor: "#FFFFFF" },
  { id: 10, name: "Cruzeiro",      shortName: "CRU", primaryColor: "#003DA5", secondaryColor: "#FFFFFF" },
]

// ─── Player Builder ───────────────────────────────────────────────────────────
let _id = 1
function p(
  name: string,
  teamId: number,
  position: Position,
  value: number,
  tier: Tier,
  category: Category,
  nationality: Nationality,
  isReserva = false,
): Player {
  return { id: _id++, name, teamId, position, value, tier, category, nationality, isReserva, sold: false }
}

// ─── Team Rosters ─────────────────────────────────────────────────────────────
export function getTeamPlayers(teamId: number): Player[] {
  _id = (teamId - 1) * 22 + 1

  switch (teamId) {
    // ── 1: CORINTHIANS ───────────────────────────────────────────────────
    case 1: return [
      p("Hugo Souza",        1, "Goleiro",           10_000_000, 1, "veterano", "Brasileiro"),
      p("Félix Torres",      1, "Zaga-1",             8_000_000, 1, "veterano", "Colombiano"),
      p("Cacá",              1, "Zaga-2",             5_000_000, 2, "joia",     "Brasileiro"),
      p("Matheuzinho",       1, "Lateral-Direito",    6_000_000, 2, "joia",     "Brasileiro"),
      p("Hugo Corinthians",  1, "Lateral-Esquerdo",   4_000_000, 2, "joia",     "Brasileiro"),
      p("Raniele",           1, "Primeiro-Volante",   7_000_000, 2, "joia",     "Brasileiro"),
      p("Breno Bidon",       1, "Segundo-Volante",    5_000_000, 2, "joia",     "Brasileiro"),
      p("Rodrigo Garro",     1, "Meia-Armador",      12_000_000, 1, "veterano", "Argentino"),
      p("Wesley COR",        1, "Ponta-Direita",      8_000_000, 2, "joia",     "Brasileiro"),
      p("Romero",            1, "Ponta-Esquerdo",     6_000_000, 2, "joia",     "Paraguaio"),
      p("Yuri Alberto",      1, "Centroavante",      15_000_000, 1, "veterano", "Brasileiro"),
      // Reservas
      p("Matheus Donelli",   1, "Goleiro",            2_000_000, 3, "operario", "Brasileiro", true),
      p("Raul Gustavo",      1, "Zaga-1",             2_000_000, 3, "operario", "Brasileiro", true),
      p("Léo Mana COR",      1, "Zaga-2",             2_000_000, 3, "operario", "Brasileiro", true),
      p("Igor Coronado",     1, "Lateral-Direito",    3_000_000, 3, "operario", "Brasileiro", true),
      p("Diego Palacios",    1, "Lateral-Esquerdo",   2_000_000, 3, "operario", "Colombiano", true),
      p("Ryan COR",          1, "Primeiro-Volante",   1_500_000, 3, "operario", "Brasileiro", true),
      p("Alex Santana",      1, "Segundo-Volante",    2_000_000, 3, "operario", "Brasileiro", true),
      p("Talles Magno",      1, "Meia-Armador",       3_000_000, 3, "operario", "Brasileiro", true),
      p("Pedro Raul COR",    1, "Ponta-Direita",      2_500_000, 3, "operario", "Brasileiro", true),
      p("Giovane",           1, "Ponta-Esquerdo",     3_000_000, 3, "operario", "Brasileiro", true),
      p("Guilherme Biro COR",1, "Centroavante",       2_000_000, 3, "operario", "Brasileiro", true),
    ]

    // ── 2: SÃO PAULO ─────────────────────────────────────────────────────
    case 2: return [
      p("Rafael",            2, "Goleiro",            8_000_000, 1, "veterano", "Brasileiro"),
      p("Arboleda",          2, "Zaga-1",             7_000_000, 2, "joia",     "Colombiano"),
      p("Alan Franco SAO",   2, "Zaga-2",             6_000_000, 2, "joia",     "Paraguaio"),
      p("Rafinha SAO",       2, "Lateral-Direito",    4_000_000, 2, "joia",     "Brasileiro"),
      p("Welington",         2, "Lateral-Esquerdo",   8_000_000, 1, "veterano", "Brasileiro"),
      p("Luiz Gustavo",      2, "Primeiro-Volante",   5_000_000, 2, "joia",     "Brasileiro"),
      p("Alisson SAO",       2, "Segundo-Volante",    6_000_000, 2, "joia",     "Brasileiro"),
      p("Lucas Moura",       2, "Meia-Armador",      10_000_000, 1, "veterano", "Brasileiro"),
      p("Ferreirinha",       2, "Ponta-Direita",      9_000_000, 1, "veterano", "Brasileiro"),
      p("Luciano",           2, "Ponta-Esquerdo",     8_000_000, 2, "joia",     "Brasileiro"),
      p("Calleri",           2, "Centroavante",      12_000_000, 1, "veterano", "Argentino"),
      // Reservas
      p("Jandrei",           2, "Goleiro",            2_500_000, 3, "operario", "Brasileiro", true),
      p("Diego Costa SAO",   2, "Zaga-1",             3_000_000, 3, "operario", "Brasileiro", true),
      p("Moreira SAO",       2, "Zaga-2",             1_500_000, 3, "operario", "Brasileiro", true),
      p("Moreira LD",        2, "Lateral-Direito",    1_500_000, 3, "operario", "Brasileiro", true),
      p("Patryck",           2, "Lateral-Esquerdo",   2_000_000, 3, "operario", "Brasileiro", true),
      p("Pablo Maia SAO",    2, "Primeiro-Volante",   4_000_000, 2, "joia",     "Brasileiro", true),
      p("Nestor",            2, "Segundo-Volante",    4_000_000, 2, "joia",     "Brasileiro", true),
      p("Michel Araújo SAO", 2, "Meia-Armador",       3_000_000, 3, "operario", "Uruguaio",   true),
      p("Erick SAO",         2, "Ponta-Direita",      2_000_000, 3, "operario", "Brasileiro", true),
      p("Wellington Rato",   2, "Ponta-Esquerdo",     3_000_000, 3, "operario", "Brasileiro", true),
      p("André Silva SAO",   2, "Centroavante",       3_500_000, 3, "operario", "Brasileiro", true),
    ]

    // ── 3: SANTOS ────────────────────────────────────────────────────────
    case 3: return [
      p("Gabriel Brazão",    3, "Goleiro",            6_000_000, 2, "joia",     "Brasileiro"),
      p("Gil",               3, "Zaga-1",             3_000_000, 3, "operario", "Brasileiro"),
      p("Jair",              3, "Zaga-2",             4_000_000, 2, "joia",     "Brasileiro"),
      p("JP Chermont",       3, "Lateral-Direito",    5_000_000, 2, "joia",     "Brasileiro"),
      p("Escobar",           3, "Lateral-Esquerdo",   4_000_000, 2, "joia",     "Colombiano"),
      p("Diego Pituca",      3, "Primeiro-Volante",   5_000_000, 2, "joia",     "Brasileiro"),
      p("Giuliano",          3, "Segundo-Volante",    4_000_000, 2, "joia",     "Brasileiro"),
      p("Otero",             3, "Meia-Armador",       5_000_000, 2, "joia",     "Colombiano"),
      p("Pedrinho SAN",      3, "Ponta-Direita",      6_000_000, 2, "joia",     "Brasileiro"),
      p("Lucas Braga",       3, "Ponta-Esquerdo",     5_000_000, 2, "joia",     "Brasileiro"),
      p("Wendel Silva",      3, "Centroavante",       4_000_000, 2, "joia",     "Brasileiro"),
      // Reservas
      p("João Paulo SAN",    3, "Goleiro",            2_000_000, 3, "operario", "Brasileiro", true),
      p("Alex SAN",          3, "Zaga-1",             1_500_000, 3, "operario", "Brasileiro", true),
      p("Rodrigo SAN",       3, "Zaga-2",             1_500_000, 3, "operario", "Brasileiro", true),
      p("Hayner",            3, "Lateral-Direito",    1_500_000, 3, "operario", "Brasileiro", true),
      p("Kevyson",           3, "Lateral-Esquerdo",   1_000_000, 3, "operario", "Brasileiro", true),
      p("Sandry",            3, "Primeiro-Volante",   2_000_000, 3, "operario", "Brasileiro", true),
      p("Soteldo",           3, "Segundo-Volante",    3_000_000, 2, "joia",     "Chileno",    true),
      p("Tomás Rincón",      3, "Meia-Armador",       3_000_000, 3, "operario", "Chileno",    true),
      p("Lucas Barbosa",     3, "Ponta-Direita",      1_500_000, 3, "operario", "Brasileiro", true),
      p("Ângelo",            3, "Ponta-Esquerdo",     2_500_000, 3, "operario", "Brasileiro", true),
      p("Furch SAN",         3, "Centroavante",       2_500_000, 3, "operario", "Argentino",  true),
    ]

    // ── 4: PALMEIRAS ─────────────────────────────────────────────────────
    case 4: return [
      p("Weverton",          4, "Goleiro",            8_000_000, 1, "veterano", "Brasileiro"),
      p("Gustavo Gómez",     4, "Zaga-1",            12_000_000, 1, "veterano", "Paraguaio"),
      p("Murilo PAL",        4, "Zaga-2",            10_000_000, 1, "veterano", "Brasileiro"),
      p("Mayke",             4, "Lateral-Direito",    5_000_000, 2, "joia",     "Brasileiro"),
      p("Piquerez",          4, "Lateral-Esquerdo",  10_000_000, 1, "veterano", "Uruguaio"),
      p("Zé Rafael",         4, "Primeiro-Volante",   8_000_000, 1, "veterano", "Brasileiro"),
      p("Richard Ríos PAL",  4, "Segundo-Volante",   12_000_000, 1, "veterano", "Colombiano"),
      p("Raphael Veiga",     4, "Meia-Armador",      15_000_000, 1, "veterano", "Brasileiro"),
      p("Estêvão",           4, "Ponta-Direita",     40_000_000, 1, "veterano", "Brasileiro"),
      p("Dudu",              4, "Ponta-Esquerdo",     8_000_000, 2, "joia",     "Brasileiro"),
      p("Endrick",           4, "Centroavante",      30_000_000, 1, "veterano", "Brasileiro"),
      // Reservas
      p("Marcelo Lomba",     4, "Goleiro",            2_000_000, 3, "operario", "Brasileiro", true),
      p("Luan PAL",          4, "Zaga-1",             3_000_000, 3, "operario", "Brasileiro", true),
      p("Vitor Reis",        4, "Zaga-2",             4_000_000, 2, "joia",     "Brasileiro", true),
      p("Marcos Rocha",      4, "Lateral-Direito",    2_000_000, 3, "operario", "Brasileiro", true),
      p("Vanderlan",         4, "Lateral-Esquerdo",   3_000_000, 3, "operario", "Brasileiro", true),
      p("Gabriel Menino",    4, "Primeiro-Volante",   6_000_000, 2, "joia",     "Brasileiro", true),
      p("Aníbal Moreno",     4, "Segundo-Volante",    5_000_000, 2, "joia",     "Argentino",  true),
      p("Rômulo PAL",        4, "Meia-Armador",       3_000_000, 3, "operario", "Brasileiro", true),
      p("Lázaro PAL",        4, "Ponta-Direita",      4_000_000, 3, "operario", "Brasileiro", true),
      p("Artur PAL",         4, "Ponta-Esquerdo",     3_000_000, 3, "operario", "Brasileiro", true),
      p("Flaco López",       4, "Centroavante",       8_000_000, 2, "joia",     "Argentino",  true),
    ]

    // ── 5: FLAMENGO ──────────────────────────────────────────────────────
    case 5: return [
      p("Rossi FLA",         5, "Goleiro",            6_000_000, 2, "joia",     "Argentino"),
      p("Fabrício Bruno",    5, "Zaga-1",             8_000_000, 2, "joia",     "Brasileiro"),
      p("Léo Ortiz",         5, "Zaga-2",             9_000_000, 1, "veterano", "Brasileiro"),
      p("Varela",            5, "Lateral-Direito",    6_000_000, 2, "joia",     "Uruguaio"),
      p("Ayrton Lucas",      5, "Lateral-Esquerdo",   7_000_000, 2, "joia",     "Brasileiro"),
      p("Gerson",            5, "Primeiro-Volante",  20_000_000, 1, "veterano", "Brasileiro"),
      p("Allan FLA",         5, "Segundo-Volante",    5_000_000, 2, "joia",     "Brasileiro"),
      p("De Arrascaeta",     5, "Meia-Armador",      18_000_000, 1, "veterano", "Uruguaio"),
      p("John Arias FLA",    5, "Ponta-Direita",     18_000_000, 1, "veterano", "Colombiano"),
      p("Everton Cebolinha", 5, "Ponta-Esquerdo",    12_000_000, 1, "veterano", "Brasileiro"),
      p("Pedro FLA",         5, "Centroavante",      25_000_000, 1, "veterano", "Brasileiro"),
      // Reservas
      p("Dyogo Alves",       5, "Goleiro",            1_500_000, 3, "operario", "Brasileiro", true),
      p("Cleiton FLA",       5, "Zaga-1",             2_000_000, 3, "operario", "Brasileiro", true),
      p("David Luiz",        5, "Zaga-2",             3_000_000, 3, "operario", "Brasileiro", true),
      p("Wesley França",     5, "Lateral-Direito",    2_000_000, 3, "operario", "Brasileiro", true),
      p("Viña",              5, "Lateral-Esquerdo",   4_000_000, 2, "joia",     "Uruguaio",   true),
      p("Pulgar",            5, "Primeiro-Volante",   6_000_000, 2, "joia",     "Chileno",    true),
      p("Victor Hugo FLA",   5, "Segundo-Volante",    4_000_000, 2, "joia",     "Brasileiro", true),
      p("Everton Ribeiro",   5, "Meia-Armador",       5_000_000, 2, "joia",     "Brasileiro", true),
      p("Bruno Henrique FLA",5, "Ponta-Direita",      7_000_000, 2, "joia",     "Brasileiro", true),
      p("Michael FLA",       5, "Ponta-Esquerdo",     8_000_000, 2, "joia",     "Brasileiro", true),
      p("Gabigol",           5, "Centroavante",      10_000_000, 2, "joia",     "Brasileiro", true),
    ]

    // ── 6: VASCO ─────────────────────────────────────────────────────────
    case 6: return [
      p("Léo Jardim",        6, "Goleiro",            5_000_000, 2, "joia",     "Brasileiro"),
      p("João Victor",       6, "Zaga-1",             6_000_000, 2, "joia",     "Brasileiro"),
      p("Maicon",            6, "Zaga-2",             3_000_000, 3, "operario", "Brasileiro"),
      p("Paulo Henrique",    6, "Lateral-Direito",    4_000_000, 2, "joia",     "Brasileiro"),
      p("Lucas Piton",       6, "Lateral-Esquerdo",   5_000_000, 2, "joia",     "Brasileiro"),
      p("Sforza",            6, "Primeiro-Volante",   4_000_000, 2, "joia",     "Argentino"),
      p("Hugo Moura",        6, "Segundo-Volante",    3_000_000, 3, "operario", "Brasileiro"),
      p("Dimitri Payet",     6, "Meia-Armador",       4_000_000, 2, "joia",     "Português"),
      p("Adson",             6, "Ponta-Direita",      5_000_000, 2, "joia",     "Brasileiro"),
      p("David VAS",         6, "Ponta-Esquerdo",     4_000_000, 2, "joia",     "Brasileiro"),
      p("Vegetti",           6, "Centroavante",       6_000_000, 2, "joia",     "Argentino"),
      // Reservas
      p("Keiller",           6, "Goleiro",            1_500_000, 3, "operario", "Brasileiro", true),
      p("Léo VAS",           6, "Zaga-1",             2_000_000, 3, "operario", "Brasileiro", true),
      p("Danilo VAS",        6, "Zaga-2",             2_000_000, 3, "operario", "Brasileiro", true),
      p("Puma Rodríguez",    6, "Lateral-Direito",    3_000_000, 3, "operario", "Uruguaio",   true),
      p("Leandrinho",        6, "Lateral-Esquerdo",   1_500_000, 3, "operario", "Brasileiro", true),
      p("Mateus Carvalho",   6, "Primeiro-Volante",   2_500_000, 3, "operario", "Brasileiro", true),
      p("Galdames VAS",      6, "Segundo-Volante",    2_000_000, 3, "operario", "Chileno",    true),
      p("Gary Medel",        6, "Meia-Armador",       2_000_000, 3, "operario", "Chileno",    true),
      p("Rossi VAS",         6, "Ponta-Direita",      2_000_000, 3, "operario", "Brasileiro", true),
      p("Clayton",           6, "Ponta-Esquerdo",     1_500_000, 3, "operario", "Brasileiro", true),
      p("GB",                6, "Centroavante",       2_000_000, 3, "operario", "Brasileiro", true),
    ]

    // ── 7: INTERNACIONAL ─────────────────────────────────────────────────
    case 7: return [
      p("Rochet",            7, "Goleiro",            8_000_000, 1, "veterano", "Uruguaio"),
      p("Vitão",             7, "Zaga-1",             7_000_000, 2, "joia",     "Brasileiro"),
      p("Mercado",           7, "Zaga-2",             5_000_000, 2, "joia",     "Argentino"),
      p("Bustos",            7, "Lateral-Direito",    6_000_000, 2, "joia",     "Argentino"),
      p("Renê",              7, "Lateral-Esquerdo",   3_000_000, 3, "operario", "Brasileiro"),
      p("Fernando INT",      7, "Primeiro-Volante",   4_000_000, 2, "joia",     "Brasileiro"),
      p("Bruno Gomes",       7, "Segundo-Volante",    3_000_000, 3, "operario", "Brasileiro"),
      p("Alan Patrick",      7, "Meia-Armador",       8_000_000, 1, "veterano", "Brasileiro"),
      p("Wesley INT",        7, "Ponta-Direita",     12_000_000, 1, "veterano", "Brasileiro"),
      p("Wanderson",         7, "Ponta-Esquerdo",     4_000_000, 2, "joia",     "Brasileiro"),
      p("Valencia",          7, "Centroavante",       6_000_000, 2, "joia",     "Colombiano"),
      // Reservas
      p("Anthoni",           7, "Goleiro",            1_500_000, 3, "operario", "Brasileiro", true),
      p("Robert Renan",      7, "Zaga-1",             3_000_000, 3, "operario", "Brasileiro", true),
      p("Igor INT",          7, "Zaga-2",             2_000_000, 3, "operario", "Brasileiro", true),
      p("Aguirre",           7, "Lateral-Direito",    2_500_000, 3, "operario", "Uruguaio",   true),
      p("Bernabei",          7, "Lateral-Esquerdo",   4_000_000, 2, "joia",     "Argentino",  true),
      p("Rômulo INT",        7, "Primeiro-Volante",   2_500_000, 3, "operario", "Brasileiro", true),
      p("Mauricio INT",      7, "Segundo-Volante",    3_000_000, 3, "operario", "Brasileiro", true),
      p("Hyoran INT",        7, "Meia-Armador",       2_500_000, 3, "operario", "Brasileiro", true),
      p("Gustavo Prado",     7, "Ponta-Direita",      3_000_000, 3, "operario", "Brasileiro", true),
      p("Lucca INT",         7, "Ponta-Esquerdo",     2_000_000, 3, "operario", "Brasileiro", true),
      p("Borré",             7, "Centroavante",       8_000_000, 2, "joia",     "Colombiano", true),
    ]

    // ── 8: GRÊMIO ────────────────────────────────────────────────────────
    case 8: return [
      p("Marchesín",         8, "Goleiro",            5_000_000, 2, "joia",     "Argentino"),
      p("Geromel",           8, "Zaga-1",             3_000_000, 3, "operario", "Brasileiro"),
      p("Kannemann",         8, "Zaga-2",             4_000_000, 2, "joia",     "Argentino"),
      p("João Pedro GRE",    8, "Lateral-Direito",    5_000_000, 2, "joia",     "Brasileiro"),
      p("Reinaldo",          8, "Lateral-Esquerdo",   4_000_000, 2, "joia",     "Brasileiro"),
      p("Villasanti",        8, "Primeiro-Volante",  10_000_000, 1, "veterano", "Paraguaio"),
      p("Pepê GRE",          8, "Segundo-Volante",    6_000_000, 2, "joia",     "Brasileiro"),
      p("Cristaldo",         8, "Meia-Armador",       7_000_000, 2, "joia",     "Argentino"),
      p("Pavon",             8, "Ponta-Direita",      8_000_000, 2, "joia",     "Argentino"),
      p("Nathan GRE",        8, "Ponta-Esquerdo",     5_000_000, 2, "joia",     "Brasileiro"),
      p("Diego Costa GRE",   8, "Centroavante",       6_000_000, 2, "joia",     "Brasileiro"),
      // Reservas
      p("Gabriel Grando",    8, "Goleiro",            1_500_000, 3, "operario", "Brasileiro", true),
      p("Rodrigo Ely",       8, "Zaga-1",             2_000_000, 3, "operario", "Brasileiro", true),
      p("Gustavo Martins",   8, "Zaga-2",             2_000_000, 3, "operario", "Brasileiro", true),
      p("Fábio GRE",         8, "Lateral-Direito",    1_500_000, 3, "operario", "Brasileiro", true),
      p("Mayk",              8, "Lateral-Esquerdo",   1_500_000, 3, "operario", "Brasileiro", true),
      p("Du Queiroz",        8, "Primeiro-Volante",   3_000_000, 3, "operario", "Brasileiro", true),
      p("Edenilson GRE",     8, "Segundo-Volante",    2_500_000, 3, "operario", "Brasileiro", true),
      p("Carballo",          8, "Meia-Armador",       3_000_000, 3, "operario", "Uruguaio",   true),
      p("Everton Galdino GRE",8,"Ponta-Direita",      2_500_000, 3, "operario", "Brasileiro", true),
      p("Soteldo GRE",       8, "Ponta-Esquerdo",     4_000_000, 2, "joia",     "Chileno",    true),
      p("André GRE",         8, "Centroavante",       2_500_000, 3, "operario", "Brasileiro", true),
    ]

    // ── 9: ATLÉTICO-MG ───────────────────────────────────────────────────
    case 9: return [
      p("Everson",           9, "Goleiro",            7_000_000, 2, "joia",     "Brasileiro"),
      p("Jemerson",          9, "Zaga-1",             4_000_000, 2, "joia",     "Brasileiro"),
      p("Battaglia",         9, "Zaga-2",             5_000_000, 2, "joia",     "Argentino"),
      p("Saravia",           9, "Lateral-Direito",    4_000_000, 2, "joia",     "Argentino"),
      p("Guilherme Arana CAM",9,"Lateral-Esquerdo",  12_000_000, 1, "veterano", "Brasileiro"),
      p("Otávio",            9, "Primeiro-Volante",   8_000_000, 1, "veterano", "Brasileiro"),
      p("Alan Franco CAM",   9, "Segundo-Volante",    5_000_000, 2, "joia",     "Paraguaio"),
      p("Gustavo Scarpa CAM",9, "Meia-Armador",       8_000_000, 1, "veterano", "Brasileiro"),
      p("Paulinho CAM",      9, "Ponta-Direita",     15_000_000, 1, "veterano", "Brasileiro"),
      p("Hulk",              9, "Ponta-Esquerdo",    10_000_000, 1, "veterano", "Brasileiro"),
      p("Eduardo Vargas",    9, "Centroavante",       5_000_000, 2, "joia",     "Chileno"),
      // Reservas
      p("Matheus Mendes",    9, "Goleiro",            1_500_000, 3, "operario", "Brasileiro", true),
      p("Rômulo CAM",        9, "Zaga-1",             2_000_000, 3, "operario", "Brasileiro", true),
      p("Igor Rabello",      9, "Zaga-2",             3_000_000, 3, "operario", "Brasileiro", true),
      p("Mariano",           9, "Lateral-Direito",    2_000_000, 3, "operario", "Brasileiro", true),
      p("Rubens",            9, "Lateral-Esquerdo",   3_000_000, 3, "operario", "Brasileiro", true),
      p("Igor Gomes CAM",    9, "Primeiro-Volante",   4_000_000, 2, "joia",     "Brasileiro", true),
      p("Fausto Vera",       9, "Segundo-Volante",    5_000_000, 2, "joia",     "Argentino",  true),
      p("Matías Zaracho CAM",9, "Meia-Armador",       6_000_000, 2, "joia",     "Argentino",  true),
      p("Alisson CAM",       9, "Ponta-Direita",      3_000_000, 3, "operario", "Brasileiro", true),
      p("Pedrinho CAM",      9, "Ponta-Esquerdo",     4_000_000, 3, "operario", "Brasileiro", true),
      p("Alan Kardec CAM",   9, "Centroavante",       2_500_000, 3, "operario", "Brasileiro", true),
    ]

    // ── 10: CRUZEIRO ─────────────────────────────────────────────────────
    case 10: return [
      p("Cássio",           10, "Goleiro",            3_000_000, 3, "operario", "Brasileiro"),
      p("Zé Ivaldo",        10, "Zaga-1",             4_000_000, 2, "joia",     "Brasileiro"),
      p("João Marcelo",     10, "Zaga-2",             3_000_000, 3, "operario", "Brasileiro"),
      p("William",          10, "Lateral-Direito",    4_000_000, 2, "joia",     "Brasileiro"),
      p("Marlon",           10, "Lateral-Esquerdo",   3_000_000, 3, "operario", "Brasileiro"),
      p("Lucas Romero",     10, "Primeiro-Volante",   5_000_000, 2, "joia",     "Argentino"),
      p("Matheus Henrique", 10, "Segundo-Volante",    6_000_000, 2, "joia",     "Brasileiro"),
      p("Matheus Pereira",  10, "Meia-Armador",      10_000_000, 1, "veterano", "Brasileiro"),
      p("Gabriel Verón",    10, "Ponta-Direita",      6_000_000, 2, "joia",     "Brasileiro"),
      p("Barreal",          10, "Ponta-Esquerdo",     5_000_000, 2, "joia",     "Argentino"),
      p("Dinenno",          10, "Centroavante",       7_000_000, 2, "joia",     "Argentino"),
      // Reservas
      p("Anderson CRU",     10, "Goleiro",            1_000_000, 3, "operario", "Brasileiro", true),
      p("Neris",            10, "Zaga-1",             2_000_000, 3, "operario", "Brasileiro", true),
      p("Villalba",         10, "Zaga-2",             2_000_000, 3, "operario", "Argentino",  true),
      p("Wesley Gasolina",  10, "Lateral-Direito",    2_500_000, 3, "operario", "Brasileiro", true),
      p("Kaiki Bruno",      10, "Lateral-Esquerdo",   1_500_000, 3, "operario", "Brasileiro", true),
      p("Walace CRU",       10, "Primeiro-Volante",   3_000_000, 3, "operario", "Brasileiro", true),
      p("Ramiro CRU",       10, "Segundo-Volante",    2_500_000, 3, "operario", "Brasileiro", true),
      p("Vitinho CRU",      10, "Meia-Armador",       2_000_000, 3, "operario", "Brasileiro", true),
      p("Arthur Gomes CRU", 10, "Ponta-Direita",      2_500_000, 3, "operario", "Brasileiro", true),
      p("Lautaro Díaz",     10, "Ponta-Esquerdo",     3_000_000, 3, "operario", "Argentino",  true),
      p("Rafa Silva CRU",   10, "Centroavante",       3_000_000, 3, "operario", "Brasileiro", true),
    ]

    default: return []
  }
}
