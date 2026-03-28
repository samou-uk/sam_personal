'use client'

import { useEffect, useRef, useState } from 'react'

// Orthographic projection — North Atlantic centred
const C  = { lat: 48, lng: -37 }
const R  = 170    // globe radius in SVG units
const CX = 200
const CY = 200

const LHR = { lat: 51.477, lng: -0.461  }
const YYZ = { lat: 43.677, lng: -79.630 }


function rad(d: number) { return (d * Math.PI) / 180 }

function project(lat: number, lng: number): [number, number] | null {
  const φ = rad(lat), λ = rad(lng)
  const φ0 = rad(C.lat), λ0 = rad(C.lng)
  const dλ = λ - λ0
  const dot = Math.sin(φ) * Math.sin(φ0) + Math.cos(φ) * Math.cos(φ0) * Math.cos(dλ)
  if (dot < 0) return null
  return [
    CX + R * Math.cos(φ) * Math.sin(dλ),
    CY - R * (Math.sin(φ) * Math.cos(φ0) - Math.cos(φ) * Math.sin(φ0) * Math.cos(dλ)),
  ]
}

function buildPath(pts: ([number, number] | null)[]): string {
  let d = '', open = false
  for (const p of pts) {
    if (!p) { open = false; continue }
    d += open
      ? `L${p[0].toFixed(1)},${p[1].toFixed(1)}`
      : `M${p[0].toFixed(1)},${p[1].toFixed(1)}`
    open = true
  }
  return d
}

function latLine(lat: number): string {
  const pts: ([number, number] | null)[] = []
  for (let lng = -180; lng <= 180; lng += 3) pts.push(project(lat, lng))
  return buildPath(pts)
}

function lngLine(lng: number): string {
  const pts: ([number, number] | null)[] = []
  for (let lat = -85; lat <= 85; lat += 2) pts.push(project(lat, lng))
  return buildPath(pts)
}

function greatCircleArc(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
  steps = 80,
): string {
  const φ1 = rad(lat1), λ1 = rad(lng1)
  const φ2 = rad(lat2), λ2 = rad(lng2)
  const d = Math.acos(
    Math.max(-1, Math.min(1,
      Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1)
    ))
  )
  if (d < 0.001) return ''
  const pts: ([number, number] | null)[] = []
  for (let i = 0; i <= steps; i++) {
    const f = i / steps
    const A = Math.sin((1 - f) * d) / Math.sin(d)
    const B = Math.sin(f * d) / Math.sin(d)
    const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2)
    const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2)
    const z = A * Math.sin(φ1) + B * Math.sin(φ2)
    pts.push(project(
      Math.atan2(z, Math.sqrt(x * x + y * y)) * 180 / Math.PI,
      Math.atan2(y, x) * 180 / Math.PI,
    ))
  }
  return buildPath(pts)
}

export default function RouteGlobe() {
  const arcRef  = useRef<SVGPathElement>(null)
  const [arcLen, setArcLen] = useState(0)
  const [drawn,  setDrawn]  = useState(false)

  const arcPath = greatCircleArc(LHR.lat, LHR.lng, YYZ.lat, YYZ.lng)
  const lhr = project(LHR.lat, LHR.lng)
  const yyz = project(YYZ.lat, YYZ.lng)

  const grid: string[] = []
  for (const lat of [0, 20, 40, 60, 80])        grid.push(latLine(lat))
  for (const lng of [-160,-120,-80,-40, 0, 40])  grid.push(lngLine(lng))

  useEffect(() => {
    if (!arcRef.current) return
    const len = arcRef.current.getTotalLength()
    setArcLen(len)
    const t = setTimeout(() => setDrawn(true), 300)
    return () => clearTimeout(t)
  }, [arcPath])

  return (
    <div className="relative w-full h-full bg-slate-950">
      <svg viewBox="0 0 400 400" className="w-full h-full" aria-hidden>
        <defs>
          {/* Deep-space globe fill */}
          <radialGradient id="rg-fill" cx="36%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#1a3a5c" />
            <stop offset="45%"  stopColor="#0d1f3a" />
            <stop offset="100%" stopColor="#020817" />
          </radialGradient>

          {/* Limb darkening — darkens edges for sphere depth */}
          <radialGradient id="rg-limb" cx="50%" cy="50%" r="50%">
            <stop offset="52%"  stopColor="transparent" />
            <stop offset="80%"  stopColor="rgba(0,0,0,0.32)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.70)" />
          </radialGradient>

          {/* Subtle specular top-left */}
          <radialGradient id="rg-spec" cx="33%" cy="27%" r="40%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.055)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Atmosphere halo just outside rim */}
          <radialGradient id="rg-atmo" cx="50%" cy="50%" r="50%">
            <stop offset="88%"  stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(125,211,252,0.16)" />
          </radialGradient>

          <clipPath id="rg-clip">
            <circle cx={CX} cy={CY} r={R} />
          </clipPath>
        </defs>

        {/* Globe fill */}
        <circle cx={CX} cy={CY} r={R} fill="url(#rg-fill)" />

        {/* Grid lines */}
        <g clipPath="url(#rg-clip)" fill="none" stroke="#7dd3fc" strokeWidth="0.4" opacity="0.16">
          {grid.map((d, i) => d && <path key={i} d={d} />)}
        </g>

        {/* Limb darkening */}
        <circle cx={CX} cy={CY} r={R} fill="url(#rg-limb)" />

        {/* Specular gloss */}
        <circle cx={CX} cy={CY} r={R} fill="url(#rg-spec)" clipPath="url(#rg-clip)" />

        {/* Atmosphere halo */}
        <circle cx={CX} cy={CY} r={R + 7} fill="url(#rg-atmo)" />

        {/* Globe rim */}
        <circle cx={CX} cy={CY} r={R} fill="none" stroke="#7dd3fc" strokeWidth="0.8" opacity="0.25" />

        {/* ── Arc (draw-in animation) ── */}
        {arcPath && (
          <>
            {/* Wide soft glow behind the arc */}
            <path
              d={arcPath}
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="8"
              opacity={drawn ? 0.12 : 0}
              clipPath="url(#rg-clip)"
              style={{ transition: drawn ? 'opacity 0.6s ease-out 1.8s' : 'none' }}
            />
            {/* Main arc line */}
            <path
              ref={arcRef}
              id="rg-arc"
              d={arcPath}
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeDasharray={arcLen || 1000}
              strokeDashoffset={drawn ? 0 : (arcLen || 1000)}
              opacity="0.92"
              clipPath="url(#rg-clip)"
              style={{
                transition: drawn
                  ? 'stroke-dashoffset 2.2s cubic-bezier(0.4, 0, 0.2, 1)'
                  : 'none',
              }}
            />
          </>
        )}

        {/* ── Plane dot — loops along the route after arc draws ── */}
        {arcPath && drawn && (
          <g clipPath="url(#rg-clip)">
            {/* outer glow */}
            <circle r="5" fill="#7dd3fc" opacity="0.25">
              <animateMotion dur="3.8s" repeatCount="indefinite" begin="2.4s">
                <mpath href="#rg-arc" />
              </animateMotion>
            </circle>
            {/* inner dot */}
            <circle r="2.4" fill="#e0f2fe">
              <animateMotion dur="3.8s" repeatCount="indefinite" begin="2.4s">
                <mpath href="#rg-arc" />
              </animateMotion>
            </circle>
          </g>
        )}

        {/* ── LHR ── */}
        {lhr && (
          <>
            <circle cx={lhr[0]} cy={lhr[1]} r={5.5} fill="#7dd3fc" opacity="0.18" />
            <circle cx={lhr[0]} cy={lhr[1]} r={2.6} fill="#7dd3fc" />
            <text x={lhr[0] + 7} y={lhr[1] - 3}
              fill="#cbd5e1" fontSize="9" fontFamily="system-ui,sans-serif" letterSpacing="1.8">
              LHR
            </text>
            <text x={lhr[0] + 7} y={lhr[1] + 7}
              fill="#64748b" fontSize="6.5" fontFamily="system-ui,sans-serif">
              London
            </text>
          </>
        )}

        {/* ── YYZ ── */}
        {yyz && (
          <>
            <circle cx={yyz[0]} cy={yyz[1]} r={5.5} fill="#7dd3fc" opacity="0.18" />
            <circle cx={yyz[0]} cy={yyz[1]} r={2.6} fill="#7dd3fc" />
            <text x={yyz[0] - 6} y={yyz[1] + 17}
              fill="#cbd5e1" fontSize="9" fontFamily="system-ui,sans-serif" letterSpacing="1.8">
              YYZ
            </text>
            <text x={yyz[0] - 10} y={yyz[1] + 27}
              fill="#64748b" fontSize="6.5" fontFamily="system-ui,sans-serif">
              Toronto
            </text>
          </>
        )}
      </svg>

      {/* Route badge */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3.5 py-1.5 text-[9px] uppercase tracking-[0.22em] text-slate-400 backdrop-blur-sm">
        <span className="h-1 w-1 rounded-full bg-sky-400" />
        LHR → YYZ
      </div>
    </div>
  )
}
