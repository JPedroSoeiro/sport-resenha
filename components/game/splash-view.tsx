"use client"

import { useState } from "react"
import { useGame } from "@/lib/game-context"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { deserializeState, copyToClipboard } from "@/lib/save-load"
import { Trophy, Play, Upload, X, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function SplashView() {
  const { dispatch } = useGame()
  const [showLoad, setShowLoad] = useState(false)
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleLoad = () => {
    if (!code.trim()) { setError("Cole o código de save acima."); return }
    const state = deserializeState(code.trim())
    if (!state) { setError("Código inválido ou corrompido. Tente novamente."); return }
    dispatch({ type: "LOAD_STATE", state })
  }

  return (
    <div className="relative min-h-screen bg-background flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Theme toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
        {/* Logo */}
        <div className="flex items-center justify-center w-24 h-24 rounded-3xl bg-primary/10 border-2 border-primary/30 mb-6 shadow-lg">
          <Trophy className="w-12 h-12 text-primary" />
        </div>

        {/* Title */}
        <h1
          className="text-5xl font-bold text-foreground tracking-tight mb-2"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          SPORT RESENHA
        </h1>
        <p className="text-lg text-muted-foreground mb-1">Gerente de Futebol</p>
        <p className="text-sm text-muted-foreground/60 mb-10">
          Monte seu elenco, vença leilões e supere os rivais
        </p>

        {/* Main buttons */}
        {!showLoad ? (
          <div className="flex flex-col gap-4 w-full">
            <Button
              onClick={() => dispatch({ type: "ADVANCE_FROM_SPLASH" })}
              className="h-14 text-lg font-bold w-full"
            >
              <Play className="w-5 h-5 mr-2" />
              Iniciar Partida
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowLoad(true)}
              className="h-12 text-base font-semibold w-full"
            >
              <Upload className="w-5 h-5 mr-2" />
              Carregar Partida Salva
            </Button>
          </div>
        ) : (
          /* Load panel */
          <div className="w-full bg-card border border-border rounded-2xl p-5 shadow-lg text-left">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-foreground text-base">Carregar Partida</h2>
              <button
                onClick={() => { setShowLoad(false); setCode(""); setError(null) }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              Cole o código de save gerado pelo botão{" "}
              <span className="font-semibold text-foreground">Salvar Partida</span>{" "}
              durante o jogo:
            </p>

            <textarea
              value={code}
              onChange={e => { setCode(e.target.value); setError(null) }}
              placeholder="Cole o código aqui..."
              rows={5}
              className={cn(
                "w-full rounded-lg border bg-input text-foreground text-xs font-mono p-3 resize-none outline-none transition-all",
                "focus:ring-2 focus:ring-primary/50 focus:border-primary",
                error ? "border-destructive" : "border-border"
              )}
            />

            {error && (
              <div className="flex items-center gap-2 mt-2 text-destructive text-xs">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                {error}
              </div>
            )}

            <div className="flex gap-3 mt-4">
              <Button
                variant="outline"
                onClick={() => { setShowLoad(false); setCode(""); setError(null) }}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleLoad}
                disabled={!code.trim()}
                className="flex-1 font-bold"
              >
                <Upload className="w-4 h-4 mr-2" />
                Carregar
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="absolute bottom-4 text-xs text-muted-foreground/40">
        Sport Resenha · Gerente de Futebol · Modo Local Multiplayer
      </p>
    </div>
  )
}
