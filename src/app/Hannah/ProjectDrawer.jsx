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

  useEffect(() => {
    setMounted(true)
  }, [])

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
    ? academicProjects.find(proj => proj.images.includes(selectedProject.images[selectedImageIndex])) || academicProjects[0]
    : null

  const drawerContent = (
    <>
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
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
      `}</style>
      
      {/* Overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.75)',
          zIndex: 2147483646,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          animation: 'fadeIn 0.2s ease-out',
        }}
        className="drawer-overlay"
        onClick={onClose}
      />
      
      {/* Side Drawer */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: getResponsiveValue('700px', '600px', '100%'),
          height: '100vh',
          background: theme.bgPrimary,
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
          overflowY: 'auto',
          overflowX: 'hidden',
          animation: 'slideInRight 0.3s ease-out',
          zIndex: 2147483647,
        }}
        className="drawer-content force-light side-drawer-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: theme.accentColor,
            color: theme.bgPrimary,
            border: 'none',
            fontSize: '1.8rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1) rotate(90deg)'
            e.target.style.background = '#333'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) rotate(0deg)'
            e.target.style.background = theme.accentColor
          }}
        >
          ×
        </button>

        {/* Drawer Content */}
        <div style={{
          padding: getResponsiveValue('40px 35px', '35px 30px', '30px 25px'),
          paddingTop: '80px',
        }}>
          {/* Header Section */}
          <div style={{
            marginBottom: '30px',
            textAlign: 'center',
          }}>
            <div style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              <div style={{
                padding: '10px 20px',
                background: theme.accentColor,
                color: theme.bgPrimary,
                borderRadius: '14px',
                fontSize: '0.9rem',
                fontWeight: '700',
              }}>
                {selectedProject.badge}
              </div>
              <div style={{
                padding: '10px 20px',
                background: theme.bgSecondary,
                color: theme.textPrimary,
                borderRadius: '14px',
                fontSize: '0.9rem',
                fontWeight: '700',
              }} className="force-light-bg-secondary force-light-text">
                {selectedProject.year}
              </div>
              <div style={{
                padding: '10px 20px',
                background: `${theme.accentColor}10`,
                color: theme.accentColor,
                borderRadius: '14px',
                fontSize: '0.9rem',
                fontWeight: '700',
              }}>
                {selectedProject.role}
              </div>
            </div>

            <h2 style={{
              fontSize: getResponsiveValue('2rem', '1.8rem', '1.6rem'),
              fontWeight: '900',
              color: theme.textPrimary,
              marginBottom: '12px',
              lineHeight: 1.2,
            }} className="force-light-text">{selectedProject.title}</h2>
            
            {selectedProject.subtitle && (
              <p style={{
                fontSize: getResponsiveValue('1.1rem', '1rem', '0.95rem'),
                color: theme.textMuted,
                marginBottom: '18px',
                fontWeight: '500',
              }} className="force-light-text">{selectedProject.subtitle}</p>
            )}

            <p style={{
              fontSize: getResponsiveValue('1rem', '0.95rem', '0.9rem'),
              color: theme.textPrimary,
              lineHeight: 1.7,
              textAlign: 'left',
            }} className="force-light-text">
              {selectedProject.fullDescription}
            </p>
          </div>

          {/* Main Image */}
          <div style={{
            width: '100%',
            marginBottom: '25px',
          }}>
            <div style={{
              width: '100%',
              height: getResponsiveValue(350, 320, 280),
              borderRadius: '16px',
              overflow: 'hidden',
              background: theme.bgSecondary,
              border: `2px solid ${theme.borderLight}`,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }} className="force-light-bg-secondary force-light-border">
              <img 
                src={selectedProject.images[selectedImageIndex]} 
                alt={selectedProject.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
              {/* Image Counter */}
              <div style={{
                position: 'absolute',
                bottom: '15px',
                right: '15px',
                background: 'rgba(0, 0, 0, 0.8)',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '25px',
                fontSize: '0.85rem',
                fontWeight: '700',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              }}>
                {selectedImageIndex + 1} / {selectedProject.images.length}
              </div>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div 
            style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '30px',
              overflowX: 'auto',
              overflowY: 'hidden',
              padding: '10px 0',
              scrollBehavior: 'smooth',
            }} 
            className="thumbnail-gallery-scroll"
            onWheel={(e) => {
              e.preventDefault()
              const container = e.currentTarget
              container.scrollLeft += e.deltaY > 0 ? 100 : -100
            }}
            onTouchStart={(e) => {
              const container = e.currentTarget
              container.touchStartX = e.touches[0].clientX
              container.scrollStartX = container.scrollLeft
            }}
            onTouchMove={(e) => {
              e.preventDefault()
              const container = e.currentTarget
              if (container.touchStartX) {
                const touchX = e.touches[0].clientX
                const diff = container.touchStartX - touchX
                container.scrollLeft = container.scrollStartX + diff
              }
            }}
            onTouchEnd={(e) => {
              const container = e.currentTarget
              container.touchStartX = null
              container.scrollStartX = null
            }}
          >
            {selectedProject.images.map((image, idx) => (
              <div
                key={idx}
                onClick={() => onSelectImage(idx)}
                style={{
                  minWidth: getResponsiveValue(90, 80, 75),
                  height: getResponsiveValue(90, 80, 75),
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: `3px solid ${idx === selectedImageIndex ? theme.accentColor : theme.borderLight}`,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.3s ease',
                  background: theme.bgSecondary,
                  boxShadow: idx === selectedImageIndex ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
                }}
                className="force-light-border force-light-bg-secondary"
                onMouseEnter={(e) => {
                  if (idx !== selectedImageIndex) {
                    e.currentTarget.style.transform = 'scale(1.05)'
                    e.currentTarget.style.borderColor = theme.accentColor
                  }
                }}
                onMouseLeave={(e) => {
                  if (idx !== selectedImageIndex) {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.borderColor = theme.borderLight
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
                  }}
                />
              </div>
            ))}
          </div>

          {/* Technologies */}
          <div style={{
            marginBottom: '30px',
          }}>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: '800',
              color: theme.textPrimary,
              marginBottom: '15px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }} className="force-light-text">Technologies Used</h4>
            
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}>
              {selectedProject.tech.map((tech, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px 18px',
                    background: theme.bgSecondary,
                    border: `2px solid ${theme.borderLight}`,
                    borderRadius: '18px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: theme.textPrimary,
                    transition: 'all 0.3s ease',
                  }}
                  className="tech-pill force-light-bg-secondary force-light-border force-light-text"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Academic Project Details */}
          {isAcademicProject && currentAcademicProject && (
            <div style={{
              padding: '25px',
              background: theme.bgSecondary,
              borderRadius: '16px',
              border: `2px solid ${theme.borderLight}`,
            }} className="force-light-bg-secondary force-light-border">
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: '800',
                color: theme.textPrimary,
                marginBottom: '12px',
              }} className="force-light-text">
                {currentAcademicProject.title}
              </h4>
              <div style={{
                fontSize: '0.9rem',
                fontWeight: '700',
                color: theme.textMuted,
                marginBottom: '10px',
              }} className="force-light-text">
                Role: {currentAcademicProject.role}
              </div>
              <p style={{
                fontSize: '0.9rem',
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
