'use client'

import { useEffect, useState } from 'react'

export default function Contact({ scrollDirection = 'down' }) {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [activeContact, setActiveContact] = useState(null)
  const [activeSocial, setActiveSocial] = useState(null)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  })

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setIsVisible(true), 300)
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
    bgTertiary: '#f1f3f4',
    textPrimary: '#000000',
    textSecondary: '#1a1a1a',
    textMuted: '#666666',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    accent: '#000000',
    accentSecondary: '#333333',
  }

  const contactMethods = [
    {
      icon: (
        <svg width={getResponsiveValue(24, 22, 20)} height={getResponsiveValue(24, 22, 20)} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      title: 'Email',
      value: 'hannahjamillap@gmail.com',
      action: 'mailto:hannahjamillap@gmail.com',
      description: 'Send me an email for collaborations'
    },
    {
      icon: (
        <svg width={getResponsiveValue(24, 22, 20)} height={getResponsiveValue(24, 22, 20)} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
        </svg>
      ),
      title: 'Phone',
      value: '+63 922 250 0165',
      action: 'tel:+639222500165',
      description: 'Call or send a text message'
    },
    {
      icon: (
        <svg width={getResponsiveValue(24, 22, 20)} height={getResponsiveValue(24, 22, 20)} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      title: 'LinkedIn',
      value: 'Hannah Jamilla Peralta',
      action: 'https://linkedin.com/in/hannah-jamilla-9277a5337',
      description: 'Connect professionally'
    }
  ]

  const socialLinks = [
    {
      name: 'Instagram',
      icon: (
        <svg width={getResponsiveValue(20, 18, 16)} height={getResponsiveValue(20, 18, 16)} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.017 0C8.396 0 7.987.015 6.756.072 5.527.129 4.713.334 3.994.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.139C.334 4.858.129 5.672.072 6.901.015 8.132 0 8.541 0 12.017c0 3.476.015 3.885.072 5.116.057 1.229.262 2.043.558 2.762.306.789.717 1.459 1.384 2.126.667.667 1.337 1.078 2.126 1.384.719.296 1.533.501 2.762.558 1.231.057 1.64.072 5.115.072 3.476 0 3.885-.015 5.116-.072 1.229-.057 2.043-.262 2.762-.558.789-.306 1.459-.717 2.126-1.384C21.319 1.347 20.649.935 19.86.63c-.719-.296-1.533-.501-2.762-.558C15.867.015 15.458 0 12.017 0zm0 2.158c3.403 0 3.788.012 5.002.069 1.141.052 1.759.242 2.171.401.568.221.975.485 1.402.912.427.427.691.834.912 1.402.159.412.349 1.03.401 2.171.057 1.214.069 1.599.069 5.002 0 3.403-.012 3.788-.069 5.002-.052 1.141-.242 1.759-.401 2.171-.221.568-.485.975-.912 1.402-.427.427-.834.691-1.402.912-.412.159-1.03.349-2.171.401-1.214.057-1.599.069-5.002.069-3.403 0-3.788-.012-5.002-.069-1.141-.052-1.759-.242-2.171-.401-.568-.221-.975-.485-1.402-.912-.427-.427-.691-.834-.912-1.402-.159-.412-.349-1.03-.401-2.171-.057-1.214-.069-1.599-.069-5.002 0-3.403.012-3.788.069-5.002.052-1.141.242-1.759.401-2.171.221-.568.485-.975.912-1.402.427-.427.834-.691 1.402-.912.412-.159 1.03-.349 2.171-.401 1.214-.057 1.599-.069 5.002-.069z"/>
          <circle cx="18.406" cy="5.595" r="1.439"/>
        </svg>
      ),
      url: 'https://instagram.com/hjdrp_',
      color: '#E4405F'
    },
    {
      name: 'Facebook',
      icon: (
        <svg width={getResponsiveValue(20, 18, 16)} height={getResponsiveValue(20, 18, 16)} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: 'https://facebook.com/share/15r8QNkywy/',
      color: '#1877F2'
    },
    {
      name: 'GitHub',
      icon: (
        <svg width={getResponsiveValue(20, 18, 16)} height={getResponsiveValue(20, 18, 16)} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      url: 'https://github.com/hannahjamilla',
      color: '#181717'
    }
  ]

  useEffect(() => {
    if (mounted) {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
        
        .floating-shape {
          animation: float 8s ease-in-out infinite;
        }
        
        .glowing-shape {
          animation: glow 3s ease-in-out infinite;
        }
        
        .contact-method {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .contact-method::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.03), transparent);
          transition: left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border-radius: 16px;
        }
        
        .contact-method:hover::before {
          left: 100%;
        }
        
        .contact-method:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          border-color: rgba(0, 0, 0, 0.15);
        }
        
        .social-link {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .social-link::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          transition: all 0.3s ease;
          transform: translate(-50%, -50%);
        }
        
        .social-link:hover::before {
          width: 100%;
          height: 100%;
        }
        
        .social-link:hover {
          transform: scale(1.15) rotate(5deg);
        }

        /* Enhanced responsive styles */
        @media (max-width: 1024px) {
          .contact-container {
            padding: 60px 30px !important;
          }
          
          .contact-title {
            font-size: 3rem !important;
          }
          
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            max-width: 600px;
            margin: 0 auto;
          }
        }
        
        @media (max-width: 768px) {
          .contact-container {
            padding: 50px 25px !important;
          }
          
          .contact-title {
            font-size: 2.5rem !important;
          }
          
          .contact-subtitle {
            font-size: 1.1rem !important;
          }
          
          .contact-method {
            padding: 20px !important;
          }
          
          .social-links {
            gap: 12px !important;
          }
          
          .social-link {
            width: 50px !important;
            height: 50px !important;
          }
        }
        
        @media (max-width: 480px) {
          .contact-container {
            padding: 40px 20px !important;
          }
          
          .contact-title {
            font-size: 2rem !important;
          }
          
          .contact-subtitle {
            font-size: 0.95rem !important;
          }
          
          .contact-method {
            padding: 16px !important;
            flex-direction: column !important;
            text-align: center !important;
            gap: 12px !important;
          }
          
          .method-content {
            text-align: center !important;
          }
          
          .social-links {
            gap: 10px !important;
          }
          
          .social-link {
            width: 48px !important;
            height: 48px !important;
          }
          
          .footer-text {
            font-size: 0.75rem !important;
          }
        }

        @media (max-width: 380px) {
          .contact-container {
            padding: 30px 15px !important;
          }
          
          .contact-title {
            font-size: 1.8rem !important;
          }
          
          .contact-method {
            padding: 14px !important;
          }
          
          .social-link {
            width: 44px !important;
            height: 44px !important;
          }
        }
        
        /* Landscape optimization */
        @media (max-height: 600px) and (orientation: landscape) {
          .contact-container {
            padding: 30px 25px !important;
          }
          
          .contact-grid {
            gap: 25px !important;
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <section id="contact" style={{
      minHeight: '100vh',
      padding: getResponsiveValue('80px 40px', '60px 30px', '40px 20px'),
      background: theme.bgPrimary,
      fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      position: 'relative',
      overflow: 'hidden',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(50px)' : 'translateY(-50px)'),
      transition: 'all 0.8s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }} className="contact-container">
      
      {/* Enhanced Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 15% 85%, ${theme.bgSecondary} 0%, transparent 50%),
          radial-gradient(circle at 85% 15%, ${theme.bgTertiary} 0%, transparent 50%),
          linear-gradient(45deg, transparent 49%, ${theme.borderColor} 49%, ${theme.borderColor} 51%, transparent 51%),
          linear-gradient(-45deg, transparent 49%, ${theme.borderColor} 49%, ${theme.borderColor} 51%, transparent 51%)
        `,
        backgroundSize: getResponsiveValue('80px 80px', '60px 60px', '40px 40px'),
        opacity: 0.03,
      }}></div>
      
      {/* Floating Background Shapes */}
      <div style={{
        position: 'absolute',
        width: getResponsiveValue(120, 100, 80),
        height: getResponsiveValue(120, 100, 80),
        background: `linear-gradient(45deg, ${theme.accent}, ${theme.accentSecondary})`,
        opacity: 0.05,
        top: '15%',
        left: '10%',
        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
      }} className="floating-shape glowing-shape"></div>
      
      <div style={{
        position: 'absolute',
        width: getResponsiveValue(80, 70, 60),
        height: getResponsiveValue(80, 70, 60),
        border: `2px solid ${theme.accent}`,
        opacity: 0.06,
        top: '25%',
        right: '12%',
        borderRadius: '50%',
        transform: 'rotate(45deg)'
      }} className="floating-shape"></div>
      
      <div style={{
        position: 'absolute',
        width: getResponsiveValue(100, 90, 80),
        height: getResponsiveValue(100, 90, 80),
        background: `linear-gradient(135deg, ${theme.bgTertiary}, ${theme.borderColor})`,
        opacity: 0.04,
        bottom: '20%',
        left: '12%',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
      }} className="floating-shape glowing-shape"></div>

      <div style={{
        position: 'absolute',
        width: getResponsiveValue(60, 50, 40),
        height: getResponsiveValue(60, 50, 40),
        border: `1.5px solid ${theme.accent}`,
        opacity: 0.05,
        bottom: '30%',
        right: '15%',
        borderRadius: '12px',
        transform: 'rotate(15deg)'
      }} className="floating-shape"></div>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
        width: '100%',
      }}>
        
        {/* Enhanced Header Section */}
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
              width: getResponsiveValue('180%', '160%', '140%'),
              height: getResponsiveValue('140%', '120%', '100%'),
              background: `linear-gradient(45deg, ${theme.bgSecondary}, ${theme.bgTertiary})`,
              opacity: 0.3,
              zIndex: 1,
              borderRadius: '50%',
              filter: 'blur(25px)',
            }}></div>
            <h1 style={{
              fontSize: getResponsiveValue('4.5rem', '3.5rem', '2.8rem'),
              fontWeight: '900',
              color: theme.textPrimary,
              margin: 0,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              position: 'relative',
              zIndex: 2,
              textTransform: 'uppercase',
            }} className="contact-title">
              <span style={{
                background: 'linear-gradient(135deg, #000000 0%, #333333 50%, #000000 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                GET IN
              </span>{' '}
              <span style={{
                color: theme.accent, 
                position: 'relative',
                display: 'inline-block',
              }}>
                TOUCH
                <span style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: 0,
                  width: '100%',
                  height: '6px',
                  background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
                  borderRadius: '3px',
                }}></span>
                <span style={{
                  position: 'absolute',
                  bottom: '-12px',
                  left: '10%',
                  width: '80%',
                  height: '3px',
                  background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
                  borderRadius: '2px',
                  opacity: 0.6,
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
          }} className="contact-subtitle">
            <span style={{
              background: 'linear-gradient(135deg, #666666 0%, #888888 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Let's collaborate and bring
            </span>{' '}
            <span style={{ 
              color: theme.textSecondary, 
              fontWeight: '600',
            }}>
              your ideas to life
            </span>
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: getResponsiveValue('1fr 1fr', '1fr', '1fr'),
          gap: getResponsiveValue(60, 40, 30),
          alignItems: 'start',
          maxWidth: '1000px',
          margin: '0 auto',
        }} className="contact-grid">
          
          {/* Contact Methods Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: getResponsiveValue(20, 18, 16),
          }}>
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                target={method.action.startsWith('http') ? '_blank' : '_self'}
                rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: getResponsiveValue(20, 18, 16),
                  padding: getResponsiveValue('30px', '25px', '22px'),
                  background: `linear-gradient(135deg, ${theme.bgPrimary} 0%, ${theme.bgSecondary} 100%)`,
                  borderRadius: '16px',
                  textDecoration: 'none',
                  color: theme.textPrimary,
                  border: `2px solid ${theme.borderColor}`,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className="contact-method"
                onMouseEnter={() => setActiveContact(index)}
                onMouseLeave={() => setActiveContact(null)}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: getResponsiveValue(60, 55, 50),
                  height: getResponsiveValue(60, 55, 50),
                  background: theme.bgSecondary,
                  borderRadius: '10px',
                  flexShrink: 0,
                  border: `1px solid ${theme.borderColor}`,
                  transition: 'all 0.3s ease',
                  transform: activeContact === index ? 'scale(1.1)' : 'scale(1)',
                }}>
                  {method.icon}
                </div>
                <div style={{ 
                  flex: 1,
                  overflow: 'hidden'
                }} className="method-content">
                  <div style={{
                    fontSize: getResponsiveValue('1.1rem', '1rem', '0.9rem'),
                    fontWeight: '700',
                    marginBottom: '4px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: theme.textPrimary,
                  }}>
                    {method.title}
                  </div>
                  <div style={{
                    fontSize: getResponsiveValue('0.95rem', '0.9rem', '0.85rem'),
                    color: theme.accent,
                    fontWeight: '600',
                    marginBottom: '6px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {method.value}
                  </div>
                  <div style={{
                    fontSize: getResponsiveValue('0.85rem', '0.8rem', '0.75rem'),
                    color: theme.textMuted,
                    lineHeight: 1.4,
                    opacity: 0.8,
                  }}>
                    {method.description}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Social & Info Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: getResponsiveValue(40, 35, 30),
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
            transition: 'all 0.6s ease 0.3s'
          }}>
            
            {/* Social Links */}
            <div style={{
              background: theme.bgPrimary,
              border: `2px solid ${theme.borderColor}`,
              borderRadius: '16px',
              padding: getResponsiveValue('30px', '25px', '20px'),
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            }}>
              <h3 style={{
                fontSize: getResponsiveValue('1.3rem', '1.2rem', '1.1rem'),
                fontWeight: '700',
                color: theme.textPrimary,
                marginBottom: getResponsiveValue(20, 18, 16),
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Follow Me
              </h3>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: getResponsiveValue(16, 14, 12),
                flexWrap: 'wrap',
              }} className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: getResponsiveValue(60, 55, 50),
                      height: getResponsiveValue(60, 55, 50),
                      background: social.color || theme.accent,
                      color: theme.bgPrimary,
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    }}
                    className="social-link"
                    onMouseEnter={() => setActiveSocial(index)}
                    onMouseLeave={() => setActiveSocial(null)}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div style={{
              background: theme.bgPrimary,
              border: `2px solid ${theme.borderColor}`,
              borderRadius: '16px',
              padding: getResponsiveValue('30px', '25px', '20px'),
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              textAlign: 'center',
            }}>
              {/* Profile Image */}
              <div style={{
                width: getResponsiveValue(80, 70, 60),
                height: getResponsiveValue(80, 70, 60),
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto 15px',
                border: `2px solid ${theme.borderColor}`,
                background: theme.bgSecondary,
              }}>
                <img 
                  src="/images/hannah-two.jpg" 
                  alt="Hannah Peralta" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <h4 style={{
                fontSize: getResponsiveValue('1.1rem', '1rem', '0.9rem'),
                fontWeight: '700',
                color: theme.textPrimary,
                marginBottom: '8px',
              }}>
                Open for Opportunities
              </h4>
              <p style={{
                fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
                color: theme.textMuted,
                margin: 0,
              }}>
                Ready to collaborate on exciting projects
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: getResponsiveValue(60, 50, 40),
          paddingTop: getResponsiveValue(40, 35, 30),
          borderTop: `1px solid ${theme.borderColor}`,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease 0.6s',
        }}>
          <p style={{
            color: theme.textMuted,
            fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
            margin: 0,
            fontWeight: '500',
          }} className="footer-text">
            © {new Date().getFullYear()} Hannah Jamilla Del Rosario Peralta • Crafted with passion
          </p>
        </div>
      </div>
    </section>
  )
}