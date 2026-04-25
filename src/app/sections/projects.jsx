'use client'

import { useEffect, useState } from 'react'
import ProjectDrawer from './components/project-drawer'

export default function Projects({ scrollDirection = 'down' }) {
  const [mounted, setMounted] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  })

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setIsVisible(true), 500)
    
    // Cleanup function to restore body scroll on unmount
    return () => {
      clearTimeout(timer)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
    }
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
    bgPrimary: '#d8e2dc',
    bgSecondary: '#f5f1ed',
    bgTertiary: '#e8ebe8',
    textPrimary: '#2D5A4F',
    textSecondary: '#6B5B52',
    textMuted: '#8B7355',
    accentColor: '#2D5A4F',
    borderLight: 'rgba(45, 90, 79, 0.15)',
    borderMedium: 'rgba(45, 90, 79, 0.25)',
    success: '#10b981',
    warning: '#f59e0b',
    info: '#3b82f6'
  }

  const projects = [
    {
      id: 1,
      title: "BaryoConnect",
      subtitle: "Smart Community Mobile Application",
      description: "Mobile application designed to enhance community engagement and streamline local governance through digital connectivity.",
      fullDescription: "Led the development and presentation at PSITE-Central Luzon IRCITE 2025. The application bridges local government and residents through real-time communication, service requests, and digital governance tools.",
      images: ["/images/15.webp", "/images/16.webp", "/images/Ircite.webp"],
      role: "Project Manager / Presenter",
      badge: "IRCITE",
      tech: ["Dart", "Firebase", "Flutter", "Google Maps API"],
      year: "2025"
    },
    {
      id: 2,
      title: "DialEase",
      subtitle: "CAPD Healthcare Management System",
      description: "Comprehensive healthcare platform for remote monitoring of Continuous Ambulatory Peritoneal Dialysis patients.",
      fullDescription: "Developed a responsive healthcare management system enabling remote patient monitoring, treatment tracking, and healthcare provider access. Built with modern web technologies for optimal performance.",
      images: ["/images/10.webp", "/images/11.webp", "/images/12.webp"],
      role: "Web Developer",
      badge: "Capstone",
      tech: ["React", "Laravel", "MySQL / cloud SQL", "REST API"],
      year: "2024"
    },
    {
      id: 3,
      title: "Academic Projects",
      description: "Collection of academic research projects and software development initiatives.",
      fullDescription: "A showcase of innovative university projects in business automation and learning technology",
      images: ["/images/2.webp", "/images/3.webp", "/images/4.webp", "/images/5.webp", "/images/7.webp", "/images/8.webp", "/images/POS2.webp", "/images/POS2.webp", "/images/tutorial.webp", "/images/tutorial2.webp", "/images/paper.webp"],
      role: "Full Stack Developer",
      badge: "Projects",
      tech: ["PHP", "CSS", "JavaScript", "MySQL", "Bootstrap"],
      year: "2023-2024"
    }
  ]

  const academicProjects = [
    {
      title: "Baliug Drug Store POS",
      description: "Point of Sale system with comprehensive inventory management, sales analytics, and reporting capabilities.",
      images: ["/images/2.webp", "/images/3.webp", "/images/4.webp", "/images/5.webp", "/images/POS2.webp", "/images/POS2.webp"],
      role: "Full Stack Developer"
    },
    {
      title: "Tutorial Center Platform",
      description: "Interactive learning management system with course organization and student progress monitoring.",
      images: ["/images/7.webp", "/images/8.webp", "/images/tutorial.webp", "/images/tutorial2.webp"],
      role: "Full Stack Developer"
    },
    {
      title: "Event & Venue Rental Ecosystem",
      description: "DEVELOPMENT OF AN INNOVATIVE EVENT AND VENUE RENTAL ECOSYSTEM THROUGH UNIFICATION OF BILLING, PAYMENT PROCESSING, AND INVENTORY SYSTEMS",
      images: ["/images/paper.webp"],
      role: "Co-Developer / Research Contributor"
    }
  ]

  const getCurrentAcademicProject = () => {
    if (!selectedProject || selectedProject.title !== "Academic Projects") return null
    const currentImage = selectedProject.images[selectedImageIndex]
    return academicProjects.find(proj => proj.images.includes(currentImage)) || academicProjects[0]
  }

  const openProject = (project) => {
    setSelectedProject(project)
    setSelectedImageIndex(0)
    // Hide navigation
    const nav = document.querySelector('nav')
    if (nav) nav.style.display = 'none'
  }

  const closeProject = () => {
    setSelectedProject(null)
    setSelectedImageIndex(0)
    // Show navigation
    const nav = document.querySelector('nav')
    if (nav) nav.style.display = ''
  }

  const selectImage = (index) => {
    setSelectedImageIndex(index)
  }

  useEffect(() => {
    if (mounted) {
      const style = document.createElement('style');
      style.textContent = `
        .project-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          position: relative;
        }

        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .project-card:hover .card-image {
          transform: scale(1.05);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-overlay {
          animation: fadeIn 0.3s ease;
        }

        /* Responsive styles */
        @media (max-width: 1024px) {
          .project-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .project-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
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

  const isAcademicProject = selectedProject?.title === "Academic Projects"
  const currentAcademicProject = getCurrentAcademicProject()

  return (
    <div>
      <div style={{
        minHeight: '100vh',
        background: theme.bgPrimary,
        padding: getResponsiveValue('60px 40px', '50px 30px', '40px 20px'),
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(50px)' : 'translateY(-50px)'),
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        position: 'relative',
        overflow: 'hidden',
      }} id="projects" className="force-light">
        
        {/* Background Graphics - Removed for performance */}

        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Enhanced Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: getResponsiveValue(50, 40, 30),
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease 0.2s',
          }}>
            <h1 style={{
              fontSize: getResponsiveValue('3.5rem', '3rem', '2.5rem'),
              fontWeight: '900',
              marginBottom: getResponsiveValue(15, 12, 10),
              color: theme.textPrimary,
              letterSpacing: '-0.04em',
              textShadow: '0 2px 4px rgba(0,0,0,0.05)',
              lineHeight: 0.9,
              textTransform: 'uppercase',
            }} className="force-light-text">
              <span style={{
                color: '#6C131F',
              }}>
                Project
              </span>{' '}
              <span style={{
                color: theme.accentColor,
                position: 'relative',
                display: 'inline-block',
              }}>
                Portfolio
                <span style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: '0',
                  width: '100%',
                  height: '6px',
                  backgroundColor: theme.accentColor,
                  opacity: 0.2,
                  borderRadius: '3px',
                }}></span>
                <span style={{
                  position: 'absolute',
                  bottom: '-12px',
                  left: '10%',
                  width: '80%',
                  height: '3px',
                  backgroundColor: theme.accentColor,
                  opacity: 0.4,
                  borderRadius: '2px',
                }}></span>
              </span>
            </h1>
            <p style={{
              fontSize: getResponsiveValue('1.2rem', '1.1rem', '1rem'),
              color: theme.textMuted,
              fontWeight: '400',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.7,
              opacity: 0.9,
              position: 'relative',
            }} className="force-light-text">
              <span style={{
                color: '#A14B58',
              }}>
                Crafting digital solutions with
              </span>{' '}
              <span style={{ 
                color: theme.textSecondary, 
                fontWeight: '600',
              }}>
                innovation and precision
              </span>
            </p>
          </div>

          {/* Project Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: getResponsiveValue('repeat(3, 1fr)', 'repeat(2, 1fr)', '1fr'),
            gap: getResponsiveValue(25, 20, 15),
            marginBottom: getResponsiveValue(40, 30, 25),
            alignItems: 'stretch',
          }} className="project-grid">
            {projects.map((project, index) => (
              <div
                key={project.id}
                style={{
                  background: theme.bgPrimary,
                  border: `2px solid ${theme.borderLight}`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  transitionDelay: `${0.3 + index * 0.1}s`,
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                className="project-card force-light force-light-border"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  openProject(project)
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Project Image */}
                <div style={{
                  width: '100%',
                  height: getResponsiveValue(220, 200, 180),
                  overflow: 'hidden',
                  position: 'relative',
                  background: theme.bgSecondary,
                  flexShrink: 0,
                }} className="force-light-bg-secondary">
                  <img 
                    src={project.images[0]} 
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    className="card-image"
                  />
                  
                  {/* Overlay on hover */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    opacity: hoveredCard === index ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '15px',
                  }}>
                    <div style={{
                      color: '#ffffff',
                      fontSize: getResponsiveValue('0.85rem', '0.8rem', '0.75rem'),
                      fontWeight: '600',
                    }}>
                      Click to view details →
                    </div>
                  </div>

                  {/* Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    background: theme.accentColor,
                    color: theme.bgPrimary,
                    padding: getResponsiveValue('6px 12px', '5px 10px', '4px 8px'),
                    borderRadius: '20px',
                    fontSize: getResponsiveValue('0.75rem', '0.7rem', '0.65rem'),
                    fontWeight: '800',
                    letterSpacing: '0.5px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  }}>
                    {project.badge}
                  </div>
                </div>

                {/* Project Info */}
                <div style={{
                  padding: getResponsiveValue('20px', '18px', '16px'),
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }} className="card-content">
                  <h3 style={{
                    fontSize: getResponsiveValue('1.2rem', '1.1rem', '1rem'),
                    fontWeight: '800',
                    color: theme.textPrimary,
                    marginBottom: '8px',
                    lineHeight: 1.2,
                  }} className="force-light-text">
                    {project.title}
                  </h3>
                  
                  {project.subtitle && (
                    <p style={{
                      fontSize: getResponsiveValue('0.85rem', '0.8rem', '0.75rem'),
                      color: theme.textMuted,
                      marginBottom: '10px',
                      fontWeight: '500',
                    }} className="force-light-text">
                      {project.subtitle}
                    </p>
                  )}

                  <p style={{
                    fontSize: getResponsiveValue('0.8rem', '0.75rem', '0.7rem'),
                    color: theme.textSecondary,
                    lineHeight: 1.5,
                    marginBottom: '12px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    flex: 1,
                  }} className="force-light-text card-description">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '12px',
                  }}>
                    {project.tech.slice(0, 3).map((tech, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '5px 10px',
                          background: theme.bgSecondary,
                          border: `1px solid ${theme.borderLight}`,
                          borderRadius: '10px',
                          fontSize: getResponsiveValue('0.7rem', '0.65rem', '0.6rem'),
                          fontWeight: '600',
                          color: theme.textPrimary,
                        }}
                        className="force-light-bg-secondary force-light-border force-light-text"
                      >
                        {tech}
                      </div>
                    ))}
                    {project.tech.length > 3 && (
                      <div style={{
                        padding: '5px 10px',
                        background: `${theme.accentColor}10`,
                        border: `1px solid ${theme.accentColor}30`,
                        borderRadius: '10px',
                        fontSize: getResponsiveValue('0.7rem', '0.65rem', '0.6rem'),
                        fontWeight: '700',
                        color: theme.accentColor,
                      }}>
                        +{project.tech.length - 3} more
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '12px',
                    borderTop: `1px solid ${theme.borderLight}`,
                  }} className="force-light-border">
                    <div style={{
                      fontSize: getResponsiveValue('0.75rem', '0.7rem', '0.65rem'),
                      color: theme.textMuted,
                      fontWeight: '600',
                    }} className="force-light-text">
                      {project.year}
                    </div>
                    <div style={{
                      fontSize: getResponsiveValue('0.75rem', '0.7rem', '0.65rem'),
                      color: theme.accentColor,
                      fontWeight: '700',
                    }}>
                      View Project →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel Drawer */}
        <ProjectDrawer
          selectedProject={selectedProject}
          selectedImageIndex={selectedImageIndex}
          onClose={closeProject}
          onSelectImage={selectImage}
          theme={theme}
          getResponsiveValue={getResponsiveValue}
          academicProjects={academicProjects}
        />
      </div>
    </div>
  )
}