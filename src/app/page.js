
import Herosection from '@/components/Herosection'

import React from 'react'
import Navbartwo from '@/components/Navbartwo'
import Boardofdirectors from '@/components/Boardofdirectors'
import Directorsnote from '@/components/Directorsnote'
import Gallery from '@/components/Gallery'
import Milestones from '@/components/Milestones'
import QueensCrownIntro from '@/components/Crown'


import Videoshowcase from '@/components/Videoshowcase'
import OurStory from '@/components/Ourstory'
import Animationwhiskey from '@/components/Animationwhiskey'
import Inventory from '@/components/Inventory'
import Culture from '@/components/Culture'
import CollabShowcase from '@/components/CollabShowcase'
import FeatureCard from '@/components/FeatureCard'
import ProductionFlow from '@/components/ProductionFlow'
import MissionVision from '@/components/MissionVision'
import VideoScrubber from '@/components/VideoScrubber'
import HeroSlider from '@/components/SliderComponent'
import OurValues from '@/components/OurValues'
import FutureVision from '@/components/FutureVision'
import Vision from '@/components/Vision'
import Mission from '@/components/Mission'
import DirectorsPage from '@/components/Directorboard'

const Home
  = () => {
    return (
      <>
        <div>


          <Herosection />
          <HeroSlider />
          <Videoshowcase />
          <OurStory />
          <FutureVision />
          <FeatureCard />
          <VideoScrubber />
          <CollabShowcase />
          <Culture />

          {/* <Animationwhiskey/> */}



        </div>
      </>
    )
  }

export default Home
