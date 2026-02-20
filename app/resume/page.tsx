'use client'

import React from 'react'
import Navigation from '@/components/Navigation'

const RESUME_DOC_ID = '1bxxMM4_84iedEJAmxHOXPqpA57vzqRKE'
const RESUME_VIEW_URL = `https://docs.google.com/document/d/${RESUME_DOC_ID}/edit?usp=sharing`
const RESUME_PDF_URL = '/Sam_Chusen_Ou_February_2026_Resume.pdf'

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />

      <div className="pt-20 pb-16 md:pb-0">
        <section className="pt-32 pb-32">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-6xl md:text-7xl font-extralight text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
                <span className="inline-block">My</span>{' '}
                <span className="inline-block text-primary dark:text-[#ADD8E6]">resume</span>
              </h1>
              <p className="text-base text-slate-500 dark:text-slate-400 font-light max-w-2xl">
                A quick snapshot of what I&apos;ve been up to. You can view it right here,
                or download a PDF.
              </p>
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500 font-light">
                Current as of 20/02/2026.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <a
                href={RESUME_PDF_URL}
                download="Sam_Chusen_Ou_February_2026_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-light hover:bg-primary-dark transition-colors duration-200"
              >
                Download PDF
              </a>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-light mb-10 -mt-6">
              Note: Download may not work on all devices, especially phones.
            </p>

            {/* Embedded PDF viewer */}
            <div className="rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/80 shadow-lg overflow-hidden">
              <div className="w-full h-[60vh] sm:h-[70vh]">
                <iframe
                  src={`${RESUME_PDF_URL}#zoom=page-width`}
                  title="Sam Chusen Ou Resume PDF"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}


