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

// ─── Pool Sul-Americano (Brasileirão) ─────────────────────────────────────────
// Tier 1 (Veterano de Grife):  20M–25M€
// Tier 2 (Joia Promissora):    13M–19M€
// Tier 3 (Operário):            5M–12M€
//
// Mix: brasileiros da Europa, sul-americanos, portugueses,
// espanhóis e outros que têm conexão com o futebol brasileiro.

const TEMPLATES: FreeAgentTemplate[] = [

  // ── GOLEIRO ──────────────────────────────────────────────────────────────
  // T1
  fa("Alisson Becker",       "Goleiro", 25_000_000, 1, "veterano", "Brasileiro"),
  fa("Ederson Moraes",       "Goleiro", 24_000_000, 1, "veterano", "Brasileiro"),
  fa("Emiliano Martínez",    "Goleiro", 23_000_000, 1, "veterano", "Argentino"),
  // T2
  fa("Diogo Costa",          "Goleiro", 18_000_000, 2, "joia",     "Português"),
  fa("Lucas Perri",          "Goleiro", 17_000_000, 2, "joia",     "Brasileiro"),
  fa("Bento",                "Goleiro", 16_000_000, 2, "joia",     "Brasileiro"),
  fa("Ivan",                 "Goleiro", 14_000_000, 2, "joia",     "Brasileiro"),
  fa("Odysseas Vlachodimos", "Goleiro", 13_000_000, 2, "joia",     "Outro"),
  // T3
  fa("Muriel",               "Goleiro",  9_000_000, 3, "operario", "Colombiano"),
  fa("Kepa Arrizabalaga",    "Goleiro",  8_000_000, 3, "operario", "Espanhol"),
  fa("Gabriel Chapecó",      "Goleiro",  7_000_000, 3, "operario", "Brasileiro"),
  fa("Guilherme",            "Goleiro",  6_000_000, 3, "operario", "Brasileiro"),
  fa("Renan",                "Goleiro",  5_500_000, 3, "operario", "Brasileiro"),

  // ── ZAGA-1 ───────────────────────────────────────────────────────────────
  // T1
  fa("Marquinhos",           "Zaga-1",  25_000_000, 1, "veterano", "Brasileiro"),
  fa("Thiago Silva",         "Zaga-1",  22_000_000, 1, "veterano", "Brasileiro"),
  fa("Militão",              "Zaga-1",  25_000_000, 1, "veterano", "Brasileiro"),
  // T2
  fa("Sebastián Coates",     "Zaga-1",  15_000_000, 2, "joia",     "Uruguaio"),
  fa("Lucas Veríssimo",      "Zaga-1",  17_000_000, 2, "joia",     "Brasileiro"),
  fa("Gabriel Paulista",     "Zaga-1",  13_000_000, 2, "joia",     "Brasileiro"),
  fa("Nino",                 "Zaga-1",  15_000_000, 2, "joia",     "Brasileiro"),
  fa("Luan Peres",           "Zaga-1",  14_000_000, 2, "joia",     "Brasileiro"),
  // T3
  fa("Victor Cuesta",        "Zaga-1",   8_000_000, 3, "operario", "Argentino"),
  fa("Rodrigo Caio",         "Zaga-1",   7_000_000, 3, "operario", "Brasileiro"),
  fa("Eduardo Brock",        "Zaga-1",   6_000_000, 3, "operario", "Brasileiro"),
  fa("Pepe",                 "Zaga-1",   5_000_000, 3, "operario", "Português"),
  fa("Ezequiel Garay",       "Zaga-1",   5_000_000, 3, "operario", "Argentino"),

  // ── ZAGA-2 ───────────────────────────────────────────────────────────────
  // T1
  fa("Bremer",               "Zaga-2",  25_000_000, 1, "veterano", "Brasileiro"),
  fa("Danilo Pereira",       "Zaga-2",  21_000_000, 1, "veterano", "Português"),
  fa("Lisandro Martínez",    "Zaga-2",  24_000_000, 1, "veterano", "Argentino"),
  // T2
  fa("Lucas Beraldo",        "Zaga-2",  14_000_000, 2, "joia",     "Brasileiro"),
  fa("Gonçalo Inácio",       "Zaga-2",  18_000_000, 2, "joia",     "Português"),
  fa("David Carmo",          "Zaga-2",  14_000_000, 2, "joia",     "Português"),
  fa("Murillo",              "Zaga-2",  16_000_000, 2, "joia",     "Brasileiro"),
  fa("Nicolás Hernández",    "Zaga-2",  13_000_000, 2, "joia",     "Colombiano"),
  // T3
  fa("Kuscevic",             "Zaga-2",   9_000_000, 3, "operario", "Chileno"),
  fa("Messias",              "Zaga-2",   7_000_000, 3, "operario", "Brasileiro"),
  fa("Paulo Miranda",        "Zaga-2",   5_500_000, 3, "operario", "Brasileiro"),
  fa("Ezequiel Muñoz",       "Zaga-2",   6_000_000, 3, "operario", "Argentino"),

  // ── LATERAL-DIREITO ───────────────────────────────────────────────────────
  // T1
  fa("Nélson Semedo",        "Lateral-Direito", 20_000_000, 1, "veterano", "Português"),
  fa("Vanderson",            "Lateral-Direito", 22_000_000, 1, "veterano", "Brasileiro"),
  fa("Emerson Royal",        "Lateral-Direito", 20_000_000, 1, "veterano", "Brasileiro"),
  // T2
  fa("Yan Couto",            "Lateral-Direito", 18_000_000, 2, "joia",     "Brasileiro"),
  fa("Pedro Pereira",        "Lateral-Direito", 14_000_000, 2, "joia",     "Português"),
  fa("Óscar Mingueza",       "Lateral-Direito", 13_000_000, 2, "joia",     "Espanhol"),
  fa("Rafinha",              "Lateral-Direito", 15_000_000, 2, "joia",     "Brasileiro"),
  fa("Rodinei",              "Lateral-Direito", 13_000_000, 2, "joia",     "Brasileiro"),
  // T3
  fa("Jonathan Gomez",       "Lateral-Direito",  9_000_000, 3, "operario", "Uruguaio"),
  fa("Guga",                 "Lateral-Direito",  7_000_000, 3, "operario", "Brasileiro"),
  fa("Reginaldo",            "Lateral-Direito",  5_000_000, 3, "operario", "Brasileiro"),
  fa("Lucas Rosa",           "Lateral-Direito",  5_500_000, 3, "operario", "Brasileiro"),

  // ── LATERAL-ESQUERDO ─────────────────────────────────────────────────────
  // T1
  fa("Nuno Mendes",          "Lateral-Esquerdo", 21_000_000, 1, "veterano", "Português"),
  fa("Welington",            "Lateral-Esquerdo", 22_000_000, 1, "veterano", "Brasileiro"),
  fa("Alex Grimaldo",        "Lateral-Esquerdo", 21_000_000, 1, "veterano", "Espanhol"),
  // T2
  fa("Caio Henrique",        "Lateral-Esquerdo", 17_000_000, 2, "joia",     "Brasileiro"),
  fa("Abner",                "Lateral-Esquerdo", 13_000_000, 2, "joia",     "Brasileiro"),
  fa("Juan Meneses",         "Lateral-Esquerdo", 13_000_000, 2, "joia",     "Colombiano"),
  fa("Patrick Dorgu",        "Lateral-Esquerdo", 13_000_000, 2, "joia",     "Outro"),
  // T3
  fa("Sergio Reguilon",      "Lateral-Esquerdo",  7_000_000, 3, "operario", "Espanhol"),
  fa("Matheus Bahia",        "Lateral-Esquerdo",  6_000_000, 3, "operario", "Brasileiro"),
  fa("Lucas Esteves",        "Lateral-Esquerdo",  5_000_000, 3, "operario", "Brasileiro"),
  fa("Savio Nsereko",        "Lateral-Esquerdo",  8_000_000, 3, "operario", "Brasileiro"),

  // ── PRIMEIRO-VOLANTE ─────────────────────────────────────────────────────
  // T1
  fa("Casemiro",             "Primeiro-Volante", 25_000_000, 1, "veterano", "Brasileiro"),
  fa("Rodrigo Bentancur",    "Primeiro-Volante", 22_000_000, 1, "veterano", "Uruguaio"),
  fa("Danilo",               "Primeiro-Volante", 21_000_000, 1, "veterano", "Brasileiro"),
  // T2
  fa("Thiago Maia",          "Primeiro-Volante", 13_000_000, 2, "joia",     "Brasileiro"),
  fa("Matías Vecino",        "Primeiro-Volante", 14_000_000, 2, "joia",     "Uruguaio"),
  fa("Andrés Cubas",         "Primeiro-Volante", 13_000_000, 2, "joia",     "Paraguaio"),
  fa("Igor Gomes",           "Primeiro-Volante", 16_000_000, 2, "joia",     "Brasileiro"),
  fa("Nico González",        "Primeiro-Volante", 14_000_000, 2, "joia",     "Argentino"),
  // T3
  fa("Walace",               "Primeiro-Volante",  7_000_000, 3, "operario", "Brasileiro"),
  fa("Bruno Nazário",        "Primeiro-Volante",  5_500_000, 3, "operario", "Brasileiro"),
  fa("Thiago",               "Primeiro-Volante",  8_000_000, 3, "operario", "Brasileiro"),
  fa("Alejandro Pozuelo",    "Primeiro-Volante",  7_000_000, 3, "operario", "Espanhol"),

  // ── SEGUNDO-VOLANTE ───────────────────────────────────────────────────────
  // T1
  fa("Fabian Ruiz",          "Segundo-Volante", 23_000_000, 1, "veterano", "Espanhol"),
  fa("Renato Augusto",       "Segundo-Volante", 20_000_000, 1, "veterano", "Brasileiro"),
  fa("Richard Ríos",         "Segundo-Volante", 22_000_000, 1, "veterano", "Colombiano"),
  // T2
  fa("Nico De La Cruz",      "Segundo-Volante", 15_000_000, 2, "joia",     "Uruguaio"),
  fa("Ángel Di María",       "Segundo-Volante", 13_000_000, 2, "joia",     "Argentino"),
  fa("Pablo Sarabia",        "Segundo-Volante", 13_000_000, 2, "joia",     "Espanhol"),
  fa("Mauricio",             "Segundo-Volante", 17_000_000, 2, "joia",     "Brasileiro"),
  fa("Pedro Lima",           "Segundo-Volante", 15_000_000, 2, "joia",     "Brasileiro"),
  // T3
  fa("Guilherme Biro",       "Segundo-Volante",  9_000_000, 3, "operario", "Brasileiro"),
  fa("Edenilson",            "Segundo-Volante",  7_000_000, 3, "operario", "Brasileiro"),
  fa("Ramiro",               "Segundo-Volante",  5_000_000, 3, "operario", "Argentino"),
  fa("Alan",                 "Segundo-Volante",  6_000_000, 3, "operario", "Brasileiro"),

  // ── MEIA-ARMADOR ─────────────────────────────────────────────────────────
  // T1
  fa("João Félix",           "Meia-Armador", 23_000_000, 1, "veterano", "Português"),
  fa("Dani Olmo",            "Meia-Armador", 25_000_000, 1, "veterano", "Espanhol"),
  fa("Vitinha",              "Meia-Armador", 23_000_000, 1, "veterano", "Português"),
  fa("Julián Álvarez",       "Meia-Armador", 25_000_000, 1, "veterano", "Argentino"),
  // T2
  fa("Gustavo Scarpa",       "Meia-Armador", 18_000_000, 2, "joia",     "Brasileiro"),
  fa("Isco",                 "Meia-Armador", 13_000_000, 2, "joia",     "Espanhol"),
  fa("Thiago Almada",        "Meia-Armador", 17_000_000, 2, "joia",     "Argentino"),
  fa("Galdames",             "Meia-Armador", 15_000_000, 2, "joia",     "Chileno"),
  fa("Matías Zaracho",       "Meia-Armador", 14_000_000, 2, "joia",     "Argentino"),
  // T3
  fa("Claudinho",            "Meia-Armador",  9_000_000, 3, "operario", "Brasileiro"),
  fa("Michel Araújo",        "Meia-Armador",  7_000_000, 3, "operario", "Uruguaio"),
  fa("Hyoran",               "Meia-Armador",  5_500_000, 3, "operario", "Brasileiro"),
  fa("Eduardo Attias",       "Meia-Armador",  6_000_000, 3, "operario", "Argentino"),

  // ── PONTA-DIREITA ────────────────────────────────────────────────────────
  // T1
  fa("Rodrygo",              "Ponta-Direita", 25_000_000, 1, "veterano", "Brasileiro"),
  fa("Bryan Gil",            "Ponta-Direita", 22_000_000, 1, "veterano", "Espanhol"),
  fa("Gelson Martins",       "Ponta-Direita", 20_000_000, 1, "veterano", "Português"),
  // T2
  fa("Sávio",                "Ponta-Direita", 18_000_000, 2, "joia",     "Brasileiro"),
  fa("Ademola Lookman",      "Ponta-Direita", 18_000_000, 2, "joia",     "Africano"),
  fa("Pepe",                 "Ponta-Direita", 16_000_000, 2, "joia",     "Brasileiro"),
  fa("Pepê Gonçalves",       "Ponta-Direita", 14_000_000, 2, "joia",     "Brasileiro"),
  fa("Yerlan Adesadze",      "Ponta-Direita", 13_000_000, 2, "joia",     "Africano"),
  // T3
  fa("Lucca",                "Ponta-Direita",  9_000_000, 3, "operario", "Brasileiro"),
  fa("Everton Galdino",      "Ponta-Direita",  7_000_000, 3, "operario", "Brasileiro"),
  fa("Arthur Gomes",         "Ponta-Direita",  5_500_000, 3, "operario", "Brasileiro"),
  fa("Willian",              "Ponta-Direita",  7_000_000, 3, "operario", "Brasileiro"),

  // ── PONTA-ESQUERDO ───────────────────────────────────────────────────────
  // T1
  fa("Vinicius Jr",          "Ponta-Esquerdo", 25_000_000, 1, "veterano", "Brasileiro"),
  fa("Raphinha",             "Ponta-Esquerdo", 24_000_000, 1, "veterano", "Brasileiro"),
  fa("Ángel Correa",         "Ponta-Esquerdo", 20_000_000, 1, "veterano", "Argentino"),
  // T2
  fa("Luis Sinisterra",      "Ponta-Esquerdo", 15_000_000, 2, "joia",     "Colombiano"),
  fa("Kaio Jorge",           "Ponta-Esquerdo", 17_000_000, 2, "joia",     "Brasileiro"),
  fa("Nathan",               "Ponta-Esquerdo", 15_000_000, 2, "joia",     "Brasileiro"),
  fa("Facundo Torres",       "Ponta-Esquerdo", 16_000_000, 2, "joia",     "Uruguaio"),
  fa("Hirving Lozano",       "Ponta-Esquerdo", 13_000_000, 2, "joia",     "Outro"),
  // T3
  fa("Artur",                "Ponta-Esquerdo",  7_000_000, 3, "operario", "Brasileiro"),
  fa("Lázaro",               "Ponta-Esquerdo",  5_500_000, 3, "operario", "Brasileiro"),
  fa("Willian José",         "Ponta-Esquerdo",  6_000_000, 3, "operario", "Brasileiro"),
  fa("Sebastián Villa",      "Ponta-Esquerdo",  8_000_000, 3, "operario", "Colombiano"),

  // ── CENTROAVANTE ─────────────────────────────────────────────────────────
  // T1
  fa("Richarlison",          "Centroavante", 24_000_000, 1, "veterano", "Brasileiro"),
  fa("Gonçalo Ramos",        "Centroavante", 22_000_000, 1, "veterano", "Português"),
  fa("Julián Álvarez",       "Centroavante", 25_000_000, 1, "veterano", "Argentino"),
  // T2
  fa("Gio Simeone",          "Centroavante", 15_000_000, 2, "joia",     "Argentino"),
  fa("Lucas Alario",         "Centroavante", 13_000_000, 2, "joia",     "Argentino"),
  fa("Óscar Estupiñán",      "Centroavante", 14_000_000, 2, "joia",     "Colombiano"),
  fa("Ben Yedder",           "Centroavante", 12_000_000, 2, "joia",     "Francês"),
  fa("Esteban Lozano",       "Centroavante", 13_000_000, 2, "joia",     "Colombiano"),
  // T3
  fa("Alan Kardec",          "Centroavante",  9_000_000, 3, "operario", "Brasileiro"),
  fa("Furch",                "Centroavante",  8_000_000, 3, "operario", "Argentino"),
  fa("Rafa Silva",           "Centroavante",  6_000_000, 3, "operario", "Brasileiro"),
  fa("Emmanuel Martínez",    "Centroavante",  7_000_000, 3, "operario", "Argentino"),
]

// IDs começam em 2000 para não colidir com IDs dos times
export const FREE_AGENTS_POOL: Player[] = TEMPLATES.map((t, i) => ({
  ...t,
  id: 2000 + i,
  teamId: null,
  sold: false,
}))
