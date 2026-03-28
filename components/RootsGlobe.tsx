'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const ROUTE_POINTS = [
  { lat: 51.47, lng: -0.4543, color: '#94a3b8' },
  { lat: 43.6777, lng: -79.6248, color: '#7dd3fc' },
]

const ROUTE_ARCS = [
  {
    startLat: 51.47,
    startLng: -0.4543,
    endLat: 43.6777,
    endLng: -79.6248,
  },
]

export default function RootsGlobe() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let globeInstance: { width: (value: number) => unknown; height: (value: number) => unknown; globeMaterial: () => unknown; controls: () => any } | null = null
    let disposed = false

    const setSize = () => {
      globeInstance?.width(container.clientWidth)
      globeInstance?.height(container.clientHeight)
    }

    const loadGlobe = async () => {
      const module = await import('globe.gl')
      if (disposed) return

      const Globe = module.default as any

      const globe = Globe()(container)
        .backgroundColor('rgba(0,0,0,0)')
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .showAtmosphere(true)
        .atmosphereColor('#9dd6ff')
        .atmosphereAltitude(0.2)
        .pointsData(ROUTE_POINTS)
        .pointLat('lat')
        .pointLng('lng')
        .pointColor('color')
        .pointAltitude(0.045)
        .pointRadius(0.82)
        .arcsData(ROUTE_ARCS)
        .arcColor(() => ['#cbd5e1', '#7dd3fc'])
        .arcAltitude(0.36)
        .arcStroke(1.25)
        .arcDashLength(0.6)
        .arcDashGap(0.75)
        .arcDashInitialGap(() => 0.15)
        .arcDashAnimateTime(1700)
        .pointOfView({ lat: 49, lng: -35, altitude: 2.05 }, 0)

      globeInstance = globe

      const material = globe.globeMaterial() as THREE.MeshPhongMaterial
      material.color = new THREE.Color('#f8fbff')
      material.emissive = new THREE.Color('#0f172a')
      material.emissiveIntensity = 0.08
      material.shininess = 6
      material.specular = new THREE.Color('#dbeafe')

      const controls = globe.controls()
      controls.enablePan = false
      controls.enableZoom = false
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.45

      setSize()
      setIsReady(true)
      window.addEventListener('resize', setSize)
    }

    loadGlobe()

    return () => {
      disposed = true
      setIsReady(false)
      window.removeEventListener('resize', setSize)
      container.innerHTML = ''
    }
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.98),rgba(226,232,240,0.92)_32%,rgba(191,219,254,0.32)_52%,rgba(15,23,42,0.9)_100%)] dark:bg-[radial-gradient(circle_at_50%_42%,rgba(51,65,85,0.92),rgba(30,41,59,0.95)_32%,rgba(14,116,144,0.18)_52%,rgba(2,6,23,1)_100%)]">
      <div className="absolute inset-0 rounded-[1.5rem] border border-white/40 dark:border-white/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(255,255,255,0.45),transparent_36%)] dark:bg-[radial-gradient(circle_at_50%_36%,rgba(125,211,252,0.08),transparent_36%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.2),transparent_28%,transparent_68%,rgba(255,255,255,0.08))]" />
      <div className="absolute inset-x-[18%] top-[20%] h-[58%] rounded-full border border-white/24 dark:border-white/10" />
      <div className="absolute inset-x-[23%] top-[27%] h-[44%] rounded-full border border-white/16 dark:border-white/8" />
      <div className="absolute left-[18%] right-[18%] top-1/2 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent dark:via-white/10" />
      <div className="absolute left-[26%] right-[26%] top-[36%] h-px bg-gradient-to-r from-transparent via-white/14 to-transparent dark:via-white/8" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,transparent_38%,rgba(15,23,42,0.08)_70%,rgba(15,23,42,0.22)_100%)] dark:bg-[radial-gradient(circle_at_50%_55%,transparent_38%,rgba(2,6,23,0.14)_70%,rgba(2,6,23,0.32)_100%)]" />
      <div className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl dark:bg-[#7dd3fc]/10" />
      <div className="absolute left-[23.5%] top-[56.5%] z-20 h-2.5 w-2.5 rounded-full bg-slate-300 shadow-[0_0_0_4px_rgba(255,255,255,0.35)] dark:bg-slate-100 dark:shadow-[0_0_0_4px_rgba(15,23,42,0.35)]" />
      <div className="absolute right-[20.5%] top-[40.5%] z-20 h-3 w-3 rounded-full bg-[#7dd3fc] shadow-[0_0_0_5px_rgba(125,211,252,0.2)]" />
      <div
        ref={containerRef}
        className={`absolute inset-0 z-10 transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="pointer-events-none absolute left-[16%] top-[60%] z-20 rounded-full border border-white/45 bg-white/82 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-slate-700 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-900/78 dark:text-slate-100">
        LHR
      </div>
      <div className="pointer-events-none absolute right-[13%] top-[39%] z-20 rounded-full border border-primary/30 bg-white/86 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-primary shadow-sm backdrop-blur-md dark:border-[#7dd3fc]/30 dark:bg-slate-900/82 dark:text-[#7dd3fc]">
        YYZ
      </div>
    </div>
  )
}
