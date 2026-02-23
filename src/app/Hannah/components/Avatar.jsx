'use client'

export default function Avatar({ theme, getResponsiveValue }) {
  const handleImageHover = (show) => {
    const mainImg = document.querySelector('.avatar-main')
    const hoverImg = document.querySelector('.avatar-hover')
    if (mainImg && hoverImg) {
      if (show) {
        mainImg.style.opacity = '0'
        hoverImg.style.opacity = '1'
      } else {
        mainImg.style.opacity = '1'
        hoverImg.style.opacity = '0'
      }
    }
  }

  return (
    <div 
      style={{
        width: getResponsiveValue(360, 320, 290),
        height: getResponsiveValue(360, 320, 290),
        borderRadius: getResponsiveValue(35, 30, 25),
        overflow: 'hidden',
        border: `4px solid ${theme.borderColor}`,
        background: `
          linear-gradient(135deg, ${theme.bgSecondary} 0%, ${theme.bgPrimary} 50%, ${theme.bgSecondary} 100%),
          radial-gradient(circle at 30% 70%, rgba(0,0,0,0.02) 0%, transparent 50%)
        `,
        position: 'relative',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: `
          0 30px 60px ${theme.shadowColor},
          inset 0 1px 0 rgba(255,255,255,0.1)
        `,
      }} 
      className="avatar-container"
      onMouseEnter={() => handleImageHover(true)}
      onMouseLeave={() => handleImageHover(false)}
    >
      {/* Decorative border elements */}
      <div style={{
        position: 'absolute',
        top: '-4px',
        left: '-4px',
        right: '-4px',
        bottom: '-4px',
        background: `
          conic-gradient(from 0deg, transparent, rgba(0,0,0,0.1), transparent, rgba(0,0,0,0.05), transparent),
          linear-gradient(45deg, transparent 30%, rgba(0,0,0,0.02) 50%, transparent 70%)
        `,
        borderRadius: getResponsiveValue(35, 30, 25),
        zIndex: -1,
        opacity: 0,
        transition: 'opacity 0.4s ease',
      }} className="avatar-glow"></div>
      
      {/* Corner decorations */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '40px',
        height: '40px',
        border: `2px solid ${theme.borderColor}`,
        borderRadius: '50%',
        opacity: 0.2,
        background: 'radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)',
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        width: '25px',
        height: '25px',
        background: `linear-gradient(45deg, ${theme.borderColor}, transparent)`,
        borderRadius: '4px',
        opacity: 0.15,
        transform: 'rotate(45deg)',
      }}></div>
      
      {/* Main Image */}
      <img 
        src="/images/Hannah.png" 
        alt="Hannah Peralta" 
        style={{
          width: '100%',
          height: '130%',
          objectFit: 'cover',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateY(-5%)',
          filter: 'contrast(1.02) brightness(1.01)',
          opacity: 1,
        }}
        className="avatar-image avatar-main"
      />
      
      {/* Hover Image */}
      <img 
        src="/images/hannah-two.jpg" 
        alt="Hannah Peralta" 
        style={{
          width: '100%',
          height: '130%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateY(-5%)',
          filter: 'contrast(1.02) brightness(1.01)',
          opacity: 0,
          pointerEvents: 'none',
        }}
        className="avatar-image avatar-hover"
      />
      
      {/* Overlay gradient */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
        background: `
          linear-gradient(to top, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 50%, transparent 100%),
          radial-gradient(ellipse at bottom, rgba(0,0,0,0.05) 0%, transparent 70%)
        `,
        pointerEvents: 'none',
      }}></div>
    </div>
  )
}