/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState, useRef } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { useEthers, ChainId } from "@usedapp/core";
import { getContract, parseEther, calculateGasMargin } from 'src/utils'
import { TransactionResponse } from '@ethersproject/providers'
import { RpcProviders, StakingContractAddress, AppTokenAddress } from "src/constants/AppConstants"
import useRefresh from 'src/hooks/useRefresh'
import { getChainIdFromName } from 'src/utils'
import staking_abi from 'src/constants/abis/STFU_Staking.json'
import ERC20_ABI from 'src/constants/abis/erc20.json'
import { useNativeTokenBalance, useTokenBalanceCallback } from 'src/hooks/hooks'

declare type Maybe<T> = T | null | undefined

export interface IPoolInfo {
    lpToken: string
    allocPoint: BigNumber
    lastRewardTimestamp: number
    accTokensPerShare: BigNumber
}

export interface IUserInfo {
    amount: BigNumber
    rewardDebt: BigNumber
}

export interface IStakingContext {
    apy: number
    bnbBalance: BigNumber
    stfuBalance: BigNumber
    newRewards: BigNumber
    holderUnlockTime: number
    lockDuration: number
    pendingRewards: BigNumber
    rewardsRemaining: BigNumber
    totalStaked: BigNumber
    poolInfo: IPoolInfo
    userInfo: IUserInfo
    depositCallback: (amount: BigNumber) => Promise<any>
    claimCallback: () => Promise<any>
    updateStakingStats: () => void
}

const StakingContext = React.createContext<Maybe<IStakingContext>>(null)
const blockchain = 'bsc'

export const StakingProvider = ({ children = null as any }) => {
    const { account, library } = useEthers()
    const [stfuBalance, setStfuBalance] = useState(BigNumber.from(0))
    const { slowRefresh } = useRefresh()
    const [bnbBalance, setBnbBalance] = useState(BigNumber.from(0))
    const nativeBalance = useNativeTokenBalance('bsc')
    const { nativeBalanceCallback } = useTokenBalanceCallback()
    const [apy, setApy] = useState(0)
    const [newRewards, setNewRewards] = useState(BigNumber.from(0))
    const [holderUnlockTime, setHolderUnlockTime] = useState(0)
    const [lockDuration, setLockDuration] = useState(0)
    const [pendingRewards, setPendingReward] = useState(BigNumber.from(0))
    const [rewardsRemaining, setRewardsRemaining] = useState(BigNumber.from(0))
    const [totalStaked, setTotalStaked] = useState(BigNumber.from(0))
    const [poolInfo, setPoolInfo] = useState<IPoolInfo>({ lpToken: AppTokenAddress, allocPoint: BigNumber.from(0), lastRewardTimestamp: 0, accTokensPerShare: BigNumber.from(0) })
    const [userInfo, setUserInfo] = useState<IUserInfo>({ amount: BigNumber.from(0), rewardDebt: BigNumber.from(0) })

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
        setPendingReward(BigNumber.from(0))
        setHolderUnlockTime(0)
        setUserInfo({ amount: BigNumber.from(0), rewardDebt: BigNumber.from(0) })
    }, [account])

    const depositCallback = async function (amount: BigNumber) {
        const chainId = getChainIdFromName(blockchain);
        if (!account || !library || !StakingContractAddress) return
        const stakingContract: Contract = getContract(StakingContractAddress, staking_abi, library, account ? account : undefined)
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

    const claimCallback = async function () {
        const chainId = getChainIdFromName(blockchain);
        if (!account || !library || !StakingContractAddress) return
        const playContract: Contract = getContract(StakingContractAddress, staking_abi, library, account ? account : undefined)
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
        const playContract: Contract = getContract(StakingContractAddress, staking_abi, RpcProviders[chainId], account ? account : undefined)
        fetchApy(playContract).then(async (result: any) => {
            setApy(Number(result))
        }).catch(error => { console.log(error) })

        fetchCalculateNewRewards(playContract).then(result => {
            setNewRewards(result)
        }).catch(error => { console.log(error) })

        fetchHolderUnlockTime(playContract).then(result => {
            setHolderUnlockTime(Number(result))
        }).catch(error => { console.log(error) })

        fetchLockDuration(playContract).then(result => {
            setLockDuration(Number(result))
        }).catch(error => { console.log(error) })

        fetchPendingReward(playContract).then(result => {
            setPendingReward(result)
        }).catch(error => { console.log(error) })

        fetchRewardsRemaining(playContract).then(result => {
            setRewardsRemaining(result)
        }).catch(error => { console.log(error) })

        fetchTotalStaked(playContract).then(result => {
            setTotalStaked(result)
        }).catch(error => { console.log(error) })

        fetchPoolInfo(playContract).then(result => {
            setPoolInfo({ lpToken: result?.lpToken, allocPoint: result?.allocPoint, lastRewardTimestamp: Number(result?.lastRewardTimestamp), accTokensPerShare: result?.accTokensPerShare })
        }).catch(error => { console.log(error) })

        fetchUserInfo(playContract).then(result => {
            setUserInfo({ amount: result?.amount, rewardDebt: result?.rewardDebt })
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
        <StakingContext.Provider
            value={{
                apy,
                bnbBalance,
                stfuBalance,
                newRewards,
                holderUnlockTime,
                lockDuration,
                pendingRewards,
                rewardsRemaining,
                totalStaked,
                poolInfo,
                userInfo,
                depositCallback,
                claimCallback,
                updateStakingStats,
            }}
        >
            {children}
        </StakingContext.Provider >
    )
}

export const useStaking = () => {
    const context = useContext(StakingContext)

    if (!context) {
        throw new Error('Component rendered outside the provider tree')
    }

    return context
}
