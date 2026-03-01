'use client'

import { useState, useEffect } from 'react'
import { useResponsive } from '../hooks/useResponsive'

export default function AboutMeIntro() {
  const [isVisible, setIsVisible] = useState(false)
  const [elementVisible, setElementVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isImageHovered, setIsImageHovered] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(2) // Start with middle card active
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
                    transform: isImageHovered ? 'scale(1.05) rotate(-2deg)' : 'scale(1) rotate(-2deg)', // Added slight rotation
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
              {/* Enhanced About Card */}
              <div style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 50%, #f9f9f9 100%)',
                borderRadius: '28px', // More rounded
                padding: isMobile ? '35px' : '40px', // Increased padding
                border: `3px solid ${theme.accentPrimary}40`,
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 15px 40px rgba(0,0,0,0.12), 0 5px 15px rgba(108, 19, 31, 0.1)',
                transform: 'rotate(-1deg)', // Slight rotation for uniqueness
              }}>
                {/* Enhanced Background Pattern */}
                <div style={{
                  position: 'absolute',
                  top: '-30%',
                  left: '-30%',
                  width: '160%',
                  height: '160%',
                  background: `conic-gradient(from 45deg, transparent, ${theme.accentPrimary}03, transparent, ${theme.textSecondary}03, transparent)`,
                  animation: 'rotateFloat 25s linear infinite',
                }}></div>

                {/* Decorative Corner Elements */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  width: '40px',
                  height: '40px',
                  background: `linear-gradient(135deg, ${theme.accentPrimary}15, ${theme.textSecondary}10)`,
                  borderRadius: '12px',
                  transform: 'rotate(15deg)',
                }}></div>

                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  left: '15px',
                  width: '25px',
                  height: '25px',
                  background: `${theme.accentSecondary}20`,
                  borderRadius: '50%',
                  animation: 'floatPulse 4s ease-in-out infinite',
                }}></div>

                {/* Accent Line */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '20%',
                  right: '20%',
                  height: '4px',
                  background: `linear-gradient(90deg, transparent, ${theme.accentPrimary}, transparent)`,
                  borderRadius: '0 0 2px 2px',
                }}></div>
                
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h3 style={{
                    fontSize: isMobile ? '1.5rem' : '1.7rem',
                    fontWeight: '800',
                    background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.textSecondary})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '18px',
                    letterSpacing: '-0.02em',
                  }}>
                    Goal-Oriented Developer
                  </h3>

                  {/* Enhanced Divider */}
                  <div style={{
                    width: '80px',
                    height: '3px',
                    background: `linear-gradient(90deg, ${theme.accentPrimary}, ${theme.textSecondary})`,
                    borderRadius: '2px',
                    margin: '0 auto 20px',
                    animation: 'expandContract 3s ease-in-out infinite',
                  }}></div>
                  
                  <div style={{
                    fontSize: isMobile ? '1.05rem' : '1.15rem',
                    color: theme.textMuted,
                    lineHeight: 1.7,
                    fontWeight: '500',
                    textAlign: 'left', // Changed to left align for better readability
                  }}>
                    <span style={{ 
                      color: theme.textPrimary, 
                      fontWeight: '700',
                      fontSize: '1.1em',
                    }}>
                      IT graduate
                    </span> focused on mobile and web development. 
                    I turn ideas into <span style={{ 
                      color: theme.accentPrimary, 
                      fontWeight: '600' 
                    }}>functional digital solutions</span> and enjoy creating applications that are 
                    <span style={{ 
                      color: theme.textSecondary, 
                      fontWeight: '600' 
                    }}>useful and meaningful</span> for users. 
                    <br /><br />
                    <span style={{ 
                      fontStyle: 'italic',
                      color: theme.textSecondary,
                    }}>
                      Continuously learning and improving my skills.
                    </span>
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
          {/* Mobile/Tablet: Horizontal Carousel Stats */}
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
              
              {/* Horizontal Scroll Container */}
              <div style={{
                overflowX: 'auto',
                overflowY: 'hidden',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitScrollbar: { display: 'none' },
                paddingBottom: '10px',
              }}>
                <div style={{
                  display: 'flex',
                  gap: isMobile ? '15px' : '20px',
                  paddingRight: '20px',
                  minWidth: 'max-content',
                }}>
                  {[
                    { 
                      number: '3+', 
                      label: 'Years Learning',
                      color: theme.accentPrimary,
                      description: 'Continuous development',
                      details: 'From basics to advanced concepts'
                    },
                    { 
                      number: '10+', 
                      label: 'Projects Built',
                      color: theme.accentPrimary,
                      description: 'Ideas brought to life',
                      details: 'Web apps & mobile solutions'
                    },
                    { 
                      number: '∞', 
                      label: 'Growth Mindset',
                      color: theme.accentPrimary,
                      description: 'Always exploring',
                      details: 'New frameworks & technologies'
                    },
                    { 
                      number: '24/7', 
                      label: 'Problem Solver',
                      color: theme.accentPrimary,
                      description: 'Creative thinking',
                      details: 'Debugging & optimization'
                    },
                    { 
                      number: '100%', 
                      label: 'Dedication',
                      color: theme.accentPrimary,
                      description: 'Quality focused',
                      details: 'Attention to every detail'
                    },
                    { 
                      number: '5+', 
                      label: 'Tech Stacks',
                      color: theme.accentPrimary,
                      description: 'Full-stack skills',
                      details: 'Frontend to backend mastery'
                    },
                    { 
                      number: '50+', 
                      label: 'Skills Acquired',
                      color: theme.accentPrimary,
                      description: 'Diverse toolkit',
                      details: 'Languages, frameworks & tools'
                    },
                    { 
                      number: '3', 
                      label: 'Certifications',
                      color: theme.accentPrimary,
                      description: 'Professional credentials',
                      details: 'Industry recognized achievements'
                    },
                    { 
                      number: '∞', 
                      label: 'Curiosity Level',
                      color: theme.accentPrimary,
                      description: 'Never stop learning',
                      details: 'Always asking "how" & "why"'
                    },
                    { 
                      number: '1st', 
                      label: 'User Priority',
                      color: theme.accentPrimary,
                      description: 'User-centered design',
                      details: 'Building for real people'
                    }
                  ].map((stat, index) => (
                    <div key={index} style={{
                      minWidth: isMobile ? '250px' : '280px',
                      textAlign: 'center',
                      padding: isMobile ? '20px' : '25px',
                      background: `${stat.color}08`,
                      borderRadius: '20px',
                      border: `2px solid ${stat.color}30`,
                      transition: 'all 0.3s ease',
                      flexShrink: 0,
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
                      {/* Header */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        marginBottom: '15px',
                      }}>
                        <div style={{
                          fontSize: isMobile ? '1.8rem' : '2rem',
                          fontWeight: '900',
                          color: stat.color,
                          fontFamily: "'Space Grotesk', monospace",
                        }}>
                          {stat.number}
                        </div>
                      </div>
                      
                      <div style={{
                        fontSize: isMobile ? '0.95rem' : '1rem',
                        fontWeight: '700',
                        color: theme.textPrimary,
                        marginBottom: '10px',
                      }}>
                        {stat.label}
                      </div>

                      <div style={{
                        fontSize: isMobile ? '0.85rem' : '0.9rem',
                        fontWeight: '600',
                        color: theme.textSecondary,
                        marginBottom: '8px',
                        lineHeight: 1.3,
                      }}>
                        {stat.description}
                      </div>

                      <div style={{
                        fontSize: isMobile ? '0.75rem' : '0.8rem',
                        color: theme.textMuted,
                        lineHeight: 1.4,
                        fontStyle: 'italic',
                      }}>
                        {stat.details}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scroll Indicator Dots */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '20px',
              }}>
                {[0,1,2,3,4,5,6,7,8,9].map((dot, index) => (
                  <div key={index} style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: index < 5 ? theme.accentPrimary : `${theme.accentPrimary}30`,
                    transition: 'all 0.3s ease',
                  }}></div>
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
                    transform: isImageHovered ? 'scale(1.03) rotate(-2deg)' : 'scale(1) rotate(-2deg)', // Added slight rotation
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
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitScrollbar: { display: 'none' },
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      paddingBottom: '5px',
                      minWidth: 'max-content',
                    }}>
                      {[
                        { 
                          number: '3+', 
                          label: 'Years Learning',
                          color: theme.accentPrimary,
                          description: 'Continuous development'
                        },
                        { 
                          number: '10+', 
                          label: 'Projects Built',
                          color: theme.accentPrimary,
                          description: 'Ideas to reality'
                        },
                        { 
                          number: '∞', 
                          label: 'Growth Mindset',
                          color: theme.accentPrimary,
                          description: 'Always exploring'
                        },
                        { 
                          number: '24/7', 
                          label: 'Problem Solver',
                          color: theme.accentPrimary,
                          description: 'Creative thinking'
                        },
                        { 
                          number: '100%', 
                          label: 'Dedication',
                          color: theme.accentPrimary,
                          description: 'Quality focused'
                        },
                        { 
                          number: '5+', 
                          label: 'Tech Stacks',
                          color: theme.accentPrimary,
                          description: 'Full-stack skills'
                        },
                        { 
                          number: '50+', 
                          label: 'Skills Acquired',
                          color: theme.accentPrimary,
                          description: 'Diverse toolkit'
                        },
                        { 
                          number: '3', 
                          label: 'Certifications',
                          color: theme.accentPrimary,
                          description: 'Professional credentials'
                        },
                        { 
                          number: '∞', 
                          label: 'Curiosity Level',
                          color: theme.accentPrimary,
                          description: 'Never stop learning'
                        },
                        { 
                          number: '1st', 
                          label: 'User Priority',
                          color: theme.accentPrimary,
                          description: 'User-centered design'
                        }
                      ].map((stat, index) => (
                        <div key={index} style={{
                          minWidth: '160px',
                          textAlign: 'center',
                          padding: '15px',
                          background: `${stat.color}08`,
                          borderRadius: '15px',
                          border: `1px solid ${stat.color}20`,
                          transition: 'all 0.3s ease',
                          flexShrink: 0,
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
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            marginBottom: '8px',
                          }}>
                            <div style={{
                              fontSize: '1.4rem',
                              fontWeight: '900',
                              color: stat.color,
                              fontFamily: "'Space Grotesk', monospace",
                            }}>
                              {stat.number}
                            </div>
                          </div>
                          
                          <div style={{
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: theme.textPrimary,
                            marginBottom: '6px',
                          }}>
                            {stat.label}
                          </div>

                          <div style={{
                            fontSize: '0.7rem',
                            color: theme.textSecondary,
                            lineHeight: 1.3,
                          }}>
                            {stat.description}
                          </div>
                        </div>
                      ))}
                    </div>
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
                    transform: isImageHovered ? 'scale(1.02) rotate(-2deg)' : 'scale(1) rotate(-2deg)', // Added slight rotation
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
              {/* Stats Section - Vertical Cards Carousel */}
              <div style={{
                position: 'relative',
                opacity: elementVisible ? 1 : 0,
                transform: elementVisible ? 'translateX(0)' : 'translateX(50px)',
                transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s',
                height: '400px',
                width: '320px', // Increased to accommodate larger cards
              }}>
                {/* Carousel Container */}
                <div 
                  data-carousel-container
                  style={{
                    position: 'relative',
                    height: '100%',
                    width: '100%',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE and Edge
                  }}
                  className="hide-scrollbar"
                  onScroll={(e) => {
                    const scrollTop = e.target.scrollTop;
                    const cardHeight = 100; // Reduced spacing
                    const newActiveIndex = Math.round(scrollTop / cardHeight);
                    const clampedIndex = Math.max(0, Math.min(9, newActiveIndex));
                    setActiveCardIndex(clampedIndex);
                  }}
                >
                  {/* Cards Container - Enhanced Layout */}
                  <div style={{
                    position: 'relative',
                    height: 'calc(100% + 900px)', // Increased for more cards
                    paddingTop: '120px', // Reduced padding
                    paddingBottom: '120px', // Reduced padding
                  }}>
                    {[
                      { 
                        number: '3+', 
                        label: 'Years Learning',
                        color: theme.accentPrimary,
                        description: 'Continuous skill development'
                      },
                      { 
                        number: '10+', 
                        label: 'Projects Built',
                        color: theme.accentPrimary,
                        description: 'From ideas to reality'
                      },
                      { 
                        number: '∞', 
                        label: 'Growth Mindset',
                        color: theme.accentPrimary,
                        description: 'Always exploring & learning'
                      },
                      { 
                        number: '24/7', 
                        label: 'Problem Solver',
                        color: theme.accentPrimary,
                        description: 'Creative thinking daily'
                      },
                      { 
                        number: '100%', 
                        label: 'Dedication',
                        color: theme.accentPrimary,
                        description: 'Quality in every detail'
                      },
                      { 
                        number: '5+', 
                        label: 'Tech Stacks',
                        color: theme.textSecondary,
                        description: 'Full-stack capabilities'
                      },
                      { 
                        number: '50+', 
                        label: 'Skills Acquired',
                        color: theme.textSecondary,
                        description: 'Frontend to backend'
                      },
                      { 
                        number: '3', 
                        label: 'Certifications',
                        color: theme.textSecondary,
                        description: 'Professional credentials'
                      },
                      { 
                        number: '∞', 
                        label: 'Curiosity Level',
                        color: theme.textSecondary,
                        description: 'Never stop questioning'
                      },
                      { 
                        number: '1st', 
                        label: 'User Priority',
                        color: theme.textSecondary,
                        description: 'User-centered approach'
                      }
                    ].map((stat, index) => {
                      // Calculate positions for enhanced stacked effect
                      const baseY = 120 + (index * 100); // Reduced spacing
                      
                      // Calculate visual positioning relative to active card
                      const relativePosition = index - activeCardIndex;
                      
                      let scale = 1;
                      let opacity = 1;
                      let zIndex = 5;
                      let translateY = 0;
                      let background = '#ffffff';
                      let borderOpacity = '1';
                      
                      if (relativePosition === 0) {
                        // Center/Active card - fully visible
                        scale = 1;
                        opacity = 1;
                        zIndex = 5;
                        translateY = 0;
                        background = '#7e3f49ff'; // Accent color background
                        borderOpacity = '1';
                      } else if (relativePosition === -1) {
                        // Card above center
                        scale = 0.88;
                        opacity = 0.7;
                        zIndex = 4;
                        translateY = -25;
                        background = '#f8f9fa';
                        borderOpacity = '0.7';
                      } else if (relativePosition === 1) {
                        // Card below center
                        scale = 0.88;
                        opacity = 0.7;
                        zIndex = 4;
                        translateY = 25;
                        background = '#f8f9fa';
                        borderOpacity = '0.7';
                      } else if (relativePosition < -1) {
                        // Cards far above
                        scale = 0.75;
                        opacity = 0.4;
                        zIndex = 3;
                        translateY = -50;
                        background = '#f0f0f0';
                        borderOpacity = '0.5';
                      } else {
                        // Cards far below
                        scale = 0.75;
                        opacity = 0.4;
                        zIndex = 3;
                        translateY = 50;
                        background = '#f0f0f0';
                        borderOpacity = '0.5';
                      }

                      return (
                        <div key={index} style={{
                          position: 'absolute',
                          top: `${baseY}px`,
                          left: '50%',
                          width: '270px', // Increased from 250px
                          height: '140px', // Increased from 120px
                          background: background,
                          borderRadius: '18px', // Slightly larger radius
                          padding: '18px', // Increased padding
                          border: `2px solid ${stat.color}${Math.round(parseFloat(borderOpacity) * 255).toString(16).padStart(2, '0')}`,
                          boxShadow: relativePosition === 0 
                            ? `0 20px 40px ${stat.color}30` 
                            : `0 8px 20px rgba(0,0,0,0.1)`,
                          transform: `translateX(-50%) translateY(${translateY}px) scale(${scale})`,
                          opacity: opacity,
                          zIndex: zIndex,
                          transition: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          cursor: 'pointer',
                          overflow: 'hidden', // Changed back to hidden for clean look
                        }}
                        onClick={() => {
                          setActiveCardIndex(index);
                          const container = document.querySelector('[data-carousel-container]');
                          if (container) {
                            container.scrollTo({
                              top: index * 100,
                              behavior: 'smooth'
                            });
                          }
                        }}
                        >
                          {/* Enhanced Card Content */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center', // Changed to center for compact layout
                            gap: '12px',
                            height: '100%',
                          }}>
                            {/* Left: Bigger Number Circle with Different Shape */}
                            <div style={{
                              width: '60px', // Increased from 45px
                              height: '60px', // Increased from 45px
                              borderRadius: '20px', // Changed from 50% (circle) to rounded square
                              background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`, // Enhanced gradient
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: `0 8px 20px ${stat.color}40`, // Enhanced shadow
                              flexShrink: 0,
                              transform: 'rotate(-5deg)', // Slight rotation for dynamic look
                            }}>
                              <span style={{
                                fontSize: '1.3rem', // Increased font size
                                fontWeight: '900',
                                color: 'white',
                                fontFamily: "'Space Grotesk', monospace",
                                transform: 'rotate(5deg)', // Counter-rotate text to keep it straight
                              }}>
                                {stat.number}
                              </span>
                            </div>

                            {/* Right: Compact Content */}
                            <div style={{
                              flex: 1,
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              gap: '4px', // Minimal gap
                            }}>
                              {/* Title */}
                              <div style={{
                                fontSize: '1rem', // Smaller title
                                fontWeight: '700',
                                color: relativePosition === 0 ? '#ffffff' : theme.textPrimary, // White text for active card
                                lineHeight: 1.1,
                              }}>
                                {stat.label}
                              </div>

                              {/* Compact Description */}
                              <div style={{
                                fontSize: '0.8rem', // Smaller description
                                color: relativePosition === 0 ? '#FFECEA' : theme.textSecondary, // Light text for active card
                                fontWeight: '500',
                                lineHeight: 1.2,
                              }}>
                                {stat.description}
                              </div>
                            </div>
                          </div>

                          {/* Enhanced Decorative Elements */}
                          <div style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            width: '20px',
                            height: '20px',
                            background: `${stat.color}20`,
                            borderRadius: '50%',
                          }}></div>

                          {/* Subtle Pattern Overlay */}
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: '60px',
                            height: '60px',
                            background: `linear-gradient(135deg, transparent 40%, ${stat.color}08 100%)`,
                            borderTopRightRadius: '16px',
                          }}></div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Enhanced Navigation Indicators */}
                <div style={{
                  position: 'absolute',
                  right: '-12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  alignItems: 'center',
                }}>
                  {[0,1,2,3,4,5,6,7,8,9].map((dot, index) => (
                    <div key={index} style={{
                      width: index === activeCardIndex ? '8px' : '5px',
                      height: index === activeCardIndex ? '8px' : '5px',
                      borderRadius: '50%',
                      background: index === activeCardIndex ? theme.accentPrimary : `${theme.accentPrimary}50`,
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      boxShadow: index === activeCardIndex ? `0 2px 8px ${theme.accentPrimary}40` : 'none',
                    }}
                    onClick={() => {
                      setActiveCardIndex(index);
                      const container = document.querySelector('[data-carousel-container]');
                      if (container) {
                        container.scrollTo({
                          top: index * 100,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    ></div>
                  ))}
                </div>

                {/* Enhanced Decorative Elements */}
                <div style={{
                  position: 'absolute',
                  right: '-20px',
                  top: '25%',
                  bottom: '25%',
                  width: '4px',
                  background: `linear-gradient(to bottom, transparent, ${theme.accentPrimary}60, transparent)`,
                  borderRadius: '2px',
                }}></div>

                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '-12px',
                  width: '16px',
                  height: '16px',
                  background: `linear-gradient(135deg, ${theme.accentPrimary}, ${theme.accentPrimary}cc)`,
                  borderRadius: '3px',
                  animation: 'floatPulse 4s ease-in-out infinite',
                }}></div>

                <div style={{
                  position: 'absolute',
                  bottom: '-6px',
                  right: '-10px',
                  width: '12px',
                  height: '12px',
                  border: `2px solid ${theme.textSecondary}80`,
                  borderRadius: '50%',
                  animation: 'rotateFloat 8s linear infinite',
                }}></div>

                <div style={{
                  position: 'absolute',
                  top: '40%',
                  left: '-16px',
                  width: '8px',
                  height: '8px',
                  background: `${theme.accentSecondary}cc`,
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  animation: 'floatPulse 6s ease-in-out infinite reverse',
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

        /* Hide scrollbar for WebKit browsers */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}