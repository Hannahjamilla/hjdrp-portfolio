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

  // Learning-focused expertise areas
  const expertiseItems = [
    { 
      title: 'ALWAYS CURIOUS, ALWAYS LEARNING',
      symbol: '◆',
      techCode: 'CURIOUS'
    },
    { 
      title: 'GROWING THROUGH EVERY CHALLENGE',
      symbol: '◇',
      techCode: 'GROWING'
    },
    { 
      title: 'OPEN TO LEARNING AND NEW IDEAS',
      symbol: '◈',
      techCode: 'OPEN'
    },
    { 
      title: 'BUILDING USEFUL WEB PROJECTS',
      symbol: '◉',
      techCode: 'BUILDING'
    },
  ]

  const isMobile = windowSize.width < 768
  const isTablet = windowSize.width < 1024
  const isSmallMobile = windowSize.width < 480

  // Remove auto-rotation - let user control interaction
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveIndex((prev) => (prev + 1) % expertiseItems.length)
  //   }, 3000)
  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    if (mounted) {
      const style = document.createElement('style')
      style.textContent = createMeIntroStyles() + `
        @keyframes techGlow {
          0%, 100% { 
            box-shadow: 0 0 20px ${theme.accentPrimary}20;
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 40px ${theme.accentPrimary}40;
            transform: scale(1.02);
          }
        }

        @keyframes dataFlow {
          0% { 
            transform: translateX(-100%);
            opacity: 0;
          }
          50% { 
            opacity: 1;
          }
          100% { 
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes circuitPulse {
          0%, 100% { 
            stroke-dashoffset: 0;
            opacity: 0.3;
          }
          50% { 
            stroke-dashoffset: -20;
            opacity: 1;
          }
        }

        @keyframes matrixRain {
          0% { 
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% { 
            opacity: 1;
          }
          90% { 
            opacity: 1;
          }
          100% { 
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes hologramFlicker {
          0%, 100% { 
            opacity: 1;
            filter: hue-rotate(0deg);
          }
          25% { 
            opacity: 0.8;
            filter: hue-rotate(90deg);
          }
          50% { 
            opacity: 0.9;
            filter: hue-rotate(180deg);
          }
          75% { 
            opacity: 0.7;
            filter: hue-rotate(270deg);
          }
        }

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

        .tech-glow {
          animation: techGlow 2s ease-in-out infinite;
        }

        .circuit-pulse {
          animation: circuitPulse 2s ease-in-out infinite;
        }

        .hologram-flicker {
          animation: hologramFlicker 1.5s ease-in-out infinite;
        }

        .tech-card {
          position: relative;
          overflow: hidden;
        }

        .tech-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, ${theme.accentPrimary}20, transparent);
          transition: left 0.5s ease;
        }

        .tech-card:hover::before {
          left: 100%;
        }

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
    <div ref={containerRef} style={{ position: 'relative', width: '100%', overflow: 'visible' }}>
      <GlobalNavigation />

      {/* Main Container - Adjusted for navigation visibility */}
      <div className="content-container" style={{
        minHeight: '100vh',
        minHeight: '100dvh',
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
        padding: getResponsiveValue('20px 40px', '16px 30px', '12px 16px'),
        paddingTop: getResponsiveValue('120px', '100px', '80px'), // Increased top padding for navigation
        paddingBottom: getResponsiveValue('60px', '50px', '40px'), // Increased bottom padding
        width: '100%',
        overflow: 'visible',
      }} id="home">

        {/* Responsive decorative elements */}
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          {/* Enhanced technical circuit lines */}
          <svg
            style={{
              position: 'absolute',
              top: getResponsiveValue('20%', '15%', '10%'),
              right: getResponsiveValue('10%', '8%', '5%'),
              width: getResponsiveValue('200px', '150px', '100px'),
              height: getResponsiveValue('200px', '150px', '100px'),
              opacity: getResponsiveValue(0.4, 0.3, 0.25),
            }}
          >
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.accentPrimary} stopOpacity="0.9" />
                <stop offset="50%" stopColor={theme.textSecondary} stopOpacity="0.6" />
                <stop offset="100%" stopColor={theme.accentPrimary} stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path
              d={getResponsiveValue(
                "M20,20 L180,20 L180,60 L100,60 L100,140 L180,140 L180,180",
                "M15,15 L135,15 L135,45 L75,45 L75,105 L135,105 L135,135",
                "M10,10 L90,10 L90,30 L50,30 L50,70 L90,70 L90,90"
              )}
              fill="none"
              stroke="url(#circuitGradient)"
              strokeWidth={getResponsiveValue("2", "1.5", "1")}
              strokeDasharray="8,4"
              className="circuit-pulse"
              filter="url(#glow)"
            />
            {/* Enhanced circuit nodes */}
            <circle cx={getResponsiveValue("20", "15", "10")} cy={getResponsiveValue("20", "15", "10")} r={getResponsiveValue("4", "3", "2")} fill={theme.accentPrimary} className="tech-glow" />
            <circle cx={getResponsiveValue("180", "135", "90")} cy={getResponsiveValue("60", "45", "30")} r={getResponsiveValue("4", "3", "2")} fill={theme.accentPrimary} className="tech-glow" />
            <circle cx={getResponsiveValue("100", "75", "50")} cy={getResponsiveValue("140", "105", "70")} r={getResponsiveValue("4", "3", "2")} fill={theme.accentPrimary} className="tech-glow" />
            
            {/* Additional tech elements */}
            <rect x={getResponsiveValue("90", "67", "45")} y={getResponsiveValue("50", "37", "25")} width={getResponsiveValue("20", "15", "10")} height={getResponsiveValue("20", "15", "10")} fill="none" stroke={theme.textSecondary} strokeWidth="1" opacity="0.6" />
            <polygon points={getResponsiveValue("160,40 170,50 160,60 150,50", "120,30 127,37 120,45 112,37", "80,20 85,25 80,30 75,25")} fill={theme.accentPrimary} opacity="0.4" />
          </svg>

          {/* Code-like floating elements */}
          {[...Array(getResponsiveValue(6, 4, 3))].map((_, i) => (
            <div
              key={`code-${i}`}
              style={{
                position: 'absolute',
                top: `${15 + i * 20}%`,
                left: `${5 + i * 15}%`,
                fontSize: getResponsiveValue('10px', '9px', '8px'),
                fontFamily: 'monospace',
                color: `${theme.accentPrimary}${40 + i * 10}`,
                opacity: 0.3,
                transform: `rotate(${i * 15}deg)`,
                letterSpacing: '1px',
                pointerEvents: 'none',
                animation: `floatParticle${i} ${8 + i * 2}s ease-in-out infinite`,
              }}
            >
              {['{ }', '< />', '[ ]', '( )', '=> ', '::'][i] || '{}'}
            </div>
          ))}

          {/* Matrix Rain Effect - Responsive */}
          {[...Array(getResponsiveValue(8, 6, 4))].map((_, i) => (
            <div
              key={`matrix-${i}`}
              className="matrix-rain"
              style={{
                position: 'absolute',
                left: `${10 + i * (getResponsiveValue(12, 15, 20))}%`,
                top: '-10vh',
                width: getResponsiveValue('2px', '1.5px', '1px'),
                height: getResponsiveValue('20vh', '15vh', '10vh'),
                background: `linear-gradient(180deg, transparent, ${theme.accentPrimary}60, transparent)`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i * 0.5}s`,
              }}
            />
          ))}

          {/* Holographic Grid - Responsive */}
          <div
            className="hologram-flicker"
            style={{
              position: 'absolute',
              bottom: getResponsiveValue('10%', '8%', '5%'),
              left: getResponsiveValue('20%', '15%', '10%'),
              width: getResponsiveValue('300px', '200px', '150px'),
              height: getResponsiveValue('200px', '150px', '100px'),
              background: `
                linear-gradient(90deg, transparent 49%, ${theme.accentPrimary}20 50%, transparent 51%),
                linear-gradient(0deg, transparent 49%, ${theme.textSecondary}15 50%, transparent 51%)
              `,
              backgroundSize: getResponsiveValue('20px 20px', '15px 15px', '10px 10px'),
              opacity: getResponsiveValue(0.4, 0.3, 0.2),
              clipPath: 'polygon(0 0, 100% 20%, 80% 100%, 0% 80%)',
            }}
          />

          {/* Animated Geometric Shapes - Responsive */}
          {/* Responsive animated geometric shapes */}
          <div className="soft-float" style={{
            position: 'absolute',
            top: getResponsiveValue('10%', '8%', '5%'),
            right: getResponsiveValue('8%', '5%', '2%'),
            width: getResponsiveValue('300px', '200px', '150px'),
            height: getResponsiveValue('300px', '200px', '150px'),
            background: `conic-gradient(from 45deg, ${theme.accentPrimary}15, transparent, ${theme.textSecondary}10, transparent)`,
            borderRadius: '50%',
            animation: 'rotateShape 20s linear infinite',
            filter: getResponsiveValue('blur(40px)', 'blur(30px)', 'blur(20px)'),
          }} />

          <div style={{
            position: 'absolute',
            top: getResponsiveValue('60%', '65%', '70%'),
            left: getResponsiveValue('5%', '3%', '1%'),
            width: getResponsiveValue('250px', '180px', '120px'),
            height: getResponsiveValue('250px', '180px', '120px'),
            background: `linear-gradient(135deg, ${theme.bgPrimary}40, ${theme.accentSecondary}20)`,
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            animation: 'floatRotate 15s ease-in-out infinite',
            filter: getResponsiveValue('blur(20px)', 'blur(15px)', 'blur(10px)'),
          }} />

          {/* Morphing Blob - Responsive */}
          <div style={{
            position: 'absolute',
            top: getResponsiveValue('20%', '18%', '15%'),
            left: getResponsiveValue('15%', '12%', '8%'),
            width: getResponsiveValue('200px', '150px', '100px'),
            height: getResponsiveValue('200px', '150px', '100px'),
            background: `radial-gradient(circle, ${theme.accentPrimary}12, transparent 70%)`,
            borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
            animation: 'morphBlob 8s ease-in-out infinite',
            filter: getResponsiveValue('blur(30px)', 'blur(20px)', 'blur(15px)'),
          }} />

          {/* Responsive floating particles */}
          {[...Array(getResponsiveValue(6, 4, 3))].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${20 + i * 15}%`,
              left: `${10 + i * 12}%`,
              width: getResponsiveValue(`${8 + i * 2}px`, `${6 + i * 1.5}px`, `${4 + i}px`),
              height: getResponsiveValue(`${8 + i * 2}px`, `${6 + i * 1.5}px`, `${4 + i}px`),
              background: `${theme.accentPrimary}${30 + i * 10}`,
              borderRadius: '50%',
              animation: `floatParticle${i} ${6 + i}s ease-in-out infinite`,
            }} />
          ))}

          {/* Responsive dynamic grid pattern */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: getResponsiveValue(0.05, 0.04, 0.03),
            }}
          >
            <defs>
              <pattern 
                id="dynamicGrid" 
                x="0" 
                y="0" 
                width={getResponsiveValue("60", "45", "30")} 
                height={getResponsiveValue("60", "45", "30")} 
                patternUnits="userSpaceOnUse"
              >
                <path 
                  d={getResponsiveValue("M 60 0 L 0 0 0 60", "M 45 0 L 0 0 0 45", "M 30 0 L 0 0 0 30")} 
                  fill="none" 
                  stroke={theme.textPrimary} 
                  strokeWidth={getResponsiveValue("0.5", "0.4", "0.3")} 
                />
                <circle 
                  cx={getResponsiveValue("30", "22.5", "15")} 
                  cy={getResponsiveValue("30", "22.5", "15")} 
                  r={getResponsiveValue("1", "0.8", "0.6")} 
                  fill={theme.accentPrimary} 
                  opacity="0.3" 
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dynamicGrid)" />
          </svg>

          {/* Responsive animated lines - removed moving lines */}
          {/* Static decorative lines instead of animated ones */}

          {/* Responsive glowing orbs */}
          <div style={{
            position: 'absolute',
            top: getResponsiveValue('15%', '12%', '8%'),
            right: getResponsiveValue('30%', '25%', '20%'),
            width: getResponsiveValue('80px', '60px', '40px'),
            height: getResponsiveValue('80px', '60px', '40px'),
            background: `radial-gradient(circle, ${theme.accentPrimary}20, transparent 70%)`,
            borderRadius: '50%',
            animation: 'pulseGlow 3s ease-in-out infinite',
            filter: getResponsiveValue('blur(15px)', 'blur(12px)', 'blur(8px)'),
          }} />

          <div style={{
            position: 'absolute',
            bottom: getResponsiveValue('20%', '18%', '15%'),
            right: getResponsiveValue('15%', '12%', '8%'),
            width: getResponsiveValue('60px', '45px', '30px'),
            height: getResponsiveValue('60px', '45px', '30px'),
            background: `radial-gradient(circle, ${theme.textSecondary}25, transparent 70%)`,
            borderRadius: '50%',
            animation: 'pulseGlow 4s ease-in-out infinite reverse',
            filter: getResponsiveValue('blur(20px)', 'blur(15px)', 'blur(10px)'),
          }} />

          {/* Responsive interactive cursor trail */}
          <div style={{
            position: 'absolute',
            top: mousePosition.y - getResponsiveValue(100, 75, 50),
            left: mousePosition.x - getResponsiveValue(100, 75, 50),
            width: getResponsiveValue('200px', '150px', '100px'),
            height: getResponsiveValue('200px', '150px', '100px'),
            background: `radial-gradient(circle, ${theme.accentPrimary}08, transparent 70%)`,
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            filter: getResponsiveValue('blur(40px)', 'blur(30px)', 'blur(20px)'),
            pointerEvents: 'none',
          }} />
        </div>

        {/* Content - Optimized spacing for visibility */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: getResponsiveValue('24px', '20px', '16px'),
          padding: getResponsiveValue('0 20px', '0 16px', '0 12px'),
        }}>
          
          {/* Responsive badge - Properly positioned */}
          <div className="scale-in" style={{ 
            opacity: isVisible ? 1 : 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: getResponsiveValue('0px', '0px', '10px'), // Extra margin on mobile
          }}>
            <span style={{
              fontSize: getResponsiveValue('14px', '13px', '12px'),
              letterSpacing: getResponsiveValue('4px', '3px', '2px'),
              textTransform: 'uppercase',
              color: theme.textSecondary,
              display: 'inline-block',
              padding: getResponsiveValue('10px 24px', '8px 20px', '6px 16px'),
              border: `1px solid ${theme.textSecondary}30`,
              borderRadius: '30px',
              minWidth: getResponsiveValue('320px', '280px', '240px'),
              maxWidth: '90vw',
              textAlign: 'center',
              wordBreak: 'break-word',
              background: `${theme.bgSecondary}20`,
              backdropFilter: 'blur(8px)',
            }}>
              {displayText}
              <span style={{
                display: 'inline-block',
                width: '2px',
                height: getResponsiveValue('14px', '12px', '10px'),
                background: theme.textPrimary,
                marginLeft: '4px',
                animation: 'blink 1s infinite',
                opacity: isTyping ? 1 : 0,
              }}></span>
            </span>
          </div>
          
          {/* Enhanced tech title with terminal styling */}
          <div className="slide-up-fade" style={{ 
            opacity: isVisible ? 1 : 0,
            textAlign: 'center',
            position: 'relative',
            width: '100%',
          }}>
            {/* Terminal-style header - Better positioned */}
            <div style={{
              fontSize: getResponsiveValue('12px', '11px', '10px'),
              fontFamily: 'monospace',
              color: theme.textMuted,
              marginBottom: getResponsiveValue('12px', '10px', '8px'),
              opacity: 0.6,
              letterSpacing: '1px',
            }}>
              ~/portfolio/hannah-peralta$ npm run dev
            </div>

            <h1 style={{
              fontSize: getResponsiveValue(
                'clamp(3.5rem, 5.5vw, 5.5rem)', 
                'clamp(2.8rem, 6vw, 4rem)', 
                'clamp(2rem, 8vw, 3rem)'
              ),
              fontWeight: '700',
              lineHeight: 1.1,
              color: theme.textPrimary,
              letterSpacing: '-0.03em',
              margin: 0,
              position: 'relative',
              wordBreak: 'break-word',
            }}>
              <span style={{ 
                display: 'block',
                position: 'relative',
              }}>
                CODING TOMORROW'S
                {/* Enhanced tech accent line with gradient */}
                <div style={{
                  position: 'absolute',
                  bottom: getResponsiveValue('-6px', '-4px', '-2px'),
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60%',
                  height: getResponsiveValue('4px', '3px', '2px'),
                  background: `linear-gradient(90deg, transparent, ${theme.accentPrimary}, ${theme.textSecondary}, transparent)`,
                  borderRadius: '2px',
                  boxShadow: `0 0 10px ${theme.accentPrimary}40`,
                }} />
              </span>
              <span style={{ 
                display: 'block',
                color: theme.textSecondary,
                fontWeight: '500',
                fontSize: '0.65em',
                marginTop: getResponsiveValue('12px', '10px', '8px'),
                fontFamily: 'monospace',
                letterSpacing: '0.1em',
              }}>
                {'<'} DIGITAL WORLD {' />'}
              </span>
            </h1>

            {/* Enhanced tech subtitle with more technical terms */}
            <div style={{
              marginTop: getResponsiveValue('12px', '10px', '8px'),
              fontSize: getResponsiveValue('14px', '13px', '11px'),
              color: theme.textMuted,
              fontFamily: 'monospace',
              letterSpacing: getResponsiveValue('2px', '1.5px', '1px'),
              opacity: 0.7,
              wordBreak: 'break-word',
            }}>
              // SCALABLE • PERFORMANT • INNOVATIVE
            </div>

          </div>

          {/* Enhanced technical expertise grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: getResponsiveValue(
              'repeat(4, 1fr)', 
              'repeat(2, 1fr)', 
              'repeat(2, 1fr)'
            ),
            gap: getResponsiveValue('16px', '14px', '12px'),
            width: '100%',
            maxWidth: '800px',
            marginTop: getResponsiveValue('24px', '20px', '16px'),
            padding: getResponsiveValue('0 16px', '0 12px', '0 8px'),
          }}>
            {expertiseItems.map((item, index) => (
              <div
                key={index}
                className="tech-card hover-glow"
                style={{
                  padding: getResponsiveValue('20px 16px', '18px 14px', '16px 12px'),
                  background: `linear-gradient(135deg, ${theme.accentPrimary}15, ${theme.bgSecondary}90)`,
                  border: `1px solid ${theme.accentPrimary}`,
                  borderRadius: getResponsiveValue('20px', '16px', '12px'),
                  cursor: 'default',
                  transition: 'all 0.4s ease',
                  textAlign: 'center',
                  backdropFilter: 'blur(12px)',
                  boxShadow: `0 6px 25px -6px ${theme.accentPrimary}35, inset 0 1px 0 ${theme.accentPrimary}20`,
                  minHeight: getResponsiveValue('100px', '90px', '80px'),
                  aspectRatio: getResponsiveValue('1.4', '1.3', '1.2'),
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Tech code identifier */}
                <div style={{
                  position: 'absolute',
                  top: getResponsiveValue('8px', '6px', '4px'),
                  right: getResponsiveValue('10px', '8px', '6px'),
                  fontSize: getResponsiveValue('10px', '9px', '8px'),
                  fontFamily: 'monospace',
                  color: theme.accentPrimary,
                  opacity: 0.6,
                  letterSpacing: '0.5px',
                  fontWeight: '600',
                }}>
                  {item.techCode}
                </div>

                {/* Enhanced tech symbol with glow effect */}
                <div style={{
                  fontSize: getResponsiveValue('28px', '24px', '20px'),
                  marginBottom: getResponsiveValue('12px', '10px', '8px'),
                  filter: 'none',
                  transition: 'all 0.4s ease',
                  color: theme.accentPrimary,
                  fontWeight: 'bold',
                  textShadow: `0 0 15px ${theme.accentPrimary}60`,
                  transform: 'scale(1.1)',
                }}>
                  {item.symbol}
                </div>

                {/* Enhanced title with better typography */}
                <h3 style={{
                  fontSize: getResponsiveValue('13px', '12px', '11px'),
                  fontWeight: '700',
                  color: theme.textPrimary,
                  marginBottom: 0,
                  textTransform: 'uppercase',
                  letterSpacing: getResponsiveValue('1.2px', '1px', '0.8px'),
                  lineHeight: 1.3,
                  wordBreak: 'break-word',
                  hyphens: 'auto',
                  textAlign: 'center',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  textShadow: `0 1px 2px ${theme.accentPrimary}20`,
                  padding: getResponsiveValue('0 4px', '0 3px', '0 2px'),
                }}>
                  {item.title}
                </h3>

                {/* Enhanced hover effect with animated border */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: getResponsiveValue('3px', '2px', '2px'),
                  background: `linear-gradient(90deg, ${theme.accentPrimary}, ${theme.textSecondary}, ${theme.accentPrimary})`,
                  transform: 'scaleX(1)',
                  transformOrigin: 'center',
                  transition: 'transform 0.4s ease',
                  boxShadow: index === activeIndex ? `0 0 8px ${theme.accentPrimary}60` : 'none',
                }} />

                {/* Subtle tech pattern overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `
                    radial-gradient(circle at 20% 20%, ${theme.accentPrimary}05 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, ${theme.textSecondary}03 0%, transparent 50%)
                  `,
                  opacity: 1,
                  transition: 'opacity 0.4s ease',
                  pointerEvents: 'none',
                }} />
              </div>
            ))}
          </div>

          {/* Enhanced technical buttons with terminal styling */}
          <div style={{
            display: 'flex',
            flexDirection: getResponsiveValue('row', 'row', isSmallMobile ? 'column' : 'row'),
            gap: getResponsiveValue('24px', '20px', '16px'),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: getResponsiveValue('24px', '20px', '16px'),
            width: '100%',
            maxWidth: '600px',
            padding: getResponsiveValue('0 20px', '0 16px', '0 12px'),
          }}>
            <button 
              className="hover-lift"
              style={{
                padding: getResponsiveValue('16px 44px', '14px 36px', '12px 28px'),
                fontSize: getResponsiveValue('13px', '12px', '11px'),
                fontWeight: '600',
                background: `linear-gradient(135deg, ${theme.textPrimary}, ${theme.accentSecondary})`,
                color: theme.bgPrimary,
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                textTransform: 'uppercase',
                letterSpacing: getResponsiveValue('2px', '1.5px', '1px'),
                position: 'relative',
                overflow: 'hidden',
                fontFamily: 'monospace',
                boxShadow: `0 4px 20px -4px ${theme.textPrimary}40`,
                minWidth: getResponsiveValue('auto', 'auto', isSmallMobile ? '200px' : 'auto'),
                width: isSmallMobile ? '100%' : 'auto',
              }}
              onClick={() => scrollToSection('projects')}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>
                $ ./view-projects
              </span>
            </button>
            
            <button 
              className="hover-lift"
              style={{
                padding: getResponsiveValue('16px 44px', '14px 36px', '12px 28px'),
                fontSize: getResponsiveValue('13px', '12px', '11px'),
                fontWeight: '600',
                background: 'transparent',
                color: theme.textPrimary,
                border: `2px solid ${theme.textPrimary}`,
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                textTransform: 'uppercase',
                letterSpacing: getResponsiveValue('2px', '1.5px', '1px'),
                position: 'relative',
                overflow: 'hidden',
                fontFamily: 'monospace',
                backdropFilter: 'blur(10px)',
                minWidth: getResponsiveValue('auto', 'auto', isSmallMobile ? '200px' : 'auto'),
                width: isSmallMobile ? '100%' : 'auto',
              }}
              onClick={() => scrollToSection('contact')}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>
                $ ./connect
              </span>
            </button>
          </div>

          {/* Technical status bar */}
          <div style={{
            marginTop: getResponsiveValue('16px', '12px', '10px'),
            fontSize: getResponsiveValue('10px', '9px', '8px'),
            fontFamily: 'monospace',
            color: theme.textMuted,
            opacity: 0.5,
            letterSpacing: '1px',
            textAlign: 'center',
            padding: getResponsiveValue('8px 16px', '6px 12px', '4px 8px'),
            background: `linear-gradient(135deg, ${theme.bgSecondary}40, transparent)`,
            borderRadius: '20px',
            border: `1px solid ${theme.textMuted}15`,
            backdropFilter: 'blur(8px)',
          }}>
            STATUS: ONLINE • UPTIME: 99.9% • LAST_DEPLOY: July 12, 2003
          </div>
        </div>
      </div>

      <ScrollToTop showScrollTop={showScrollTop} />
    </div>
  )
}