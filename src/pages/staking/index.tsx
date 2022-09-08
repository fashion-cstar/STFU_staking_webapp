/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { YourStake } from './YouStake'
import { StakingPlatform } from './StakingPlatform'

export const Staking = () => {
 

  return (
    <div className='w-full flex flex-col-reverse lg:flex-row lg:items-stretch'>
      <div className='lg:basis-1/3 w-full bg-black min-w-[350px]'>
        <YourStake />
      </div>
      <div className='lg:basis-2/3 w-full bg-white p-5 flex justify-center relative'>
        <StakingPlatform />
      </div>
    </div>
  )
}
