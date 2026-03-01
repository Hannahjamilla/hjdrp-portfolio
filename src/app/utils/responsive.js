// Responsive utility functions for consistent breakpoints

export const breakpoints = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
}

export const getResponsiveValue = (windowWidth, desktop, tablet, mobile) => {
  if (windowWidth < breakpoints.tablet) return mobile
  if (windowWidth < breakpoints.laptop) return tablet
  return desktop
}

export const isMobileDevice = (width) => width < breakpoints.tablet
export const isTabletDevice = (width) => width >= breakpoints.tablet && width < breakpoints.laptop
export const isDesktopDevice = (width) => width >= breakpoints.laptop

// Responsive spacing scale
export const spacing = {
  xs: (isMobile) => isMobile ? 8 : 12,
  sm: (isMobile) => isMobile ? 12 : 16,
  md: (isMobile) => isMobile ? 16 : 24,
  lg: (isMobile) => isMobile ? 24 : 32,
  xl: (isMobile) => isMobile ? 32 : 48,
  xxl: (isMobile) => isMobile ? 48 : 64,
}

// Responsive font sizes
export const fontSize = {
  xs: (isMobile) => isMobile ? '0.75rem' : '0.875rem',
  sm: (isMobile) => isMobile ? '0.875rem' : '1rem',
  base: (isMobile) => isMobile ? '1rem' : '1.125rem',
  lg: (isMobile) => isMobile ? '1.125rem' : '1.25rem',
  xl: (isMobile) => isMobile ? '1.25rem' : '1.5rem',
  '2xl': (isMobile) => isMobile ? '1.5rem' : '2rem',
  '3xl': (isMobile) => isMobile ? '2rem' : '2.5rem',
  '4xl': (isMobile) => isMobile ? '2.5rem' : '3.5rem',
}

// Touch-friendly sizing
export const touchTargets = {
  minimum: 44, // iOS minimum
  recommended: 48, // Android minimum
  comfortable: 52, // Comfortable for most users
}
