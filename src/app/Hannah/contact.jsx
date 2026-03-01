'use client'

import { useEffect, useState } from 'react'
import GlobalNavigation from '../components/GlobalNavigation'

export default function Contact({ scrollDirection = 'down' }) {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [activeContact, setActiveContact] = useState(null)
  const [activeSocial, setActiveSocial] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
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

  const isMobile = windowSize.width < 768
  const isTablet = windowSize.width < 1024

  const getResponsiveValue = (desktop, tablet, mobile) => {
    if (isMobile) return mobile
    if (isTablet) return tablet
    return desktop
  }

  const theme = {
    bgPrimary: '#FFECEA',
    bgSecondary: '#ffffff',
    bgTertiary: '#f8f4f3',
    textPrimary: '#6C131F',
    textSecondary: '#A14B58',
    textMuted: '#A14B58',
    borderColor: 'rgba(108, 19, 31, 0.15)',
    accent: '#6C131F',
    accentSecondary: '#A14B58',
  }
  const contactMethods = [
    {
      icon: (
        <svg width={getResponsiveValue(24, 22, 20)} height={getResponsiveValue(24, 22, 20)} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      title: 'EMAIL_PROTOCOL',
      value: 'hannahjamillap@gmail.com',
      action: 'mailto:hannahjamillap@gmail.com',
      description: '// Send encrypted message for collaborations',
      techCode: 'SMTP'
    },
    {
      icon: (
        <svg width={getResponsiveValue(24, 22, 20)} height={getResponsiveValue(24, 22, 20)} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
        </svg>
      ),
      title: 'VOICE_CHANNEL',
      value: '+63 922 250 0165',
      action: 'tel:+639222500165',
      description: '// Establish direct voice connection',
      techCode: 'CALL'
    },
    {
      icon: (
        <svg width={getResponsiveValue(24, 22, 20)} height={getResponsiveValue(24, 22, 20)} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      title: 'NETWORK_LINK',
      value: 'Hannah Jamilla Peralta',
      action: 'https://linkedin.com/in/hannah-jamilla-9277a5337',
      description: '// Connect to professional network',
      techCode: 'LINK'
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
      color: '#E4405F',
      techCode: 'INSTA'
    },
    {
      name: 'Facebook',
      icon: (
        <svg width={getResponsiveValue(20, 18, 16)} height={getResponsiveValue(20, 18, 16)} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: 'https://facebook.com/share/15r8QNkywy/',
      color: '#1877F2',
      techCode: 'META'
    },
    {
      name: 'GitHub',
      icon: (
        <svg width={getResponsiveValue(20, 18, 16)} height={getResponsiveValue(20, 18, 16)} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      url: 'https://github.com/hannahjamilla',
      color: '#181717',
      techCode: 'REPO'
    }
  ]
  useEffect(() => {
    if (mounted) {
      const style = document.createElement('style')
      style.textContent = `
        @keyframes techGlow {
          0%, 100% { 
            box-shadow: 0 0 20px ${theme.accent}20;
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 40px ${theme.accent}40;
            transform: scale(1.02);
          }
        }

        @keyframes dataFlow {
          0% { 
            transform: translateX(-100%);
            opacity: 0;
          }
          50% { 
            opacity: 1;
          }
          100% { 
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes circuitPulse {
          0%, 100% { 
            stroke-dashoffset: 0;
            opacity: 0.3;
          }
          50% { 
            stroke-dashoffset: -20;
            opacity: 1;
          }
        }

        @keyframes matrixRain {
          0% { 
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% { 
            opacity: 1;
          }
          90% { 
            opacity: 1;
          }
          100% { 
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes hologramFlicker {
          0%, 100% { 
            opacity: 1;
            filter: hue-rotate(0deg);
          }
          25% { 
            opacity: 0.8;
            filter: hue-rotate(90deg);
          }
          50% { 
            opacity: 0.9;
            filter: hue-rotate(180deg);
          }
          75% { 
            opacity: 0.7;
            filter: hue-rotate(270deg);
          }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes softFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes subtlePulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes rotateShape {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes floatRotate {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
          }
        }

        @keyframes morphBlob {
          0%, 100% { 
            border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
            transform: translateY(0px) rotate(0deg);
          }
          25% { 
            border-radius: 37% 63% 46% 54% / 48% 55% 45% 52%;
            transform: translateY(-10px) rotate(90deg);
          }
          50% { 
            border-radius: 54% 46% 63% 37% / 52% 45% 55% 48%;
            transform: translateY(-15px) rotate(180deg);
          }
          75% { 
            border-radius: 46% 54% 37% 63% / 45% 52% 48% 55%;
            transform: translateY(-5px) rotate(270deg);
          }
        }

        @keyframes pulseGlow {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: scale(1.2);
            opacity: 1;
          }
        }

        ${[...Array(6)].map((_, i) => `
          @keyframes floatParticle${i} {
            0%, 100% { 
              transform: translateY(0px) translateX(0px);
              opacity: 0.3;
            }
            25% { 
              transform: translateY(-${10 + i * 5}px) translateX(${5 + i * 2}px);
              opacity: 0.8;
            }
            50% { 
              transform: translateY(-${15 + i * 3}px) translateX(-${3 + i}px);
              opacity: 1;
            }
            75% { 
              transform: translateY(-${8 + i * 2}px) translateX(${8 + i * 3}px);
              opacity: 0.6;
            }
          }
        `).join('')}

        .tech-glow {
          animation: techGlow 2s ease-in-out infinite;
        }

        .circuit-pulse {
          animation: circuitPulse 2s ease-in-out infinite;
        }

        .hologram-flicker {
          animation: hologramFlicker 1.5s ease-in-out infinite;
        }

        .tech-card {
          position: relative;
          overflow: hidden;
        }

        .tech-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, ${theme.accent}20, transparent);
          transition: left 0.5s ease;
        }

        .tech-card:hover::before {
          left: 100%;
        }

        .soft-float {
          animation: softFloat 6s ease-in-out infinite;
        }

        .subtle-pulse {
          animation: subtlePulse 3s ease-in-out infinite;
        }

        .slide-up-fade {
          animation: slideUpFade 0.8s ease-out forwards;
        }

        .scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px -20px ${theme.accent}40;
        }

        .hover-glow {
          transition: all 0.3s ease;
        }

        .hover-glow:hover {
          background: ${theme.accent}10;
          border-color: ${theme.accent};
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -10px ${theme.accent}30;
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
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: all 0.3s ease;
          border-radius: 12px;
        }

        .social-link:hover::before {
          opacity: 1;
        }

        .social-link:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        @media (prefers-reduced-motion: reduce) {
          .soft-float,
          .subtle-pulse,
          * {
            animation: none !important;
          }
        }

        /* Enhanced responsive styles */
        @media (max-width: 1024px) {
          .contact-container {
            padding: 60px 30px !important;
            padding-top: 90px !important;
            min-height: auto !important;
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
            padding: 40px 20px !important;
            padding-top: 70px !important;
            min-height: auto !important;
            display: block !important;
          }
          .contact-title {
            font-size: 2.2rem !important;
            line-height: 1.1 !important;
          }
          .contact-subtitle {
            font-size: 1rem !important;
            margin-top: 15px !important;
          }
          .contact-method {
            padding: 18px !important;
          }
          .social-links {
            gap: 16px !important;
            justify-content: center !important;
          }
          .social-link {
            width: 100px !important;
            height: 70px !important;
          }
          .contact-grid {
            gap: 25px !important;
          }
        }

        @media (max-width: 480px) {
          .contact-container {
            padding: 30px 15px !important;
            padding-top: 60px !important;
            min-height: auto !important;
            display: block !important;
          }
          .contact-title {
            font-size: 1.8rem !important;
            line-height: 1.2 !important;
          }
          .contact-subtitle {
            font-size: 0.9rem !important;
            margin-top: 12px !important;
            padding: 0 10px !important;
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
            gap: 14px !important;
            justify-content: center !important;
            flex-wrap: wrap !important;
          }
          .social-link {
            width: 90px !important;
            height: 65px !important;
            font-size: 12px !important;
          }
          .footer-text {
            font-size: 0.75rem !important;
            padding: 0 10px !important;
            line-height: 1.4 !important;
          }
          .contact-grid {
            gap: 20px !important;
          }
        }

        @media (max-width: 380px) {
          .contact-container {
            padding: 25px 12px !important;
            padding-top: 55px !important;
          }
          .contact-title {
            font-size: 1.6rem !important;
          }
          .contact-subtitle {
            font-size: 0.85rem !important;
          }
          .contact-method {
            padding: 14px !important;
          }
          .social-link {
            width: 85px !important;
            height: 60px !important;
          }
        }

        /* Landscape optimization for mobile */
        @media (max-height: 600px) and (orientation: landscape) {
          .contact-container {
            padding: 20px 15px !important;
            padding-top: 50px !important;
            min-height: auto !important;
          }
          .contact-grid {
            gap: 20px !important;
          }
        }
      `
      document.head.appendChild(style)

      return () => {
        if (document.head.contains(style)) {
          document.head.removeChild(style)
        }
      }
    }
  }, [mounted, theme])
  if (!mounted) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#ffffff', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          fontFamily: 'monospace',
          color: theme.accent,
          fontSize: '14px'
        }}>
          $ initializing contact_module...
        </div>
      </div>
    )
  }

  return (
    <div>
      <GlobalNavigation />
      <section 
        id="contact" 
        style={{
          minHeight: isMobile ? 'auto' : '100vh',
          padding: getResponsiveValue('80px 40px', '40px 20px', '50px 15px'),
        paddingTop: getResponsiveValue('100px', '80px', '70px'),
          paddingBottom: getResponsiveValue('80px', '60px', '40px'),
          background: `
            radial-gradient(circle at 20% 30%, ${theme.bgPrimary}60 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, ${theme.bgSecondary}80 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, ${theme.accentSecondary}20 0%, transparent 40%),
            conic-gradient(from 45deg at 60% 20%, ${theme.accent}10, transparent, ${theme.textSecondary}08),
            linear-gradient(135deg, ${theme.bgPrimary} 0%, ${theme.bgSecondary} 50%, ${theme.bgPrimary} 100%)
          `,
          fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          position: 'relative',
          overflow: 'hidden',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(50px)' : 'translateY(-50px)'),
          transition: 'all 0.8s ease',
          display: isMobile ? 'block' : 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'center',
        }} 
        className="contact-container"
      >
        {/* Enhanced Tech Background Elements */}
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}>
          {/* Technical circuit lines */}
          <svg
            style={{
              position: 'absolute',
              top: getResponsiveValue('20%', '15%', '10%'),
              right: getResponsiveValue('10%', '8%', '5%'),
              width: getResponsiveValue('200px', '150px', '100px'),
              height: getResponsiveValue('200px', '150px', '100px'),
              opacity: getResponsiveValue(0.4, 0.3, 0.25),
            }}
          >
            <defs>
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={theme.accent} stopOpacity="0.9" />
                <stop offset="50%" stopColor={theme.textSecondary} stopOpacity="0.6" />
                <stop offset="100%" stopColor={theme.accent} stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path
              d={getResponsiveValue(
                "M20,20 L180,20 L180,60 L100,60 L100,140 L180,140 L180,180",
                "M15,15 L135,15 L135,45 L75,45 L75,105 L135,105 L135,135",
                "M10,10 L90,10 L90,30 L50,30 L50,70 L90,70 L90,90"
              )}
              fill="none"
              stroke="url(#circuitGradient)"
              strokeWidth={getResponsiveValue("2", "1.5", "1")}
              strokeDasharray="8,4"
              className="circuit-pulse"
              filter="url(#glow)"
            />
            <circle cx={getResponsiveValue("20", "15", "10")} cy={getResponsiveValue("20", "15", "10")} r={getResponsiveValue("4", "3", "2")} fill={theme.accent} className="tech-glow" />
            <circle cx={getResponsiveValue("180", "135", "90")} cy={getResponsiveValue("60", "45", "30")} r={getResponsiveValue("4", "3", "2")} fill={theme.accent} className="tech-glow" />
            <circle cx={getResponsiveValue("100", "75", "50")} cy={getResponsiveValue("140", "105", "70")} r={getResponsiveValue("4", "3", "2")} fill={theme.accent} className="tech-glow" />
          </svg>

          {/* Code-like floating elements */}
          {[...Array(getResponsiveValue(6, 4, 3))].map((_, i) => (
            <div
              key={`code-${i}`}
              style={{
                position: 'absolute',
                top: `${15 + i * 20}%`,
                left: `${5 + i * 15}%`,
                fontSize: getResponsiveValue('10px', '9px', '8px'),
                fontFamily: 'monospace',
                color: `${theme.accent}${40 + i * 10}`,
                opacity: 0.3,
                transform: `rotate(${i * 15}deg)`,
                letterSpacing: '1px',
                pointerEvents: 'none',
                animation: `floatParticle${i} ${8 + i * 2}s ease-in-out infinite`,
              }}
            >
              {['{ }', '< />', '[ ]', '( )', '=> ', '::'][i] || '{}'}
            </div>
          ))}

          {/* Matrix Rain Effect */}
          {[...Array(getResponsiveValue(8, 6, 4))].map((_, i) => (
            <div
              key={`matrix-${i}`}
              className="matrix-rain"
              style={{
                position: 'absolute',
                left: `${10 + i * (getResponsiveValue(12, 15, 20))}%`,
                top: '-10vh',
                width: getResponsiveValue('2px', '1.5px', '1px'),
                height: getResponsiveValue('20vh', '15vh', '10vh'),
                background: `linear-gradient(180deg, transparent, ${theme.accent}60, transparent)`,
                animation: `matrixRain ${4 + i * 0.5}s linear infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}

          {/* Holographic Grid */}
          <div
            className="hologram-flicker"
            style={{
              position: 'absolute',
              bottom: getResponsiveValue('10%', '8%', '5%'),
              left: getResponsiveValue('20%', '15%', '10%'),
              width: getResponsiveValue('300px', '200px', '150px'),
              height: getResponsiveValue('200px', '150px', '100px'),
              background: `
                linear-gradient(90deg, transparent 49%, ${theme.accent}20 50%, transparent 51%),
                linear-gradient(0deg, transparent 49%, ${theme.textSecondary}15 50%, transparent 51%)
              `,
              backgroundSize: getResponsiveValue('20px 20px', '15px 15px', '10px 10px'),
              opacity: getResponsiveValue(0.4, 0.3, 0.2),
              clipPath: 'polygon(0 0, 100% 20%, 80% 100%, 0% 80%)',
            }}
          />

          {/* Animated Geometric Shapes */}
          <div className="soft-float" style={{
            position: 'absolute',
            top: getResponsiveValue('10%', '8%', '5%'),
            right: getResponsiveValue('8%', '5%', '2%'),
            width: getResponsiveValue('300px', '200px', '150px'),
            height: getResponsiveValue('300px', '200px', '150px'),
            background: `conic-gradient(from 45deg, ${theme.accent}15, transparent, ${theme.textSecondary}10, transparent)`,
            borderRadius: '50%',
            animation: 'rotateShape 20s linear infinite',
            filter: getResponsiveValue('blur(40px)', 'blur(30px)', 'blur(20px)'),
          }} />

          <div style={{
            position: 'absolute',
            top: getResponsiveValue('60%', '65%', '70%'),
            left: getResponsiveValue('5%', '3%', '1%'),
            width: getResponsiveValue('250px', '180px', '120px'),
            height: getResponsiveValue('250px', '180px', '120px'),
            background: `linear-gradient(135deg, ${theme.bgPrimary}40, ${theme.accentSecondary}20)`,
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
            animation: 'floatRotate 15s ease-in-out infinite',
            filter: getResponsiveValue('blur(20px)', 'blur(15px)', 'blur(10px)'),
          }} />

          {/* Morphing Blob */}
          <div style={{
            position: 'absolute',
            top: getResponsiveValue('20%', '18%', '15%'),
            left: getResponsiveValue('15%', '12%', '8%'),
            width: getResponsiveValue('200px', '150px', '100px'),
            height: getResponsiveValue('200px', '150px', '100px'),
            background: `radial-gradient(circle, ${theme.accent}12, transparent 70%)`,
            borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
            animation: 'morphBlob 8s ease-in-out infinite',
            filter: getResponsiveValue('blur(30px)', 'blur(20px)', 'blur(15px)'),
          }} />

          {/* Floating particles */}
          {[...Array(getResponsiveValue(6, 4, 3))].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${20 + i * 15}%`,
              left: `${10 + i * 12}%`,
              width: getResponsiveValue(`${8 + i * 2}px`, `${6 + i * 1.5}px`, `${4 + i}px`),
              height: getResponsiveValue(`${8 + i * 2}px`, `${6 + i * 1.5}px`, `${4 + i}px`),
              background: `${theme.accent}${30 + i * 10}`,
              borderRadius: '50%',
              animation: `floatParticle${i} ${6 + i}s ease-in-out infinite`,
            }} />
          ))}

          {/* Dynamic grid pattern */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: getResponsiveValue(0.05, 0.04, 0.03),
            }}
          >
            <defs>
              <pattern 
                id="dynamicGrid" 
                x="0" 
                y="0" 
                width={getResponsiveValue("60", "45", "30")} 
                height={getResponsiveValue("60", "45", "30")} 
                patternUnits="userSpaceOnUse"
              >
                <path 
                  d={getResponsiveValue("M 60 0 L 0 0 0 60", "M 45 0 L 0 0 0 45", "M 30 0 L 0 0 0 30")} 
                  fill="none" 
                  stroke={theme.textPrimary} 
                  strokeWidth={getResponsiveValue("0.5", "0.4", "0.3")} 
                />
                <circle 
                  cx={getResponsiveValue("30", "22.5", "15")} 
                  cy={getResponsiveValue("30", "22.5", "15")} 
                  r={getResponsiveValue("1", "0.8", "0.6")} 
                  fill={theme.accent} 
                  opacity="0.3" 
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dynamicGrid)" />
          </svg>

          {/* Glowing orbs */}
          <div style={{
            position: 'absolute',
            top: getResponsiveValue('15%', '12%', '8%'),
            right: getResponsiveValue('30%', '25%', '20%'),
            width: getResponsiveValue('80px', '60px', '40px'),
            height: getResponsiveValue('80px', '60px', '40px'),
            background: `radial-gradient(circle, ${theme.accent}20, transparent 70%)`,
            borderRadius: '50%',
            animation: 'pulseGlow 3s ease-in-out infinite',
            filter: getResponsiveValue('blur(15px)', 'blur(12px)', 'blur(8px)'),
          }} />

          <div style={{
            position: 'absolute',
            bottom: getResponsiveValue('20%', '18%', '15%'),
            right: getResponsiveValue('15%', '12%', '8%'),
            width: getResponsiveValue('60px', '45px', '30px'),
            height: getResponsiveValue('60px', '45px', '30px'),
            background: `radial-gradient(circle, ${theme.textSecondary}25, transparent 70%)`,
            borderRadius: '50%',
            animation: 'pulseGlow 4s ease-in-out infinite reverse',
            filter: getResponsiveValue('blur(20px)', 'blur(15px)', 'blur(10px)'),
          }} />

          {/* Interactive cursor trail */}
          <div style={{
            position: 'absolute',
            top: mousePosition.y - getResponsiveValue(100, 75, 50),
            left: mousePosition.x - getResponsiveValue(100, 75, 50),
            width: getResponsiveValue('200px', '150px', '100px'),
            height: getResponsiveValue('200px', '150px', '100px'),
            background: `radial-gradient(circle, ${theme.accent}08, transparent 70%)`,
            borderRadius: '50%',
            transition: 'all 0.3s ease',
            filter: getResponsiveValue('blur(40px)', 'blur(30px)', 'blur(20px)'),
            pointerEvents: 'none',
          }} />
        </div>
        {/* Main Content */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          width: '100%',
        }}>
          {/* Enhanced Tech Header Section */}
          <div style={{
            textAlign: 'center',
            marginBottom: getResponsiveValue(60, 40, 30),
            paddingTop: getResponsiveValue(0, 10, 20),
          }}>
            {/* Terminal-style header */}
            <div style={{
              fontSize: getResponsiveValue('12px', '11px', '10px'),
              fontFamily: 'monospace',
              color: theme.textMuted,
              marginBottom: getResponsiveValue('12px', '10px', '8px'),
              opacity: 0.6,
              letterSpacing: '1px',
            }}>
              ~/portfolio/contact$ npm run establish-connection
            </div>

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
                fontFamily: 'monospace',
              }} className="contact-title">
                <span style={{
                  color: theme.accent,
                }}>INIT</span>{' '}
                <span style={{
                  color: theme.textSecondary, 
                  position: 'relative',
                  display: 'inline-block',
                }}>
                  CONNECTION
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

            <div style={{
              marginTop: getResponsiveValue('12px', '10px', '8px'),
              fontSize: getResponsiveValue('14px', '13px', '11px'),
              color: theme.textMuted,
              fontFamily: 'monospace',
              letterSpacing: getResponsiveValue('2px', '1.5px', '1px'),
              opacity: 0.7,
              wordBreak: 'break-word',
            }}>
              // SECURE • ENCRYPTED • AUTHENTICATED
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
                color: theme.textSecondary,
                fontFamily: 'monospace',
                fontSize: '0.9em'
              }}>$ echo "</span>
              <span style={{ 
                color: theme.textSecondary, 
                fontWeight: '600',
              }}>Let's collaborate and build something amazing together</span>
              <span style={{
                color: theme.textSecondary,
                fontFamily: 'monospace',
                fontSize: '0.9em'
              }}>"</span>
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: getResponsiveValue('1fr 1fr', '1fr', '1fr'),
            gap: getResponsiveValue(40, 30, 25),
            alignItems: 'start',
            maxWidth: '1000px',
            margin: '0 auto',
            width: '100%',
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
                    padding: getResponsiveValue('32px', '28px', '24px'),
                    background: `linear-gradient(135deg, ${theme.bgPrimary} 0%, ${theme.bgSecondary} 100%)`,
                    borderRadius: '16px',
                    textDecoration: 'none',
                    color: theme.textPrimary,
                    border: `2px solid ${theme.borderColor}`,
                    boxShadow: `0 8px 25px rgba(0,0,0,0.08), inset 0 1px 0 ${theme.accent}20`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`,
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(12px)',
                  }}
                  className="contact-method tech-card hover-glow"
                  onMouseEnter={() => setActiveContact(index)}
                  onMouseLeave={() => setActiveContact(null)}
                >
                  {/* Tech code identifier */}
                  <div style={{
                    position: 'absolute',
                    top: getResponsiveValue('8px', '6px', '4px'),
                    right: getResponsiveValue('10px', '8px', '6px'),
                    fontSize: getResponsiveValue('10px', '9px', '8px'),
                    fontFamily: 'monospace',
                    color: theme.accent,
                    opacity: 0.6,
                    letterSpacing: '0.5px',
                    fontWeight: '600',
                  }}>
                    {method.techCode}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: getResponsiveValue(64, 58, 52),
                    height: getResponsiveValue(64, 58, 52),
                    background: `linear-gradient(135deg, ${theme.accent}15, ${theme.bgSecondary}90)`,
                    borderRadius: '10px',
                    flexShrink: 0,
                    border: `1px solid ${theme.accent}`,
                    transition: 'all 0.3s ease',
                    transform: activeContact === index ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: `0 4px 15px -4px ${theme.accent}35`,
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
                      fontFamily: 'monospace',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
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
                      fontFamily: 'monospace',
                    }}>
                      {method.value}
                    </div>
                    <div style={{
                      fontSize: getResponsiveValue('0.85rem', '0.8rem', '0.75rem'),
                      color: theme.textMuted,
                      lineHeight: 1.4,
                      opacity: 0.8,
                      fontFamily: 'monospace',
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
              gap: getResponsiveValue(30, 25, 20),
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
              transition: 'all 0.6s ease 0.3s',
              width: '100%',
            }}>
              {/* Social Links */}
              <div style={{
                background: `linear-gradient(135deg, ${theme.bgPrimary} 0%, ${theme.bgSecondary} 100%)`,
                border: `2px solid ${theme.borderColor}`,
                borderRadius: '16px',
                padding: getResponsiveValue('30px', '25px', '20px'),
                boxShadow: `0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 ${theme.accent}20`,
                backdropFilter: 'blur(12px)',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: getResponsiveValue(20, 18, 16),
                  gap: '10px'
                }}>
                  <div style={{
                    fontSize: getResponsiveValue('10px', '9px', '8px'),
                    fontFamily: 'monospace',
                    color: theme.textMuted,
                    opacity: 0.6,
                  }}>
                    $ ls -la /social/
                  </div>
                </div>

                <h3 style={{
                  fontSize: getResponsiveValue('1.3rem', '1.2rem', '1.1rem'),
                  fontWeight: '700',
                  color: theme.textPrimary,
                  marginBottom: getResponsiveValue(20, 18, 16),
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontFamily: 'monospace',
                }}>
                  SOCIAL_NETWORKS
                </h3>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: getResponsiveValue(16, 14, 12),
                  flexWrap: 'wrap',
                  width: '100%',
                  maxWidth: '450px',
                  margin: '0 auto',
                }} className="social-links">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: getResponsiveValue(120, 100, 85),
                        height: getResponsiveValue(75, 65, 60),
                        minWidth: getResponsiveValue(120, 100, 85),
                        minHeight: getResponsiveValue(75, 65, 60),
                        background: `linear-gradient(135deg, ${social.color}15, ${theme.bgSecondary}90)`,
                        color: social.color,
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                        textDecoration: 'none',
                        boxShadow: `0 4px 15px rgba(0,0,0,0.1), inset 0 1px 0 ${social.color}20`,
                        border: `1px solid ${social.color}30`,
                        position: 'relative',
                        overflow: 'hidden',
                        flexShrink: 0,
                        cursor: 'pointer',
                      }}
                      className="social-link"
                      onMouseEnter={() => setActiveSocial(index)}
                      onMouseLeave={() => setActiveSocial(null)}
                    >
                      {/* Tech code identifier */}
                      <div style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        fontSize: '8px',
                        fontFamily: 'monospace',
                        color: social.color,
                        opacity: 0.6,
                        fontWeight: '600',
                        pointerEvents: 'none',
                      }}>
                        {social.techCode}
                      </div>
                      
                      <div style={{ 
                        marginBottom: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                      }}>
                        {social.icon}
                      </div>
                      
                      <div style={{
                        fontSize: '9px',
                        fontFamily: 'monospace',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        opacity: 0.8,
                        textAlign: 'center',
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                      }}>
                        {social.name}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* System Status */}
              <div style={{
                background: `linear-gradient(135deg, ${theme.bgPrimary} 0%, ${theme.bgSecondary} 100%)`,
                border: `2px solid ${theme.borderColor}`,
                borderRadius: '16px',
                padding: getResponsiveValue('30px', '25px', '20px'),
                boxShadow: `0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 ${theme.accent}20`,
                textAlign: 'center',
                backdropFilter: 'blur(12px)',
              }}>
                {/* Terminal header */}
                <div style={{
                  fontSize: getResponsiveValue('10px', '9px', '8px'),
                  fontFamily: 'monospace',
                  color: theme.textMuted,
                  marginBottom: '15px',
                  opacity: 0.6,
                }}>
                  $ cat /proc/developer/status
                </div>

                {/* Profile Image */}
                <div style={{
                  width: getResponsiveValue(80, 70, 60),
                  height: getResponsiveValue(80, 70, 60),
                  borderRadius: '50%',
                  overflow: 'hidden',
                  margin: '0 auto 15px',
                  border: `2px solid ${theme.accent}`,
                  background: theme.bgSecondary,
                  boxShadow: `0 0 20px ${theme.accent}30`,
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
                  fontFamily: 'monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}>
                  STATUS: ONLINE
                </h4>
                
                <p style={{
                  fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
                  color: theme.textMuted,
                  margin: 0,
                  fontFamily: 'monospace',
                }}>
                  // Ready for new connections
                </p>

                {/* System metrics */}
                <div style={{
                  marginTop: '15px',
                  fontSize: getResponsiveValue('0.8rem', '0.75rem', '0.7rem'),
                  fontFamily: 'monospace',
                  color: theme.textMuted,
                  opacity: 0.6,
                  lineHeight: 1.4,
                }}>
                  UPTIME: 99.9% • RESPONSE_TIME: &lt;100ms<br/>
                  LAST_ACTIVE: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Footer */}
          <div style={{
            textAlign: 'center',
            marginTop: getResponsiveValue(40, 30, 25),
            paddingTop: getResponsiveValue(30, 25, 20),
            borderTop: `1px solid ${theme.borderColor}`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.6s',
          }}>
            <div style={{
              fontSize: getResponsiveValue('10px', '9px', '8px'),
              fontFamily: 'monospace',
              color: theme.textMuted,
              marginBottom: '10px',
              opacity: 0.5,
            }}>
              $ echo "Connection established successfully"
            </div>
            
            <p style={{
              color: theme.textMuted,
              fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
              margin: 0,
              fontWeight: '500',
              fontFamily: 'monospace',
            }} className="footer-text">
              © {new Date().getFullYear()} Hannah Jamilla Del Rosario Peralta • Built with &lt;3 and lots of coffee
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}