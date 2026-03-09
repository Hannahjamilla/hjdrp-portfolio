'use client'

import { useState, useEffect } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const Loading = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        onLoadingComplete()
      }, 500)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onLoadingComplete])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#ffffff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.5s ease-in-out',
      fontFamily: "'Poppins', sans-serif"
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      }}>
        <DotLottieReact
          src="https://lottie.host/804778ee-5a6e-46da-ae0c-bbc6edb26a82/ZcSfs4WX8x.lottie"
          loop
          autoplay
          style={{
            width: '150px',
            height: '150px'
          }}
        />
        <p style={{
          fontSize: '1.1rem',
          color: '#000000',
          fontWeight: '500',
          margin: 0,
          fontFamily: "'Poppins', sans-serif"
        }}>
          Loading Portfolio...
        </p>
      </div>
    </div>
  )
}

export default Loading