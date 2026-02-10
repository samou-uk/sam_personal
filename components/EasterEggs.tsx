'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

export default function EasterEggs() {
  const [konamiCode, setKonamiCode] = useState<string[]>([])
  const [showKonami, setShowKonami] = useState(false)
  const [showClickMessage, setShowClickMessage] = useState(false)
  const [clickMessage, setClickMessage] = useState('')
  const [showProfilePopup, setShowProfilePopup] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [showTypedMessage, setShowTypedMessage] = useState(false)
  const [typedMessage, setTypedMessage] = useState('')
  const [lastTriggeredPhrase, setLastTriggeredPhrase] = useState('')

  // Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Konami code detection
      const newSequence = [...konamiCode, e.code]
      if (newSequence.length > konamiSequence.length) {
        newSequence.shift()
      }
      
      if (newSequence.length === konamiSequence.length) {
        const matches = newSequence.every((key, index) => key === konamiSequence[index])
        if (matches) {
          setShowKonami(true)
          setTimeout(() => {
            setShowKonami(false)
          }, 3000)
          setKonamiCode([])
          return
        }
      }
      setKonamiCode(newSequence)

      // Special keyboard shortcuts
      if (e.key === '?' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        const helpMessages = [
          'Help? I can\'t even help myself.',
          'Looking for help? Try Google.',
          'The help you seek is not here.',
          'Help yourself to some coffee instead.'
        ]
        const randomHelp = helpMessages[Math.floor(Math.random() * helpMessages.length)]
        setClickMessage(randomHelp)
        setShowClickMessage(true)
        setTimeout(() => setShowClickMessage(false), 3000)
      }
      
      // Secret: Press 'h' 5 times quickly
      if (e.key.toLowerCase() === 'h') {
        const newTyped = (typedText + 'h').toLowerCase().slice(-5)
        if (newTyped === 'hhhhh') {
          const hMessages = [
            'Hhhhh... are you okay?',
            'That\'s a lot of H\'s. Need help?',
            'Hhhhhhhh... (that\'s the sound of me breathing)',
            'You typed "hhhhh". Very creative.'
          ]
          const randomH = hMessages[Math.floor(Math.random() * hMessages.length)]
          setClickMessage(randomH)
          setShowClickMessage(true)
          setTimeout(() => setShowClickMessage(false), 2000)
          setTypedText('')
        }
      }

      // Typing detection
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const newTyped = (typedText + e.key).toLowerCase().slice(-20)
        setTypedText(newTyped)
        
        // Check for easter egg phrases - check in order of specificity (longer phrases first)
        const messages: { [key: string]: string } = {
          'samou': 'hello world',
          'waterloo': 'Currently here! It\'s too cold.',
          'london': 'My hometown! Where it rains 300 days a year',
          'tennis': 'My favorite sport! When I can find a court...',
          'piano': 'I used to play, not anymore though...',
          'math': 'What is the indefinite integral of x^2?',
          'coffee': 'Better than matcha.',
          'rain': 'You must be from London too...',
        }
        
        // Check phrases - only trigger once per phrase
        for (const [phrase, message] of Object.entries(messages)) {
          if (newTyped.includes(phrase) && lastTriggeredPhrase !== phrase) {
            setLastTriggeredPhrase(phrase)
            setTypedMessage(message)
            setShowProfilePopup(true)
            // Clear the typed text after a short delay to prevent retriggering
            setTimeout(() => {
              setShowProfilePopup(false)
              setLastTriggeredPhrase('')
              setTypedText('')
            }, 4000)
            break
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [konamiCode, typedText, lastTriggeredPhrase])


  // Profile picture click counter
  useEffect(() => {
    let clickCount = 0
    let clickTimeout: NodeJS.Timeout | null = null
    
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const img = target.closest('img[alt*="Sam"], img[src*="about"], img[src*="sam"]')
      
      if (img) {
        e.stopPropagation()
        clickCount++
        
        // Reset counter after 2 seconds of no clicks
        if (clickTimeout) {
          clearTimeout(clickTimeout)
        }
        clickTimeout = setTimeout(() => {
          clickCount = 0
        }, 2000)
        
        if (clickCount === 5) {
          setTypedMessage('Stop clicking my face!')
          setShowProfilePopup(true)
          setTimeout(() => {
            setShowProfilePopup(false)
            setTypedMessage('')
          }, 4000)
          clickCount = 0
          if (clickTimeout) {
            clearTimeout(clickTimeout)
          }
        }
      }
    }
    
    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
      if (clickTimeout) {
        clearTimeout(clickTimeout)
      }
    }
  }, [])



  if (typeof window === 'undefined') return null

  return createPortal(
    <>
      {/* Konami Code Message */}
      {showKonami && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
          <div className="bg-black/80 dark:bg-white/80 text-white dark:text-black px-8 py-4 rounded-lg text-2xl font-light animate-pulse">
            +30 Lives! Wait, wrong game...
          </div>
        </div>
      )}

      {/* Click Message */}
      {showClickMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[10000] pointer-events-none">
          <div className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-light animate-bounce">
            {clickMessage || 'Hi there! You found me!'}
          </div>
        </div>
      )}

      {/* Profile Picture Popup with Speech Bubble */}
      {showProfilePopup && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm animate-fade-in"></div>
          
          <div className="relative animate-pop-in flex items-center gap-3 md:gap-6">
            {/* Profile Picture with glow effect */}
            <div className="relative w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden border-2 md:border-4 border-white dark:border-slate-800 shadow-2xl animate-bounce-subtle ring-2 md:ring-4 ring-primary/20 dark:ring-[#ADD8E6]/20 flex-shrink-0">
              <Image
                src="/sam.png"
                alt="Sam"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 96px, 160px"
              />
            </div>
            
            {/* Speech Bubble */}
            <div className="relative bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl px-4 py-3 md:px-8 md:py-5 shadow-2xl border border-slate-200/50 dark:border-slate-700/50 max-w-xs md:max-w-sm backdrop-blur-xl">
              <p className="text-slate-900 dark:text-slate-100 text-base md:text-xl font-light leading-relaxed">
                {typedMessage || 'Stop clicking my face!'}
              </p>
              {/* Speech bubble tail pointing left */}
              <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2">
                <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-r-[16px] md:border-t-[18px] md:border-b-[18px] md:border-r-[24px] border-t-transparent border-b-transparent border-r-white dark:border-r-slate-800 drop-shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Typed Message */}
      {showTypedMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[10000] pointer-events-none">
          <div className="bg-primary/90 dark:bg-[#ADD8E6]/90 text-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-light animate-fade-in">
            {typedMessage || 'You\'re paying attention!'}
          </div>
        </div>
      )}

    </>,
    document.body
  )
}

