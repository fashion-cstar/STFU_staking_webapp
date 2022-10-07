/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useNFT } from 'src/contexts'

export const NFTStaking = () => {
    const { tokenPerMint, bnbPerMint } = useNFT()

    return (
        <div className="w-full">
            <div className="w-full relative pt-[53px]">
                <div className={`w-full absolute left-[0px] top-[-10px] h-[53px] bg-[#6FFF39] bg-center bg-repeat-x bg-[url('./assets/nft_mobile_side.svg')] lg:bg-[url('./assets/nft_desktop_side.svg')]`}>
                </div>
                <div className='w-full flex flex-col xl:flex-row justify-center xl:items-end gap-2 px-8'>
                    <div className='flex flex-col lg:flex-row items-center justify-center lg:gap-4 leading-[1] mint-title-shadow lg:mt-4 xl:mt-8'>
                        <span className='lg:text-[60px] sm:text-[50px] text-[40px] text-[#000] uppercase'>mad</span>
                        <span className='lg:text-[60px] sm:text-[50px] text-[40px] text-[#000] uppercase'>scientists</span>
                    </div>
                    <div className='hidden lg:flex px-4 justify-center items-end leading-[1]'>
                        <span className='text-[41px] text-[#7F41E4] uppercase' style={{ fontFamily: 'Bebas' }}>Staking</span>
                    </div>
                    <div className='lg:hidden px-4 flex justify-center'>
                        <span className='text-[35px] text-[#7F41E4] uppercase' style={{ fontFamily: 'Bebas' }}>Staking</span>
                    </div>
                </div>
                <div className='w-full flex justify-center mt-8'>
                    <div className='w-full lg:mx-6 border border-b border-[#000]'></div>
                </div>
                <div className='w-full flex justify-center mt-[1px]'>
                    <div className='w-full lg:mx-6 border border-b border-[#6FFF39]'></div>
                </div>
                <div className='w-full flex justify-center'>
                    <div className='max-w-[1440px] w-full px-6 md:px-8'>
                        <div className='w-full text-[22px] md:text-[25px] text-[#000] font-semibold my-6 md:my-8' style={{ fontFamily: 'Bebas' }}>Stake your 'Mad Scientist' NFTs to earn BNB for staking!</div>
                        <div className='w-full flex flex-col gap-6 text-[25px] text-[#000]'>
                            <div className=''>Click <span className='text-[#7F41E4]'>"Approve Staking“</span>, so your address is eligible to stake.</div>
                            <span className='font-semibold' style={{ fontFamily: 'Bebas' }}>
                                This requires an BSC transaction and a one time gas fee.
                                Select the tokens you want to stake on the left.
                                Click "Stake Selected Tokens" and approve the transaction.
                                Sit back and earn $STFU every day.
                            </span>
                        </div>
                    </div>
                </div>
                <div className='w-full bg-app-purple py-6 md:py-8 my-10 flex  flex-col items-center gap-4'>
                    <div className='text-[25px] text-white uppercase text-center' style={{ textShadow: '2px 2px #000000' }}>
                        access to stake dashboard:
                    </div>
                    <div className='bg-white rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg mx-6 px-8 py-2 max-w-[400px] text-[25px] md:text-[30px] text-center text-[#6FFF39] uppercase' style={{ boxShadow: '3px 3px #000' }}>
                        Coming soon
                    </div>
                </div>
                <div className='h-[40px]' />
                {/* <div className={`w-full absolute left-[0px] bottom-[-30px] h-[50px] lg:h-[30px] bg-[#6FFF39] bg-center lg:bg-top bg-repeat-x bg-[url('./assets/nft_mobile_side.svg')] lg:bg-[url('./assets/nft_desktop_side.svg')]`}> */}
                <div className={`w-full absolute lg:fixed left-[0px] bottom-[-30px] lg:bottom-[0px] h-[50px] lg:h-[30px] bg-[#6FFF39] bg-center lg:bg-top bg-repeat-x bg-[url('./assets/nft_mobile_side.svg')] lg:bg-[url('./assets/nft_desktop_side.svg')]`}>
                </div>
            </div>
        </div>
    )
}
