export type ChampionshipId = "brasileirao" | "premier-league"

export interface ChampionshipConfig {
  id: ChampionshipId
  name: string
  country: string
  flag: string
  description: string
  poolRegion: "sul-americana" | "europa"
}

export const CHAMPIONSHIPS: ChampionshipConfig[] = [
  {
    id: "brasileirao",
    name: "Brasileirão",
    country: "Brasil",
    flag: "🇧🇷",
    description: "Campeonato Brasileiro Série A — mercado sul-americano",
    poolRegion: "sul-americana",
  },
  {
    id: "premier-league",
    name: "Premier League",
    country: "Inglaterra",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    description: "English Premier League — mercado europeu",
    poolRegion: "europa",
  },
]
