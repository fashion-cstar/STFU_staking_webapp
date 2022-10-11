/* eslint-disable react-hooks/exhaustive-deps */
import { useEthers } from '@usedapp/core'
import React, { useState } from 'react'
import { useNFTStaking } from 'src/contexts/NFTStakingContext'
import { ApprovalStaking } from './ApprovalStaking'
import { NFT_dashboard } from './NFT_dashboard'

export const NFTStaking = () => {
    const { isApprovedForAll } = useNFTStaking()
    const { account } = useEthers()

    return (
        <div className="w-full" style={{display: 'flex', flexFlow: 'column'}}>
            <div className="w-full relative pt-[53px]" style={{flex: '1 1 auto'}}>
                <div className={`w-full absolute left-[0px] top-[-10px] h-[53px] bg-app-green bg-center bg-repeat-x bg-[url('./assets/nft_mobile_side.svg')] lg:bg-[url('./assets/nft_desktop_side.svg')]`}>
                </div>
                <div className='w-full flex flex-col xl:flex-row justify-center xl:items-end gap-2 px-8'>
                    <div className='flex flex-col lg:flex-row items-center justify-center lg:gap-4 leading-[1] mint-title-shadow lg:mt-4 xl:mt-8'>
                        <span className='lg:text-[60px] sm:text-[50px] text-[40px] text-[#000] uppercase'>mad</span>
                        <span className='lg:text-[60px] sm:text-[50px] text-[40px] text-[#000] uppercase'>scientists</span>
                    </div>
                    <div className='hidden lg:flex px-4 justify-center items-end leading-[1]'>
                        <span className='text-[41px] text-app-purple uppercase' style={{ fontFamily: 'Bebas' }}>Staking</span>
                    </div>
                    <div className='lg:hidden px-4 flex justify-center'>
                        <span className='text-[35px] text-app-purple uppercase' style={{ fontFamily: 'Bebas' }}>Staking</span>
                    </div>
                </div>
                <div className='w-full flex justify-center mt-8'>
                    <div className='w-full lg:mx-6 border border-b border-[#000]'></div>
                </div>
                <div className='w-full flex justify-center mt-[1px]'>
                    <div className='w-full lg:mx-6 border border-b border-[#6FFF39]'></div>
                </div>
                {(!isApprovedForAll || !account) ?
                    <>
                        <ApprovalStaking />
                        <div className='h-[40px]' />
                    </> :
                    <NFT_dashboard />}
                <div className={`w-full absolute left-[0px] bottom-[-30px] h-[50px] lg:h-[30px] bg-app-green bg-center lg:bg-top bg-repeat-x bg-[url('./assets/nft_mobile_side.svg')] lg:bg-[url('./assets/nft_desktop_side.svg')]`}>
                    {/* <div className={`w-full absolute lg:fixed left-[0px] bottom-[-30px] lg:bottom-[0px] h-[50px] lg:h-[30px] bg-app-green bg-center lg:bg-top bg-repeat-x bg-[url('./assets/nft_mobile_side.svg')] lg:bg-[url('./assets/nft_desktop_side.svg')]`}> */}
                </div>
            </div>
        </div>
    )
}
