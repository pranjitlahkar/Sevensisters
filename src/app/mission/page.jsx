import Mission from '@/components/Mission'
import MissionVision from '@/components/MissionVision'
import Vision from '@/components/Vision'
import React from 'react'

export const metadata = {
  title: 'Mission & Vision',
};

const page = () => {
    return (
        <div>
            <MissionVision />
            <Mission />
            <Vision />



        </div>
    )
}

export default page