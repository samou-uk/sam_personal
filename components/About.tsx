'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const interests = [
  { title: 'Sports', description: 'Golf, Tennis, Sabre Fencing' },
  { title: 'Formula One', description: 'Racing enthusiast & sim racer' },
  { title: 'Cooking', description: 'Chinese techniques & British classics' },
  { title: 'Music', description: 'Piano, Clarinet, Saxophone' },
]

export default function About() {
  return (
    <section id="about" className="py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(5,150,105,0.03),transparent_50%)]"></div>
      
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-6xl md:text-7xl font-extralight text-slate-900 mb-12 tracking-tighter">About</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          {/* Photo with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white/40 backdrop-blur-2xl border border-white/60 shadow-xl">
              <Image
                src="/about.webp"
                alt="Sam Chusen Ou"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="bg-white/60 backdrop-blur-2xl rounded-2xl p-8 border border-white/80 shadow-lg">
              <div className="space-y-6 text-lg text-slate-700 font-light leading-relaxed">
                <p>
                  Hi! I'm <span className="text-slate-900 font-normal">Sam</span>, a student at the University of Waterloo studying Mathematics/Financial Analysis & Risk Management alongside a Statistics, Joint Honours. I won't bore you too much, but here's a little bit about me…
                </p>
                <p>
                  I was born in London and spent the first 18 years of my life enduring the torrential rain before hopping across the pond to Waterloo, Canada to pursue my Bachelor's Degree.
                </p>
                <p>
                  Outside of academia and its tribulations, I enjoy playing golf, tennis and sabre fencing. Tennis, being the most accessible, is probably my favourite sport. The other two are slightly more difficult to facilitate!
                </p>
                <p>
                  I also enjoy watching Formula One. As a result, I fell down the rabbit hole of simracing too (a very costly rabbit hole at that!)
                </p>
                <p>
                  Moreover, I love to cook. Having learned to cook at a young age, this skill has become particularly important as I started university in September 2023. While my cooking predominantly involves Chinese techniques, my girlfriend always claims that I make a brilliant Chicken & Mash!
                </p>
                <p>
                  Furthermore, I have been involved in music ever since I was 8 years old (as you can see in the photo!) Throughout my childhood, I played the piano, clarinet and saxophone. However, my move across the pond has not only severely diminished my free time, but also deprived me of access to a piano. These days, I am more of an appreciator of music than a musician.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              whileHover={{ y: -4 }}
              className="bg-white/50 backdrop-blur-xl rounded-xl p-6 text-center border border-white/60 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all duration-300"
            >
              <h3 className="text-base font-light text-slate-900 mb-2">{interest.title}</h3>
              <p className="text-sm text-slate-600 font-light">{interest.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
