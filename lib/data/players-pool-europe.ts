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

const TEMPLATES: FreeAgentTemplate[] = [
  // ── GOLEIRO ──────────────────────────────────────────────────────────────
  fa("Alisson Becker",      "Goleiro", 48_000_000, 1, "veterano", "Brasileiro", "Liverpool"),
  fa("Ederson Moraes",      "Goleiro", 45_000_000, 1, "veterano", "Brasileiro", "Manchester City"),
  fa("Thibaut Courtois",    "Goleiro", 45_000_000, 1, "veterano", "Belga",      "Real Madrid"),
  fa("Jan Oblak",            "Goleiro", 42_000_000, 1, "veterano", "Outro",      "Atlético Madrid"),
  fa("David Raya",          "Goleiro", 40_000_000, 1, "veterano", "Espanhol",   "Arsenal"),
  fa("Marc-André ter Stegen","Goleiro",38_000_000, 1, "veterano", "Alemão",     "Barcelona"),
  fa("Mike Maignan",        "Goleiro", 36_000_000, 1, "veterano", "Francês",    "AC Milan"),
  fa("Bart Verbruggen",     "Goleiro", 28_000_000, 2, "joia",     "Holandês",   "Brighton"),
  fa("Gianluigi Donnarumma","Goleiro", 28_000_000, 2, "joia",     "Italiano",   "PSG"),
  fa("Gregor Kobel",        "Goleiro", 26_000_000, 2, "joia",     "Alemão",     "Borussia Dortmund"),
  fa("Unai Simon",          "Goleiro", 22_000_000, 2, "joia",     "Espanhol",   "Athletic Bilbao"),
  fa("Jordan Pickford",     "Goleiro", 20_000_000, 2, "joia",     "Inglês",     "Everton"),
  fa("Diogo Costa",          "Goleiro", 32_000_000, 2, "joia",     "Português",  "FC Porto"),
  fa("Lucas Chevalier",      "Goleiro", 26_000_000, 2, "joia",     "Francês",    "Lille"),
  fa("Andriy Lunin",        "Goleiro", 20_000_000, 2, "joia",     "Outro",      "Real Madrid"),
  fa("Brice Samba",         "Goleiro", 14_000_000, 3, "operario", "Africano",   "RC Lens"),
  fa("Yann Sommer",          "Goleiro", 14_000_000, 3, "operario", "Outro",      "Inter Milan"),
  fa("Alex Remiro",          "Goleiro", 12_000_000, 3, "operario", "Espanhol",   "Real Sociedad"),
  fa("Jose Sa",             "Goleiro", 12_000_000, 3, "operario", "Português",  "Wolverhampton"),
  fa("Dean Henderson",      "Goleiro", 12_000_000, 3, "operario", "Inglês",     "Crystal Palace"),
  fa("Gavin Bazunu",        "Goleiro", 10_000_000, 3, "operario", "Outro",      "Southampton"),
  fa("Oliver Baumann",      "Goleiro", 10_000_000, 3, "operario", "Alemão",     "TSG Hoffenheim"),

  // ── ZAGA-1 ───────────────────────────────────────────────────────────────
  fa("Virgil van Dijk",     "Zaga-1",  50_000_000, 1, "veterano", "Holandês",   "Liverpool"),
  fa("William Saliba",      "Zaga-1",  48_000_000, 1, "veterano", "Francês",    "Arsenal"),
  fa("Dayot Upamecano",     "Zaga-1",  40_000_000, 1, "veterano", "Francês",    "Bayern Munich"),
  fa("Antonio Rüdiger",      "Zaga-1",  46_000_000, 1, "veterano", "Alemão",     "Real Madrid"),
  fa("Alessandro Bastoni",  "Zaga-1",  45_000_000, 1, "veterano", "Italiano",   "Inter Milan"),
  fa("Ezri Konsa",          "Zaga-1",  28_000_000, 2, "joia",     "Inglês",     "Aston Villa"),
  fa("Levi Colwill",        "Zaga-1",  30_000_000, 2, "joia",     "Inglês",     "Chelsea"),
  fa("Jonathan Tah",        "Zaga-1",  26_000_000, 2, "joia",     "Alemão",     "Bayer Leverkusen"),
  fa("Pau Cubarsí",          "Zaga-1",  32_000_000, 2, "joia",     "Espanhol",   "Barcelona"),
  fa("Murillo",              "Zaga-1",  28_000_000, 2, "joia",     "Brasileiro", "Nottingham Forest"),
  fa("Willian Pacho",       "Zaga-1",  24_000_000, 2, "joia",     "Colombiano", "Eintracht Frankfurt"),
  fa("Perr Schuurs",        "Zaga-1",  22_000_000, 2, "joia",     "Holandês",   "Torino"),
  fa("Dean Huijsen",        "Zaga-1",  20_000_000, 2, "joia",     "Espanhol",   "Roma"),
  fa("Marc Guehi",          "Zaga-1",  16_000_000, 3, "operario", "Inglês",     "Crystal Palace"),
  fa("Ben Mee",             "Zaga-1",  12_000_000, 3, "operario", "Inglês",     "Brentford"),
  fa("Andreas Christensen", "Zaga-1",  14_000_000, 3, "operario", "Outro",      "Barcelona"),
  fa("Daniele Rugani",      "Zaga-1",  10_000_000, 3, "operario", "Italiano",   "Juventus"),

  // ── ZAGA-2 ───────────────────────────────────────────────────────────────
  fa("Cristian Romero",     "Zaga-2",  46_000_000, 1, "veterano", "Argentino",  "Tottenham"),
  fa("Micky van de Ven",    "Zaga-2",  42_000_000, 1, "veterano", "Holandês",   "Tottenham"),
  fa("Marquinhos",          "Zaga-2",  46_000_000, 1, "veterano", "Brasileiro", "PSG"),
  fa("Ruben Dias",           "Zaga-2",  48_000_000, 1, "veterano", "Português",  "Manchester City"),
  fa("Matthijs de Ligt",    "Zaga-2",  44_000_000, 1, "veterano", "Holandês",   "Bayern Munich"),
  fa("Ronald Araújo",       "Zaga-2",  45_000_000, 1, "veterano", "Uruguaio",   "Barcelona"),
  fa("Leny Yoro",            "Zaga-2",  30_000_000, 2, "joia",     "Francês",    "Man. United"),
  fa("Jorrel Hato",          "Zaga-2",  26_000_000, 2, "joia",     "Holandês",   "Ajax"),
  fa("Pau Torres",          "Zaga-2",  28_000_000, 2, "joia",     "Espanhol",   "Aston Villa"),
  fa("Jarrad Branthwaite",  "Zaga-2",  30_000_000, 2, "joia",     "Inglês",     "Everton"),
  fa("Nico Schlotterbeck",  "Zaga-2",  26_000_000, 2, "joia",     "Alemão",     "Borussia Dortmund"),
  fa("Giorgio Scalvini",    "Zaga-2",  24_000_000, 2, "joia",     "Italiano",   "Atalanta"),
  fa("Joachim Andersen",    "Zaga-2",  14_000_000, 3, "operario", "Outro",      "Crystal Palace"),
  fa("Adam Webster",        "Zaga-2",  14_000_000, 3, "operario", "Inglês",     "Brighton"),
  fa("Nacho Fernández",      "Zaga-2",  10_000_000, 3, "operario", "Espanhol",   "Al-Qadsiah"),
  fa("Stefan de Vrij",       "Zaga-2",  12_000_000, 3, "operario", "Holandês",   "Inter Milan"),
  fa("Lewis Dunk",          "Zaga-2",  12_000_000, 3, "operario", "Inglês",     "Brighton"),
  fa("Francesco Acerbi",     "Zaga-1",  12_000_000, 3, "operario", "Italiano",   "Inter Milan"),
  fa("Inigo Martinez",       "Zaga-1",  14_000_000, 3, "operario", "Espanhol",   "Barcelona"),
  fa("Leo Dubois",          "Zaga-2",  10_000_000, 3, "operario", "Francês",    "Lyon"),

  // ── LATERAL-DIREITO ───────────────────────────────────────────────────────
  fa("Trent Alexander-Arnold","Lateral-Direito", 50_000_000, 1, "veterano", "Inglês",    "Liverpool"),
  fa("Reece James",          "Lateral-Direito",  42_000_000, 1, "veterano", "Inglês",    "Chelsea"),
  fa("Dani Carvajal",        "Lateral-Direito",  40_000_000, 1, "veterano", "Espanhol",  "Real Madrid"),
  fa("Achraf Hakimi",        "Lateral-Direito",  44_000_000, 1, "veterano", "Africano",  "PSG"),
  fa("Kyle Walker",          "Lateral-Direito", 40_000_000, 1, "veterano", "Inglês",     "Manchester City"),
  fa("Rico Lewis",           "Lateral-Direito", 28_000_000, 2, "joia",     "Inglês",     "Manchester City"),
  fa("Tiago Santos",         "Lateral-Direito", 24_000_000, 2, "joia",     "Português",  "Lille"),
  fa("Pedro Porro",          "Lateral-Direito",  28_000_000, 2, "joia",     "Espanhol",  "Tottenham"),
  fa("Matty Cash",           "Lateral-Direito",  22_000_000, 2, "joia",     "Inglês",    "Aston Villa"),
  fa("Denzel Dumfries",      "Lateral-Direito",  26_000_000, 2, "joia",     "Holandês",  "Inter Milan"),
  fa("Noussair Mazraoui",    "Lateral-Direito",  24_000_000, 2, "joia",     "Africano",  "Bayern Munich"),
  fa("Hamari Traoré",        "Lateral-Direito",  20_000_000, 2, "joia",     "Africano",  "Rennes"),
  fa("Tariq Lamptey",        "Lateral-Direito",  14_000_000, 3, "operario", "Inglês",    "Brighton"),
  fa("Aaron Wan-Bissaka",    "Lateral-Direito",  12_000_000, 3, "operario", "Inglês",    "Man. United"),
  fa("Diogo Dalot",          "Lateral-Direito",  14_000_000, 3, "operario", "Português", "Man. United"),
  fa("Ben White",            "Lateral-Direito", 16_000_000, 3, "operario", "Inglês",     "Arsenal"),
  fa("Matteo Darmian",       "Lateral-Direito", 10_000_000, 3, "operario", "Italiano",   "Inter Milan"),

  // ── LATERAL-ESQUERDO ─────────────────────────────────────────────────────
  fa("Andrew Robertson",     "Lateral-Esquerdo", 38_000_000, 1, "veterano", "Outro",     "Liverpool"),
  fa("Theo Hernández",       "Lateral-Esquerdo", 42_000_000, 1, "veterano", "Francês",   "AC Milan"),
  fa("Ferland Mendy",        "Lateral-Esquerdo", 36_000_000, 1, "veterano", "Francês",   "Real Madrid"),
  fa("Alphonso Davies",      "Lateral-Esquerdo", 40_000_000, 1, "veterano", "Africano",  "Bayern Munich"),
  fa("Destiny Udogie",       "Lateral-Esquerdo", 28_000_000, 2, "joia",     "Italiano",  "Tottenham"),
  fa("Alejandro Balde",      "Lateral-Esquerdo", 26_000_000, 2, "joia",     "Espanhol",  "Barcelona"),
  fa("Lucas Hernández",      "Lateral-Esquerdo", 22_000_000, 2, "joia",     "Francês",   "PSG"),
  fa("Robin Gosens",         "Lateral-Esquerdo", 20_000_000, 2, "joia",     "Alemão",    "Inter Milan"),
  fa("Mitchel Bakker",       "Lateral-Esquerdo", 18_000_000, 2, "joia",     "Holandês",  "Bayer Leverkusen"),
  fa("Ben Chilwell",         "Lateral-Esquerdo", 14_000_000, 3, "operario", "Inglês",    "Chelsea"),
  fa("Marc Cucurella",       "Lateral-Esquerdo", 16_000_000, 3, "operario", "Espanhol",  "Chelsea"),
  fa("Sergio Reguilon",      "Lateral-Esquerdo", 12_000_000, 3, "operario", "Espanhol",  "Atlético Madrid"),

  // ── PRIMEIRO-VOLANTE ─────────────────────────────────────────────────────
  fa("Rodri",                "Primeiro-Volante", 50_000_000, 1, "veterano", "Espanhol",  "Manchester City"),
  fa("Declan Rice",          "Primeiro-Volante", 48_000_000, 1, "veterano", "Inglês",    "Arsenal"),
  fa("Aurélien Tchouaméni",  "Primeiro-Volante", 44_000_000, 1, "veterano", "Francês",   "Real Madrid"),
  fa("Casemiro",             "Primeiro-Volante", 38_000_000, 1, "veterano", "Brasileiro","Man. United"),
  fa("Yves Bissouma",        "Primeiro-Volante", 22_000_000, 2, "joia",     "Africano",  "Tottenham"),
  fa("Carlos Baleba",        "Primeiro-Volante", 24_000_000, 2, "joia",     "Africano",  "Brighton"),
  fa("Granit Xhaka",         "Primeiro-Volante", 12_000_000, 3, "operario", "Outro",     "Bayer Leverkusen"),
  fa("Mattéo Guendouzi",     "Primeiro-Volante", 22_000_000, 2, "joia",     "Francês",   "Lazio"),
  fa("Idrissa Gueye",        "Primeiro-Volante", 20_000_000, 2, "joia",     "Africano",  "Everton"),
  fa("Piotr Zielinski",      "Primeiro-Volante", 20_000_000, 2, "joia",     "Outro",     "Inter Milan"),
  fa("James Ward-Prowse",    "Primeiro-Volante", 14_000_000, 3, "operario", "Inglês",    "West Ham"),
  fa("Kalvin Phillips",      "Primeiro-Volante", 12_000_000, 3, "operario", "Inglês",    "Manchester City"),
  fa("Wilfred Ndidi",        "Primeiro-Volante", 10_000_000, 3, "operario", "Africano",  "Leicester City"),
  fa("Sander Berge",         "Primeiro-Volante", 12_000_000, 3, "operario", "Outro",     "Burnley"),

  // ── SEGUNDO-VOLANTE ───────────────────────────────────────────────────────
  fa("Kevin De Bruyne",      "Segundo-Volante",  48_000_000, 1, "veterano", "Belga",     "Manchester City"),
  fa("Luka Modric",          "Segundo-Volante",  38_000_000, 1, "veterano", "Outro",     "Real Madrid"),
  fa("Pedri",                "Segundo-Volante",  46_000_000, 1, "veterano", "Espanhol",  "Barcelona"),
  fa("Jude Bellingham",      "Segundo-Volante",  50_000_000, 1, "veterano", "Inglês",    "Real Madrid"),
  fa("Dominik Szoboszlai",   "Segundo-Volante",  28_000_000, 2, "joia",     "Outro",     "Liverpool"),
  fa("Joshua Kimmich",       "Segundo-Volante",  38_000_000, 1, "veterano", "Alemão",    "Bayern Munich"),
  fa("Leon Goretzka",        "Segundo-Volante",  11_000_000, 3, "operario", "Alemão",    "Bayern Munich"),
  fa("Sofyan Amrabat",       "Segundo-Volante",  20_000_000, 2, "joia",     "Africano",  "Fiorentina"),
  fa("Marcel Sabitzer",      "Segundo-Volante",  22_000_000, 2, "joia",     "Outro",     "Borussia Dortmund"),
  fa("Lucas Torreira",       "Segundo-Volante",  20_000_000, 2, "joia",     "Uruguaio",  "Galatasaray"),
  fa("Pascal Gross",         "Segundo-Volante",  14_000_000, 3, "operario", "Alemão",    "Brighton"),
  fa("James Maddison",       "Segundo-Volante",  14_000_000, 3, "operario", "Inglês",    "Tottenham"),
  fa("Cheick Doucoure",      "Segundo-Volante",  12_000_000, 3, "operario", "Africano",  "Crystal Palace"),

  // ── MEIA-ARMADOR ─────────────────────────────────────────────────────────
  fa("Martin Odegaard",      "Meia-Armador",     50_000_000, 1, "veterano", "Outro",     "Arsenal"),
  fa("Gavi",                 "Meia-Armador",     48_000_000, 1, "veterano", "Espanhol",  "Barcelona"),
  fa("Bernardo Silva",       "Meia-Armador",     44_000_000, 1, "veterano", "Português", "Manchester City"),
  fa("Jamal Musiala",        "Meia-Armador",     48_000_000, 1, "veterano", "Alemão",    "Bayern Munich"),
  fa("Florian Wirtz",        "Meia-Armador",     50_000_000, 1, "veterano", "Alemão",    "Bayer Leverkusen"),
  fa("Frenkie de Jong",      "Meia-Armador",     40_000_000, 1, "veterano", "Holandês",  "Barcelona"),
  fa("Xavi Simons",          "Meia-Armador",     32_000_000, 2, "joia",     "Holandês",  "RB Leipzig"),
  fa("Warren Zaïre-Emery",   "Meia-Armador",     28_000_000, 2, "joia",     "Francês",   "PSG"),
  fa("Lucas Paqueta",        "Meia-Armador",     30_000_000, 2, "joia",     "Brasileiro","West Ham"),
  fa("Dani Ceballos",        "Meia-Armador",     20_000_000, 2, "joia",     "Espanhol",  "Real Madrid"),
  fa("Harvey Barnes",        "Meia-Armador",     14_000_000, 3, "operario", "Inglês",    "Newcastle"),
  fa("Brennan Johnson",      "Meia-Armador",     14_000_000, 3, "operario", "Outro",     "Tottenham"),
  fa("Emre Can",             "Meia-Armador",     10_000_000, 3, "operario", "Alemão",    "Borussia Dortmund"),
  fa("Facundo Buonanotte",   "Meia-Armador",     12_000_000, 3, "operario", "Argentino", "Brighton"),

  // ── PONTA-DIREITA ────────────────────────────────────────────────────────
  fa("Mohamed Salah",        "Ponta-Direita",    50_000_000, 1, "veterano", "Africano",  "Liverpool"),
  fa("Bukayo Saka",          "Ponta-Direita",    50_000_000, 1, "veterano", "Inglês",    "Arsenal"),
  fa("Phil Foden",           "Ponta-Direita",    48_000_000, 1, "veterano", "Inglês",    "Manchester City"),
  fa("Dani Olmo",            "Ponta-Direita",    44_000_000, 1, "veterano", "Espanhol",  "Barcelona"),
  fa("Ousmane Dembélé",      "Ponta-Direita",    42_000_000, 1, "veterano", "Francês",   "PSG"),
  fa("Khvicha Kvaratskhelia", "Ponta-Direita",   42_000_000, 1, "veterano", "Outro",     "Napoli"),
  fa("Dejan Kulusevski",     "Ponta-Direita",    28_000_000, 2, "joia",     "Outro",     "Tottenham"),
  fa("Anthony Gordon",       "Ponta-Direita",    26_000_000, 2, "joia",     "Inglês",    "Newcastle"),
  fa("Jarrod Bowen",         "Ponta-Direita",    24_000_000, 2, "joia",     "Inglês",    "West Ham"),
  fa("Bryan Zaragoza",       "Ponta-Direita",    22_000_000, 2, "joia",     "Espanhol",  "Bayern Munich"),
  fa("Kaoru Mitoma",         "Ponta-Direita",    16_000_000, 3, "operario", "Outro",     "Brighton"),
  fa("Bryan Mbeumo",         "Ponta-Direita",    14_000_000, 3, "operario", "Africano",  "Brentford"),
  fa("Noni Madueke",         "Ponta-Direita",    16_000_000, 3, "operario", "Inglês",    "Chelsea"),
  fa("Alassane Plea",        "Ponta-Direita",    12_000_000, 3, "operario", "Francês",   "Mönchengladbach"),

  // ── PONTA-ESQUERDO ───────────────────────────────────────────────────────
  fa("Vinicius Jr",          "Ponta-Esquerdo",   50_000_000, 1, "veterano", "Brasileiro","Real Madrid"),
  fa("Luis Diaz",            "Ponta-Esquerdo",   46_000_000, 1, "veterano", "Colombiano","Liverpool"),
  fa("Gabriel Martinelli",   "Ponta-Esquerdo",   42_000_000, 1, "veterano", "Brasileiro","Arsenal"),
  fa("Marcus Rashford",      "Ponta-Esquerdo",   36_000_000, 1, "veterano", "Inglês",    "Man. United"),
  fa("Leroy Sané",           "Ponta-Esquerdo",   40_000_000, 1, "veterano", "Alemão",    "Bayern Munich"),
  fa("Son Heung-min",        "Ponta-Esquerdo",   36_000_000, 1, "veterano", "Outro",     "Tottenham"),
  fa("Moussa Diaby",         "Ponta-Esquerdo",   30_000_000, 2, "joia",     "Francês",   "Aston Villa"),
  fa("Lois Openda",          "Ponta-Esquerdo",   28_000_000, 2, "joia",     "Belga",     "RB Leipzig"),
  fa("Ferran Torres",        "Ponta-Esquerdo",   22_000_000, 2, "joia",     "Espanhol",  "Barcelona"),
  fa("Jonathan David",       "Ponta-Esquerdo",   26_000_000, 2, "joia",     "Outro",     "Lille"),
  fa("Jack Grealish",        "Ponta-Esquerdo",   16_000_000, 3, "operario", "Inglês",    "Manchester City"),
  fa("Leandro Trossard",     "Ponta-Esquerdo",   20_000_000, 2, "joia",     "Belga",     "Arsenal"),
  fa("Mohammed Kudus",       "Ponta-Esquerdo",   20_000_000, 2, "joia",     "Africano",  "West Ham"),

  // ── CENTROAVANTE ─────────────────────────────────────────────────────────
  fa("Erling Haaland",       "Centroavante",     50_000_000, 1, "veterano", "Outro",     "Manchester City"),
  fa("Harry Kane",           "Centroavante",     48_000_000, 1, "veterano", "Inglês",    "Bayern Munich"),
  fa("Robert Lewandowski",   "Centroavante",     44_000_000, 1, "veterano", "Outro",     "Barcelona"),
  fa("Lautaro Martinez",     "Centroavante",     46_000_000, 1, "veterano", "Argentino", "Inter Milan"),
  fa("Victor Osimhen",       "Centroavante",     44_000_000, 1, "veterano", "Africano",  "Napoli"),
  fa("Alexander Isak",       "Centroavante",     32_000_000, 2, "joia",     "Outro",     "Newcastle"),
  fa("Randal Kolo Muani",    "Centroavante",     28_000_000, 2, "joia",     "Francês",   "PSG"),
  fa("Patrik Schick",        "Centroavante",     26_000_000, 2, "joia",     "Outro",     "Bayer Leverkusen"),
  fa("Rasmus Hojlund",       "Centroavante",     30_000_000, 2, "joia",     "Outro",     "Man. United"),
  fa("Santiago Gimenez",     "Centroavante",     28_000_000, 2, "joia",     "Outro",     "Feyenoord"),
  fa("Wout Weghorst",        "Centroavante",     12_000_000, 3, "operario", "Holandês",  "Hoffenheim"),
  fa("Beto",                 "Centroavante",     14_000_000, 3, "operario", "Português", "Everton"),

  // ── ADIÇÕES: LATERAL-ESQUERDO ─────────────────────────────────────────────
  fa("Federico Dimarco",     "Lateral-Esquerdo", 44_000_000, 1, "veterano", "Italiano",   "Inter Milan"),
  fa("Ian Maatsen",          "Lateral-Esquerdo", 26_000_000, 2, "joia",     "Holandês",   "Aston Villa"),
  fa("Lewis Hall",           "Lateral-Esquerdo", 24_000_000, 2, "joia",     "Inglês",     "Newcastle"),
  fa("Lucas Digne",          "Lateral-Esquerdo", 14_000_000, 3, "operario", "Francês",    "Aston Villa"),
  fa("Ben Davies",           "Lateral-Esquerdo", 10_000_000, 3, "operario", "Outro",      "Tottenham"),

  // ── ADIÇÕES: PRIMEIRO-VOLANTE ─────────────────────────────────────────────
  fa("João Palhinha",        "Primeiro-Volante", 42_000_000, 1, "veterano", "Português",  "Bayern Munich"),
  fa("Kobbie Mainoo",        "Primeiro-Volante", 32_000_000, 2, "joia",     "Inglês",     "Man. United"),
  fa("Adam Wharton",         "Primeiro-Volante", 26_000_000, 2, "joia",     "Inglês",     "Crystal Palace"),
  fa("Wataru Endo",          "Primeiro-Volante", 14_000_000, 3, "operario", "Outro",      "Liverpool"),
  fa("Thomas Partey",        "Primeiro-Volante", 12_000_000, 3, "operario", "Africano",   "Arsenal"),

  // ── ADIÇÕES: SEGUNDO-VOLANTE ──────────────────────────────────────────────
  fa("Ilkay Gündogan",       "Segundo-Volante",  40_000_000, 1, "veterano", "Alemão",     "Manchester City"),
  fa("João Neves",           "Segundo-Volante",  34_000_000, 2, "joia",     "Português",  "PSG"),
  fa("Aleksandar Pavlovic",  "Segundo-Volante",  28_000_000, 2, "joia",     "Alemão",     "Bayern Munich"),
  fa("Mateo Kovacic",        "Segundo-Volante",  16_000_000, 3, "operario", "Outro",      "Manchester City"),
  fa("Adrien Rabiot",        "Segundo-Volante",  14_000_000, 3, "operario", "Francês",    "Olympique Marseille"),

  // ── ADIÇÕES: MEIA-ARMADOR ────────────────────────────────────────────────
  fa("Bruno Fernandes",      "Meia-Armador",     46_000_000, 1, "veterano", "Português",  "Man. United"),
  fa("Arda Güler",           "Meia-Armador",     30_000_000, 2, "joia",     "Outro",      "Real Madrid"),
  fa("Nico Paz",             "Meia-Armador",     24_000_000, 2, "joia",     "Argentino",  "Como"),
  fa("Henrikh Mkhitaryan",   "Meia-Armador",     12_000_000, 3, "operario", "Outro",      "Inter Milan"),
  fa("Mario Götze",          "Meia-Armador",     10_000_000, 3, "operario", "Alemão",     "Eintracht Frankfurt"),

  // ── ADIÇÕES: PONTA-DIREITA ───────────────────────────────────────────────
  fa("Cole Palmer",          "Ponta-Direita",    48_000_000, 1, "veterano", "Inglês",     "Chelsea"),
  fa("Lamine Yamal",         "Ponta-Direita",    36_000_000, 2, "joia",     "Espanhol",   "Barcelona"),
  fa("Johan Bakayoko",       "Ponta-Direita",    26_000_000, 2, "joia",     "Outro",      "PSV Eindhoven"),
  fa("Pedro Neto",           "Ponta-Direita",    16_000_000, 3, "operario", "Português",  "Chelsea"),
  fa("Miguel Almirón",       "Ponta-Direita",    12_000_000, 3, "operario", "Paraguaio",  "Newcastle"),

  // ── ADIÇÕES: PONTA-ESQUERDO ──────────────────────────────────────────────
  fa("Kylian Mbappé",        "Ponta-Esquerdo",   50_000_000, 1, "veterano", "Francês",    "Real Madrid"),
  fa("Nico Williams",        "Ponta-Esquerdo",   32_000_000, 2, "joia",     "Espanhol",   "Athletic Bilbao"),
  fa("Kenan Yildiz",         "Ponta-Esquerdo",   28_000_000, 2, "joia",     "Outro",      "Juventus"),
  fa("Stephan El Shaarawy",  "Ponta-Esquerdo",   10_000_000, 3, "operario", "Italiano",   "Roma"),

  // ── ADIÇÕES: CENTROAVANTE ────────────────────────────────────────────────
  fa("Christian Kouamé",     "Centroavante",     38_000_000, 1, "veterano", "Africano",   "Fiorentina"),
  fa("Benjamin Sesko",       "Centroavante",     32_000_000, 2, "joia",     "Outro",      "RB Leipzig"),
  fa("Evan Ferguson",        "Centroavante",     26_000_000, 2, "joia",     "Outro",      "Brighton"),
  fa("Alvaro Morata",        "Centroavante",     16_000_000, 3, "operario", "Espanhol",   "AC Milan"),
  fa("Niclas Füllkrug",      "Centroavante",     14_000_000, 3, "operario", "Alemão",     "West Ham"),

  // ── ADIÇÕES: GOLEIRO ──────────────────────────────────────────────────────
  fa("Diant Ramaj",          "Goleiro",          22_000_000, 2, "joia",     "Alemão",     "Ajax"),
  fa("Lukasz Skorupski",     "Goleiro",          12_000_000, 3, "operario", "Outro",      "Bologna"),

  // ── ADIÇÕES: ZAGA-1 / ZAGA-2 ──────────────────────────────────────────────
  fa("Josko Gvardiol",       "Zaga-1",           48_000_000, 1, "veterano", "Outro",      "Manchester City"),
  fa("Gonçalo Inácio",       "Zaga-2",           30_000_000, 2, "joia",     "Português",  "Sporting CP"),
  fa("Niklas Süle",          "Zaga-2",           14_000_000, 3, "operario", "Alemão",     "Borussia Dortmund"),

  // ── ADIÇÕES: LATERAIS ────────────────────────────────────────────────────
  fa("Alejandro Grimaldo",   "Lateral-Esquerdo", 45_000_000, 1, "veterano", "Espanhol",   "Bayer Leverkusen"),
  fa("Jeremie Frimpong",     "Lateral-Direito",  34_000_000, 2, "joia",     "Holandês",   "Bayer Leverkusen"),
  fa("Danilo",               "Lateral-Direito",  12_000_000, 3, "operario", "Português",  "PSG"),

  // ── ADIÇÕES: MEIO-CAMPO ──────────────────────────────────────────────────
  fa("Federico Valverde",    "Segundo-Volante",  50_000_000, 1, "veterano", "Uruguaio",   "Real Madrid"),
  fa("Vitinha",              "Meia-Armador",     44_000_000, 1, "veterano", "Português",  "PSG"),
  fa("João Gomes",           "Primeiro-Volante", 28_000_000, 2, "joia",     "Brasileiro", "Wolverhampton"),
  fa("Piotr Zielinski",      "Meia-Armador",     14_000_000, 3, "operario", "Outro",      "Inter Milan"),

  // ── ADIÇÕES: ATAQUE ──────────────────────────────────────────────────────
  fa("Viktor Gyökeres",      "Centroavante",     46_000_000, 1, "veterano", "Outro",      "Sporting CP"),
  fa("Bradley Barcola",      "Ponta-Esquerdo",   32_000_000, 2, "joia",     "Francês",    "PSG"),
  fa("Jamie Gittens",        "Ponta-Direita",    26_000_000, 2, "joia",     "Inglês",     "Borussia Dortmund"),
  fa("Dušan Vlahovic",       "Centroavante",     34_000_000, 2, "joia",     "Outro",      "Juventus"),
  fa("Joselu",               "Centroavante",     12_000_000, 3, "operario", "Espanhol",   "Al-Gharafa"),
]

export const FREE_AGENTS_POOL_EUROPE: Player[] = TEMPLATES.map((t, i) => ({
  ...t,
  id: 3000 + i,
  teamId: null,
  sold: false,
}))
