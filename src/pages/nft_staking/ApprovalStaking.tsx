import { LoadingButton } from '@mui/lab'
import { useEthers } from '@usedapp/core'
import React, { useState } from 'react'
import Wallet from 'src/common/Wallet'
import { useNFTStaking } from 'src/contexts/NFTStakingContext'
import { toast } from 'react-toastify'

export const ApprovalStaking = () => {
    const { isApprovedForAll, fetchingStatus, setApprovalForAllCallback, updateStakingStats } = useNFTStaking()
    const { account } = useEthers()
    const [isWalletApproving, setIsWalletApproving] = useState(false)

    const onApprove = async () => {
        setIsWalletApproving(true)
        try {
            await setApprovalForAllCallback().then((res: any) => {
                if (res.status === 1) {
                    setIsWalletApproving(false)
                    updateStakingStats()
                    toast.success('Approved!')
                } else {
                    toast.error(`Transaction reverted! Tx:${res.hash}`)
                }
            }).catch((error: any) => {
                console.log(error)
                setIsWalletApproving(false)
                let err: any = error
                toast.error((err.data?.message || err?.message || err).toString())
            })
        } catch (error) {
            console.log(error)
            setIsWalletApproving(false)
        }
        return null;
    }

    return (
        <><div className='w-full flex justify-center'>
            <div className='max-w-[1440px] w-full px-6 md:px-8'>
                <div className='w-full text-[22px] md:text-[25px] text-[#000] font-semibold my-6 md:my-8' style={{ fontFamily: 'Bebas' }}>Stake your 'Mad Scientist' NFTs to earn BNB for staking!</div>
                <div className='w-full flex flex-col gap-6 text-[25px] text-[#000] hidden md:flex'>
                    <div className=''>Click <span className='text-[#7F41E4]'>"Approve Staking“</span>, so your address is eligible to stake.</div>
                    <span className='font-semibold' style={{ fontFamily: 'Bebas' }}>
                        This requires a BSC transaction and a one time gas fee.
                        Select the NFTs you want to stake on the left.
                        Click "Stake Selected NFTs" and approve the transaction.
                        Sit back and earn BNB every day.
                    </span>
                </div>
            </div>
        </div>
            <div className='w-full bg-app-purple py-6 md:py-8 my-8 md:my-10 flex  flex-col items-center gap-4'>
                <div className='text-[25px] text-white uppercase text-center' style={{ textShadow: '2px 2px #000000' }}>
                    access to stake dashboard:
                </div>
                {account ? <LoadingButton
                    variant="contained"
                    sx={{ padding: '22px 24px', marginLeft: '12px', marginRight: '12px', fontFamily: 'agressive', boxShadow: '3px 3px #000' }}
                    loading={isWalletApproving}
                    loadingPosition="start"
                    color="primary"
                    onClick={onApprove}
                    disabled={!account || isApprovedForAll || fetchingStatus}
                >
                    <span className='text-[25px] md:text-[30px] text-[#000000] uppercase leading-[1]'>{isWalletApproving ? 'Approving ...' : 'Approve staking'}</span>
                </LoadingButton> :
                    <Wallet isMobile={false} />
                }
            </div>
            <div className='w-full flex justify-center md:hidden'>
                <div className='max-w-[1440px] w-full px-6 md:px-8'>
                    <div className='w-full flex flex-col gap-6 text-[25px] text-[#000]'>
                        <div className=''>Click <span className='text-[#7F41E4]'>"Approve Staking“</span>, so your address is eligible to stake.</div>
                        <span className='font-semibold' style={{ fontFamily: 'Bebas' }}>
                            This requires a BSC transaction and a one time gas fee.
                            Select the NFTs you want to stake on the left.
                            Click "Stake Selected NFTs" and approve the transaction.
                            Sit back and earn BNB every day.
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}