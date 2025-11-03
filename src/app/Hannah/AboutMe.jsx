'use client'

import { useEffect, useState, useRef } from 'react'

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
    bgPrimary: '#ffffff',
    bgSecondary: '#f8f9fa',
    bgTertiary: '#f1f3f4',
    textPrimary: '#000000',
    textSecondary: '#1a1a1a',
    textMuted: '#666666',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    accent: '#000000',
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
        
        .floating-shape {
          animation: float 15s ease-in-out infinite;
        }
        
        .skill-tag:hover {
          background: #000000;
          color: #ffffff;
          transform: translateY(-2px);
        }
        
        .hexagon:hover .hexagon-number,
        .hexagon:hover .hexagon-label {
          color: #ffffff;
        }
        
        .profile-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .profile-card:hover {
          transform: rotate(-2deg) translateY(-5px);
          box-shadow: 25px 25px 0px 0px rgba(0,0,0,1);
        }
        
        .timeline-item {
          transition: all 0.3s ease;
        }
        
        .timeline-item:hover {
          background: #f8f9fa;
          transform: translateX(5px);
        }

        /* Responsive styles */
        @media (max-width: 1024px) {
          .main-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          .profile-section {
            order: 1;
          }
          
          .content-section {
            order: 2;
          }
          
          .title {
            font-size: 3.5rem !important;
          }
          
          .title-background {
            font-size: 6rem !important;
          }
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 40px 20px !important;
          }
          
          .title {
            font-size: 2.5rem !important;
          }
          
          .title-background {
            font-size: 4rem !important;
          }
          
          .subtitle {
            font-size: 1.1rem !important;
            padding: 0 20px;
          }
          
          .hexagon-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
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
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 30px 15px !important;
          }
          
          .title {
            font-size: 2rem !important;
          }
          
          .title-background {
            font-size: 3rem !important;
          }
          
          .profile-card {
            padding: 30px 20px !important;
          }
          
          .hexagon-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          
          .hexagon {
            height: 90px !important;
          }
          
          .hexagon-number {
            font-size: 1.4rem !important;
          }
          
          .skill-cluster {
            padding: 30px 20px !important;
          }
          
          .cluster-header {
            flex-direction: column;
            gap: 10px !important;
            text-align: center;
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

  return (
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
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: getResponsiveValue('8rem', '6rem', '4rem'),
              fontWeight: '900',
              color: theme.bgTertiary,
              zIndex: 1,
              opacity: 0.7,
              letterSpacing: '-0.03em',
            }} className="title-background">ABOUT</div>
            <h1 style={{
              fontSize: getResponsiveValue('5rem', '3.5rem', '2.5rem'),
              fontWeight: '900',
              color: theme.textPrimary,
              margin: 0,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              position: 'relative',
              zIndex: 2,
            }} className="title">
              ABOUT <span style={{color: theme.accent}}>ME</span>
            </h1>
          </div>
          <p style={{
            fontSize: getResponsiveValue('1.3rem', '1.2rem', '1.1rem'),
            color: theme.textMuted,
            fontWeight: '400',
            marginTop: getResponsiveValue(20, 18, 16),
            maxWidth: '500px',
            margin: `${getResponsiveValue(20, 18, 16)}px auto 0`,
            lineHeight: 1.6,
          }} className="subtitle">
            Building digital experiences that blend creativity with technical excellence
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
              background: theme.bgPrimary,
              border: `2px solid ${theme.accent}`,
              borderRadius: '0px',
              padding: getResponsiveValue('40px 30px', '35px 25px', '30px 20px'),
              position: 'relative',
              boxShadow: '20px 20px 0px 0px rgba(0,0,0,1)',
              transform: 'rotate(-2deg)',
            }} className="profile-card">
              <h3 style={{
                fontSize: getResponsiveValue('1.8rem', '1.6rem', '1.4rem'),
                fontWeight: '800',
                color: theme.textPrimary,
                marginBottom: '15px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>Web Developer</h3>
              <p style={{
                fontSize: getResponsiveValue('1rem', '0.95rem', '0.9rem'),
                lineHeight: '1.7',
                color: theme.textSecondary,
                marginBottom: '25px',
              }}>
                Passionate about building user-centered web applications that don’t just look good but also solve real problems and make tasks easier.
              </p>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                marginTop: '30px',
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

            <div style={{
              display: 'grid',
              gridTemplateColumns: getResponsiveValue('repeat(3, 1fr)', 'repeat(3, 1fr)', 'repeat(2, 1fr)'),
              gap: getResponsiveValue(15, 12, 10),
              marginTop: '40px',
            }} className="hexagon-grid">
              {[
              { number: '3+', label: 'Years' },
              { number: '5+', label: 'Projects' },
              { number: '100%', label: 'Passion' },
              { number: '∞', label: 'Ideas' },
              { number: '10+', label: 'Skills' },
              { number: '3', label: 'Certifications' }
              ].map((hex, index) => (
                <div
                  key={index}
                  style={{
                    width: '100%',
                    height: getResponsiveValue(120, 110, 100),
                    background: activeHex === index ? theme.accent : theme.bgSecondary,
                    border: `1px solid ${theme.borderColor}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                  className="hexagon"
                  onMouseEnter={() => setActiveHex(index)}
                  onMouseLeave={() => setActiveHex(null)}
                >
                  <div style={{
                    fontSize: getResponsiveValue('1.8rem', '1.6rem', '1.4rem'),
                    fontWeight: '800',
                    color: activeHex === index ? theme.bgPrimary : theme.textPrimary,
                    transition: 'all 0.3s ease',
                  }} className="hexagon-number">
                    {hex.number}
                  </div>
                  <div style={{
                    fontSize: getResponsiveValue('0.7rem', '0.65rem', '0.6rem'),
                    fontWeight: '600',
                    color: activeHex === index ? theme.bgPrimary : theme.textMuted,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    textAlign: 'center',
                    marginTop: '5px',
                    transition: 'all 0.3s ease',
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
                }}>Technical stack</h3>
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: getResponsiveValue(12, 10, 8),
              }} className="skill-tags">
                {[
                  'React & Next.js', 'Laravel Framework', 'MySQL / Cloud SQL', 
                  'Node.js & Express', 'JavaScript', 'TypeScript',
                  'React Native', 'Git & GitHub', 'RESTful APIs', 'HTML & CSS',
                  'PHP', 'Tailwind CSS', 'Firebase'
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
                    }}
                    className="skill-tag"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Timeline */}
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
                }}>★</div>
                <h3 style={{
                  fontSize: getResponsiveValue('1.5rem', '1.4rem', '1.3rem'),
                  fontWeight: '800',
                  color: theme.textPrimary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>Journey & Achievements</h3>
              </div>
              <div style={{
                position: 'relative',
                paddingLeft: isMobile ? '20px' : '30px',
              }} className="achievement-timeline">
                <div style={{
                  position: 'absolute',
                  left: isMobile ? '10px' : '15px',
                  top: '0',
                  bottom: '0',
                  width: '2px',
                  background: theme.accent,
                }}></div>
                {[
                  {
                    year: '2024',
                    title: 'iNUvation 2024 Finalist',
                    description: '4th Runner Up at NU Bulacan campus for innovative project solution'
                  },
                  {
                    year: '2025',
                    title: 'PSITE Research Conference',
                    description: 'Presented "BaryoConnect: A Smart Community App for Local Governance"'
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'relative',
                      marginBottom: '40px',
                      padding: getResponsiveValue('25px', '22px', '20px'),
                      background: theme.bgSecondary,
                      borderLeft: `3px solid ${theme.accent}`,
                    }}
                    className="timeline-item"
                  >
                    <div style={{
                      position: 'absolute',
                      left: isMobile ? '-28px' : '-38px',
                      top: '30px',
                      width: '20px',
                      height: '20px',
                      background: theme.bgPrimary,
                      border: `3px solid ${theme.accent}`,
                      borderRadius: '50%',
                    }}></div>
                    <div style={{
                      fontSize: getResponsiveValue('0.8rem', '0.75rem', '0.7rem'),
                      fontWeight: '700',
                      color: theme.accent,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '8px',
                    }}>{item.year}</div>
                    <div style={{
                      fontSize: getResponsiveValue('1.1rem', '1.05rem', '1rem'),
                      fontWeight: '700',
                      color: theme.textPrimary,
                      marginBottom: '5px',
                    }}>{item.title}</div>
                    <div style={{
                      fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
                      color: theme.textMuted,
                      lineHeight: 1.5,
                    }}>{item.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}