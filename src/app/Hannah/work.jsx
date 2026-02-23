'use client'

import { useEffect, useState } from 'react'
import GlobalNavigation from '../components/GlobalNavigation'
import { useResponsive } from '../hooks/useResponsive'

export default function Work() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const { isMobile, isTablet, isDesktop, getResponsiveValue } = useResponsive()

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setIsVisible(true), 300)
    
    // Add basic animations
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      clearTimeout(timer)
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  if (!mounted) return null

  const experiences = [
    {
      id: 1,
      organization: "Executive Secretary's Office",
      location: "National University - Baliwag, Bulacan",
      role: "Core Member",
      duration: "2023-2024",
      responsibilities: [
        "Participated in organizing university-level Quiz Bee competitions",
        "Coordinated academic communications and event logistics"
      ]
    },
    {
      id: 2,
      organization: "AWS Cloud Clubs",
      location: "National University - Baliwag, Bulacan",
      role: "Committee Member – Chief Skill Development Office",
      duration: "2025-Present",
      responsibilities: [
        "Organized cloud learning sessions for IT students",
        "Supported cloud workshops and technical training programs"
      ]
    }
  ]

  const theme = {
    primary: '#6C131F',
    secondary: '#A14B58',
    light: '#FFECEA',
    border: 'rgba(108, 19, 31, 0.15)',
    accent: '#A14B58'
  }

  return (
    <div>
      <GlobalNavigation />
      <section
      id="work"
      style={{
        minHeight: '100vh',
        padding: getResponsiveValue('100px 20px', '80px 15px', '60px 10px'),
        background: '#ffffff',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s ease'
      }}
    >
      {/* RESPONSIVE HEADER */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: getResponsiveValue('100px', '80px', '50px') 
      }}>
        <p style={{
          letterSpacing: getResponsiveValue('4px', '3px', '2px'),
          fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
          fontWeight: 800,
          color: theme.secondary,
          textTransform: 'uppercase',
          marginBottom: '15px',
        }}>
          PROFESSIONAL JOURNEY
        </p>

        <h1 style={{
          fontSize: getResponsiveValue('4.5rem', '3.5rem', '2.5rem'),
          fontWeight: 900,
          marginTop: '15px',
          marginBottom: '25px',
          lineHeight: getResponsiveValue(0.9, 0.85, 0.9),
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
        }}>
          <span style={{
            color: '#6C131F',
          }}>
            Work
          </span>{' '}
          <span style={{
            color: theme.primary,
            position: 'relative',
            display: 'inline-block',
          }}>
            Experience
            <span style={{
              position: 'absolute',
              bottom: getResponsiveValue('-8px', '-6px', '-4px'),
              left: '0',
              width: '100%',
              height: getResponsiveValue('6px', '4px', '3px'),
              background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`,
              borderRadius: '3px',
            }}></span>
          </span>
        </h1>

        <div style={{
          width: getResponsiveValue('120px', '100px', '80px'),
          height: getResponsiveValue('6px', '4px', '3px'),
          background: `linear-gradient(90deg, transparent, ${theme.primary}, transparent)`,
          margin: '0 auto',
          borderRadius: '3px'
        }} />
      </div>

      {/* RESPONSIVE GRID CONTAINER */}
      <div 
        style={{
          maxWidth: getResponsiveValue('1200px', '800px', '100%'),
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: getResponsiveValue('40px', '30px', '25px'),
          padding: getResponsiveValue('0 20px', '0 15px', '0 10px'),
        }}
      >
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
              borderRadius: getResponsiveValue('24px', '20px', '16px'),
              padding: getResponsiveValue('40px', '30px', '20px'),
              border: `2px solid ${theme.border}`,
              boxShadow: hoveredIndex === index
                ? '0 30px 60px rgba(0,0,0,0.15)'
                : '0 15px 35px rgba(0,0,0,0.08)',
              transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              transform: hoveredIndex === index && !isMobile ? 'translateY(-15px) scale(1.02)' : 'translateY(0) scale(1)',
              position: 'relative',
              overflow: 'hidden',
              opacity: isVisible ? 1 : 0,
              animation: `fadeInUp 0.6s ease-out ${index * 0.2}s forwards`,
            }}
          >
            {/* Background Pattern */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: getResponsiveValue('120px', '100px', '80px'),
                height: getResponsiveValue('120px', '100px', '80px'),
                background: `linear-gradient(135deg, ${theme.primary}08, transparent)`,
                borderBottomLeftRadius: getResponsiveValue('60px', '50px', '40px'),
              }}
            ></div>

            {/* Card Number */}
            <div 
              style={{
                position: 'absolute',
                top: getResponsiveValue('20px', '15px', '12px'),
                right: getResponsiveValue('20px', '15px', '12px'),
                width: getResponsiveValue('50px', '45px', '35px'),
                height: getResponsiveValue('50px', '45px', '35px'),
                background: `linear-gradient(135deg, ${theme.primary} 0%, #333333 100%)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: getResponsiveValue('1.2rem', '1.1rem', '0.9rem'),
                fontWeight: '800',
                boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Duration Badge */}
            <div 
              style={{
                display: 'inline-block',
                background: `${theme.primary}15`,
                color: theme.primary,
                padding: getResponsiveValue('8px 16px', '6px 12px', '5px 10px'),
                borderRadius: '20px',
                fontSize: getResponsiveValue('0.8rem', '0.75rem', '0.7rem'),
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '20px',
              }}
            >
              {exp.duration}
            </div>

            <h3 style={{
              fontSize: getResponsiveValue('1.6rem', '1.4rem', '1.2rem'),
              fontWeight: '900',
              marginBottom: getResponsiveValue('8px', '6px', '5px'),
              background: `${theme.primary}`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.2,
            }}>
              {exp.organization}
            </h3>

            <div 
              style={{
                fontSize: getResponsiveValue('1.1rem', '1.05rem', '1rem'),
                fontWeight: '700',
                color: theme.primary,
                marginBottom: '8px',
              }}
            >
              {exp.role}
            </div>

            <p 
              style={{
                fontSize: getResponsiveValue('0.95rem', '0.9rem', '0.85rem'),
                color: theme.secondary,
                marginBottom: '25px',
                opacity: 0.8,
              }}
            >
              {exp.location}
            </p>

            {/* Responsibilities */}
            <div 
              style={{
                marginTop: getResponsiveValue('25px', '20px', '15px'),
              }}
            >
              <h4 style={{
                fontSize: getResponsiveValue('1rem', '0.95rem', '0.9rem'),
                fontWeight: '700',
                color: theme.primary,
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Key Responsibilities
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: getResponsiveValue('12px', '10px', '8px'),
              }}>
                {exp.responsibilities.map((item, i) => (
                  <div 
                    key={i} 
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: getResponsiveValue('12px 0', '10px 0', '8px 0'),
                      borderBottom: i < exp.responsibilities.length - 1 ? `1px solid ${theme.border}` : 'none',
                    }}
                  >
                    <div style={{
                      width: '6px',
                      height: '6px',
                      background: `linear-gradient(135deg, ${theme.primary} 0%, #333333 100%)`,
                      borderRadius: '50%',
                      marginTop: '8px',
                      flexShrink: 0,
                    }}></div>
                    <span 
                      style={{
                        fontSize: getResponsiveValue('0.95rem', '0.9rem', '0.85rem'),
                        lineHeight: 1.6,
                        color: theme.primary,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, transparent 50%)',
              opacity: hoveredIndex === index ? 1 : 0,
              transition: 'opacity 0.3s ease',
              borderRadius: getResponsiveValue('24px', '20px', '16px'),
              pointerEvents: 'none',
            }}></div>
          </div>
        ))}
      </div>

    </section>
    </div>
  )
}