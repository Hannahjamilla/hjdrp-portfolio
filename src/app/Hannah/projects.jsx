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
    bgSecondary: '#f8f9fa',
    bgTertiary: '#f1f3f5',
    textPrimary: '#000000',
    textSecondary: '#2d3748',
    textMuted: '#4a5568',
    accentColor: '#000000',
    borderLight: 'rgba(0, 0, 0, 0.1)',
    borderMedium: 'rgba(0, 0, 0, 0.15)',
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
      role: "Full Stack Developer",
      description: "Point of Sale system with comprehensive inventory management, sales analytics, and reporting capabilities."
    },
    {
      title: "Tutorial Center Platform",
      description: "Interactive learning management system with course organization and student progress monitoring.",
      images: ["/images/7.png", "/images/8.png", "/images/tutorial.png", "/images/tutorial2.png"],
      role: "Full Stack Developer",
      description: "Interactive learning management system with course organization and student progress monitoring."
    },
    {
      title: "Event & Venue Rental Ecosystem",
      description: "DEVELOPMENT OF AN INNOVATIVE EVENT AND VENUE RENTAL ECOSYSTEM THROUGH UNIFICATION OF BILLING, PAYMENT PROCESSING, AND INVENTORY SYSTEMS",
      images: ["/images/paper.png"],
      role: "Co-Developer / Research Contributor",
      description: "Contributed to the development and research of a unified event and venue management system integrating billing, payment processing, and inventory tracking modules to simplify operations and improve user transaction flow. The research was officially published as part of the university's academic publication program."
    }
  ]

  // Get current academic project based on active image
  const getCurrentAcademicProject = () => {
    const currentImages = projects[activeProject].images;
    const currentImage = currentImages[activeImage];
    
    // Find which academic project contains this image
    const project = academicProjects.find(proj => 
      proj.images.includes(currentImage)
    );
    
    return project || academicProjects[0]; // Fallback to first project
  }

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
        
        .project-card:hover {
          transform: translateY(-8px);
          border-color: #000000;
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.25);
        }
        
        .tech-pill:hover {
          background: #000000 !important;
          color: #ffffff !important;
          transform: scale(1.05);
        }
        
        .nav-button:hover {
          background: #000000 !important;
          border-color: #000000 !important;
          color: #ffffff !important;
          transform: scale(1.05);
        }
        
        .slider-dot:hover {
          background: #000000 !important;
          transform: scale(1.2);
        }

        .project-badge {
          position: relative;
          overflow: hidden;
        }
        
        .project-badge::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }
        
        .project-badge:hover::before {
          left: 100%;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(120deg); }
          66% { transform: translateY(8px) rotate(240deg); }
        }
        
        .floating-shape {
          animation: float 25s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50% { opacity: 0.12; transform: scale(1.05); }
        }
        
        .pulse {
          animation: pulse 6s ease-in-out infinite;
        }

        @keyframes slideInFromLeft {
          0% { transform: translateX(-80px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        .project-card {
          animation: slideInFromLeft 0.6s ease-out;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .bounce {
          animation: bounce 3s ease-in-out infinite;
        }

        /* Responsive styles */
        @media (max-width: 1024px) {
          .main-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
          
          .project-cards {
            order: 2;
          }
          
          .project-showcase {
            order: 1;
          }
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 80px 25px !important;
          }
          
          .title {
            font-size: 3rem !important;
          }
          
          .image-container {
            height: 300px !important;
          }
          
          .project-title {
            font-size: 2rem !important;
          }
          
          .tech-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            padding: 60px 20px !important;
          }
          
          .title {
            font-size: 2.5rem !important;
          }
          
          .subtitle {
            font-size: 1.2rem !important;
          }
          
          .image-container {
            height: 250px !important;
          }
          
          .project-card {
            padding: 30px !important;
          }
          
          .project-title {
            font-size: 1.8rem !important;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .force-light {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          
          .force-light-border {
            border-color: rgba(0, 0, 0, 0.15) !important;
          }
          
          .force-light-text {
            color: #000000 !important;
          }
          
          .force-light-bg {
            background-color: #f8f9fa !important;
          }
          
          .force-light-bg-secondary {
            background-color: #f1f3f5 !important;
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
  const currentAcademicProject = getCurrentAcademicProject()

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bgPrimary,
      padding: getResponsiveValue('100px 60px', '80px 40px', '60px 25px'),
      fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : (scrollDirection === 'down' ? 'translateY(50px)' : 'translateY(-50px)'),
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      position: 'relative',
      overflow: 'hidden',
    }} id="projects" className="force-light">
      
      {/* Enhanced Background Graphics */}
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
        position: 'absolute',
        top: '40%',
        right: '15%',
        width: getResponsiveValue(80, 60, 40),
        height: getResponsiveValue(80, 60, 40),
        background: theme.accentColor,
        opacity: 0.04,
        borderRadius: '50%',
      }} className="pulse"></div>

      {/* Code Brackets Graphics */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '8%',
        fontSize: getResponsiveValue('2rem', '1.5rem', '1rem'),
        color: theme.accentColor,
        opacity: 0.03,
        fontWeight: 'bold',
        fontFamily: 'monospace',
      }}>{'</>'}</div>

      <div style={{
        position: 'absolute',
        bottom: '25%',
        right: '12%',
        fontSize: getResponsiveValue('2rem', '1.5rem', '1rem'),
        color: theme.accentColor,
        opacity: 0.03,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        transform: 'rotate(180deg)',
      }}>{'</>'}</div>

      {/* Connection Lines */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '15%',
        width: '2px',
        height: '100px',
        background: theme.accentColor,
        opacity: 0.04,
        transform: 'rotate(45deg)',
      }}></div>

      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '18%',
        width: '2px',
        height: '80px',
        background: theme.accentColor,
        opacity: 0.04,
        transform: 'rotate(-30deg)',
      }}></div>

      {/* Binary Code Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 25% 25%, ${theme.accentColor}08 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, ${theme.accentColor}06 0%, transparent 50%)
        `,
        backgroundSize: '400px 400px, 300px 300px',
        opacity: 0.4,
      }}></div>

      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Enhanced Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: getResponsiveValue(120, 90, 60),
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease 0.2s',
          position: 'relative',
        }}>
          <div style={{
            display: 'inline-block',
            position: 'relative',
          }}>
            {/* Decorative elements */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '-30px',
              width: '60px',
              height: '60px',
              border: `2px solid ${theme.accentColor}`,
              opacity: 0.1,
              borderRadius: '50%',
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-15px',
              right: '-25px',
              width: '40px',
              height: '40px',
              border: `2px solid ${theme.accentColor}`,
              opacity: 0.1,
              borderRadius: '50%',
            }}></div>
            
            <h1 style={{
              fontSize: getResponsiveValue('4.5rem', '3.5rem', '2.8rem'),
              fontWeight: '900',
              marginBottom: getResponsiveValue(20, 18, 16),
              color: theme.textPrimary,
              letterSpacing: '-0.03em',
              position: 'relative',
              zIndex: 2,
              textShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }} className="force-light-text">
              Project <span style={{
                color: theme.accentColor,
                position: 'relative',
              }}>
                Portfolio
                <span style={{
                  position: 'absolute',
                  bottom: '5px',
                  left: '0',
                  width: '100%',
                  height: '8px',
                  backgroundColor: theme.accentColor,
                  opacity: 0.15,
                  borderRadius: '4px',
                }}></span>
              </span>
            </h1>
          </div>
          <p style={{
            fontSize: getResponsiveValue('1.4rem', '1.2rem', '1.1rem'),
            color: theme.textMuted,
            fontWeight: '400',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
            position: 'relative',
            zIndex: 2,
            opacity: 0.9,
          }} className="force-light-text">
            Crafting digital solutions with innovation and precision
          </p>
          
          {/* Header decoration line */}
          <div style={{
            width: '100px',
            height: '4px',
            background: theme.accentColor,
            margin: '30px auto 0',
            opacity: 0.2,
            borderRadius: '2px',
          }}></div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: getResponsiveValue('480px 1fr', '1fr', '1fr'),
          gap: getResponsiveValue(80, 60, 40),
          alignItems: 'start',
        }} className="main-grid">
          
          {/* Enhanced Project Cards Navigation */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: getResponsiveValue(35, 28, 22),
            order: isTablet ? 2 : 1,
            position: 'relative',
          }} className="project-cards">
            {projects.map((project, index) => (
              <div
                key={project.id}
                style={{
                  padding: getResponsiveValue('35px 30px', '28px 25px', '22px 20px'),
                  background: theme.bgPrimary,
                  border: `2px solid ${activeProject === index ? theme.accentColor : theme.borderLight}`,
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: activeProject === index 
                    ? '0 15px 30px -8px rgba(0, 0, 0, 0.15)' 
                    : '0 5px 20px -5px rgba(0, 0, 0, 0.08)',
                  animationDelay: `${index * 0.1}s`,
                }}
                className="project-card force-light force-light-border"
                onClick={() => {
                  setActiveProject(index)
                  setActiveImage(0)
                }}
              >
                {/* Active indicator */}
                {activeProject === index && (
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '6px',
                    height: '100%',
                    background: theme.accentColor,
                  }}></div>
                )}
                
                {/* Project Number */}
                <div style={{
                  position: 'absolute',
                  top: '25px',
                  left: '30px',
                  fontSize: getResponsiveValue('0.9rem', '0.8rem', '0.7rem'),
                  fontWeight: '800',
                  color: activeProject === index ? theme.accentColor : theme.textMuted,
                  opacity: activeProject === index ? 1 : 0.6,
                  background: activeProject === index ? `${theme.accentColor}12` : `${theme.textMuted}08`,
                  padding: '6px 12px',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  border: `1px solid ${activeProject === index ? `${theme.accentColor}20` : `${theme.textMuted}10`}`
                }}>
                  0{index + 1}
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: getResponsiveValue(20, 18, 16),
                  marginTop: getResponsiveValue(10, 8, 6),
                }}>
                  <h3 style={{
                    fontSize: getResponsiveValue('1.8rem', '1.5rem', '1.3rem'),
                    fontWeight: '800',
                    color: theme.textPrimary,
                    margin: `0 0 0 ${getResponsiveValue('50px', '45px', '40px')}`,
                    flex: 1,
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                  }} className="force-light-text">{project.title}</h3>
                  <div style={{
                    background: activeProject === index ? theme.accentColor : theme.textMuted,
                    color: theme.bgPrimary,
                    padding: getResponsiveValue('8px 18px', '7px 16px', '6px 14px'),
                    borderRadius: '12px',
                    fontSize: getResponsiveValue('0.85rem', '0.8rem', '0.75rem'),
                    fontWeight: '800',
                    letterSpacing: '0.5px',
                    whiteSpace: 'nowrap',
                    marginLeft: '15px',
                    boxShadow: activeProject === index ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
                    transform: activeProject === index ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                    border: `1px solid ${activeProject === index ? theme.accentColor : theme.textMuted}`
                  }} className="project-badge">
                    {project.badge}
                  </div>
                </div>
                
                <p style={{
                  fontSize: getResponsiveValue('1.1rem', '1rem', '0.9rem'),
                  color: theme.textMuted,
                  lineHeight: 1.6,
                  marginBottom: getResponsiveValue(20, 18, 16),
                  marginLeft: getResponsiveValue('50px', '45px', '40px'),
                  opacity: 0.9,
                }} className="force-light-text">{project.description}</p>
                
                <div style={{
                  fontSize: getResponsiveValue('1rem', '0.9rem', '0.8rem'),
                  color: theme.accentColor,
                  fontWeight: '700',
                  opacity: activeProject === index ? 1 : 0.7,
                  marginLeft: getResponsiveValue('50px', '45px', '40px'),
                  background: `${theme.accentColor}08`,
                  padding: '8px 16px',
                  borderRadius: '10px',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  border: `1px solid ${theme.accentColor}15`
                }}>{project.year}</div>
              </div>
            ))}
          </div>

          {/* Project Showcase */}
          <div style={{
            background: theme.bgPrimary,
            borderRadius: '24px',
            padding: getResponsiveValue('50px', '40px', '35px'),
            border: `2px solid ${theme.borderLight}`,
            position: 'relative',
            overflow: 'hidden',
            order: isTablet ? 1 : 2,
            boxShadow: '0 15px 40px -10px rgba(0, 0, 0, 0.12)',
          }} className="project-showcase force-light force-light-border">
            
            {/* Corner Graphics */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '50px',
              height: '50px',
              borderTop: `3px solid ${theme.accentColor}`,
              borderLeft: `3px solid ${theme.accentColor}`,
              borderTopLeftRadius: '22px',
              opacity: 0.2,
            }}></div>
            <div style={{
              position: 'absolute',
              top: '0',
              right: '0',
              width: '50px',
              height: '50px',
              borderTop: `3px solid ${theme.accentColor}`,
              borderRight: `3px solid ${theme.accentColor}`,
              borderTopRightRadius: '22px',
              opacity: 0.2,
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '50px',
              height: '50px',
              borderBottom: `3px solid ${theme.accentColor}`,
              borderLeft: `3px solid ${theme.accentColor}`,
              borderBottomLeftRadius: '22px',
              opacity: 0.2,
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '50px',
              height: '50px',
              borderBottom: `3px solid ${theme.accentColor}`,
              borderRight: `3px solid ${theme.accentColor}`,
              borderBottomRightRadius: '22px',
              opacity: 0.2,
            }}></div>

            {/* Image Slider */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: getResponsiveValue(400, 320, 260),
              borderRadius: '18px',
              overflow: 'hidden',
              background: theme.bgSecondary,
              border: `2px solid ${theme.borderLight}`,
              marginBottom: getResponsiveValue(40, 35, 30),
            }} className="image-container force-light-bg force-light-border">
              <img 
                src={currentProject.images[activeImage]} 
                alt={currentProject.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  backgroundColor: theme.bgPrimary,
                  transition: 'transform 0.3s ease',
                }}
              />
              
              {/* Navigation Buttons */}
              <button 
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: getResponsiveValue(50, 45, 40),
                  height: getResponsiveValue(50, 45, 40),
                  background: theme.bgPrimary,
                  border: `2px solid ${theme.borderMedium}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: getResponsiveValue('1.3rem', '1.2rem', '1rem'),
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  left: '20px',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                  color: theme.textPrimary,
                }}
                className="nav-button force-light force-light-border"
                onClick={prevImage}
              >
                ‹
              </button>
              <button 
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: getResponsiveValue(50, 45, 40),
                  height: getResponsiveValue(50, 45, 40),
                  background: theme.bgPrimary,
                  border: `2px solid ${theme.borderMedium}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: getResponsiveValue('1.3rem', '1.2rem', '1rem'),
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  right: '20px',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                  color: theme.textPrimary,
                }}
                className="nav-button force-light force-light-border"
                onClick={nextImage}
              >
                ›
              </button>
              
              {/* Dots Indicator */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '10px',
                background: theme.bgPrimary,
                padding: getResponsiveValue('10px 20px', '8px 16px', '6px 12px'),
                borderRadius: '25px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                border: `1px solid ${theme.borderLight}`
              }} className="force-light force-light-border">
                {currentProject.images.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: '10px',
                      height: '10px',
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
              marginBottom: getResponsiveValue(35, 30, 25),
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '15px',
              }}>
                <div>
                  <h2 style={{
                    fontSize: getResponsiveValue('2.5rem', '2.2rem', '1.8rem'),
                    fontWeight: '900',
                    color: theme.textPrimary,
                    margin: '0 0 8px 0',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                  }} className="force-light-text">{currentProject.title}</h2>
                  {currentProject.subtitle && (
                    <p style={{
                      fontSize: getResponsiveValue('1.3rem', '1.2rem', '1.1rem'),
                      color: theme.textMuted,
                      margin: '0 0 15px 0',
                      fontWeight: '500',
                      opacity: 0.9,
                    }} className="force-light-text">{currentProject.subtitle}</p>
                  )}
                </div>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                }}>
                  <div style={{
                    background: theme.accentColor,
                    color: theme.bgPrimary,
                    padding: getResponsiveValue('8px 18px', '7px 16px', '6px 14px'),
                    borderRadius: '14px',
                    fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
                    fontWeight: '800',
                    letterSpacing: '0.5px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    border: `1px solid ${theme.accentColor}`
                  }}>
                    {currentProject.badge}
                  </div>
                  <div style={{
                    fontSize: getResponsiveValue('1rem', '0.9rem', '0.8rem'),
                    color: theme.textMuted,
                    fontWeight: '700',
                    background: `${theme.textMuted}08`,
                    padding: '8px 14px',
                    borderRadius: '12px',
                    border: `1px solid ${theme.textMuted}15`
                  }} className="force-light-text">
                    {currentProject.year}
                  </div>
                </div>
              </div>

              <div style={{
                fontSize: getResponsiveValue('1.1rem', '1rem', '0.9rem'),
                color: theme.textMuted,
                fontWeight: '700',
                marginBottom: '20px',
                background: `${theme.accentColor}08`,
                padding: '10px 18px',
                borderRadius: '12px',
                display: 'inline-block',
                border: `1px solid ${theme.accentColor}12`
              }} className="force-light-text">Role: {currentProject.role}</div>

              <p style={{
                fontSize: getResponsiveValue('1.2rem', '1.1rem', '1rem'),
                color: theme.textPrimary,
                lineHeight: '1.7',
                marginBottom: getResponsiveValue(35, 30, 25),
                opacity: 0.9,
              }} className="force-light-text">
                {currentProject.fullDescription}
              </p>

              {/* Technology Stack */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: getResponsiveValue('repeat(3, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)'),
                gap: getResponsiveValue(10, 8, 6),
                marginBottom: getResponsiveValue(35, 30, 25),
              }} className="tech-grid">
                {currentProject.tech.map((tech, index) => (
                  <div
                    key={index}
                    style={{
                      padding: getResponsiveValue('10px 18px', '8px 14px', '6px 12px'),
                      background: theme.bgSecondary,
                      border: `1px solid ${theme.borderLight}`,
                      borderRadius: '20px',
                      fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
                      fontWeight: '600',
                      color: theme.textPrimary,
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    }}
                    className="tech-pill force-light-bg-secondary force-light-border force-light-text"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Projects Details */}
            {isAcademicProject && (
              <div style={{
                padding: '25px',
                background: theme.bgSecondary,
                borderRadius: '18px',
                border: `1px solid ${theme.borderLight}`,
                boxShadow: '0 5px 20px rgba(0, 0, 0, 0.05)',
              }} className="force-light-bg-secondary force-light-border">
                <h4 style={{ 
                  fontSize: getResponsiveValue('1.3rem', '1.2rem', '1.1rem'),
                  fontWeight: '800', 
                  marginBottom: '18px',
                  color: theme.textPrimary,
                  letterSpacing: '-0.01em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }} className="force-light-text">
                  <span style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: theme.accentColor,
                  }}></span>
                  Current Project: {currentAcademicProject.title}
                </h4>
                
                <div style={{
                  padding: getResponsiveValue('20px', '18px', '16px'),
                  background: theme.bgPrimary,
                  border: `1px solid ${theme.borderLight}`,
                  borderRadius: '14px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
                }} className="force-light force-light-border">
                  <div style={{
                    fontSize: getResponsiveValue('1rem', '0.95rem', '0.9rem'),
                    fontWeight: '700',
                    color: theme.textMuted,
                    marginBottom: '10px',
                  }} className="force-light-text">
                    Role: {currentAcademicProject.role}
                  </div>
                  <p style={{
                    fontSize: getResponsiveValue('0.95rem', '0.9rem', '0.85rem'),
                    color: theme.textPrimary,
                    lineHeight: '1.6',
                    margin: 0,
                    opacity: 0.9,
                  }} className="force-light-text">
                    {currentAcademicProject.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}