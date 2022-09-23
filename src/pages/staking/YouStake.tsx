import LoadingButton from "@mui/lab/LoadingButton"
import { useEthers } from '@usedapp/core'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useStaking, useStakingV2 } from 'src/contexts'
import useSTFU from 'src/hooks/useSTFU'
import { formatEther, parseEther } from 'src/utils'

export const YourStake = ({ stakingVersion }: { stakingVersion: number }) => {
    const { account } = useEthers()
    const { price } = useSTFU()
    const { pendingReward, userInfo, totalStaked, apy } = useStaking()
    const {
        pendingReward: pendingRewardV2,
        userInfo: userInfoV2,
        totalStaked: totalStakedV2,
        apy: apyV2,
        updateStakingStats: updateStakingStatsV2,
        manualCompoundCallback } = useStakingV2()
    const [isManualCompounding, setIsManualCompounding] = useState(false)
    const [compoundDisabled, setCompoundDisabled] = useState(false)

    useEffect(() => {
        if (isManualCompounding || pendingRewardV2.lte(parseEther('0.0001', 18)) || !account) setCompoundDisabled(true)
        else setCompoundDisabled(false)
    }, [isManualCompounding, pendingRewardV2, account])

    const onManualCompound = () => {
        setIsManualCompounding(true)
        try {
            manualCompoundCallback().then((res: any) => {
                if (res.status === 1) {
                    toast.success("Unstaked successfully!")
                    updateStakingStatsV2()
                } else {
                    toast.error(`Transaction reverted! Tx:${res.hash}`)
                }
                setIsManualCompounding(false)
            }).catch(error => {
                setIsManualCompounding(false)
                console.log(error)
                let err: any = error
                toast.error((err.data?.message || err?.message || err).toString())
            })
        } catch (error) {
            setIsManualCompounding(false)
            console.log(error)
        }
        return null;
    }

    return (
        <div className='w-full'>
            <div className='w-full p-5'>
                <div className='flex flex-col gap-2 w-full mt-[12.5vh] md:mt-0'>
                    <div className='text-white text-[20px] text-center w-full uppercase'>total staked</div>
                    {stakingVersion === 1 && <><div className='text-[#6FFF39] text-[32px] text-center w-full'>${(Number(formatEther(totalStaked, 18, 2, false)) * price).toLocaleString()}</div>
                        <div className='text-[#7F41E4] text-[20px] text-center w-full uppercase'>{`(${formatEther(totalStaked, 18, 2, true)} STFU)`}</div>
                    </>}
                    {stakingVersion === 2 && <><div className='text-[#6FFF39] text-[32px] text-center w-full'>${(Number(formatEther(totalStakedV2, 18, 2, false)) * price).toLocaleString()}</div>
                        <div className='text-[#7F41E4] text-[20px] text-center w-full uppercase'>{`(${formatEther(totalStakedV2, 18, 2, true)} STFU)`}</div>
                    </>}
                </div>
                <div className='flex flex-col gap-1 w-full mt-[30px]'>
                    <div className='text-white text-[36px] w-full uppercase mb-2'>your stake:</div>
                    <div className='flex gap-1'>
                        <div className='basis-1/2 text-white text-[20px] w-full uppercase min-w-[170px]'>apy</div>
                        {stakingVersion === 1 && <div className='basis-1/2 text-[#6FFF39] text-[20px] w-full uppercase'>{Number(apy).toLocaleString()}<span className='text-white text-[14px]'>{' '}%</span></div>}
                        {stakingVersion === 2 && <div className='basis-1/2 text-[#6FFF39] text-[20px] w-full uppercase'>{Number(apyV2).toLocaleString()}<span className='text-white text-[14px]'>{' '}%</span></div>}
                    </div>
                    <div className='flex gap-1'>
                        <div className='basis-1/2 text-white text-[20px] w-full uppercase min-w-[170px]'>unclaimed</div>
                        {stakingVersion === 1 && <div className='basis-1/2 text-[#6FFF39] text-[20px] w-full uppercase'>{`${formatEther(pendingReward, 18, 4, true).toLocaleString()}`}<span className='text-white text-[14px]'>{' '}STFU</span></div>}
                        {stakingVersion === 2 && <div className='basis-1/2 text-[#6FFF39] text-[20px] w-full uppercase'>{`${formatEther(pendingRewardV2, 18, 4, true).toLocaleString()}`}<span className='text-white text-[14px]'>{' '}STFU</span></div>}
                    </div>
                    <div className='flex gap-1'>
                        <div className='basis-1/2 text-white text-[20px] w-full uppercase min-w-[170px]'>staked</div>
                        {stakingVersion === 1 && <div className='basis-1/2 text-[#6FFF39] text-[20px] w-full uppercase'>{`${userInfo ? formatEther(userInfo.amount, 18, 2, true) : ''}`}<span className='text-white text-[14px]'>{' '}STFU</span></div>}
                        {stakingVersion === 2 && <div className='basis-1/2 text-[#6FFF39] text-[20px] w-full uppercase'>{`${userInfoV2 ? formatEther(userInfoV2.amount, 18, 2, true) : ''}`}<span className='text-white text-[14px]'>{' '}STFU</span></div>}
                    </div>
                </div>
                {stakingVersion === 2 && <div className='w-full my-6 flex justify-center'>
                    <LoadingButton
                        variant={compoundDisabled ? "outlined" : "contained"}
                        onClick={onManualCompound}
                        loading={isManualCompounding}
                        loadingPosition="start"
                        sx={{ borderColor: "#6FFF39", backgroundColor: compoundDisabled ? '#e0f2fe' : '#6FFF39', width: '200px', height: '48px', fontFamily: 'agressive' }}
                        disabled={compoundDisabled}
                    >
                        <span className="text-[16px] md:text-[18px] text-black uppercase text-center leading-[1.2]" style={{ color: compoundDisabled ? '#707070' : '#000000' }}>Manual Compound</span>
                    </LoadingButton>
                </div>}
            </div>
        </div>
    )
}