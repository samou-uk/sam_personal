'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import Navigation from '@/components/Navigation'

function CaseStudiesContent() {
  const searchParams = useSearchParams()
  const projectParam = searchParams?.get('project')
  const initialCaseStudy = (projectParam === 'fortune' ? 'fortune' : 'placecard') as 'placecard' | 'fortune'
  const [activeCaseStudy, setActiveCaseStudy] = useState<'placecard' | 'fortune'>(initialCaseStudy)
  
  // Update active case study when URL param changes
  useEffect(() => {
    if (!searchParams) return
    const project = searchParams.get('project')
    if (project === 'fortune') {
      setActiveCaseStudy('fortune')
    } else if (project === 'placecard') {
      setActiveCaseStudy('placecard')
    }
  }, [searchParams])
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [lightboxAlt, setLightboxAlt] = useState<string | null>(null)
  const [showMaximizeNote, setShowMaximizeNote] = useState(false)

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src)
    setLightboxAlt(alt)
  }

  const closeLightbox = () => {
    setLightboxSrc(null)
    setLightboxAlt(null)
  }

  return (
    <>
      <Navigation />

      <div className="pt-20 pb-16 md:pb-0">
        <section className="pt-32 pb-32">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 space-y-12">
            {/* Header */}
            <header className="space-y-4">
              <div>
                <h1 className="text-6xl md:text-7xl font-extralight text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
                  <span className="inline-block">What I&apos;ve</span>{' '}
                  <span className="inline-block text-primary dark:text-[#ADD8E6]">built &amp; why</span>
                </h1>
                <p className="text-base text-slate-600 dark:text-slate-400 font-light max-w-2xl">
                  A deeper look into two projects I&apos;m especially proud of. The problems they solved, how I built them, and the trade-offs behind each decision.
                </p>
              </div>
              {/* Case study switcher */}
              <div className="inline-flex rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/70 p-1 text-xs sm:text-[13px]">
                <button
                  type="button"
                  onClick={() => setActiveCaseStudy('placecard')}
                  className={`px-3 sm:px-4 py-1.5 rounded-full transition-all ${
                    activeCaseStudy === 'placecard'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span className="relative w-4 h-4 rounded-full overflow-hidden border border-slate-200/70 dark:border-slate-600/70 bg-slate-100 dark:bg-slate-800">
                      <Image
                        src="/placecardlogodark.png"
                        alt="Placecard logo"
                        fill
                        sizes="16px"
                        className="object-contain block dark:hidden"
                      />
                      <Image
                        src="/placecardlogo.png"
                        alt="Placecard logo"
                        fill
                        sizes="16px"
                        className="object-contain hidden dark:block"
                      />
                    </span>
                    <span>Placecard</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCaseStudy('fortune')}
                  className={`ml-1 px-3 sm:px-4 py-1.5 rounded-full transition-all ${
                    activeCaseStudy === 'fortune'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span className="relative w-4 h-4 rounded-full overflow-hidden border border-slate-200/70 dark:border-slate-600/70 bg-slate-100 dark:bg-slate-800">
                      <Image
                        src="/ffuk.jpg"
                        alt="Fortune Foods UK logo"
                        fill
                        sizes="16px"
                        className="object-contain"
                      />
                    </span>
                    <span>FortuneVantage</span>
                  </span>
                </button>
              </div>
            </header>

            <div className="space-y-12">
              {/* Placecard case study */}
              {activeCaseStudy === 'placecard' && (
              <article className="rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/80 p-6 sm:p-8 shadow-sm">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light uppercase tracking-[0.2em] mb-3">
                  Case study · HACKATHON PROJECT
                </p>
                <h2 className="text-2xl md:text-3xl font-extralight text-slate-900 dark:text-slate-100 tracking-tight mb-2">
                  Placecard – private supper-club app
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light mb-4">
                  UW / WLU supper-club product · Full-stack (Flask + React + Firebase)
                </p>

                {/* Intro screenshot – main Placecard flow */}
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={() =>
                      openLightbox('/placecard.png', 'Placecard landing and core flow')
                    }
                    className="block w-full text-left"
                  >
                    <div className="relative aspect-[4/3] max-w-3xl mx-auto rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900/5 dark:bg-slate-900/40 group">
                      <Image
                        src="/placecard.png"
                        alt="Placecard landing and core flow"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(min-width: 1024px) 800px, 100vw"
                        priority
                      />
                    </div>
                    <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-light text-center">
                      The activity feed in Placecard. Built during CxC 2026.
                    </p>
                  </button>
                </div>

                <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                  {/* Introduction */}
                  <section className="space-y-3">
                    <h3 className="text-sm font-normal text-slate-900 dark:text-slate-100">
                      Introduction
                    </h3>
                    <p>
                      This was a project we built during CxC 2026, a data science hackathon at the University of Waterloo.
                      The goal was to create a high-trust dining social app, closer to Oxbridge-style supper clubs than a
                      typical North American university club or society, with the exclusivity of Raya.
                    </p>
                    <p>
                      I spent the weekend building the product end-to-end, from Firebase configuration and security rules
                      to the Flask backend and React frontend, with a deliberate focus on security, user experience, and
                      keeping API and infra costs under control.
                    </p>
                  </section>

                  {/* Onboarding + identity – {placecard_2 img} */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() =>
                        openLightbox(
                          '/placecard_signup.png',
                          'Placecard onboarding and signup flow'
                        )
                      }
                      className="text-left"
                    >
                      <div className="relative aspect-[4/3] max-w-xl mx-auto rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900/5 dark:bg-slate-900/40 group">
                        <Image
                          src="/placecard_signup.png"
                          alt="Placecard onboarding and signup"
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(min-width: 1024px) 400px, 50vw"
                        />
                      </div>
                      <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-light">
                        Onboarding and signup.
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        openLightbox(
                          '/placecard_idver.png',
                          'Placecard student ID verification screen'
                        )
                      }
                      className="text-left"
                    >
                      <div className="relative aspect-[4/3] max-w-xl mx-auto rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900/5 dark:bg-slate-900/40 group">
                        <Image
                          src="/placecard_idver.png"
                          alt="Placecard student ID verification"
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(min-width: 1024px) 400px, 50vw"
                        />
                      </div>
                      <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-light">
                        Student ID verification using OCR to enforce a high-trust environment.
                      </p>
                    </button>
                  </div>

                  {/* Problem */}
                  <section className="space-y-3">
                    <h3 className="text-sm font-normal text-slate-900 dark:text-slate-100">
                      The problem
                    </h3>
                    <p>
                      Most social platforms optimise for scale, not trust. That works fine for posting photos. It breaks
                      down fast when you&apos;re asking people to open their homes to strangers.
                    </p>
                    <p>
                      We wanted to explore what a small, controlled network might look like if real-world identity is
                      enforced, hosting is a privilege, and bad behaviour has permanent consequences. The goal was to
                      design trust into the system from the ground up, rather than treating it as an afterthought.
                    </p>
                  </section>

                  {/* How we built it – infra & stack – {placecard_3 img} */}
                  <section className="space-y-3">
                    <div className="mb-3 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() =>
                          openLightbox(
                            '/placecard_railway.png',
                            'Placecard backend deployed on Railway'
                          )
                        }
                        className="text-left"
                      >
                        <div className="relative aspect-[4/3] max-w-xl mx-auto rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900/5 dark:bg-slate-900/40 group">
                          <Image
                            src="/placecard_railway.png"
                            alt="Placecard backend deployed on Railway"
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            sizes="(min-width: 1024px) 400px, 50vw"
                          />
                        </div>
                        <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-light">
                          Backend deployed on Railway and Gunicorn.
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          openLightbox(
                            '/placecard_vercel.png',
                            'Placecard frontend deployed on Vercel'
                          )
                        }
                        className="text-left"
                      >
                        <div className="relative aspect-[4/3] max-w-xl mx-auto rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900/5 dark:bg-slate-900/40 group">
                          <Image
                            src="/placecard_vercel.png"
                            alt="Placecard frontend deployed on Vercel"
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            sizes="(min-width: 1024px) 400px, 50vw"
                          />
                        </div>
                        <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-light">
                          Frontend on Vercel with CI-style deploys for rapid changes.
                        </p>
                      </button>
                    </div>
                    <h3 className="text-sm font-normal text-slate-900 dark:text-slate-100">
                      How we built it
                    </h3>
                    <p>
                      The stack was chosen to move fast during a hackathon without completely neglecting security or
                      deployment hygiene:
                    </p>
                    <ul className="list-disc list-inside space-y-1.5">
                      <li>
                        <span className="font-normal">Backend:</span> Python (Flask) + Gunicorn
                      </li>
                      <li>
                        <span className="font-normal">Frontend:</span> React + Tailwind CSS
                      </li>
                      <li>
                        <span className="font-normal">Auth &amp; data:</span> Flask-Login (hashed passwords) + Firestore
                      </li>
                      <li>
                        <span className="font-normal">Infra:</span> Railway (backend) + Vercel (frontend)
                      </li>
                      <li>
                        <span className="font-normal">AI:</span> OpenRouter + Gemini 2.5 Flash for ingredient generation
                        and user–host matching
                      </li>
                      <li>
                        <span className="font-normal">Verification:</span> Tesseract OCR for student ID checks
                      </li>
                    </ul>
                    <p>
                      The backend handled authentication, authorisation, moderation hooks, and message routing. The
                      frontend focused on onboarding, messaging, host approvals, and making our trust model visible to
                      users rather than hiding it in backend logic.
                    </p>
                  </section>

                  {/* Security & access control – {placecard_4 img} */}
                  <section className="space-y-3">
                    <div className="mb-3 grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() =>
                          openLightbox(
                            '/placecard_hostdinner.png',
                            'Placecard host dinner management screen'
                          )
                        }
                        className="text-left"
                      >
                        <div className="relative aspect-[4/3] max-w-xl mx-auto rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900/5 dark:bg-slate-900/40 group">
                          <Image
                            src="/placecard_hostdinner.png"
                            alt="Placecard host dinner management"
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            sizes="(min-width: 1024px) 400px, 50vw"
                          />
                        </div>
                        <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-light">
                          Hosting a dinner.
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          openLightbox(
                            '/placecard_profile.png',
                            'Placecard User Profile'
                          )
                        }
                        className="text-left"
                      >
                        <div className="relative aspect-[4/3] max-w-xl mx-auto rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900/5 dark:bg-slate-900/40 group">
                          <Image
                            src="/placecard_profile.png"
                            alt="Placecard User Profile"
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            sizes="(min-width: 1024px) 400px, 50vw"
                          />
                        </div>
                        <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-light">
                        Placecard User Profile.
                        </p>
                      </button>
                    </div>
                    <h3 className="text-sm font-normal text-slate-900 dark:text-slate-100">
                      Security &amp; access control
                    </h3>
                    <p>Some of the rules enforced at the data layer:</p>
                    <ul className="list-disc list-inside space-y-1.5">
                      <li>Only @uwaterloo.ca and @mylaurier.ca emails can create or update accounts.</li>
                      <li>
                        Suspended users cannot read data, create dinners, requests, reviews, or reports.
                      </li>
                      <li>Only users with active host privileges can create dinners.</li>
                      <li>Only dinner participants can leave reviews.</li>
                      <li>
                        Onboarding is invite-only after the first 50 users, with referrals tracked.
                      </li>
                    </ul>
                    <p>
                      This wasn&apos;t just about safety, it was also about cost. After the first night, we&apos;d already
                      exceeded Firebase&apos;s free read quota. The next morning, I optimised our code: added basic
                      caching, denormalised collections, and added pagination to cut down unnecessary calls and keep
                      costs under control.
                    </p>
                  </section>

                  {/* Challenges – {placecard_5 img} */}
                  <section className="space-y-3">
                    <h3 className="text-sm font-normal text-slate-900 dark:text-slate-100">
                      Challenges
                    </h3>
                    <p>
                      We tried integrating Auth0 too early and it slowed everything down. We cut it and switched to
                      Flask-Login so we could ship core functionality within the weekend. From a UX perspective, the
                      lack of customisation with Auth0 also made it hard to get the onboarding flow to feel like
                      Placecard rather than a generic SaaS.
                    </p>
                  </section>

                  {/* Outcome & learnings – {placecard_6 img} */}
                  <section className="space-y-3">
                    <h3 className="text-sm font-normal text-slate-900 dark:text-slate-100">
                      Outcome
                    </h3>
                    <p>By the end of the weekend, we had:</p>
                    <ul className="list-disc list-inside space-y-1.5">
                      <li>Invite-only onboarding.</li>
                      <li>Real-time messaging (user-to-user and group).</li>
                      <li>Host approvals.</li>
                      <li>LLM-based user-to-host matching.</li>
                      <li>LLM-based shopping list generation.</li>
                      <li>Abuse reporting.</li>
                      <li>Core social features like posting and comments.</li>
                    </ul>
                    <p>
                      All of this ran on a deployed stack on Railway + Vercel that people could actually use during and
                      after the hackathon.
                    </p>

                    <h3 className="text-sm font-normal text-slate-900 dark:text-slate-100 mt-4">
                      What I learned
                    </h3>
                    <p>
                      The main takeaway was the importance of trust in a social network. It should never be an
                      afterthought if you expect people to feel safe showing up in person. Placecard was an exercise in
                      designing that trust in from day one.
                    </p>
                    <p>
                      It was also a good experiment in integrating AI in a way that actually improves the experience,
                      rather than using it as a gimmick.
                    </p>

                    <h3 className="text-sm font-normal text-slate-900 dark:text-slate-100 mt-4">
                      The logo (yes, really)
                    </h3>
                    <p>
                      The logo was drawn by me in Canva at 2am with a mouse. No design system or Figma — just sleep
                      deprivation and a Logitech MX Vertical.
                    </p>
                    <p>
                      Placecard is not perfect, but we shipped a feature-rich social product in 36 hours and I&apos;m
                      genuinely proud of how far we got in that time.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        openLightbox(
                          '/placecard_logocanva.png',
                          'Placecard logo drawn in Canva at 2am'
                        )
                      }
                      className="mt-3 text-left"
                    >
                      <div className="relative aspect-[4/3] max-w-sm rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900/5 dark:bg-slate-900/40 mx-auto">
                        <Image
                          src="/placecard_logocanva.png"
                          alt="Placecard logo drawn in Canva"
                          fill
                          className="object-contain"
                          sizes="(min-width: 1024px) 320px, 80vw"
                        />
                      </div>
                      <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-light text-center">
                        The original Placecard logo, hand-drawn in Canva at 2am with a mouse.
                      </p>
                    </button>
                  </section>
                </div>
              </article>
              )}

              {/* FortuneVantage case study */}
              {activeCaseStudy === 'fortune' && (
              <article className="rounded-2xl border border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/80 p-6 sm:p-8 shadow-sm">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light uppercase tracking-[0.2em] mb-3">
                  Case study · Internal tooling
                </p>
                <h2 className="text-2xl md:text-3xl font-extralight text-slate-900 dark:text-slate-100 tracking-tight mb-2">
                  FortuneVantage – decision support &amp; BI platform
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-light mb-4">
                  Internal BI and decision support platform for wholesale operations.
                </p>

                {/* Hero screenshot – overview dashboard */}
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={() =>
                      openLightbox(
                        '/vantage_1.png',
                        'FortuneVantage overview dashboard (seed data)'
                      )
                    }
                    className="block w-full text-left"
                  >
                    <div className="relative aspect-[4/3] max-w-3xl mx-auto rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900/5 dark:bg-slate-900/40 group">
                      <Image
                        src="/vantage_1.png"
                        alt="FortuneVantage overview dashboard (seed data)"
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-[1.02] bg-slate-950"
                        sizes="(min-width: 1024px) 800px, 100vw"
                      />
                    </div>
                    <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-light text-center">
                      Overview dashboard for FortuneVantage. All screenshots use seeded / anonymised data only.
                    </p>
                  </button>
                </div>

                <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                  {/* Introduction */}
                  <section className="space-y-3">
                    <h3 className="text-sm font-normal text-slate-900 dark:text-slate-100">
                      Introduction
                    </h3>
                    <p>
                      FortuneVantage is a Flask-based business intelligence platform built to manage customers, orders,
                      and sales analytics for my family&apos;s wholesale business, Fortune Foods UK. The goal was to
                      replace various spreadsheets, Python scripts and Sage50 analytics with a single internal tool that
                      could handle day-to-day operations, forecasting, and reporting in one place.
                    </p>
                    <p>
                      I built this end-to-end, from database design and encryption to the Flask backend, analytics
                      dashboards, and ML forecasting. The focus from the start was reliability, security, and building
                      something that could actually be used by non-technical users in a real business environment.
                    </p>
                  </section>

                  {/* Problem */}
                  <section className="space-y-3">
                    <h3 className="text-sm font-normal text-slate-900 dark:text-slate-100">
                      The problem
                    </h3>
                    <p>
                      Most internal tools start as spreadsheets that slowly turn into critical infrastructure. That
                      works until it doesn&apos;t. Reporting becomes slow, access control is inconsistent, sensitive
                      fields live in plain text, and forecasting is either manual or not done at all.
                    </p>
                    <p>
                      The goal with FortuneVantage was to build a single internal system that centralises customer and
                      order data, displays analytics in a way that operations and sales teams can actually use, and
                      treats security and access control as core requirements, not afterthoughts. This was less about
                      building a dashboard and more about replacing fragile workflows with something that could scale
                      without becoming a security liability.
                    </p>
                  </section>

                  {/* How I built it */}
                  <section className="space-y-3">
                    <h3 className="text-sm font-normal text-slate-900 dark:text-slate-100">
                      How I built it
                    </h3>
                    <p>
                      The stack was chosen to keep the system simple to deploy while still being secure enough for
                      internal production use:
                    </p>
                    <ul className="list-disc list-inside space-y-1.5">
                      <li>
                        <span className="font-normal">Backend:</span> Python (Flask)
                      </li>
                      <li>
                        <span className="font-normal">Frontend:</span> React, JavaScript, Jinja templates + Chart.js +
                        Mapbox
                      </li>
                      <li>
                        <span className="font-normal">Auth &amp; data:</span> Flask-Login + SQLite
                      </li>
                      <li>
                        <span className="font-normal">ML:</span> Prophet for time series forecasting
                      </li>
                      <li>
                        <span className="font-normal">Infra:</span> cPanel
                      </li>
                      <li>
                        <span className="font-normal">Config:</span> environment variables + security_config.txt
                        (excluded from version control)
                      </li>
                    </ul>
                    <p>
                      The backend handles authentication, role-based access control, session management, encryption,
                      auditing, and all analytics and forecasting logic. The frontend focuses on dashboards, customer
                      views, order analysis, and map-based visualisations that make sales performance easier to reason
                      about for non-technical users.
                    </p>
                  </section>

                  {/* Security & access control */}
                  <section className="space-y-3">
                    <h3 className="text-sm font-normal text-slate-900 dark:text-slate-100">
                      Security &amp; access control
                    </h3>
                    <p>
                      This system was designed to hold real customer and financial data, so security was paramount. Some
                      of the controls enforced at the application and data layer:
                    </p>
                    <ul className="list-disc list-inside space-y-1.5">
                      <li>Argon2 password hashing with strength validation.</li>
                      <li>Role-based access control with admin, user, and super admin modes.</li>
                      <li>One active session per user with automatic termination on new login.</li>
                      <li>Session timeouts, automatic session ID rotation, and IP tracking.</li>
                      <li>Account lockout after repeated failed login attempts and rate limiting on auth/API.</li>
                      <li>CSRF protection, strict security headers, and HTTPS enforcement in production.</li>
                      <li>Parameterized queries and field-level encryption for sensitive data.</li>
                      <li>Encryption key management and security config kept outside version control.</li>
                      <li>Full audit logging for user actions, imports, and system-level changes.</li>
                    </ul>
                    <p>
                      The application will not start without a valid secret key, and sensitive configuration is stored
                      outside the repository by design.
                    </p>
                  </section>

                  {/* BI & forecasting */}
                  <section className="space-y-3">
                    <h3 className="text-sm font-normal text-slate-900 dark:text-slate-100">
                      Business intelligence &amp; forecasting
                    </h3>
                    <p>
                      The platform is built around a small number of workflows that matter operationally: sales
                      dashboards, customer profiles, and forecasting.
                    </p>
                    {/* BI screenshots */}
                    <div className="grid gap-3 sm:grid-cols-2 mt-3">
                      <button
                        type="button"
                        onClick={() =>
                          openLightbox(
                            '/vantage_2.png',
                            'FortuneVantage sales dashboard with KPIs (seed data)'
                          )
                        }
                        className="text-left"
                      >
                        <div className="relative aspect-[4/3] max-w-xl mx-auto rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 group">
                          <Image
                            src="/vantage_2.png"
                            alt="FortuneVantage sales dashboard with KPIs (seed data)"
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-[1.02] bg-slate-950"
                            sizes="(min-width: 1024px) 400px, 50vw"
                          />
                        </div>
                        <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-light">
                          Customer details and statistics using seeded data only.
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          openLightbox(
                            '/vantage_3.png',
                            'FortuneVantage customer detail and forecasting view (seed data)'
                          )
                        }
                        className="text-left"
                      >
                        <div className="relative aspect-[4/3] max-w-xl mx-auto rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 group">
                          <Image
                            src="/vantage_3.png"
                            alt="FortuneVantage customer detail and forecasting view (seed data)"
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-[1.02] bg-slate-950"
                            sizes="(min-width: 1024px) 400px, 50vw"
                          />
                        </div>
                        <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-light">
                          National map with sales data by region.
                        </p>
                      </button>
                    </div>
                    <ul className="list-disc list-inside space-y-1.5">
                      <li>Sales dashboards with multiple date ranges and regional breakdowns.</li>
                      <li>Interactive charts and geographic visualisations.</li>
                      <li>Customer profiles with full order history and sales metrics.</li>
                      <li>Customer segmentation for overdue, at-risk, and on-track accounts.</li>
                      <li>Top customer rankings and revenue concentration views.</li>
                      <li>Order management with filtering and status tracking.</li>
                    </ul>
                    <p>
                      Forecasting is built into customer and order views using Prophet-based time series models. For
                      customers with sufficient history, the system provides next-order predictions, 10-week revenue
                      forecasts, trend and seasonality signals, and model performance metrics like MAE, RMSE, MAPE, and
                      R². When forecasts can&apos;t be generated, the system explains why instead of silently failing.
                    </p>
                  </section>

                  {/* Ops workflows & controls */}
                  <section className="space-y-3">
                    <h3 className="text-sm font-normal text-slate-900 dark:text-slate-100">
                      Ops workflows &amp; system controls
                    </h3>
                    <p>
                      A large part of the platform is operational integrations that remove or reduce manual work:
                    </p>
                    <ul className="list-disc list-inside space-y-1.5">
                      <li>Excel import for customers and orders with postcode cleaning.</li>
                      <li>CSV import for product stock and offers.</li>
                      <li>Catalogue generation using fixed HTML templates.</li>
                      <li>Export workflows for downstream tools.</li>
                      <li>Background processing for long-running ML tasks.</li>
                    </ul>
                    <p>
                      The application also includes system-level controls like maintenance mode, read-only mode, and
                      session monitoring so it can be safely operated in production by non-technical staff.
                    </p>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() =>
                          openLightbox(
                            '/vantage_4.png',
                            'FortuneVantage import and catalogue tooling (seed data)'
                          )
                        }
                        className="text-left"
                      >
                        <div className="relative aspect-[4/3] max-w-xl mx-auto rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/40 group">
                          <Image
                            src="/vantage_4.png"
                            alt="FortuneVantage import and catalogue tooling (seed data)"
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-[1.02] bg-slate-950"
                            sizes="(min-width: 1024px) 480px, 90vw"
                          />
                        </div>
                        <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-light">
                          Labelling module with one-click translation, compliance checks, and barcode generation.
                        </p>
                      </button>
                    </div>
                  </section>

                  {/* Trade-offs & outcome */}
                  <section className="space-y-3">
                    <h3 className="text-sm font-normal text-slate-900 dark:text-slate-100">
                      Trade-offs &amp; outcome
                    </h3>
                    <p>
                      This is not a cloud-native or infinitely scalable BI platform. It is intentionally simple to keep
                      it reliable and operable by a small team: SQLite instead of a managed database, Flask and
                      server-side rendering instead of a heavier frontend stack, and lightweight background jobs instead
                      of a full ML pipeline.
                    </p>
                    <p>
                      FortuneVantage replaced a collection of spreadsheets and manual reports with a single internal
                      system for customer management, analytics, and forecasting. It&apos;s used to monitor sales
                      performance, identify at-risk accounts, generate catalogues, and forecast upcoming revenue.
                    </p>
                    <p>
                      More importantly, it forced me to design for real operational constraints: security, data
                      integrity, maintainability, and the reality that internal tools still need to be boring and
                      reliable to be useful.
                    </p>
                  </section>
                </div>
              </article>
              )}
            </div>
          </div>
        </section>
      </div>
      {/* Lightbox overlay */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[1300] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mac traffic lights bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/95">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] hover:bg-[#ff4b45] transition-colors duration-200 flex items-center justify-center group"
                  aria-label="Close"
                >
                  <span className="w-1 h-1 rounded-full bg-[#b3150b] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="w-2.5 h-2.5 rounded-full bg-[#febc2e] hover:bg-[#f5b01f] transition-colors duration-200 flex items-center justify-center group"
                  aria-label="Minimize"
                >
                  <span className="w-1 h-1 rounded-full bg-[#b07b10] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMaximizeNote(true)
                    setTimeout(() => setShowMaximizeNote(false), 2200)
                  }}
                  className="w-2.5 h-2.5 rounded-full bg-[#28c840] hover:bg-[#20d046] transition-colors duration-200 flex items-center justify-center group"
                  aria-label="Maximize"
                >
                  <span className="w-1 h-1 rounded-full bg-[#006500] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              </div>
              {lightboxAlt && (
                <span className="ml-3 text-[11px] text-slate-400 font-light truncate">
                  {lightboxAlt}
                </span>
              )}
              <button
                type="button"
                onClick={closeLightbox}
                className="ml-3 text-[11px] text-slate-400 hover:text-slate-200 font-light"
              >
                Close
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center bg-black">
              <div className="relative w-full max-w-4xl aspect-[4/3]">
                <Image
                  src={lightboxSrc}
                  alt={lightboxAlt ?? 'Expanded view'}
                  fill
                  sizes="(min-width: 1024px) 768px, 100vw"
                  className="object-contain"
                />
              </div>
            </div>

            {showMaximizeNote && (
              <div className="absolute top-10 left-4 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg px-3 py-2 text-xs text-slate-700 dark:text-slate-200 font-light">
                What is there to maximise?
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default function CaseStudiesPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white dark:bg-slate-900">
        <Navigation />
        <div className="pt-20 pb-16 md:pb-0">
          <section className="pt-32 pb-32">
            <div className="max-w-5xl mx-auto px-6 sm:px-8">
              <div className="text-center">
                <p className="text-slate-500 dark:text-slate-400 font-light">Loading...</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    }>
      <CaseStudiesContent />
    </Suspense>
  )
}

