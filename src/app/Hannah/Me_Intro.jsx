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
  const [elementVisible, setElementVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
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

  // Handle window resize and mouse movement
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
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
    bgPrimary: '#FFECEA',
    bgSecondary: '#ffffff',
    bgTertiary: '#f8f4f3',
    textPrimary: '#6C131F',
    textSecondary: '#A14B58',
    textMuted: '#A14B58',
    accentPrimary: '#6C131F',
    accentSecondary: '#A14B58',
    borderColor: 'rgba(108, 19, 31, 0.15)',
    shadowColor: 'rgba(108, 19, 31, 0.08)',
    shadowHover: 'rgba(108, 19, 31, 0.15)',
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
    const link = document.createElement('a')
    link.href = '/cv/Hannah_Peralta-resume.pdf'
    link.download = 'Hannah_Peralta-Resume.pdf'
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const generateParticles = useCallback(() => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        id: i,
        size: Math.random() * 4 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDelay: Math.random() * 20,
        opacity: Math.random() * 0.08 + 0.02,
        speed: Math.random() * 0.5 + 0.2,
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
        
        @keyframes gridShift {
          0%, 100% { 
            transform: translateX(0) translateY(0); 
            opacity: 0.6; 
          }
          25% { 
            transform: translateX(10px) translateY(-5px); 
            opacity: 0.4; 
          }
          50% { 
            transform: translateX(-5px) translateY(10px); 
            opacity: 0.7; 
          }
          75% { 
            transform: translateX(5px) translateY(-10px); 
            opacity: 0.5; 
          }
        }

        @keyframes morphFloat {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1); 
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; 
          }
          25% { 
            transform: translateY(-20px) rotate(90deg) scale(1.05); 
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; 
          }
          50% { 
            transform: translateY(10px) rotate(180deg) scale(0.95); 
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; 
          }
          75% { 
            transform: translateY(-10px) rotate(270deg) scale(1.02); 
            border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%; 
          }
        }

        @keyframes scrollIndicator {
          0% {
            transform: translateY(-8px);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(30px);
            opacity: 0;
          }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-15px) translateX(10px) rotate(90deg); }
          50% { transform: translateY(-30px) translateX(-5px) rotate(180deg); }
          75% { transform: translateY(-10px) translateX(-15px) rotate(270deg); }
        }

        @keyframes morphShape {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 50% 40% 60% 30% / 40% 70% 60% 30%; }
          75% { border-radius: 40% 70% 30% 60% / 70% 40% 50% 60%; }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes slideInFromLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideInFromRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .nav-link:hover {
          color: #6C131F;
          transform: translateY(-2px);
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 2px;
          background: #6C131F;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-50%);
          border-radius: 1px;
        }
        
        .nav-link:hover::after {
          width: 80%;
        }
        
        .primary-btn {
          position: relative;
          overflow: hidden;
          background: #6C131F;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .primary-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,236,234,0.3), transparent);
          transition: left 0.6s ease;
        }

        .primary-btn:hover::before {
          left: 100%;
        }
        
        .primary-btn:hover {
          background: #A14B58;
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 25px 50px rgba(108, 19, 31, 0.25);
        }
        
        .secondary-btn {
          position: relative;
          overflow: hidden;
          background: transparent;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .secondary-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background: #6C131F;
          transition: width 0.3s ease;
          z-index: -1;
        }

        .secondary-btn:hover::before {
          width: 100%;
        }
        
        .secondary-btn:hover {
          color: #FFECEA;
          border-color: #6C131F;
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(108, 19, 31, 0.15);
        }
        
        .avatar-container {
          position: relative;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .avatar-container::before {
          content: '';
          position: absolute;
          top: -20px;
          left: -20px;
          right: -20px;
          bottom: -20px;
          background: #6C131F;
          border-radius: inherit;
          z-index: -2;
          opacity: 0;
          transition: opacity 0.5s ease;
          filter: blur(15px);
        }

        .avatar-container:hover::before {
          opacity: 0.1;
        }

        .avatar-container:hover .avatar-glow {
          opacity: 1;
        }
        
        .avatar-container:hover {
          transform: translateY(-30px) rotate(-5deg) scale(1.1);
          box-shadow: 
            0 60px 120px rgba(108, 19, 31, 0.3),
            inset 0 1px 0 rgba(255,236,234,0.2);
        }
        
        .avatar-container:hover .avatar-image {
          transform: translateY(-5%) scale(1.2);
          filter: contrast(1.05) brightness(1.02) saturate(1.1);
        }
        
        .social-link {
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .social-link::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: #6C131F;
          border-radius: 50%;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translate(-50%, -50%);
          z-index: -1;
        }

        .social-link::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255,236,234,0.2);
          border-radius: 50%;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translate(-50%, -50%);
          z-index: 1;
        }

        .social-link:hover::before {
          width: 150%;
          height: 150%;
        }

        .social-link:hover::after {
          width: 200%;
          height: 200%;
        }
        
        .social-link:hover {
          color: #FFECEA;
          border-color: #6C131F;
          transform: translateY(-10px) scale(1.25) rotate(15deg);
          box-shadow: 
            0 25px 50px rgba(108, 19, 31, 0.3),
            inset 0 1px 0 rgba(255,236,234,0.1);
        }
        
        .logo-image:hover {
          transform: scale(1.1) rotate(5deg);
        }
        
        .floating-shape {
          animation: morphFloat 25s ease-in-out infinite;
        }
        
        .particle {
          position: absolute;
          background: linear-gradient(45deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.01));
          animation: particleFloat 25s infinite linear;
          border-radius: 50%;
        }

        .gradient-text {
          background: #6C131F;
          color: #6C131F;
        }

        .slide-in-left {
          animation: slideInFromLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .slide-in-right {
          animation: slideInFromRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .scale-in {
          animation: scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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
        
        /* Desktop and Mobile Nav Sticky */
        .desktop-nav, .mobile-nav {
          position: sticky !important;
          top: 0 !important;
          z-index: 1000 !important;
        }
        
        /* Ensure smooth sticky behavior */
        .desktop-nav {
          margin-bottom: 60px !important;
        }
        
        @media (max-width: 768px) {
          .mobile-nav {
            margin-bottom: 40px !important;
          }
        }
        
        /* Enhanced responsive styles */
        @media (max-width: 1024px) {
          .layout-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
            text-align: center;
          }
          
          .sidebar {
            order: 2;
            max-width: 500px;
            margin: 0 auto;
          }
          
          .main-content {
            order: 1;
          }

          .floating-shape {
            opacity: 0.5 !important;
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
            font-size: clamp(2.2rem, 8vw, 3.2rem) !important;
            line-height: 1.1 !important;
          }
          
          .greeting {
            font-size: clamp(1.1rem, 4vw, 1.4rem) !important;
          }
          
          .avatar-container {
            width: 300px !important;
            height: 300px !important;
          }

          .particle {
            display: none !important;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 25px 20px !important;
          }
          
          .buttons {
            flex-direction: column;
            gap: 20px;
            width: 100%;
          }
          
          .primary-btn, .secondary-btn {
            width: 100% !important;
            padding: 18px 28px !important;
            font-size: 1rem !important;
          }
          
          .avatar-container {
            width: 280px !important;
            height: 280px !important;
          }
          
          .social-links {
            gap: 15px;
            justify-content: center;
          }
          
          .social-link {
            width: 50px !important;
            height: 50px !important;
          }

          .floating-shape {
            display: none !important;
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
    <>
      {/* Fixed Navigation Bar with Enhanced Design */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.90)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        boxShadow: isScrolled ? '0 8px 32px rgba(0, 0, 0, 0.12)' : '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: getResponsiveValue('18px 60px', '15px 40px', '15px 20px'),
        borderBottom: `1px solid ${isScrolled ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
        }}>
          {/* Enhanced Logo */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '120%',
              height: '120%',
              background: 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)',
              borderRadius: '50%',
              opacity: isScrolled ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}></div>
            <img 
              src="/images/HanMade.png" 
              alt="HanMade Logo" 
              style={{
                height: getResponsiveValue(55, 50, 45),
                width: 'auto',
                objectFit: 'contain',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                zIndex: 2,
              }}
              className="logo-image"
            />
          </div>

          {/* Enhanced Desktop Navigation */}
          <div style={{
            display: isMobile ? 'none' : 'flex',
            gap: getResponsiveValue(40, 30, 25),
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.03)',
            padding: '12px 24px',
            borderRadius: '50px',
            border: '1px solid rgba(0, 0, 0, 0.08)',
          }}>
            {['home', 'about', 'work', 'projects', 'contact'].map((section) => (
              <a 
                key={section}
                href={`#${section}`} 
                style={{
                  color: activeSection === section ? theme.textPrimary : theme.textSecondary,
                  textDecoration: 'none',
                  fontSize: getResponsiveValue('0.95rem', '0.9rem', '0.85rem'),
                  fontWeight: activeSection === section ? '700' : '600',
                  padding: '10px 16px',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  whiteSpace: 'nowrap',
                  borderRadius: '25px',
                  background: activeSection === section ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
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

          {/* Enhanced Mobile Menu Button */}
          <button 
            style={{
              display: isMobile ? 'flex' : 'none',
              flexDirection: 'column',
              gap: '5px',
              background: 'rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              cursor: 'pointer',
              padding: '12px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(0, 0, 0, 0.08)'
              e.target.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(0, 0, 0, 0.05)'
              e.target.style.transform = 'scale(1)'
            }}
          >
            <div style={{
              width: '28px',
              height: '3px',
              backgroundColor: theme.textPrimary,
              borderRadius: '2px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isMobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none',
            }}></div>
            <div style={{
              width: '28px',
              height: '3px',
              backgroundColor: theme.textPrimary,
              borderRadius: '2px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: isMobileMenuOpen ? 0 : 1,
              transform: isMobileMenuOpen ? 'scale(0)' : 'scale(1)',
            }}></div>
            <div style={{
              width: '28px',
              height: '3px',
              backgroundColor: theme.textPrimary,
              borderRadius: '2px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isMobileMenuOpen ? 'rotate(-45deg) translate(8px, -8px)' : 'none',
            }}></div>
          </button>
        </div>

        {/* Enhanced Mobile Menu Dropdown */}
        {isMobileMenuOpen && isMobile && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            borderTop: `1px solid ${theme.borderColor}`,
            padding: '25px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
            animation: 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            {['home', 'about', 'work', 'projects', 'contact'].map((section, index) => (
              <a 
                key={section}
                href={`#${section}`} 
                style={{
                  color: activeSection === section ? theme.textPrimary : theme.textSecondary,
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: activeSection === section ? '700' : '600',
                  padding: '16px 20px',
                  textAlign: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  borderRadius: '12px',
                  background: activeSection === section ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  opacity: 0,
                  transform: 'translateY(20px)',
                  animation: `fadeInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s forwards`,
                }} 
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(section)
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== section) {
                    e.target.style.background = 'rgba(0, 0, 0, 0.05)'
                    e.target.style.transform = 'translateX(5px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== section) {
                    e.target.style.background = 'transparent'
                    e.target.style.transform = 'translateX(0)'
                  }
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content with enhanced design */}
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
        {/* Dynamic grid pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
          `,
          backgroundSize: `${getResponsiveValue(60, 50, 40)}px ${getResponsiveValue(60, 50, 40)}px`,
          opacity: 0.5,
        }}></div>

        {/* Enhanced morphing shapes */}
        <div style={{
          position: 'absolute',
          top: '12%',
          right: getResponsiveValue('8%', '6%', '4%'),
          width: getResponsiveValue(280, 200, 140),
          height: getResponsiveValue(280, 200, 140),
          background: `
            linear-gradient(135deg, ${theme.borderColor}, transparent 70%),
            radial-gradient(circle at 30% 70%, rgba(0,0,0,0.05) 0%, transparent 50%)
          `,
          opacity: isMobile ? 0.15 : 0.25,
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
        }} className="floating-shape"></div>
        
        <div style={{
          position: 'absolute',
          bottom: '18%',
          left: getResponsiveValue('6%', '4%', '2%'),
          width: getResponsiveValue(200, 140, 100),
          height: getResponsiveValue(200, 140, 100),
          background: `
            linear-gradient(45deg, ${theme.borderColor}, transparent 60%),
            conic-gradient(from 45deg, transparent, rgba(0,0,0,0.03), transparent)
          `,
          opacity: isMobile ? 0.12 : 0.2,
          transform: 'rotate(45deg)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        }} className="floating-shape"></div>

        <div style={{
          position: 'absolute',
          top: '65%',
          right: '18%',
          width: getResponsiveValue(150, 100, 70),
          height: getResponsiveValue(150, 100, 70),
          background: `radial-gradient(circle, ${theme.borderColor} 0%, transparent 70%)`,
          opacity: isMobile ? 0.08 : 0.15,
          borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        }} className="floating-shape"></div>
        
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '15%',
          width: getResponsiveValue(100, 80, 60),
          height: getResponsiveValue(100, 80, 60),
          border: `2px solid ${theme.borderColor}`,
          opacity: isMobile ? 0.1 : 0.18,
          borderRadius: '50%',
          background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.02) 70%)',
        }} className="floating-shape"></div>
        
        {/* Enhanced Particles */}
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
                animationDuration: `${20 + particle.speed * 10}s`,
                opacity: particle.opacity,
              }}
            />
          ))}
        </div>

        {/* Interactive cursor effect */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            background: `radial-gradient(circle, ${theme.borderColor} 0%, transparent 70%)`,
            borderRadius: '50%',
            opacity: 0.03,
            pointerEvents: 'none',
            transform: `translate(${mousePosition.x - 100}px, ${mousePosition.y - 100}px)`,
            transition: 'transform 0.1s ease-out',
          }} />
        )}
      </div>

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
            width: getResponsiveValue(360, 320, 290),
            height: getResponsiveValue(360, 320, 290),
            borderRadius: getResponsiveValue(35, 30, 25),
            overflow: 'hidden',
            border: `4px solid ${theme.borderColor}`,
            background: `
              linear-gradient(135deg, ${theme.bgSecondary} 0%, ${theme.bgPrimary} 50%, ${theme.bgSecondary} 100%),
              radial-gradient(circle at 30% 70%, rgba(0,0,0,0.02) 0%, transparent 50%)
            `,
            position: 'relative',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: `
              0 30px 60px ${theme.shadowColor},
              inset 0 1px 0 rgba(255,255,255,0.1)
            `,
          }} className="avatar-container">
            {/* Enhanced decorative border elements */}
            <div style={{
              position: 'absolute',
              top: '-4px',
              left: '-4px',
              right: '-4px',
              bottom: '-4px',
              background: `
                conic-gradient(from 0deg, transparent, rgba(0,0,0,0.1), transparent, rgba(0,0,0,0.05), transparent),
                linear-gradient(45deg, transparent 30%, rgba(0,0,0,0.02) 50%, transparent 70%)
              `,
              borderRadius: getResponsiveValue(35, 30, 25),
              zIndex: -1,
              opacity: 0,
              transition: 'opacity 0.4s ease',
            }} className="avatar-glow"></div>
            
            {/* Corner decorations */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '40px',
              height: '40px',
              border: `2px solid ${theme.borderColor}`,
              borderRadius: '50%',
              opacity: 0.2,
              background: 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)',
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              width: '25px',
              height: '25px',
              background: `linear-gradient(45deg, ${theme.borderColor}, transparent)`,
              borderRadius: '4px',
              opacity: 0.15,
              transform: 'rotate(45deg)',
            }}></div>
            
            <img 
              src="/images/Hannah.png" 
              alt="Hannah Peralta" 
              style={{
                width: '100%',
                height: '130%',
                objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'translateY(-5%)',
                filter: 'contrast(1.02) brightness(1.01)',
              }}
              className="avatar-image"
            />
            
            {/* Enhanced overlay gradient */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: `
                linear-gradient(to top, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 50%, transparent 100%),
                radial-gradient(ellipse at bottom, rgba(0,0,0,0.05) 0%, transparent 70%)
              `,
              pointerEvents: 'none',
            }}></div>
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
          
          {/* Dynamic Greeting with Enhanced Typing Effect */}
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

          {/* Enhanced Buttons with scroll indicator */}
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
              className="primary-btn"
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
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
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
              className="secondary-btn"
              onClick={() => scrollToSection('contact')}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px) scale(1.02)'
                e.target.style.background = '#6C131F'
                e.target.style.color = '#FFECEA'
                e.target.style.borderColor = '#6C131F'
                e.target.style.boxShadow = '0 20px 40px rgba(108, 19, 31, 0.15)'
                // Ensure the text span is also white
                const span = e.target.querySelector('span')
                if (span) span.style.color = '#FFECEA'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)'
                e.target.style.background = 'transparent'
                e.target.style.color = theme.textPrimary
                e.target.style.borderColor = theme.textPrimary
                e.target.style.boxShadow = 'none'
                // Reset the text span color
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
    </>
  )
}