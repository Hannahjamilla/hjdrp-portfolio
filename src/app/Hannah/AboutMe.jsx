'use client'

import { useEffect, useState, useRef } from 'react'
import GlobalNavigation from '../components/GlobalNavigation'

export default function AboutMe({ scrollDirection = 'down' }) {
  const [mounted, setMounted] = useState(false)
  const [activeHex, setActiveHex] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const theme = {
    bgPrimary: '#FFECEA',
    bgSecondary: '#ffffff',
    bgTertiary: '#f8f4f3',
    textPrimary: '#6C131F',
    textSecondary: '#A14B58',
    textMuted: '#A14B58',
    borderColor: 'rgba(108, 19, 31, 0.15)',
    accent: '#6C131F',
  }

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  })

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

  useEffect(() => {
    if (mounted) {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        .floating-shape {
          animation: float 15s ease-in-out infinite;
        }

        .hexagon-bounce {
          animation: bounce 2s ease-in-out infinite;
        }

        .hexagon-bounce:nth-child(1) {
          animation-delay: 0s;
        }

        .hexagon-bounce:nth-child(2) {
          animation-delay: 0.3s;
        }

        .hexagon-bounce:nth-child(3) {
          animation-delay: 0.6s;
        }
        
        .skill-tag:hover {
          background: #6C131F;
          color: #FFECEA;
          transform: translateY(-2px);
        }
        
        .hexagon:hover .hexagon-number,
        .hexagon:hover .hexagon-label {
          color: #FFECEA;
        }
        
        .profile-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .profile-card:hover {
          transform: rotate(-2deg) translateY(-5px);
          box-shadow: 25px 25px 0px 0px rgba(108,19,31,1);
        }
        
        @media (prefers-color-scheme: dark) {
          .profile-card:hover {
            box-shadow: 25px 25px 0px 0px rgba(255,236,234,1);
          }
        }

        .philosophy-item:hover {
          background: #6C131F;
          color: #FFECEA;
          transform: translateY(-2px);
        }

        .philosophy-item:hover .philosophy-title {
          color: #FFECEA;
        }

        .philosophy-item:hover .philosophy-description {
          color: #f0f0f0;
        }

        /* Fixed Hexagon Grid Styles */
        .hexagon-grid {
          display: grid !important;
          position: relative;
        }

        /* Responsive styles */
        @media (max-width: 1024px) {
          .main-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          .profile-section {
            order: 1;
            max-width: 600px;
            margin: 0 auto;
          }
          
          .content-section {
            order: 2;
          }
          
          .title {
            font-size: 3.5rem !important;
          }

          .hexagon-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 15px !important;
            max-width: 400px;
            margin: 40px auto 0;
          }

          .philosophy-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 40px 20px !important;
          }
          
          .title {
            font-size: 2.5rem !important;
          }
          
          .subtitle {
            font-size: 1.1rem !important;
            padding: 0 20px;
          }
          
          .hexagon-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 12px !important;
          }
          
          .hexagon {
            height: 100px !important;
          }
          
          .skill-tags {
            gap: 8px !important;
          }
          
          .skill-tag {
            padding: 10px 16px !important;
            font-size: 0.8rem !important;
          }

          .philosophy-grid {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }
          
          .profile-card {
            padding: 30px 20px !important;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 30px 15px !important;
          }
          
          .title {
            font-size: 2rem !important;
          }
          
          .profile-card {
            padding: 25px 18px !important;
            transform: rotate(0deg) !important;
          }
          
          .profile-card:hover {
            transform: rotate(0deg) translateY(-5px) !important;
          }
          
          .hexagon-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 10px !important;
          }
          
          .hexagon {
            height: 85px !important;
          }
          
          .hexagon-number {
            font-size: 1.3rem !important;
          }
          
          .hexagon-label {
            font-size: 0.55rem !important;
          }
          
          .skill-cluster {
            padding: 25px 15px !important;
          }
          
          .cluster-header {
            flex-direction: column;
            gap: 10px !important;
            text-align: center;
          }

          .philosophy-grid {
            gap: 12px !important;
          }
          
          .philosophy-item {
            padding: 20px 15px !important;
          }
        }

        @media (max-width: 380px) {
          .hexagon-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          
          .hexagon {
            height: 90px !important;
          }
          
          .title {
            font-size: 1.8rem !important;
          }
        }
        
        /* Landscape optimization */
        @media (max-height: 600px) and (orientation: landscape) {
          .container {
            padding: 30px 20px !important;
          }
          
          .hexagon-grid {
            margin-top: 20px !important;
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
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#ffffff', 
        padding: '60px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>Loading...</div>
      </div>
    )
  }

  const philosophy = [
    {
      title: 'Continuous Learning',
      description: 'Always learning new technologies to stay current in web development.'
    },
    {
      title: 'User-Centered Design',
      description: 'Creating solutions that prioritize user experience and accessibility.'
    },
    {
      title: 'Problem Solving',
      description: 'Building applications that solve real-world problems efficiently.'
    },
    {
      title: 'Quality & Innovation',
      description: 'Writing clean code while exploring creative solutions.'
    }
  ]

  const hexagons = [
    { number: '5+', label: 'Projects' },
    { number: '10+', label: 'Skills' },
    { number: '3', label: 'Certifications' }
  ]

  return (
    <div>
      <GlobalNavigation />
      <div style={{
        minHeight: '100vh',
        background: theme.bgPrimary,
        padding: getResponsiveValue('80px 40px', '60px 30px', '40px 20px'),
        fontFamily: "'Poppins', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(50px)' : 'translateY(-50px)'),
        transition: 'all 0.8s ease',
      }} id="about" ref={sectionRef}>
        
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(45deg, transparent 49%, ${theme.borderColor} 49%, ${theme.borderColor} 51%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, ${theme.borderColor} 49%, ${theme.borderColor} 51%, transparent 51%)
          `,
          backgroundSize: getResponsiveValue('60px 60px', '50px 50px', '40px 40px'),
          opacity: 0.03,
        }}></div>
        
        {/* Floating shapes */}
        <div style={{
          position: 'absolute',
          width: getResponsiveValue(100, 80, 60),
          height: getResponsiveValue(100, 80, 60),
          border: `2px solid ${theme.borderColor}`,
          opacity: 0.1,
          top: '10%',
          left: '5%',
          borderRadius: '50%'
        }} className="floating-shape"></div>
        
        <div style={{
          position: 'absolute',
          width: getResponsiveValue(100, 80, 60),
          height: getResponsiveValue(100, 80, 60),
          border: `2px solid ${theme.borderColor}`,
          opacity: 0.1,
          top: '20%',
          right: '8%',
          borderRadius: '0px',
          transform: 'rotate(45deg)'
        }} className="floating-shape"></div>
        
        <div style={{
          position: 'absolute',
          width: getResponsiveValue(100, 80, 60),
          height: getResponsiveValue(100, 80, 60),
          border: `2px solid ${theme.borderColor}`,
          opacity: 0.1,
          bottom: '15%',
          left: '8%',
          borderRadius: '20px'
        }} className="floating-shape"></div>
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: getResponsiveValue(80, 60, 40),
          }}>
            <div style={{
              display: 'inline-block',
              position: 'relative',
            }}>
              <h1 style={{
                fontSize: getResponsiveValue('5.5rem', '4rem', '2.8rem'),
                fontWeight: '900',
                color: theme.textPrimary,
                margin: 0,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                position: 'relative',
                zIndex: 2,
                textTransform: 'uppercase',
              }} className="title">
                <span style={{
                  color: '#6C131F',
                  position: 'relative',
                }}>
                  ABOUT
                </span>{' '}
                <span style={{
                  color: theme.accent,
                  position: 'relative',
                  display: 'inline-block',
                }}>
                  ME
                  <span style={{
                    position: 'absolute',
                    bottom: '-12px',
                    left: '0',
                    width: '100%',
                    height: '6px',
                    background: 'linear-gradient(90deg, transparent, #000000, transparent)',
                    borderRadius: '3px',
                  }}></span>
                </span>
              </h1>
            </div>
            <p style={{
              fontSize: getResponsiveValue('1.4rem', '1.3rem', '1.15rem'),
              color: theme.textMuted,
              fontWeight: '400',
              marginTop: getResponsiveValue(25, 22, 20),
              maxWidth: '600px',
              margin: `${getResponsiveValue(25, 22, 20)}px auto 0`,
              lineHeight: 1.7,
              position: 'relative',
            }} className="subtitle">
              <span style={{
                color: '#A14B58',
              }}>
                Creating digital solutions with
              </span>{' '}
              <span style={{ 
                color: theme.textSecondary, 
                fontWeight: '600',
              }}>
                creativity and purpose
              </span>
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: getResponsiveValue('1fr 2fr', '1fr', '1fr'),
            gap: getResponsiveValue(60, 40, 30),
            alignItems: 'start',
          }} className="main-layout">
            
            {/* Left Profile Section */}
            <div style={{
              position: 'relative',
            }} className="profile-section">
              <div style={{
                background: `linear-gradient(135deg, ${theme.bgPrimary} 0%, ${theme.bgSecondary} 100%)`,
                border: `3px solid ${theme.accent}`,
                borderRadius: '20px',
                padding: getResponsiveValue('45px 35px', '40px 30px', '35px 25px'),
                position: 'relative',
                boxShadow: '25px 25px 0px 0px rgba(0,0,0,1)',
                transform: 'rotate(-2deg)',
                overflow: 'hidden',
              }} className="profile-card">

                {/* Decorative corner elements */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  width: '30px',
                  height: '30px',
                  border: `2px solid ${theme.accent}`,
                  borderRadius: '50%',
                  opacity: 0.3,
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  left: '15px',
                  width: '20px',
                  height: '20px',
                  background: theme.accent,
                  borderRadius: '3px',
                  opacity: 0.2,
                  transform: 'rotate(45deg)',
                }}></div>

                <h3 style={{
                  fontSize: getResponsiveValue('2rem', '1.8rem', '1.6rem'),
                  fontWeight: '900',
                  color: theme.textPrimary,
                  marginBottom: '20px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  textAlign: 'center',
                  position: 'relative',
                }}>
                  <span style={{
                    color: '#6C131F',
                  }}>
                    Web Developer
                  </span>
                </h3>
                <p style={{
                  fontSize: getResponsiveValue('1.1rem', '1rem', '0.95rem'),
                  lineHeight: '1.8',
                  color: theme.textSecondary,
                  marginBottom: '30px',
                  textAlign: 'center',
                  position: 'relative',
                }}>
                  <span style={{
                    color: '#A14B58',
                  }}>
                    Building web applications that look great and
                  </span>{' '}
                  <span style={{ 
                    color: theme.textPrimary, 
                    fontWeight: '600',
                  }}>
                    solve real problems for people.
                  </span>
                </p>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  marginTop: getResponsiveValue('40px', '35px', '30px'),
                }}>
                  {[
                    { label: 'Experience', value: '3+ Years' },
                    { label: 'Projects', value: '5+' },
                    { label: 'Dean\'s List', value: 'Multiple Semester' }
                  ].map((stat, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '15px 0',
                      borderBottom: `1px solid ${theme.borderColor}`,
                    }}>
                      <span style={{
                        fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
                        fontWeight: '600',
                        color: theme.textMuted,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>{stat.label}</span>
                      <span style={{
                        fontSize: getResponsiveValue('1.4rem', '1.3rem', '1.2rem'),
                        fontWeight: '800',
                        color: theme.accent,
                      }}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixed Hexagon Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: getResponsiveValue(12, 10, 8),
                marginTop: getResponsiveValue('80px', '70px', '60px'),
                justifyItems: 'center',
              }} className="hexagon-grid">
                {hexagons.map((hex, index) => (
                  <div
                    key={index}
                    style={{
                      width: '100%',
                      maxWidth: getResponsiveValue(120, 100, 90),
                      height: getResponsiveValue(120, 100, 85),
                      background: activeHex === index ? theme.accent : theme.bgSecondary,
                      border: `1px solid ${theme.borderColor}`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      cursor: 'default',
                      transition: 'all 0.3s ease',
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }}
                    className="hexagon hexagon-bounce"
                    onMouseEnter={() => setActiveHex(index)}
                    onMouseLeave={() => setActiveHex(null)}
                  >
                    <div style={{
                      fontSize: getResponsiveValue('1.6rem', '1.4rem', '1.3rem'),
                      fontWeight: '800',
                      color: activeHex === index ? theme.bgPrimary : theme.textPrimary,
                      transition: 'all 0.3s ease',
                      lineHeight: 1,
                    }} className="hexagon-number">
                      {hex.number}
                    </div>
                    <div style={{
                      fontSize: getResponsiveValue('0.65rem', '0.6rem', '0.55rem'),
                      fontWeight: '600',
                      color: activeHex === index ? theme.bgPrimary : theme.textMuted,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      textAlign: 'center',
                      marginTop: '4px',
                      transition: 'all 0.3s ease',
                      lineHeight: 1.2,
                      padding: '0 4px',
                    }} className="hexagon-label">
                      {hex.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content Section */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: getResponsiveValue(40, 35, 30),
            }} className="content-section">
              
              {/* Skills Cluster */}
              <div style={{
                background: theme.bgPrimary,
                border: `1px solid ${theme.borderColor}`,
                padding: getResponsiveValue('40px', '35px', '30px 20px'),
                position: 'relative',
              }} className="skill-cluster">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: getResponsiveValue(15, 12, 10),
                  marginBottom: '30px',
                  flexDirection: isMobile ? 'column' : 'row',
                  textAlign: isMobile ? 'center' : 'left',
                }} className="cluster-header">
                  <div style={{
                    width: getResponsiveValue(50, 45, 40),
                    height: getResponsiveValue(50, 45, 40),
                    background: theme.accent,
                    color: theme.bgPrimary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: getResponsiveValue('1.2rem', '1.1rem', '1rem'),
                    fontWeight: 'bold',
                    borderRadius: '0px',
                    flexShrink: 0,
                  }}>{"</>"}</div>
                  <h3 style={{
                    fontSize: getResponsiveValue('1.5rem', '1.4rem', '1.3rem'),
                    fontWeight: '800',
                    color: theme.textPrimary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    margin: 0,
                  }}>Skills & Expertise</h3>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: getResponsiveValue('repeat(3, 1fr)', 'repeat(2, 1fr)', '1fr'),
                  gap: getResponsiveValue(12, 10, 8),
                }} className="skill-tags">
                  {[
                    'Website Design', 'Coding / Programming', 'Data Storage / Database', 
                    'Mobile Apps', 'Teamwork', 'Creative Ideas'
                  ].map((skill, index) => (
                    <div
                      key={index}
                      style={{
                        padding: getResponsiveValue('12px 20px', '11px 18px', '10px 16px'),
                        background: theme.bgSecondary,
                        border: `1px solid ${theme.borderColor}`,
                        fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
                        fontWeight: '500',
                        color: theme.textSecondary,
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: getResponsiveValue('48px', '44px', '40px'),
                      }}
                      className="skill-tag"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Development Philosophy */}
              <div style={{
                background: theme.bgPrimary,
                border: `1px solid ${theme.borderColor}`,
                padding: getResponsiveValue('40px', '35px', '30px 20px'),
                position: 'relative',
              }} className="skill-cluster">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: getResponsiveValue(15, 12, 10),
                  marginBottom: '30px',
                  flexDirection: isMobile ? 'column' : 'row',
                  textAlign: isMobile ? 'center' : 'left',
                }} className="cluster-header">
                  <div style={{
                    width: getResponsiveValue(50, 45, 40),
                    height: getResponsiveValue(50, 45, 40),
                    background: theme.accent,
                    color: theme.bgPrimary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: getResponsiveValue('1.2rem', '1.1rem', '1rem'),
                    fontWeight: 'bold',
                    borderRadius: '0px',
                    flexShrink: 0,
                  }}>✦</div>
                  <h3 style={{
                    fontSize: getResponsiveValue('1.5rem', '1.4rem', '1.3rem'),
                    fontWeight: '800',
                    color: theme.textPrimary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}>Development Philosophy</h3>
                </div>
                
                {/* Philosophy Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: getResponsiveValue('repeat(2, 1fr)', '1fr', '1fr'),
                  gap: getResponsiveValue(20, 15, 12),
                }} className="philosophy-grid">
                  {philosophy.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        background: theme.bgSecondary,
                        border: `1px solid ${theme.borderColor}`,
                        padding: getResponsiveValue('25px 20px', '22px 18px', '20px 15px'),
                        transition: 'all 0.3s ease',
                        cursor: 'default',
                        position: 'relative',
                      }}
                      className="philosophy-item"
                    >
                      <h4 style={{
                        fontSize: getResponsiveValue('1.1rem', '1rem', '0.9rem'),
                        fontWeight: '700',
                        color: theme.textPrimary,
                        marginBottom: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        transition: 'all 0.3s ease',
                      }} className="philosophy-title">
                        {item.title}
                      </h4>
                      
                      <p style={{
                        fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
                        color: theme.textMuted,
                        lineHeight: 1.6,
                        margin: 0,
                        transition: 'all 0.3s ease',
                      }} className="philosophy-description">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}