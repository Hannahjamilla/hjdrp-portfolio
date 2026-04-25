'use client'

import { useState, useEffect } from 'react'

export default function GlobalNavigation() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Always start with desktop width so SSR and first client render match,
  // then sync the real width after mount.
  const [windowWidth, setWindowWidth] = useState(1200)

  const theme = {
    textPrimary: '#2D5A4F',
    textSecondary: '#2D5A4F',
    bgSecondary: '#f5f1ed',
    borderColor: 'rgba(45, 90, 79, 0.15)',
  }

  const sections = ['home', 'about', 'work', 'projects', 'contact']

  useEffect(() => {
    // Mark as mounted and sync real window width in one pass
    setMounted(true)
    setWindowWidth(window.innerWidth)

    let timeoutId = null
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth)
      }, window.innerWidth < 768 ? 300 : 150)
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)

      if (window.innerWidth < 768 && scrollTop % 10 !== 0) return

      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const isMobile = mounted && windowWidth < 768
  const isTablet = mounted && windowWidth >= 768 && windowWidth < 1024

  const getResponsiveValue = (desktop, tablet, mobile) => {
    if (!mounted) return desktop
    if (windowWidth < 768) return mobile
    if (windowWidth < 1024) return tablet
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

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      // Always render desktop height initially; updates after mount
      height: isMobile ? '60px' : '70px',
      width: '100%',
      background: isMobile
        ? 'rgba(245, 241, 237, 0.95)'
        : isScrolled ? 'rgba(245, 241, 237, 0.95)' : 'rgba(245, 241, 237, 0.8)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${theme.borderColor}`,
      zIndex: 1000,
      transition: mounted ? 'all 0.3s ease' : 'none',
      padding: isMobile ? '0 16px' : '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: isMobile || isScrolled ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
    }}>

      {/* Desktop Navigation — always rendered on server, hidden on mobile after mount */}
      {!isMobile && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
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
            }} />
            <img
              src="/images/HanMade.webp"
              alt="HanMade Logo"
              width={32}
              height={32}
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
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) rotate(0deg)' }}
            />
          </div>

          {/* Nav Links */}
          <div style={{
            display: 'flex',
            gap: getResponsiveValue(18, 15, 12),
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.03)',
            padding: '8px 12px',
            borderRadius: '50px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            marginTop: '8px',
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
                onClick={(e) => { e.preventDefault(); scrollToSection(section) }}
                onMouseEnter={(e) => {
                  if (activeSection !== section) {
                    e.currentTarget.style.color = theme.textPrimary
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== section) {
                    e.currentTarget.style.color = theme.textSecondary
                    e.currentTarget.style.transform = 'translateY(0)'
                  }
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Navigation — only rendered after mount confirms mobile width */}
      {isMobile && (
        <>
          {/* Mobile Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/images/HanMade.webp"
              alt="HanMade Logo"
              width={28}
              height={28}
              style={{ height: 28, width: 'auto', objectFit: 'contain', cursor: 'pointer' }}
              onClick={() => scrollToSection('home')}
            />
          </div>

          {/* Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {[
              isMobileMenuOpen ? 'rotate(45deg) translateY(5px)' : 'none',
              null, // middle bar — controlled via opacity
              isMobileMenuOpen ? 'rotate(-45deg) translateY(-5px)' : 'none',
            ].map((transform, i) => (
              <div
                key={i}
                style={{
                  width: '20px',
                  height: '2px',
                  background: theme.textPrimary,
                  transition: 'all 0.3s ease',
                  transform: transform ?? undefined,
                  opacity: i === 1 && isMobileMenuOpen ? 0 : 1,
                }}
              />
            ))}
          </button>
        </>
      )}

      {/* Mobile Dropdown Menu */}
      {isMobile && isMobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '16px',
          width: '200px',
          background: 'rgba(245, 241, 237, 0.98)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${theme.borderColor}`,
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          zIndex: 1001,
        }}>
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              style={{
                color: activeSection === section ? '#FFFFFF' : theme.textSecondary,
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: activeSection === section ? '700' : '600',
                padding: '10px 14px',
                textAlign: 'left',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: '8px',
                background: activeSection === section ? theme.textPrimary : 'transparent',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                border: activeSection === section ? 'none' : '1px solid transparent',
              }}
              onClick={(e) => { e.preventDefault(); scrollToSection(section) }}
              onMouseEnter={(e) => {
                if (activeSection !== section) {
                  e.currentTarget.style.background = 'rgba(108, 19, 31, 0.1)'
                  e.currentTarget.style.borderColor = theme.borderColor
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== section) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'transparent'
                }
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