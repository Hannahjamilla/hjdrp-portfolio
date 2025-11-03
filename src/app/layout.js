import './globals.css'

export const metadata = {
  title: 'Hannah Jamilla Peralta - Portfolio',
  description: 'Hannah Peralta - Developer Profile',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}