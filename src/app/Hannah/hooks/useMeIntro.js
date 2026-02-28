'use client'

import { useEffect, useState, useCallback } from 'react'

export const useMeIntro = () => {
  const [mounted, setMounted] = useState(false)
  const [currentGreeting, setCurrentGreeting] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [elementVisible, setElementVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  })

const greetings = [
  "Digital Made Simple",
  "Build Useful Apps",
  "Ideas to Web",
  "Learn Through Code",
  "Practical Builds",
  "Modern Web",
  "Better Each Project",
  "Built with Purpose",
  "Always Improving",
  "Forever Learning",
  "Grow Daily",
  "Build & Learn",
  "Code & Create",
  "Design. Develop.",
  "Simple & Functional",
  "Vision to Digital",
  "Web Solutions",
  "Driven by Curiosity",
  "Craft Web",
  "Creative Dev",
  "Learn by Doing",
  "Build with Intent",
  "Create. Improve.",
  "Develop Daily",
  "Idea to Launch"
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

  // Enhanced responsive values function
  const getResponsiveValue = (desktop, tablet, mobile) => {
    if (windowSize.width < 480) return mobile // Small mobile
    if (windowSize.width < 768) return mobile // Mobile
    if (windowSize.width < 1024) return tablet // Tablet
    return desktop // Desktop
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
      setShowScrollTop(scrollTop > 300)

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
        }, 2500)
      }
    }, 60)

    return () => clearInterval(typingInterval)
  }, [currentGreeting])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
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

  return {
    mounted,
    currentGreeting,
    displayText,
    isTyping,
    activeSection,
    isScrolled,
    isVisible,
    elementVisible,
    mousePosition,
    showScrollTop,
    windowSize,
    greetings,
    socialLinks,
    getResponsiveValue,
    scrollToSection,
    generateParticles
  }
}