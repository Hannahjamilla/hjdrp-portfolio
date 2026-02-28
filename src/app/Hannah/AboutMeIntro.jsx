'use client'

import { useState, useEffect } from 'react'
import { useResponsive } from '../hooks/useResponsive'

export default function AboutMeIntro() {
  const [isVisible, setIsVisible] = useState(false)
  const [elementVisible, setElementVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isImageHovered, setIsImageHovered] = useState(false)
  const { windowSize, getResponsiveValue } = useResponsive()

  const theme = {
    bgPrimary: '#FFECEA',
    bgSecondary: '#ffffff',
    textPrimary: '#6C131F',
    textSecondary: '#A14B58',
    textMuted: '#A14B58',
    accentPrimary: '#6C131F',
    accentSecondary: '#E8B4B8',
    accentTertiary: '#F5D5D7',
  }

  const isMobile = windowSize.width < 768
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024
  const isTabletLandscape = windowSize.width === 1024 && windowSize.height === 728

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      setTimeout(() => setElementVisible(true), 300)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        linear-gradient(135deg, 
          ${theme.bgPrimary} 0%, 
          ${theme.bgSecondary} 30%, 
          ${theme.accentTertiary} 60%, 
          ${theme.bgSecondary} 100%
        )
      `,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Poppins', sans-serif",
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    }} id="about">
      {/* Dynamic Background Graphics */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}>
        {/* Large Geometric Shapes */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: isMobile ? '200px' : '400px',
          height: isMobile ? '200px' : '400px',
          background: `linear-gradient(45deg, ${theme.accentPrimary}15, ${theme.textSecondary}10)`,
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          animation: 'rotateFloat 20s linear infinite',
          filter: 'blur(1px)',
        }}></div>

        <div style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-10%',
          width: isMobile ? '250px' : '500px',
          height: isMobile ? '250px' : '500px',
          background: `conic-gradient(from 0deg, ${theme.accentSecondary}20, transparent, ${theme.accentPrimary}15, transparent)`,
          borderRadius: '50%',
          animation: 'rotateFloat 25s linear infinite reverse',
          filter: 'blur(2px)',
        }}></div>

        {/* Floating Organic Shapes */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: isMobile ? '80px' : '150px',
          height: isMobile ? '80px' : '150px',
          background: `radial-gradient(circle, ${theme.accentTertiary}60, transparent 70%)`,
          borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
          animation: 'morphBounce 8s ease-in-out infinite',
        }}></div>

        <div style={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: isMobile ? '60px' : '120px',
          height: isMobile ? '60px' : '120px',
          background: `linear-gradient(135deg, ${theme.textSecondary}25, ${theme.accentSecondary}30)`,
          borderRadius: '48% 52% 68% 32% / 42% 68% 32% 58%',
          animation: 'morphBounce 6s ease-in-out infinite reverse',
        }}></div>

        {/* Grid Pattern Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(${theme.accentPrimary}08 1px, transparent 1px),
            linear-gradient(90deg, ${theme.accentPrimary}08 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? '30px 30px' : '50px 50px',
          opacity: 0.3,
        }}></div>
        {/* Interactive Cursor Effect - Desktop only */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            top: mousePosition.y - 150,
            left: mousePosition.x - 150,
            width: '300px',
            height: '300px',
            background: `radial-gradient(circle, ${theme.accentPrimary}05 0%, transparent 70%)`,
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            filter: 'blur(30px)',
          }}></div>
        )}
      </div>

      {/* Main Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: isMobile ? '60px 20px' : isTablet ? '70px 40px' : '80px 60px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}>
        
        {/* Responsive Layout Container */}
        <div style={{
          display: isMobile ? 'block' : isTabletLandscape ? 'grid' : isTablet ? 'block' : 'grid',
          gridTemplateColumns: isMobile ? undefined : isTabletLandscape ? '400px 1fr' : isTablet ? undefined : '350px 1fr 280px',
          gridTemplateRows: isMobile ? undefined : isTabletLandscape ? 'auto auto' : isTablet ? undefined : '1fr',
          gap: isMobile ? undefined : isTabletLandscape ? '30px' : isTablet ? undefined : '40px',
          maxWidth: '1600px',
          margin: '0 auto',
          width: '100%',
          alignItems: isMobile ? undefined : isTabletLandscape ? 'start' : isTablet ? undefined : 'center',
        }}>

          {/* Mobile/Tablet: Hero Section with Image and Title */}
          {(isMobile || (isTablet && !isTabletLandscape)) && (
            <div style={{
              textAlign: 'center',
              marginBottom: isMobile ? '50px' : '60px',
              opacity: elementVisible ? 1 : 0,
              transform: elementVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
            }}>
              {/* Title First on Mobile/Tablet */}
              <div style={{
                marginBottom: isMobile ? '30px' : '40px',
              }}>
                <h2 style={{
                  fontSize: isMobile ? '2.5rem' : '3rem',
                  fontWeight: '700',
                  background: `linear-gradient(135deg, ${theme.textPrimary}, ${theme.textSecondary}, ${theme.accentPrimary})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  marginBottom: '20px',
                }}>
                  Meet the Developer
                </h2>
                
                <div style={{
                  width: '120px',
                  height: '4px',
                  background: `linear-gradient(90deg, ${theme.accentPrimary}, ${theme.textSecondary})`,
                  borderRadius: '2px',
                  margin: '0 auto 25px',
                  animation: 'expandContract 2s ease-in-out infinite',
                }}></div>

                <div style={{
                  fontSize: isMobile ? '1.2rem' : '1.3rem',
                  color: theme.textSecondary,
                  fontWeight: '500',
                }}>
                  Crafting digital experiences with{' '}
                  <span style={{ 
                    color: theme.textPrimary, 
                    fontWeight: '700',
                  }}>
                    passion & purpose
                  </span>
                </div>
              </div>

              {/* Centered Image */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: isMobile ? '40px' : '50px',
              }}>
                <div style={{
                  position: 'relative',
                  width: isMobile ? '250px' : '300px',
                }}>
                  {/* Decorative Frame Elements */}
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '-15px',
                    right: '-15px',
                    bottom: '-15px',
                    background: `conic-gradient(from 45deg, ${theme.accentPrimary}30, ${theme.textSecondary}20, ${theme.accentSecondary}25, ${theme.accentPrimary}30)`,
                    borderRadius: '30px',
                    animation: 'rotateFrame 15s linear infinite',
                    filter: 'blur(8px)',
                  }}></div>

                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '-8px',
                    right: '-8px',
                    bottom: '-8px',
                    background: `linear-gradient(45deg, ${theme.bgSecondary}90, ${theme.accentTertiary}80)`,
                    borderRadius: '25px',
                    backdropFilter: 'blur(15px)',
                  }}></div>
                  {/* Main Image Container */}
                  <div style={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: `linear-gradient(145deg, ${theme.bgSecondary}, ${theme.accentTertiary}50)`,
                    padding: '12px',
                    transform: isImageHovered ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                  >
                    <div style={{
                      position: 'relative',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      height: isMobile ? '300px' : '350px',
                    }}>
                      <img 
                        src="/images/Hannah.png"
                        alt="Hannah Jamilla Peralta" 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'all 0.6s ease',
                          opacity: isImageHovered ? 0 : 1,
                        }}
                      />
                      <img 
                        src="/images/hannah-two.jpg"
                        alt="Hannah Jamilla Peralta - Alternative" 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          transition: 'all 0.6s ease',
                          opacity: isImageHovered ? 1 : 0,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Mobile/Tablet: Content Cards Layout */}
          {(isMobile || (isTablet && !isTabletLandscape)) && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: isMobile ? '25px' : '30px',
              marginBottom: isMobile ? '50px' : '60px',
              opacity: elementVisible ? 1 : 0,
              transform: elementVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s ease 0.6s',
            }}>
              {/* About Card */}
              <div style={{
                background: '#ffffff',
                borderRadius: '25px',
                padding: isMobile ? '30px' : '35px',
                border: `3px solid ${theme.accentPrimary}30`,
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: `conic-gradient(from 0deg, transparent, ${theme.accentPrimary}05, transparent, ${theme.textSecondary}05)`,
                  animation: 'rotateFloat 20s linear infinite',
                }}></div>
                
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h3 style={{
                    fontSize: isMobile ? '1.4rem' : '1.6rem',
                    fontWeight: '700',
                    color: theme.accentPrimary,
                    marginBottom: '15px',
                  }}>
                    Goal-Oriented Developer
                  </h3>
                  
                  <div style={{
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    color: theme.textMuted,
                    lineHeight: 1.6,
                    fontWeight: '400',
                  }}>
                    IT graduate focused on mobile and web development. 
                    I turn ideas into functional digital solutions and enjoy creating applications that are useful and meaningful for users.
                  </div>
                </div>
              </div>
              {/* Skills Card */}
              <div style={{
                background: '#ffffff',
                borderRadius: '25px',
                padding: isMobile ? '30px' : '35px',
                border: `3px solid ${theme.textSecondary}30`,
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '200%',
                  height: '200%',
                  background: `conic-gradient(from 180deg, transparent, ${theme.textSecondary}05, transparent, ${theme.accentSecondary}05)`,
                  animation: 'rotateFloat 25s linear infinite reverse',
                }}></div>
                
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h3 style={{
                    fontSize: isMobile ? '1.4rem' : '1.6rem',
                    fontWeight: '700',
                    color: theme.textSecondary,
                    marginBottom: '15px',
                  }}>
                    Continuous Learning
                  </h3>
                  
                  <div style={{
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    color: theme.textMuted,
                    lineHeight: 1.6,
                    fontWeight: '400',
                  }}>
                    Always exploring new technologies and collaborating on challenging projects that inspire growth and innovation.
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Mobile/Tablet: Horizontal Stats Bar */}
          {(isMobile || (isTablet && !isTabletLandscape)) && (
            <div style={{
              background: '#ffffff',
              borderRadius: '30px',
              padding: isMobile ? '25px' : '35px',
              border: `3px solid ${theme.accentPrimary}20`,
              boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
              opacity: elementVisible ? 1 : 0,
              transform: elementVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s ease 0.8s',
            }}>
              <h3 style={{
                textAlign: 'center',
                fontSize: isMobile ? '1.5rem' : '1.7rem',
                fontWeight: '700',
                color: theme.textPrimary,
                marginBottom: isMobile ? '25px' : '30px',
              }}>
                Professional Journey
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: isMobile ? '20px' : '25px',
              }}>
                {[
                  { number: '03', label: 'Years Experience', color: theme.accentPrimary, percentage: '85%' },
                  { number: '05', label: 'Projects Experience', color: theme.textSecondary, percentage: '92%' },
                  { number: '∞', label: 'Learning Experience', color: theme.accentSecondary, percentage: '100%' }
                ].map((stat, index) => (
                  <div key={index} style={{
                    textAlign: 'center',
                    padding: isMobile ? '20px' : '25px',
                    background: `${stat.color}08`,
                    borderRadius: '20px',
                    border: `2px solid ${stat.color}30`,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-5px)'
                    e.target.style.boxShadow = `0 10px 25px ${stat.color}30`
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}
                  >
                    <div style={{
                      fontSize: isMobile ? '2rem' : '2.5rem',
                      fontWeight: '900',
                      color: stat.color,
                      marginBottom: '10px',
                      fontFamily: "'Space Grotesk', monospace",
                    }}>
                      {stat.number}
                    </div>
                    
                    <div style={{
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      fontWeight: '600',
                      color: theme.textPrimary,
                      marginBottom: '15px',
                    }}>
                      {stat.label}
                    </div>
                    
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: '#e0e0e0',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: stat.percentage,
                        height: '100%',
                        background: stat.color,
                        borderRadius: '4px',
                        transition: 'width 1.5s ease-in-out',
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* 1024x728 Tablet Landscape: Unique Layout */}
          {isTabletLandscape && (
            <>
              {/* Left Column: Image and Title */}
              <div style={{
                gridColumn: '1 / 2',
                gridRow: '1 / 3',
                opacity: elementVisible ? 1 : 0,
                transform: elementVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}>
                {/* Compact Title */}
                <div style={{
                  marginBottom: '30px',
                  textAlign: 'center',
                }}>
                  <h2 style={{
                    fontSize: '2.2rem',
                    fontWeight: '700',
                    background: `linear-gradient(135deg, ${theme.textPrimary}, ${theme.textSecondary}, ${theme.accentPrimary})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    marginBottom: '10px',
                  }}>
                    Meet the Developer
                  </h2>
                  
                  <div style={{
                    width: '80px',
                    height: '3px',
                    background: `linear-gradient(90deg, ${theme.accentPrimary}, ${theme.textSecondary})`,
                    borderRadius: '2px',
                    margin: '0 auto 15px',
                    animation: 'expandContract 2s ease-in-out infinite',
                  }}></div>

                  <div style={{
                    fontSize: '1rem',
                    color: theme.textSecondary,
                    fontWeight: '500',
                  }}>
                    Crafting digital experiences with{' '}
                    <span style={{ 
                      color: theme.textPrimary, 
                      fontWeight: '700',
                    }}>
                      passion & purpose
                    </span>
                  </div>
                </div>

                {/* Bigger Centered Image */}
                <div style={{
                  position: 'relative',
                  width: '360px',
                  margin: '0 auto',
                }}>
                  {/* Decorative Frame Elements */}
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '-15px',
                    right: '-15px',
                    bottom: '-15px',
                    background: `conic-gradient(from 45deg, ${theme.accentPrimary}30, ${theme.textSecondary}20, ${theme.accentSecondary}25, ${theme.accentPrimary}30)`,
                    borderRadius: '30px',
                    animation: 'rotateFrame 15s linear infinite',
                    filter: 'blur(8px)',
                  }}></div>

                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '-8px',
                    right: '-8px',
                    bottom: '-8px',
                    background: `linear-gradient(45deg, ${theme.bgSecondary}90, ${theme.accentTertiary}80)`,
                    borderRadius: '25px',
                    backdropFilter: 'blur(15px)',
                  }}></div>

                  {/* Main Image Container */}
                  <div style={{
                    position: 'relative',
                    borderRadius: '22px',
                    overflow: 'hidden',
                    background: `linear-gradient(145deg, ${theme.bgSecondary}, ${theme.accentTertiary}50)`,
                    padding: '12px',
                    transform: isImageHovered ? 'scale(1.03)' : 'scale(1)',
                    transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                  >
                    <div style={{
                      position: 'relative',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      height: '320px',
                    }}>
                      <img 
                        src="/images/Hannah.png"
                        alt="Hannah Jamilla Peralta" 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'all 0.6s ease',
                          opacity: isImageHovered ? 0 : 1,
                        }}
                      />
                      <img 
                        src="/images/hannah-two.jpg"
                        alt="Hannah Jamilla Peralta - Alternative" 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          transition: 'all 0.6s ease',
                          opacity: isImageHovered ? 1 : 0,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Top: Content */}
              <div style={{
                gridColumn: '2 / 3',
                gridRow: '1 / 2',
                opacity: elementVisible ? 1 : 0,
                transform: elementVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s',
              }}>
                {/* Single Content Card */}
                <div style={{
                  background: '#ffffff',
                  borderRadius: '25px',
                  padding: '35px',
                  border: `3px solid ${theme.accentPrimary}30`,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  marginBottom: '25px',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-40%',
                    left: '-40%',
                    width: '180%',
                    height: '180%',
                    background: `conic-gradient(from 0deg, transparent, ${theme.accentPrimary}05, transparent, ${theme.textSecondary}05)`,
                    animation: 'rotateFloat 20s linear infinite',
                  }}></div>
                  
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    
                    
                    <h3 style={{
                      fontSize: '1.6rem',
                      fontWeight: '700',
                      color: theme.accentPrimary,
                      marginBottom: '15px',
                    }}>
                      Goal-Oriented Developer
                    </h3>
                    
                    <div style={{
                      fontSize: '1.1rem',
                      color: theme.textMuted,
                      lineHeight: 1.6,
                      fontWeight: '400',
                    }}>
                      IT graduate focused on mobile and web development. 
                      I turn ideas into functional digital solutions and enjoy creating applications that are useful and meaningful for users.
                      I am continuously learning and improving my skills.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Bottom: Horizontal Stats */}
              <div style={{
                gridColumn: '2 / 3',
                gridRow: '2 / 3',
                opacity: elementVisible ? 1 : 0,
                transform: elementVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 1s ease 0.6s',
              }}>
                <div style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '20px',
                  border: `2px solid ${theme.accentPrimary}15`,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: theme.textPrimary,
                    marginBottom: '20px',
                    textAlign: 'center',
                  }}>
                    Professional Journey
                  </h3>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '15px',
                  }}>
                    {[
                      { number: '03', label: 'Years Experience', color: theme.accentPrimary, percentage: '85%' },
                      { number: '05', label: 'Projects Experience', color: theme.textSecondary, percentage: '92%' },
                      { number: '∞', label: 'Learning Experience', color: theme.accentSecondary, percentage: '100%' }
                    ].map((stat, index) => (
                      <div key={index} style={{
                        textAlign: 'center',
                        padding: '15px',
                        background: `${stat.color}05`,
                        borderRadius: '15px',
                        border: `1px solid ${stat.color}20`,
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-3px)'
                        e.target.style.boxShadow = `0 8px 20px ${stat.color}25`
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)'
                        e.target.style.boxShadow = 'none'
                      }}
                      >
                        <div style={{
                          fontSize: '1.8rem',
                          fontWeight: '900',
                          color: stat.color,
                          marginBottom: '8px',
                          fontFamily: "'Space Grotesk', monospace",
                        }}>
                          {stat.number}
                        </div>
                        
                        <div style={{
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: theme.textPrimary,
                          marginBottom: '10px',
                        }}>
                          {stat.label}
                        </div>
                        
                        <div style={{
                          width: '100%',
                          height: '6px',
                          background: '#e0e0e0',
                          borderRadius: '3px',
                          overflow: 'hidden',
                        }}>
                          <div style={{
                            width: stat.percentage,
                            height: '100%',
                            background: stat.color,
                            borderRadius: '3px',
                            transition: 'width 1.5s ease-in-out',
                          }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Desktop Layout - Keep Original */}
          {!isMobile && !isTablet && !isTabletLandscape && (
            <>
              {/* Image Section */}
              <div style={{
                position: 'relative',
                opacity: elementVisible ? 1 : 0,
                transform: elementVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
                transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
              }}>
                {/* Creative Image Frame */}
                <div style={{
                  position: 'relative',
                  width: '350px',
                  margin: '0 auto',
                }}>
                  {/* Decorative Frame Elements */}
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '-20px',
                    right: '-20px',
                    bottom: '-20px',
                    background: `conic-gradient(from 45deg, ${theme.accentPrimary}30, ${theme.textSecondary}20, ${theme.accentSecondary}25, ${theme.accentPrimary}30)`,
                    borderRadius: '40px',
                    animation: 'rotateFrame 15s linear infinite',
                    filter: 'blur(10px)',
                  }}></div>

                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    right: '-10px',
                    bottom: '-10px',
                    background: `linear-gradient(45deg, ${theme.bgSecondary}90, ${theme.accentTertiary}80)`,
                    borderRadius: '35px',
                    backdropFilter: 'blur(20px)',
                  }}></div>

                  {/* Main Image Container */}
                  <div style={{
                    position: 'relative',
                    borderRadius: '30px',
                    overflow: 'hidden',
                    background: `linear-gradient(145deg, ${theme.bgSecondary}, ${theme.accentTertiary}50)`,
                    padding: '15px',
                    transform: isImageHovered ? 'scale(1.02) rotate(1deg)' : 'scale(1)',
                    transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  }}
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                  >
                    {/* Image Stack */}
                    <div style={{
                      position: 'relative',
                      borderRadius: '25px',
                      overflow: 'hidden',
                      height: '380px',
                    }}>
                      <img 
                        src="/images/Hannah.png"
                        alt="Hannah Jamilla Peralta" 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'all 0.6s ease',
                          opacity: isImageHovered ? 0 : 1,
                        }}
                      />
                      <img 
                        src="/images/hannah-two.jpg"
                        alt="Hannah Jamilla Peralta - Alternative" 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          transition: 'all 0.6s ease',
                          opacity: isImageHovered ? 1 : 0,
                        }}
                      />
                    </div>
                    {/* Floating Elements Around Image */}
                    <div style={{
                      position: 'absolute',
                      top: '10%',
                      right: '-15px',
                      width: '30px',
                      height: '30px',
                      background: theme.accentPrimary,
                      borderRadius: '50%',
                      animation: 'floatPulse 3s ease-in-out infinite',
                    }}></div>

                    <div style={{
                      position: 'absolute',
                      bottom: '20%',
                      left: '-10px',
                      width: '20px',
                      height: '40px',
                      background: theme.textSecondary,
                      borderRadius: '10px',
                      animation: 'floatPulse 4s ease-in-out infinite reverse',
                    }}></div>
                  </div>
                </div>
              </div>

              {/* Main Content Section */}
              <div style={{
                position: 'relative',
                opacity: elementVisible ? 1 : 0,
                transform: elementVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s',
                textAlign: 'left',
                padding: '0',
              }}>
                {/* Creative Header */}
                <div style={{
                  marginBottom: '40px',
                }}>
                  <div style={{
                    position: 'relative',
                    display: 'inline-block',
                  }}>
                    <h2 style={{
                      fontSize: '2.8rem',
                      fontWeight: '700',
                      background: `linear-gradient(135deg, ${theme.textPrimary}, ${theme.textSecondary}, ${theme.accentPrimary})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                      marginBottom: '15px',
                    }}>
                      Meet the Developer
                    </h2>

                    {/* Creative Underline */}
                    <div style={{
                      position: 'absolute',
                      bottom: '-5px',
                      left: '0',
                      width: '100px',
                      height: '4px',
                      background: `linear-gradient(90deg, ${theme.accentPrimary}, ${theme.textSecondary})`,
                      borderRadius: '2px',
                      animation: 'expandContract 2s ease-in-out infinite',
                    }}></div>
                  </div>
                  <div style={{
                    fontSize: '1.1rem',
                    color: theme.textSecondary,
                    fontWeight: '500',
                    marginTop: '25px',
                  }}>
                    Crafting digital experiences with{' '}
                    <span style={{ 
                      color: theme.textPrimary, 
                      fontWeight: '700',
                    }}>
                      passion & purpose
                    </span>
                  </div>
                </div>

                {/* Static About Text */}
                <div style={{
                  marginBottom: '40px',
                  opacity: elementVisible ? 1 : 0,
                  transform: elementVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 1s ease 0.8s',
                }}>
                  <div style={{
                    padding: '25px',
                    background: '#ffffff',
                    borderRadius: '20px',
                    border: `2px solid ${theme.accentPrimary}30`,
                    textAlign: 'left',
                    margin: '0',
                  }}>
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      color: theme.accentPrimary,
                      marginBottom: '15px',
                    }}>
                      Goal-Oriented Developer
                    </h3>
                    <div style={{
                      fontSize: '1.05rem',
                      color: theme.textMuted,
                      lineHeight: 1.7,
                      fontWeight: '400',
                    }}>
                      IT graduate focused on mobile and web development. 
                      I turn ideas into functional digital solutions and enjoy creating applications that are useful and meaningful for users.
                      I am continuously learning and improving my skills.
                    </div>
                  </div>
                </div>
              </div>
              {/* Stats Section */}
              <div style={{
                position: 'relative',
                opacity: elementVisible ? 1 : 0,
                transform: elementVisible ? 'translateX(0)' : 'translateX(50px)',
                transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s',
              }}>
                {/* Stats Layout */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  width: '100%',
                }}>
                  {[
                    { 
                      number: '03', 
                      label: 'Years Experience',
                      color: theme.accentPrimary,
                      percentage: '85%'
                    },
                    { 
                      number: '05', 
                      label: 'Projects Experience',
                      color: theme.textSecondary,
                      percentage: '92%'
                    },
                    { 
                      number: '∞', 
                      label: 'Learning Experience',
                      color: theme.accentSecondary,
                      percentage: '100%'
                    }
                  ].map((stat, index) => (
                    <div key={index} style={{
                      position: 'relative',
                      background: '#ffffff',
                      borderRadius: '15px',
                      padding: '16px',
                      border: `2px solid ${stat.color}`,
                      minWidth: '220px',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      opacity: 1,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateX(8px) scale(1.02)'
                      e.target.style.boxShadow = `0 15px 35px ${stat.color}40`
                      e.target.style.borderColor = stat.color
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)'
                      e.target.style.boxShadow = 'none'
                      e.target.style.borderColor = stat.color
                    }}
                    >
                      {/* Content Layout */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '10px',
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                        }}>
                          {/* Number Circle */}
                          <div style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '50%',
                            background: stat.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 6px 15px ${stat.color}40`,
                          }}>
                            <span style={{
                              fontSize: '1.2rem',
                              fontWeight: '900',
                              color: 'white',
                              fontFamily: "'Space Grotesk', monospace",
                            }}>
                              {stat.number}
                            </span>
                          </div>
                          {/* Label */}
                          <div>
                            <div style={{
                              fontSize: '1rem',
                              fontWeight: '700',
                              color: theme.textPrimary,
                              marginBottom: '2px',
                            }}>
                              {stat.label}
                            </div>
                            <div style={{
                              fontSize: '0.75rem',
                              color: theme.textSecondary,
                              fontWeight: '500',
                            }}>
                              Professional Growth
                            </div>
                          </div>
                        </div>

                        {/* Right Icon */}
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          background: '#f0f0f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <div style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: stat.color,
                          }}></div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div style={{
                        width: '100%',
                        height: '6px',
                        background: '#e0e0e0',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        position: 'relative',
                      }}>
                        <div style={{
                          width: stat.percentage,
                          height: '100%',
                          background: stat.color,
                          borderRadius: '3px',
                          transition: 'width 1s ease-in-out',
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Decorative Elements */}
                <div style={{
                  position: 'absolute',
                  right: '-25px',
                  top: '20%',
                  bottom: '20%',
                  width: '8px',
                  background: theme.accentPrimary,
                  borderRadius: '4px',
                }}></div>

                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '-15px',
                  width: '25px',
                  height: '25px',
                  background: theme.accentPrimary,
                  borderRadius: '6px',
                  animation: 'floatPulse 5s ease-in-out infinite',
                }}></div>

                <div style={{
                  position: 'absolute',
                  bottom: '-8px',
                  right: '-12px',
                  width: '18px',
                  height: '18px',
                  border: `3px solid ${theme.textSecondary}`,
                  borderRadius: '50%',
                  animation: 'rotateFloat 10s linear infinite',
                }}></div>

                <div style={{
                  position: 'absolute',
                  top: '45%',
                  left: '-20px',
                  width: '12px',
                  height: '12px',
                  background: theme.accentSecondary,
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  animation: 'floatPulse 7s ease-in-out infinite reverse',
                }}></div>
              </div>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes rotateFloat {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          50% { transform: rotate(180deg) translateY(-10px); }
        }

        @keyframes morphBounce {
          0%, 100% { 
            border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            border-radius: 37% 63% 46% 54% / 48% 55% 45% 52%;
            transform: translateY(-15px) rotate(180deg);
          }
        }

        @keyframes rotateFrame {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes floatPulse {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-10px) scale(1.1);
            opacity: 1;
          }
        }

        @keyframes expandContract {
          0%, 100% { width: 100px; }
          50% { width: 120px; }
        }
      `}</style>
    </div>
  )
}