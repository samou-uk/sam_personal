'use client'

import React, { useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Type casting to bypass TypeScript errors with react-leaflet types
const AnyMapContainer = MapContainer as any
const AnyTileLayer = TileLayer as any
const AnyMarker = Marker as any
const AnyPopup = Popup as any

type RestaurantLocation = {
  id: string
  name: string
  headline: string
  city: string
  neighbourhood?: string
  lat: number
  lng: number
  rating?: number
  tags?: string[]
}

const baseMarkerClass =
  'w-4 h-4 rounded-full border-2 border-white shadow-md shadow-slate-900/20'

const markerHtml = (isSelected: boolean) =>
  `<div style="
    display:flex;
    align-items:center;
    justify-content:center;
  ">
    <div style="
      width:${isSelected ? '18px' : '14px'};
      height:${isSelected ? '18px' : '14px'};
      border-radius:9999px;
      border:2px solid white;
      box-shadow:0 6px 16px rgba(15,23,42,0.45);
      background:linear-gradient(135deg, #0f3d91, #1d4ed8);
    "></div>
  </div>`

const createMarkerIcon = (isSelected: boolean) =>
  L.divIcon({
    className: '',
    html: markerHtml(isSelected),
    iconSize: isSelected ? [22, 22] : [18, 18],
    iconAnchor: [11, 11],
  })

interface RestaurantLeafletMapProps {
  restaurants: RestaurantLocation[]
  selectedId: string | null
}

export default function RestaurantLeafletMap({
  restaurants,
  selectedId,
}: RestaurantLeafletMapProps) {
  const selected =
    restaurants.find((r) => r.id === selectedId) ?? restaurants[0] ?? null

  const center = useMemo<[number, number]>(() => {
    if (selected) return [selected.lat, selected.lng]
    if (restaurants.length === 0) return [43.4643, -80.5204] // Waterloo-ish
    const avgLat =
      restaurants.reduce((sum, r) => sum + r.lat, 0) / restaurants.length
    const avgLng =
      restaurants.reduce((sum, r) => sum + r.lng, 0) / restaurants.length
    return [avgLat, avgLng]
  }, [restaurants, selected])

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/70 p-4 sm:p-5 h-full flex flex-col gap-3 relative z-[30]" style={{ isolation: 'isolate' }}>
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-light">
        Map
      </p>
      <div className="relative w-full aspect-square rounded-xl overflow-hidden z-[30]" style={{ isolation: 'isolate' }}>
        <AnyMapContainer
          key={selected?.id ?? 'map'}
          center={center as any}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}
          className="w-full h-full"
        >
          <AnyTileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {restaurants.map((r) => {
            const isSelected = selected?.id === r.id
            const bestTag =
              r.tags?.find((tag) => tag.toLowerCase().startsWith('best ')) ??
              null
            return (
              <AnyMarker
                key={r.id}
                position={[r.lat, r.lng]}
                icon={createMarkerIcon(isSelected)}
              >
                <AnyPopup>
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-slate-800">
                      {r.name}
                    </p>
                    {bestTag && (
                      <p className="text-[10px] text-amber-700 bg-amber-50/80 rounded-full px-2 py-0.5 inline-flex items-center gap-1 border border-amber-200">
                        <span>★</span>
                        <span className="truncate max-w-[140px]">{bestTag}</span>
                      </p>
                    )}
                    {typeof r.rating === 'number' && (
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => {
                            const fullStars = Math.floor(r.rating!)
                            const hasHalf =
                              r.rating! - fullStars >= 0.25 &&
                              r.rating! - fullStars < 0.75
                            const isFull = star <= fullStars
                            const isHalf = !isFull && hasHalf && star === fullStars + 1

                            return (
                              <span
                                key={star}
                                className="text-[11px] leading-none relative inline-block align-middle"
                              >
                                <span
                                  className={
                                    isFull ? 'text-amber-500' : 'text-slate-300'
                                  }
                                >
                                  ★
                                </span>
                                {isHalf && (
                                  <>
                                    <span className="absolute inset-0 text-slate-300">
                                      ★
                                    </span>
                                    <span
                                      className="absolute inset-0 text-amber-500"
                                      style={{ clipPath: 'inset(0 50% 0 0)' }}
                                    >
                                      ★
                                    </span>
                                  </>
                                )}
                              </span>
                            )
                          })}
                        </div>
                        <span className="text-[11px] text-slate-500">
                          {r.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                    <p className="text-[11px] text-slate-600">
                      {r.headline}
                      <br />
                      {r.city}
                      {r.neighbourhood ? ` · ${r.neighbourhood}` : ''}
                    </p>
                  </div>
                </AnyPopup>
              </AnyMarker>
            )
          })}
        </AnyMapContainer>
      </div>
      <p className="text-[11px] text-slate-500/80 dark:text-slate-400/80 font-light">
        Scroll or trackpad to zoom, drag to pan.
      </p>
    </div>
  )
}


