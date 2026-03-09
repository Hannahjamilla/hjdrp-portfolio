'use client'

export default function BackgroundElements({ 
  theme, 
  getResponsiveValue, 
  isMobile, 
  mousePosition, 
  particles 
}) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      {/* Dynamic grid pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)
        `,
        backgroundSize: `${getResponsiveValue(60, 50, 40)}px ${getResponsiveValue(60, 50, 40)}px`,
        opacity: 0.5,
      }}></div>

      {/* Morphing shapes */}
      <div style={{
        position: 'absolute',
        top: '12%',
        right: getResponsiveValue('8%', '6%', '4%'),
        width: getResponsiveValue(280, 200, 140),
        height: getResponsiveValue(280, 200, 140),
        background: `
          linear-gradient(135deg, ${theme.borderColor}, transparent 70%),
          radial-gradient(circle at 30% 70%, rgba(0,0,0,0.05) 0%, transparent 50%)
        `,
        opacity: isMobile ? 0.15 : 0.25,
        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
      }} className="floating-shape"></div>

      <div style={{
        position: 'absolute',
        bottom: '18%',
        left: getResponsiveValue('6%', '4%', '2%'),
        width: getResponsiveValue(200, 140, 100),
        height: getResponsiveValue(200, 140, 100),
        background: `
          linear-gradient(45deg, ${theme.borderColor}, transparent 60%),
          conic-gradient(from 45deg, transparent, rgba(0,0,0,0.03), transparent)
        `,
        opacity: isMobile ? 0.12 : 0.2,
        transform: 'rotate(45deg)',
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
      }} className="floating-shape"></div>

      <div style={{
        position: 'absolute',
        top: '65%',
        right: '18%',
        width: getResponsiveValue(150, 100, 70),
        height: getResponsiveValue(150, 100, 70),
        background: `radial-gradient(circle, ${theme.borderColor} 0%, transparent 70%)`,
        opacity: isMobile ? 0.08 : 0.15,
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
      }} className="floating-shape"></div>
      
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '15%',
        width: getResponsiveValue(100, 80, 60),
        height: getResponsiveValue(100, 80, 60),
        border: `2px solid ${theme.borderColor}`,
        opacity: isMobile ? 0.1 : 0.18,
        borderRadius: '50%',
        background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.02) 70%)',
      }} className="floating-shape"></div>
      
      {/* Particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        display: isMobile ? 'none' : 'block',
      }}>
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${20 + particle.speed * 10}s`,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      {/* Interactive cursor effect */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${theme.borderColor} 0%, transparent 70%)`,
          borderRadius: '50%',
          opacity: 0.03,
          pointerEvents: 'none',
          transform: `translate(${mousePosition.x - 100}px, ${mousePosition.y - 100}px)`,
          transition: 'transform 0.1s ease-out',
        }} />
      )}
    </div>
  )
}