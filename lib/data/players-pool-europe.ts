import type { Player, Position, Nationality, Tier, Category } from "../game-types"

type FreeAgentTemplate = Omit<Player, "id" | "teamId" | "sold" | "activatedFromReserve" | "lostAuction">

function fa(
  name: string,
  position: Position,
  value: number,
  tier: Tier,
  category: Category,
  nationality: Nationality,
  sourceClub: string,
): FreeAgentTemplate {
  return { name, position, value, tier, category, nationality, isReserva: false, sourceClub }
}

// ─── European Free Agent Pool ─────────────────────────────────────────────────
// Jogadores de todas as grandes ligas europeias.
// sourceClub é usado para filtrar jogadores cujo time foi selecionado no jogo.
//
// Tier 1 (Veterano / Estrela):  35–50M€
// Tier 2 (Joia Promissora):     20–32M€
// Tier 3 (Operário / Custo-benefício): 10–18M€
//
// Ligas representadas: Premier League (não selecionados), La Liga, Bundesliga,
// Serie A, Ligue 1, Eredivisie, Liga Portugal, Segunda divisão europeia.

const TEMPLATES: FreeAgentTemplate[] = [

  // ══════════════════════════════════════════════════════════════════════════
  // GOLEIRO
  // ══════════════════════════════════════════════════════════════════════════
  // T1
  fa("Thibaut Courtois",   "Goleiro", 45_000_000, 1, "veterano", "Belga",    "Real Madrid"),
  fa("Ter Stegen",         "Goleiro", 40_000_000, 1, "veterano", "Alemão",   "Barcelona"),
  fa("Mike Maignan",       "Goleiro", 38_000_000, 1, "veterano", "Francês",  "AC Milan"),
  fa("Yann Sommer",        "Goleiro", 36_000_000, 1, "veterano", "Outro",    "Inter Milan"),
  // T2
  fa("Gregor Kobel",       "Goleiro", 28_000_000, 2, "joia",     "Alemão",   "Borussia Dortmund"),
  fa("Gianluigi Donnarumma","Goleiro",30_000_000, 2, "joia",     "Italiano", "PSG"),
  fa("Andriy Lunin",       "Goleiro", 24_000_000, 2, "joia",     "Outro",    "Real Madrid"),
  fa("Unai Simon",         "Goleiro", 22_000_000, 2, "joia",     "Espanhol", "Athletic Bilbao"),
  fa("Jordan Pickford",    "Goleiro", 22_000_000, 2, "joia",     "Inglês",   "Everton"),
  fa("Lukáš Hrádecký",    "Goleiro", 20_000_000, 2, "joia",     "Outro",    "Bayer Leverkusen"),
  // T3
  fa("Brice Samba",        "Goleiro", 14_000_000, 3, "operario", "Africano", "RC Lens"),
  fa("Jose Sa",            "Goleiro", 12_000_000, 3, "operario", "Português","Wolverhampton"),
  fa("Odysseas Vlachodimos","Goleiro", 12_000_000, 3, "operario", "Outro",   "Nottm Forest"),
  fa("Gavin Bazunu",       "Goleiro", 10_000_000, 3, "operario", "Outro",    "Southampton"),
  fa("Oliver Baumann",     "Goleiro", 10_000_000, 3, "operario", "Alemão",   "TSG Hoffenheim"),

  // ══════════════════════════════════════════════════════════════════════════
  // ZAGA-1
  // ══════════════════════════════════════════════════════════════════════════
  // T1
  fa("Virgil van Dijk",    "Zaga-1",  50_000_000, 1, "veterano", "Holandês", "Liverpool"),
  fa("William Saliba",     "Zaga-1",  48_000_000, 1, "veterano", "Francês",  "Arsenal"),
  fa("Aymeric Laporte",    "Zaga-1",  42_000_000, 1, "veterano", "Espanhol", "Al-Nassr"),
  fa("Dayot Upamecano",    "Zaga-1",  40_000_000, 1, "veterano", "Francês",  "Bayern Munich"),
  fa("Alessandro Bastoni", "Zaga-1",  45_000_000, 1, "veterano", "Italiano", "Inter Milan"),
  // T2
  fa("Ezri Konsa",         "Zaga-1",  28_000_000, 2, "joia",     "Inglês",   "Aston Villa"),
  fa("Levi Colwill",       "Zaga-1",  30_000_000, 2, "joia",     "Inglês",   "Chelsea"),
  fa("Jonathan Tah",       "Zaga-1",  26_000_000, 2, "joia",     "Alemão",   "Bayer Leverkusen"),
  fa("Perr Schuurs",       "Zaga-1",  24_000_000, 2, "joia",     "Holandês", "Torino"),
  fa("Dean Huijsen",       "Zaga-1",  22_000_000, 2, "joia",     "Espanhol", "Roma"),
  fa("Willian Pacho",      "Zaga-1",  24_000_000, 2, "joia",     "Colombiano","Eintracht Frankfurt"),
  // T3
  fa("Marc Guehi",         "Zaga-1",  16_000_000, 3, "operario", "Inglês",   "Crystal Palace"),
  fa("Ben Mee",            "Zaga-1",  12_000_000, 3, "operario", "Inglês",   "Brentford"),
  fa("Andreas Christensen","Zaga-1",  14_000_000, 3, "operario", "Outro",    "Barcelona"),
  fa("Daniele Rugani",     "Zaga-1",  10_000_000, 3, "operario", "Italiano", "Juventus"),
  fa("Maxime Le Marchand", "Zaga-1",  10_000_000, 3, "operario", "Francês",  "Nice"),

  // ══════════════════════════════════════════════════════════════════════════
  // ZAGA-2
  // ══════════════════════════════════════════════════════════════════════════
  // T1
  fa("Cristian Romero",    "Zaga-2",  46_000_000, 1, "veterano", "Argentino","Tottenham"),
  fa("Micky van de Ven",   "Zaga-2",  42_000_000, 1, "veterano", "Holandês", "Tottenham"),
  fa("Marquinhos",         "Zaga-2",  46_000_000, 1, "veterano", "Brasileiro","PSG"),
  fa("Matthijs de Ligt",   "Zaga-2",  44_000_000, 1, "veterano", "Holandês", "Bayern Munich"),
  fa("Ronald Araújo",      "Zaga-2",  45_000_000, 1, "veterano", "Uruguaio", "Barcelona"),
  // T2
  fa("Pau Torres",         "Zaga-2",  28_000_000, 2, "joia",     "Espanhol", "Aston Villa"),
  fa("Jarrad Branthwaite", "Zaga-2",  30_000_000, 2, "joia",     "Inglês",   "Everton"),
  fa("Nico Schlotterbeck", "Zaga-2",  26_000_000, 2, "joia",     "Alemão",   "Borussia Dortmund"),
  fa("Giorgio Scalvini",   "Zaga-2",  24_000_000, 2, "joia",     "Italiano", "Atalanta"),
  fa("Hugo Guillamón",     "Zaga-2",  20_000_000, 2, "joia",     "Espanhol", "Valencia"),
  // T3
  fa("Adam Webster",       "Zaga-2",  14_000_000, 3, "operario", "Inglês",   "Brighton"),
  fa("Lewis Dunk",         "Zaga-2",  12_000_000, 3, "operario", "Inglês",   "Brighton"),
  fa("Joachim Andersen",   "Zaga-2",  14_000_000, 3, "operario", "Outro",    "Crystal Palace"),
  fa("Sven Botman",        "Zaga-2",  16_000_000, 3, "operario", "Holandês", "Newcastle"),
  fa("Leo Dubois",         "Zaga-2",  10_000_000, 3, "operario", "Francês",  "Lyon"),

  // ══════════════════════════════════════════════════════════════════════════
  // LATERAL-DIREITO
  // ══════════════════════════════════════════════════════════════════════════
  // T1
  fa("Trent Alexander-Arnold","Lateral-Direito",50_000_000,1,"veterano","Inglês","Liverpool"),
  fa("Reece James",        "Lateral-Direito", 42_000_000, 1, "veterano", "Inglês",   "Chelsea"),
  fa("Dani Carvajal",      "Lateral-Direito", 40_000_000, 1, "veterano", "Espanhol", "Real Madrid"),
  fa("Achraf Hakimi",      "Lateral-Direito", 44_000_000, 1, "veterano", "Africano", "PSG"),
  // T2
  fa("Pedro Porro",        "Lateral-Direito", 28_000_000, 2, "joia",     "Espanhol", "Tottenham"),
  fa("Matty Cash",         "Lateral-Direito", 22_000_000, 2, "joia",     "Inglês",   "Aston Villa"),
  fa("Denzel Dumfries",    "Lateral-Direito", 26_000_000, 2, "joia",     "Holandês", "Inter Milan"),
  fa("Noussair Mazraoui",  "Lateral-Direito", 24_000_000, 2, "joia",     "Africano", "Bayern Munich"),
  fa("Thomas Meunier",     "Lateral-Direito", 20_000_000, 2, "joia",     "Belga",    "Trabzonspor"),
  fa("Hamari Traoré",      "Lateral-Direito", 20_000_000, 2, "joia",     "Africano", "Rennes"),
  // T3
  fa("Tariq Lamptey",      "Lateral-Direito", 14_000_000, 3, "operario", "Inglês",   "Brighton"),
  fa("Aaron Wan-Bissaka",  "Lateral-Direito", 12_000_000, 3, "operario", "Inglês",   "Man. United"),
  fa("Guillermo Maripán",  "Lateral-Direito", 10_000_000, 3, "operario", "Chileno",  "Monaco"),
  fa("Diogo Dalot",        "Lateral-Direito", 14_000_000, 3, "operario", "Português","Man. United"),
  fa("Manu Garcia",        "Lateral-Direito", 10_000_000, 3, "operario", "Espanhol", "Almería"),

  // ══════════════════════════════════════════════════════════════════════════
  // LATERAL-ESQUERDO
  // ══════════════════════════════════════════════════════════════════════════
  // T1
  fa("Andrew Robertson",   "Lateral-Esquerdo",38_000_000,1,"veterano","Outro",    "Liverpool"),
  fa("Theo Hernández",     "Lateral-Esquerdo",42_000_000,1,"veterano","Francês",  "AC Milan"),
  fa("Ferland Mendy",      "Lateral-Esquerdo",36_000_000,1,"veterano","Francês",  "Real Madrid"),
  fa("Alphonso Davies",    "Lateral-Esquerdo",40_000_000,1,"veterano","Africano", "Bayern Munich"),
  // T2
  fa("Destiny Udogie",     "Lateral-Esquerdo",28_000_000,2,"joia",    "Italiano", "Tottenham"),
  fa("Pervis Estupinan",   "Lateral-Esquerdo",24_000_000,2,"joia",    "Colombiano","Brighton"),
  fa("Mitchel Bakker",     "Lateral-Esquerdo",20_000_000,2,"joia",    "Holandês", "Bayer Leverkusen"),
  fa("Alejandro Balde",    "Lateral-Esquerdo",26_000_000,2,"joia",    "Espanhol", "Barcelona"),
  fa("Lucas Hernández",    "Lateral-Esquerdo",22_000_000,2,"joia",    "Francês",  "PSG"),
  fa("Robin Gosens",       "Lateral-Esquerdo",20_000_000,2,"joia",    "Alemão",   "Inter Milan"),
  // T3
  fa("Ben Chilwell",       "Lateral-Esquerdo",14_000_000,3,"operario","Inglês",   "Chelsea"),
  fa("Marc Cucurella",     "Lateral-Esquerdo",16_000_000,3,"operario","Espanhol", "Chelsea"),
  fa("Sergio Reguilon",    "Lateral-Esquerdo",12_000_000,3,"operario","Espanhol", "Atlético Madrid"),
  fa("Daley Blind",        "Lateral-Esquerdo",10_000_000,3,"operario","Holandês", "Girona"),
  fa("Romain Perraud",     "Lateral-Esquerdo",10_000_000,3,"operario","Francês",  "Stade Brest"),

  // ══════════════════════════════════════════════════════════════════════════
  // PRIMEIRO-VOLANTE
  // ══════════════════════════════════════════════════════════════════════════
  // T1
  fa("Rodri",              "Primeiro-Volante",50_000_000,1,"veterano","Espanhol", "Manchester City"),
  fa("Declan Rice",        "Primeiro-Volante",48_000_000,1,"veterano","Inglês",   "Arsenal"),
  fa("Aurélien Tchouaméni","Primeiro-Volante",44_000_000,1,"veterano","Francês",  "Real Madrid"),
  fa("Casemiro",           "Primeiro-Volante",38_000_000,1,"veterano","Brasileiro","Man. United"),
  // T2
  fa("Yves Bissouma",      "Primeiro-Volante",22_000_000,2,"joia",    "Africano", "Tottenham"),
  fa("Carlos Baleba",      "Primeiro-Volante",24_000_000,2,"joia",    "Africano", "Brighton"),
  fa("Granit Xhaka",       "Primeiro-Volante",22_000_000,2,"joia",    "Outro",    "Bayer Leverkusen"),
  fa("Mattéo Guendouzi",   "Primeiro-Volante",22_000_000,2,"joia",    "Francês",  "Lazio"),
  fa("Idrissa Gueye",      "Primeiro-Volante",20_000_000,2,"joia",    "Africano", "Everton"),
  fa("Piotr Zielinski",    "Primeiro-Volante",20_000_000,2,"joia",    "Outro",    "Inter Milan"),
  // T3
  fa("James Ward-Prowse",  "Primeiro-Volante",14_000_000,3,"operario","Inglês",   "West Ham"),
  fa("Kalvin Phillips",    "Primeiro-Volante",12_000_000,3,"operario","Inglês",   "Manchester City"),
  fa("Wilfred Ndidi",      "Primeiro-Volante",10_000_000,3,"operario","Africano", "Leicester City"),
  fa("Blaise Matuidi",     "Primeiro-Volante",10_000_000,3,"operario","Francês",  "Aposentado"),
  fa("Sander Berge",       "Primeiro-Volante",12_000_000,3,"operario","Outro",    "Burnley"),

  // ══════════════════════════════════════════════════════════════════════════
  // SEGUNDO-VOLANTE
  // ══════════════════════════════════════════════════════════════════════════
  // T1
  fa("Kevin De Bruyne",    "Segundo-Volante", 48_000_000,1,"veterano","Belga",    "Manchester City"),
  fa("Luka Modric",        "Segundo-Volante", 38_000_000,1,"veterano","Outro",    "Real Madrid"),
  fa("Pedri",              "Segundo-Volante", 46_000_000,1,"veterano","Espanhol", "Barcelona"),
  fa("Jude Bellingham",    "Segundo-Volante", 50_000_000,1,"veterano","Inglês",   "Real Madrid"),
  // T2
  fa("Dominik Szoboszlai", "Segundo-Volante", 28_000_000,2,"joia",    "Outro",    "Liverpool"),
  fa("Leon Goretzka",      "Segundo-Volante", 26_000_000,2,"joia",    "Alemão",   "Bayern Munich"),
  fa("Joshua Kimmich",     "Segundo-Volante", 32_000_000,2,"joia",    "Alemão",   "Bayern Munich"),
  fa("Marcel Sabitzer",    "Segundo-Volante", 22_000_000,2,"joia",    "Outro",    "Borussia Dortmund"),
  fa("Lucas Torreira",     "Segundo-Volante", 20_000_000,2,"joia",    "Uruguaio", "Galatasaray"),
  fa("Sofyan Amrabat",     "Segundo-Volante", 20_000_000,2,"joia",    "Africano", "Fiorentina"),
  // T3
  fa("Pascal Gross",       "Segundo-Volante", 14_000_000,3,"operario","Alemão",   "Brighton"),
  fa("James Maddison",     "Segundo-Volante", 14_000_000,3,"operario","Inglês",   "Tottenham"),
  fa("Cheick Doucoure",    "Segundo-Volante", 12_000_000,3,"operario","Africano", "Crystal Palace"),
  fa("Adrien Tameze",      "Segundo-Volante", 10_000_000,3,"operario","Francês",  "Torino"),
  fa("Adam Lallana",       "Segundo-Volante", 10_000_000,3,"operario","Inglês",   "Brighton"),

  // ══════════════════════════════════════════════════════════════════════════
  // MEIA-ARMADOR
  // ══════════════════════════════════════════════════════════════════════════
  // T1
  fa("Martin Odegaard",    "Meia-Armador", 50_000_000,1,"veterano","Outro",    "Arsenal"),
  fa("Gavi",               "Meia-Armador", 48_000_000,1,"veterano","Espanhol", "Barcelona"),
  fa("Bernardo Silva",     "Meia-Armador", 44_000_000,1,"veterano","Português","Manchester City"),
  fa("Frenkie de Jong",    "Meia-Armador", 40_000_000,1,"veterano","Holandês", "Barcelona"),
  // T2
  fa("Florian Wirtz",      "Meia-Armador", 50_000_000,1,"veterano","Alemão",   "Bayer Leverkusen"),
  fa("Xavi Simons",        "Meia-Armador", 32_000_000,2,"joia",    "Holandês", "RB Leipzig"),
  fa("Warren Zaïre-Emery", "Meia-Armador", 28_000_000,2,"joia",    "Francês",  "PSG"),
  fa("Pedri Jr",           "Meia-Armador", 26_000_000,2,"joia",    "Espanhol", "Real Sociedad"),
  fa("Jamal Musiala",      "Meia-Armador", 48_000_000,1,"veterano","Alemão",   "Bayern Munich"),
  fa("Lucas Paqueta",      "Meia-Armador", 30_000_000,2,"joia",    "Brasileiro","West Ham"),
  fa("Dani Ceballos",      "Meia-Armador", 20_000_000,2,"joia",    "Espanhol", "Real Madrid"),
  // T3
  fa("Harvey Barnes",      "Meia-Armador", 14_000_000,3,"operario","Inglês",   "Newcastle"),
  fa("Brennan Johnson",    "Meia-Armador", 14_000_000,3,"operario","Outro",    "Tottenham"),
  fa("Emre Can",           "Meia-Armador", 10_000_000,3,"operario","Alemão",   "Borussia Dortmund"),
  fa("Facundo Buonanotte", "Meia-Armador", 12_000_000,3,"operario","Argentino","Brighton"),

  // ══════════════════════════════════════════════════════════════════════════
  // PONTA-DIREITA
  // ══════════════════════════════════════════════════════════════════════════
  // T1
  fa("Mohamed Salah",      "Ponta-Direita", 50_000_000,1,"veterano","Africano", "Liverpool"),
  fa("Bukayo Saka",        "Ponta-Direita", 50_000_000,1,"veterano","Inglês",   "Arsenal"),
  fa("Phil Foden",         "Ponta-Direita", 48_000_000,1,"veterano","Inglês",   "Manchester City"),
  fa("Dani Olmo",          "Ponta-Direita", 44_000_000,1,"veterano","Espanhol", "Barcelona"),
  fa("Ousmane Dembélé",    "Ponta-Direita", 42_000_000,1,"veterano","Francês",  "PSG"),
  // T2
  fa("Dejan Kulusevski",   "Ponta-Direita", 28_000_000,2,"joia",    "Outro",    "Tottenham"),
  fa("Anthony Gordon",     "Ponta-Direita", 26_000_000,2,"joia",    "Inglês",   "Newcastle"),
  fa("Jarrod Bowen",       "Ponta-Direita", 24_000_000,2,"joia",    "Inglês",   "West Ham"),
  fa("Khvicha Kvaratskhelia","Ponta-Direita",42_000_000,1,"veterano","Outro",   "Napoli"),
  fa("Yerlan Abesadze",    "Ponta-Direita", 20_000_000,2,"joia",    "Outro",    "Feyenoord"),
  fa("Bryan Zaragoza",     "Ponta-Direita", 22_000_000,2,"joia",    "Espanhol", "Bayern Munich"),
  // T3
  fa("Kaoru Mitoma",       "Ponta-Direita", 16_000_000,3,"operario","Outro",    "Brighton"),
  fa("Bryan Mbeumo",       "Ponta-Direita", 14_000_000,3,"operario","Africano", "Brentford"),
  fa("Noni Madueke",       "Ponta-Direita", 16_000_000,3,"operario","Inglês",   "Chelsea"),
  fa("Alassane Plea",      "Ponta-Direita", 12_000_000,3,"operario","Francês",  "Mönchengladbach"),
  fa("Bertug Yildirim",    "Ponta-Direita", 10_000_000,3,"operario","Outro",    "Trabzonspor"),

  // ══════════════════════════════════════════════════════════════════════════
  // PONTA-ESQUERDO
  // ══════════════════════════════════════════════════════════════════════════
  // T1
  fa("Vinicius Jr",        "Ponta-Esquerdo",50_000_000,1,"veterano","Brasileiro","Real Madrid"),
  fa("Luis Diaz",          "Ponta-Esquerdo",46_000_000,1,"veterano","Colombiano","Liverpool"),
  fa("Gabriel Martinelli", "Ponta-Esquerdo",42_000_000,1,"veterano","Brasileiro","Arsenal"),
  fa("Marcus Rashford",    "Ponta-Esquerdo",36_000_000,1,"veterano","Inglês",   "Man. United"),
  fa("Leroy Sané",         "Ponta-Esquerdo",40_000_000,1,"veterano","Alemão",   "Bayern Munich"),
  // T2
  fa("Son Heung-min",      "Ponta-Esquerdo",28_000_000,2,"joia",    "Outro",    "Tottenham"),
  fa("Moussa Diaby",       "Ponta-Esquerdo",30_000_000,2,"joia",    "Francês",  "Aston Villa"),
  fa("Lois Openda",        "Ponta-Esquerdo",28_000_000,2,"joia",    "Belga",    "RB Leipzig"),
  fa("Ferran Torres",      "Ponta-Esquerdo",22_000_000,2,"joia",    "Espanhol", "Barcelona"),
  fa("Nicolas Pépé",       "Ponta-Esquerdo",20_000_000,2,"joia",    "Africano", "Nice"),
  fa("Jonathan David",     "Ponta-Esquerdo",26_000_000,2,"joia",    "Outro",    "Lille"),
  // T3
  fa("Jack Grealish",      "Ponta-Esquerdo",16_000_000,3,"operario","Inglês",   "Manchester City"),
  fa("Leandro Trossard",   "Ponta-Esquerdo",14_000_000,3,"operario","Belga",    "Arsenal"),
  fa("Mohammed Kudus",     "Ponta-Esquerdo",14_000_000,3,"operario","Africano", "West Ham"),
  fa("Federico Bernardeschi","Ponta-Esquerdo",10_000_000,3,"operario","Italiano","Toronto FC"),
  fa("Allan Saint-Maximin","Ponta-Esquerdo",12_000_000,3,"operario","Francês",  "Al-Ahli"),

  // ══════════════════════════════════════════════════════════════════════════
  // CENTROAVANTE
  // ══════════════════════════════════════════════════════════════════════════
  // T1
  fa("Erling Haaland",     "Centroavante", 50_000_000,1,"veterano","Outro",    "Manchester City"),
  fa("Harry Kane",         "Centroavante", 48_000_000,1,"veterano","Inglês",   "Bayern Munich"),
  fa("Robert Lewandowski", "Centroavante", 44_000_000,1,"veterano","Outro",    "Barcelona"),
  fa("Lautaro Martinez",   "Centroavante", 46_000_000,1,"veterano","Argentino","Inter Milan"),
  fa("Victor Osimhen",     "Centroavante", 44_000_000,1,"veterano","Africano", "Napoli"),
  // T2
  fa("Alexander Isak",     "Centroavante", 32_000_000,2,"joia",    "Outro",    "Newcastle"),
  fa("Olivier Giroud",     "Centroavante", 20_000_000,2,"joia",    "Francês",  "AC Milan"),
  fa("Randal Kolo Muani",  "Centroavante", 28_000_000,2,"joia",    "Francês",  "PSG"),
  fa("Patrik Schick",      "Centroavante", 26_000_000,2,"joia",    "Outro",    "Bayer Leverkusen"),
  fa("Rasmus Hojlund",     "Centroavante", 30_000_000,2,"joia",    "Outro",    "Man. United"),
  fa("Santiago Gimenez",   "Centroavante", 28_000_000,2,"joia",    "Outro",    "Feyenoord"),
  // T3
  fa("Danny Welbeck",      "Centroavante", 10_000_000,3,"operario","Inglês",   "Brighton"),
  fa("Wout Weghorst",      "Centroavante", 12_000_000,3,"operario","Holandês", "Hoffenheim"),
  fa("Neal Maupay",        "Centroavante", 12_000_000,3,"operario","Francês",  "Brentford"),
  fa("Beto",               "Centroavante", 14_000_000,3,"operario","Português","Everton"),
  fa("Loïc Badé",          "Centroavante", 10_000_000,3,"operario","Francês",  "Sevilla"),
]

// IDs começam em 3000 para não colidir com o pool sul-americano (2000+)
export const FREE_AGENTS_POOL_EUROPE: Player[] = TEMPLATES.map((t, i) => ({
  ...t,
  id: 3000 + i,
  teamId: null,
  sold: false,
}))
