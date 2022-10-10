import { LoadingButton } from '@mui/lab'
import { useEthers } from '@usedapp/core'
import React, { useState } from 'react'
import Wallet from 'src/common/Wallet'
import { useNFTStaking } from 'src/contexts/NFTStakingContext'
import { toast } from 'react-toastify'
import { formatEther, shortenAddress } from 'src/utils'

export const NFT_dashboard = () => {
    const { availableRewards, rewardsToken, stakedInfo, setApprovalForAllCallback, updateStakingStats } = useNFTStaking()
    const { account } = useEthers()
    const [isWalletApproving, setIsWalletApproving] = useState(false)

    return (
        <>
            <div className='w-full flex flex-col gap-8 p-4 md:p-8'>
                <div className='w-full flex flex-col md:flex-row gap-4'>
                    <div className='basis-1/2 flex flex-col gap-2'>
                        <div className='text-[22px] md:text-[25px] text-app-purple uppercase'>
                            Account{` `}<span style={{ fontFamily: 'bebas' }}>{shortenAddress(account, 3)}</span>
                        </div>
                        <div className='text-[22px] md:text-[25px] text-[#000]' style={{ fontFamily: 'bebas' }}>
                            claimable rewards:{` `}<span className='text-app-purple'>{rewardsToken ? formatEther(availableRewards, rewardsToken.decimals, 2, true) + ' ' + rewardsToken.symbol : ''}</span>
                        </div>
                        <div className='text-[22px] md:text-[25px] text-[#000]' style={{ fontFamily: 'bebas' }}>
                            total earned:{` `}<span className='text-app-purple'>{stakedInfo ? formatEther(stakedInfo.rewardDebt, rewardsToken.decimals, 2, true) + ' ' + rewardsToken.symbol : ''}</span>
                        </div>
                    </div>
                    <div className='basis-1/2 flex flex-col gap-2'>
                        <div className='w-full flex flex-col gap-1'>
                            <div className='w-full text-[#000] text-[22px] md:text-[25px]'>
                                {}% nfts staked
                            </div>
                            <div className='w-full max-w-[400px] rounded-[5px] px-[10px] py-[5px] h-[22px] bg-[#000]'>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}