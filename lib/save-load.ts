/**
 * Utilitários de salvar/carregar partida via Base64.
 *
 * O único campo que não serializa diretamente é `validate` nos decretos
 * (é uma função). A solução: salvar apenas o `id` e reconstruir a função
 * ao carregar usando DECREES_POOL.
 */
import type { GameState, PresidentialDecree, Team } from "./game-types"
import { DECREES_POOL } from "./data/cards-pool"

// ─── Encode / Decode Base64 seguro para unicode ───────────────────────────────

function encode(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p) =>
      String.fromCharCode(parseInt(p, 16))
    )
  )
}

function decode(b64: string): string {
  return decodeURIComponent(
    atob(b64)
      .split("")
      .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  )
}

// ─── Decreto sem função (serializável) ───────────────────────────────────────

type DecreeSnapshot = Omit<PresidentialDecree, "validate">

function stripDecree(d: PresidentialDecree): DecreeSnapshot {
  const { validate: _, ...rest } = d
  return rest
}

function restoreDecree(snap: DecreeSnapshot): PresidentialDecree {
  const template = DECREES_POOL.find(t => t.id === snap.id)
  return {
    ...(template ?? { validate: () => true, penaltyMessage: "" }),
    ...snap,
  }
}

// ─── Serializar ───────────────────────────────────────────────────────────────

export function serializeState(state: GameState): string {
  const payload = {
    ...state,
    decreePool: state.decreePool.map(stripDecree),
    teams: state.teams.map(team => ({
      ...team,
      presidentialDecree: team.presidentialDecree ? stripDecree(team.presidentialDecree) : null,
    })),
    // bidding.player pode conter objetos serializáveis — OK
  }
  return encode(JSON.stringify(payload))
}

// ─── Deserializar ─────────────────────────────────────────────────────────────

export function deserializeState(code: string): GameState | null {
  try {
    const raw = JSON.parse(decode(code.trim()))

    const decreePool: PresidentialDecree[] = (raw.decreePool ?? []).map(
      (d: DecreeSnapshot) => restoreDecree(d)
    )

    const teams: Team[] = (raw.teams ?? []).map((team: Team & { presidentialDecree: DecreeSnapshot | null }) => ({
      ...team,
      presidentialDecree: team.presidentialDecree ? restoreDecree(team.presidentialDecree) : null,
    }))

    return { ...raw, decreePool, teams } as GameState
  } catch {
    return null
  }
}

// ─── Copiar para a área de transferência ──────────────────────────────────────

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback para navegadores antigos
    const el = document.createElement("textarea")
    el.value = text
    el.style.position = "fixed"
    el.style.opacity = "0"
    document.body.appendChild(el)
    el.select()
    const ok = document.execCommand("copy")
    document.body.removeChild(el)
    return ok
  }
}
