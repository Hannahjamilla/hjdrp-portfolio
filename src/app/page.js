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
  const containerRef = useRef(null)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  useEffect(() => {
    // Add global styles for Poppins font and scroll transitions
    const style = document.createElement('style')
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif !important;
      }
      
      html {
        scroll-behavior: smooth;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      
      body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        font-family: 'Poppins', sans-serif;
        background: #ffffff;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Responsive font sizes */
      @media (max-width: 768px) {
        html {
          font-size: 14px;
        }
      }
      
      @media (max-width: 480px) {
        html {
          font-size: 13px;
        }
      }
      
      /* Ensure images are responsive */
      img {
        max-width: 100%;
        height: auto;
        display: block;
      }
      
      /* Smooth scrolling for older browsers */
      @media (prefers-reduced-motion: no-preference) {
        html {
          scroll-behavior: smooth;
        }
      }
      
      /* Focus styles for accessibility */
      button:focus-visible,
      a:focus-visible {
        outline: 2px solid #000000;
        outline-offset: 2px;
      }
      
      /* Prevent horizontal scroll */
      .container-lock {
        overflow-x: hidden;
        width: 100%;
        position: relative;
      }
    `
    document.head.appendChild(style)

    // Initialize scroll animations
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
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-in-up').forEach(el => {
      observer.observe(el)
    })

    // Handle scroll direction and transitions
    const handleScroll = () => {
      if (typeof window === 'undefined') return
      
      const scrollTop = window.scrollY
      const stickyNav = document.querySelector('.sticky-nav')
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
      
      // Handle sticky nav
      if (stickyNav) {
        if (scrollTop > 100) {
          stickyNav.classList.add('visible')
          stickyNav.classList.remove('hidden')
        } else {
          stickyNav.classList.remove('visible')
          stickyNav.classList.add('hidden')
        }
      }

      // Update active section based on scroll position
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
    }

    // Add scroll progress bar
    const scrollProgressBar = document.createElement('div')
    scrollProgressBar.className = 'scroll-progress'
    document.body.appendChild(scrollProgressBar)

    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
      window.removeEventListener('scroll', handleScroll)
      const progressBar = document.querySelector('.scroll-progress')
      if (progressBar && document.body.contains(progressBar)) {
        document.body.removeChild(progressBar)
      }
    }
  }, [lastScrollY, scrollDirection])

  if (isLoading) {
    return <Loading onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div 
      ref={containerRef}
      style={styles.container} 
      className="container-lock"
    >
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
    fontFamily: "'Poppins', sans-serif",
    width: '100%',
    overflowX: 'hidden'
  }
}