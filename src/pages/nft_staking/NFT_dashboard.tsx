import { LoadingButton } from '@mui/lab'
import { useEthers } from '@usedapp/core'
import React, { useState } from 'react'
import Wallet from 'src/common/Wallet'
import { useNFTStaking } from 'src/contexts/NFTStakingContext'
import { toast } from 'react-toastify'

export const NFT_dashboard = () => {
    const { isApprovedForAll, fetchingStatus, setApprovalForAllCallback, updateStakingStats } = useNFTStaking()
    const { account } = useEthers()
    const [isWalletApproving, setIsWalletApproving] = useState(false)

    return (
        <>
            <div className='w-full flex flex-col gap-8 p-4 md:p-8'>
                <div className='w-full flex flex-col md:flex-row gap-4'>
                    
                </div>
            </div>
        </>
    )
}