'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function ProjectDrawer({ 
  selectedProject, 
  selectedImageIndex, 
  onClose, 
  onSelectImage, 
  theme, 
  getResponsiveValue,
  academicProjects 
}) {
  const [mounted, setMounted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Window resize handler
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

  // Auto image slider
  useEffect(() => {
    if (!selectedProject || selectedProject.images.length <= 1) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentImageIndex(prev => 
          prev === selectedProject.images.length - 1 ? 0 : prev + 1
        )
        setIsTransitioning(false)
      }, 150) // Half of transition duration
    }, 5000)

    return () => clearInterval(interval)
  }, [selectedProject])

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(selectedImageIndex || 0)
  }, [selectedProject, selectedImageIndex])

  // Handle manual image selection
  const handleImageSelect = (index) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentImageIndex(index)
      onSelectImage(index)
      setIsTransitioning(false)
    }, 150)
  }

  useEffect(() => {
    if (selectedProject) {
      // Prevent body scroll WITHOUT moving the page
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      
      return () => {
        // Restore body scroll
        document.documentElement.style.overflow = ''
        document.body.style.overflow = ''
      }
    }
  }, [selectedProject])

  if (!selectedProject || !mounted) return null

  const isAcademicProject = selectedProject?.title === "Academic Projects"
  const currentAcademicProject = isAcademicProject 
    ? academicProjects.find(proj => proj.images.includes(selectedProject.images[currentImageIndex])) || academicProjects[0]
    : null

  const drawerContent = (
    <>
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes imageSlide {
          from {
            opacity: 0;
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .image-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .drawer-content {
          scrollbar-width: thin;
          scrollbar-color: rgba(0,0,0,0.2) transparent;
        }

        .drawer-content::-webkit-scrollbar {
          width: 8px;
        }

        .drawer-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .drawer-content::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.2);
          border-radius: 4px;
        }

        .drawer-content::-webkit-scrollbar {
          width: 8px;
        }

        .drawer-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .drawer-content::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.2);
          border-radius: 4px;
        }

        .drawer-content::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.3);
        }

        .thumbnail-gallery-scroll::-webkit-scrollbar {
          height: 6px;
        }

        .thumbnail-gallery-scroll::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 3px;
        }

        .thumbnail-gallery-scroll::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.2);
          border-radius: 3px;
        }

        .thumbnail-gallery-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.3);
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        /* Enhanced mobile styles */
        @media (max-width: 768px) {
          .drawer-content {
            border-radius: 20px 20px 0 0 !important;
          }
          
          .thumbnail-gallery-scroll {
            padding-bottom: 15px !important;
          }
        }

        /* Smooth transitions for all interactive elements */
        .tech-pill, .thumbnail-image, .nav-arrow {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
      `}</style>
      
      {/* Enhanced Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          background: isMobile 
            ? 'rgba(255, 255, 255, 0.85)' 
            : 'rgba(255, 255, 255, 0.75)',
          zIndex: 2147483646,
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.3s ease-out',
        }}
        className="drawer-overlay"
        onClick={onClose}
      />
      
      {/* Enhanced Drawer */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: isMobile ? '100vw' : isTablet ? '85vw' : '900px',
          maxWidth: isMobile ? '100vw' : '900px',
          height: '100vh',
          background: `linear-gradient(135deg, ${theme.bgPrimary} 0%, ${theme.bgSecondary} 100%)`,
          boxShadow: isMobile 
            ? 'none' 
            : '-15px 0 40px rgba(0, 0, 0, 0.3)',
          overflowY: 'auto',
          overflowX: 'hidden',
          animation: isMobile ? 'slideInUp 0.4s ease-out' : 'slideInRight 0.4s ease-out',
          zIndex: 2147483647,
          border: isMobile ? 'none' : `1px solid ${theme.borderLight}`,
        }}
        className="drawer-content force-light"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: isMobile ? '20px' : '25px',
            right: isMobile ? '20px' : '25px',
            width: isMobile ? '48px' : '50px',
            height: isMobile ? '48px' : '50px',
            borderRadius: '50%',
            background: theme.accentColor,
            color: theme.bgPrimary,
            border: 'none',
            fontSize: isMobile ? '1.8rem' : '1.8rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 8px 20px rgba(108, 19, 31, 0.3)',
            touchAction: 'manipulation',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1) rotate(90deg)'
            e.target.style.background = theme.textSecondary
            e.target.style.boxShadow = '0 12px 30px rgba(108, 19, 31, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) rotate(0deg)'
            e.target.style.background = theme.accentColor
            e.target.style.boxShadow = '0 8px 20px rgba(108, 19, 31, 0.3)'
          }}
        >
          ×
        </button>

        {/* Enhanced Content Container */}
        <div style={{
          padding: isMobile 
            ? '70px 20px 30px' 
            : isTablet 
            ? '80px 35px 40px' 
            : '90px 50px 50px',
          maxWidth: isMobile ? '100%' : '100%',
          margin: '0 auto',
        }}>
          {/* Enhanced Header Section */}
          <div style={{
            marginBottom: isMobile ? '30px' : '40px',
            textAlign: isMobile ? 'left' : 'center',
            position: 'relative',
          }}>
            {/* Decorative header background */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: isMobile ? '200px' : '300px',
              height: '100px',
              background: `linear-gradient(135deg, ${theme.accentColor}05, transparent)`,
              borderRadius: '50px',
              zIndex: -1,
            }}></div>

            {/* Project Badges */}
            <div style={{
              display: 'flex',
              gap: isMobile ? '10px' : '15px',
              marginBottom: isMobile ? '20px' : '30px',
              flexWrap: 'wrap',
              justifyContent: isMobile ? 'flex-start' : 'center',
            }}>
              <div style={{
                padding: isMobile ? '10px 18px' : '14px 28px',
                background: theme.accentColor,
                color: theme.bgPrimary,
                borderRadius: isMobile ? '15px' : '20px',
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                boxShadow: '0 6px 20px rgba(108, 19, 31, 0.25)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,236,234,0.2), transparent)',
                  animation: 'shimmer 2s infinite',
                }}></div>
                {selectedProject.badge}
              </div>
              <div style={{
                padding: isMobile ? '10px 18px' : '14px 28px',
                background: `linear-gradient(135deg, ${theme.bgSecondary} 0%, ${theme.bgTertiary || theme.bgSecondary} 100%)`,
                color: theme.textPrimary,
                borderRadius: isMobile ? '15px' : '20px',
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                fontWeight: '700',
                border: `2px solid ${theme.borderLight}`,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              }} className="force-light-bg-secondary force-light-text force-light-border">
                {selectedProject.year}
              </div>
              <div style={{
                padding: isMobile ? '10px 18px' : '14px 28px',
                background: `${theme.accentColor}20`,
                color: theme.accentColor,
                borderRadius: isMobile ? '15px' : '20px',
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                fontWeight: '700',
                border: `2px solid ${theme.accentColor}40`,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              }}>
                {selectedProject.role}
              </div>
            </div>

            {/* Project Title with enhanced styling */}
            <h2 style={{
              fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
              fontWeight: '900',
              color: theme.textPrimary,
              marginBottom: isMobile ? '12px' : '20px',
              lineHeight: 1.1,
              background: isMobile 
                ? 'none' 
                : '#6C131F',
              WebkitBackgroundClip: isMobile ? 'unset' : 'text',
              WebkitTextFillColor: isMobile ? theme.textPrimary : 'transparent',
              backgroundClip: isMobile ? 'unset' : 'text',
              textShadow: isMobile ? 'none' : '0 2px 4px rgba(0,0,0,0.1)',
              position: 'relative',
            }} className="force-light-text">
              {selectedProject.title}
              {/* Underline decoration */}
              <div style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: isMobile ? '60px' : '80px',
                height: '4px',
                background: `linear-gradient(90deg, transparent, ${theme.accentColor}, transparent)`,
                borderRadius: '2px',
              }}></div>
            </h2>
            
            {/* Project Subtitle */}
            {selectedProject.subtitle && (
              <p style={{
                fontSize: isMobile ? '1.1rem' : isTablet ? '1.2rem' : '1.3rem',
                color: theme.textMuted,
                marginBottom: isMobile ? '15px' : '25px',
                fontWeight: '500',
                lineHeight: 1.4,
                fontStyle: 'italic',
              }} className="force-light-text">{selectedProject.subtitle}</p>
            )}

            {/* Project Description with better formatting */}
            <div style={{
              background: `linear-gradient(135deg, ${theme.bgSecondary}50 0%, transparent 100%)`,
              padding: isMobile ? '20px' : '25px',
              borderRadius: isMobile ? '15px' : '20px',
              border: `1px solid ${theme.borderLight}`,
              position: 'relative',
            }} className="force-light-border">
              <p style={{
                fontSize: isMobile ? '0.95rem' : isTablet ? '1rem' : '1.1rem',
                color: theme.textPrimary,
                lineHeight: 1.8,
                textAlign: 'left',
                margin: 0,
                position: 'relative',
                zIndex: 1,
              }} className="force-light-text">
                {selectedProject.fullDescription}
              </p>
              {/* Quote mark decoration */}
              <div style={{
                position: 'absolute',
                top: '10px',
                left: '15px',
                fontSize: '3rem',
                color: `${theme.accentColor}30`,
                fontFamily: 'serif',
                lineHeight: 1,
                zIndex: 0,
              }}>"</div>
            </div>
          </div>

          {/* Enhanced Image Section with Auto Slider */}
          <div style={{
            width: '100%',
            marginBottom: isMobile ? '25px' : '35px',
            position: 'relative',
          }}>
            {/* Section Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: isMobile ? '15px' : '20px',
            }}>
              <h3 style={{
                fontSize: isMobile ? '1.1rem' : '1.3rem',
                fontWeight: '800',
                color: theme.textPrimary,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }} className="force-light-text">
                <span style={{
                  width: '6px',
                  height: '20px',
                  background: theme.accentColor,
                  borderRadius: '3px',
                }}></span>
                Project Gallery
              </h3>
              
            </div>

            {/* Main Image Container */}
            <div style={{
              width: '100%',
              height: isMobile ? '280px' : isTablet ? '380px' : '450px',
              borderRadius: isMobile ? '15px' : '25px',
              overflow: 'hidden',
              background: `linear-gradient(135deg, ${theme.bgSecondary} 0%, ${theme.bgTertiary || theme.bgSecondary} 100%)`,
              border: `3px solid ${theme.borderLight}`,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isMobile 
                ? '0 10px 30px rgba(0, 0, 0, 0.15)' 
                : '0 20px 50px rgba(0, 0, 0, 0.2)',
            }} className="force-light-bg-secondary force-light-border">
              
              {/* Auto-sliding Image */}
              <img 
                src={selectedProject.images[currentImageIndex]} 
                alt={`${selectedProject.title} ${currentImageIndex + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  filter: isTransitioning ? 'blur(2px)' : 'blur(0px)',
                }}
                className="image-transition"
              />
              
              {/* Enhanced Image Counter & Controls */}
              <div style={{
                position: 'absolute',
                bottom: isMobile ? '15px' : '20px',
                right: isMobile ? '15px' : '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                {/* Progress bar */}
                <div style={{
                  width: isMobile ? '60px' : '80px',
                  height: '4px',
                  background: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <div style={{
                    width: `${((currentImageIndex + 1) / selectedProject.images.length) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #00ff00, #00cc00)',
                    borderRadius: '2px',
                    transition: 'width 0.3s ease',
                  }}></div>
                </div>
                
                {/* Image counter */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.9)',
                  color: '#ffffff',
                  padding: isMobile ? '8px 14px' : '10px 18px',
                  borderRadius: isMobile ? '25px' : '30px',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  fontWeight: '800',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                  {currentImageIndex + 1} / {selectedProject.images.length}
                </div>
              </div>

              {/* Enhanced Navigation Arrows (Desktop only) */}
              {!isMobile && selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={() => handleImageSelect(
                      currentImageIndex === 0 ? selectedProject.images.length - 1 : currentImageIndex - 1
                    )}
                    style={{
                      position: 'absolute',
                      left: '20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'rgba(0, 0, 0, 0.8)',
                      color: '#ffffff',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backdropFilter: 'blur(15px)',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(0, 0, 0, 0.95)'
                      e.target.style.transform = 'translateY(-50%) scale(1.1)'
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(0, 0, 0, 0.8)'
                      e.target.style.transform = 'translateY(-50%) scale(1)'
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    ‹
                  </button>
                  
                  <button
                    onClick={() => handleImageSelect(
                      currentImageIndex === selectedProject.images.length - 1 ? 0 : currentImageIndex + 1
                    )}
                    style={{
                      position: 'absolute',
                      right: '20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'rgba(0, 0, 0, 0.8)',
                      color: '#ffffff',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backdropFilter: 'blur(15px)',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(0, 0, 0, 0.95)'
                      e.target.style.transform = 'translateY(-50%) scale(1.1)'
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(0, 0, 0, 0.8)'
                      e.target.style.transform = 'translateY(-50%) scale(1)'
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    ›
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Enhanced Thumbnail Gallery */}
          <div 
            style={{
              display: 'flex',
              gap: isMobile ? '8px' : '15px',
              marginBottom: isMobile ? '25px' : '35px',
              overflowX: 'auto',
              overflowY: 'hidden',
              padding: isMobile ? '8px 0' : '12px 0',
              scrollBehavior: 'smooth',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(0,0,0,0.2) transparent',
            }} 
            className="thumbnail-gallery-scroll"
            onWheel={(e) => {
              e.preventDefault()
              const container = e.currentTarget
              container.scrollLeft += e.deltaY > 0 ? 100 : -100
            }}
          >
            {selectedProject.images.map((image, idx) => (
              <div
                key={idx}
                onClick={() => handleImageSelect(idx)}
                style={{
                  minWidth: isMobile ? '70px' : isTablet ? '85px' : '100px',
                  height: isMobile ? '70px' : isTablet ? '85px' : '100px',
                  borderRadius: isMobile ? '8px' : '12px',
                  overflow: 'hidden',
                  border: `3px solid ${idx === currentImageIndex ? theme.accentColor : theme.borderLight}`,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: `linear-gradient(135deg, ${theme.bgSecondary} 0%, ${theme.bgTertiary || theme.bgSecondary} 100%)`,
                  boxShadow: idx === currentImageIndex 
                    ? '0 8px 20px rgba(0, 0, 0, 0.2)' 
                    : '0 4px 12px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                }}
                className="force-light-border force-light-bg-secondary"
                onMouseEnter={(e) => {
                  if (idx !== currentImageIndex) {
                    e.currentTarget.style.transform = 'scale(1.05)'
                    e.currentTarget.style.borderColor = theme.accentColor
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (idx !== currentImageIndex) {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.borderColor = theme.borderLight
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <img 
                  src={image} 
                  alt={`${selectedProject.title} ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transition: 'transform 0.3s ease',
                  }}
                />
                
                {/* Active indicator */}
                {idx === currentImageIndex && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                  }}>
                    •
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Enhanced Technologies Section */}
          <div style={{
            marginBottom: isMobile ? '30px' : '40px',
            position: 'relative',
          }}>
            {/* Section Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: isMobile ? '20px' : '25px',
            }}>
              <h4 style={{
                fontSize: isMobile ? '1.2rem' : '1.4rem',
                fontWeight: '800',
                color: theme.textPrimary,
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }} className="force-light-text">
                Technologies Used
              </h4>
            </div>
            
            {/* Technologies Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile 
                ? 'repeat(auto-fit, minmax(130px, 1fr))' 
                : 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: isMobile ? '12px' : '15px',
              position: 'relative',
            }}>
              {selectedProject.tech.map((tech, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: isMobile ? '14px 18px' : '16px 22px',
                    background: `linear-gradient(135deg, ${theme.bgSecondary} 0%, ${theme.bgTertiary || theme.bgSecondary} 100%)`,
                    border: `2px solid ${theme.borderLight}`,
                    borderRadius: isMobile ? '12px' : '16px',
                    fontSize: isMobile ? '0.85rem' : '0.9rem',
                    fontWeight: '700',
                    color: theme.textPrimary,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'default',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                  }}
                  className="tech-pill force-light-bg-secondary force-light-border force-light-text"
                  onMouseEnter={(e) => {
                    e.target.style.background = theme.accentColor
                    e.target.style.color = '#FFECEA'
                    e.target.style.transform = 'translateY(-4px) scale(1.03)'
                    e.target.style.boxShadow = '0 12px 30px rgba(108, 19, 31, 0.2)'
                    e.target.style.borderColor = theme.accentColor
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = `${theme.bgSecondary}`
                    e.target.style.color = theme.textPrimary
                    e.target.style.transform = 'translateY(0) scale(1)'
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)'
                    e.target.style.borderColor = theme.borderLight
                  }}
                >
                  {/* Tech icon placeholder */}
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: `${theme.accentColor}60`,
                    transition: 'all 0.3s ease',
                  }}></div>
                  {tech}
                </div>
              ))}
            </div>
            
            {/* Decorative background */}
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '-20px',
              width: '100px',
              height: '100px',
              background: `radial-gradient(circle, ${theme.accentColor}08, transparent)`,
              borderRadius: '50%',
              zIndex: -1,
            }}></div>
          </div>

          {/* Enhanced Academic Project Details */}
          {isAcademicProject && currentAcademicProject && (
            <div style={{
              padding: isMobile ? '20px' : '30px',
              background: `linear-gradient(135deg, ${theme.bgSecondary} 0%, ${theme.bgTertiary || theme.bgSecondary} 100%)`,
              borderRadius: isMobile ? '12px' : '20px',
              border: `2px solid ${theme.borderLight}`,
              position: 'relative',
              overflow: 'hidden',
            }} className="force-light-bg-secondary force-light-border">
              {/* Decorative corner */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '60px',
                height: '60px',
                background: `linear-gradient(135deg, ${theme.accentColor}20, transparent)`,
                borderBottomLeftRadius: '20px',
              }}></div>
              
              <h4 style={{
                fontSize: isMobile ? '1.1rem' : '1.3rem',
                fontWeight: '800',
                color: theme.textPrimary,
                marginBottom: isMobile ? '8px' : '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }} className="force-light-text">
                {currentAcademicProject.title}
              </h4>
              <div style={{
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                fontWeight: '700',
                color: theme.textMuted,
                marginBottom: isMobile ? '8px' : '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }} className="force-light-text">
                Role: {currentAcademicProject.role}
              </div>
              <p style={{
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                color: theme.textPrimary,
                lineHeight: 1.7,
                margin: 0,
              }} className="force-light-text">
                {currentAcademicProject.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )

  return createPortal(drawerContent, document.body)
}
