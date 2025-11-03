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
          transform: translateY(-12px) scale(1.02) rotate(0.5deg);
          border-color: #000000;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .tech-pill:hover {
          background: #000000 !important;
          color: #ffffff !important;
          transform: scale(1.08);
        }
        
        .nav-button:hover {
          background: #000000 !important;
          border-color: #000000 !important;
          color: #ffffff !important;
          transform: scale(1.1);
        }
        
        .slider-dot:hover {
          background: #000000 !important;
          transform: scale(1.4);
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
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        .floating-shape {
          animation: float 20s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.1); }
        }
        
        .pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }

        @keyframes slideInFromLeft {
          0% { transform: translateX(-100px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        .project-card {
          animation: slideInFromLeft 0.6s ease-out;
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
    }} id="projects">
      
      {/* Enhanced Background Shapes */}
      <div style={{
        position: 'absolute',
        top: '8%',
        left: '3%',
        width: getResponsiveValue(180, 120, 80),
        height: getResponsiveValue(180, 120, 80),
        border: `4px solid ${theme.accentColor}`,
        opacity: 0.04,
        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
      }} className="floating-shape pulse-glow"></div>
      
      <div style={{
        position: 'absolute',
        bottom: '12%',
        right: '5%',
        width: getResponsiveValue(200, 150, 100),
        height: getResponsiveValue(200, 150, 100),
        border: `3px solid ${theme.accentColor}`,
        opacity: 0.03,
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        transform: 'rotate(65deg)',
      }} className="floating-shape"></div>
      
      <div style={{
        position: 'absolute',
        top: '35%',
        right: '12%',
        width: getResponsiveValue(100, 80, 60),
        height: getResponsiveValue(100, 80, 60),
        background: theme.accentColor,
        opacity: 0.04,
        borderRadius: '50%',
        filter: 'blur(10px)',
      }} className="pulse-glow"></div>

      {/* Enhanced Binary Code Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, ${theme.accentColor}15 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, ${theme.accentColor}10 0%, transparent 50%),
          linear-gradient(90deg, transparent 49%, ${theme.accentColor}02 49%, ${theme.accentColor}02 51%, transparent 51%),
          linear-gradient(transparent 49%, ${theme.accentColor}02 49%, ${theme.accentColor}02 51%, transparent 51%)
        `,
        backgroundSize: '80px 80px, 80px 80px, 60px 60px, 60px 60px',
        opacity: 0.03,
        transform: 'rotate(12deg)',
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
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: getResponsiveValue(400, 300, 200),
              height: getResponsiveValue(120, 90, 60),
              background: `linear-gradient(45deg, ${theme.accentColor}05, ${theme.accentColor}15)`,
              borderRadius: '50%',
              filter: 'blur(40px)',
            }}></div>
            <h1 style={{
              fontSize: getResponsiveValue('4.5rem', '3.5rem', '2.8rem'),
              fontWeight: '900',
              marginBottom: getResponsiveValue(20, 18, 16),
              color: theme.textPrimary,
              letterSpacing: '-0.03em',
              position: 'relative',
              zIndex: 2,
              background: `linear-gradient(135deg, ${theme.textPrimary} 0%, ${theme.textMuted} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Project <span style={{
              background: `linear-gradient(135deg, ${theme.accentColor} 0%, #444 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Portfolio</span></h1>
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
            opacity: 0.8,
          }}>
            Crafting digital solutions with innovation and precision
          </p>
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
                  background: `linear-gradient(135deg, ${theme.bgPrimary} 0%, ${theme.bgSecondary} 100%)`,
                  border: `3px solid ${activeProject === index ? theme.accentColor : theme.borderLight}`,
                  borderRadius: '25px',
                  cursor: 'pointer',
                  transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: activeProject === index 
                    ? '0 20px 40px -10px rgba(0, 0, 0, 0.15)' 
                    : '0 8px 25px -5px rgba(0, 0, 0, 0.08)',
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both',
                }}
                className="project-card"
                onClick={() => {
                  setActiveProject(index)
                  setActiveImage(0)
                }}
              >
                {/* Enhanced Background Pattern */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '80px',
                  height: '80px',
                  background: `linear-gradient(135deg, ${theme.accentColor} 0%, transparent 70%)`,
                  opacity: activeProject === index ? 0.12 : 0.06,
                  transition: 'all 0.4s ease',
                }}></div>
                
                {/* Project Number */}
                <div style={{
                  position: 'absolute',
                  top: '25px',
                  left: '30px',
                  fontSize: getResponsiveValue('0.9rem', '0.8rem', '0.7rem'),
                  fontWeight: '800',
                  color: activeProject === index ? theme.accentColor : theme.textMuted,
                  opacity: activeProject === index ? 1 : 0.5,
                  background: activeProject === index ? `${theme.accentColor}15` : `${theme.textMuted}10`,
                  padding: '6px 12px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
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
                  }}>{project.title}</h3>
                  <div style={{
                    background: activeProject === index 
                      ? `linear-gradient(135deg, ${theme.accentColor} 0%, #333 100%)` 
                      : theme.accentColor,
                    color: theme.bgPrimary,
                    padding: getResponsiveValue('8px 18px', '7px 16px', '6px 14px'),
                    borderRadius: '16px',
                    fontSize: getResponsiveValue('0.85rem', '0.8rem', '0.75rem'),
                    fontWeight: '800',
                    letterSpacing: '0.5px',
                    whiteSpace: 'nowrap',
                    marginLeft: '15px',
                    boxShadow: activeProject === index ? '0 4px 15px rgba(0, 0, 0, 0.2)' : 'none',
                    transform: activeProject === index ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.3s ease',
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
                }}>{project.description}</p>
                
                <div style={{
                  fontSize: getResponsiveValue('1rem', '0.9rem', '0.8rem'),
                  color: theme.accentColor,
                  fontWeight: '700',
                  opacity: activeProject === index ? 1 : 0.7,
                  marginLeft: getResponsiveValue('50px', '45px', '40px'),
                  background: `${theme.accentColor}10`,
                  padding: '8px 16px',
                  borderRadius: '12px',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                }}>{project.year}</div>
              </div>
            ))}
          </div>

          {/* Project Showcase */}
          <div style={{
            background: theme.bgPrimary,
            borderRadius: '30px',
            padding: getResponsiveValue('50px', '40px', '35px'),
            border: `3px solid ${theme.borderLight}`,
            position: 'relative',
            overflow: 'hidden',
            order: isTablet ? 1 : 2,
            boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.1)',
          }} className="project-showcase">
            
            {/* Corner Accents */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '60px',
              height: '60px',
              borderTop: `4px solid ${theme.accentColor}`,
              borderLeft: `4px solid ${theme.accentColor}`,
              borderTopLeftRadius: '28px',
              opacity: 0.3,
            }}></div>
            <div style={{
              position: 'absolute',
              top: '0',
              right: '0',
              width: '60px',
              height: '60px',
              borderTop: `4px solid ${theme.accentColor}`,
              borderRight: `4px solid ${theme.accentColor}`,
              borderTopRightRadius: '28px',
              opacity: 0.3,
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '60px',
              height: '60px',
              borderBottom: `4px solid ${theme.accentColor}`,
              borderLeft: `4px solid ${theme.accentColor}`,
              borderBottomLeftRadius: '28px',
              opacity: 0.3,
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '60px',
              height: '60px',
              borderBottom: `4px solid ${theme.accentColor}`,
              borderRight: `4px solid ${theme.accentColor}`,
              borderBottomRightRadius: '28px',
              opacity: 0.3,
            }}></div>

            {/* Image Slider */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: getResponsiveValue(400, 320, 260),
              borderRadius: '20px',
              overflow: 'hidden',
              background: theme.bgSecondary,
              border: `2px solid ${theme.borderLight}`,
              marginBottom: getResponsiveValue(40, 35, 30),
            }} className="image-container">
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
                  width: getResponsiveValue(60, 50, 45),
                  height: getResponsiveValue(60, 50, 45),
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: `3px solid ${theme.borderLight}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: getResponsiveValue('1.5rem', '1.3rem', '1.1rem'),
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  left: '25px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
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
                  width: getResponsiveValue(60, 50, 45),
                  height: getResponsiveValue(60, 50, 45),
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: `3px solid ${theme.borderLight}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: getResponsiveValue('1.5rem', '1.3rem', '1.1rem'),
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  right: '25px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                }}
                className="nav-button"
                onClick={nextImage}
              >
                ›
              </button>
              
              {/* Dots Indicator */}
              <div style={{
                position: 'absolute',
                bottom: '25px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.95)',
                padding: getResponsiveValue('12px 25px', '10px 20px', '8px 16px'),
                borderRadius: '30px',
                backdropFilter: 'blur(15px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
              }}>
                {currentProject.images.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: '12px',
                      height: '12px',
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
                  }}>{currentProject.title}</h2>
                  <p style={{
                    fontSize: getResponsiveValue('1.3rem', '1.2rem', '1.1rem'),
                    color: theme.textMuted,
                    margin: '0 0 15px 0',
                    fontWeight: '500',
                    opacity: 0.8,
                  }}>{currentProject.subtitle}</p>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '15px',
                  alignItems: 'center',
                }}>
                  <div style={{
                    background: `linear-gradient(135deg, ${theme.accentColor} 0%, #333 100%)`,
                    color: theme.bgPrimary,
                    padding: getResponsiveValue('8px 20px', '7px 18px', '6px 16px'),
                    borderRadius: '18px',
                    fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
                    fontWeight: '800',
                    letterSpacing: '0.5px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                  }}>
                    {currentProject.badge}
                  </div>
                  <div style={{
                    fontSize: getResponsiveValue('1rem', '0.9rem', '0.8rem'),
                    color: theme.textMuted,
                    fontWeight: '700',
                    background: `${theme.textMuted}10`,
                    padding: '8px 16px',
                    borderRadius: '14px',
                  }}>
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
                padding: '12px 20px',
                borderRadius: '14px',
                display: 'inline-block',
              }}>Role: {currentProject.role}</div>

              <p style={{
                fontSize: getResponsiveValue('1.2rem', '1.1rem', '1rem'),
                color: theme.textPrimary,
                lineHeight: '1.7',
                marginBottom: getResponsiveValue(35, 30, 25),
                opacity: 0.9,
              }}>
                {currentProject.fullDescription}
              </p>

              {/* Technology Stack */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: getResponsiveValue('repeat(3, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)'),
                gap: getResponsiveValue(12, 10, 8),
                marginBottom: getResponsiveValue(35, 30, 25),
              }} className="tech-grid">
                {currentProject.tech.map((tech, index) => (
                  <div
                    key={index}
                    style={{
                      padding: getResponsiveValue('12px 20px', '10px 18px', '8px 16px'),
                      background: `linear-gradient(135deg, ${theme.bgSecondary} 0%, ${theme.bgPrimary} 100%)`,
                      border: `2px solid ${theme.borderLight}`,
                      borderRadius: '25px',
                      fontSize: getResponsiveValue('0.9rem', '0.85rem', '0.8rem'),
                      fontWeight: '600',
                      color: theme.textPrimary,
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                    }}
                    className="tech-pill"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Projects Details */}
            {isAcademicProject && (
              <div>
                <h4 style={{ 
                  fontSize: getResponsiveValue('1.3rem', '1.2rem', '1.1rem'),
                  fontWeight: '800', 
                  marginBottom: '20px',
                  color: theme.textPrimary,
                  letterSpacing: '-0.01em',
                }}>
                  Current Project: {currentAcademicProject.title}
                </h4>
                
                <div style={{
                  padding: getResponsiveValue('25px', '22px', '20px'),
                  background: `linear-gradient(135deg, ${theme.bgSecondary} 0%, ${theme.bgPrimary} 100%)`,
                  border: `2px solid ${theme.borderLight}`,
                  borderRadius: '20px',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                }}>
                  <div style={{
                    fontSize: getResponsiveValue('1rem', '0.95rem', '0.9rem'),
                    fontWeight: '700',
                    color: theme.textMuted,
                    marginBottom: '12px',
                  }}>
                    Role: {currentAcademicProject.role}
                  </div>
                  <p style={{
                    fontSize: getResponsiveValue('0.95rem', '0.9rem', '0.85rem'),
                    color: theme.textPrimary,
                    lineHeight: '1.6',
                    margin: 0,
                    opacity: 0.9,
                  }}>
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