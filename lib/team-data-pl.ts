// Premier League — 10 clubs (temporada 2025-26)
import type { Player, Position, Nationality, Tier, Category } from "./game-types"
import type { TeamConfig } from "./team-data"

export const AVAILABLE_TEAMS_PL: TeamConfig[] = [
  { id: 101, name: "Manchester City",  shortName: "MCI", primaryColor: "#6CABDD", secondaryColor: "#FFFFFF" },
  { id: 102, name: "Liverpool",        shortName: "LIV", primaryColor: "#C8102E", secondaryColor: "#FFFFFF" },
  { id: 103, name: "Arsenal",          shortName: "ARS", primaryColor: "#EF0107", secondaryColor: "#FFFFFF" },
  { id: 104, name: "Chelsea",          shortName: "CHE", primaryColor: "#034694", secondaryColor: "#FFFFFF" },
  { id: 105, name: "Man. United",      shortName: "MUN", primaryColor: "#DA291C", secondaryColor: "#FBE122" },
  { id: 106, name: "Tottenham",        shortName: "TOT", primaryColor: "#132257", secondaryColor: "#FFFFFF" },
  { id: 107, name: "Newcastle",        shortName: "NEW", primaryColor: "#241F20", secondaryColor: "#FFFFFF" },
  { id: 108, name: "Aston Villa",      shortName: "AVL", primaryColor: "#95BFE5", secondaryColor: "#670E36" },
  { id: 109, name: "West Ham",         shortName: "WHU", primaryColor: "#7A263A", secondaryColor: "#1BB1E7" },
  { id: 110, name: "Brighton",         shortName: "BHA", primaryColor: "#0057B8", secondaryColor: "#FFCD00" },
]

let _id = 1
function p(name: string, teamId: number, position: Position, value: number, tier: Tier, category: Category, nationality: Nationality, isReserva = false): Player {
  return { id: _id++, name, teamId, position, value, tier, category, nationality, isReserva, sold: false }
}

export function getPLTeamPlayers(teamId: number): Player[] {
  _id = (teamId - 100) * 22 + 1000

  switch (teamId) {
    // ── 101: MANCHESTER CITY 2025-26 ────────────────────────────────────
    case 101: return [
      p("Ederson",             101, "Goleiro",           30_000_000, 1, "veterano", "Brasileiro"),
      p("Rúben Dias",          101, "Zaga-1",            42_000_000, 1, "veterano", "Português"),
      p("Manuel Akanji",       101, "Zaga-2",            38_000_000, 1, "veterano", "Outro"),
      p("Kyle Walker",         101, "Lateral-Direito",   22_000_000, 1, "veterano", "Inglês"),
      p("Joao Cancelo",        101, "Lateral-Esquerdo",  30_000_000, 1, "veterano", "Português"),
      p("Rodri",               101, "Primeiro-Volante",  48_000_000, 1, "veterano", "Espanhol"),
      p("Kevin De Bruyne",     101, "Segundo-Volante",   38_000_000, 1, "veterano", "Belga"),
      p("Bernardo Silva",      101, "Meia-Armador",      42_000_000, 1, "veterano", "Português"),
      p("Phil Foden",          101, "Ponta-Direita",     48_000_000, 1, "veterano", "Inglês"),
      p("Jack Grealish",       101, "Ponta-Esquerdo",    22_000_000, 2, "joia",     "Inglês"),
      p("Erling Haaland",      101, "Centroavante",      50_000_000, 1, "veterano", "Outro"),
      // Reservas
      p("Stefan Ortega",       101, "Goleiro",            8_000_000, 3, "operario", "Alemão",    true),
      p("John Stones",         101, "Zaga-1",            18_000_000, 2, "joia",     "Inglês",    true),
      p("Josko Gvardiol",      101, "Zaga-2",            30_000_000, 2, "joia",     "Outro",     true),
      p("Rico Lewis",          101, "Lateral-Direito",   14_000_000, 2, "joia",     "Inglês",    true),
      p("Oscar Bobb",          101, "Lateral-Esquerdo",  10_000_000, 3, "operario", "Outro",     true),
      p("Matheus Nunes",       101, "Primeiro-Volante",  20_000_000, 2, "joia",     "Português", true),
      p("Ilkay Gundogan",      101, "Segundo-Volante",   16_000_000, 2, "joia",     "Alemão",    true),
      p("James McAtee",        101, "Meia-Armador",       8_000_000, 3, "operario", "Inglês",    true),
      p("Jeremy Doku",         101, "Ponta-Direita",     22_000_000, 2, "joia",     "Belga",     true),
      p("Savinho",             101, "Ponta-Esquerdo",    20_000_000, 2, "joia",     "Brasileiro",true),
      p("Julián Álvarez",      101, "Centroavante",      38_000_000, 2, "joia",     "Argentino", true),
    ]

    // ── 102: LIVERPOOL 2025-26 ───────────────────────────────────────────
    // Trent Alexander-Arnold saiu para o Real Madrid (free transfer)
    // Conor Bradley assume como titular na LD
    case 102: return [
      p("Alisson",             102, "Goleiro",           44_000_000, 1, "veterano", "Brasileiro"),
      p("Virgil van Dijk",     102, "Zaga-1",            44_000_000, 1, "veterano", "Holandês"),
      p("Ibrahima Konate",     102, "Zaga-2",            34_000_000, 1, "veterano", "Francês"),
      p("Conor Bradley",       102, "Lateral-Direito",   18_000_000, 2, "joia",     "Outro"),
      p("Andrew Robertson",    102, "Lateral-Esquerdo",  26_000_000, 1, "veterano", "Outro"),
      p("Ryan Gravenberch",    102, "Primeiro-Volante",  24_000_000, 2, "joia",     "Holandês"),
      p("Alexis Mac Allister", 102, "Segundo-Volante",   40_000_000, 1, "veterano", "Argentino"),
      p("Dominik Szoboszlai",  102, "Meia-Armador",      34_000_000, 2, "joia",     "Outro"),
      p("Mohamed Salah",       102, "Ponta-Direita",     48_000_000, 1, "veterano", "Africano"),
      p("Luis Diaz",           102, "Ponta-Esquerdo",    44_000_000, 1, "veterano", "Colombiano"),
      p("Darwin Nunez",        102, "Centroavante",      42_000_000, 1, "veterano", "Uruguaio"),
      // Reservas
      p("Caoimhin Kelleher",   102, "Goleiro",           10_000_000, 3, "operario", "Outro",     true),
      p("Joe Gomez",           102, "Zaga-1",            14_000_000, 2, "joia",     "Inglês",    true),
      p("Jarell Quansah",      102, "Zaga-2",            12_000_000, 2, "joia",     "Inglês",    true),
      p("Trent Alexander-Arnold",102,"Lateral-Direito",  48_000_000, 1, "veterano", "Inglês",    true), // reserva pois saiu no meio do save
      p("Kostas Tsimikas",     102, "Lateral-Esquerdo",  10_000_000, 3, "operario", "Outro",     true),
      p("Wataru Endo",         102, "Primeiro-Volante",  22_000_000, 2, "joia",     "Outro",     true),
      p("Stefan Bajcetic",     102, "Segundo-Volante",    8_000_000, 3, "operario", "Espanhol",  true),
      p("Harvey Elliott",      102, "Meia-Armador",      10_000_000, 3, "operario", "Inglês",    true),
      p("Cody Gakpo",          102, "Ponta-Direita",     28_000_000, 2, "joia",     "Holandês",  true),
      p("Ben Doak",            102, "Ponta-Esquerdo",     8_000_000, 3, "operario", "Outro",     true),
      p("Diogo Jota",          102, "Centroavante",      26_000_000, 2, "joia",     "Português", true),
    ]

    // ── 103: ARSENAL 2025-26 ────────────────────────────────────────────
    case 103: return [
      p("David Raya",          103, "Goleiro",           38_000_000, 1, "veterano", "Espanhol"),
      p("William Saliba",      103, "Zaga-1",            48_000_000, 1, "veterano", "Francês"),
      p("Gabriel Magalhães",   103, "Zaga-2",            44_000_000, 1, "veterano", "Brasileiro"),
      p("Ben White",           103, "Lateral-Direito",   34_000_000, 1, "veterano", "Inglês"),
      p("Oleksandr Zinchenko", 103, "Lateral-Esquerdo",  28_000_000, 1, "veterano", "Outro"),
      p("Declan Rice",         103, "Primeiro-Volante",  48_000_000, 1, "veterano", "Inglês"),
      p("Martin Odegaard",     103, "Segundo-Volante",   48_000_000, 1, "veterano", "Outro"),
      p("Kai Havertz",         103, "Meia-Armador",      34_000_000, 2, "joia",     "Alemão"),
      p("Bukayo Saka",         103, "Ponta-Direita",     50_000_000, 1, "veterano", "Inglês"),
      p("Gabriel Martinelli",  103, "Ponta-Esquerdo",    42_000_000, 1, "veterano", "Brasileiro"),
      p("Leandro Trossard",    103, "Centroavante",      24_000_000, 2, "joia",     "Belga"),
      // Reservas
      p("Karl Hein",           103, "Goleiro",            6_000_000, 3, "operario", "Outro",     true),
      p("Takehiro Tomiyasu",   103, "Zaga-1",            14_000_000, 2, "joia",     "Outro",     true),
      p("Jakub Kiwior",        103, "Zaga-2",            12_000_000, 2, "joia",     "Outro",     true),
      p("Jurrien Timber",      103, "Lateral-Direito",   22_000_000, 2, "joia",     "Holandês",  true),
      p("Kieran Tierney",      103, "Lateral-Esquerdo",  10_000_000, 2, "joia",     "Outro",     true),
      p("Mohamed Elneny",      103, "Primeiro-Volante",   7_000_000, 3, "operario", "Africano",  true),
      p("Fabio Vieira",        103, "Segundo-Volante",   14_000_000, 2, "joia",     "Português", true),
      p("Emile Smith Rowe",    103, "Meia-Armador",      20_000_000, 2, "joia",     "Inglês",    true),
      p("Reiss Nelson",        103, "Ponta-Direita",     10_000_000, 3, "operario", "Inglês",    true),
      p("Eddie Nketiah",       103, "Ponta-Esquerdo",    14_000_000, 2, "joia",     "Inglês",    true),
      p("Gabriel Jesus",       103, "Centroavante",      28_000_000, 2, "joia",     "Brasileiro",true),
    ]

    // ── 104: CHELSEA 2025-26 ────────────────────────────────────────────
    case 104: return [
      p("Robert Sanchez",      104, "Goleiro",           20_000_000, 2, "joia",     "Espanhol"),
      p("Levi Colwill",        104, "Zaga-1",            30_000_000, 2, "joia",     "Inglês"),
      p("Benoit Badiashile",   104, "Zaga-2",            24_000_000, 2, "joia",     "Francês"),
      p("Reece James",         104, "Lateral-Direito",   40_000_000, 1, "veterano", "Inglês"),
      p("Marc Cucurella",      104, "Lateral-Esquerdo",  18_000_000, 2, "joia",     "Espanhol"),
      p("Moises Caicedo",      104, "Primeiro-Volante",  48_000_000, 1, "veterano", "Colombiano"),
      p("Enzo Fernández",      104, "Segundo-Volante",   40_000_000, 1, "veterano", "Argentino"),
      p("Cole Palmer",         104, "Meia-Armador",      50_000_000, 1, "veterano", "Inglês"),
      p("Noni Madueke",        104, "Ponta-Direita",     26_000_000, 2, "joia",     "Inglês"),
      p("Pedro Neto",          104, "Ponta-Esquerdo",    30_000_000, 2, "joia",     "Português"),
      p("Nicolas Jackson",     104, "Centroavante",      30_000_000, 2, "joia",     "Africano"),
      // Reservas
      p("Djordje Petrovic",    104, "Goleiro",           10_000_000, 3, "operario", "Outro",     true),
      p("Axel Disasi",         104, "Zaga-1",            14_000_000, 2, "joia",     "Francês",   true),
      p("Trevoh Chalobah",     104, "Zaga-2",            10_000_000, 3, "operario", "Inglês",    true),
      p("Malo Gusto",          104, "Lateral-Direito",   16_000_000, 2, "joia",     "Francês",   true),
      p("Ben Chilwell",        104, "Lateral-Esquerdo",  14_000_000, 3, "operario", "Inglês",    true),
      p("Lesley Ugochukwu",    104, "Primeiro-Volante",  10_000_000, 3, "operario", "Francês",   true),
      p("Conor Gallagher",     104, "Segundo-Volante",   18_000_000, 2, "joia",     "Inglês",    true),
      p("Mykhailo Mudryk",     104, "Meia-Armador",      22_000_000, 2, "joia",     "Outro",     true),
      p("Raheem Sterling",     104, "Ponta-Direita",     12_000_000, 3, "operario", "Inglês",    true),
      p("Christopher Nkunku",  104, "Ponta-Esquerdo",    26_000_000, 2, "joia",     "Francês",   true),
      p("Armando Broja",       104, "Centroavante",      12_000_000, 3, "operario", "Outro",     true),
    ]

    // ── 105: MANCHESTER UNITED 2025-26 ──────────────────────────────────
    case 105: return [
      p("Andre Onana",         105, "Goleiro",           24_000_000, 2, "joia",     "Africano"),
      p("Lisandro Martínez",   105, "Zaga-1",            38_000_000, 1, "veterano", "Argentino"),
      p("Matthijs de Ligt",    105, "Zaga-2",            30_000_000, 2, "joia",     "Holandês"),
      p("Diogo Dalot",         105, "Lateral-Direito",   20_000_000, 2, "joia",     "Português"),
      p("Luke Shaw",           105, "Lateral-Esquerdo",  16_000_000, 2, "joia",     "Inglês"),
      p("Casemiro",            105, "Primeiro-Volante",  22_000_000, 2, "joia",     "Brasileiro"),
      p("Kobbie Mainoo",       105, "Segundo-Volante",   36_000_000, 1, "veterano", "Inglês"),
      p("Bruno Fernandes",     105, "Meia-Armador",      40_000_000, 1, "veterano", "Português"),
      p("Alejandro Garnacho",  105, "Ponta-Direita",     24_000_000, 2, "joia",     "Argentino"),
      p("Marcus Rashford",     105, "Ponta-Esquerdo",    32_000_000, 1, "veterano", "Inglês"),
      p("Rasmus Hojlund",      105, "Centroavante",      34_000_000, 1, "veterano", "Outro"),
      // Reservas
      p("Altay Bayindir",      105, "Goleiro",            8_000_000, 3, "operario", "Outro",     true),
      p("Victor Lindelof",     105, "Zaga-1",            10_000_000, 3, "operario", "Outro",     true),
      p("Harry Maguire",       105, "Zaga-2",            10_000_000, 3, "operario", "Inglês",    true),
      p("Aaron Wan-Bissaka",   105, "Lateral-Direito",   10_000_000, 3, "operario", "Inglês",    true),
      p("Tyrell Malacia",      105, "Lateral-Esquerdo",  10_000_000, 3, "operario", "Holandês",  true),
      p("Christian Eriksen",   105, "Primeiro-Volante",  12_000_000, 3, "operario", "Outro",     true),
      p("Mason Mount",         105, "Segundo-Volante",   14_000_000, 2, "joia",     "Inglês",    true),
      p("Jonny Evans",         105, "Meia-Armador",       6_000_000, 3, "operario", "Outro",     true),
      p("Amad Diallo",         105, "Ponta-Direita",     18_000_000, 2, "joia",     "Africano",  true),
      p("Facundo Pellistri",   105, "Ponta-Esquerdo",     8_000_000, 3, "operario", "Uruguaio",  true),
      p("Joshua Zirkzee",      105, "Centroavante",      26_000_000, 2, "joia",     "Holandês",  true),
    ]

    // ── 106: TOTTENHAM 2025-26 ──────────────────────────────────────────
    case 106: return [
      p("Guglielmo Vicario",   106, "Goleiro",           24_000_000, 2, "joia",     "Italiano"),
      p("Micky van de Ven",    106, "Zaga-1",            38_000_000, 1, "veterano", "Holandês"),
      p("Cristian Romero",     106, "Zaga-2",            38_000_000, 1, "veterano", "Argentino"),
      p("Pedro Porro",         106, "Lateral-Direito",   28_000_000, 2, "joia",     "Espanhol"),
      p("Destiny Udogie",      106, "Lateral-Esquerdo",  28_000_000, 2, "joia",     "Italiano"),
      p("Yves Bissouma",       106, "Primeiro-Volante",  22_000_000, 2, "joia",     "Africano"),
      p("Rodrigo Bentancur",   106, "Segundo-Volante",   28_000_000, 2, "joia",     "Uruguaio"),
      p("Dejan Kulusevski",    106, "Meia-Armador",      32_000_000, 2, "joia",     "Outro"),
      p("Son Heung-min",       106, "Ponta-Direita",     28_000_000, 2, "joia",     "Outro"),
      p("Brennan Johnson",     106, "Ponta-Esquerdo",    26_000_000, 2, "joia",     "Outro"),
      p("Richarlison",         106, "Centroavante",      28_000_000, 2, "joia",     "Brasileiro"),
      // Reservas
      p("Brandon Austin",      106, "Goleiro",            5_000_000, 3, "operario", "Inglês",    true),
      p("Eric Dier",           106, "Zaga-1",             8_000_000, 3, "operario", "Inglês",    true),
      p("Joe Rodon",           106, "Zaga-2",            10_000_000, 3, "operario", "Outro",     true),
      p("Emerson Royal",       106, "Lateral-Direito",   10_000_000, 3, "operario", "Brasileiro",true),
      p("Ryan Sessegnon",      106, "Lateral-Esquerdo",  12_000_000, 2, "joia",     "Inglês",    true),
      p("Oliver Skipp",        106, "Primeiro-Volante",  10_000_000, 3, "operario", "Inglês",    true),
      p("Pape Sarr",           106, "Segundo-Volante",   12_000_000, 2, "joia",     "Africano",  true),
      p("James Maddison",      106, "Meia-Armador",      20_000_000, 2, "joia",     "Inglês",    true),
      p("Manor Solomon",       106, "Ponta-Direita",      6_000_000, 3, "operario", "Outro",     true),
      p("Timo Werner",         106, "Ponta-Esquerdo",    10_000_000, 3, "operario", "Alemão",    true),
      p("Alejo Veliz",         106, "Centroavante",      10_000_000, 3, "operario", "Argentino", true),
    ]

    // ── 107: NEWCASTLE 2025-26 ──────────────────────────────────────────
    case 107: return [
      p("Nick Pope",           107, "Goleiro",           24_000_000, 2, "joia",     "Inglês"),
      p("Fabian Schar",        107, "Zaga-1",            20_000_000, 2, "joia",     "Outro"),
      p("Sven Botman",         107, "Zaga-2",            30_000_000, 2, "joia",     "Holandês"),
      p("Kieran Trippier",     107, "Lateral-Direito",   24_000_000, 2, "joia",     "Inglês"),
      p("Dan Burn",            107, "Lateral-Esquerdo",  14_000_000, 2, "joia",     "Inglês"),
      p("Bruno Guimarães",     107, "Primeiro-Volante",  48_000_000, 1, "veterano", "Brasileiro"),
      p("Joelinton",           107, "Segundo-Volante",   22_000_000, 2, "joia",     "Brasileiro"),
      p("Sean Longstaff",      107, "Meia-Armador",      14_000_000, 2, "joia",     "Inglês"),
      p("Harvey Barnes",       107, "Ponta-Direita",     22_000_000, 2, "joia",     "Inglês"),
      p("Anthony Gordon",      107, "Ponta-Esquerdo",    30_000_000, 2, "joia",     "Inglês"),
      p("Alexander Isak",      107, "Centroavante",      40_000_000, 1, "veterano", "Outro"),
      // Reservas
      p("Martin Dubravka",     107, "Goleiro",            8_000_000, 3, "operario", "Outro",     true),
      p("Jamaal Lascelles",    107, "Zaga-1",             8_000_000, 3, "operario", "Inglês",    true),
      p("Valentino Livramento",107, "Zaga-2",            14_000_000, 2, "joia",     "Português", true),
      p("Matt Targett",        107, "Lateral-Direito",    8_000_000, 3, "operario", "Inglês",    true),
      p("Lewis Hall",          107, "Lateral-Esquerdo",  10_000_000, 3, "operario", "Inglês",    true),
      p("Jonjo Shelvey",       107, "Primeiro-Volante",   6_000_000, 3, "operario", "Inglês",    true),
      p("Elliot Anderson",     107, "Segundo-Volante",    8_000_000, 3, "operario", "Inglês",    true),
      p("Joe Willock",         107, "Meia-Armador",      10_000_000, 3, "operario", "Inglês",    true),
      p("Miguel Almiron",      107, "Ponta-Direita",     14_000_000, 2, "joia",     "Paraguaio", true),
      p("Jacob Murphy",        107, "Ponta-Esquerdo",    10_000_000, 3, "operario", "Inglês",    true),
      p("Callum Wilson",       107, "Centroavante",      14_000_000, 2, "joia",     "Inglês",    true),
    ]

    // ── 108: ASTON VILLA 2025-26 ────────────────────────────────────────
    case 108: return [
      p("Emiliano Martínez",   108, "Goleiro",           38_000_000, 1, "veterano", "Argentino"),
      p("Pau Torres",          108, "Zaga-1",            30_000_000, 2, "joia",     "Espanhol"),
      p("Ezri Konsa",          108, "Zaga-2",            26_000_000, 2, "joia",     "Inglês"),
      p("Matty Cash",          108, "Lateral-Direito",   22_000_000, 2, "joia",     "Inglês"),
      p("Lucas Digne",         108, "Lateral-Esquerdo",  16_000_000, 2, "joia",     "Francês"),
      p("John McGinn",         108, "Primeiro-Volante",  22_000_000, 2, "joia",     "Outro"),
      p("Douglas Luiz",        108, "Segundo-Volante",   26_000_000, 2, "joia",     "Brasileiro"),
      p("Jacob Ramsey",        108, "Meia-Armador",      22_000_000, 2, "joia",     "Inglês"),
      p("Leon Bailey",         108, "Ponta-Direita",     22_000_000, 2, "joia",     "Outro"),
      p("Moussa Diaby",        108, "Ponta-Esquerdo",    30_000_000, 2, "joia",     "Francês"),
      p("Ollie Watkins",       108, "Centroavante",      42_000_000, 1, "veterano", "Inglês"),
      // Reservas
      p("Robin Olsen",         108, "Goleiro",            6_000_000, 3, "operario", "Outro",     true),
      p("Tyrone Mings",        108, "Zaga-1",            10_000_000, 3, "operario", "Inglês",    true),
      p("Diego Carlos",        108, "Zaga-2",            12_000_000, 2, "joia",     "Brasileiro",true),
      p("Calum Chambers",      108, "Lateral-Direito",    6_000_000, 3, "operario", "Inglês",    true),
      p("Alex Moreno",         108, "Lateral-Esquerdo",  10_000_000, 3, "operario", "Espanhol",  true),
      p("Leandro Dendoncker",  108, "Primeiro-Volante",   8_000_000, 3, "operario", "Belga",     true),
      p("Boubacar Kamara",     108, "Segundo-Volante",   16_000_000, 2, "joia",     "Francês",   true),
      p("Emiliano Buendía",    108, "Meia-Armador",      14_000_000, 2, "joia",     "Argentino", true),
      p("Bertrand Traoré",     108, "Ponta-Direita",      8_000_000, 3, "operario", "Africano",  true),
      p("Philippe Coutinho",   108, "Ponta-Esquerdo",     9_000_000, 3, "operario", "Brasileiro",true),
      p("Cameron Archer",      108, "Centroavante",      10_000_000, 3, "operario", "Inglês",    true),
    ]

    // ── 109: WEST HAM 2025-26 ───────────────────────────────────────────
    case 109: return [
      p("Alphonse Aréola",     109, "Goleiro",           14_000_000, 2, "joia",     "Francês"),
      p("Kurt Zouma",          109, "Zaga-1",            14_000_000, 2, "joia",     "Francês"),
      p("Max Kilman",          109, "Zaga-2",            20_000_000, 2, "joia",     "Inglês"),
      p("Ben Johnson",         109, "Lateral-Direito",   10_000_000, 3, "operario", "Inglês"),
      p("Emerson Palmieri",    109, "Lateral-Esquerdo",  12_000_000, 2, "joia",     "Italiano"),
      p("Edson Álvarez",       109, "Primeiro-Volante",  28_000_000, 2, "joia",     "Outro"),
      p("James Ward-Prowse",   109, "Segundo-Volante",   16_000_000, 2, "joia",     "Inglês"),
      p("Lucas Paquetá",       109, "Meia-Armador",      32_000_000, 2, "joia",     "Brasileiro"),
      p("Jarrod Bowen",        109, "Ponta-Direita",     26_000_000, 2, "joia",     "Inglês"),
      p("Mohammed Kudus",      109, "Ponta-Esquerdo",    26_000_000, 2, "joia",     "Africano"),
      p("Michail Antonio",     109, "Centroavante",      12_000_000, 2, "joia",     "Outro"),
      // Reservas
      p("Lukasz Fabianski",    109, "Goleiro",            6_000_000, 3, "operario", "Outro",     true),
      p("Angelo Ogbonna",      109, "Zaga-1",             6_000_000, 3, "operario", "Italiano",  true),
      p("Craig Dawson",        109, "Zaga-2",             6_000_000, 3, "operario", "Inglês",    true),
      p("Vladimir Coufal",     109, "Lateral-Direito",    8_000_000, 3, "operario", "Outro",     true),
      p("Aaron Cresswell",     109, "Lateral-Esquerdo",   6_000_000, 3, "operario", "Inglês",    true),
      p("Flynn Downes",        109, "Primeiro-Volante",   8_000_000, 3, "operario", "Inglês",    true),
      p("Tomáš Souček",        109, "Segundo-Volante",   12_000_000, 2, "joia",     "Outro",     true),
      p("Said Benrahma",       109, "Meia-Armador",      12_000_000, 2, "joia",     "Africano",  true),
      p("Danny Ings",          109, "Ponta-Direita",     10_000_000, 3, "operario", "Inglês",    true),
      p("Maxwel Cornet",       109, "Ponta-Esquerdo",    10_000_000, 3, "operario", "Africano",  true),
      p("Divin Mubama",        109, "Centroavante",       6_000_000, 3, "operario", "Inglês",    true),
    ]

    // ── 110: BRIGHTON 2025-26 ───────────────────────────────────────────
    case 110: return [
      p("Bart Verbruggen",     110, "Goleiro",           28_000_000, 2, "joia",     "Holandês"),
      p("Lewis Dunk",          110, "Zaga-1",            14_000_000, 2, "joia",     "Inglês"),
      p("Adam Webster",        110, "Zaga-2",            14_000_000, 2, "joia",     "Inglês"),
      p("Tariq Lamptey",       110, "Lateral-Direito",   16_000_000, 2, "joia",     "Inglês"),
      p("Pervis Estupiñán",    110, "Lateral-Esquerdo",  22_000_000, 2, "joia",     "Colombiano"),
      p("Carlos Baleba",       110, "Primeiro-Volante",  24_000_000, 2, "joia",     "Africano"),
      p("Mahmoud Dahoud",      110, "Segundo-Volante",   14_000_000, 2, "joia",     "Alemão"),
      p("Pascal Groß",         110, "Meia-Armador",      14_000_000, 2, "joia",     "Alemão"),
      p("Kaoru Mitoma",        110, "Ponta-Direita",     24_000_000, 2, "joia",     "Outro"),
      p("Facundo Buonanotte",  110, "Ponta-Esquerdo",    14_000_000, 2, "joia",     "Argentino"),
      p("Danny Welbeck",       110, "Centroavante",      10_000_000, 3, "operario", "Inglês"),
      // Reservas
      p("Carl Rushworth",      110, "Goleiro",            5_000_000, 3, "operario", "Inglês",    true),
      p("Joel Veltman",        110, "Zaga-1",             8_000_000, 3, "operario", "Holandês",  true),
      p("Jan Paul van Hecke",  110, "Zaga-2",            12_000_000, 2, "joia",     "Holandês",  true),
      p("Ian Ferguson",        110, "Lateral-Direito",    6_000_000, 3, "operario", "Inglês",    true),
      p("Levi Colwill",        110, "Lateral-Esquerdo",  10_000_000, 3, "operario", "Inglês",    true),
      p("James Milner",        110, "Primeiro-Volante",   5_000_000, 3, "operario", "Inglês",    true),
      p("Solly March",         110, "Segundo-Volante",   12_000_000, 2, "joia",     "Inglês",    true),
      p("Evan Ferguson",       110, "Meia-Armador",      14_000_000, 2, "joia",     "Outro",     true),
      p("Julio Enciso",        110, "Ponta-Direita",     12_000_000, 2, "joia",     "Paraguaio", true),
      p("João Pedro",          110, "Ponta-Esquerdo",    18_000_000, 2, "joia",     "Brasileiro",true),
      p("Deniz Undav",         110, "Centroavante",      14_000_000, 2, "joia",     "Alemão",    true),
    ]

    default: return []
  }
}
