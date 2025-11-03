'use client'

import { useEffect, useState } from 'react'

export default function Projects({ scrollDirection = 'down' }) {
  const [mounted, setMounted] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const [activeImage, setActiveImage] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  })

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
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
    bgPrimary: '#ffffff',
    bgSecondary: '#fafafa',
    textPrimary: '#000000',
    textMuted: '#666666',
    accentColor: '#000000',
    borderLight: 'rgba(0, 0, 0, 0.05)',
    shadowLight: '0 4px 20px rgba(0, 0, 0, 0.08)',
    shadowMedium: '0 8px 30px rgba(0, 0, 0, 0.12)'
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
      badge: "IRCITE"
    },
    {
      id: 2,
      title: "DialEase",
      subtitle: "CAPD Healthcare Management System",
      description: "Comprehensive healthcare platform for remote monitoring of Continuous Ambulatory Peritoneal Dialysis patients.",
      fullDescription: "Developed a responsive healthcare management system enabling remote patient monitoring, treatment tracking, and healthcare provider access. Built with modern web technologies for optimal performance.",
      images: ["/images/10.png", "/images/11.png", "/images/12.png"],
      role: "Web Developer",
      badge: "Capstone"
    },
    {
      id: 3,
      title: "Academic Projects",
      description: "Collection of academic research projects and software development initiatives.",
      fullDescription: "A showcase of innovative university projects in business automation and learning technology",
      images: ["/images/POS.png", "/images/POS2.png", "/images/tutorial.png", "/images/tutorial2.png"],
      role: "Full Stack Developer",
      badge: "Projects"
    }
  ]

  const academicProjects = [
    {
      title: "Baliug Drug Store POS",
      description: "Point of Sale system with comprehensive inventory management, sales analytics, and reporting capabilities."
    },
    {
      title: "Tutorial Center Platform",
      description: "Interactive learning management system with course organization and student progress monitoring."
    }
  ]

  const nextImage = () => {
    setActiveImage((prev) => 
      prev === projects[activeProject].images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setActiveImage((prev) => 
      prev === 0 ? projects[activeProject].images.length - 1 : prev - 1
    )
  }

  useEffect(() => {
    if (mounted) {
      const style = document.createElement('style');
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        .project-item:hover {
          border-color: #000000;
          transform: translateY(-2px);
        }
        
        .nav-button:hover {
          background: #000000;
          border-color: #000000;
          color: #ffffff;
        }
        
        .academic-item:hover {
          border-color: #000000;
        }
        
        .slider-dot:hover {
          background: #000000;
        }

        /* Responsive styles */
        @media (max-width: 1024px) {
          .project-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          
          .project-list {
            order: 2;
          }
          
          .project-preview {
            order: 1;
          }
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 60px 20px !important;
          }
          
          .title {
            font-size: 2.5rem !important;
          }
          
          .image-slider {
            height: 250px !important;
          }
          
          .project-main-title {
            font-size: 1.6rem !important;
          }
          
          .academic-grid {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 40px 15px !important;
          }
          
          .title {
            font-size: 2rem !important;
          }
          
          .subtitle {
            font-size: 1rem !important;
            padding: 0 10px;
          }
          
          .image-slider {
            height: 200px !important;
          }
          
          .slider-controls {
            bottom: 10px !important;
            padding: 6px 12px !important;
          }
          
          .nav-button {
            width: 35px !important;
            height: 35px !important;
            font-size: 0.9rem !important;
          }
          
          .project-preview {
            padding: 25px 20px !important;
          }
          
          .project-main-title {
            font-size: 1.4rem !important;
          }
          
          .description {
            font-size: 0.9rem !important;
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

  const currentProject = projects[activeProject]
  const isAcademicProject = currentProject.title === "Academic Projects"

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.bgPrimary} 0%, ${theme.bgSecondary} 100%)`,
      padding: getResponsiveValue('80px 30px', '60px 25px', '40px 20px'),
      fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(50px)' : 'translateY(-50px)'),
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      position: 'relative',
    }} id="projects">
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: getResponsiveValue(60, 50, 40),
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease 0.2s',
        }}>
          <h1 style={{
            fontSize: getResponsiveValue('3rem', '2.5rem', '2rem'),
            fontWeight: '800',
            marginBottom: getResponsiveValue(16, 14, 12),
            color: theme.textPrimary,
            letterSpacing: '-0.02em',
          }}>Projects</h1>
          <p style={{
            fontSize: getResponsiveValue('1.1rem', '1.05rem', '1rem'),
            color: theme.textMuted,
            fontWeight: '400',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: 1.5,
          }}>
            Innovative solutions and technical implementations
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: getResponsiveValue('300px 1fr', '1fr', '1fr'),
          gap: getResponsiveValue(40, 30, 20),
          alignItems: 'start',
        }} className="project-grid">
          
          {/* Project List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: getResponsiveValue(15, 12, 10),
            order: isTablet ? 2 : 1,
          }} className="project-list">
            {projects.map((project, index) => (
              <div
                key={project.id}
                style={{
                  padding: getResponsiveValue('20px', '18px', '16px'),
                  background: theme.bgPrimary,
                  border: `1px solid ${activeProject === index ? theme.accentColor : theme.borderLight}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeProject === index ? theme.shadowMedium : theme.shadowLight,
                  position: 'relative',
                }}
                className="project-item"
                onClick={() => {
                  setActiveProject(index)
                  setActiveImage(0)
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: getResponsiveValue('15px', '14px', '12px'),
                  right: getResponsiveValue('15px', '14px', '12px'),
                  background: theme.accentColor,
                  color: theme.bgPrimary,
                  padding: getResponsiveValue('4px 10px', '3px 8px', '2px 6px'),
                  borderRadius: '12px',
                  fontSize: getResponsiveValue('0.7rem', '0.65rem', '0.6rem'),
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                }}>
                  {project.badge}
                </div>
                <h3 style={{
                  fontSize: getResponsiveValue('1.2rem', '1.1rem', '1rem'),
                  fontWeight: '700',
                  color: theme.textPrimary,
                  marginBottom: '8px',
                  paddingRight: '60px',
                }}>{project.title}</h3>
                <p style={{
                  fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
                  color: theme.textMuted,
                  marginBottom: '10px',
                  lineHeight: 1.4,
                }}>{project.subtitle}</p>
                <p style={{
                  fontSize: getResponsiveValue('0.85rem', '0.8rem', '0.75rem'),
                  color: theme.textMuted,
                  lineHeight: 1.5,
                }}>{project.description}</p>
              </div>
            ))}
          </div>

          {/* Project Preview */}
          <div style={{
            background: theme.bgPrimary,
            borderRadius: '16px',
            padding: getResponsiveValue('30px', '25px', '20px'),
            border: `1px solid ${theme.borderLight}`,
            boxShadow: theme.shadowMedium,
            order: isTablet ? 1 : 2,
          }} className="project-preview">
            
            {/* Image Slider */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: getResponsiveValue(300, 250, 200),
              borderRadius: '12px',
              overflow: 'hidden',
              background: theme.bgSecondary,
              border: `1px solid ${theme.borderLight}`,
              marginBottom: getResponsiveValue(25, 22, 20),
            }} className="image-slider">
              <img 
                src={currentProject.images[activeImage]} 
                alt={currentProject.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  backgroundColor: theme.bgPrimary,
                }}
                className="slider-image"
              />
              
              <button 
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: getResponsiveValue(40, 35, 30),
                  height: getResponsiveValue(40, 35, 30),
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: `1px solid ${theme.borderLight}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: getResponsiveValue('1rem', '0.9rem', '0.8rem'),
                  transition: 'all 0.3s ease',
                  left: '15px',
                }}
                className="nav-button"
                onClick={prevImage}
              >
                ‹
              </button>
              <button 
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: getResponsiveValue(40, 35, 30),
                  height: getResponsiveValue(40, 35, 30),
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: `1px solid ${theme.borderLight}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: getResponsiveValue('1rem', '0.9rem', '0.8rem'),
                  transition: 'all 0.3s ease',
                  right: '15px',
                }}
                className="nav-button"
                onClick={nextImage}
              >
                ›
              </button>
              
              <div style={{
                position: 'absolute',
                bottom: getResponsiveValue('15px', '12px', '10px'),
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.95)',
                padding: getResponsiveValue('8px 16px', '7px 14px', '6px 12px'),
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
              }} className="slider-controls">
                {currentProject.images.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: index === activeImage ? theme.accentColor : theme.borderLight,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: index === activeImage ? 'scale(1.2)' : 'scale(1)',
                    }}
                    className="slider-dot"
                    onClick={() => setActiveImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div style={{
              marginBottom: getResponsiveValue(20, 18, 16),
              position: 'relative',
            }} className="project-header">
              <div style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: theme.accentColor,
                color: theme.bgPrimary,
                padding: getResponsiveValue('6px 12px', '5px 10px', '4px 8px'),
                borderRadius: '15px',
                fontSize: getResponsiveValue('0.75rem', '0.7rem', '0.65rem'),
                fontWeight: '700',
                letterSpacing: '0.5px',
              }} className="preview-badge">
                {currentProject.badge}
              </div>
              <h2 style={{
                fontSize: getResponsiveValue('1.8rem', '1.6rem', '1.4rem'),
                fontWeight: '800',
                color: theme.textPrimary,
                marginBottom: '8px',
                paddingRight: '80px',
              }} className="project-main-title">{currentProject.title}</h2>
              <p style={{
                fontSize: getResponsiveValue('1rem', '0.95rem', '0.9rem'),
                color: theme.textMuted,
                marginBottom: getResponsiveValue(15, 14, 13),
              }} className="project-main-subtitle">{currentProject.subtitle}</p>
              <div style={{
                fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
                color: theme.textMuted,
                fontWeight: '600',
                marginBottom: getResponsiveValue(20, 18, 16),
              }} className="role">Role: {currentProject.role}</div>
            </div>

            <p style={{
              fontSize: getResponsiveValue('0.95rem', '0.9rem', '0.85rem'),
              color: theme.textPrimary,
              lineHeight: '1.6',
              marginBottom: getResponsiveValue(25, 22, 20),
            }} className="description">
              {currentProject.fullDescription}
            </p>

            {/* Academic Projects Grid */}
            {isAcademicProject && (
              <div>
                <h4 style={{ 
                  fontSize: getResponsiveValue('1rem', '0.95rem', '0.9rem'),
                  fontWeight: '700', 
                  marginBottom: '15px',
                  color: theme.textPrimary 
                }}>
                  Project Details
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: getResponsiveValue('1fr 1fr', '1fr', '1fr'),
                  gap: getResponsiveValue(15, 12, 10),
                  marginTop: '20px',
                }} className="academic-grid">
                  {academicProjects.map((project, index) => (
                    <div key={index} style={{
                      padding: getResponsiveValue('20px', '18px', '16px'),
                      background: theme.bgSecondary,
                      border: `1px solid ${theme.borderLight}`,
                      borderRadius: '12px',
                    }} className="academic-item">
                      <div style={{
                        fontSize: getResponsiveValue('1rem', '0.95rem', '0.9rem'),
                        fontWeight: '700',
                        color: theme.textPrimary,
                        marginBottom: '8px',
                      }} className="academic-title">{project.title}</div>
                      <p style={{
                        fontSize: getResponsiveValue('0.85rem', '0.8rem', '0.75rem'),
                        color: theme.textMuted,
                        lineHeight: '1.5',
                      }} className="academic-description">{project.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}