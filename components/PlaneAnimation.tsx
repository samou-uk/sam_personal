'use client'

import { useEffect, useState } from 'react'

export default function PlaneAnimation() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    // Only animate once per session
    if (!hasAnimated) {
      setIsAnimating(true)
      setHasAnimated(true)
      // Hide after animation completes
      const timer = setTimeout(() => setIsAnimating(false), 3500)
      return () => clearTimeout(timer)
    }
  }, [hasAnimated])

  // Always show the animation container, but only animate once
  return (
    <div className="relative w-full h-64 pointer-events-none overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 300"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* London marker */}
        <circle
          cx="150"
          cy="150"
          r="5"
          fill="currentColor"
          className="text-primary"
        >
          <animate
            attributeName="opacity"
            values="1;0.5;1"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        <text
          x="150"
          y="140"
          textAnchor="middle"
          className="text-[10px] fill-slate-600 dark:fill-slate-400 font-light"
        >
          London
        </text>

        {/* Toronto marker */}
        <circle
          cx="750"
          cy="120"
          r="5"
          fill="currentColor"
          className="text-primary"
        >
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="1.5s"
            repeatCount="indefinite"
            begin="1.5s"
          />
        </circle>
        <text
          x="750"
          y="110"
          textAnchor="middle"
          className="text-[10px] fill-slate-600 dark:fill-slate-400 font-light"
        >
          Toronto
        </text>

        {/* Flight path */}
        <path
          d="M 150 150 Q 450 120 750 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4,4"
          className="text-slate-300 dark:text-slate-700"
          opacity="0.4"
        />

        {/* Plane */}
        {isAnimating && (
          <g className="animate-fly">
            <g transform="translate(150, 150)">
              {/* Plane body */}
              <path
                d="M 0 0 L 24 -6 L 24 6 Z"
                fill="currentColor"
                className="text-primary"
                transform="rotate(-20)"
              />
              <circle
                cx="10"
                cy="0"
                r="4"
                fill="currentColor"
                className="text-primary"
              />
              {/* Wing */}
              <path
                d="M 8 -2 L 16 -8 L 16 -4 Z"
                fill="currentColor"
                className="text-primary/80"
                transform="rotate(-20)"
              />
            </g>
          </g>
        )}
      </svg>

      <style jsx>{`
        @keyframes fly {
          0% {
            transform: translate(0, 0) rotate(-20deg);
            opacity: 1;
          }
          50% {
            transform: translate(300px, -15px) rotate(-15deg);
            opacity: 1;
          }
          100% {
            transform: translate(600px, -30px) rotate(-10deg);
            opacity: 0;
          }
        }
        .animate-fly {
          animation: fly 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  )
}

