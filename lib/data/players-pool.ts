import type { Player, Position, Nationality, Tier, Category } from "../game-types"

type FreeAgentTemplate = Omit<Player, "id" | "teamId" | "sold" | "activatedFromReserve" | "lostAuction">

function fa(
  name: string,
  position: Position,
  value: number,
  tier: Tier,
  category: Category,
  nationality: Nationality,
): FreeAgentTemplate {
  return { name, position, value, tier, category, nationality, isReserva: false }
}

// ─── Free Agent Pool ─────────────────────────────────────────────────────────
// Tier 1 (Veterano de Grife):  20M–25M€
// Tier 2 (Joia Promissora):    13M–19M€
// Tier 3 (Operário):            5M–12M€
// Each position has at least 3 players per tier for variety without repeats.

const TEMPLATES: FreeAgentTemplate[] = [
  // ── GOLEIRO ──────────────────────────────────────────────────────────────
  fa("Alisson Becker",       "Goleiro", 25_000_000, 1, "veterano", "Brasileiro"),
  fa("Ederson Moraes",       "Goleiro", 24_000_000, 1, "veterano", "Brasileiro"),
  fa("Emiliano Martínez",    "Goleiro", 23_000_000, 1, "veterano", "Argentino"),
  fa("Lucas Perri",          "Goleiro", 17_000_000, 2, "joia",     "Brasileiro"),
  fa("Bento Krepski",        "Goleiro", 16_000_000, 2, "joia",     "Brasileiro"),
  fa("Ivan Lucena",          "Goleiro", 14_000_000, 2, "joia",     "Brasileiro"),
  fa("Muriel",               "Goleiro",  9_000_000, 3, "operario", "Colombiano"),
  fa("Gabriel Chapecó",      "Goleiro",  7_000_000, 3, "operario", "Brasileiro"),
  fa("Renan",                "Goleiro",  5_500_000, 3, "operario", "Brasileiro"),

  // ── ZAGA-1 ───────────────────────────────────────────────────────────────
  fa("Marquinhos",           "Zaga-1",  25_000_000, 1, "veterano", "Brasileiro"),
  fa("Thiago Silva",         "Zaga-1",  22_000_000, 1, "veterano", "Brasileiro"),
  fa("Militão",              "Zaga-1",  25_000_000, 1, "veterano", "Brasileiro"),
  fa("Lucas Verissimo",      "Zaga-1",  17_000_000, 2, "joia",     "Brasileiro"),
  fa("Nino",                 "Zaga-1",  15_000_000, 2, "joia",     "Brasileiro"),
  fa("Luan Peres",           "Zaga-1",  14_000_000, 2, "joia",     "Brasileiro"),
  fa("Victor Cuesta",        "Zaga-1",   8_000_000, 3, "operario", "Argentino"),
  fa("Rodrigo Caio",         "Zaga-1",   7_000_000, 3, "operario", "Brasileiro"),
  fa("Eduardo Brock",        "Zaga-1",   6_000_000, 3, "operario", "Brasileiro"),

  // ── ZAGA-2 ───────────────────────────────────────────────────────────────
  fa("Bremer",               "Zaga-2",  25_000_000, 1, "veterano", "Brasileiro"),
  fa("Danilo Pereira",       "Zaga-2",  21_000_000, 1, "veterano", "Português"),
  fa("Lisandro Martínez",    "Zaga-2",  24_000_000, 1, "veterano", "Argentino"),
  fa("Gonçalo Inácio",       "Zaga-2",  18_000_000, 2, "joia",     "Português"),
  fa("Murillo",              "Zaga-2",  16_000_000, 2, "joia",     "Brasileiro"),
  fa("Domingos Quina",       "Zaga-2",  13_000_000, 2, "joia",     "Português"),
  fa("Kuscevic",             "Zaga-2",   9_000_000, 3, "operario", "Chileno"),
  fa("Messias",              "Zaga-2",   7_000_000, 3, "operario", "Brasileiro"),
  fa("Paulo Miranda",        "Zaga-2",   5_500_000, 3, "operario", "Brasileiro"),

  // ── LATERAL-DIREITO ───────────────────────────────────────────────────────
  fa("Nélson Semedo",        "Lateral-Direito", 20_000_000, 1, "veterano", "Português"),
  fa("Vanderson",            "Lateral-Direito", 22_000_000, 1, "veterano", "Brasileiro"),
  fa("Guilherme Arana",      "Lateral-Direito", 20_000_000, 1, "veterano", "Brasileiro"),
  fa("Yan Couto",            "Lateral-Direito", 18_000_000, 2, "joia",     "Brasileiro"),
  fa("Rafinha",              "Lateral-Direito", 15_000_000, 2, "joia",     "Brasileiro"),
  fa("Rodinei",              "Lateral-Direito", 13_000_000, 2, "joia",     "Brasileiro"),
  fa("Jonathan Gomez",       "Lateral-Direito",  9_000_000, 3, "operario", "Uruguaio"),
  fa("Guga",                 "Lateral-Direito",  7_000_000, 3, "operario", "Brasileiro"),
  fa("Reginaldo",            "Lateral-Direito",  5_000_000, 3, "operario", "Brasileiro"),

  // ── LATERAL-ESQUERDO ─────────────────────────────────────────────────────
  fa("Alex Grimaldo",        "Lateral-Esquerdo", 21_000_000, 1, "veterano", "Espanhol"),
  fa("Guilherme Arana LE",   "Lateral-Esquerdo", 20_000_000, 1, "veterano", "Brasileiro"),
  fa("Wendelsson",           "Lateral-Esquerdo", 22_000_000, 1, "veterano", "Brasileiro"),
  fa("Caio Henrique",        "Lateral-Esquerdo", 17_000_000, 2, "joia",     "Brasileiro"),
  fa("Reinier",              "Lateral-Esquerdo", 14_000_000, 2, "joia",     "Brasileiro"),
  fa("Juan Meneses",         "Lateral-Esquerdo", 13_000_000, 2, "joia",     "Colombiano"),
  fa("Sávio Nsereko",        "Lateral-Esquerdo",  8_000_000, 3, "operario", "Brasileiro"),
  fa("Matheus Bahia",        "Lateral-Esquerdo",  6_000_000, 3, "operario", "Brasileiro"),
  fa("Lucas Esteves",        "Lateral-Esquerdo",  5_000_000, 3, "operario", "Brasileiro"),

  // ── PRIMEIRO-VOLANTE ─────────────────────────────────────────────────────
  fa("Casemiro",             "Primeiro-Volante", 25_000_000, 1, "veterano", "Brasileiro"),
  fa("Rodrigo Bentancur",    "Primeiro-Volante", 22_000_000, 1, "veterano", "Uruguaio"),
  fa("Danilo",               "Primeiro-Volante", 21_000_000, 1, "veterano", "Brasileiro"),
  fa("Igor Gomes",           "Primeiro-Volante", 16_000_000, 2, "joia",     "Brasileiro"),
  fa("Pablo Maia",           "Primeiro-Volante", 14_000_000, 2, "joia",     "Brasileiro"),
  fa("Andrés Cubas",         "Primeiro-Volante", 13_000_000, 2, "joia",     "Paraguaio"),
  fa("Thiago",               "Primeiro-Volante",  8_000_000, 3, "operario", "Brasileiro"),
  fa("Walace",               "Primeiro-Volante",  7_000_000, 3, "operario", "Brasileiro"),
  fa("Bruno Nazário",        "Primeiro-Volante",  5_500_000, 3, "operario", "Brasileiro"),

  // ── SEGUNDO-VOLANTE ───────────────────────────────────────────────────────
  fa("Fabian Ruiz",          "Segundo-Volante", 23_000_000, 1, "veterano", "Espanhol"),
  fa("Renato Augusto",       "Segundo-Volante", 20_000_000, 1, "veterano", "Brasileiro"),
  fa("Richard Ríos",         "Segundo-Volante", 22_000_000, 1, "veterano", "Colombiano"),
  fa("Mauricio",             "Segundo-Volante", 17_000_000, 2, "joia",     "Brasileiro"),
  fa("Pedro Lima",           "Segundo-Volante", 15_000_000, 2, "joia",     "Brasileiro"),
  fa("Rodrigo Nestor",       "Segundo-Volante", 13_000_000, 2, "joia",     "Brasileiro"),
  fa("Guilherme Biro",       "Segundo-Volante",  9_000_000, 3, "operario", "Brasileiro"),
  fa("Edenilson",            "Segundo-Volante",  7_000_000, 3, "operario", "Brasileiro"),
  fa("Ramiro",               "Segundo-Volante",  5_000_000, 3, "operario", "Brasileiro"),

  // ── MEIA-ARMADOR ─────────────────────────────────────────────────────────
  fa("Dani Olmo",            "Meia-Armador", 25_000_000, 1, "veterano", "Espanhol"),
  fa("Vitinha",              "Meia-Armador", 23_000_000, 1, "veterano", "Português"),
  fa("Julián Álvarez",       "Meia-Armador", 25_000_000, 1, "veterano", "Argentino"),
  fa("Gustavo Scarpa",       "Meia-Armador", 18_000_000, 2, "joia",     "Brasileiro"),
  fa("Galdames",             "Meia-Armador", 15_000_000, 2, "joia",     "Chileno"),
  fa("Matías Zaracho",       "Meia-Armador", 14_000_000, 2, "joia",     "Argentino"),
  fa("Claudinho",            "Meia-Armador",  9_000_000, 3, "operario", "Brasileiro"),
  fa("Michel Araújo",        "Meia-Armador",  7_000_000, 3, "operario", "Uruguaio"),
  fa("Hyoran",               "Meia-Armador",  5_500_000, 3, "operario", "Brasileiro"),

  // ── PONTA-DIREITA ────────────────────────────────────────────────────────
  fa("Rodrygo",              "Ponta-Direita", 25_000_000, 1, "veterano", "Brasileiro"),
  fa("Bryan Gil",            "Ponta-Direita", 22_000_000, 1, "veterano", "Espanhol"),
  fa("John Arias",           "Ponta-Direita", 20_000_000, 1, "veterano", "Colombiano"),
  fa("Sávio",                "Ponta-Direita", 18_000_000, 2, "joia",     "Brasileiro"),
  fa("Pepe",                 "Ponta-Direita", 16_000_000, 2, "joia",     "Brasileiro"),
  fa("Pepê Gonçalves",       "Ponta-Direita", 14_000_000, 2, "joia",     "Brasileiro"),
  fa("Lucca",                "Ponta-Direita",  9_000_000, 3, "operario", "Brasileiro"),
  fa("Everton Galdino",      "Ponta-Direita",  7_000_000, 3, "operario", "Brasileiro"),
  fa("Arthur Gomes",         "Ponta-Direita",  5_500_000, 3, "operario", "Brasileiro"),

  // ── PONTA-ESQUERDO ───────────────────────────────────────────────────────
  fa("Nico Williams",        "Ponta-Esquerdo", 25_000_000, 1, "veterano", "Espanhol"),
  fa("Vinicius Jr",          "Ponta-Esquerdo", 25_000_000, 1, "veterano", "Brasileiro"),
  fa("Raphinha",             "Ponta-Esquerdo", 24_000_000, 1, "veterano", "Brasileiro"),
  fa("Kaio Jorge",           "Ponta-Esquerdo", 17_000_000, 2, "joia",     "Brasileiro"),
  fa("Nathan",               "Ponta-Esquerdo", 15_000_000, 2, "joia",     "Brasileiro"),
  fa("Facundo Torres",       "Ponta-Esquerdo", 16_000_000, 2, "joia",     "Uruguaio"),
  fa("Rony",                 "Ponta-Esquerdo",  9_000_000, 3, "operario", "Brasileiro"),
  fa("Artur",                "Ponta-Esquerdo",  7_000_000, 3, "operario", "Brasileiro"),
  fa("Lázaro",               "Ponta-Esquerdo",  5_500_000, 3, "operario", "Brasileiro"),

  // ── CENTROAVANTE ─────────────────────────────────────────────────────────
  fa("Julián Álvarez CF",    "Centroavante", 25_000_000, 1, "veterano", "Argentino"),
  fa("Richarlison",          "Centroavante", 24_000_000, 1, "veterano", "Brasileiro"),
  fa("Gonçalo Ramos",        "Centroavante", 22_000_000, 1, "veterano", "Português"),
  fa("Kaio Henrique",        "Centroavante", 18_000_000, 2, "joia",     "Brasileiro"),
  fa("Thiago Almada",        "Centroavante", 17_000_000, 2, "joia",     "Argentino"),
  fa("Erick Pulgar",         "Centroavante", 14_000_000, 2, "joia",     "Chileno"),
  fa("Alan Kardec",          "Centroavante",  9_000_000, 3, "operario", "Brasileiro"),
  fa("Furch",                "Centroavante",  8_000_000, 3, "operario", "Argentino"),
  fa("Rafa Silva",           "Centroavante",  6_000_000, 3, "operario", "Brasileiro"),
]

// Assign sequential IDs starting at 2000 to avoid conflicts with team player IDs
export const FREE_AGENTS_POOL: Player[] = TEMPLATES.map((t, i) => ({
  ...t,
  id: 2000 + i,
  teamId: null,
  sold: false,
}))

// For duplicate name "Guilherme Arana LE" and "Julián Álvarez CF", give clean display names
export function getPlayerDisplayName(player: Player): string {
  return player.name.replace(/ LE$/, "").replace(/ CF$/, "")
}
