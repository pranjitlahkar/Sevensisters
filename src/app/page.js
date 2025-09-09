
import Herosection from '@/components/Herosection'

import React from 'react'
import Navbartwo from '@/components/Navbartwo'
import Boardofdirectors from '@/components/Boardofdirectors'
import Directorsnote from '@/components/Directorsnote'
import Gallery from '@/components/Gallery'
import Milestones from '@/components/Milestones'

import Videoshowcase from '@/components/Videoshowcase'
import OurStory from '@/components/Ourstory'
import Animationwhiskey from '@/components/Animationwhiskey'
import Inventory from '@/components/Inventory'
import Culture from '@/components/Culture'
import CollabShowcase from '@/components/CollabShowcase'
import FeatureCard from '@/components/FeatureCard'
import ProductionFlow from '@/components/ProductionFlow'

const Home
 = () => {
  return (
    <div>
      
      <Herosection/>
       <Animationwhiskey 
        videoSrc="/video.mp4"
        title="Experience Innovation"
        description="Watch as our story unfolds through scroll-controlled video animation"
      />
      <Inventory/>
      <FeatureCard/>
      <Boardofdirectors/>
      <Directorsnote/>
      <Gallery/>
      <Milestones/>
      <Videoshowcase/>
      <OurStory/>
      <CollabShowcase/>
      <ProductionFlow/>
      <Culture/>
      {/* <Scrollvideo/> */}
      {/* <Animationwhiskey/> */}
    

  
    </div>
  )
}

export default Home
