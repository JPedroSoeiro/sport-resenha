"use client"

import { useGame } from "@/lib/game-context"
import { FIELD_POSITIONS, POSITION_ORDER, POSITION_LABELS, type Position } from "@/lib/game-types"
import { cn } from "@/lib/utils"

// ─── Grupos de posição ────────────────────────────────────────────────────────
type PosGroup = "GK" | "DEF" | "MID" | "FWD"

function posGroup(pos: Position): PosGroup {
  if (pos === "Goleiro") return "GK"
  if (pos === "Zaga-1" || pos === "Zaga-2" || pos === "Lateral-Direito" || pos === "Lateral-Esquerdo") return "DEF"
  if (pos === "Primeiro-Volante" || pos === "Segundo-Volante" || pos === "Meia-Armador") return "MID"
  return "FWD"
}

// ─── Silhuetas SVG por grupo ──────────────────────────────────────────────────
function Silhouette({ group, size }: { group: PosGroup; size: number }) {
  const s = size * 0.58
  const viewH = 28

  if (group === "GK") return (
    <svg width={s} height={s * viewH / 22} viewBox="0 0 22 28" fill="currentColor" style={{ opacity: 0.92 }}>
      {/* head */}
      <circle cx="11" cy="3.5" r="3" />
      {/* body */}
      <path d="M11 7 L11 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      {/* arms spread wide — GK signature pose */}
      <path d="M3 9 L11 8 L19 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* gloves (circles at arm tips) */}
      <circle cx="3" cy="9" r="1.4" />
      <circle cx="19" cy="9" r="1.4" />
      {/* legs */}
      <path d="M11 17 L8 24 M11 17 L14 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )

  if (group === "DEF") return (
    <svg width={s} height={s * viewH / 22} viewBox="0 0 22 28" fill="currentColor" style={{ opacity: 0.92 }}>
      {/* head */}
      <circle cx="11" cy="3.5" r="3" />
      {/* body solid/blocked */}
      <path d="M11 7 L11 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* arms slightly forward — blocking stance */}
      <path d="M5.5 11 L11 9.5 L16.5 11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {/* fists */}
      <circle cx="5.5" cy="11" r="1.2" />
      <circle cx="16.5" cy="11" r="1.2" />
      {/* legs solid, close together */}
      <path d="M11 17 L9 24 M11 17 L13 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )

  if (group === "MID") return (
    <svg width={s} height={s * viewH / 22} viewBox="0 0 22 28" fill="currentColor" style={{ opacity: 0.92 }}>
      {/* head */}
      <circle cx="11" cy="3.5" r="3" />
      {/* body leaning slightly forward */}
      <path d="M11 7 L10.5 17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      {/* arms: one forward, one back — running */}
      <path d="M6 8.5 L10.5 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.5 10 L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* legs striding */}
      <path d="M10.5 17 L7 24 M10.5 17 L14.5 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )

  // FWD — kicking pose
  return (
    <svg width={s} height={s * viewH / 22} viewBox="0 0 22 28" fill="currentColor" style={{ opacity: 0.92 }}>
      {/* head tilted */}
      <circle cx="12" cy="3.5" r="3" />
      {/* body leaning */}
      <path d="M11 7 L10 16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      {/* arms flying — attacking */}
      <path d="M5 9 L10 8.5 M11 8.5 L17 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* plant leg + kicking leg */}
      <path d="M10 16 L9 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M10 16 L15.5 20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      {/* ball hint */}
      <circle cx="17" cy="21.5" r="2" opacity="0.5" />
    </svg>
  )
}

// ─── Cores por tier ────────────────────────────────────────────────────────────
const TIER_NODE: Record<1 | 2 | 3, string> = {
  1: "bg-amber-500 border-amber-300 text-amber-950 tier-1-glow",
  2: "bg-slate-400 border-slate-200 text-slate-900 tier-2-glow",
  3: "bg-orange-800 border-orange-600 text-orange-100 tier-3-glow",
}

interface TacticalFieldProps {
  teamId: number
  activePosition?: Position
  compact?: boolean
}

export function TacticalField({ teamId, activePosition, compact = false }: TacticalFieldProps) {
  const { getPlayerForPosition, getReserveForPosition, isPositionBlocked } = useGame()

  const fieldH = compact ? 220 : 360

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden border border-white/10"
      style={{ height: fieldH }}
    >
      {/* Grass */}
      <div className="absolute inset-0 field-bg opacity-90" />

      {/* Field lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect x="2" y="2" width="96" height="96" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="12" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4" />
        <line x1="2" y1="50" x2="98" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
        <rect x="25" y="2"  width="50" height="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
        <rect x="25" y="82" width="50" height="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
        <rect x="37" y="2"  width="26" height="6"  fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
        <rect x="37" y="92" width="26" height="6"  fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
      </svg>

      {/* Player nodes */}
      {POSITION_ORDER.map(pos => {
        const coords = FIELD_POSITIONS[pos]
        const player = getPlayerForPosition(teamId, pos)
        const reserve = getReserveForPosition(teamId, pos)
        const blocked = isPositionBlocked(teamId, pos)
        const isActive = pos === activePosition
        const isEmpty = !player

        const nodePlayer = player || reserve
        const isReserveActivated = player?.activatedFromReserve
        const lostAuction = player?.lostAuction

        const nodeSize = compact ? 28 : 38

        return (
          <div
            key={pos}
            className="absolute flex flex-col items-center gap-0.5 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${coords.left}%`, top: `${coords.top}%` }}
          >
            {/* Node */}
            <div
              className={cn(
                "rounded-full border-2 flex items-center justify-center transition-all overflow-hidden",
                nodePlayer
                  ? lostAuction
                    ? "bg-red-700 border-red-400 text-white"
                    : isReserveActivated
                    ? "bg-amber-600 border-amber-300 text-amber-950"
                    : TIER_NODE[nodePlayer.tier as 1 | 2 | 3]
                  : "bg-white/10 border-white/20 text-white/30",
                isActive && !isEmpty && "pulse-active ring-2 ring-white/60",
                blocked && "opacity-60"
              )}
              style={{ width: nodeSize, height: nodeSize }}
              title={nodePlayer ? `${nodePlayer.name} (T${nodePlayer.tier})` : POSITION_LABELS[pos]}
            >
              {nodePlayer ? (
                <Silhouette group={posGroup(pos)} size={nodeSize} />
              ) : (
                <span className="text-white/40 font-bold" style={{ fontSize: compact ? 7 : 8 }}>?</span>
              )}
            </div>

            {/* Player name label */}
            {!compact && nodePlayer && (
              <div
                className={cn(
                  "px-1.5 py-0.5 rounded text-white font-medium whitespace-nowrap",
                  lostAuction ? "bg-red-800/90" : isReserveActivated ? "bg-amber-700/90" : "bg-black/70"
                )}
                style={{ fontSize: 8, maxWidth: 68 }}
              >
                <span className="truncate block">{nodePlayer.name.split(" ")[0]}</span>
              </div>
            )}

            {/* Empty label */}
            {isEmpty && !compact && (
              <div className="text-white/25 font-mono" style={{ fontSize: 7 }}>
                {POSITION_LABELS[pos].split(" ")[0]}
              </div>
            )}
          </div>
        )
      })}

      {/* Active position chip */}
      {activePosition && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-sm">
          <span className="text-white font-bold uppercase tracking-widest" style={{ fontSize: 8 }}>
            {POSITION_LABELS[activePosition]}
          </span>
        </div>
      )}
    </div>
  )
}
