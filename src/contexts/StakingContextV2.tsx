/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { useEthers } from "@usedapp/core";
import { getContract, calculateGasMargin } from 'src/utils'
import { TransactionResponse } from '@ethersproject/providers'
import { RpcProviders, StakingContractAddressV2, AppTokenAddress } from "src/constants/AppConstants"
import useRefresh from 'src/hooks/useRefresh'
import { getChainIdFromName } from 'src/utils'
import staking_abiV2 from 'src/constants/abis/STFU_StakingV2.json'
import ERC20_ABI from 'src/constants/abis/erc20.json'
import { useNativeTokenBalance, useTokenBalanceCallback } from 'src/hooks/hooks'
import { IPoolInfo, IUserInfo } from './StakingContext';

declare type Maybe<T> = T | null | undefined

export interface IStakingContextV2 {
    apy: number
    bnbBalance: BigNumber
    stfuBalance: BigNumber
    newRewards: BigNumber
    holderUnlockTime: number
    lockDuration: number
    pendingReward: BigNumber
    rewardsRemaining: BigNumber
    totalStaked: BigNumber
    poolInfo: IPoolInfo
    userInfo: IUserInfo
    blockTimestamp: number
    depositCallback: (amount: BigNumber) => Promise<any>
    manualCompoundCallback: () => Promise<any>
    claimCallback: () => Promise<any>
    unstakeCallback: () => Promise<any>
    updateStakingStats: () => void
}

const StakingContextV2 = React.createContext<Maybe<IStakingContextV2>>(null)
const blockchain = 'bsc'

export const StakingProviderV2 = ({ children = null as any }) => {
    const { account, library } = useEthers()
    const [stfuBalance, setStfuBalance] = useState(BigNumber.from(0))
    const { slowRefresh, fastRefresh } = useRefresh()
    const [bnbBalance, setBnbBalance] = useState(BigNumber.from(0))
    const nativeBalance = useNativeTokenBalance('bsc')
    const { nativeBalanceCallback } = useTokenBalanceCallback()
    const [apy, setApy] = useState(0)
    const [newRewards, setNewRewards] = useState(BigNumber.from(0))
    const [holderUnlockTime, setHolderUnlockTime] = useState(0)
    const [lockDuration, setLockDuration] = useState(0)
    const [pendingReward, setPendingReward] = useState(BigNumber.from(0))
    const [rewardsRemaining, setRewardsRemaining] = useState(BigNumber.from(0))
    const [totalStaked, setTotalStaked] = useState(BigNumber.from(0))
    const [poolInfo, setPoolInfo] = useState<IPoolInfo>({ lpToken: AppTokenAddress, allocPoint: BigNumber.from(0), lastRewardTimestamp: 0, accTokensPerShare: BigNumber.from(0) })
    const [userInfo, setUserInfo] = useState<IUserInfo>({ amount: BigNumber.from(0), rewardDebt: BigNumber.from(0) })
    const [blockTimestamp, setBlockTimestamp] = useState(0)

    useEffect(() => {
        if (nativeBalance) {
            setBnbBalance(nativeBalance)
        }
    }, [nativeBalance])

    useEffect(() => {
        // if (account && library) {
        try {
            updateStakingStats()
        } catch (e) { }
        // }
    }, [slowRefresh, account])

    useEffect(() => {
        const fetch = async () => {
            const chainId = getChainIdFromName(blockchain)
            let blocknumber = await RpcProviders[chainId].getBlockNumber()
            let blockData = await RpcProviders[chainId].getBlock(blocknumber)
            setBlockTimestamp(blockData.timestamp)
        }
        fetch()
    }, [fastRefresh])

    useEffect(() => {
        setPendingReward(BigNumber.from(0))
        setHolderUnlockTime(0)
        setUserInfo({ amount: BigNumber.from(0), rewardDebt: BigNumber.from(0) })
    }, [account])

    const depositCallback = async function (amount: BigNumber) {
        if (!account || !library || !StakingContractAddressV2) return
        const stakingContract: Contract = getContract(StakingContractAddressV2, staking_abiV2, library, account ? account : undefined)
        return stakingContract.estimateGas.deposit(amount).then(estimatedGasLimit => {
            const gas = estimatedGasLimit
            return stakingContract.deposit(amount, {
                gasLimit: calculateGasMargin(gas)
            }).then((response: TransactionResponse) => {
                return response.wait().then((res: any) => {
                    return { status: res.status, hash: response.hash }
                })
            })
        })
    }

    const manualCompoundCallback = async function () {
        if (!account || !library || !StakingContractAddressV2) return
        const stakingContract: Contract = getContract(StakingContractAddressV2, staking_abiV2, library, account ? account : undefined)
        return stakingContract.estimateGas.manualCompound().then(estimatedGasLimit => {
            const gas = estimatedGasLimit
            return stakingContract.manualCompound({
                gasLimit: calculateGasMargin(gas)
            }).then((response: TransactionResponse) => {
                return response.wait().then((res: any) => {
                    return { status: res.status, hash: response.hash }
                })
            })
        })
    }

    const claimCallback = async function () {
        if (!account || !library || !StakingContractAddressV2) return
        const playContract: Contract = getContract(StakingContractAddressV2, staking_abiV2, library, account ? account : undefined)
        return playContract.estimateGas.withdraw().then(estimatedGasLimit => {
            const gas = estimatedGasLimit
            return playContract.withdraw({
                gasLimit: calculateGasMargin(gas)
            }).then((response: TransactionResponse) => {
                return response.wait().then((res: any) => {
                    return { status: res.status, hash: response.hash }
                })
            })
        })
    }

    const unstakeCallback = async function () {
        if (!account || !library || !StakingContractAddressV2) return
        const playContract: Contract = getContract(StakingContractAddressV2, staking_abiV2, library, account ? account : undefined)
        return playContract.estimateGas.emergencyWithdraw().then(estimatedGasLimit => {
            const gas = estimatedGasLimit
            return playContract.emergencyWithdraw({
                gasLimit: calculateGasMargin(gas)
            }).then((response: TransactionResponse) => {
                return response.wait().then((res: any) => {
                    return { status: res.status, hash: response.hash }
                })
            })
        })
    }

    const fetchApy = async (stakingContract: Contract) => {
        const res = await stakingContract.apy()
        return res
    }

    const fetchCalculateNewRewards = async (stakingContract: Contract) => {
        const res = await stakingContract.calculateNewRewards()
        return res
    }

    const fetchHolderUnlockTime = async (stakingContract: Contract) => {
        const res = await stakingContract.holderUnlockTime(account)
        return res
    }

    const fetchLockDuration = async (stakingContract: Contract) => {
        const res = await stakingContract.lockDuration()
        return res
    }

    const fetchPendingReward = async (stakingContract: Contract) => {
        const res = await stakingContract.pendingReward(account)        
        return res
    }

    const fetchRewardsRemaining = async (stakingContract: Contract) => {
        const res = await stakingContract.rewardsRemaining()
        return res
    }

    const fetchTotalStaked = async (stakingContract: Contract) => {
        const res = await stakingContract.totalStaked()        
        return res
    }

    const fetchPoolInfo = async (stakingContract: Contract) => {
        const res = await stakingContract.poolInfo(BigNumber.from(0))
        return res
    }

    const fetchUserInfo = async (stakingContract: Contract) => {
        const res = await stakingContract.userInfo(account)
        return res
    }

    const updateStakingStats = async () => {
        const chainId = getChainIdFromName(blockchain);
        const stakingContract: Contract = getContract(StakingContractAddressV2, staking_abiV2, RpcProviders[chainId], account ? account : undefined)
        fetchApy(stakingContract).then(async (result: any) => {
            setApy(Number(result))
        }).catch(error => { console.log(error) })

        fetchCalculateNewRewards(stakingContract).then(result => {
            setNewRewards(result)
        }).catch(error => { console.log(error) })
        
        if (account) {
            fetchHolderUnlockTime(stakingContract).then(result => {
                setHolderUnlockTime(Number(result))
            }).catch(error => { console.log(error) })

            fetchPendingReward(stakingContract).then(result => {
                setPendingReward(result)
            }).catch(error => { console.log(error) })

            fetchUserInfo(stakingContract).then(result => {
                setUserInfo({ amount: result?.amount, rewardDebt: result?.rewardDebt })
            }).catch(error => { console.log(error) })
        }
        
        fetchLockDuration(stakingContract).then(result => {
            setLockDuration(Number(result))
        }).catch(error => { console.log(error) })
        
        fetchRewardsRemaining(stakingContract).then(result => {
            setRewardsRemaining(result)
        }).catch(error => { console.log(error) })        

        fetchTotalStaked(stakingContract).then(result => {
            setTotalStaked(result)
        }).catch(error => { console.log(error) })

        fetchPoolInfo(stakingContract).then(result => {
            setPoolInfo({ lpToken: result?.lpToken, allocPoint: result?.allocPoint, lastRewardTimestamp: Number(result?.lastRewardTimestamp), accTokensPerShare: result?.accTokensPerShare })            
        }).catch(error => { console.log(error) })

        if (account) {
            const tokenContract: Contract = getContract(AppTokenAddress, ERC20_ABI, RpcProviders[chainId], account ? account : undefined)
            try {
                let bal = await tokenContract.balanceOf(account)
                setStfuBalance(bal)
                bal = await nativeBalanceCallback('bsc')
                setBnbBalance(bal)
            } catch (e) { }
        } else {
            setStfuBalance(BigNumber.from(0))
        }
    }

    return (
        <StakingContextV2.Provider
            value={{
                apy,
                bnbBalance,
                stfuBalance,
                newRewards,
                holderUnlockTime,
                lockDuration,
                pendingReward,
                rewardsRemaining,
                totalStaked,
                poolInfo,
                userInfo,
                blockTimestamp,
                depositCallback,
                manualCompoundCallback,
                claimCallback,
                unstakeCallback,
                updateStakingStats,
            }}
        >
            {children}
        </StakingContextV2.Provider >
    )
}

export const useStakingV2 = () => {
    const context = useContext(StakingContextV2)

    if (!context) {
        throw new Error('Component rendered outside the provider tree')
    }

    return context
}
