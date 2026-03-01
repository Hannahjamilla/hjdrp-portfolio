'use client'

import { useState, useEffect } from 'react'

export default function GlobalNavigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  })

  const theme = {
    textPrimary: '#6C131F',
    textSecondary: '#A14B58',
    borderColor: 'rgba(108, 19, 31, 0.15)',
  }

  const sections = ['home', 'about', 'work', 'projects', 'contact']

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)

      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getResponsiveValue = (desktop, tablet, mobile) => {
    if (windowSize.width < 768) return mobile
    if (windowSize.width < 1024) return tablet
    return desktop
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMobileMenuOpen(false)
    }
  }

  const isMobile = windowSize.width < 768

  return (
    <nav style={{
      position: 'fixed',
      top: isMobile ? '18px' : 0,
      left: isMobile ? '50%' : 0,
      right: isMobile ? 'auto' : 0,
      transform: isMobile ? 'translateX(-50%)' : 'none',
      height: isMobile ? 'auto' : '70px',
      width: isMobile ? 'auto' : '100%',
      background: isMobile 
        ? 'rgba(255, 236, 234, 0.9)' 
        : isScrolled ? 'rgba(255, 236, 234, 0.95)' : 'rgba(255, 236, 234, 0.8)',
      backdropFilter: isMobile ? 'blur(8px)' : 'blur(12px)',
      border: isMobile ? `1px solid ${theme.borderColor}` : 'none',
      borderBottom: isMobile ? `1px solid ${theme.borderColor}` : `1px solid ${theme.borderColor}`,
      borderRadius: isMobile ? '10px' : '0',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      padding: isMobile ? '2px 6px' : '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'center' : 'space-between',
      boxShadow: isMobile ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none',
    }}>
      {!isMobile && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
        }}>
          {/* Logo - Desktop only */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '120%',
              height: '120%',
              background: 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)',
              borderRadius: '50%',
              opacity: isScrolled ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}></div>
            <img 
              src="/images/HanMade.png" 
              alt="HanMade Logo" 
              style={{
                height: getResponsiveValue(32, 28, 25),
                width: 'auto',
                objectFit: 'contain',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                zIndex: 2,
                cursor: 'pointer',
              }}
              onClick={() => scrollToSection('home')}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.1) rotate(5deg)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1) rotate(0deg)'
              }}
            />
          </div>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            gap: getResponsiveValue(18, 15, 12),
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.03)',
            padding: '6px 12px',
            borderRadius: '50px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
          }}>
            {sections.map((section) => (
              <a 
                key={section}
                href={`#${section}`} 
                style={{
                  color: activeSection === section ? theme.textPrimary : theme.textSecondary,
                  textDecoration: 'none',
                  fontSize: getResponsiveValue('0.8rem', '0.75rem', '0.7rem'),
                  fontWeight: activeSection === section ? '700' : '600',
                  padding: '6px 10px',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  whiteSpace: 'nowrap',
                  borderRadius: '25px',
                  background: activeSection === section ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                }} 
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(section)
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== section) {
                    e.target.style.color = theme.textPrimary
                    e.target.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== section) {
                    e.target.style.color = theme.textSecondary
                    e.target.style.transform = 'translateY(0)'
                  }
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Floating Navigation */}
      {isMobile && (
        <div style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {sections.map((section) => (
            <a 
              key={section}
              href={`#${section}`} 
              style={{
                color: activeSection === section ? '#FFFFFF' : theme.textSecondary,
                textDecoration: 'none',
                fontSize: '0.68rem',
                fontWeight: activeSection === section ? '700' : '600',
                padding: '0px 8px',
                textAlign: 'center',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '7px',
                background: activeSection === section ? theme.textPrimary : 'transparent',
                textTransform: 'uppercase',
                letterSpacing: '0.1px',
                cursor: 'pointer',
                width: '60px',
                height: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                boxShadow: activeSection === section ? '0 1px 2px rgba(108, 19, 31, 0.2)' : 'none',
              }} 
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(section)
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}