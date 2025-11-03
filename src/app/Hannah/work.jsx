'use client'

import { useEffect, useState } from 'react'

export default function Work({ scrollDirection = 'down' }) {
  const [mounted, setMounted] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredResponsibility, setHoveredResponsibility] = useState(null)
  const [hoveredStat, setHoveredStat] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  })

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

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

  const isMobile = windowSize.width < 768
  const isTablet = windowSize.width < 1024

  const getResponsiveValue = (desktop, tablet, mobile) => {
    if (isMobile) return mobile
    if (isTablet) return tablet
    return desktop
  }

  const theme = {
    bgPrimary: '#ffffff',
    bgSecondary: '#f8f9fa',
    bgTertiary: '#e9ecef',
    textPrimary: '#000000',
    textSecondary: '#1a1a1a',
    textMuted: '#6c757d',
    accentColor: '#000000',
    accentLight: '#495057',
    borderColor: 'rgba(0, 0, 0, 0.08)',
    borderAccent: 'rgba(0, 0, 0, 0.15)',
    shadowLight: 'rgba(0, 0, 0, 0.04)',
    shadowMedium: 'rgba(0, 0, 0, 0.08)',
  }

  const experiences = [
    {
      id: 1,
      organization: "Executive Secretary's Office",
      location: "National University - Baliwag, Bulacan",
      role: "Core Member",
      duration: "2023-2024",
      responsibilities: [
        "Participated in organizing academic activities, including a university-level Quiz Bee competition",
        "Assisted in coordinating office communications and supporting event logistics to ensure smooth execution of academic programs"
      ],
      icon: "M12 2L2 7L12 12L22 7L12 2Z M2 17L12 22L22 17 M2 12L12 17L22 12",
      pattern: "grid"
    },
    {
      id: 2,
      organization: "AWS Cloud Clubs",
      location: "National University - Baliwag, Bulacan",
      role: "Committee and Member, Department of Chief Skill Development Office",
      duration: "2025-Present",
      responsibilities: [
        "Assists in organizing and facilitating cloud-focused learning sessions and professional development activities for IT students",
        "Supports the execution of cloud technology workshops and skill development programs for IT students"
      ],
      icon: "M12 20L12 4 M4 12L20 12 M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z",
      pattern: "waves"
    }
  ]

  useEffect(() => {
    if (mounted) {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.08; }
        }
        
        .experience-card {
          animation: slideInUp 0.6s ease-out;
        }
        
        .experience-card:hover {
          transform: translateY(-8px);
        }
        
        .stat-item:hover {
          transform: translateY(-5px);
        }
        
        .responsibility-item:hover {
          transform: translateX(8px);
        }
        
        .icon-svg:hover {
          transform: rotate(10deg) scale(1.1);
        }

        @media (max-width: 1024px) {
          .cards-container {
            grid-template-columns: 1fr !important;
          }
        }
      `;
      document.head.appendChild(style);

      return () => {
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
      }
    }
  }, [mounted])

  if (!mounted) {
    return null
  }

  const IconSVG = ({ path, size = 24 }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      className="icon-svg"
      style={{
        transition: 'all 0.3s ease',
      }}
    >
      <path 
        d={path} 
        strokeLinecap="round" 
        strokeLinejoin="round"
        strokeDasharray={100}
        strokeDashoffset={100}
        style={{
          animation: 'dash 1s ease-out forwards',
          animationDelay: '0.5s'
        }}
      />
    </svg>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bgPrimary,
      padding: getResponsiveValue('80px 40px', '60px 30px', '40px 20px'),
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    }} id="work">
      
      {/* Background Graphics */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {/* Abstract Line Art */}
        <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.02 }}>
          <defs>
            <pattern id="diagonalLines" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M-10,10 L30,50 M30,10 L50,30" stroke={theme.accentColor} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>

        {/* Corner Graphics */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: getResponsiveValue(150, 100, 60),
          height: getResponsiveValue(150, 100, 60),
          border: `2px solid ${theme.accentColor}`,
          borderRight: 'none',
          borderBottom: 'none',
          opacity: 0.03,
        }}></div>

        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: getResponsiveValue(150, 100, 60),
          height: getResponsiveValue(150, 100, 60),
          border: `2px solid ${theme.accentColor}`,
          borderLeft: 'none',
          borderTop: 'none',
          opacity: 0.03,
        }}></div>

        {/* Pulsing Dots Pattern */}
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '15%',
          width: getResponsiveValue(100, 80, 50),
          height: getResponsiveValue(100, 80, 50),
          background: `radial-gradient(circle, ${theme.accentColor} 1px, transparent 1px)`,
          backgroundSize: '15px 15px',
          opacity: 0.03,
          animation: 'pulse 4s ease-in-out infinite',
        }}></div>
      </div>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 2,
      }}>
        
        {/* Header Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: getResponsiveValue(80, 60, 40),
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease 0.2s',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: getResponsiveValue(12, 10, 8),
            marginBottom: getResponsiveValue(24, 20, 16),
          }}>
            <div style={{
              width: getResponsiveValue(3, 2, 1),
              height: getResponsiveValue(20, 16, 12),
              background: theme.accentColor,
            }}></div>
            <div style={{
              fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
              fontWeight: '700',
              color: theme.accentColor,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Professional Journey
            </div>
            <div style={{
              width: getResponsiveValue(3, 2, 1),
              height: getResponsiveValue(20, 16, 12),
              background: theme.accentColor,
            }}></div>
          </div>
          
          <h1 style={{
            fontSize: getResponsiveValue('3.5rem', '2.8rem', '2.2rem'),
            fontWeight: '800',
            marginBottom: getResponsiveValue(16, 14, 12),
            color: theme.textPrimary,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
          }}>
            Work Experience
          </h1>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: getResponsiveValue(20, 16, 12),
            marginBottom: getResponsiveValue(24, 20, 16),
          }}>
            <div style={{
              width: getResponsiveValue(60, 40, 30),
              height: '1px',
              background: theme.accentColor,
              opacity: 0.2,
            }}></div>
            <p style={{
              fontSize: getResponsiveValue('1.1rem', '1rem', '0.9rem'),
              color: theme.textMuted,
              fontWeight: '400',
              margin: 0,
              maxWidth: '500px',
            }}>
              My professional growth through organizational roles and contributions
            </p>
            <div style={{
              width: getResponsiveValue(60, 40, 30),
              height: '1px',
              background: theme.accentColor,
              opacity: 0.2,
            }}></div>
          </div>
        </div>

        {/* Experience Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: getResponsiveValue('repeat(2, 1fr)', '1fr', '1fr'),
          gap: getResponsiveValue(40, 30, 20),
          marginBottom: getResponsiveValue(80, 60, 40),
        }} className="cards-container">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              style={{
                background: theme.bgPrimary,
                border: `1px solid ${theme.borderColor}`,
                borderRadius: '20px',
                padding: 0,
                overflow: 'hidden',
                transition: 'all 0.4s ease',
                position: 'relative',
                boxShadow: `0 8px 32px ${theme.shadowLight}`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${0.3 + index * 0.2}s`,
              }}
              className="experience-card"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Pattern Background */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: experience.pattern === 'grid' 
                  ? `linear-gradient(45deg, transparent 49%, ${theme.borderColor} 49%, ${theme.borderColor} 51%, transparent 51%)`
                  : `linear-gradient(0deg, transparent 49%, ${theme.borderColor} 49%, ${theme.borderColor} 51%, transparent 51%)`,
                backgroundSize: '20px 20px',
                opacity: 0.03,
                pointerEvents: 'none',
              }}></div>

              {/* Card Header */}
              <div style={{
                padding: getResponsiveValue('30px 25px 20px', '25px 20px 15px', '20px 15px 12px'),
                borderBottom: `1px solid ${theme.borderColor}`,
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.8)',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: getResponsiveValue(16, 14, 12),
                }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: getResponsiveValue('1.4rem', '1.3rem', '1.2rem'),
                      fontWeight: '700',
                      color: theme.textPrimary,
                      marginBottom: getResponsiveValue(8, 6, 4),
                      lineHeight: 1.3,
                    }}>
                      {experience.organization}
                    </h3>
                    <div style={{
                      fontSize: getResponsiveValue('1.1rem', '1rem', '0.9rem'),
                      fontWeight: '600',
                      color: theme.textSecondary,
                      marginBottom: getResponsiveValue(8, 6, 4),
                    }}>
                      {experience.role}
                    </div>
                  </div>
                  <div style={{
                    width: getResponsiveValue(48, 40, 32),
                    height: getResponsiveValue(48, 40, 32),
                    background: theme.bgSecondary,
                    border: `1px solid ${theme.borderColor}`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.accentColor,
                    flexShrink: 0,
                  }}>
                    <IconSVG path={experience.icon} size={getResponsiveValue(20, 18, 16)} />
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: getResponsiveValue(12, 10, 8),
                }}>
                  <div style={{
                    fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
                    color: theme.textMuted,
                    fontWeight: '400',
                  }}>
                    {experience.location}
                  </div>
                  <div style={{
                    fontSize: getResponsiveValue('0.85rem', '0.8rem', '0.75rem'),
                    fontWeight: '600',
                    color: theme.accentColor,
                    background: theme.bgSecondary,
                    padding: getResponsiveValue('6px 12px', '5px 10px', '4px 8px'),
                    borderRadius: '6px',
                    border: `1px solid ${theme.borderColor}`,
                  }}>
                    {experience.duration}
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div style={{
                padding: getResponsiveValue('25px', '20px', '15px'),
                background: 'rgba(255, 255, 255, 0.9)',
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: getResponsiveValue(16, 14, 12),
                }}>
                  {experience.responsibilities.map((responsibility, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: getResponsiveValue(12, 10, 8),
                        padding: getResponsiveValue('16px', '14px', '12px'),
                        background: theme.bgSecondary,
                        borderRadius: '10px',
                        border: `1px solid ${theme.borderColor}`,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                      }}
                      className="responsibility-item"
                      onMouseEnter={() => setHoveredResponsibility(`${experience.id}-${idx}`)}
                      onMouseLeave={() => setHoveredResponsibility(null)}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: getResponsiveValue(8, 6, 4),
                        minWidth: getResponsiveValue(20, 18, 16),
                      }}>
                        <div style={{
                          width: getResponsiveValue(6, 5, 4),
                          height: getResponsiveValue(6, 5, 4),
                          background: theme.accentColor,
                          borderRadius: '50%',
                        }}></div>
                        <div style={{
                          width: getResponsiveValue(2, 1, 1),
                          height: getResponsiveValue(12, 10, 8),
                          background: theme.accentColor,
                          opacity: 0.5,
                          borderRadius: '1px',
                        }}></div>
                      </div>
                      <div style={{
                        fontSize: getResponsiveValue('0.95rem', '0.9rem', '0.85rem'),
                        color: theme.textSecondary,
                        lineHeight: 1.5,
                        fontWeight: '400',
                        margin: 0,
                        flex: 1,
                      }}>
                        {responsibility}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section with Graphics */}
        <div style={{
          background: theme.bgSecondary,
          borderRadius: '20px',
          border: `1px solid ${theme.borderColor}`,
          padding: getResponsiveValue('50px 40px', '40px 30px', '30px 20px'),
          position: 'relative',
          overflow: 'hidden',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease 0.8s',
        }}>
          {/* Background Graphics */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '100%',
            background: `linear-gradient(135deg, ${theme.accentColor} 0%, transparent 70%)`,
            opacity: 0.02,
          }}></div>

          <svg width="100" height="100" style={{ 
            position: 'absolute', 
            bottom: '20px', 
            left: '30px', 
            opacity: 0.03,
            transform: 'rotate(45deg)'
          }}>
            <rect x="10" y="10" width="80" height="80" stroke={theme.accentColor} strokeWidth="2" fill="none" />
          </svg>

          <div style={{
            display: 'grid',
            gridTemplateColumns: getResponsiveValue('repeat(4, 1fr)', 'repeat(2, 1fr)', '1fr'),
            gap: getResponsiveValue(30, 25, 20),
            position: 'relative',
            zIndex: 2,
          }}>
            {[
              { number: '2', label: 'Organizations' },
              { number: '4+', label: 'Roles Held' },
              { number: '100%', label: 'Commitment' },
              { number: '∞', label: 'Learning' }
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  textAlign: 'center',
                  padding: getResponsiveValue('25px 20px', '22px 18px', '20px 15px'),
                  background: theme.bgPrimary,
                  borderRadius: '15px',
                  border: `1px solid ${theme.borderColor}`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className="stat-item"
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                {/* Stat Background Pattern */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(45deg, transparent 49%, ${theme.borderColor} 49%, ${theme.borderColor} 51%, transparent 51%)`,
                  backgroundSize: '15px 15px',
                  opacity: 0.03,
                }}></div>

                <div style={{
                  fontSize: getResponsiveValue('2.5rem', '2.2rem', '1.8rem'),
                  fontWeight: '800',
                  color: hoveredStat === index ? theme.textPrimary : theme.accentColor,
                  marginBottom: getResponsiveValue(8, 6, 4),
                  lineHeight: 1,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 2,
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
                  fontWeight: '600',
                  color: hoveredStat === index ? theme.textPrimary : theme.textMuted,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  zIndex: 2,
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div style={{
          textAlign: 'center',
          marginTop: getResponsiveValue(60, 50, 40),
          opacity: 0.1,
        }}>
          <svg width="80" height="8" viewBox="0 0 80 8" style={{ margin: '0 auto' }}>
            <line x1="0" y1="4" x2="80" y2="4" stroke={theme.accentColor} strokeWidth="1" strokeDasharray="5,5" />
          </svg>
        </div>
      </div>
    </div>
  )
}