import { useEthers } from '@usedapp/core'
import React, { useEffect, useRef, useState } from 'react'
import { NFTContractAddress } from 'src/constants/AppConstants'
import rarity from 'src/constants/NFT_Rarity'
import { INFTokenInfo, useNFTStaking } from 'src/contexts/NFTStakingContext'
import { getEtherscanLink, shortenAddress } from 'src/utils'

export const Detailed_view = ({ viewNFT, setViewNFT }: { viewNFT: INFTokenInfo, setViewNFT: (v: INFTokenInfo) => void }) => {
    const { NFTContractOwner } = useNFTStaking()

    return (
        <>
            <div className='w-full flex flex-col gap-4 lg:gap-2 my-8 relative pb-8'>
                <div className='w-full flex flex-col lg:flex-row gap-8 items-center lg:items-start px-4 sm:px-6 lg:px-8'>
                    <div className='w-full lg:basis-1/3 flex flex-col gap-2'>
                        <div className='w-full'>
                            <div className='text-[21px] sm:text-[24px] text-[#000] mb-1 uppercase text-center' style={{ textShadow: '2px 2px 0px #6FFF39' }}>{viewNFT.metadata.name}</div>
                            <a href={viewNFT.metadata.image} target="_blank" rel="noreferrer">
                                <div className='w-full hover:border hover:border-[#000] hover:scale-[1.02]' style={{ transition: "transform 150ms ease 0s" }}>
                                    <img src={viewNFT.metadata.image} width={'100%'} />
                                </div>
                            </a>
                        </div>
                        <div className='w-full'>
                            <div className='w-full text-[18px] md:text-[20px] text-[#000] border-b-2 border-[#555] mb-2'>Details</div>
                            <div className='w-full flex flex-col font-semibold' style={{ fontFamily: 'bebas' }}>
                                <div className='w-full flex justify-between text-[18px] text-[20px]'>
                                    <span className='text-[#000]'>contract address</span>
                                    <a href={getEtherscanLink(56, NFTContractAddress, 'address')} target="_blank" rel="noreferrer">
                                        <span className='text-app-green underline'>{shortenAddress(NFTContractAddress, 3)}</span>
                                    </a>
                                </div>
                                <div className='w-full flex justify-between text-[18px] text-[20px] text-[#000]'>
                                    <span className=''>token id</span>
                                    <span className=''>{viewNFT.tokenId}</span>
                                </div>
                                <div className='w-full flex justify-between text-[18px] text-[20px] text-[#000]'>
                                    <span className=''>token standard</span>
                                    <span className=''>ERC721</span>
                                </div>
                                <div className='w-full flex justify-between text-[18px] text-[20px] text-[#000]'>
                                    <span className=''>blockchain</span>
                                    <span className=''>BSC</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:basis-2/3 flex flex-col gap-2 mb-4 lg:mb-0'>
                        <div className='w-full flex flex-col gap-1'>
                            <div className='w-full py-1 px-4 bg-app-green flex gap-2 lg:gap-4 items-center'>
                                <svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 5.5H1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19 1.5H1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M19 9.5H1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15 13.5H1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className='text-[21px] text-[24px] text-[#000]'>description</div>
                            </div>
                            <div className='text-[25px] text-app-purple mt-1' style={{ fontFamily: 'bebas' }}>
                                {NFTContractOwner && <>
                                    <span>{'by '}</span>                                    
                                    <a href={getEtherscanLink(56, NFTContractOwner, 'address')} target="_blank" rel="noreferrer">
                                        <span className='text-app-purple underline'>{shortenAddress(NFTContractOwner, 3)}</span>
                                    </a>
                                </>}
                            </div>
                            <div className='text-[25px] text-[#000]' style={{ fontFamily: 'bebas' }}>{viewNFT.metadata.description}</div>
                        </div>
                        <div className='w-full flex flex-col gap-1 mt-6'>
                            <div className='w-full py-1 px-4 bg-app-green flex gap-2 lg:gap-4 items-center'>
                                <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19.59 13.3265L12.42 20.4965C12.2343 20.6825 12.0137 20.83 11.7709 20.9306C11.5281 21.0313 11.2678 21.0831 11.005 21.0831C10.7422 21.0831 10.4819 21.0313 10.2391 20.9306C9.99632 20.83 9.77575 20.6825 9.59 20.4965L1 11.9165V1.9165H11L19.59 10.5065C19.9625 10.8812 20.1716 11.3881 20.1716 11.9165C20.1716 12.4449 19.9625 12.9518 19.59 13.3265V13.3265Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6 6.9165H6.01" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className='text-[21px] text-[24px] text-[#000]'>properties</div>
                            </div>
                            <div className='w-full flex gap-2 flex-wrap justify-center lg:justify-start'>
                                {
                                    viewNFT.metadata.attributes.map((item: any) => {
                                        let index = rarity.findIndex((a) => a.trait_type === item.trait_type)
                                        let index1 = rarity[index].includes.findIndex((b) => b.value === item.value)
                                        return (
                                            <div className='border-2 border-[#6FFF39] p-1 md:p-2 flex flex-col gap-1 items-center mt-2'>
                                                <div className='text-[15px] md:text-[16px] text-app-purple'>{item.trait_type}</div>
                                                <div className='text-[16px] text-[#000] font-semibold' style={{ fontFamily: 'bebas' }}>{item.value}</div>
                                                <div className='text-[12px] text-[#000] font-semibold' style={{ fontFamily: 'bebas' }}>
                                                    <span className='text-[14px] text-app-purple'>{Math.round(rarity[index].includes[index1].percent * 100) / 100}%</span>{` have this trait`}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full hidden lg:flex justify-end mt-8 absolute right-0 bottom-0'>
                    <div className='bg-app-purple flex gap-4 py-2 pl-4 pr-[60px] cursor-pointer' onClick={() => setViewNFT(undefined)}>
                        <svg width="39" height="40" viewBox="0 0 39 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M19.5 4.04545C10.6885 4.04545 3.54545 11.1885 3.54545 20C3.54545 28.8115 10.6885 35.9545 19.5 35.9545C28.3115 35.9545 35.4545 28.8115 35.4545 20C35.4545 11.1885 28.3115 4.04545 19.5 4.04545ZM0 20C0 9.23045 8.73045 0.5 19.5 0.5C30.2696 0.5 39 9.23045 39 20C39 30.7696 30.2696 39.5 19.5 39.5C8.73045 39.5 0 30.7696 0 20Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.8896 11.7197C21.5864 12.4066 21.5864 13.5202 20.8896 14.2071L15.014 19.9987L20.8896 25.7903C21.5864 26.4772 21.5864 27.5908 20.8896 28.2777C20.1927 28.9645 19.063 28.9645 18.3662 28.2777L11.2289 21.2424C10.5321 20.5555 10.5321 19.4419 11.2289 18.755L18.3662 11.7197C19.063 11.0329 20.1927 11.0329 20.8896 11.7197Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M10.7063 20.0026C10.7063 18.9467 11.4938 18.0908 12.4651 18.0908H26.5357C27.5071 18.0908 28.2945 18.9467 28.2945 20.0026C28.2945 21.0584 27.5071 21.9143 26.5357 21.9143H12.4651C11.4938 21.9143 10.7063 21.0584 10.7063 20.0026Z" fill="white" />
                        </svg>
                        <div className='text-white text-[27px] lg:text-[30px]'>GO BACK</div>
                    </div>
                </div>
            </div >
        </>
    )
}