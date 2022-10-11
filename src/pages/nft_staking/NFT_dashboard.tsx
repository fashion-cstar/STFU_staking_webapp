import { LoadingButton } from '@mui/lab'
import { useEthers } from '@usedapp/core'
import React, { useEffect, useRef, useState } from 'react'
import { INFTokenInfo, useNFTStaking } from 'src/contexts/NFTStakingContext'
import { toast } from 'react-toastify'
import { formatEther, shortenAddress } from 'src/utils'
import STFU_image from 'src/common/svgs/STFU_image'
import { parseUnits } from '@ethersproject/units'
import NFT_selectIcon from 'src/common/svgs/NFT_selectIcon'
import Button from '@mui/material/Button'
import { BigNumber } from '@ethersproject/bignumber'

export const NFT_dashboard = () => {
    const {
        availableRewards,
        rewardsToken,
        stakedInfo,
        unstakedInfo,
        claimCallback,
        setSelectStakedNFT,
        setSelectUnstakedNFT,
        updateStakingStats,
        updateNFTsHoldenStats,
        stakeCallback,
        unstakeCallback
    } = useNFTStaking()
    const { account } = useEthers()
    const [isClaiming, setIsClaiming] = useState(false)
    const [isStaking, setIsStaking] = useState(false)
    const [isUnstaking, setIsUnstaking] = useState(false)
    const [percentage, setPercentage] = useState(0)
    const [barWidth, setBarWidth] = useState(0)
    const widthRef = useRef<any>()
    const [stakingNFTs, setStakingNFTs] = useState<BigNumber[]>([])
    const [unstakingNFTs, setUnstakingNFTs] = useState<BigNumber[]>([])

    const getBarSize = () => {
        if (widthRef) {
            const newWidth = widthRef?.current?.clientWidth - 20
            setBarWidth(newWidth < 0 ? 0 : newWidth)
        }
    }

    useEffect(() => {
        const newWidth = widthRef?.current?.clientWidth - 20
        setBarWidth(newWidth < 0 ? 0 : newWidth)
        window.addEventListener("resize", getBarSize)
    }, [widthRef])


    useEffect(() => {
        if (stakedInfo && unstakedInfo) {
            let totalNFTs = stakedInfo.amountStaked + unstakedInfo.length
            setPercentage(totalNFTs <= 0 ? 0 : Math.round(stakedInfo.amountStaked / totalNFTs * 10000) / 100)
        }
    }, [stakedInfo, unstakedInfo])

    useEffect(() => {
        let temp: BigNumber[] = []
        if (stakedInfo) {
            for (let i = 0; i < stakedInfo.stakedTokens.length; i++) {
                if (stakedInfo.stakedTokens[i].isSelected) temp.push(BigNumber.from(stakedInfo.stakedTokens[i].tokenId))
            }
            setUnstakingNFTs(temp)
        } else {
            setUnstakingNFTs([])
        }
    }, [stakedInfo])

    useEffect(() => {
        let temp: BigNumber[] = []
        if (unstakedInfo) {
            for (let i = 0; i < unstakedInfo.length; i++) {
                if (unstakedInfo[i].isSelected) temp.push(BigNumber.from(unstakedInfo[i].tokenId))
            }
            setStakingNFTs(temp)
        } else {
            setStakingNFTs([])
        }
    }, [unstakedInfo])

    const onClaim = async () => {
        setIsClaiming(true)
        try {
            await claimCallback().then((res: any) => {
                if (res.status === 1) {
                    setIsClaiming(false)
                    updateStakingStats()
                    updateNFTsHoldenStats()
                    toast.success('Claimed successfully!!')
                } else {
                    toast.error(`Transaction reverted! Tx:${res.hash}`)
                }
            }).catch((error: any) => {
                console.log(error)
                setIsClaiming(false)
                let err: any = error
                toast.error((err.data?.message || err?.message || err).toString())
            })
        } catch (error) {
            console.log(error)
            setIsClaiming(false)
        }
        return null;
    }

    const onStake = async () => {
        setIsStaking(true)
        try {
            await stakeCallback(stakingNFTs).then((res: any) => {
                if (res.status === 1) {
                    setIsStaking(false)
                    updateStakingStats()
                    updateNFTsHoldenStats()
                    toast.success('Staked successfully!!')
                } else {
                    toast.error(`Transaction reverted! Tx:${res.hash}`)
                }
            }).catch((error: any) => {
                console.log(error)
                setIsStaking(false)
                let err: any = error
                toast.error((err.data?.message || err?.message || err).toString())
            })
        } catch (error) {
            console.log(error)
            setIsStaking(false)
        }
        return null;
    }

    const onUnstake = async () => {
        setIsUnstaking(true)
        try {
            await unstakeCallback(unstakingNFTs).then((res: any) => {
                if (res.status === 1) {
                    setIsUnstaking(false)
                    updateStakingStats()
                    updateNFTsHoldenStats()
                    toast.success('Unstaked successfully!!')
                } else {
                    toast.error(`Transaction reverted! Tx:${res.hash}`)
                }
            }).catch((error: any) => {
                console.log(error)
                setIsUnstaking(false)
                let err: any = error
                toast.error((err.data?.message || err?.message || err).toString())
            })
        } catch (error) {
            console.log(error)
            setIsUnstaking(false)
        }
        return null;
    }

    const onViewDetail = (tokenId: number) => {

    }

    return (
        <>
            <div className='w-full flex flex-col gap-2 mt-8'>
                <div className='w-full flex flex-col lg:flex-row gap-8 items-center lg:items-start px-4 sm:px-6 lg:px-8'>
                    <div className='w-full lg:basis-1/2 flex flex-col gap-2'>
                        <div className='w-full flex flex-col lg:flex-row gap-4 lg:gap-8 items-center '>
                            <STFU_image />
                            <div className='w-full flex lg:justify-start justify-start'>
                                <div className='w-full flex flex-col'>
                                    <div className='text-[22px] md:text-[25px] text-app-purple uppercase  leading-[1.2] lg:leading-[1.4]'>
                                        Account{`: `}<span>{account ? shortenAddress(account, 3) : ''}</span>
                                    </div>
                                    <div className='text-[22px] md:text-[25px] text-[#000] font-semibold leading-[1.1] lg:leading-[1.4]' style={{ fontFamily: 'bebas' }}>
                                        claimable rewards:{` `}<span className='text-app-purple'>{rewardsToken ? formatEther(availableRewards, rewardsToken.decimals, 3, true) + ' ' + rewardsToken.symbol : ''}</span>
                                    </div>
                                    <div className='hidden lg:block text-[18px] md:text-[20px] text-[#000] font-semibold leading-[1.1] lg:leading-[1.4]' style={{ fontFamily: 'bebas' }}>
                                        total earned:{` `}<span className='text-app-purple'>{stakedInfo && rewardsToken ? formatEther(stakedInfo.rewardDebt, rewardsToken.decimals, 3, true) + ' ' + rewardsToken.symbol : ''}</span>
                                    </div>
                                    {rewardsToken && <div className={`w-full ${isClaiming ? 'lg:w-[230px]' : 'lg:w-[190px]'} mt-1 lg:mt-2`}>
                                        <LoadingButton
                                            variant="contained"
                                            sx={{ width: '100%', height: '43px', fontFamily: 'agressive', boxShadow: '3px 3px #000' }}
                                            loading={isClaiming}
                                            loadingPosition="start"
                                            color="primary"
                                            onClick={onClaim}
                                            disabled={!account || !availableRewards.gt(parseUnits('0.001', rewardsToken.decimals))}
                                        >
                                            <span className='text-[25px] text-[#000000] uppercase leading-[1]'>{isClaiming ? 'Claiming ...' : 'Claim'}</span>
                                        </LoadingButton>
                                    </div>}
                                    <div className='lg:hidden mt-1 text-[18px] md:text-[20px] text-[#000] font-semibold' style={{ fontFamily: 'bebas' }}>
                                        total earned:{` `}<span className='text-app-purple'>{stakedInfo && rewardsToken ? formatEther(stakedInfo.rewardDebt, rewardsToken.decimals, 3, true) + ' ' + rewardsToken.symbol : ''}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:basis-1/2 flex flex-col gap-2'>
                        <div className='w-full flex lg:justify-start justify-center'>
                            <div className='w-full lg:w-auto flex flex-col gap-1'>
                                <div className='w-full text-[#000] text-[22px] md:text-[25px]'>
                                    {percentage}% nfts staked
                                </div>
                                <div className='w-full lg:w-[400px] rounded-[5px] px-[10px] py-[5px] h-[22px] bg-[#000] flex' ref={widthRef}>
                                    <div className={`bg-app-green h-[12px]`} style={{ minWidth: `${Math.round(percentage * barWidth / 100)}px` }} />
                                    <div className={`bg-[#37801C] w-full h-[12px]`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col lg:flex-row gap-4 sm:gap-8 mt-4 sm:mt-2 items-center px-4 sm:px-6 lg:p-8 relative lg:items-stretch overflow-hidden pb-12'>
                    <div className='w-[50px] lg:w-full bg-app-green h-screen lg:h-[120px] absolute top-0 lg:top-[100px] left-0' />
                    <div className='w-full lg:basis-1/2' style={{ zIndex: '1', display: 'flex', flexFlow: 'column' }}>
                        <div className='text-[21px] sm:text-[24px] text-[#000] mb-1' style={{ textShadow: '2px 2px 0px #6FFF39', flex: '0 1 auto' }}>{`unStaked tokens (${unstakedInfo ? unstakedInfo.length : ''})`}</div>
                        <div className='border-2 border-[#000] rounded-md min-h-[250px] bg-white p-4' style={{flex: '1 1 auto'}}>
                            <LoadingButton
                                variant="contained"
                                sx={{ width: '100%', height: '45px', fontFamily: 'agressive', boxShadow: '3px 3px #000' }}
                                loading={isStaking}
                                loadingPosition="start"
                                color="secondary"
                                onClick={onStake}
                                disabled={!account || stakingNFTs.length <= 0}
                            >
                                <div className='w-full flex flex-col items-center'>
                                    <span className='text-[22px] sm:text-[25px] text-[#000000] uppercase leading-[1.2]'>{isStaking ? 'Staking ...' : 'Stake'}</span>
                                    <span className='text-[12px] text-[#333] uppercase leading-[1]'>Selected NFTs</span>
                                </div>
                            </LoadingButton>
                            <div className='w-full flex flex-wrap gap-6 sm:gap-8 mt-4'>
                                {unstakedInfo && <>
                                    {unstakedInfo.map((item: INFTokenInfo, index: number) => {
                                        return (
                                            <div className='w-full flex flex-col gap-1 w-[100px] sm:w-[120px] lg:w-[140px]' key={index}>
                                                <div className={`${item.isSelected ? 'border-2 border-[#6FFF39]' : 'border border-[#222]'} shadow-lg relative hover:scale-[1.032] cursor-pointer`}
                                                    style={{ borderRadius: '5px', transition: "transform 150ms ease 0s" }} onClick={() => setSelectUnstakedNFT(index, !item.isSelected)}>
                                                    {item.isSelected && <div className='absolute' style={{ top: '-10px', right: '-10px', zIndex: '1' }}>
                                                        <NFT_selectIcon />
                                                    </div>}
                                                    <div className='w-full h-full overflow-hidden bg-app-purple' style={{ borderRadius: '3px' }}>
                                                        <img src={item.metadata.image} width='100%' className={`${item.isSelected ? 'opacity-[.5]' : ''}`} />
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="contained"
                                                    sx={{ width: '100%', height: '24px', fontFamily: 'bebas', boxShadow: '2px 2px #000' }}
                                                    color="primary"
                                                    onClick={() => onViewDetail(item.tokenId)}
                                                >
                                                    <span className='text-[18px] sm:text-[20px] text-[#000000] uppercase leading-[1] uppercase'>{`View #${item.tokenId}`}</span>
                                                </Button>
                                            </div>
                                        )
                                    })}
                                </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:basis-1/2' style={{ zIndex: '1', display: 'flex', flexFlow: 'column' }}>
                        <div className='text-[21px] sm:text-[24px] text-[#000] mb-1' style={{ textShadow: '2px 2px 0px #6FFF39', flex: '0 1 auto' }}>{`Staked tokens (${stakedInfo ? stakedInfo.amountStaked : ''})`}</div>
                        <div className='border-2 border-[#000] rounded-md min-h-[250px] bg-white p-4' style={{flex: '1 1 auto'}}>
                            <LoadingButton
                                variant="contained"
                                sx={{ width: '100%', height: '45px', fontFamily: 'agressive', boxShadow: '3px 3px #000' }}
                                loading={isUnstaking}
                                loadingPosition="start"
                                color="primary"
                                onClick={onUnstake}
                                disabled={!account || unstakingNFTs.length <= 0}
                            >
                                <div className='w-full flex flex-col items-center'>
                                    <span className='text-[22px] sm:text-[25px] text-[#000000] uppercase leading-[1.2]'>{isUnstaking ? 'Unstaking ...' : 'Unstake'}</span>
                                    <span className='text-[12px] text-[#333] uppercase leading-[1]'>Selected NFTs</span>
                                </div>
                            </LoadingButton>
                            <div className='w-full flex flex-wrap gap-6 sm:gap-8 mt-4'>
                                {stakedInfo && <>
                                    {stakedInfo.stakedTokens.map((item: INFTokenInfo, index: number) => {
                                        return (
                                            <div className='w-full flex flex-col gap-1 w-[100px] sm:w-[120px] lg:w-[140px]' key={index}>
                                                <div className={`${item.isSelected ? 'border-2 border-[#6FFF39]' : 'border border-[#222]'} shadow-lg relative hover:scale-[1.032] cursor-pointer`}
                                                    style={{ borderRadius: '5px', transition: "transform 200ms ease 0s" }} onClick={() => setSelectStakedNFT(index, !item.isSelected)}>
                                                    {item.isSelected && <div className='absolute' style={{ top: '-10px', right: '-10px', zIndex: '1' }}>
                                                        <NFT_selectIcon />
                                                    </div>}
                                                    <div className='w-full h-full overflow-hidden bg-app-green' style={{ borderRadius: '3px' }}>
                                                        <img src={item.metadata.image} width='100%' className={`${item.isSelected ? '' : 'opacity-[.5]'}`} />
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="contained"
                                                    sx={{ width: '100%', height: '24px', fontFamily: 'bebas', boxShadow: '2px 2px #000' }}
                                                    color="primary"
                                                    onClick={() => onViewDetail(item.tokenId)}
                                                >
                                                    <span className='text-[18px] sm:text-[20px] text-[#000000] uppercase leading-[1] uppercase'>{`View #${item.tokenId}`}</span>
                                                </Button>
                                            </div>
                                        )
                                    })}
                                </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}