'use client'

import { useEffect, useState, useCallback } from 'react'

export default function Introduction({ scrollDirection = 'down' }) {
  const [mounted, setMounted] = useState(false)
  const [currentGreeting, setCurrentGreeting] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showStickyNav, setShowStickyNav] = useState(false)
  const [elementVisible, setElementVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  })

  const greetings = [
    "Creative Developer & Designer",
    "Building Digital Experiences", 
    "Innovation Meets Functionality",
    "Code with Purpose",
    "Design with Intent",
    "Digital Solution Creator"
  ]

  const socialLinks = {
    facebook: "https://www.facebook.com/share/15r8QNkywy/",
    instagram: "https://www.instagram.com/hjdrp_?igsh=MTNxOGV6aWxjYzd2Zw==",
    linkedin: "https://www.linkedin.com/in/hannah-jamilla-9277a5337",
    github: "https://github.com/Hannahjamilla"
  }

  // Handle window resize
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

  // Get responsive values
  const getResponsiveValue = (desktop, tablet, mobile) => {
    if (windowSize.width < 768) return mobile
    if (windowSize.width < 1024) return tablet
    return desktop
  }

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setIsVisible(true)
      setElementVisible(true)
    }, 300)

    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
      setShowStickyNav(scrollTop > 400)

      const sections = ['home', 'about', 'work', 'projects', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) {
        setActiveSection(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setIsTyping(true)
    setDisplayText('')
    
    let currentIndex = 0
    const currentGreetingText = greetings[currentGreeting]
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= currentGreetingText.length) {
        setDisplayText(currentGreetingText.slice(0, currentIndex))
        currentIndex++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)
        
        setTimeout(() => {
          setCurrentGreeting((prev) => (prev + 1) % greetings.length)
        }, 3000)
      }
    }, 40)

    return () => clearInterval(typingInterval)
  }, [currentGreeting])

  const theme = {
    bgPrimary: '#ffffff',
    bgSecondary: '#f8f9fa',
    textPrimary: '#000000',
    textSecondary: '#2d3748',
    textMuted: '#718096',
    accentPrimary: '#000000',
    accentSecondary: '#4a5568',
    borderColor: 'rgba(0, 0, 0, 0.08)',
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowHover: 'rgba(0, 0, 0, 0.12)',
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMobileMenuOpen(false)
    }
  }

  // Fixed CV download function with correct path
  const handleDownloadCV = () => {
    // Create a link element
    const link = document.createElement('a')
    
    // Use the correct path to your PDF file
    link.href = '/cv/Hannah_Peralta-resume.pdf'
    
    // Set the download attribute with the desired filename
    link.download = 'Hannah_Peralta-Resume.pdf'
    
    // Set target to _blank to open in new tab as fallback
    link.target = '_blank'
    
    // Append to the document
    document.body.appendChild(link)
    
    // Trigger the download
    link.click()
    
    // Clean up
    document.body.removeChild(link)
  }

  // Alternative download function that works better in some browsers
  const handleDownloadCVAlternative = () => {
    try {
      // Method 1: Direct download
      const link = document.createElement('a')
      link.href = '/cv/Hannah_Peralta-resume.pdf'
      link.download = 'Hannah_Peralta-Resume.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      // Method 2: Fallback - open in new tab
      console.log('Download failed, opening in new tab:', error)
      window.open('/cv/Hannah_Peralta-resume.pdf', '_blank')
    }
  }

  const generateParticles = useCallback(() => {
    const particles = [];
    for (let i = 0; i < 15; i++) {
      particles.push({
        id: i,
        size: Math.random() * 6 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: Math.random() * 20,
        opacity: Math.random() * 0.1 + 0.02,
      });
    }
    return particles;
  }, []);

  const particles = generateParticles();

  useEffect(() => {
    if (mounted) {
      const style = document.createElement('style');
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(120deg); }
          66% { transform: translateY(15px) rotate(240deg); }
        }
        
        .nav-link:hover {
          color: #000000;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #000000;
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .primary-btn:hover {
          background: transparent;
          color: #000000;
          border: 2px solid #000000;
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .secondary-btn:hover {
          border-color: #000000;
          background: rgba(0, 0, 0, 0.02);
          transform: translateY(-3px);
        }
        
        .avatar-container:hover {
          transform: translateY(-15px) rotate(2deg);
          border-color: #000000;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }
        
        .avatar-container:hover .avatar-image {
          transform: scale(1.15) translateY(-5%);
        }
        
        .social-link:hover {
          border-color: #000000;
          background-color: #000000;
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .social-link:hover svg {
          color: #ffffff;
        }
        
        .logo-image:hover {
          transform: scale(1.1) rotate(2deg);
        }
        
        .floating-circle {
          animation: float 8s ease-in-out infinite;
        }
        
        .floating-rect {
          animation: float 6s ease-in-out infinite 1s;
        }
        
        .particle {
          position: absolute;
          background: rgba(0, 0, 0, 0.03);
          animation: particleFloat 20s infinite linear;
        }
        
        /* Mobile Menu Animation */
        .mobile-nav-links {
          transition: all 0.3s ease-in-out;
        }
        
        /* Sticky Nav Animation */
        .sticky-nav.visible {
          top: 0 !important;
        }
        
        .sticky-nav.hidden {
          top: -100px !important;
        }
        
        /* Responsive Design */
        @media (max-width: 1024px) {
          .layout-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
          
          .sidebar {
            order: 2;
          }
          
          .main-content {
            order: 1;
          }
        }
        
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          
          .mobile-nav {
            display: flex !important;
          }
          
          .title {
            font-size: clamp(2rem, 8vw, 3rem) !important;
          }
          
          .greeting {
            font-size: clamp(1rem, 4vw, 1.3rem) !important;
          }
          
          .avatar-container {
            width: 280px !important;
            height: 280px !important;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 20px 15px !important;
          }
          
          .buttons {
            flex-direction: column;
            gap: 15px;
          }
          
          .primary-btn, .secondary-btn {
            width: 100%;
            text-align: center;
          }
          
          .avatar-container {
            width: 250px !important;
            height: 250px !important;
          }
          
          .social-links {
            gap: 12px;
          }
          
          .social-link {
            width: 44px !important;
            height: 44px !important;
          }
        }
        
        @media (max-width: 360px) {
          .avatar-container {
            width: 220px !important;
            height: 220px !important;
          }
          
          .title {
            font-size: clamp(1.8rem, 7vw, 2.5rem) !important;
          }
        }
        
        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
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

  const isMobile = windowSize.width < 768
  const isTablet = windowSize.width < 1024

  return (
    <div style={{
      minHeight: '100vh',
      minHeight: '100dvh',
      background: theme.bgPrimary,
      padding: getResponsiveValue('40px 60px', '30px 40px', '20px 20px'),
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Poppins', sans-serif",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(50px)' : 'translateY(-50px)'),
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    }} id="home">
      
      {/* Sticky Navigation */}
      <nav className={`sticky-nav ${showStickyNav ? 'visible' : 'hidden'}`} style={{
        position: 'fixed',
        top: '-100px',
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.4s ease',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        padding: '15px 0',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          padding: getResponsiveValue('0 60px', '0 40px', '0 20px'),
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/images/HanMade.png" 
              alt="HanMade Logo" 
              style={{
                height: getResponsiveValue(50, 45, 40),
                width: 'auto',
                objectFit: 'contain',
              }}
              className="logo-image"
            />
          </div>
          <div style={{
            display: isMobile ? 'none' : 'flex',
            gap: getResponsiveValue(35, 25, 20),
            flexWrap: 'wrap',
          }}>
            {['home', 'about', 'work', 'projects', 'contact'].map((section) => (
              <a 
                key={section}
                href={`#${section}`} 
                style={{
                  color: activeSection === section ? theme.textPrimary : theme.textSecondary,
                  textDecoration: 'none',
                  fontSize: getResponsiveValue('0.95rem', '0.9rem', '0.85rem'),
                  fontWeight: activeSection === section ? '600' : '500',
                  padding: '8px 0',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                }} 
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(section)
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav style={{
        display: isMobile ? 'flex' : 'none',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 0',
        marginBottom: '40px',
        width: '100%',
        position: 'relative',
        zIndex: 10,
      }} className="mobile-nav">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/images/HanMade.png" 
            alt="HanMade Logo" 
            style={{
              height: 40,
              width: 'auto',
              objectFit: 'contain',
            }}
            className="logo-image"
          />
        </div>
        <button 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
          }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div style={{
            width: '25px',
            height: '2px',
            backgroundColor: theme.textPrimary,
            transition: 'all 0.3s ease',
            transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }}></div>
          <div style={{
            width: '25px',
            height: '2px',
            backgroundColor: theme.textPrimary,
            transition: 'all 0.3s ease',
            opacity: isMobileMenuOpen ? 0 : 1,
          }}></div>
          <div style={{
            width: '25px',
            height: '2px',
            backgroundColor: theme.textPrimary,
            transition: 'all 0.3s ease',
            transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none',
          }}></div>
        </button>
        {isMobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.borderColor}`,
            borderRadius: '12px',
            padding: '20px',
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          }} className="mobile-nav-links">
            {['home', 'about', 'work', 'projects', 'contact'].map((section) => (
              <a 
                key={section}
                href={`#${section}`} 
                style={{
                  color: activeSection === section ? theme.textPrimary : theme.textSecondary,
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: activeSection === section ? '600' : '500',
                  padding: '12px 0',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  borderBottom: `1px solid ${theme.borderColor}`,
                }} 
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(section)
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Enhanced Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(${theme.borderColor} 1px, transparent 1px)`,
          backgroundSize: `${getResponsiveValue(40, 30, 25)}px ${getResponsiveValue(40, 30, 25)}px`,
          opacity: 0.3,
        }}></div>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: getResponsiveValue('15%', '10%', '5%'),
          width: getResponsiveValue(200, 150, 100),
          height: getResponsiveValue(200, 150, 100),
          border: `1px solid ${theme.borderColor}`,
          borderRadius: '50%',
          opacity: isMobile ? 0.2 : 0.4,
          background: theme.bgSecondary,
        }} className="floating-circle"></div>
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: getResponsiveValue('12%', '8%', '5%'),
          width: getResponsiveValue(120, 90, 60),
          height: getResponsiveValue(120, 90, 60),
          border: `1px solid ${theme.borderColor}`,
          opacity: isMobile ? 0.2 : 0.3,
          transform: 'rotate(25deg)',
          background: theme.bgSecondary,
        }} className="floating-rect"></div>
        
        {/* Particles */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          display: isMobile ? 'none' : 'block',
        }}>
          {particles.map(particle => (
            <div
              key={particle.id}
              className="particle"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.animationDelay}s`,
                opacity: particle.opacity,
                borderRadius: '50%',
                background: theme.borderColor,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Navigation */}
      <nav style={{
        display: isMobile ? 'none' : 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: getResponsiveValue(60, 50, 40),
        maxWidth: '1400px',
        margin: `0 auto ${getResponsiveValue(60, 50, 40)}px auto`,
        width: '100%',
        position: 'relative',
        zIndex: 10,
        transition: 'all 0.3s ease',
        padding: isScrolled ? `${getResponsiveValue(15, 12, 10)}px ${getResponsiveValue(30, 25, 20)}px` : '20px 0',
        background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderRadius: isScrolled ? '15px' : '0',
        boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : 'none',
        opacity: elementVisible ? 1 : 0,
        transform: elementVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(-20px)' : 'translateY(20px)'),
        transition: 'all 0.8s ease 0.1s',
      }} className="desktop-nav">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/images/HanMade.png" 
            alt="HanMade Logo" 
            style={{
              height: getResponsiveValue(60, 50, 40),
              width: 'auto',
              objectFit: 'contain',
            }}
            className="logo-image"
          />
        </div>
        <div style={{
          display: 'flex',
          gap: getResponsiveValue(35, 25, 20),
          flexWrap: 'wrap',
        }}>
          {['home', 'about', 'work', 'projects', 'contact'].map((section) => (
            <a 
              key={section}
              href={`#${section}`} 
              style={{
                color: activeSection === section ? theme.textPrimary : theme.textSecondary,
                textDecoration: 'none',
                fontSize: getResponsiveValue('0.95rem', '0.9rem', '0.85rem'),
                fontWeight: activeSection === section ? '600' : '500',
                padding: '8px 0',
                position: 'relative',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
              }} 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(section)
              }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      </nav>

      {/* Main Layout */}
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
        
        {/* Enhanced Sidebar with Avatar */}
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
          <div style={{
            width: getResponsiveValue(320, 280, 250),
            height: getResponsiveValue(320, 280, 250),
            borderRadius: getResponsiveValue(25, 20, 15),
            overflow: 'hidden',
            border: `2px solid ${theme.borderColor}`,
            background: theme.bgSecondary,
            position: 'relative',
            transition: 'all 0.4s ease',
            boxShadow: `0 20px 40px ${theme.shadowColor}`,
          }} className="avatar-container">
            <img 
              src="/images/Hannah.png" 
              alt="Hannah Peralta" 
              style={{
                width: '100%',
                height: '130%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                transform: 'translateY(-5%)',
              }}
              className="avatar-image"
            />
            <div style={{
              position: 'absolute',
              width: getResponsiveValue(60, 50, 40),
              height: getResponsiveValue(60, 50, 40),
              border: `2px solid ${theme.accentPrimary}`,
              borderRadius: '50%',
              top: getResponsiveValue(-15, -12, -10),
              right: getResponsiveValue(-15, -12, -10),
              background: theme.bgPrimary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: getResponsiveValue('1.25rem', '1.1rem', '1rem'),
              fontWeight: 'bold',
            }}>HJ</div>
          </div>
          
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
          
          {/* Enhanced Social Links */}
          <div style={{
            display: 'flex',
            gap: getResponsiveValue(15, 12, 10),
            marginTop: getResponsiveValue(40, 35, 30),
            justifyContent: 'center',
            opacity: elementVisible ? 1 : 0,
            transform: elementVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.9s',
            flexWrap: 'wrap',
          }} className="social-links">
            <a 
              href={socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                width: getResponsiveValue(45, 42, 40),
                height: getResponsiveValue(45, 42, 40),
                border: `1.5px solid ${theme.borderColor}`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.textSecondary,
                textDecoration: 'none',
                fontSize: getResponsiveValue('1rem', '0.95rem', '0.9rem'),
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
              }} 
              className="social-link"
              title="LinkedIn"
            >
              <svg width={getResponsiveValue(20, 18, 16)} height={getResponsiveValue(20, 18, 16)} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href={socialLinks.github} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                width: getResponsiveValue(45, 42, 40),
                height: getResponsiveValue(45, 42, 40),
                border: `1.5px solid ${theme.borderColor}`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.textSecondary,
                textDecoration: 'none',
                fontSize: getResponsiveValue('1rem', '0.95rem', '0.9rem'),
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
              }} 
              className="social-link"
              title="GitHub"
            >
              <svg width={getResponsiveValue(20, 18, 16)} height={getResponsiveValue(20, 18, 16)} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href={socialLinks.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                width: getResponsiveValue(45, 42, 40),
                height: getResponsiveValue(45, 42, 40),
                border: `1.5px solid ${theme.borderColor}`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.textSecondary,
                textDecoration: 'none',
                fontSize: getResponsiveValue('1rem', '0.95rem', '0.9rem'),
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
              }} 
              className="social-link"
              title="Facebook"
            >
              <svg width={getResponsiveValue(20, 18, 16)} height={getResponsiveValue(20, 18, 16)} viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href={socialLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                width: getResponsiveValue(45, 42, 40),
                height: getResponsiveValue(45, 42, 40),
                border: `1.5px solid ${theme.borderColor}`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.textSecondary,
                textDecoration: 'none',
                fontSize: getResponsiveValue('1rem', '0.95rem', '0.9rem'),
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
              }} 
              className="social-link"
              title="Instagram"
            >
              <svg width={getResponsiveValue(20, 18, 16)} height={getResponsiveValue(20, 18, 16)} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.017 0C8.396 0 7.987.015 6.756.072 5.527.129 4.713.334 3.994.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.139C.334 4.858.129 5.672.072 6.901.015 8.132 0 8.541 0 12.017c0 3.476.015 3.885.072 5.116.057 1.229.262 2.043.558 2.762.306.789.717 1.459 1.384 2.126.667.667 1.337 1.078 2.126 1.384.719.296 1.533.501 2.762.558 1.231.057 1.64.072 5.115.072 3.476 0 3.885-.015 5.116-.072 1.229-.057 2.043-.262 2.762-.558.789-.306 1.459-.717 2.126-1.384C21.319 1.347 20.649.935 19.86.63c-.719-.296-1.533-.501-2.762-.558C15.867.015 15.458 0 12.017 0zm0 2.158c3.403 0 3.788.012 5.002.069 1.141.052 1.759.242 2.171.401.568.221.975.485 1.402.912.427.427.691.834.912 1.402.159.412.349 1.03.401 2.171.057 1.214.069 1.599.069 5.002 0 3.403-.012 3.788-.069 5.002-.052 1.141-.242 1.759-.401 2.171-.221.568-.485.975-.912 1.402-.427.427-.834.691-1.402.912-.412.159-1.03.349-2.171.401-1.214.057-1.599.069-5.002.069-3.403 0-3.788-.012-5.002-.069-1.141-.052-1.759-.242-2.171-.401-.568-.221-.975-.485-1.402-.912-.427-.427-.691-.834-.912-1.402-.159-.412-.349-1.03-.401-2.171-.057-1.214-.069-1.599-.069-5.002 0-3.403.012-3.788.069-5.002.052-1.141.242-1.759.401-2.171.221-.568.485-.975.912-1.402.427-.427.834-.691 1.402-.912.412-.159 1.03-.349 2.171-.401 1.214-.057 1.599-.069 5.002-.069z"/>
                <circle cx="18.406" cy="5.595" r="1.439"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Enhanced Main Content */}
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
                      `clamp(2.5rem, 5vw, 4rem)`,
            fontWeight: '800',
            marginBottom: getResponsiveValue(20, 18, 16),
            lineHeight: 1.1,
            color: theme.textPrimary,
            letterSpacing: '-0.02em',
            opacity: elementVisible ? 1 : 0,
            transform: elementVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(30px)' : 'translateY(-30px)'),
            transition: 'all 0.8s ease 0.5s',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
          }} className="title">
            Crafting Digital <span style={{color: theme.textPrimary, fontWeight: '800', position: 'relative'}}>Experiences</span><br />
            That Inspire & Transform
          </h1>
          
          {/* Dynamic Greeting with Enhanced Typing Effect */}
          <div style={{
            fontSize: isMobile ? 
                      `clamp(1rem, 4vw, 1.2rem)` : 
                      `clamp(1.2rem, 2.5vw, 1.5rem)`,
            fontWeight: '500',
            marginBottom: getResponsiveValue(30, 25, 20),
            color: theme.textSecondary,
            minHeight: getResponsiveValue(32, 28, 24),
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
            fontSize: getResponsiveValue('1.125rem', '1.05rem', '1rem'),
            color: theme.textMuted,
            marginBottom: getResponsiveValue(40, 35, 30),
            lineHeight: 1.7,
            maxWidth: '600px',
            fontWeight: '400',
            opacity: elementVisible ? 1 : 0,
            transform: elementVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(20px)' : 'translateY(-20px)'),
            transition: 'all 0.8s ease 0.7s',
            marginLeft: isTablet ? 'auto' : '0',
            marginRight: isTablet ? 'auto' : '0',
            textAlign: isTablet ? 'center' : 'left',
          }} className="description">
            I create modern, user-friendly digital solutions designed to help people, solve problems, and make everyday experiences easier and better.
          </p>

          {/* Enhanced Buttons */}
          <div style={{
            display: 'flex',
            gap: getResponsiveValue(20, 15, 12),
            alignItems: 'center',
            flexWrap: 'wrap',
            opacity: elementVisible ? 1 : 0,
            transform: elementVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(20px)' : 'translateY(-20px)'),
            transition: 'all 0.8s ease 0.8s',
            justifyContent: isTablet ? 'center' : 'flex-start',
          }} className="buttons">
            <button 
              style={{
                padding: `${getResponsiveValue(18, 16, 14)}px ${getResponsiveValue(36, 32, 28)}px`,
                fontSize: getResponsiveValue('0.95rem', '0.9rem', '0.85rem'),
                fontWeight: '600',
                background: theme.accentPrimary,
                color: '#ffffff',
                border: 'none',
                borderRadius: getResponsiveValue(12, 10, 8),
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `0 10px 30px ${theme.shadowColor}`,
                width: isMobile ? '100%' : 'auto',
                minWidth: isMobile ? 'auto' : '140px',
              }} 
              className="primary-btn"
              onClick={() => scrollToSection('work')}
            >
              View My Work
            </button>
            <button 
              style={{
                padding: `${getResponsiveValue(18, 16, 14)}px ${getResponsiveValue(36, 32, 28)}px`,
                fontSize: getResponsiveValue('0.95rem', '0.9rem', '0.85rem'),
                fontWeight: '600',
                background: 'transparent',
                color: theme.textPrimary,
                border: `2px solid ${theme.borderColor}`,
                borderRadius: getResponsiveValue(12, 10, 8),
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden',
                width: isMobile ? '100%' : 'auto',
                minWidth: isMobile ? 'auto' : '140px',
              }} 
              className="secondary-btn"
              onClick={handleDownloadCV}
            >
              Download CV
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}