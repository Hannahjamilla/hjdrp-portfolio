'use client'

import { useEffect } from 'react'
import { useMeIntro } from './hooks/useMeIntro'
import { createMeIntroStyles } from './styles/MeIntroStyles'
import GlobalNavigation from '../components/GlobalNavigation'
import Avatar from './components/Avatar'
import SocialLinks from './components/SocialLinks'
import ScrollToTop from './components/ScrollToTop'
import BackgroundElements from './components/BackgroundElements'

export default function Introduction({ scrollDirection = 'down' }) {
  const {
    mounted,
    displayText,
    isTyping,
    activeSection,
    isScrolled,
    isVisible,
    elementVisible,
    mousePosition,
    showScrollTop,
    windowSize,
    socialLinks,
    getResponsiveValue,
    scrollToSection,
    generateParticles
  } = useMeIntro()

  const theme = {
    bgPrimary: '#FFECEA',
    bgSecondary: '#ffffff',
    textPrimary: '#6C131F',
    textSecondary: '#A14B58',
    textMuted: '#A14B58',
    accentPrimary: '#6C131F',
    accentSecondary: '#A14B58',
    borderColor: 'rgba(108, 19, 31, 0.15)',
    shadowColor: 'rgba(108, 19, 31, 0.08)',
    shadowHover: 'rgba(108, 19, 31, 0.15)',
  }

  const isMobile = windowSize.width < 768
  const isTablet = windowSize.width < 1024
  const particles = generateParticles()

  useEffect(() => {
    if (mounted) {
      const style = document.createElement('style')
      style.textContent = createMeIntroStyles() + `
        @keyframes buttonBounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }

        @keyframes buttonBounceTablet {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
          60% { transform: translateY(-2px); }
        }

        @keyframes buttonBounceMobile {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-3px); }
          60% { transform: translateY(-1px); }
        }

        .bounce-btn {
          animation: buttonBounce 2.5s ease-in-out infinite;
        }

        .bounce-btn:nth-child(1) {
          animation-delay: 0s;
        }

        .bounce-btn:nth-child(2) {
          animation-delay: 0.4s;
        }

        .bounce-btn:hover {
          animation-play-state: paused;
        }

        /* Responsive animations */
        @media (max-width: 1024px) {
          .bounce-btn {
            animation: buttonBounceTablet 3s ease-in-out infinite;
          }
        }

        @media (max-width: 768px) {
          .bounce-btn {
            animation: buttonBounceMobile 3.5s ease-in-out infinite;
          }
        }

        @media (max-width: 480px) {
          .bounce-btn {
            animation: buttonBounceMobile 4s ease-in-out infinite;
          }
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .bounce-btn {
            animation: none;
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
  }, [mounted])

  if (!mounted) return null

  return (
    <div>
      <GlobalNavigation />

      <div style={{
        minHeight: '100vh',
        minHeight: '100dvh',
        background: `
          linear-gradient(135deg, ${theme.bgPrimary} 0%, ${theme.bgSecondary} 30%, ${theme.bgPrimary} 70%, ${theme.bgSecondary} 100%),
          radial-gradient(circle at 25% 25%, rgba(0,0,0,0.04) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(0,0,0,0.03) 0%, transparent 50%),
          conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(0,0,0,0.01) 90deg, transparent 180deg, rgba(0,0,0,0.01) 270deg, transparent 360deg)
        `,
        padding: getResponsiveValue('40px 60px', '30px 40px', '20px 20px'),
        paddingTop: getResponsiveValue('140px', '130px', '120px'),
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Poppins', sans-serif",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(50px)' : 'translateY(-50px)'),
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }} id="home">
      
        <BackgroundElements 
          theme={theme}
          getResponsiveValue={getResponsiveValue}
          isMobile={isMobile}
          mousePosition={mousePosition}
          particles={particles}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: isTablet ? '1fr' : 'minmax(300px, 380px) 1fr',
          gap: getResponsiveValue(80, 60, 40),
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          flex: 1,
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }} className="layout-grid">
          
          {/* Sidebar with Avatar */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            opacity: elementVisible ? 1 : 0,
            transform: elementVisible ? 'translateX(0)' : (scrollDirection === 'down' ? 'translateX(-50px)' : 'translateX(50px)'),
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
            order: isTablet ? 2 : 1,
          }} className="sidebar">
            <Avatar theme={theme} getResponsiveValue={getResponsiveValue} />
            
            <div style={{
              marginTop: getResponsiveValue(30, 25, 20),
              textAlign: 'center',
              width: '100%',
              opacity: elementVisible ? 1 : 0,
              transform: elementVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.4s',
            }}>
              <div style={{
                fontSize: getResponsiveValue('1.4rem', '1.3rem', '1.2rem'),
                fontWeight: '700',
                color: theme.textPrimary,
                marginBottom: getResponsiveValue(6, 5, 4),
              }}>Hannah Jamilla Peralta</div>
              <div style={{
                fontSize: getResponsiveValue('0.95rem', '0.9rem', '0.85rem'),
                color: theme.textMuted,
                fontWeight: '400',
                lineHeight: '1.5',
              }}>
                Bachelor of Science in Information Technology<br />
                Specialization in Mobile and Web Application Development
              </div>
            </div>
            
            <SocialLinks 
              socialLinks={socialLinks}
              elementVisible={elementVisible}
              getResponsiveValue={getResponsiveValue}
              theme={theme}
            />
          </div>

          {/* Main Content */}
          <div style={{
            padding: `${getResponsiveValue(30, 25, 20)}px 0`,
            position: 'relative',
            opacity: elementVisible ? 1 : 0,
            transform: elementVisible ? 'translateX(0)' : (scrollDirection === 'down' ? 'translateX(50px)' : 'translateX(-50px)'),
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s',
            order: isTablet ? 1 : 2,
            textAlign: isTablet ? 'center' : 'left',
          }} className="main-content">
            <h1 style={{
              fontSize: isMobile ? 
                        `clamp(1.8rem, 8vw, 2.5rem)` : 
                        isTablet ? 
                        `clamp(2.2rem, 5vw, 3rem)` : 
                        `clamp(2.5rem, 5vw, 4.5rem)`,
              fontWeight: '900',
              marginBottom: getResponsiveValue(25, 22, 20),
              lineHeight: 1.05,
              color: theme.textPrimary,
              letterSpacing: '-0.03em',
              opacity: elementVisible ? 1 : 0,
              transform: elementVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(30px)' : 'translateY(-30px)'),
              transition: 'all 0.8s ease 0.5s',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              position: 'relative',
            }} className="title">
              <span style={{
                color: '#6C131F',
                position: 'relative',
              }}>
                Crafting Digital Experiences That Inspire & Transform
              </span>
            </h1>
            
            {/* Dynamic Greeting */}
            <div style={{
              fontSize: isMobile ? 
                        `clamp(1rem, 4vw, 1.2rem)` : 
                        `clamp(1.2rem, 2.5vw, 1.5rem)`,
              fontWeight: '500',
              marginBottom: getResponsiveValue(30, 25, 20),
              color: theme.textSecondary,
              minHeight: getResponsiveValue(40, 35, 30),
              display: 'flex',
              alignItems: 'center',
              justifyContent: isTablet ? 'center' : 'flex-start',
              opacity: elementVisible ? 1 : 0,
              transform: elementVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(20px)' : 'translateY(-20px)'),
              transition: 'all 0.8s ease 0.6s',
              textAlign: isTablet ? 'center' : 'left',
            }} className="greeting">
              {displayText}
              <span style={{
                display: 'inline-block',
                width: '3px',
                height: isMobile ? '1.2rem' : '1.6rem',
                backgroundColor: theme.textPrimary,
                marginLeft: '4px',
                animation: 'blink 1s infinite',
                opacity: isTyping ? 1 : 0,
              }}></span>
            </div>
            
            <p style={{
              fontSize: getResponsiveValue('1.2rem', '1.1rem', '1.05rem'),
              color: theme.textMuted,
              marginBottom: getResponsiveValue(45, 40, 35),
              lineHeight: 1.8,
              maxWidth: '650px',
              fontWeight: '400',
              opacity: elementVisible ? 1 : 0,
              transform: elementVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(20px)' : 'translateY(-20px)'),
              transition: 'all 0.8s ease 0.7s',
              marginLeft: isTablet ? 'auto' : '0',
              marginRight: isTablet ? 'auto' : '0',
              textAlign: isTablet ? 'center' : 'left',
              position: 'relative',
            }} className="description">
              <span style={{
                color: '#A14B58',
              }}>
                I create modern, user-friendly digital solutions designed to help people, solve problems, and make everyday experiences{' '}
              </span>
              <span style={{ 
                color: theme.textSecondary, 
                fontWeight: '600',
                position: 'relative',
              }}>
                easier and better.
              </span>
            </p>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              gap: getResponsiveValue(25, 20, 15),
              alignItems: 'center',
              flexWrap: 'wrap',
              opacity: elementVisible ? 1 : 0,
              transform: elementVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(20px)' : 'translateY(-20px)'),
              transition: 'all 0.8s ease 0.8s',
              justifyContent: isTablet ? 'center' : 'flex-start',
              marginBottom: getResponsiveValue(60, 50, 40),
            }} className="buttons">
              <button 
                style={{
                  padding: `${getResponsiveValue(20, 18, 16)}px ${getResponsiveValue(40, 36, 32)}px`,
                  fontSize: getResponsiveValue('1rem', '0.95rem', '0.9rem'),
                  fontWeight: '700',
                  background: '#6C131F',
                  color: '#FFECEA',
                  border: 'none',
                  borderRadius: getResponsiveValue(16, 14, 12),
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 15px 35px rgba(108, 19, 31, 0.15)',
                  width: isMobile ? '100%' : 'auto',
                  minWidth: isMobile ? 'auto' : '180px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }} 
                className="primary-btn bounce-btn"
                onClick={() => scrollToSection('projects')}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-6px) scale(1.03)'
                  e.target.style.boxShadow = '0 25px 50px rgba(108, 19, 31, 0.25)'
                  e.target.style.background = '#A14B58'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)'
                  e.target.style.boxShadow = '0 15px 35px rgba(108, 19, 31, 0.15)'
                  e.target.style.background = '#6C131F'
                }}
              >
                <span style={{ position: 'relative', zIndex: 2 }}>
                  View My Projects
                </span>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,236,234,0.2), transparent)',
                  transition: 'left 0.6s ease',
                  zIndex: 1,
                }}></div>
              </button>
              
              <button 
                style={{
                  padding: `${getResponsiveValue(18, 16, 14)}px ${getResponsiveValue(36, 32, 28)}px`,
                  fontSize: getResponsiveValue('0.95rem', '0.9rem', '0.85rem'),
                  fontWeight: '600',
                  background: 'transparent',
                  color: theme.textPrimary,
                  border: `2px solid ${theme.textPrimary}`,
                  borderRadius: getResponsiveValue(16, 14, 12),
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  position: 'relative',
                  overflow: 'hidden',
                  width: isMobile ? '100%' : 'auto',
                  minWidth: isMobile ? 'auto' : '160px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }} 
                className="secondary-btn bounce-btn"
                onClick={() => scrollToSection('contact')}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px) scale(1.02)'
                  e.target.style.background = '#6C131F'
                  e.target.style.color = '#FFECEA'
                  e.target.style.borderColor = '#6C131F'
                  e.target.style.boxShadow = '0 20px 40px rgba(108, 19, 31, 0.15)'
                  const span = e.target.querySelector('span')
                  if (span) span.style.color = '#FFECEA'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)'
                  e.target.style.background = 'transparent'
                  e.target.style.color = theme.textPrimary
                  e.target.style.borderColor = theme.textPrimary
                  e.target.style.boxShadow = 'none'
                  const span = e.target.querySelector('span')
                  if (span) span.style.color = theme.textPrimary
                }}
              >
                <span style={{ 
                  position: 'relative', 
                  zIndex: 2,
                  color: 'inherit',
                  transition: 'color 0.4s ease'
                }}>
                  Let's talk?
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop showScrollTop={showScrollTop} />
    </div>
  )
}