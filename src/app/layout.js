import './globals.css'

export const metadata = {
  title: 'Hannah Jamilla Peralta - Portfolio',
  description: 'Hannah Peralta - Full Stack Developer & Designer specializing in modern web applications',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
  themeColor: '#ffffff',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}