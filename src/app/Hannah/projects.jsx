'use client'

import { useEffect, useState } from 'react'
import GlobalNavigation from '../components/GlobalNavigation'
import ProjectDrawer from './ProjectDrawer'

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
    bgPrimary: '#FFECEA',
    bgSecondary: '#ffffff',
    bgTertiary: '#f8f4f3',
    textPrimary: '#6C131F',
    textSecondary: '#A14B58',
    textMuted: '#A14B58',
    accentColor: '#6C131F',
    borderLight: 'rgba(108, 19, 31, 0.15)',
    borderMedium: 'rgba(108, 19, 31, 0.25)',
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
      images: ["/images/15.png", "/images/16.png", "/images/Ircite.png"],
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
      images: ["/images/10.png", "/images/11.png", "/images/12.png"],
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
      images: ["/images/2.png", "/images/3.png", "/images/4.png", "/images/5.png", "/images/7.png", "/images/8.png", "/images/POS.png", "/images/POS2.png", "/images/tutorial.png", "/images/tutorial2.png", "/images/paper.png"],
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
      images: ["/images/2.png", "/images/3.png", "/images/4.png", "/images/5.png", "/images/POS.png", "/images/POS2.png"],
      role: "Full Stack Developer"
    },
    {
      title: "Tutorial Center Platform",
      description: "Interactive learning management system with course organization and student progress monitoring.",
      images: ["/images/7.png", "/images/8.png", "/images/tutorial.png", "/images/tutorial2.png"],
      role: "Full Stack Developer"
    },
    {
      title: "Event & Venue Rental Ecosystem",
      description: "DEVELOPMENT OF AN INNOVATIVE EVENT AND VENUE RENTAL ECOSYSTEM THROUGH UNIFICATION OF BILLING, PAYMENT PROCESSING, AND INVENTORY SYSTEMS",
      images: ["/images/paper.png"],
      role: "Co-Developer / Research Contributor"
    }
  ]

  const getCurrentAcademicProject = () => {
    if (!selectedProject || selectedProject.title !== "Academic Projects") return null
    const currentImage = selectedProject.images[selectedImageIndex]
    return academicProjects.find(proj => proj.images.includes(currentImage)) || academicProjects[0]
  }

  const openProject = (project) => {
    console.log('Opening project:', project.title)
    setSelectedProject(project)
    setSelectedImageIndex(0)
    // Hide navigation
    const nav = document.querySelector('nav')
    if (nav) nav.style.display = 'none'
  }

  const closeProject = () => {
    console.log('Closing project')
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .project-card {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
          position: relative;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0,0,0,0.02) 0%, transparent 50%, rgba(0,0,0,0.02) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 24px;
          z-index: 1;
          pointer-events: none;
        }

        .project-card:hover::before {
          opacity: 1;
        }

        .project-card:hover {
          transform: translateY(-15px) scale(1.03) rotate(1deg);
          box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.35);
        }

        .project-card:active {
          transform: translateY(-10px) scale(1.02) rotate(0.5deg);
        }

        .project-card:hover .card-image {
          transform: scale(1.15);
        }

        .tech-pill:hover {
          background: #6C131F !important;
          color: #FFECEA !important;
          transform: scale(1.05);
        }

        .modal-overlay {
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          animation: slideUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(50px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        .thumbnail-image {
          transition: all 0.3s ease;
        }

        .thumbnail-image:hover {
          transform: scale(1.1);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(120deg); }
          66% { transform: translateY(8px) rotate(240deg); }
        }

        .floating-shape {
          animation: float 25s ease-in-out infinite;
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
            gap: 25px !important;
          }
          
          .modal-content {
            border-radius: 16px !important;
          }
        }

        @media (max-width: 480px) {
          .modal-overlay {
            padding: 15px !important;
          }
        }

        /* Prevent body scroll when modal is open */
        body.modal-open {
          overflow: hidden !important;
          position: fixed !important;
          width: 100% !important;
        }

        /* Equal height cards */
        .project-card {
          display: flex !important;
          flex-direction: column !important;
          height: 100% !important;
        }

        .card-content {
          display: flex !important;
          flex-direction: column !important;
          flex: 1 !important;
        }

        .card-description {
          flex: 1 !important;
        }

        /* Side drawer scrollbar */
        .side-drawer-scroll::-webkit-scrollbar {
          width: 8px;
        }

        .side-drawer-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .side-drawer-scroll::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        .side-drawer-scroll::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        /* Thumbnail gallery scrollbar */
        .thumbnail-gallery-scroll::-webkit-scrollbar {
          height: 6px;
        }

        .thumbnail-gallery-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .thumbnail-gallery-scroll::-webkit-scrollbar-thumb {
          background: #000000;
          border-radius: 3px;
        }

        .thumbnail-gallery-scroll::-webkit-scrollbar-thumb:hover {
          background: #333;
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
      <GlobalNavigation />
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
        
        {/* Background Graphics */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: getResponsiveValue(120, 80, 50),
          height: getResponsiveValue(120, 80, 50),
          border: `3px solid ${theme.accentColor}`,
          opacity: 0.06,
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        }} className="floating-shape"></div>
        
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: getResponsiveValue(150, 100, 70),
          height: getResponsiveValue(150, 100, 70),
          border: `2px solid ${theme.accentColor}`,
          opacity: 0.05,
          borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%',
          transform: 'rotate(45deg)',
        }} className="floating-shape"></div>

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
                  console.log('Card clicked:', project.title)
                  openProject(project)
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Project Image */}
                <div style={{
                  width: '100%',
                  height: getResponsiveValue(200, 180, 150),
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
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
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
                  padding: getResponsiveValue('18px', '16px', '14px'),
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