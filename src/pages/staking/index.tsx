/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { YourStake } from './YouStake'
import { StakingPlatform } from './StakingPlatform'

export const Staking = () => {
  const [stakingVersion, setStakingVersion] = useState(0)

  return (
    <div className="w-full pt-[0px] md:pt-[41px] md:pb-[40px] md:px-[40px] bg-[#FFFFFF] flex justify-center relative bg-[url('./assets/bg.svg')] bg-fixed bg-repeat">
      <div className="flex w-full h-full justify-center max-w-[1440px] md:border md:border-4 md:border-[#000000] bg-[#FFFFFF]">
        <div className='w-full flex flex-col-reverse lg:flex-row lg:items-stretch'>
          <div className="h-screen lg:basis-1/3 md:h-auto md:bg-none w-full bg-black min-w-[350px] bg-bottom bg-no-repeat bg-[url('./assets/bg_leftside.svg')] lg:bg-[url('./assets/bg_leftside.svg')] order-2 lg:order-1">
            <YourStake stakingVersion={stakingVersion} />
          </div>
          <div className='lg:basis-2/3 w-full bg-white p-5 flex justify-center relative order-1 lg:order-2' style={{ minHeight: 'calc(100vh - 185px)' }}>
            <StakingPlatform stakingVersion={stakingVersion} setStakingVersion={setStakingVersion} />
          </div>
        </div>
      </div>
    </div>
  )
}
