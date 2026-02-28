'use client'

import { useEffect, useRef, useState } from 'react'
import { useMeIntro } from './hooks/useMeIntro'
import { createMeIntroStyles } from './styles/MeIntroStyles'
import GlobalNavigation from '../components/GlobalNavigation'
import ScrollToTop from './components/ScrollToTop'

export default function Introduction() {
  const {
    mounted,
    displayText,
    isTyping,
    activeSection,
    isVisible,
    mousePosition,
    showScrollTop,
    windowSize,
    getResponsiveValue,
    scrollToSection,
  } = useMeIntro()

  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)

  const theme = {
    bgPrimary: '#FFECEA',
    bgSecondary: '#ffffff',
    textPrimary: '#6C131F',
    textSecondary: '#A14B58',
    textMuted: '#A14B58',
    accentPrimary: '#6C131F',
    accentSecondary: '#A14B58',
  }

  // Expertise items with concise descriptions
  const expertiseItems = [
    { 
      title: 'DIGITAL ARCHITECTURE',
      description: 'Scalable, performant systems'
    },
    { 
      title: 'IMMERSIVE INTERFACES',
      description: 'Where interaction meets poetry'
    },
    { 
      title: 'CREATIVE DIRECTION',
      description: 'Visions to reality'
    },
    { 
      title: 'EXPERIENCE DESIGN',
      description: 'Moments that resonate'
    },
  ]

  const isMobile = windowSize.width < 768
  const isTablet = windowSize.width < 1024

  // Auto-rotate expertise
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % expertiseItems.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (mounted) {
      const style = document.createElement('style')
      style.textContent = createMeIntroStyles() + `
        @keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
@keyframes softFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes subtlePulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes rotateShape {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes floatRotate {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
          }
        }

        @keyframes morphBlob {
          0%, 100% { 
            border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
            transform: translateY(0px) rotate(0deg);
          }
          25% { 
            border-radius: 37% 63% 46% 54% / 48% 55% 45% 52%;
            transform: translateY(-10px) rotate(90deg);
          }
          50% { 
            border-radius: 54% 46% 63% 37% / 52% 45% 55% 48%;
            transform: translateY(-15px) rotate(180deg);
          }
          75% { 
            border-radius: 46% 54% 37% 63% / 45% 52% 48% 55%;
            transform: translateY(-5px) rotate(270deg);
          }
        }

        @keyframes slideLine {
          0%, 100% { 
            transform: translateX(-100px);
            opacity: 0;
          }
          50% { 
            transform: translateX(0px);
            opacity: 1;
          }
        }

        @keyframes slideLineVertical {
          0%, 100% { 
            transform: translateY(-50px);
            opacity: 0;
          }
          50% { 
            transform: translateY(0px);
            opacity: 1;
          }
        }

        @keyframes pulseGlow {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: scale(1.2);
            opacity: 1;
          }
        }

        ${[...Array(6)].map((_, i) => `
          @keyframes floatParticle${i} {
            0%, 100% { 
              transform: translateY(0px) translateX(0px);
              opacity: 0.3;
            }
            25% { 
              transform: translateY(-${10 + i * 5}px) translateX(${5 + i * 2}px);
              opacity: 0.8;
            }
            50% { 
              transform: translateY(-${15 + i * 3}px) translateX(-${3 + i}px);
              opacity: 1;
            }
            75% { 
              transform: translateY(-${8 + i * 2}px) translateX(${8 + i * 3}px);
              opacity: 0.6;
            }
          }
        `).join('')}

        .soft-float {
          animation: softFloat 6s ease-in-out infinite;
        }

        .subtle-pulse {
          animation: subtlePulse 3s ease-in-out infinite;
        }

        .slide-up-fade {
          animation: slideUpFade 0.8s ease-out forwards;
        }

        .scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px -20px ${theme.accentPrimary}40;
        }

        .hover-glow {
          transition: all 0.3s ease;
        }

        .hover-glow:hover {
          background: ${theme.accentPrimary}10;
          border-color: ${theme.accentPrimary};
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -10px ${theme.accentPrimary}30;
        }

        @media (prefers-reduced-motion: reduce) {
          .soft-float,
          .subtle-pulse,
          * {
            animation: none !important;
          }
        }
      `
      document.head.appendChild(style)

      return () => {
        if (document.head.contains(style)) {
          document.head.removeChild(style)
        }
      }
    }
  }, [mounted, theme])

  if (!mounted) return null

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <GlobalNavigation />

      {/* Main Container - Compact height */}
      <div style={{
        height: '100vh',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        background: `
          radial-gradient(circle at 20% 30%, ${theme.bgPrimary}60 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, ${theme.bgSecondary}80 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, ${theme.accentSecondary}20 0%, transparent 40%),
          conic-gradient(from 45deg at 60% 20%, ${theme.accentPrimary}10, transparent, ${theme.textSecondary}08),
          linear-gradient(135deg, ${theme.bgPrimary} 0%, ${theme.bgSecondary} 50%, ${theme.bgPrimary} 100%)
        `,
        padding: getResponsiveValue('0 120px', '0 60px', '0 24px'),
      }} id="home">

        {/* Advanced Decorative Elements */}
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          {/* Animated Geometric Shapes */}
          <div className="soft-float" style={{
            position: 'absolute',
            top: '10%',
            right: '8%',
            width: '300px',
            height: '300px',
            background: `conic-gradient(from 45deg, ${theme.accentPrimary}15, transparent, ${theme.textSecondary}10, transparent)`,
            borderRadius: '50%',
            animation: 'rotateShape 20s linear infinite',
            filter: 'blur(40px)',
          }} />

          <div style={{
            position: 'absolute',
            top: '60%',
            left: '5%',
            width: '250px',
            height: '250px',
            background: `linear-gradient(135deg, ${theme.bgPrimary}40, ${theme.accentSecondary}20)`,
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            animation: 'floatRotate 15s ease-in-out infinite',
            filter: 'blur(20px)',
          }} />

          {/* Morphing Blob */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '15%',
            width: '200px',
            height: '200px',
            background: `radial-gradient(circle, ${theme.accentPrimary}12, transparent 70%)`,
            borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
            animation: 'morphBlob 8s ease-in-out infinite',
            filter: 'blur(30px)',
          }} />

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${20 + i * 15}%`,
              left: `${10 + i * 12}%`,
              width: `${8 + i * 2}px`,
              height: `${8 + i * 2}px`,
              background: `${theme.accentPrimary}${30 + i * 10}`,
              borderRadius: '50%',
              animation: `floatParticle${i} ${6 + i}s ease-in-out infinite`,
            }} />
          ))}

          {/* Dynamic Grid Pattern */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0.05,
            }}
          >
            <defs>
              <pattern id="dynamicGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke={theme.textPrimary} strokeWidth="0.5" />
                <circle cx="30" cy="30" r="1" fill={theme.accentPrimary} opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dynamicGrid)" />
          </svg>

          {/* Animated Lines */}
          <div style={{
            position: 'absolute',
            top: '40%',
            right: '20%',
            width: '150px',
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${theme.accentPrimary}60, transparent)`,
            animation: 'slideLine 4s ease-in-out infinite',
          }} />

          <div style={{
            position: 'absolute',
            bottom: '30%',
            left: '25%',
            width: '2px',
            height: '100px',
            background: `linear-gradient(180deg, transparent, ${theme.textSecondary}40, transparent)`,
            animation: 'slideLineVertical 5s ease-in-out infinite reverse',
          }} />

          {/* Glowing Orbs */}
          <div style={{
            position: 'absolute',
            top: '15%',
            right: '30%',
            width: '80px',
            height: '80px',
            background: `radial-gradient(circle, ${theme.accentPrimary}20, transparent 70%)`,
            borderRadius: '50%',
            animation: 'pulseGlow 3s ease-in-out infinite',
            filter: 'blur(15px)',
          }} />

          <div style={{
            position: 'absolute',
            bottom: '20%',
            right: '15%',
            width: '60px',
            height: '60px',
            background: `radial-gradient(circle, ${theme.textSecondary}25, transparent 70%)`,
            borderRadius: '50%',
            animation: 'pulseGlow 4s ease-in-out infinite reverse',
            filter: 'blur(20px)',
          }} />

          {/* Interactive Cursor Trail */}
          <div style={{
            position: 'absolute',
            top: mousePosition.y - 100,
            left: mousePosition.x - 100,
            width: '200px',
            height: '200px',
            background: `radial-gradient(circle, ${theme.accentPrimary}08, transparent 70%)`,
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Content - Centered and compact */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: isMobile ? '32px' : '48px',
        }}>
          
          {/* Minimal badge */}
          <div className="scale-in" style={{ 
            opacity: isVisible ? 1 : 0,
          }}>
            <span style={{
              fontSize: '14px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: theme.textSecondary,
              display: 'inline-block',
              padding: '6px 16px',
              border: `1px solid ${theme.textSecondary}30`,
              borderRadius: '30px',
              minWidth: '320px',
              textAlign: 'center',
            }}>
              {displayText}
              <span style={{
                display: 'inline-block',
                width: '2px',
                height: '12px',
                background: theme.textPrimary,
                marginLeft: '4px',
                animation: 'blink 1s infinite',
                opacity: isTyping ? 1 : 0,
              }}></span>
            </span>
          </div>
          
          {/* Main Title - Bold and clean */}
          <div className="slide-up-fade" style={{ 
            opacity: isVisible ? 1 : 0,
            textAlign: 'center',
          }}>
            <h1 style={{
              fontSize: isMobile ? 'clamp(2.5rem, 8vw, 3.5rem)' : 'clamp(4rem, 6vw, 5.5rem)',
              fontWeight: '700',
              lineHeight: 1.1,
              color: theme.textPrimary,
              letterSpacing: '-0.03em',
              margin: 0,
            }}>
              <span style={{ display: 'block' }}>CRAFTING</span>
              <span style={{ 
                display: 'block',
                color: theme.textSecondary,
                fontWeight: '500',
                fontSize: '0.65em',
                marginTop: '4px',
              }}>
                DIGITAL POETRY
              </span>
            </h1>
          </div>

          {/* Rotating Expertise - Clean display */}
          <div className="scale-in" style={{
            maxWidth: '600px',
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
          }}>
            <div style={{
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              fontWeight: '400',
              color: theme.textMuted,
              lineHeight: 1.5,
            }}>
              <span style={{ color: theme.textPrimary }}>I specialize in </span>
              <span style={{
                color: theme.accentPrimary,
                fontWeight: '600',
                position: 'relative',
                display: 'inline-block',
              }}>
                {expertiseItems[activeIndex].title}
              </span>
            </div>
          </div>

          {/* Expertise Grid - Compact and minimal */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: isMobile ? '12px' : '24px',
            width: '100%',
            maxWidth: '900px',
            marginTop: '16px',
          }}>
            {expertiseItems.map((item, index) => (
              <div
                key={index}
                className="hover-glow"
                style={{
                  padding: isMobile ? '16px 12px' : '20px 16px',
                  background: index === activeIndex ? `${theme.accentPrimary}08` : 'transparent',
                  border: `1px solid ${index === activeIndex ? theme.accentPrimary : `${theme.textMuted}20`}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  color: index === activeIndex ? theme.accentPrimary : theme.textSecondary,
                  marginBottom: '8px',
                  letterSpacing: '1px',
                }}>
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 style={{
                  fontSize: isMobile ? '12px' : '14px',
                  fontWeight: '600',
                  color: index === activeIndex ? theme.textPrimary : theme.textSecondary,
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: isMobile ? '11px' : '12px',
                  color: theme.textMuted,
                  opacity: 0.8,
                  lineHeight: 1.4,
                  margin: 0,
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action - Simple but effective */}
          <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            marginTop: '16px',
          }}>
            <button 
              className="hover-lift"
              style={{
                padding: isMobile ? '12px 32px' : '14px 40px',
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: '500',
                background: theme.textPrimary,
                color: theme.bgPrimary,
                border: 'none',
                borderRadius: '40px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
              onClick={() => scrollToSection('projects')}
            >
              VIEW WORK
            </button>
            
            <button 
              className="hover-lift"
              style={{
                padding: isMobile ? '12px 32px' : '14px 40px',
                fontSize: isMobile ? '13px' : '14px',
                fontWeight: '500',
                background: 'transparent',
                color: theme.textPrimary,
                border: `1px solid ${theme.textPrimary}`,
                borderRadius: '40px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
              onClick={() => scrollToSection('contact')}
            >
              LET'S TALK
            </button>
          </div>
        </div>
      </div>

      <ScrollToTop showScrollTop={showScrollTop} />
    </div>
  )
}