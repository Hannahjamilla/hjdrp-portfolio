'use client'

import { useState, useEffect, useRef } from 'react'
import Loading from './components/Loading'
import AboutMe from './Hannah/AboutMe'
import Me_Intro from './Hannah/Me_Intro'
import Work from './Hannah/work'
import Projects from './Hannah/projects'
import Contact from './Hannah/contact'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState('home')
  const [scrollDirection, setScrollDirection] = useState('down')
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  // Mouse tracking for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    // Enhanced global styles with modern animations
    const style = document.createElement('style')
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
      
      :root {
        --primary-color: #000000;
        --secondary-color: #ffffff;
        --accent-color: #6366f1;
        --text-primary: #1a1a1a;
        --text-secondary: #6b7280;
        --text-muted: #9ca3af;
        --bg-primary: #ffffff;
        --bg-secondary: #f8fafc;
        --bg-tertiary: #f1f5f9;
        --border-light: rgba(0, 0, 0, 0.08);
        --border-medium: rgba(0, 0, 0, 0.12);
        --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        --gradient-tertiary: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      html {
        scroll-behavior: smooth;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        font-size: 16px;
      }
      
      body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: var(--bg-primary);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1.6;
        color: var(--text-primary);
      }

      /* Modern Scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: var(--bg-secondary);
      }
      
      ::-webkit-scrollbar-thumb {
        background: var(--text-muted);
        border-radius: 4px;
        transition: background 0.3s ease;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: var(--text-secondary);
      }

      /* Scroll Progress Bar */
      .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
      }

      /* Modern Animations */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes fadeInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes fadeInRight {
        from {
          opacity: 0;
          transform: translateX(30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      @keyframes shimmer {
        0% {
          background-position: -200px 0;
        }
        100% {
          background-position: calc(200px + 100%) 0;
        }
      }

      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      /* Animation Classes */
      .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .fade-in-left {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .fade-in-right {
        opacity: 0;
        transform: translateX(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .scale-in {
        opacity: 0;
        transform: scale(0.9);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .visible {
        opacity: 1 !important;
        transform: translateY(0) translateX(0) scale(1) !important;
      }

      /* Hover Effects */
      .hover-lift {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .hover-lift:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-xl);
      }

      .hover-glow {
        transition: box-shadow 0.3s ease;
      }

      .hover-glow:hover {
        box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
      }

      /* Glass Morphism */
      .glass {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      /* Gradient Text */
      .gradient-text {
        background: var(--gradient-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
        html { font-size: 15px; }
      }
      
      @media (max-width: 768px) {
        html { font-size: 14px; }
        
        .fade-in-up, .fade-in-left, .fade-in-right, .scale-in {
          transform: translateY(20px) translateX(0) scale(1);
        }
      }
      
      @media (max-width: 480px) {
        html { font-size: 13px; }
      }

      /* Better Focus States */
      button:focus-visible,
      a:focus-visible {
        outline: 2px solid var(--accent-color);
        outline-offset: 2px;
        border-radius: 4px;
      }

      /* Selection Styles */
      ::selection {
        background: rgba(102, 126, 234, 0.2);
        color: var(--text-primary);
      }

      /* Smooth Transitions */
      * {
        transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, 
                   box-shadow 0.2s ease, transform 0.2s ease;
      }

      /* Container Styles */
      .container-lock {
        overflow-x: hidden;
        width: 100%;
        max-width: 100vw;
        position: relative;
      }

      /* Background Patterns */
      .bg-pattern {
        position: relative;
        overflow: hidden;
      }

      .bg-pattern::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
          radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(118, 75, 162, 0.1) 0%, transparent 50%);
        pointer-events: none;
        z-index: -1;
      }

      /* Floating Elements */
      .floating-element {
        animation: float 6s ease-in-out infinite;
      }

      .floating-element:nth-child(2n) {
        animation-delay: -2s;
      }

      .floating-element:nth-child(3n) {
        animation-delay: -4s;
      }

      /* Custom Cursor - DISABLED */
      /* .cursor-dot {
        width: 8px;
        height: 8px;
        background: var(--accent-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
      }

      .cursor-outline {
        width: 40px;
        height: 40px;
        border: 2px solid var(--accent-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9998;
        transition: all 0.3s ease;
        opacity: 0.5;
      } */

      /* Loading States */
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200px 100%;
        animation: shimmer 1.5s infinite;
      }

      /* Modern Cards */
      .modern-card {
        background: var(--bg-primary);
        border-radius: 16px;
        box-shadow: var(--shadow-md);
        border: 1px solid var(--border-light);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .modern-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-xl);
        border-color: var(--border-medium);
      }

      /* Buttons */
      .btn-modern {
        background: var(--primary-color);
        color: var(--secondary-color);
        border: none;
        border-radius: 12px;
        padding: 12px 24px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }

      .btn-modern::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
      }

      .btn-modern:hover::before {
        left: 100%;
      }

      .btn-modern:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }

      /* Reduced Motion */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `
    document.head.appendChild(style)

    // Enhanced scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    })

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in')
    animatedElements.forEach(el => observer.observe(el))

    // Enhanced scroll handling
    const handleScroll = () => {
      if (typeof window === 'undefined') return
      
      const scrollTop = window.scrollY
      const scrollProgress = document.querySelector('.scroll-progress')
      
      // Calculate scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      
      if (scrollProgress) {
        scrollProgress.style.width = `${progress}%`
      }
      
      // Determine scroll direction
      if (scrollTop > lastScrollY && scrollTop > 100) {
        setScrollDirection('down')
      } else if (scrollTop < lastScrollY) {
        setScrollDirection('up')
      }
      setLastScrollY(scrollTop)

      // Update active section
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
        setCurrentSection(current)
      }

      // Parallax effect for background elements
      const parallaxElements = document.querySelectorAll('.parallax')
      parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5
        const yPos = -(scrollTop * speed)
        el.style.transform = `translateY(${yPos}px)`
      })
    }

    // Add scroll progress bar
    if (!document.querySelector('.scroll-progress')) {
      const scrollProgressBar = document.createElement('div')
      scrollProgressBar.className = 'scroll-progress'
      document.body.appendChild(scrollProgressBar)
    }

    // Add custom cursor - DISABLED
    // const addCustomCursor = () => {
    //   if (window.innerWidth > 768) {
    //     const cursorDot = document.createElement('div')
    //     cursorDot.className = 'cursor-dot'
    //     const cursorOutline = document.createElement('div')
    //     cursorOutline.className = 'cursor-outline'
        
    //     document.body.appendChild(cursorDot)
    //     document.body.appendChild(cursorOutline)

    //     document.addEventListener('mousemove', (e) => {
    //       cursorDot.style.left = e.clientX + 'px'
    //       cursorDot.style.top = e.clientY + 'px'
    //       cursorOutline.style.left = e.clientX - 20 + 'px'
    //       cursorOutline.style.top = e.clientY - 20 + 'px'
    //     })
    //   }
    // }

    // addCustomCursor()
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [lastScrollY])

  if (isLoading) {
    return <Loading onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div 
      ref={containerRef}
      style={styles.container} 
      className="container-lock bg-pattern"
    >
      {/* Floating Background Elements */}
      <div style={styles.floatingElements}>
        <div className="floating-element" style={{...styles.floatingShape, top: '10%', left: '5%'}} />
        <div className="floating-element" style={{...styles.floatingShape, top: '20%', right: '10%', animationDelay: '-2s'}} />
        <div className="floating-element" style={{...styles.floatingShape, bottom: '30%', left: '8%', animationDelay: '-4s'}} />
        <div className="floating-element" style={{...styles.floatingShape, bottom: '10%', right: '5%', animationDelay: '-1s'}} />
      </div>

      {/* Interactive Background Gradient */}
      <div 
        style={{
          ...styles.interactiveBackground,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(102, 126, 234, 0.05), transparent 40%)`
        }}
      />

      <Me_Intro scrollDirection={scrollDirection} />
      <AboutMe scrollDirection={scrollDirection} />
      <Work scrollDirection={scrollDirection} />
      <Projects scrollDirection={scrollDirection} />
      <Contact scrollDirection={scrollDirection} />
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    width: '100%',
    overflowX: 'hidden',
    position: 'relative'
  },
  floatingElements: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: -2
  },
  floatingShape: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
    filter: 'blur(1px)'
  },
  interactiveBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: -1,
    transition: 'background 0.3s ease'
  }
}