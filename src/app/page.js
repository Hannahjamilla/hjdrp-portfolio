import JourneyClient from './journey/journey-client'

// Server Component page — delegates to the client-only dynamic import wrapper
export default function Home() {
  return <JourneyClient />
}