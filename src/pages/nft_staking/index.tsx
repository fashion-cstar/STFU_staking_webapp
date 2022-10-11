/* eslint-disable react-hooks/exhaustive-deps */
import { useEthers } from '@usedapp/core'
import React, { useEffect, useState } from 'react'
import { INFTokenInfo, useNFTStaking } from 'src/contexts/NFTStakingContext'
import { ApprovalStaking } from './ApprovalStaking'
import { Detailed_view } from './NFT_detail'
import { NFT_dashboard } from './NFT_dashboard'

export const NFTStaking = () => {
    const { isApprovedForAll } = useNFTStaking()
    const { account } = useEthers()
    const [viewNFT, setViewNFT] = useState<INFTokenInfo>()

    useEffect(() => {
        setViewNFT(undefined)
    }, [account])

    return (
        <div className="w-full" style={{ display: 'flex', flexFlow: 'column' }}>
            <div className="w-full relative pt-[53px]" style={{ flex: '1 1 auto' }}>
                <div className={`w-full absolute left-[0px] top-[-10px] h-[53px] bg-app-green bg-center bg-repeat-x bg-[url('./assets/nft_mobile_side.svg')] lg:bg-[url('./assets/nft_desktop_side.svg')]`}>
                </div>
                {viewNFT && <div className='flex lg:hidden my-4 ml-4 gap-2 cursor-pointer' onClick={() => setViewNFT(undefined)}>
                    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M13 2.27273C7.35163 2.27273 2.77273 6.85163 2.77273 12.5C2.77273 18.1484 7.35163 22.7273 13 22.7273C18.6484 22.7273 23.2273 18.1484 23.2273 12.5C23.2273 6.85163 18.6484 2.27273 13 2.27273ZM0.5 12.5C0.5 5.59644 6.09644 0 13 0C19.9036 0 25.5 5.59644 25.5 12.5C25.5 19.4036 19.9036 25 13 25C6.09644 25 0.5 19.4036 0.5 12.5Z" fill="#7F41E4" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M13.8905 7.19302C14.3372 7.63331 14.3372 8.34718 13.8905 8.78747L10.1241 12.5L13.8905 16.2126C14.3372 16.6529 14.3372 17.3668 13.8905 17.8071C13.4439 18.2474 12.7196 18.2474 12.273 17.8071L7.6978 13.2973C7.25112 12.857 7.25112 12.1431 7.6978 11.7028L12.273 7.19302C12.7196 6.75272 13.4439 6.75272 13.8905 7.19302Z" fill="#7F41E4" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.36279 12.4999C7.36279 11.8231 7.86757 11.2744 8.49024 11.2744H17.5099C18.1325 11.2744 18.6373 11.8231 18.6373 12.4999C18.6373 13.1767 18.1325 13.7254 17.5099 13.7254H8.49024C7.86757 13.7254 7.36279 13.1767 7.36279 12.4999Z" fill="#7F41E4" />
                    </svg>
                    <div className='text-app-purple text-[20px]'>GO BACK</div>
                </div>}
                <div className='w-full flex flex-col xl:flex-row justify-center xl:items-end gap-2 px-8 mt-2'>
                    <div className='flex flex-col lg:flex-row items-center justify-center lg:gap-4 leading-[1] mint-title-shadow lg:mt-4 xl:mt-8'>
                        <span className='lg:text-[60px] sm:text-[50px] text-[40px] text-[#000] uppercase'>{viewNFT ? 'Detailed' : 'Mad'}</span>
                        <span className='lg:text-[60px] sm:text-[50px] text-[40px] text-[#000] uppercase'>{viewNFT ? 'View' : 'Scientists'}</span>
                    </div>
                    {!viewNFT && <><div className='hidden lg:flex px-4 justify-center items-end leading-[1]'>
                        <span className='text-[41px] text-app-purple uppercase' style={{ fontFamily: 'Bebas' }}>Staking</span>
                    </div>
                        <div className='lg:hidden px-4 flex justify-center'>
                            <span className='text-[35px] text-app-purple uppercase' style={{ fontFamily: 'Bebas' }}>Staking</span>
                        </div></>}
                </div>
                <div className='w-full flex justify-center mt-8'>
                    <div className='w-full lg:mx-6 border border-b border-[#000]'></div>
                </div>
                <div className='w-full flex justify-center mt-[1px]'>
                    <div className='w-full lg:mx-6 border border-b border-[#6FFF39]'></div>
                </div>
                {viewNFT ? <>
                    <Detailed_view viewNFT={viewNFT} setViewNFT={setViewNFT} />
                </> : <>
                    {(!isApprovedForAll || !account) ?
                        <>
                            <ApprovalStaking />
                            <div className='h-[40px]' />
                        </> :
                        // eslint-disable-next-line react/jsx-pascal-case
                        <NFT_dashboard setViewNFT={setViewNFT} />
                    }
                </>}
                <div className={`w-full absolute left-[0px] bottom-[-30px] h-[50px] lg:h-[30px] bg-app-green bg-center lg:bg-top bg-repeat-x bg-[url('./assets/nft_mobile_side.svg')] lg:bg-[url('./assets/nft_desktop_side.svg')]`}>
                    {/* <div className={`w-full absolute lg:fixed left-[0px] bottom-[-30px] lg:bottom-[0px] h-[50px] lg:h-[30px] bg-app-green bg-center lg:bg-top bg-repeat-x bg-[url('./assets/nft_mobile_side.svg')] lg:bg-[url('./assets/nft_desktop_side.svg')]`}> */}
                </div>
            </div>
        </div>
    )
}
