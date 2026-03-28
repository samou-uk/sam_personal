'use client'

import { useEffect, useRef } from 'react'

const LHR = { lat: 51.477,  lng: -0.461  }
const YYZ = { lat: 43.677,  lng: -79.630 }

// Great-circle SLERP: returns [lat, lng] at fraction t along the arc
function gcPoint(t: number): [number, number] {
  const toRad = (d: number) => d * Math.PI / 180
  const toDeg = (r: number) => r * 180 / Math.PI
  const φ1 = toRad(LHR.lat), λ1 = toRad(LHR.lng)
  const φ2 = toRad(YYZ.lat), λ2 = toRad(YYZ.lng)
  const d = Math.acos(Math.max(-1, Math.min(1,
    Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1)
  )))
  if (d < 0.001) return [LHR.lat, LHR.lng]
  const A = Math.sin((1 - t) * d) / Math.sin(d)
  const B = Math.sin(t * d) / Math.sin(d)
  const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2)
  const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2)
  const z = A * Math.sin(φ1) + B * Math.sin(φ2)
  return [toDeg(Math.atan2(z, Math.sqrt(x * x + y * y))), toDeg(Math.atan2(y, x))]
}

export default function WorldGlobe() {
  const divRef        = useRef<HTMLDivElement>(null)
  const rootRef       = useRef<any>(null)
  const chartRef      = useRef<any>(null)
  const planeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!divRef.current) return

    let disposed = false
    const el = divRef.current

    const init = async () => {
      const am5       = await import('@amcharts/amcharts5')
      const am5map    = await import('@amcharts/amcharts5/map')
      const AnimTheme = (await import('@amcharts/amcharts5/themes/Animated')).default
      const worldLow  = (await import('@amcharts/amcharts5-geodata/worldLow')).default

      if (disposed) return

      // ── Root ──────────────────────────────────────────────────────────────
      const root = am5.Root.new(el)
      rootRef.current = root
      root.setThemes([AnimTheme.new(root)])

      // ── Map chart ─────────────────────────────────────────────────────────
      const chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX:          'rotateX',
          panY:          'rotateY',
          projection:    am5map.geoOrthographic(),
          paddingBottom: 20,
          paddingTop:    20,
          paddingLeft:   20,
          paddingRight:  20,
          wheelY:        'none',
          // Centre on the North Atlantic — midpoint between LHR and YYZ
          rotationX:     40,   // -longitude (amCharts flips sign)
          rotationY:     -48,  // -latitude
        })
      )
      chartRef.current = chart

      // ── Ocean background ──────────────────────────────────────────────────
      const bgSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}))
      bgSeries.mapPolygons.template.setAll({ fill: am5.color(0x0d1f3a), strokeOpacity: 0 })
      bgSeries.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) })

      // ── Graticule ─────────────────────────────────────────────────────────
      const graticule = chart.series.push(am5map.GraticuleSeries.new(root, {}))
      graticule.mapLines.template.setAll({
        stroke: am5.color(0x7dd3fc), strokeOpacity: 0.07, strokeWidth: 0.6,
      })

      // ── Country polygons ──────────────────────────────────────────────────
      const polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, { geoJSON: worldLow, exclude: ['AQ'] })
      )
      polygonSeries.mapPolygons.template.setAll({
        fill:          am5.color(0x1a3a5c),
        stroke:        am5.color(0x7dd3fc),
        strokeWidth:   0.4,
        strokeOpacity: 0.22,
        interactive:   false,
      })

      // ── Flight arc: LHR → YYZ ─────────────────────────────────────────────
      const lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}))
      lineSeries.mapLines.template.setAll({
        stroke:          am5.color(0x7dd3fc),
        strokeWidth:     1.4,
        strokeOpacity:   0.7,
        strokeDasharray: [5, 5],
      })
      lineSeries.data.push({
        geometry: {
          type: 'LineString',
          coordinates: [
            [LHR.lng, LHR.lat],
            [YYZ.lng, YYZ.lat],
          ],
        },
      })

      // ── Endpoint markers ──────────────────────────────────────────────────
      const markerSeries = chart.series.push(am5map.MapPointSeries.new(root, {}))
      markerSeries.bullets.push(() => {
        const container = am5.Container.new(root, {})
        container.children.push(am5.Circle.new(root, {
          radius: 5.5, fill: am5.color(0x7dd3fc), opacity: 0.18,
        }))
        container.children.push(am5.Circle.new(root, {
          radius: 2.4, fill: am5.color(0x7dd3fc),
        }))
        return am5.Bullet.new(root, { sprite: container })
      })
      markerSeries.data.push({ geometry: { type: 'Point', coordinates: [LHR.lng, LHR.lat] } })
      markerSeries.data.push({ geometry: { type: 'Point', coordinates: [YYZ.lng, YYZ.lat] } })

      // ── Moving plane dot along great circle ───────────────────────────────
      const planeSeries = chart.series.push(am5map.MapPointSeries.new(root, {}))
      planeSeries.bullets.push(() => {
        const container = am5.Container.new(root, {})
        // outer glow
        container.children.push(am5.Circle.new(root, {
          radius: 5.5, fill: am5.color(0x7dd3fc), opacity: 0.22,
        }))
        // inner bright dot
        container.children.push(am5.Circle.new(root, {
          radius: 2.6, fill: am5.color(0xe0f2fe),
        }))
        return am5.Bullet.new(root, { sprite: container })
      })
      const planeItem = planeSeries.pushDataItem({
        geometry: { type: 'Point', coordinates: [LHR.lng, LHR.lat] },
      })

      // Animate the dot along the great circle — full trip every 4 s
      let t = 0
      planeTimerRef.current = setInterval(() => {
        t = (t + 1 / (4000 / 50)) % 1   // 50 ms tick → 4 s lap
        const [lat, lng] = gcPoint(t)
        planeItem.setAll({ geometry: { type: 'Point', coordinates: [lng, lat] } })
      }, 50)

      chart.appear(1000, 100)
    }

    init()

    return () => {
      disposed = true
      if (planeTimerRef.current) clearInterval(planeTimerRef.current)
      rootRef.current?.dispose()
      rootRef.current = null
    }
  }, [])


  return (
    <div className="relative w-full h-full">
      <div ref={divRef} className="absolute inset-0" />

      {/* Route badge */}
      <div className="pointer-events-none absolute bottom-10 inset-x-0 flex justify-center z-10">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3.5 py-1.5 text-[9px] uppercase tracking-[0.22em] text-slate-400 backdrop-blur-sm">
          <span className="h-1 w-1 rounded-full bg-sky-400" />
          LHR → YYZ
        </div>
      </div>

    </div>
  )
}
