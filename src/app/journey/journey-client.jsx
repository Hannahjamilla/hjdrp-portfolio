'use client'

import dynamic from 'next/dynamic'

const RoadJourney = dynamic(() => import('../journey/road-journey'), {
  ssr: false,
})

export default function JourneyClient() {
  return <RoadJourney />
}
