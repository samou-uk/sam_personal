'use client'

import Navigation from '@/components/Navigation'
import Image from 'next/image'

// Photo collage with locations and countries
const collagePhotos = [
  { src: '/index1.webp', location: 'Shanghai', country: 'China' },
  { src: '/index2.webp', location: 'Boston', country: 'USA' },
  { src: '/index3.webp', location: 'Lisbon', country: 'Portugal' },
  { src: '/index4.webp', location: 'Toronto', country: 'Canada' },
  { src: '/index5.webp', location: 'Milan', country: 'Italy' },
  { src: '/index6.webp', location: 'New York', country: 'USA' },
  { src: '/index7.webp', location: 'London', country: 'UK' },
  { src: '/index8.webp', location: 'Reading', country: 'UK' },
  { src: '/index9.webp', location: 'Hong Kong', country: 'China' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-0">
        {/* Photo Collage Hero - Mobile Friendly */}
        <section className="relative min-h-screen md:h-screen flex items-center justify-center overflow-y-auto md:overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 pb-24 md:pb-0">
          {/* Dynamic Collage Grid - Responsive */}
          <div className="absolute md:absolute inset-0 p-2 md:p-3 pb-32 md:pb-3">
            <div className="min-h-full md:h-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-2.5 auto-rows-fr">
              {/* Large featured photo - top left (2x2 on mobile, 2x2 on desktop) */}
              <div className="col-span-2 row-span-2 relative overflow-hidden rounded-lg md:rounded-xl group">
                <Image
                  src={collagePhotos[0].src}
                  alt="Collage photo"
                  fill
                  sizes="(max-width: 768px) 50vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                {/* Location caption - always visible */}
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-xs md:text-xs font-light">{collagePhotos[0].location}, {collagePhotos[0].country}</p>
                </div>
              </div>
              
              {/* Medium photo - top right */}
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-lg md:rounded-xl group">
                <Image
                  src={collagePhotos[1].src}
                  alt="Collage photo"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-[10px] md:text-xs font-light leading-tight">{collagePhotos[1].location}, {collagePhotos[1].country}</p>
                </div>
              </div>
              
              {/* Small photo - middle right top */}
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-lg md:rounded-xl group">
                <Image
                  src={collagePhotos[2].src}
                  alt="Collage photo"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-[10px] md:text-xs font-light leading-tight">{collagePhotos[2].location}, {collagePhotos[2].country}</p>
                </div>
              </div>
              
              {/* Medium photo - bottom right */}
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-lg md:rounded-xl group">
                <Image
                  src={collagePhotos[3].src}
                  alt="Collage photo"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-[10px] md:text-xs font-light leading-tight">{collagePhotos[3].location}, {collagePhotos[3].country}</p>
                </div>
              </div>
              
              {/* Small photo - bottom left */}
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-lg md:rounded-xl group">
                <Image
                  src={collagePhotos[4].src}
                  alt="Collage photo"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-[10px] md:text-xs font-light leading-tight">{collagePhotos[4].location}, {collagePhotos[4].country}</p>
                </div>
              </div>
              
              {/* Additional photos - visible on mobile too */}
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-lg md:rounded-xl group">
                <Image
                  src={collagePhotos[5].src}
                  alt="Collage photo"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-[10px] md:text-xs font-light leading-tight">{collagePhotos[5].location}, {collagePhotos[5].country}</p>
                </div>
              </div>
              
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-lg md:rounded-xl group">
                <Image
                  src={collagePhotos[6].src}
                  alt="Collage photo"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-[10px] md:text-xs font-light leading-tight">{collagePhotos[6].location}, {collagePhotos[6].country}</p>
                </div>
              </div>
              
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-lg md:rounded-xl group">
                <Image
                  src={collagePhotos[7].src}
                  alt="Collage photo"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-[10px] md:text-xs font-light leading-tight">{collagePhotos[7].location}, {collagePhotos[7].country}</p>
                </div>
              </div>
              
              <div className="col-span-1 row-span-1 relative overflow-hidden rounded-lg md:rounded-xl group">
                <Image
                  src={collagePhotos[8].src}
                  alt="Collage photo"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-[10px] md:text-xs font-light leading-tight">{collagePhotos[8].location}, {collagePhotos[8].country}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
