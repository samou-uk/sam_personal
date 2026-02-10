'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import { ChevronDown, X } from 'lucide-react'

const aboutImages = [
  { src: '/tennis_about.webp', alt: 'Tennis', caption: 'Tennis, being the most accessible, is probably my favourite sport.', keyword: 'tennis' },
  { src: '/chickenmash_about.webp', alt: 'Cooking', caption: 'While my cooking predominantly involves Chinese techniques, my girlfriend always claims that I make a brilliant Chicken & Mash!', keyword: 'Chicken & Mash' },
  { src: '/samyoungpiano_about.webp', alt: 'Music', caption: 'I have been involved in music ever since I was 8 years old. Throughout my childhood, I played the piano, clarinet and saxophone.', keyword: 'music' },
]

export default function AboutPage() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const handleKeywordClick = (keyword: string) => {
    setOpenDropdown(openDropdown === keyword ? null : keyword)
  }

  const getImageForKeyword = (keyword: string) => {
    return aboutImages.find(img => 
      img.keyword.toLowerCase() === keyword.toLowerCase()
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20 pb-16 md:pb-0">
      <section className="pt-20 pb-32">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          {/* Instagram-style Profile Header */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
              {/* Profile Photo */}
              <div className="flex-shrink-0">
                <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-slate-200">
                  <Image
                    src="/about.webp"
                    alt="Sam Chusen Ou"
                    fill
                    sizes="(max-width: 768px) 112px, 144px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                  <h1 className="text-2xl md:text-3xl font-extralight text-slate-900 tracking-tight">
                    <a 
                      href="https://instagram.com/samchusenou" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors duration-200"
                    >
                      @samchusenou
                    </a>
                  </h1>
                </div>

                {/* Stats */}
                <div className="flex gap-8 mb-6 text-sm">
                  <div>
                    <span className="font-light text-slate-900">3 posts</span>
                  </div>
                </div>

                {/* Bio - Instagram style */}
                <div className="space-y-2 text-sm font-light text-slate-700 leading-relaxed">
                  <p>
                    <span className="font-normal text-slate-900">Sam Chusen Ou</span>
                  </p>
                  <p>
                    Student at <span className="font-normal text-slate-900">University of Waterloo</span> studying Mathematics/Financial Analysis & Risk Management with Statistics Joint Honours.
                  </p>
                  <p>
                    Born in London, UK. Now in Waterloo, Canada
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Bio Section */}
          <div className="mb-16 pb-16 border-b border-slate-200">
            <h2 className="text-2xl font-extralight text-slate-900 mb-8 tracking-tight">About</h2>
            <div className="space-y-6 text-base font-light text-slate-700 leading-relaxed">
              <p>
                Hi! I'm <span className="font-normal text-slate-900">Sam</span>, a student at the University of Waterloo studying Mathematics/Financial Analysis & Risk Management alongside a Statistics, Joint Honours. I won't bore you too much, but here's a little bit about me…
              </p>
              <p>
                I was born in London and spent the first 18 years of my life enduring the torrential rain before hopping across the pond to Waterloo, Canada to pursue my Bachelor's Degree.
              </p>
              <div>
                Outside of academia and its tribulations, I enjoy playing golf,{' '}
                <span className="relative inline-block">
                  <button 
                    onClick={() => handleKeywordClick('tennis')} 
                    className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/60 transition-colors duration-200 font-normal inline-flex items-center gap-1"
                  >
                    tennis
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === 'tennis' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'tennis' && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 z-10 w-[calc(100vw-3rem)] sm:w-96 max-w-[calc(100vw-3rem)] sm:max-w-none bg-white rounded-lg border border-slate-200 shadow-xl overflow-hidden">
                      <div className="relative">
                        {/* macOS traffic lights */}
                        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                          <button
                            onClick={() => setOpenDropdown(null)}
                            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors duration-200 flex items-center justify-center group"
                            aria-label="Close"
                          >
                            <X className="w-2 h-2 text-[#740000] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </button>
                          <button
                            onClick={() => setOpenDropdown(null)}
                            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ff9500] transition-colors duration-200 flex items-center justify-center group"
                            aria-label="Minimize"
                          >
                            <span className="w-1 h-1 bg-[#740000] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
                          </button>
                          <button
                            onClick={() => alert("What is there to maximise?")}
                            className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#20d046] transition-colors duration-200 flex items-center justify-center group"
                            aria-label="Maximize"
                          >
                            <span className="w-1 h-1 bg-[#006500] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
                          </button>
                        </div>
                        <div className="relative aspect-[3/2] bg-slate-100">
                          <Image
                            src={getImageForKeyword('tennis')!.src}
                            alt={getImageForKeyword('tennis')!.alt}
                            fill
                            sizes="(max-width: 640px) calc(100vw - 3rem), 384px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </span>
                {' '}and sabre fencing.{' '}
                <span className="relative inline-block">
                  <button 
                    onClick={() => handleKeywordClick('tennis')} 
                    className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/60 transition-colors duration-200 font-normal inline-flex items-center gap-1"
                  >
                    Tennis
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === 'tennis' ? 'rotate-180' : ''}`} />
                  </button>
                </span>
                , being the most accessible, is probably my favourite sport. The other two are slightly more difficult to facilitate!
              </div>
              <p>
                I also enjoy watching Formula One. As a result, I fell down the rabbit hole of simracing too (a very costly rabbit hole at that!)
              </p>
              <div>
                Moreover, I love to cook. Having learned to cook at a young age, this skill has become particularly important as I started university in September 2023. While my cooking predominantly involves Chinese techniques, my girlfriend always claims that I make a brilliant{' '}
                <span className="relative inline-block">
                  <button 
                    onClick={() => handleKeywordClick('Chicken & Mash')} 
                    className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/60 transition-colors duration-200 font-normal inline-flex items-center gap-1"
                  >
                    Chicken & Mash
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === 'Chicken & Mash' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'Chicken & Mash' && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 z-10 w-[calc(100vw-3rem)] sm:w-96 max-w-[calc(100vw-3rem)] sm:max-w-none bg-white rounded-lg border border-slate-200 shadow-xl overflow-hidden">
                      <div className="relative">
                        {/* macOS traffic lights */}
                        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                          <button
                            onClick={() => setOpenDropdown(null)}
                            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors duration-200 flex items-center justify-center group"
                            aria-label="Close"
                          >
                            <X className="w-2 h-2 text-[#740000] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </button>
                          <button
                            onClick={() => setOpenDropdown(null)}
                            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ff9500] transition-colors duration-200 flex items-center justify-center group"
                            aria-label="Minimize"
                          >
                            <span className="w-1 h-1 bg-[#740000] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
                          </button>
                          <button
                            onClick={() => alert("What is there to maximise?")}
                            className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#20d046] transition-colors duration-200 flex items-center justify-center group"
                            aria-label="Maximize"
                          >
                            <span className="w-1 h-1 bg-[#006500] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
                          </button>
                        </div>
                        <div className="relative aspect-[4/3] bg-slate-100">
                          <Image
                            src={getImageForKeyword('Chicken & Mash')!.src}
                            alt={getImageForKeyword('Chicken & Mash')!.alt}
                            fill
                            sizes="(max-width: 640px) calc(100vw - 3rem), 384px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </span>
                !
              </div>
              <div>
                Furthermore, I have been involved in{' '}
                <span className="relative inline-block">
                  <button 
                    onClick={() => handleKeywordClick('music')} 
                    className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/60 transition-colors duration-200 font-normal inline-flex items-center gap-1"
                  >
                    music
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === 'music' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'music' && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-2 z-10 w-[calc(100vw-3rem)] sm:w-96 max-w-[calc(100vw-3rem)] sm:max-w-none bg-white rounded-lg border border-slate-200 shadow-xl overflow-hidden">
                      <div className="relative">
                        {/* macOS traffic lights */}
                        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
                          <button
                            onClick={() => setOpenDropdown(null)}
                            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors duration-200 flex items-center justify-center group"
                            aria-label="Close"
                          >
                            <X className="w-2 h-2 text-[#740000] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </button>
                          <button
                            onClick={() => setOpenDropdown(null)}
                            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ff9500] transition-colors duration-200 flex items-center justify-center group"
                            aria-label="Minimize"
                          >
                            <span className="w-1 h-1 bg-[#740000] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
                          </button>
                          <button
                            onClick={() => alert("What is there to maximise?")}
                            className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#20d046] transition-colors duration-200 flex items-center justify-center group"
                            aria-label="Maximize"
                          >
                            <span className="w-1 h-1 bg-[#006500] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
                          </button>
                        </div>
                        <div className="relative aspect-[4/3] bg-slate-100">
                          <Image
                            src={getImageForKeyword('music')!.src}
                            alt={getImageForKeyword('music')!.alt}
                            fill
                            sizes="(max-width: 640px) calc(100vw - 3rem), 384px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </span>
                {' '}ever since I was 8 years old (as you can see in the photo!) Throughout my childhood, I played the piano, clarinet and saxophone. However, my move across the pond has not only severely diminished my free time, but also deprived me of access to a piano. These days, I am more of an appreciator of music than a musician.
              </div>
            </div>
          </div>

          {/* Instagram-style Photo Grid - 3 columns */}
          <div className="pt-8">
            {/* Tab bar (Instagram style) */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-1 text-xs text-slate-500 font-light uppercase tracking-wider">
                <span className="border-b-2 border-slate-900 pb-2 px-1 text-slate-900">Posts</span>
              </div>
            </div>

            {/* Photo Grid - 3 columns */}
            <div className="grid grid-cols-3 gap-1 sm:gap-2">
              {aboutImages.map((image, index) => (
                <div key={index} className="relative aspect-square overflow-hidden bg-slate-100 rounded-lg group cursor-pointer">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 33vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>
    </main>
  )
}
