import './globals.css'

export const metadata = {
  title: 'Hannah Jamilla Peralta - Portfolio',
  description: 'Hannah Peralta - Full Stack Developer & Designer specializing in modern web applications',
}

// Next.js 15 requires viewport / themeColor in a separate export
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#ffffff',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Load Inter & Space Grotesk via standard Google Fonts link — avoids 404 on hardcoded woff2 URLs */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}