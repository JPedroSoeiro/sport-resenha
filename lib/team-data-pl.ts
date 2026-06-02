// Premier League Teams — 10 clubs with 11 Titulares + 11 Reservas each
// Valores europeus: T1 → 28-50M, T2 → 14-28M, T3 → 5-12M
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

export function getPLTeamPlayers(teamId: number): Player[] {
  _id = (teamId - 100) * 22 + 1000

  switch (teamId) {
    // ── 101: MANCHESTER CITY ─────────────────────────────────────────────
    case 101: return [
      p("Ederson",           101, "Goleiro",           28_000_000, 1, "veterano", "Brasileiro"),
      p("Rúben Dias",        101, "Zaga-1",            40_000_000, 1, "veterano", "Português"),
      p("Manuel Akanji",     101, "Zaga-2",            36_000_000, 1, "veterano", "Espanhol"),
      p("Kyle Walker",       101, "Lateral-Direito",   24_000_000, 1, "veterano", "Espanhol"),
      p("Joao Cancelo",      101, "Lateral-Esquerdo",  30_000_000, 1, "veterano", "Português"),
      p("Rodri MCI",         101, "Primeiro-Volante",  46_000_000, 1, "veterano", "Espanhol"),
      p("Kevin De Bruyne",   101, "Segundo-Volante",   40_000_000, 1, "veterano", "Espanhol"),
      p("Bernardo Silva",    101, "Meia-Armador",      40_000_000, 1, "veterano", "Português"),
      p("Phil Foden",        101, "Ponta-Direita",     46_000_000, 1, "veterano", "Espanhol"),
      p("Jack Grealish MCI", 101, "Ponta-Esquerdo",    22_000_000, 2, "joia",     "Espanhol"),
      p("Erling Haaland",    101, "Centroavante",      50_000_000, 1, "veterano", "Espanhol"),
      // Reservas
      p("Stefan Ortega",     101, "Goleiro",            8_000_000, 3, "operario", "Espanhol", true),
      p("John Stones",       101, "Zaga-1",            18_000_000, 2, "joia",     "Espanhol", true),
      p("Josko Gvardiol",    101, "Zaga-2",            28_000_000, 2, "joia",     "Espanhol", true),
      p("Rico Lewis",        101, "Lateral-Direito",   14_000_000, 2, "joia",     "Espanhol", true),
      p("Oscar Bobb",        101, "Lateral-Esquerdo",  10_000_000, 3, "operario", "Espanhol", true),
      p("Matheus Nunes",     101, "Primeiro-Volante",  20_000_000, 2, "joia",     "Português", true),
      p("Ilkay Gundogan",    101, "Segundo-Volante",   16_000_000, 2, "joia",     "Espanhol", true),
      p("James McAtee",      101, "Meia-Armador",       8_000_000, 3, "operario", "Espanhol", true),
      p("Jeremy Doku",       101, "Ponta-Direita",     20_000_000, 2, "joia",     "Espanhol", true),
      p("Savinho",           101, "Ponta-Esquerdo",    18_000_000, 2, "joia",     "Brasileiro", true),
      p("Julian Alvarez MCI",101, "Centroavante",      36_000_000, 2, "joia",     "Argentino", true),
    ]

    // ── 102: LIVERPOOL ───────────────────────────────────────────────────
    case 102: return [
      p("Alisson",           102, "Goleiro",           42_000_000, 1, "veterano", "Brasileiro"),
      p("Virgil van Dijk",   102, "Zaga-1",            42_000_000, 1, "veterano", "Espanhol"),
      p("Ibrahima Konate",   102, "Zaga-2",            32_000_000, 1, "veterano", "Espanhol"),
      p("Trent A-Arnold",    102, "Lateral-Direito",   46_000_000, 1, "veterano", "Espanhol"),
      p("Andrew Robertson",  102, "Lateral-Esquerdo",  28_000_000, 1, "veterano", "Espanhol"),
      p("Wataru Endo",       102, "Primeiro-Volante",  24_000_000, 1, "veterano", "Espanhol"),
      p("Alexis Mac Allister",102,"Segundo-Volante",   38_000_000, 1, "veterano", "Argentino"),
      p("Dominik Szoboszlai",102, "Meia-Armador",      32_000_000, 2, "joia",     "Espanhol"),
      p("Mohamed Salah",     102, "Ponta-Direita",     48_000_000, 1, "veterano", "Espanhol"),
      p("Luis Diaz",         102, "Ponta-Esquerdo",    42_000_000, 1, "veterano", "Colombiano"),
      p("Darwin Nunez",      102, "Centroavante",      40_000_000, 1, "veterano", "Uruguaio"),
      // Reservas
      p("Caoimhin Kelleher", 102, "Goleiro",           10_000_000, 3, "operario", "Espanhol", true),
      p("Joe Gomez",         102, "Zaga-1",            14_000_000, 2, "joia",     "Espanhol", true),
      p("Jarell Quansah",    102, "Zaga-2",            12_000_000, 2, "joia",     "Espanhol", true),
      p("Conor Bradley",     102, "Lateral-Direito",   14_000_000, 2, "joia",     "Espanhol", true),
      p("Kostas Tsimikas",   102, "Lateral-Esquerdo",  10_000_000, 3, "operario", "Espanhol", true),
      p("Ryan Gravenberch",  102, "Primeiro-Volante",  22_000_000, 2, "joia",     "Espanhol", true),
      p("Stefan Bajcetic",   102, "Segundo-Volante",    8_000_000, 3, "operario", "Espanhol", true),
      p("Harvey Elliott",    102, "Meia-Armador",      10_000_000, 3, "operario", "Espanhol", true),
      p("Cody Gakpo",        102, "Ponta-Direita",     28_000_000, 2, "joia",     "Espanhol", true),
      p("Ben Doak",          102, "Ponta-Esquerdo",     8_000_000, 3, "operario", "Espanhol", true),
      p("Diogo Jota",        102, "Centroavante",      26_000_000, 2, "joia",     "Português", true),
    ]

    // ── 103: ARSENAL ─────────────────────────────────────────────────────
    case 103: return [
      p("David Raya",        103, "Goleiro",           36_000_000, 1, "veterano", "Espanhol"),
      p("William Saliba",    103, "Zaga-1",            46_000_000, 1, "veterano", "Espanhol"),
      p("Gabriel Magalhaes", 103, "Zaga-2",            42_000_000, 1, "veterano", "Brasileiro"),
      p("Ben White",         103, "Lateral-Direito",   32_000_000, 1, "veterano", "Espanhol"),
      p("Oleksandr Zinchenko",103,"Lateral-Esquerdo",  28_000_000, 1, "veterano", "Espanhol"),
      p("Declan Rice",       103, "Primeiro-Volante",  46_000_000, 1, "veterano", "Espanhol"),
      p("Martin Odegaard",   103, "Segundo-Volante",   46_000_000, 1, "veterano", "Espanhol"),
      p("Kai Havertz",       103, "Meia-Armador",      32_000_000, 2, "joia",     "Espanhol"),
      p("Bukayo Saka",       103, "Ponta-Direita",     50_000_000, 1, "veterano", "Espanhol"),
      p("Gabriel Martinelli",103, "Ponta-Esquerdo",    40_000_000, 1, "veterano", "Brasileiro"),
      p("Leandro Trossard ARS",103,"Centroavante",     22_000_000, 2, "joia",     "Espanhol"),
      // Reservas
      p("Karl Hein",         103, "Goleiro",            6_000_000, 3, "operario", "Espanhol", true),
      p("Takehiro Tomiyasu", 103, "Zaga-1",            14_000_000, 2, "joia",     "Espanhol", true),
      p("Jakub Kiwior",      103, "Zaga-2",            12_000_000, 2, "joia",     "Espanhol", true),
      p("Ben H ARS",         103, "Lateral-Direito",    6_000_000, 3, "operario", "Espanhol", true),
      p("Kieran Tierney",    103, "Lateral-Esquerdo",  12_000_000, 2, "joia",     "Espanhol", true),
      p("Mohamed Elneny",    103, "Primeiro-Volante",   8_000_000, 3, "operario", "Espanhol", true),
      p("Fabio Vieira",      103, "Segundo-Volante",   14_000_000, 2, "joia",     "Português", true),
      p("Emile Smith Rowe",  103, "Meia-Armador",      20_000_000, 2, "joia",     "Espanhol", true),
      p("Reiss Nelson",      103, "Ponta-Direita",     10_000_000, 3, "operario", "Espanhol", true),
      p("Eddie Nketiah",     103, "Ponta-Esquerdo",    14_000_000, 2, "joia",     "Espanhol", true),
      p("Gabriel Jesus",     103, "Centroavante",      28_000_000, 2, "joia",     "Brasileiro", true),
    ]

    // ── 104: CHELSEA ─────────────────────────────────────────────────────
    case 104: return [
      p("Robert Sanchez",    104, "Goleiro",           20_000_000, 2, "joia",     "Espanhol"),
      p("Thiago Silva",      104, "Zaga-1",            12_000_000, 2, "joia",     "Brasileiro"),
      p("Levi Colwill",      104, "Zaga-2",            30_000_000, 2, "joia",     "Espanhol"),
      p("Reece James",       104, "Lateral-Direito",   38_000_000, 1, "veterano", "Espanhol"),
      p("Ben Chilwell CHE",  104, "Lateral-Esquerdo",  16_000_000, 2, "joia",     "Espanhol"),
      p("Moises Caicedo",    104, "Primeiro-Volante",  46_000_000, 1, "veterano", "Colombiano"),
      p("Enzo Fernandez",    104, "Segundo-Volante",   38_000_000, 1, "veterano", "Argentino"),
      p("Cole Palmer",       104, "Meia-Armador",      46_000_000, 1, "veterano", "Espanhol"),
      p("Noni Madueke",      104, "Ponta-Direita",     24_000_000, 2, "joia",     "Espanhol"),
      p("Pedro Neto",        104, "Ponta-Esquerdo",    28_000_000, 2, "joia",     "Português"),
      p("Nicolas Jackson",   104, "Centroavante",      28_000_000, 2, "joia",     "Espanhol"),
      // Reservas
      p("Djordje Petrovic",  104, "Goleiro",           10_000_000, 3, "operario", "Espanhol", true),
      p("Axel Disasi",       104, "Zaga-1",            14_000_000, 2, "joia",     "Espanhol", true),
      p("Trevoh Chalobah",   104, "Zaga-2",            10_000_000, 3, "operario", "Espanhol", true),
      p("Malo Gusto",        104, "Lateral-Direito",   16_000_000, 2, "joia",     "Espanhol", true),
      p("Marc Cucurella",    104, "Lateral-Esquerdo",  18_000_000, 2, "joia",     "Espanhol", true),
      p("Lesley Ugochukwu",  104, "Primeiro-Volante",  10_000_000, 3, "operario", "Espanhol", true),
      p("Conor Gallagher",   104, "Segundo-Volante",   18_000_000, 2, "joia",     "Espanhol", true),
      p("Mykhailo Mudryk",   104, "Meia-Armador",      20_000_000, 2, "joia",     "Espanhol", true),
      p("Raheem Sterling",   104, "Ponta-Direita",     12_000_000, 3, "operario", "Espanhol", true),
      p("C. Nkunku",         104, "Ponta-Esquerdo",    24_000_000, 2, "joia",     "Espanhol", true),
      p("Armando Broja",     104, "Centroavante",      12_000_000, 3, "operario", "Espanhol", true),
    ]

    // ── 105: MANCHESTER UNITED ───────────────────────────────────────────
    case 105: return [
      p("Andre Onana",       105, "Goleiro",           24_000_000, 2, "joia",     "Colombiano"),
      p("Raphael Varane",    105, "Zaga-1",            16_000_000, 2, "joia",     "Espanhol"),
      p("Lisandro Martinez", 105, "Zaga-2",            36_000_000, 1, "veterano", "Argentino"),
      p("Diogo Dalot",       105, "Lateral-Direito",   18_000_000, 2, "joia",     "Português"),
      p("Luke Shaw",         105, "Lateral-Esquerdo",  16_000_000, 2, "joia",     "Espanhol"),
      p("Casemiro MUN",      105, "Primeiro-Volante",  24_000_000, 2, "joia",     "Brasileiro"),
      p("Kobbie Mainoo",     105, "Segundo-Volante",   34_000_000, 1, "veterano", "Espanhol"),
      p("Bruno Fernandes",   105, "Meia-Armador",      38_000_000, 1, "veterano", "Português"),
      p("Antony",            105, "Ponta-Direita",     16_000_000, 2, "joia",     "Brasileiro"),
      p("Marcus Rashford",   105, "Ponta-Esquerdo",    32_000_000, 1, "veterano", "Espanhol"),
      p("Rasmus Hojlund",    105, "Centroavante",      32_000_000, 1, "veterano", "Espanhol"),
      // Reservas
      p("Altay Bayindir",    105, "Goleiro",            8_000_000, 3, "operario", "Espanhol", true),
      p("Victor Lindelof",   105, "Zaga-1",            10_000_000, 3, "operario", "Espanhol", true),
      p("Harry Maguire",     105, "Zaga-2",            10_000_000, 3, "operario", "Espanhol", true),
      p("Wan-Bissaka",       105, "Lateral-Direito",   10_000_000, 3, "operario", "Espanhol", true),
      p("Tyrell Malacia",    105, "Lateral-Esquerdo",  10_000_000, 3, "operario", "Espanhol", true),
      p("Christian Eriksen", 105, "Primeiro-Volante",  12_000_000, 3, "operario", "Espanhol", true),
      p("Mason Mount",       105, "Segundo-Volante",   14_000_000, 2, "joia",     "Espanhol", true),
      p("Jonny Evans",       105, "Meia-Armador",       6_000_000, 3, "operario", "Espanhol", true),
      p("A. Garnacho",       105, "Ponta-Direita",     22_000_000, 2, "joia",     "Argentino", true),
      p("Facundo Pellistri", 105, "Ponta-Esquerdo",     8_000_000, 3, "operario", "Uruguaio", true),
      p("Joshua Zirkzee",    105, "Centroavante",      24_000_000, 2, "joia",     "Espanhol", true),
    ]

    // ── 106: TOTTENHAM ───────────────────────────────────────────────────
    case 106: return [
      p("G. Vicario",        106, "Goleiro",           24_000_000, 2, "joia",     "Espanhol"),
      p("Micky van de Ven",  106, "Zaga-1",            36_000_000, 1, "veterano", "Espanhol"),
      p("Cristian Romero",   106, "Zaga-2",            36_000_000, 1, "veterano", "Argentino"),
      p("Pedro Porro",       106, "Lateral-Direito",   26_000_000, 2, "joia",     "Espanhol"),
      p("Destiny Udogie",    106, "Lateral-Esquerdo",  26_000_000, 2, "joia",     "Espanhol"),
      p("Yves Bissouma",     106, "Primeiro-Volante",  20_000_000, 2, "joia",     "Espanhol"),
      p("R. Bentancur",      106, "Segundo-Volante",   28_000_000, 2, "joia",     "Uruguaio"),
      p("D. Kulusevski",     106, "Meia-Armador",      30_000_000, 2, "joia",     "Espanhol"),
      p("Son Heung-min",     106, "Ponta-Direita",     28_000_000, 2, "joia",     "Espanhol"),
      p("B. Johnson TOT",    106, "Ponta-Esquerdo",    24_000_000, 2, "joia",     "Espanhol"),
      p("Richarlison",       106, "Centroavante",      28_000_000, 2, "joia",     "Brasileiro"),
      // Reservas
      p("Brandon Austin",    106, "Goleiro",            5_000_000, 3, "operario", "Espanhol", true),
      p("Eric Dier",         106, "Zaga-1",             8_000_000, 3, "operario", "Espanhol", true),
      p("Joe Rodon",         106, "Zaga-2",            10_000_000, 3, "operario", "Espanhol", true),
      p("Emerson Royal TOT", 106, "Lateral-Direito",   10_000_000, 3, "operario", "Brasileiro", true),
      p("Ryan Sessegnon",    106, "Lateral-Esquerdo",  12_000_000, 2, "joia",     "Espanhol", true),
      p("Oliver Skipp",      106, "Primeiro-Volante",  10_000_000, 3, "operario", "Espanhol", true),
      p("Pape Sarr",         106, "Segundo-Volante",   12_000_000, 2, "joia",     "Espanhol", true),
      p("James Maddison TOT",106, "Meia-Armador",      20_000_000, 2, "joia",     "Espanhol", true),
      p("Manor Solomon",     106, "Ponta-Direita",      6_000_000, 3, "operario", "Espanhol", true),
      p("Timo Werner TOT",   106, "Ponta-Esquerdo",    10_000_000, 3, "operario", "Espanhol", true),
      p("Alejo Veliz",       106, "Centroavante",      10_000_000, 3, "operario", "Argentino", true),
    ]

    // ── 107: NEWCASTLE ───────────────────────────────────────────────────
    case 107: return [
      p("Nick Pope",         107, "Goleiro",           24_000_000, 2, "joia",     "Espanhol"),
      p("Fabian Schar",      107, "Zaga-1",            20_000_000, 2, "joia",     "Espanhol"),
      p("Sven Botman",       107, "Zaga-2",            28_000_000, 2, "joia",     "Espanhol"),
      p("Kieran Trippier",   107, "Lateral-Direito",   24_000_000, 2, "joia",     "Espanhol"),
      p("Dan Burn",          107, "Lateral-Esquerdo",  14_000_000, 2, "joia",     "Espanhol"),
      p("Bruno Guimaraes",   107, "Primeiro-Volante",  46_000_000, 1, "veterano", "Brasileiro"),
      p("Joelinton",         107, "Segundo-Volante",   22_000_000, 2, "joia",     "Brasileiro"),
      p("Sean Longstaff",    107, "Meia-Armador",      14_000_000, 2, "joia",     "Espanhol"),
      p("Harvey Barnes",     107, "Ponta-Direita",     22_000_000, 2, "joia",     "Espanhol"),
      p("Anthony Gordon",    107, "Ponta-Esquerdo",    28_000_000, 2, "joia",     "Espanhol"),
      p("Alexander Isak",    107, "Centroavante",      36_000_000, 1, "veterano", "Espanhol"),
      // Reservas
      p("Martin Dubravka",   107, "Goleiro",            8_000_000, 3, "operario", "Espanhol", true),
      p("Jamaal Lascelles",  107, "Zaga-1",             8_000_000, 3, "operario", "Espanhol", true),
      p("Tino Livramento",   107, "Zaga-2",            12_000_000, 2, "joia",     "Português", true),
      p("Matt Targett",      107, "Lateral-Direito",    8_000_000, 3, "operario", "Espanhol", true),
      p("Lewis Hall",        107, "Lateral-Esquerdo",  10_000_000, 3, "operario", "Espanhol", true),
      p("Jonjo Shelvey",     107, "Primeiro-Volante",   6_000_000, 3, "operario", "Espanhol", true),
      p("Elliot Anderson",   107, "Segundo-Volante",    8_000_000, 3, "operario", "Espanhol", true),
      p("Joe Willock",       107, "Meia-Armador",      10_000_000, 3, "operario", "Espanhol", true),
      p("Miguel Almiron",    107, "Ponta-Direita",     14_000_000, 2, "joia",     "Paraguaio", true),
      p("Jacob Murphy",      107, "Ponta-Esquerdo",    10_000_000, 3, "operario", "Espanhol", true),
      p("Callum Wilson",     107, "Centroavante",      14_000_000, 2, "joia",     "Espanhol", true),
    ]

    // ── 108: ASTON VILLA ─────────────────────────────────────────────────
    case 108: return [
      p("Emiliano Martinez", 108, "Goleiro",           36_000_000, 1, "veterano", "Argentino"),
      p("Pau Torres",        108, "Zaga-1",            28_000_000, 2, "joia",     "Espanhol"),
      p("Ezri Konsa",        108, "Zaga-2",            24_000_000, 2, "joia",     "Espanhol"),
      p("Matty Cash",        108, "Lateral-Direito",   20_000_000, 2, "joia",     "Espanhol"),
      p("Lucas Digne AVL",   108, "Lateral-Esquerdo",  16_000_000, 2, "joia",     "Espanhol"),
      p("John McGinn",       108, "Primeiro-Volante",  20_000_000, 2, "joia",     "Espanhol"),
      p("Douglas Luiz",      108, "Segundo-Volante",   24_000_000, 2, "joia",     "Brasileiro"),
      p("Jacob Ramsey",      108, "Meia-Armador",      20_000_000, 2, "joia",     "Espanhol"),
      p("Leon Bailey",       108, "Ponta-Direita",     20_000_000, 2, "joia",     "Espanhol"),
      p("Moussa Diaby",      108, "Ponta-Esquerdo",    28_000_000, 2, "joia",     "Espanhol"),
      p("Ollie Watkins",     108, "Centroavante",      40_000_000, 1, "veterano", "Espanhol"),
      // Reservas
      p("Robin Olsen",       108, "Goleiro",            6_000_000, 3, "operario", "Espanhol", true),
      p("Tyrone Mings",      108, "Zaga-1",            10_000_000, 3, "operario", "Espanhol", true),
      p("Diego Carlos",      108, "Zaga-2",            12_000_000, 2, "joia",     "Brasileiro", true),
      p("Calum Chambers",    108, "Lateral-Direito",    6_000_000, 3, "operario", "Espanhol", true),
      p("Alex Moreno",       108, "Lateral-Esquerdo",  10_000_000, 3, "operario", "Espanhol", true),
      p("L. Dendoncker",     108, "Primeiro-Volante",   8_000_000, 3, "operario", "Espanhol", true),
      p("B. Kamara",         108, "Segundo-Volante",   16_000_000, 2, "joia",     "Espanhol", true),
      p("Emiliano Buendia",  108, "Meia-Armador",      14_000_000, 2, "joia",     "Argentino", true),
      p("Bertrand Traore",   108, "Ponta-Direita",      8_000_000, 3, "operario", "Espanhol", true),
      p("P. Coutinho",       108, "Ponta-Esquerdo",    10_000_000, 3, "operario", "Brasileiro", true),
      p("Cameron Archer",    108, "Centroavante",      10_000_000, 3, "operario", "Espanhol", true),
    ]

    // ── 109: WEST HAM ────────────────────────────────────────────────────
    case 109: return [
      p("Alphonse Areola",   109, "Goleiro",           14_000_000, 2, "joia",     "Espanhol"),
      p("Kurt Zouma",        109, "Zaga-1",            14_000_000, 2, "joia",     "Espanhol"),
      p("Max Kilman",        109, "Zaga-2",            18_000_000, 2, "joia",     "Espanhol"),
      p("Ben Johnson",       109, "Lateral-Direito",   10_000_000, 3, "operario", "Espanhol"),
      p("Emerson Palmieri",  109, "Lateral-Esquerdo",  12_000_000, 2, "joia",     "Brasileiro"),
      p("Edson Alvarez",     109, "Primeiro-Volante",  28_000_000, 2, "joia",     "Uruguaio"),
      p("J. Ward-Prowse",    109, "Segundo-Volante",   16_000_000, 2, "joia",     "Espanhol"),
      p("Lucas Paqueta",     109, "Meia-Armador",      30_000_000, 2, "joia",     "Brasileiro"),
      p("Jarrod Bowen",      109, "Ponta-Direita",     26_000_000, 2, "joia",     "Espanhol"),
      p("Mohammed Kudus",    109, "Ponta-Esquerdo",    24_000_000, 2, "joia",     "Espanhol"),
      p("Michail Antonio",   109, "Centroavante",      12_000_000, 2, "joia",     "Espanhol"),
      // Reservas
      p("Lukasz Fabianski",  109, "Goleiro",            6_000_000, 3, "operario", "Espanhol", true),
      p("Angelo Ogbonna",    109, "Zaga-1",             6_000_000, 3, "operario", "Espanhol", true),
      p("Craig Dawson",      109, "Zaga-2",             6_000_000, 3, "operario", "Espanhol", true),
      p("Vladimir Coufal",   109, "Lateral-Direito",    8_000_000, 3, "operario", "Espanhol", true),
      p("Aaron Cresswell",   109, "Lateral-Esquerdo",   6_000_000, 3, "operario", "Espanhol", true),
      p("Flynn Downes",      109, "Primeiro-Volante",   8_000_000, 3, "operario", "Espanhol", true),
      p("Tomas Soucek",      109, "Segundo-Volante",   12_000_000, 2, "joia",     "Espanhol", true),
      p("Said Benrahma",     109, "Meia-Armador",      12_000_000, 2, "joia",     "Espanhol", true),
      p("Danny Ings",        109, "Ponta-Direita",     10_000_000, 3, "operario", "Espanhol", true),
      p("Maxwel Cornet",     109, "Ponta-Esquerdo",    10_000_000, 3, "operario", "Colombiano", true),
      p("Divin Mubama",      109, "Centroavante",       6_000_000, 3, "operario", "Espanhol", true),
    ]

    // ── 110: BRIGHTON ────────────────────────────────────────────────────
    case 110: return [
      p("Jason Steele",      110, "Goleiro",           10_000_000, 3, "operario", "Espanhol"),
      p("Lewis Dunk",        110, "Zaga-1",            14_000_000, 2, "joia",     "Espanhol"),
      p("Adam Webster",      110, "Zaga-2",            14_000_000, 2, "joia",     "Espanhol"),
      p("Tariq Lamptey",     110, "Lateral-Direito",   16_000_000, 2, "joia",     "Espanhol"),
      p("Pervis Estupinan",  110, "Lateral-Esquerdo",  22_000_000, 2, "joia",     "Colombiano"),
      p("Carlos Baleba",     110, "Primeiro-Volante",  24_000_000, 2, "joia",     "Colombiano"),
      p("Mahmoud Dahoud",    110, "Segundo-Volante",   14_000_000, 2, "joia",     "Espanhol"),
      p("Pascal Gross",      110, "Meia-Armador",      14_000_000, 2, "joia",     "Espanhol"),
      p("Kaoru Mitoma",      110, "Ponta-Direita",     22_000_000, 2, "joia",     "Espanhol"),
      p("F. Buonanotte",     110, "Ponta-Esquerdo",    14_000_000, 2, "joia",     "Argentino"),
      p("Danny Welbeck",     110, "Centroavante",      10_000_000, 3, "operario", "Espanhol"),
      // Reservas
      p("Carl Rushworth",    110, "Goleiro",            5_000_000, 3, "operario", "Espanhol", true),
      p("Joel Veltman",      110, "Zaga-1",             8_000_000, 3, "operario", "Espanhol", true),
      p("Jan Paul van Hecke",110, "Zaga-2",            12_000_000, 2, "joia",     "Espanhol", true),
      p("Ian Ferguson",      110, "Lateral-Direito",    6_000_000, 3, "operario", "Espanhol", true),
      p("Levi Colwill BHA",  110, "Lateral-Esquerdo",  10_000_000, 3, "operario", "Espanhol", true),
      p("James Milner",      110, "Primeiro-Volante",   6_000_000, 3, "operario", "Espanhol", true),
      p("Solly March",       110, "Segundo-Volante",   12_000_000, 2, "joia",     "Espanhol", true),
      p("Evan Ferguson",     110, "Meia-Armador",      14_000_000, 2, "joia",     "Espanhol", true),
      p("Julio Enciso",      110, "Ponta-Direita",     12_000_000, 2, "joia",     "Paraguaio", true),
      p("Joao Pedro BHA",    110, "Ponta-Esquerdo",    16_000_000, 2, "joia",     "Brasileiro", true),
      p("Deniz Undav",       110, "Centroavante",      14_000_000, 2, "joia",     "Espanhol", true),
    ]

    default: return []
  }
}
