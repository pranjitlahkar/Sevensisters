import Milestones from '@/components/Milestones'
import ValuesStats from '@/components/ValuesStats'
import Videoshowcase from '@/components/Videoshowcase'
import OurStory from '@/components/Ourstory'
import React from 'react'
import Partnership from '@/components/Partnership'
import Stats from '@/components/Stats'
import FutureVision from '@/components/FutureVision'

export const metadata = {
  title: 'About Us',
};

const page = () => {


  return (
    <>

      <Videoshowcase />
      <OurStory />

      <Partnership />
      <FutureVision />
      <Stats />
      <ValuesStats backgroundImage="/images/background/background1.jpg" />
    </>

  )
}

export default page