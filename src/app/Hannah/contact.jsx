'use client'

import { useEffect, useState } from 'react'

export default function Contact({ scrollDirection = 'down' }) {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
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

  const contactMethods = [
    {
      icon: (
        <svg width={getResponsiveValue(20, 18, 16)} height={getResponsiveValue(20, 18, 16)} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      title: 'Email',
      value: 'hannahjamillap@gmail.com',
      action: 'mailto:hannahjamillap@gmail.com'
    },
    {
      icon: (
        <svg width={getResponsiveValue(20, 18, 16)} height={getResponsiveValue(20, 18, 16)} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
        </svg>
      ),
      title: 'Phone',
      value: '+63 922 250 0165',
      action: 'tel:+639222500165'
    },
    {
      icon: (
        <svg width={getResponsiveValue(20, 18, 16)} height={getResponsiveValue(20, 18, 16)} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      title: 'LinkedIn',
      value: 'Hannah Jamilla Peralta',
      action: 'https://linkedin.com/in/hannah-jamilla-9277a5337'
    }
  ]

  const socialLinks = [
    {
      name: 'Instagram',
      icon: (
        <svg width={getResponsiveValue(18, 16, 14)} height={getResponsiveValue(18, 16, 14)} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.017 0C8.396 0 7.987.015 6.756.072 5.527.129 4.713.334 3.994.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.139C.334 4.858.129 5.672.072 6.901.015 8.132 0 8.541 0 12.017c0 3.476.015 3.885.072 5.116.057 1.229.262 2.043.558 2.762.306.789.717 1.459 1.384 2.126.667.667 1.337 1.078 2.126 1.384.719.296 1.533.501 2.762.558 1.231.057 1.64.072 5.115.072 3.476 0 3.885-.015 5.116-.072 1.229-.057 2.043-.262 2.762-.558.789-.306 1.459-.717 2.126-1.384C21.319 1.347 20.649.935 19.86.63c-.719-.296-1.533-.501-2.762-.558C15.867.015 15.458 0 12.017 0zm0 2.158c3.403 0 3.788.012 5.002.069 1.141.052 1.759.242 2.171.401.568.221.975.485 1.402.912.427.427.691.834.912 1.402.159.412.349 1.03.401 2.171.057 1.214.069 1.599.069 5.002 0 3.403-.012 3.788-.069 5.002-.052 1.141-.242 1.759-.401 2.171-.221.568-.485.975-.912 1.402-.427.427-.834.691-1.402.912-.412.159-1.03.349-2.171.401-1.214.057-1.599.069-5.002.069-3.403 0-3.788-.012-5.002-.069-1.141-.052-1.759-.242-2.171-.401-.568-.221-.975-.485-1.402-.912-.427-.427-.691-.834-.912-1.402-.159-.412-.349-1.03-.401-2.171-.057-1.214-.069-1.599-.069-5.002 0-3.403.012-3.788.069-5.002.052-1.141.242-1.759.401-2.171.221-.568.485-.975.912-1.402.427-.427.834-.691 1.402-.912.412-.159 1.03-.349 2.171-.401 1.214-.057 1.599-.069 5.002-.069z"/>
          <circle cx="18.406" cy="5.595" r="1.439"/>
        </svg>
      ),
      url: 'https://instagram.com/hjdrp_'
    },
    {
      name: 'Facebook',
      icon: (
        <svg width={getResponsiveValue(18, 16, 14)} height={getResponsiveValue(18, 16, 14)} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: 'https://facebook.com/share/15r8QNkywy/'
    }
  ]

  useEffect(() => {
    if (mounted) {
      const style = document.createElement('style');
      style.textContent = `
        .contact-method:hover {
          background: #000000 !important;
          color: #ffffff !important;
          transform: translateY(-2px);
        }
        
        .social-link:hover {
          background: #333333 !important;
          transform: scale(1.1);
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .contact-container {
            padding: 40px 20px !important;
          }
          
          .contact-title {
            font-size: 1.8rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .contact-container {
            padding: 30px 15px !important;
          }
          
          .contact-title {
            font-size: 1.6rem !important;
          }
          
          .contact-subtitle {
            font-size: 0.95rem !important;
          }
          
          .contact-methods {
            gap: 10px !important;
          }
          
          .contact-method {
            padding: 14px !important;
          }
          
          .social-links {
            gap: 10px !important;
          }
          
          .social-link {
            width: 38px !important;
            height: 38px !important;
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

  if (!mounted) return null

  return (
    <section id="contact" style={{
      minHeight: '100vh',
      padding: getResponsiveValue('80px 30px', '60px 25px', '40px 20px'),
      background: '#ffffff',
      fontFamily: "'Inter', system-ui, sans-serif",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(40px)' : 'translateY(-40px)'),
      transition: 'all 0.6s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }} className="contact-container">
      
      <div style={{
        maxWidth: getResponsiveValue('500px', '450px', '400px'),
        margin: '0 auto',
        textAlign: 'center',
        width: '100%',
      }}>
        
        {/* Header */}
        <div style={{
          marginBottom: getResponsiveValue(50, 40, 30),
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease 0.1s'
        }}>
          <h1 style={{
            fontSize: getResponsiveValue('2rem', '1.8rem', '1.6rem'),
            fontWeight: '700',
            marginBottom: getResponsiveValue(12, 10, 8),
            color: '#000000'
          }} className="contact-title">
            Contact
          </h1>
          <p style={{
            color: '#666666',
            fontSize: getResponsiveValue('1rem', '0.95rem', '0.9rem'),
            lineHeight: 1.5,
          }} className="contact-subtitle">
            Let's start a conversation
          </p>
        </div>

        {/* Contact Methods */}
        <div style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease 0.2s',
          marginBottom: getResponsiveValue(40, 35, 30)
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: getResponsiveValue(12, 10, 8),
            marginBottom: getResponsiveValue(30, 25, 20)
          }} className="contact-methods">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                target={method.action.startsWith('http') ? '_blank' : '_self'}
                rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: getResponsiveValue(12, 10, 8),
                  padding: getResponsiveValue('16px', '14px', '12px'),
                  background: '#f5f5f5',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: '#000000',
                  border: '1px solid #e0e0e0',
                  transition: 'all 0.2s ease'
                }}
                className="contact-method"
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {method.icon}
                </div>
                <div style={{ 
                  textAlign: 'left', 
                  flex: 1,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
                    fontWeight: '600',
                    marginBottom: '2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {method.title}
                  </div>
                  <div style={{
                    fontSize: getResponsiveValue('0.85rem', '0.8rem', '0.75rem'),
                    opacity: 0.8,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {method.value}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div>
            <p style={{
              marginBottom: getResponsiveValue(16, 14, 12),
              color: '#666666',
              fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem')
            }}>
              Connect on social media
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: getResponsiveValue(12, 10, 8)
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
                    width: getResponsiveValue(40, 38, 36),
                    height: getResponsiveValue(40, 38, 36),
                    background: '#000000',
                    color: '#ffffff',
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none'
                  }}
                  className="social-link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          color: '#999999',
          fontSize: getResponsiveValue('0.8rem', '0.75rem', '0.7rem'),
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease 0.4s',
          paddingTop: getResponsiveValue(30, 25, 20),
          borderTop: '1px solid #f0f0f0',
          marginTop: getResponsiveValue(30, 25, 20)
        }}>
          © {new Date().getFullYear()} Hannah Jamilla Del Rosario Peralta
        </div>
      </div>
    </section>
  )
}