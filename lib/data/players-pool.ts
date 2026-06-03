import type { Player, Position, Nationality, Tier, Category } from "../game-types"

type FreeAgentTemplate = Omit<Player, "id" | "teamId" | "sold" | "activatedFromReserve" | "lostAuction">

function fa(
  name: string,
  position: Position,
  value: number,
  tier: Tier,
  category: Category,
  nationality: Nationality,
  sourceClub?: string,
): FreeAgentTemplate {
  return { name, position, value, tier, category, nationality, isReserva: false, sourceClub }
}

// ─── Pool Sul-Americano (Brasileirão) ─────────────────────────────────────────
// Tier 1 (Veterano de Grife):  20M–25M€
// Tier 2 (Joia Promissora):    13M–19M€
// Tier 3 (Operário):            5M–12M€
// sourceClub é usado para filtrar jogadores cujo clube foi selecionado no jogo.

const TEMPLATES: FreeAgentTemplate[] = [

  // ── GOLEIRO ──────────────────────────────────────────────────────────────
  fa("Alisson Becker",       "Goleiro", 25_000_000, 1, "veterano", "Brasileiro", "Liverpool"),
  fa("Ederson Moraes",       "Goleiro", 24_000_000, 1, "veterano", "Brasileiro", "Manchester City"),
  fa("Emiliano Martínez",    "Goleiro", 23_000_000, 1, "veterano", "Argentino",  "Aston Villa"),
  fa("Diogo Costa",          "Goleiro", 18_000_000, 2, "joia",     "Português",  "FC Porto"),
  fa("Lucas Perri",          "Goleiro", 17_000_000, 2, "joia",     "Brasileiro", "Olympique Lyon"),
  fa("Bento",                "Goleiro", 16_000_000, 2, "joia",     "Brasileiro", "Athletico-PR"),
  fa("Ivan",                 "Goleiro", 14_000_000, 2, "joia",     "Brasileiro", "RB Bragantino"),
  fa("Odysseas Vlachodimos", "Goleiro", 13_000_000, 2, "joia",     "Outro",      "Nottm Forest"),
  fa("Muriel",               "Goleiro",  9_000_000, 3, "operario", "Colombiano", "Atlético Nacional"),
  fa("Kepa Arrizabalaga",    "Goleiro",  8_000_000, 3, "operario", "Espanhol",   "Osasuna"),
  fa("Gabriel Chapecó",      "Goleiro",  7_000_000, 3, "operario", "Brasileiro", "Chapecoense"),
  fa("Guilherme",            "Goleiro",  6_000_000, 3, "operario", "Brasileiro", "LOSC Lille"),
  fa("Renan",                "Goleiro",  5_500_000, 3, "operario", "Brasileiro", "Shakhtar Donetsk"),

  // ── ZAGA-1 ───────────────────────────────────────────────────────────────
  fa("Marquinhos",           "Zaga-1",  25_000_000, 1, "veterano", "Brasileiro", "PSG"),
  fa("Thiago Silva",         "Zaga-1",  22_000_000, 1, "veterano", "Brasileiro", "Fluminense"),
  fa("Militão",              "Zaga-1",  25_000_000, 1, "veterano", "Brasileiro", "Real Madrid"),
  fa("Sebastián Coates",     "Zaga-1",  15_000_000, 2, "joia",     "Uruguaio",   "Sporting CP"),
  fa("Lucas Veríssimo",      "Zaga-1",  17_000_000, 2, "joia",     "Brasileiro", "Benfica"),
  fa("Gabriel Paulista",     "Zaga-1",  13_000_000, 2, "joia",     "Brasileiro", "Valencia"),
  fa("Nino",                 "Zaga-1",  15_000_000, 2, "joia",     "Brasileiro", "Nottm Forest"),
  fa("Luan Peres",           "Zaga-1",  14_000_000, 2, "joia",     "Brasileiro", "Olympique Marseille"),
  fa("Victor Cuesta",        "Zaga-1",   8_000_000, 3, "operario", "Argentino",  "Internacional"),
  fa("Rodrigo Caio",         "Zaga-1",   7_000_000, 3, "operario", "Brasileiro", "Flamengo"),
  fa("Eduardo Brock",        "Zaga-1",   6_000_000, 3, "operario", "Brasileiro", "CF Montréal"),
  fa("Pepe",                 "Zaga-1",   5_000_000, 3, "operario", "Português",  "FC Porto"),
  fa("Ezequiel Garay",       "Zaga-1",   5_000_000, 3, "operario", "Argentino",  "Vélez Sársfield"),

  // ── ZAGA-2 ───────────────────────────────────────────────────────────────
  fa("Bremer",               "Zaga-2",  25_000_000, 1, "veterano", "Brasileiro", "Juventus"),
  fa("Danilo Pereira",       "Zaga-2",  21_000_000, 1, "veterano", "Português",  "PSG"),
  fa("Lisandro Martínez",    "Zaga-2",  24_000_000, 1, "veterano", "Argentino",  "Man. United"),
  fa("Lucas Beraldo",        "Zaga-2",  14_000_000, 2, "joia",     "Brasileiro", "PSG"),
  fa("Gonçalo Inácio",       "Zaga-2",  18_000_000, 2, "joia",     "Português",  "Sporting CP"),
  fa("David Carmo",          "Zaga-2",  14_000_000, 2, "joia",     "Português",  "FC Porto"),
  fa("Murillo",              "Zaga-2",  16_000_000, 2, "joia",     "Brasileiro", "Nottm Forest"),
  fa("Nicolás Hernández",    "Zaga-2",  13_000_000, 2, "joia",     "Colombiano", "Eintracht Frankfurt"),
  fa("Kuscevic",             "Zaga-2",   9_000_000, 3, "operario", "Chileno",    "Basel"),
  fa("Messias",              "Zaga-2",   7_000_000, 3, "operario", "Brasileiro", "Genoa"),
  fa("Paulo Miranda",        "Zaga-2",   5_500_000, 3, "operario", "Brasileiro", "Athletico-PR"),
  fa("Ezequiel Muñoz",       "Zaga-2",   6_000_000, 3, "operario", "Argentino",  "Talleres"),

  // ── LATERAL-DIREITO ───────────────────────────────────────────────────────
  fa("Nélson Semedo",        "Lateral-Direito", 20_000_000, 1, "veterano", "Português",  "Wolverhampton"),
  fa("Vanderson",            "Lateral-Direito", 22_000_000, 1, "veterano", "Brasileiro", "Monaco"),
  fa("Emerson Royal",        "Lateral-Direito", 20_000_000, 1, "veterano", "Brasileiro", "AC Milan"),
  fa("Yan Couto",            "Lateral-Direito", 18_000_000, 2, "joia",     "Brasileiro", "Manchester City"),
  fa("Pedro Pereira",        "Lateral-Direito", 14_000_000, 2, "joia",     "Português",  "Cremonese"),
  fa("Óscar Mingueza",       "Lateral-Direito", 13_000_000, 2, "joia",     "Espanhol",   "Girona"),
  fa("Rafinha",              "Lateral-Direito", 15_000_000, 2, "joia",     "Brasileiro", "São Paulo"),
  fa("Rodinei",              "Lateral-Direito", 13_000_000, 2, "joia",     "Brasileiro", "Flamengo"),
  fa("Jonathan Gomez",       "Lateral-Direito",  9_000_000, 3, "operario", "Uruguaio",   "LAFC"),
  fa("Guga",                 "Lateral-Direito",  7_000_000, 3, "operario", "Brasileiro", "Atlético-MG"),
  fa("Reginaldo",            "Lateral-Direito",  5_000_000, 3, "operario", "Brasileiro", "Fortaleza"),
  fa("Lucas Rosa",           "Lateral-Direito",  5_500_000, 3, "operario", "Brasileiro", "Bahia"),

  // ── LATERAL-ESQUERDO ─────────────────────────────────────────────────────
  fa("Nuno Mendes",          "Lateral-Esquerdo", 21_000_000, 1, "veterano", "Português",  "PSG"),
  fa("Welington",            "Lateral-Esquerdo", 22_000_000, 1, "veterano", "Brasileiro", "Southampton"),
  fa("Alex Grimaldo",        "Lateral-Esquerdo", 21_000_000, 1, "veterano", "Espanhol",   "Bayer Leverkusen"),
  fa("Caio Henrique",        "Lateral-Esquerdo", 17_000_000, 2, "joia",     "Brasileiro", "Monaco"),
  fa("Abner",                "Lateral-Esquerdo", 13_000_000, 2, "joia",     "Brasileiro", "Olympique Lyon"),
  fa("Juan Meneses",         "Lateral-Esquerdo", 13_000_000, 2, "joia",     "Colombiano", "Besiktas"),
  fa("Patrick Dorgu",        "Lateral-Esquerdo", 13_000_000, 2, "joia",     "Outro",      "Napoli"),
  fa("Sergio Reguilon",      "Lateral-Esquerdo",  7_000_000, 3, "operario", "Espanhol",   "Atlético Madrid"),
  fa("Matheus Bahia",        "Lateral-Esquerdo",  6_000_000, 3, "operario", "Brasileiro", "Atromitos"),
  fa("Lucas Esteves",        "Lateral-Esquerdo",  5_000_000, 3, "operario", "Brasileiro", "Guarani"),
  fa("Savio Nsereko",        "Lateral-Esquerdo",  8_000_000, 3, "operario", "Brasileiro", "Vitória"),

  // ── PRIMEIRO-VOLANTE ─────────────────────────────────────────────────────
  fa("Casemiro",             "Primeiro-Volante", 25_000_000, 1, "veterano", "Brasileiro", "Man. United"),
  fa("Rodrigo Bentancur",    "Primeiro-Volante", 22_000_000, 1, "veterano", "Uruguaio",   "Tottenham"),
  fa("Danilo Santos",        "Primeiro-Volante", 21_000_000, 1, "veterano", "Brasileiro", "Juventus"),
  fa("Thiago Maia",          "Primeiro-Volante", 13_000_000, 2, "joia",     "Brasileiro", "LOSC Lille"),
  fa("Matías Vecino",        "Primeiro-Volante", 14_000_000, 2, "joia",     "Uruguaio",   "Lazio"),
  fa("Andrés Cubas",         "Primeiro-Volante", 13_000_000, 2, "joia",     "Paraguaio",  "Nice"),
  fa("Igor Gomes",           "Primeiro-Volante", 16_000_000, 2, "joia",     "Brasileiro", "Atlético-MG"),
  fa("Nico González",        "Primeiro-Volante", 14_000_000, 2, "joia",     "Argentino",  "Barcelona"),
  fa("Walace",               "Primeiro-Volante",  7_000_000, 3, "operario", "Brasileiro", "Hannover 96"),
  fa("Bruno Nazário",        "Primeiro-Volante",  5_500_000, 3, "operario", "Brasileiro", "Fortaleza"),
  fa("Thiago",               "Primeiro-Volante",  8_000_000, 3, "operario", "Brasileiro", "Bahia"),
  fa("Alejandro Pozuelo",    "Primeiro-Volante",  7_000_000, 3, "operario", "Espanhol",   "Inter Miami"),

  // ── SEGUNDO-VOLANTE ───────────────────────────────────────────────────────
  fa("Fabian Ruiz",          "Segundo-Volante", 23_000_000, 1, "veterano", "Espanhol",   "PSG"),
  fa("Renato Augusto",       "Segundo-Volante", 20_000_000, 1, "veterano", "Brasileiro", "Corinthians"),
  fa("Richard Ríos",         "Segundo-Volante", 22_000_000, 1, "veterano", "Colombiano", "Palmeiras"),
  fa("Nico De La Cruz",      "Segundo-Volante", 15_000_000, 2, "joia",     "Uruguaio",   "LA Galaxy"),
  fa("Ángel Di María",       "Segundo-Volante", 13_000_000, 2, "joia",     "Argentino",  "Benfica"),
  fa("Pablo Sarabia",        "Segundo-Volante", 13_000_000, 2, "joia",     "Espanhol",   "Wolverhampton"),
  fa("Mauricio",             "Segundo-Volante", 17_000_000, 2, "joia",     "Brasileiro", "Palmeiras"),
  fa("Pedro Lima",           "Segundo-Volante", 15_000_000, 2, "joia",     "Brasileiro", "Athletico-PR"),
  fa("Guilherme Biro",       "Segundo-Volante",  9_000_000, 3, "operario", "Brasileiro", "Goiás"),
  fa("Edenilson",            "Segundo-Volante",  7_000_000, 3, "operario", "Brasileiro", "Internacional"),
  fa("Ramiro",               "Segundo-Volante",  5_000_000, 3, "operario", "Argentino",  "Boca Juniors"),
  fa("Alan",                 "Segundo-Volante",  6_000_000, 3, "operario", "Brasileiro", "São Paulo"),

  // ── MEIA-ARMADOR ─────────────────────────────────────────────────────────
  fa("João Félix",           "Meia-Armador", 23_000_000, 1, "veterano", "Português",  "Chelsea"),
  fa("Dani Olmo",            "Meia-Armador", 25_000_000, 1, "veterano", "Espanhol",   "Barcelona"),
  fa("Vitinha",              "Meia-Armador", 23_000_000, 1, "veterano", "Português",  "PSG"),
  fa("Julián Álvarez",       "Meia-Armador", 25_000_000, 1, "veterano", "Argentino",  "Atlético Madrid"),
  fa("Gustavo Scarpa",       "Meia-Armador", 18_000_000, 2, "joia",     "Brasileiro", "Nottm Forest"),
  fa("Isco",                 "Meia-Armador", 13_000_000, 2, "joia",     "Espanhol",   "Real Betis"),
  fa("Thiago Almada",        "Meia-Armador", 17_000_000, 2, "joia",     "Argentino",  "Fluminense"),
  fa("Galdames",             "Meia-Armador", 15_000_000, 2, "joia",     "Chileno",    "Vasco"),
  fa("Matías Zaracho",       "Meia-Armador", 14_000_000, 2, "joia",     "Argentino",  "Atlético-MG"),
  fa("Claudinho",            "Meia-Armador",  9_000_000, 3, "operario", "Brasileiro", "Zenit"),
  fa("Michel Araújo",        "Meia-Armador",  7_000_000, 3, "operario", "Uruguaio",   "São Paulo"),
  fa("Hyoran",               "Meia-Armador",  5_500_000, 3, "operario", "Brasileiro", "Athletico-PR"),
  fa("Eduardo Attias",       "Meia-Armador",  6_000_000, 3, "operario", "Argentino",  "Estudiantes"),

  // ── PONTA-DIREITA ────────────────────────────────────────────────────────
  fa("Rodrygo",              "Ponta-Direita", 25_000_000, 1, "veterano", "Brasileiro", "Real Madrid"),
  fa("Bryan Gil",            "Ponta-Direita", 22_000_000, 1, "veterano", "Espanhol",   "Girona"),
  fa("Gelson Martins",       "Ponta-Direita", 20_000_000, 1, "veterano", "Português",  "Monaco"),
  fa("Sávio",                "Ponta-Direita", 18_000_000, 2, "joia",     "Brasileiro", "Manchester City"),
  fa("Ademola Lookman",      "Ponta-Direita", 18_000_000, 2, "joia",     "Africano",   "Atalanta"),
  fa("Pepe",                 "Ponta-Direita", 16_000_000, 2, "joia",     "Brasileiro", "Internacional"),
  fa("Pepê Gonçalves",       "Ponta-Direita", 14_000_000, 2, "joia",     "Brasileiro", "FC Porto"),
  fa("Everton Ribeiro",      "Ponta-Direita", 13_000_000, 2, "joia",     "Brasileiro", "Flamengo"),
  fa("Lucca",                "Ponta-Direita",  9_000_000, 3, "operario", "Brasileiro", "Corinthians"),
  fa("Everton Galdino",      "Ponta-Direita",  7_000_000, 3, "operario", "Brasileiro", "Grêmio"),
  fa("Arthur Gomes",         "Ponta-Direita",  5_500_000, 3, "operario", "Brasileiro", "Cruzeiro"),
  fa("Willian",              "Ponta-Direita",  7_000_000, 3, "operario", "Brasileiro", "Fluminense"),

  // ── PONTA-ESQUERDO ───────────────────────────────────────────────────────
  fa("Vinicius Jr",          "Ponta-Esquerdo", 25_000_000, 1, "veterano", "Brasileiro", "Real Madrid"),
  fa("Raphinha",             "Ponta-Esquerdo", 24_000_000, 1, "veterano", "Brasileiro", "Barcelona"),
  fa("Ángel Correa",         "Ponta-Esquerdo", 20_000_000, 1, "veterano", "Argentino",  "Atlético Madrid"),
  fa("Luis Sinisterra",      "Ponta-Esquerdo", 15_000_000, 2, "joia",     "Colombiano", "Bournemouth"),
  fa("Kaio Jorge",           "Ponta-Esquerdo", 17_000_000, 2, "joia",     "Brasileiro", "Juventus"),
  fa("Nathan",               "Ponta-Esquerdo", 15_000_000, 2, "joia",     "Brasileiro", "Grêmio"),
  fa("Facundo Torres",       "Ponta-Esquerdo", 16_000_000, 2, "joia",     "Uruguaio",   "Palmeiras"),
  fa("Hirving Lozano",       "Ponta-Esquerdo", 13_000_000, 2, "joia",     "Outro",      "PSV Eindhoven"),
  fa("Artur",                "Ponta-Esquerdo",  7_000_000, 3, "operario", "Brasileiro", "Palmeiras"),
  fa("Lázaro",               "Ponta-Esquerdo",  5_500_000, 3, "operario", "Brasileiro", "Palmeiras"),
  fa("Willian José",         "Ponta-Esquerdo",  6_000_000, 3, "operario", "Brasileiro", "Goiás"),
  fa("Sebastián Villa",      "Ponta-Esquerdo",  8_000_000, 3, "operario", "Colombiano", "Boca Juniors"),

  // ── CENTROAVANTE ─────────────────────────────────────────────────────────
  fa("Richarlison",          "Centroavante", 24_000_000, 1, "veterano", "Brasileiro", "Tottenham"),
  fa("Gonçalo Ramos",        "Centroavante", 22_000_000, 1, "veterano", "Português",  "PSG"),
  fa("Julián Álvarez",       "Centroavante", 25_000_000, 1, "veterano", "Argentino",  "Atlético Madrid"),
  fa("Gio Simeone",          "Centroavante", 15_000_000, 2, "joia",     "Argentino",  "Napoli"),
  fa("Lucas Alario",         "Centroavante", 13_000_000, 2, "joia",     "Argentino",  "Eintracht Frankfurt"),
  fa("Óscar Estupiñán",      "Centroavante", 14_000_000, 2, "joia",     "Colombiano", "Brighton"),
  fa("Ben Yedder",           "Centroavante", 12_000_000, 2, "joia",     "Francês",    "Monaco"),
  fa("Esteban Lozano",       "Centroavante", 13_000_000, 2, "joia",     "Colombiano", "América de Cali"),
  fa("Alan Kardec",          "Centroavante",  9_000_000, 3, "operario", "Brasileiro", "Athletico-PR"),
  fa("Furch",                "Centroavante",  8_000_000, 3, "operario", "Argentino",  "Santos"),
  fa("Rafa Silva",           "Centroavante",  6_000_000, 3, "operario", "Brasileiro", "Cruzeiro"),
  fa("Emmanuel Martínez",    "Centroavante",  7_000_000, 3, "operario", "Argentino",  "Racing Club"),
]

// IDs começam em 2000 para não colidir com IDs dos times
export const FREE_AGENTS_POOL: Player[] = TEMPLATES.map((t, i) => ({
  ...t,
  id: 2000 + i,
  teamId: null,
  sold: false,
}))
