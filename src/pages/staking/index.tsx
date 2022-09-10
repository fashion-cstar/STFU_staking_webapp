/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { YourStake } from './YouStake'
import { StakingPlatform } from './StakingPlatform'

export const Staking = () => {
 

  return (
    <div className='w-full flex flex-col-reverse lg:flex-row lg:items-stretch'>
      <div className="h-screen lg:basis-1/3 md:h-auto md:bg-none w-full bg-black min-w-[350px] bg-bottom bg-no-repeat bg-[url('./assets/bg_leftside.svg')] lg:bg-[url('./assets/bg_leftside.svg')] order-2 lg:order-1">
        <YourStake />
      </div>
      <div className='lg:basis-2/3 w-full bg-white p-5 flex justify-center relative order-1 lg:order-2'>
        <StakingPlatform />
      </div>
    </div>
  )
}
