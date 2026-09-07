'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import {
  createElementObject,
  createLayerComponent,
  extendContext,
} from '@react-leaflet/core'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

const AnyMapContainer = MapContainer as any
const AnyTileLayer = TileLayer as any
const AnyMarker = Marker as any
const AnyPopup = Popup as any

const AnyMarkerClusterGroup = createLayerComponent(
  function createMarkerClusterGroup({ children: _children, ...options }: any, ctx: any) {
    const group = L.markerClusterGroup(options)
    return createElementObject(
      group,
      extendContext(ctx, { layerContainer: group })
    )
  }
) as any

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

const createClusterIcon = (cluster: L.MarkerCluster) => {
  const count = cluster.getChildCount()
  const size = count < 10 ? 36 : count < 25 ? 42 : 48

  return L.divIcon({
    html: `<div style="
      width:${size}px;
      height:${size}px;
      border-radius:9999px;
      display:flex;
      align-items:center;
      justify-content:center;
      color:white;
      font-size:${count < 10 ? 13 : 14}px;
      font-weight:500;
      letter-spacing:-0.02em;
      background:linear-gradient(145deg, #0f3d91 0%, #1d4ed8 55%, #1552c0 100%);
      border:2px solid rgba(255,255,255,0.92);
      box-shadow:0 10px 24px rgba(15,61,145,0.35), inset 0 1px 0 rgba(255,255,255,0.25);
    ">${count}</div>`,
    className: 'restaurant-cluster-icon',
    iconSize: L.point(size, size),
    iconAnchor: L.point(size / 2, size / 2),
  })
}

function MapFocus({
  selectedId,
  lat,
  lng,
}: {
  selectedId: string
  lat: number
  lng: number
}) {
  const map = useMap()
  const previousId = useRef<string | null>(null)

  useEffect(() => {
    if (previousId.current === null) {
      previousId.current = selectedId
      return
    }
    if (previousId.current === selectedId) return
    previousId.current = selectedId

    map.flyTo([lat, lng], Math.max(map.getZoom(), 13), {
      animate: true,
      duration: 0.65,
    })
  }, [selectedId, lat, lng, map])

  return null
}

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

  const initialCenter = useMemo<[number, number]>(() => {
    if (selected) return [selected.lat, selected.lng]
    if (restaurants.length === 0) return [43.4643, -80.5204]
    const avgLat =
      restaurants.reduce((sum, r) => sum + r.lat, 0) / restaurants.length
    const avgLng =
      restaurants.reduce((sum, r) => sum + r.lng, 0) / restaurants.length
    return [avgLat, avgLng]
    // Intentionally only for first paint — selection focus is handled by MapFocus
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const clusterOptions = useMemo(
    () => ({
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 56,
      disableClusteringAtZoom: 15,
      iconCreateFunction: createClusterIcon,
    }),
    []
  )

  return (
    <div
      className="relative z-[30] flex h-full flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-900/70 sm:p-5"
      style={{ isolation: 'isolate' }}
    >
      <p className="text-xs font-light uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
        Map
      </p>
      <div
        className="relative z-[30] aspect-square w-full overflow-hidden rounded-xl"
        style={{ isolation: 'isolate' }}
      >
        <AnyMapContainer
          center={initialCenter as any}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}
          className="h-full w-full"
        >
          <AnyTileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${process.env.NEXT_PUBLIC_CARTO_API_KEY ?? ''}`}
            subdomains="abcd"
            maxZoom={20}
          />

          {selected && (
            <MapFocus
              selectedId={selected.id}
              lat={selected.lat}
              lng={selected.lng}
            />
          )}

          <AnyMarkerClusterGroup {...clusterOptions}>
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
                        <p className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50/80 px-2 py-0.5 text-[10px] text-amber-700">
                          <span>★</span>
                          <span className="max-w-[140px] truncate">{bestTag}</span>
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
                              const isHalf =
                                !isFull && hasHalf && star === fullStars + 1

                              return (
                                <span
                                  key={star}
                                  className="relative inline-block align-middle text-[11px] leading-none"
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
          </AnyMarkerClusterGroup>
        </AnyMapContainer>
      </div>
      <p className="text-[11px] font-light text-slate-500/80 dark:text-slate-400/80">
        <span className="sm:hidden">Pinch to zoom, drag to pan. Zoom out to see counts.</span>
        <span className="hidden sm:inline">
          Scroll or trackpad to zoom, drag to pan. Zoom out to see restaurant counts.
        </span>
      </p>
    </div>
  )
}
