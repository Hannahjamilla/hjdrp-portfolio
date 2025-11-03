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
      ]
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
      ]
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
        
        @keyframes shapeRotate {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes shapeFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(45deg) scale(1);
            opacity: 0.02;
          }
          50% { 
            transform: translateY(-20px) rotate(90deg) scale(1.05);
            opacity: 0.04;
          }
        }
        
        .experience-card {
          animation: slideInUp 0.6s ease-out;
        }
        
        .stat-item:hover {
          transform: translateY(-8px);
        }
        
        .stat-item:hover .stat-number {
          color: #000000;
          transform: scale(1.1);
        }
        
        .stat-item:hover .stat-label {
          color: #000000;
          font-weight: 700;
        }
        
        .experience-card:hover .card-duration {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .experience-card:hover .card-organization {
          color: #000000;
        }
        
        .experience-card:hover .card-role {
          color: #000000;
        }
        
        .experience-card:hover .card-location {
          opacity: 1;
        }
        
        .experience-card:hover .card-corner {
          opacity: 1;
          border-top-color: #000000;
          border-right-color: #000000;
        }
        
        .responsibility-item:hover .responsibility-icon {
          transform: rotate(15deg) scale(1.1);
          background: #000000;
        }
        
        .responsibility-item:hover .responsibility-icon-dot {
          transform: scale(1.3);
        }
        
        .responsibility-item:hover .responsibility-text {
          color: #000000;
          font-weight: 600;
        }
        
        .badge:hover {
          background: #000000;
          color: #ffffff;
          transform: translateY(-2px);
        }

        /* Responsive styles */
        @media (max-width: 1024px) {
          .card-grid {
            grid-template-columns: 1fr !important;
          }
          
          .experience-card {
            max-width: 100% !important;
          }
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 60px 20px !important;
          }
          
          .title {
            font-size: 2.5rem !important;
          }
          
          .card-header {
            padding: 30px 25px !important;
          }
          
          .card-body {
            padding: 30px 25px !important;
          }
          
          .stats-section {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
            padding: 30px 25px !important;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 40px 15px !important;
          }
          
          .title {
            font-size: 2rem !important;
          }
          
          .subtitle {
            font-size: 1rem !important;
            padding: 0 10px;
          }
          
          .card-header {
            padding: 25px 20px !important;
          }
          
          .card-body {
            padding: 25px 20px !important;
          }
          
          .responsibility-item {
            padding: 15px !important;
            flex-direction: column;
            gap: 10px;
          }
          
          .stats-section {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          
          .stat-number {
            font-size: 2.5rem !important;
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

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bgPrimary,
      padding: getResponsiveValue('100px 40px', '80px 30px', '60px 20px'),
      fontFamily: "'Poppins', sans-serif",
      position: 'relative',
      overflow: 'hidden',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    }} id="work">
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(90deg, ${theme.borderColor} 1px, transparent 1px),
            linear-gradient(${theme.borderColor} 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.1,
          transform: 'rotate(45deg)',
          transformOrigin: 'center',
        }}></div>
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: getResponsiveValue(400, 300, 200),
          height: getResponsiveValue(400, 300, 200),
          border: `1px solid ${theme.borderColor}`,
          borderRadius: '50%',
          opacity: 0.03,
          animation: 'shapeRotate 20s linear infinite',
          display: isMobile ? 'none' : 'block',
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          width: getResponsiveValue(150, 120, 80),
          height: getResponsiveValue(150, 120, 80),
          border: `1px solid ${theme.borderColor}`,
          opacity: 0.02,
          transform: 'rotate(45deg)',
          animation: 'shapeFloat 15s ease-in-out infinite',
          display: isMobile ? 'none' : 'block',
        }}></div>
      </div>
      
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: getResponsiveValue(80, 60, 40),
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease 0.2s',
        }}>
          <div style={{
            display: 'inline-block',
            padding: getResponsiveValue('12px 28px', '11px 24px', '10px 20px'),
            border: `2px solid ${theme.accentColor}`,
            borderRadius: '30px',
            fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
            fontWeight: '700',
            color: theme.accentColor,
            background: 'transparent',
            marginBottom: getResponsiveValue(32, 28, 24),
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease',
          }} className="badge">Professional Experience</div>
          <h1 style={{
            fontSize: getResponsiveValue('4.5rem', '3.5rem', '2.5rem'),
            fontWeight: '900',
            marginBottom: getResponsiveValue(24, 20, 16),
            color: theme.textPrimary,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }} className="title">Work & Contributions</h1>
          <p style={{
            fontSize: getResponsiveValue('1.3rem', '1.2rem', '1.1rem'),
            color: theme.textMuted,
            fontWeight: '500',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
          }} className="subtitle">
            My journey through organizational roles and professional development experiences
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: getResponsiveValue('repeat(auto-fit, minmax(500px, 1fr))', '1fr', '1fr'),
          gap: getResponsiveValue(40, 30, 20),
          marginTop: getResponsiveValue(60, 50, 40),
        }} className="card-grid">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              style={{
                background: theme.bgPrimary,
                border: `1px solid ${theme.borderColor}`,
                borderRadius: '20px',
                padding: '0',
                overflow: 'hidden',
                transition: 'all 0.5s ease',
                position: 'relative',
                boxShadow: `0 8px 32px ${theme.shadowLight}`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transform: hoveredCard === index ? 'translateY(-15px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: hoveredCard === index ? `0 35px 80px ${theme.shadowMedium}` : `0 8px 32px ${theme.shadowLight}`,
                borderColor: hoveredCard === index ? theme.borderAccent : theme.borderColor,
                maxWidth: '100%',
                transitionDelay: `${0.4 + index * 0.2}s`
              }}
              className="experience-card"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: theme.accentColor,
              }}></div>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '60px',
                height: '60px',
                borderTop: `2px solid ${theme.borderColor}`,
                borderRight: `2px solid ${theme.borderColor}`,
                borderTopRightRadius: '20px',
                opacity: 0.5,
                transition: 'all 0.3s ease',
              }} className="card-corner"></div>
              
              {/* Card Header */}
              <div style={{
                background: theme.bgSecondary,
                padding: getResponsiveValue('40px', '35px', '30px'),
                borderBottom: `1px solid ${theme.borderColor}`,
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: getResponsiveValue('20px', '18px', '16px'),
                  right: getResponsiveValue('20px', '18px', '16px'),
                  background: theme.accentColor,
                  color: '#ffffff',
                  padding: getResponsiveValue('8px 16px', '7px 14px', '6px 12px'),
                  borderRadius: '20px',
                  fontSize: getResponsiveValue('0.85rem', '0.8rem', '0.75rem'),
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  transition: 'all 0.3s ease',
                }} className="card-duration">{experience.duration}</div>
                <h3 style={{
                  fontSize: getResponsiveValue('1.6rem', '1.5rem', '1.4rem'),
                  fontWeight: '800',
                  color: hoveredCard === index ? theme.textPrimary : theme.textPrimary,
                  marginBottom: '8px',
                  lineHeight: 1.3,
                  transition: 'all 0.3s ease',
                  paddingRight: '100px',
                }} className="card-organization">{experience.organization}</h3>
                <div style={{
                  fontSize: getResponsiveValue('1.2rem', '1.1rem', '1rem'),
                  fontWeight: '600',
                  color: hoveredCard === index ? theme.textPrimary : theme.accentLight,
                  marginBottom: '12px',
                  transition: 'all 0.3s ease',
                }} className="card-role">{experience.role}</div>
                <div style={{
                  fontSize: getResponsiveValue('1rem', '0.95rem', '0.9rem'),
                  fontWeight: '500',
                  color: theme.textMuted,
                  opacity: hoveredCard === index ? 1 : 0.8,
                  transition: 'all 0.3s ease',
                }} className="card-location">{experience.location}</div>
              </div>

              {/* Card Body */}
              <div style={{
                padding: getResponsiveValue('40px', '35px', '30px'),
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: getResponsiveValue(20, 18, 16),
                }}>
                  {experience.responsibilities.map((responsibility, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: getResponsiveValue(16, 14, 12),
                        padding: getResponsiveValue('20px', '18px', '16px'),
                        background: theme.bgSecondary,
                        borderRadius: '12px',
                        border: `1px solid ${theme.borderColor}`,
                        transition: 'all 0.4s ease',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        transform: hoveredResponsibility === `${experience.id}-${idx}` ? 'translateX(12px) scale(1.02)' : 'translateX(0) scale(1)',
                        background: hoveredResponsibility === `${experience.id}-${idx}` ? theme.bgPrimary : theme.bgSecondary,
                        borderColor: hoveredResponsibility === `${experience.id}-${idx}` ? theme.borderAccent : theme.borderColor,
                        boxShadow: hoveredResponsibility === `${experience.id}-${idx}` ? `0 8px 30px ${theme.shadowLight}` : 'none',
                        flexDirection: isMobile ? 'column' : 'row',
                      }}
                      className="responsibility-item"
                      onMouseEnter={() => setHoveredResponsibility(`${experience.id}-${idx}`)}
                      onMouseLeave={() => setHoveredResponsibility(null)}
                    >
                      <div style={{
                        width: getResponsiveValue(24, 22, 20),
                        height: getResponsiveValue(24, 22, 20),
                        background: hoveredResponsibility === `${experience.id}-${idx}` ? theme.accentColor : theme.accentColor,
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        transform: hoveredResponsibility === `${experience.id}-${idx}` ? 'rotate(15deg) scale(1.1)' : 'rotate(0) scale(1)',
                      }} className="responsibility-icon">
                        <div style={{
                          width: '6px',
                          height: '6px',
                          background: '#ffffff',
                          borderRadius: '50%',
                          transition: 'all 0.3s ease',
                          transform: hoveredResponsibility === `${experience.id}-${idx}` ? 'scale(1.3)' : 'scale(1)',
                        }} className="responsibility-icon-dot"></div>
                      </div>
                      <p style={{
                        fontSize: getResponsiveValue('1.05rem', '1rem', '0.95rem'),
                        color: hoveredResponsibility === `${experience.id}-${idx}` ? theme.textPrimary : theme.textSecondary,
                        lineHeight: 1.6,
                        fontWeight: hoveredResponsibility === `${experience.id}-${idx}` ? '600' : '500',
                        margin: 0,
                        transition: 'all 0.3s ease',
                      }} className="responsibility-text">{responsibility}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: getResponsiveValue('repeat(auto-fit, minmax(200px, 1fr))', 'repeat(2, 1fr)', '1fr'),
          gap: getResponsiveValue(30, 25, 20),
          marginTop: getResponsiveValue(80, 60, 40),
          padding: getResponsiveValue('40px', '35px', '30px'),
          background: theme.bgSecondary,
          borderRadius: '20px',
          border: `1px solid ${theme.borderColor}`,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease 1s',
        }} className="stats-section">
          {[
            { number: '2', label: 'Organizations' },
            { number: '4+', label: 'Roles Held' },
            { number: '100%', label: 'Commitment' },
            { number: '∞', label: 'Learning Potential' }
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                textAlign: 'center',
                padding: getResponsiveValue('20px', '18px', '16px'),
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                transform: hoveredStat === index ? 'translateY(-8px)' : 'translateY(0)',
              }}
              className="stat-item"
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div style={{
                fontSize: getResponsiveValue('3rem', '2.5rem', '2rem'),
                fontWeight: '800',
                color: hoveredStat === index ? theme.textPrimary : theme.accentColor,
                marginBottom: '8px',
                lineHeight: 1,
                transition: 'all 0.3s ease',
                transform: hoveredStat === index ? 'scale(1.1)' : 'scale(1)',
              }} className="stat-number">{stat.number}</div>
              <div style={{
                fontSize: getResponsiveValue('1rem', '0.95rem', '0.9rem'),
                fontWeight: hoveredStat === index ? '700' : '600',
                color: hoveredStat === index ? theme.textPrimary : theme.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.3s ease',
              }} className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}