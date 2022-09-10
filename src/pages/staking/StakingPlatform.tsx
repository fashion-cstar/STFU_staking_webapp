import { Button } from "@mui/material"
import { Web3ModalButton } from "src/common/WalletConnect/Web3Modal"
import { useEthers } from '@usedapp/core'
import SubmitTextInput from "src/common/SubmitTextInput"
import { useState } from "react"
import { AppTokenAddress, BUY_STFU_URL, StakingContractAddress } from "src/constants/AppConstants"
import DepositModal from "./DepositModal"
import { formatEther, getShortDateTimeWithoutSeconds_, shortenAddress } from "src/utils"
import { useStaking } from 'src/contexts'

export const StakingPlatform = () => {
    const { account } = useEthers()
    const [isOpenDeposit, setIsOpenDeposit] = useState(false)
    const [isBorder, setIsBorder] = useState(false)
    const [submitText, setSubmitText] = useState('')
    const { newRewards, poolInfo, totalStaked, holderUnlockTime } = useStaking()

    const handleFocus = () => {
        setIsBorder(true)
    }

    const handleBlur = () => {
        setIsBorder(false)
    }

    const onChange = (text: string) => {
        setSubmitText(text)
    }

    const onSubmit = () => {

    }

    const onCloseDeposit = () => {
        setIsOpenDeposit(false)
    }

    const onDeposit = () => {
        setIsOpenDeposit(true)
    }

    return (
        <>
            <DepositModal isOpen={isOpenDeposit} handleClose={onCloseDeposit} />
            <div className='hidden md:flex absolute w-[200px] pt-4 flex-col gap-1 top-0 left-0'>
                <div className='h-2 w-full bg-black' />
                <div className='h-2 w-full bg-black' />
                <div className='h-2 w-full bg-black' />
                <div className='h-2 w-full bg-black' />
                <div className='h-2 w-full bg-black' />
            </div>
            <div className='md:hidden w-[200px] pl-4 flex gap-1 absolute top-0 left-0'>
                <div className='w-2 h-[50px] bg-black' />
                <div className='w-2 h-[50px] bg-black' />
                <div className='w-2 h-[50px] bg-black' />
                <div className='w-2 h-[50px] bg-black' />
                <div className='w-2 h-[50px] bg-black' />
            </div>
            <div className='w-full max-w-[740px] flex flex-col items-center px-2 md:py-6 md:px-10'>
                <div className='w-full flex flex-col gap-1 md:gap-3 mt-10 md:mt-0'>
                    <div className='w-full text-center md:text-right text-[#6FFF39] text-[26px] md:text-[34px] uppercase'>STFU LABS</div>
                    <div className='w-full text-center md:text-right text-black text-[26px] md:text-[34px] uppercase'>STAKING PLATFORM</div>
                    <div className='flex gap-4 mt-2 mb-4 md:mb-0 md:gap-8 flex-wrap justify-center md:justify-end'>
                        <Button
                            variant="outlined"
                            color="secondary"
                            href={BUY_STFU_URL}
                            target="_blank"
                            sx={{ border: "3px solid #7F41E4", width: '180px', height: '48px', fontFamily: 'agressive' }}
                        >
                            <span className="text-[16px] md:text-[18px] text-black uppercase">Buy Token</span>
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onDeposit}
                            sx={{ borderColor: "#6FFF39", width: '180px', height: '48px', fontFamily: 'agressive' }}
                        >
                            <span className="text-[16px] md:text-[18px] text-black uppercase">Stake</span>
                        </Button>
                    </div>
                    <div className='w-full border border-b border-[#000000] mb-2' />
                </div>
                <div className='w-full flex flex-col gap-4' style={{ paddingBottom: '48px' }}>
                    <div className='w-full mt-8 text-center text-black text-[18px] md:text-[20px] uppercase'>Staking Information</div>
                    <div className='w-full bg-[#6FFF39] flex py-4 px-4 md:px-8 mb-12 flex-col gap-4'>
                        <div className='flex justify-between md:px-10'>
                            <span className='text-black text-[12px] uppercase'>Total pending rewards</span>
                            <span className='text-white text-[12px] uppercase'>{formatEther(newRewards, 18, 2, true)}</span>
                        </div>
                        <div className='flex justify-between md:px-10'>
                            <span className='text-black text-[12px] uppercase'>Last time reward</span>
                            <span className='text-white text-[12px] uppercase'>{poolInfo?poolInfo.lastRewardTimestamp>0?getShortDateTimeWithoutSeconds_(new Date(poolInfo.lastRewardTimestamp)):'':''}</span>
                        </div>
                        <div className='flex justify-between md:px-10'>
                            <span className='text-black text-[12px] uppercase'>Next Unlocked Date</span>
                            <span className='text-white text-[12px] uppercase'>{holderUnlockTime>0?getShortDateTimeWithoutSeconds_(new Date(holderUnlockTime)):''}</span>
                        </div>
                        <div className='flex justify-between md:px-10'>
                            <span className='text-black text-[12px] uppercase'>staked tokens</span>
                            <span className='text-white text-[12px] uppercase'>{formatEther(totalStaked, 18, 2, true)}</span>
                        </div>
                        <div className='flex justify-between md:px-10'>
                            <span className='text-black text-[12px] uppercase'>token contract</span>
                            <span className='text-white text-[12px] uppercase'>{shortenAddress(AppTokenAddress, 3)}</span>
                        </div>
                        <div className='flex justify-between md:px-10'>
                            <span className='text-black text-[12px] uppercase'>staking contract</span>
                            <span className='text-white text-[12px] uppercase'>{shortenAddress(StakingContractAddress, 3)}</span>
                        </div>
                        <div className='flex justify-between md:px-10 items-stretch'>
                            <div className='w-full' style={{ border: isBorder ? "1px solid black" : "1px solid white" }} >
                                <SubmitTextInput handleFocus={handleFocus}
                                    handleBlur={handleBlur}
                                    onChange={onChange} />
                            </div>
                            <div className='cursor-pointer bg-black text-white text-[12px] w-[100px] uppercase hover:bg-[#101010] flex justify-center items-center' onClick={onSubmit}>
                                Submit
                            </div>
                        </div>
                    </div>
                    <div className='hidden md:flex w-[200px] pb-4 flex-col gap-1 absolute bottom-0 right-0'>
                        <div className='h-2 w-full bg-black' />
                        <div className='h-2 w-full bg-black' />
                        <div className='h-2 w-full bg-black' />
                        <div className='h-2 w-full bg-black' />
                        <div className='h-2 w-full bg-black' />
                    </div>
                </div>
            </div>
        </>
    )
}