import { Button } from "@mui/material"
import { useEthers } from '@usedapp/core'
import { useState } from "react"
import { AppTokenAddress, BUY_STFU_URL, StakingContractAddress, StakingContractAddressV2, StakingV1_LockDuration, StakingV2_LockDuration } from "src/constants/AppConstants"
import DepositModal from "./DepositModal"
import DepositModalV2 from "./DepositModalV2"
import { formatEther, getShortDateTimeWithoutSeconds_, shortenAddress } from "src/utils"
import { useStaking, useStakingV2 } from 'src/contexts'
import LoadingButton from "@mui/lab/LoadingButton"
import { toast } from "react-toastify"

export const StakingPlatform = ({ stakingVersion, setStakingVersion }: { stakingVersion: number, setStakingVersion: (v: number) => void }) => {
    const { account } = useEthers()
    const [isOpenDeposit, setIsOpenDeposit] = useState(false)
    const [isOpenDepositV2, setIsOpenDepositV2] = useState(false)
    const { newRewards, userInfo, poolInfo, totalStaked, holderUnlockTime, pendingReward, blockTimestamp, claimCallback, unstakeCallback, updateStakingStats } = useStaking()
    const {
        newRewards: newRewardsV2,
        userInfo: userInfoV2,
        poolInfo: poolInfoV2,
        totalStaked: totalStakedV2,
        holderUnlockTime: holderUnlockTimeV2,
        pendingReward: pendingRewardV2,
        claimCallback: claimCallbackV2,
        unstakeCallback: unstakeCallbackV2,
        updateStakingStats: updateStakingStatsV2 } = useStakingV2()
    const [isClaiming, setIsClaiming] = useState(false)
    const [isUnstaking, setIsUnstaking] = useState(false)

    const [isClaimingV2, setIsClaimingV2] = useState(false)
    const [isUnstakingV2, setIsUnstakingV2] = useState(false)

    const onCloseDeposit = () => {
        setIsOpenDeposit(false)
    }

    const onCloseDepositV2 = () => {
        setIsOpenDepositV2(false)
    }

    const onDeposit = () => {
        setIsOpenDeposit(true)
    }

    const onDepositV2 = () => {
        setIsOpenDepositV2(true)
    }

    const onClaim = () => {
        setIsClaiming(true)
        try {
            claimCallback().then((res: any) => {
                if (res.status === 1) {
                    toast.success("Claimed successfully!")
                    updateStakingStats()
                } else {
                    toast.error(`Transaction reverted! Tx:${res.hash}`)
                }
                setIsClaiming(false)
            }).catch(error => {
                setIsClaiming(false)
                console.log(error)
                let err: any = error
                toast.error((err.data?.message || err?.message || err).toString())
            })
        } catch (error) {
            setIsClaiming(false)
            console.log(error)
        }
        return null;
    }

    const onUnstake = () => {
        setIsUnstaking(true)
        try {
            unstakeCallback().then((res: any) => {
                if (res.status === 1) {
                    toast.success("Unstaked successfully!")
                    updateStakingStats()
                } else {
                    toast.error(`Transaction reverted! Tx:${res.hash}`)
                }
                setIsUnstaking(false)
            }).catch(error => {
                setIsUnstaking(false)
                console.log(error)
                let err: any = error
                toast.error((err.data?.message || err?.message || err).toString())
            })
        } catch (error) {
            setIsUnstaking(false)
            console.log(error)
        }
        return null;
    }

    const onClaimV2 = () => {
        setIsClaimingV2(true)
        try {
            claimCallbackV2().then((res: any) => {
                if (res.status === 1) {
                    toast.success("Claimed successfully!")
                    updateStakingStatsV2()
                } else {
                    toast.error(`Transaction reverted! Tx:${res.hash}`)
                }
                setIsClaimingV2(false)
            }).catch(error => {
                setIsClaimingV2(false)
                console.log(error)
                let err: any = error
                toast.error((err.data?.message || err?.message || err).toString())
            })
        } catch (error) {
            setIsClaimingV2(false)
            console.log(error)
        }
        return null;
    }

    const onUnstakeV2 = () => {
        setIsUnstakingV2(true)
        try {
            unstakeCallbackV2().then((res: any) => {
                if (res.status === 1) {
                    toast.success("Unstaked successfully!")
                    updateStakingStatsV2()
                } else {
                    toast.error(`Transaction reverted! Tx:${res.hash}`)
                }
                setIsUnstakingV2(false)
            }).catch(error => {
                setIsUnstakingV2(false)
                console.log(error)
                let err: any = error
                toast.error((err.data?.message || err?.message || err).toString())
            })
        } catch (error) {
            setIsUnstakingV2(false)
            console.log(error)
        }
        return null;
    }

    const onChooseStaking = (v: number) => {
        setStakingVersion(v)
    }

    const gotoChooseStaking = () => {
        setStakingVersion(0)
    }

    return (
        <>
            <DepositModal isOpen={isOpenDeposit} handleClose={onCloseDeposit} />
            <DepositModalV2 isOpen={isOpenDepositV2} handleClose={onCloseDepositV2} />
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
                            disabled={stakingVersion === 0}
                            sx={{ border: "3px solid #7F41E4", width: '180px', height: '48px', fontFamily: 'agressive' }}
                        >
                            <span className="text-[16px] md:text-[18px] text-black uppercase">Buy Token</span>
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => { stakingVersion === 1 ? onDeposit() : onDepositV2() }}
                            disabled={stakingVersion === 0}
                            sx={{ borderColor: "#6FFF39", width: '180px', height: '48px', fontFamily: 'agressive' }}
                        >
                            <span className="text-[16px] md:text-[18px] text-black uppercase">Stake</span>
                        </Button>
                    </div>
                    <div className='w-full border border-b border-[#000000] mb-2' />
                </div>
                <div className='w-full flex flex-col gap-4' style={{ paddingBottom: '48px' }}>
                    {stakingVersion > 0 && <>
                        <div className='w-full mt-8 text-center text-black text-[18px] md:text-[20px] uppercase flex gap-2 flex-wrap justify-center'>
                            <div>Staking Information</div><div>({stakingVersion === 1 ? `${StakingV1_LockDuration} lock` : `${StakingV2_LockDuration} lock`})</div>
                        </div>
                        <div className='w-full bg-[#6FFF39] flex py-4 px-4 md:px-8 flex-col gap-4'>
                            <div className='flex justify-between md:px-10'>
                                <span className='text-black text-[12px] uppercase'>Total pending rewards</span>
                                {stakingVersion === 1 && <span className='text-white text-[12px] uppercase text-right'>{formatEther(newRewards, 18, 4, true)}</span>}
                                {stakingVersion === 2 && <span className='text-white text-[12px] uppercase text-right'>{formatEther(newRewardsV2, 18, 4, true)}</span>}
                            </div>
                            <div className='flex justify-between md:px-10'>
                                <span className='text-black text-[12px] uppercase'>Last time reward</span>
                                {stakingVersion === 1 && <span className='text-white text-[12px] uppercase text-right'>{poolInfo ? poolInfo.lastRewardTimestamp > 0 ? getShortDateTimeWithoutSeconds_(new Date(poolInfo.lastRewardTimestamp * 1000)) : '' : ''}</span>}
                                {stakingVersion === 2 && <span className='text-white text-[12px] uppercase text-right'>{poolInfoV2 ? poolInfoV2.lastRewardTimestamp > 0 ? getShortDateTimeWithoutSeconds_(new Date(poolInfoV2.lastRewardTimestamp * 1000)) : '' : ''}</span>}
                            </div>
                            <div className='flex justify-between md:px-10'>
                                <span className='text-black text-[12px] uppercase'>Next Unlocked Date</span>
                                {stakingVersion === 1 && <span className='text-white text-[12px] uppercase text-right'>{holderUnlockTime > 0 ? getShortDateTimeWithoutSeconds_(new Date(holderUnlockTime * 1000)) : ''}</span>}
                                {stakingVersion === 2 && <span className='text-white text-[12px] uppercase text-right'>{holderUnlockTimeV2 > 0 ? getShortDateTimeWithoutSeconds_(new Date(holderUnlockTimeV2 * 1000)) : ''}</span>}
                            </div>
                            <div className='flex justify-between md:px-10'>
                                <span className='text-black text-[12px] uppercase'>staked tokens</span>
                                {stakingVersion === 1 && <span className='text-white text-[12px] uppercase text-right'>{formatEther(totalStaked, 18, 2, true)}</span>}
                                {stakingVersion === 2 && <span className='text-white text-[12px] uppercase text-right'>{formatEther(totalStakedV2, 18, 2, true)}</span>}
                            </div>
                            <div className='flex justify-between md:px-10'>
                                <span className='text-black text-[12px] uppercase'>token contract</span>
                                <span className='text-white text-[12px] uppercase text-right'>{shortenAddress(AppTokenAddress, 3)}</span>
                            </div>
                            <div className='flex justify-between md:px-10'>
                                <span className='text-black text-[12px] uppercase'>staking contract</span>
                                {stakingVersion === 1 && <span className='text-white text-[12px] uppercase text-right'>{shortenAddress(StakingContractAddress, 3)}</span>}
                                {stakingVersion === 2 && <span className='text-white text-[12px] uppercase text-right'>{shortenAddress(StakingContractAddressV2, 3)}</span>}
                            </div>
                            {stakingVersion === 1 && <div className='w-full flex justify-center gap-4 flex-wrap'>
                                <LoadingButton
                                    variant="outlined"
                                    sx={{ backgroundColor: "#ffffff", border: "3px solid #7F41E4", width: '280px', height: '48px', fontFamily: 'agressive' }}
                                    loading={isClaiming}
                                    loadingPosition="start"
                                    color="secondary"
                                    onClick={onClaim}
                                    disabled={isClaiming || !account || pendingReward.lte(0) || blockTimestamp < holderUnlockTime}
                                >
                                    <span className='text-[20px] text-black'>{isClaiming ? 'Claiming ...' : "Claim Rewards"}</span>
                                </LoadingButton>
                                <LoadingButton
                                    variant="outlined"
                                    sx={{ border: "3px solid #7F41E4", width: '280px', height: '48px', fontFamily: 'agressive' }}
                                    loading={isUnstaking}
                                    loadingPosition="start"
                                    color="secondary"
                                    onClick={onUnstake}
                                    disabled={isUnstaking || !account || userInfo.amount.lte(0)}
                                >
                                    <span className='text-[20px] text-black'>{isUnstaking ? 'Unstaking ...' : "Unstake"}</span>
                                </LoadingButton>
                            </div>}
                            {stakingVersion === 2 && <div className='w-full flex justify-center gap-4 flex-wrap'>
                                <LoadingButton
                                    variant="outlined"
                                    sx={{ backgroundColor: "#ffffff", border: "3px solid #7F41E4", width: '280px', height: '48px', fontFamily: 'agressive' }}
                                    loading={isClaimingV2}
                                    loadingPosition="start"
                                    color="secondary"
                                    onClick={onClaimV2}
                                    disabled={isClaimingV2 || !account || pendingRewardV2.lte(0) || blockTimestamp < holderUnlockTimeV2}
                                >
                                    <span className='text-[20px] text-black'>{isClaimingV2 ? 'Claiming ...' : "Claim Rewards"}</span>
                                </LoadingButton>
                                <LoadingButton
                                    variant="outlined"
                                    sx={{ border: "3px solid #7F41E4", width: '280px', height: '48px', fontFamily: 'agressive' }}
                                    loading={isUnstakingV2}
                                    loadingPosition="start"
                                    color="secondary"
                                    onClick={onUnstakeV2}
                                    disabled={isUnstakingV2 || !account || userInfoV2.amount.lte(0)}
                                >
                                    <span className='text-[20px] text-black'>{isUnstakingV2 ? 'Unstaking ...' : "Unstake"}</span>
                                </LoadingButton>
                            </div>}
                        </div>
                        <div className="w-full flex justify-end mb-10">
                            <div className="flex gap-4 cursor-pointer items-center" onClick={gotoChooseStaking}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 12H5" stroke="#7F41E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 19L5 12L12 5" stroke="#7F41E4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="text-[16px] md:text-[20px] text-[#7F41E4] underline">change your staking time</div>
                            </div>
                        </div>
                    </>}
                    {stakingVersion === 0 && <div className="w-full">
                        <div className='w-full my-6 text-center text-black text-[18px] md:text-[20px] uppercase'>Choose your stake</div>
                        <div className='w-full flex justify-center items-center flex-col gap-4'>
                            <Button
                                variant="outlined"
                                sx={{ backgroundColor: "#ffffff", border: "3px solid #7F41E4", width: '280px', height: '48px', fontFamily: 'agressive' }}
                                color="secondary"
                                onClick={() => onChooseStaking(1)}
                            >
                                <span className='text-[20px] text-black'>{`${StakingV1_LockDuration} lock`}</span>
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{ backgroundColor: "#ffffff", border: "3px solid #7F41E4", width: '280px', height: '48px', fontFamily: 'agressive' }}
                                color="secondary"
                                onClick={() => onChooseStaking(2)}
                            >
                                <span className='text-[20px] text-black'>{`${StakingV2_LockDuration} lock`}</span>
                            </Button>
                        </div>
                    </div>}
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