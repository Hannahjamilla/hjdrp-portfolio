'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

const RoadScene = dynamic(() => import('./road-scene'), { ssr: false })

// Journey stops data
export const STOPS = [
  { id: 'home', label: 'Start', mile: 'Mile 0', emoji: '🏁', color: '#7EC8A4', t: 0 },
  { id: 'about', label: 'About Me', mile: 'Mile 1', emoji: '🛑', color: '#F4A261', t: 0.22 },
  { id: 'skills', label: 'Skills', mile: 'Mile 2', emoji: '🔧', color: '#457B9D', t: 0.38 },
  { id: 'work', label: 'Work', mile: 'Mile 3', emoji: '🏙️', color: '#E63946', t: 0.54 },
  { id: 'projects', label: 'Academic', mile: 'Mile 4', emoji: '🎓', color: '#6A4C93', t: 0.72 },
  { id: 'hobbies', label: 'Hobby Projects', mile: 'Mile 4.5', emoji: '🕹️', color: '#00F5FF', t: 0.85 },
  { id: 'contact', label: 'Destination', mile: 'Mile 5', emoji: '🌅', color: '#F8961E', t: 1.0 },
]

export const TOTAL_STOPS = STOPS.length

export default function RoadJourney() {
  const [activeStop, setActiveStop] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [mounted, setMounted] = useState(false)
  const scrollTimeoutRef = useRef(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleProgressUpdate = useCallback((progress) => {
    setScrollProgress(progress)
    const stopIndex = Math.min(
      Math.floor(progress * TOTAL_STOPS),
      TOTAL_STOPS - 1
    )
    setActiveStop(stopIndex)

    setIsScrolling(true)
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 300)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Three.js scene fills the entire viewport — no vertical scroll */}
      <RoadScene
        onProgressUpdate={handleProgressUpdate}
        activeStop={activeStop}
        scrollProgress={scrollProgress}
        isScrolling={isScrolling}
        stops={STOPS}
      />

      {/* HUD: Navigation dots removed for a cleaner look */}

      {/* HUD: Mile marker */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(12px)',
        borderRadius: '12px',
        padding: '10px 24px',
        color: '#fff',
        fontSize: '0.75rem',
        fontFamily: "'Inter', sans-serif",
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.55rem', opacity: 0.6, letterSpacing: '1.5px' }}>CURRENT LOCATION</span>
          <span>{STOPS[activeStop]?.mile} — {STOPS[activeStop]?.label}</span>
        </div>
        <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '0.55rem', opacity: 0.6, letterSpacing: '1.5px' }}>PROGRESS</span>
          <span>{Math.round(scrollProgress * 100)}%</span>
        </div>
      </div>
    </>
  )
}

