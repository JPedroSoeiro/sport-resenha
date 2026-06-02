"use client"

import { useGame } from "@/lib/game-context"
import { FIELD_POSITIONS, POSITION_ORDER, POSITION_SHORT, type Position } from "@/lib/game-types"
import { cn } from "@/lib/utils"

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
        {/* Outer border */}
        <rect x="2" y="2" width="96" height="96" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
        {/* Centre circle */}
        <circle cx="50" cy="50" r="12" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4" />
        <line x1="2" y1="50" x2="98" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
        {/* Penalty areas */}
        <rect x="25" y="2"  width="50" height="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
        <rect x="25" y="82" width="50" height="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4" />
        {/* Goal areas */}
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

        const nodeSize = compact ? 28 : 36
        const fontSize = compact ? 7 : 9

        return (
          <div
            key={pos}
            className="absolute flex flex-col items-center gap-0.5 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${coords.left}%`, top: `${coords.top}%` }}
          >
            {/* Node circle */}
            <div
              className={cn(
                "rounded-full border-2 flex items-center justify-center font-bold transition-all",
                nodePlayer
                  ? lostAuction
                    ? "bg-red-700 border-red-400 text-white"
                    : isReserveActivated
                    ? "bg-amber-600 border-amber-300 text-amber-950"
                    : TIER_NODE[nodePlayer.tier as 1 | 2 | 3]
                  : "bg-white/10 border-white/20 text-white/40",
                isActive && !isEmpty && "pulse-active ring-2 ring-white/60",
                blocked && "opacity-60"
              )}
              style={{ width: nodeSize, height: nodeSize, fontSize }}
              title={nodePlayer ? `${nodePlayer.name} (T${nodePlayer.tier})` : pos}
            >
              {POSITION_SHORT[pos]}
            </div>

            {/* Player name label */}
            {!compact && nodePlayer && (
              <div
                className={cn(
                  "px-1.5 py-0.5 rounded text-white font-medium whitespace-nowrap",
                  lostAuction ? "bg-red-800/90" : isReserveActivated ? "bg-amber-700/90" : "bg-black/70"
                )}
                style={{ fontSize: 8, maxWidth: 64 }}
              >
                <span className="truncate block">{nodePlayer.name.split(" ")[0]}</span>
              </div>
            )}

            {/* Empty slot indicator */}
            {isEmpty && !compact && (
              <div className="text-white/30 font-medium" style={{ fontSize: 7 }}>
                {POSITION_SHORT[pos]}
              </div>
            )}
          </div>
        )
      })}

      {/* Active position overlay label */}
      {activePosition && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-sm">
          <span className="text-white font-bold uppercase tracking-widest" style={{ fontSize: 9 }}>
            Em Jogo: {activePosition}
          </span>
        </div>
      )}
    </div>
  )
}
