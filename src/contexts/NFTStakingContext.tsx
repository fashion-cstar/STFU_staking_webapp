/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { useEthers } from "@usedapp/core";
import { getContract, calculateGasMargin } from 'src/utils'
import { TransactionResponse } from '@ethersproject/providers'
import { RpcProviders, NFTStakingContractAddress, AppTokenAddress, ZERO_ADDRESS } from "src/constants/AppConstants"
import useRefresh from 'src/hooks/useRefresh'
import { getChainIdFromName } from 'src/utils'
import nftStaking_abi from 'src/constants/abis/NFT_Staking.json'
import nft_abi from 'src/constants/abis/STFU_NFT.json'
import ERC20_ABI from 'src/constants/abis/erc20.json'
import { useNativeTokenBalance, useTokenBalanceCallback } from 'src/hooks/hooks'

declare type Maybe<T> = T | null | undefined

export interface INFTStakingContext {
    bnbBalance: BigNumber
    stfuBalance: BigNumber
    rewardsToken: any
    availableRewards: BigNumber
    isApprovedForAll: boolean
    nftCollection: Contract
    rewardsPerDay: BigNumber
    unstakedInfo: INFTokenInfo[]
    stakedInfo: INFTStakedInfo
    allStakedInfo: any
    blockTimestamp: number
    fetchingStatus: boolean
    stakeCallback: (tokenIds: BigNumber[]) => Promise<any>
    claimCallback: () => Promise<any>
    unstakeCallback: (tokenIds: BigNumber[]) => Promise<any>
    setApprovalForAllCallback: () => Promise<any>
    updateNFTsHoldenStats: () => void
    updateStakingStats: () => void
    setSelectStakedNFT: (index: number, isSelected: boolean) => void
    setSelectUnstakedNFT: (index: number, isSelected: boolean) => void
}

export interface INFTokenInfo {
    owner: string
    tokenId: number
    tokenURI: string
    metadata: any
    isSelected: boolean
}

export interface INFTStakedInfo {
    amountStaked: number
    stakedTokens: INFTokenInfo[]
    timeOfLastUpdate: number
    unclaimedRewards: BigNumber
    rewardDebt: BigNumber
}

const NFTStakingContext = React.createContext<Maybe<INFTStakingContext>>(null)
const blockchain = 'bsc'

export const NFTStakingProvider = ({ children = null as any }) => {
    const { account, library } = useEthers()
    const [stfuBalance, setStfuBalance] = useState(BigNumber.from(0))
    const { slowRefresh, fastRefresh } = useRefresh()
    const [bnbBalance, setBnbBalance] = useState(BigNumber.from(0))
    const nativeBalance = useNativeTokenBalance('bsc')
    const { nativeBalanceCallback } = useTokenBalanceCallback()
    const [rewardsToken, setRewardsToken] = useState()
    const [availableRewards, setAvailableRewards] = useState(BigNumber.from(0))
    const [isApprovedForAll, setIsApprovedForAll] = useState(false)
    const [nftCollection, setNFTCollection] = useState<Contract>()
    const [rewardsPerDay, setRewardsPerDay] = useState(BigNumber.from(0))
    const [unstakedInfo, setUnstakedInfo] = useState<INFTokenInfo[]>()
    const [stakedInfo, setStakedInfo] = useState<INFTStakedInfo>()
    const [allStakedInfo, setAllStakedInfo] = useState<any>()
    const [blockTimestamp, setBlockTimestamp] = useState(0)
    const [fetchingStatus, setFetchingStatus] = useState(false)

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
        if (account){
            updateNFTsHoldenStats()
        }else{
            setStakedInfo(undefined)
            setUnstakedInfo(undefined)
        }
    },[account])

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
        if (!account) {
            setAvailableRewards(BigNumber.from(0))
            setStakedInfo(undefined)
        }
    }, [account])

    const stakeCallback = async function (tokenIds: BigNumber[]) {
        if (!account || !library || !NFTStakingContractAddress) return
        const stakingContract: Contract = getContract(NFTStakingContractAddress, nftStaking_abi, library, account ? account : undefined)
        return stakingContract.estimateGas.stake(tokenIds).then(estimatedGasLimit => {
            const gas = estimatedGasLimit
            return stakingContract.stake(tokenIds, {
                gasLimit: calculateGasMargin(gas)
            }).then((response: TransactionResponse) => {
                return response.wait().then((res: any) => {
                    return { status: res.status, hash: response.hash }
                })
            })
        })
    }

    const claimCallback = async function () {
        if (!account || !library || !NFTStakingContractAddress) return
        const stakingContract: Contract = getContract(NFTStakingContractAddress, nftStaking_abi, library, account ? account : undefined)
        return stakingContract.estimateGas.claimRewards().then(estimatedGasLimit => {
            const gas = estimatedGasLimit
            return stakingContract.claimRewards({
                gasLimit: calculateGasMargin(gas)
            }).then((response: TransactionResponse) => {
                return response.wait().then((res: any) => {
                    return { status: res.status, hash: response.hash }
                })
            })
        })
    }

    const unstakeCallback = async function (tokenIds: BigNumber[]) {
        if (!account || !library || !NFTStakingContractAddress) return
        const stakingContract: Contract = getContract(NFTStakingContractAddress, nftStaking_abi, library, account ? account : undefined)
        return stakingContract.estimateGas.unstake(tokenIds).then(estimatedGasLimit => {
            const gas = estimatedGasLimit
            return stakingContract.unstake(tokenIds, {
                gasLimit: calculateGasMargin(gas)
            }).then((response: TransactionResponse) => {
                return response.wait().then((res: any) => {
                    return { status: res.status, hash: response.hash }
                })
            })
        })
    }

    const setApprovalForAllCallback = async function () {
        if (!account || !library || !NFTStakingContractAddress) return
        const stakingContract: Contract = getContract(NFTStakingContractAddress, nftStaking_abi, library, account ? account : undefined)
        const nftAddress = await stakingContract.nftCollection()
        const nftContract: Contract = getContract(nftAddress, nft_abi, library, account ? account : undefined)
        return nftContract.estimateGas.setApprovalForAll(NFTStakingContractAddress, true).then(estimatedGasLimit => {
            const gas = estimatedGasLimit
            return nftContract.setApprovalForAll(NFTStakingContractAddress, true, {
                gasLimit: calculateGasMargin(gas)
            }).then((response: TransactionResponse) => {
                return response.wait().then((res: any) => {
                    return { status: res.status, hash: response.hash }
                })
            })
        })
    }

    const setSelectStakedNFT = (index: number, isSelected: boolean) => {
        let items: INFTokenInfo[] = [...stakedInfo.stakedTokens]
        for (let i = 0; i < items.length; i++) {
            if (index === i) {
                let item = items[i]
                item.isSelected = isSelected
                items[i] = item
                break
            }
        }
        setStakedInfo((item) => ({ ...item, stakedTokens: items }))
    }

    const setSelectUnstakedNFT = (index: number, isSelected: boolean) => {
        let items: INFTokenInfo[] = [...unstakedInfo]
        for (let i = 0; i < items.length; i++) {
            if (index === i) {
                let item = items[i]
                item.isSelected = isSelected
                items[i] = item
                break
            }
        }
        setUnstakedInfo(items)
    }

    const fetchRewardsToken = async (stakingContract: Contract) => {
        let res = await stakingContract.rewardsToken()
        if (res.toLowerCase() === ZERO_ADDRESS) {
            return { address: res, name: "BNB Token", symbol: "BNB", decimals: 18 }
        } else {
            const chainId = getChainIdFromName(blockchain);
            const tokenContract: Contract = getContract(res, ERC20_ABI, RpcProviders[chainId], account ? account : undefined)
            const name = await tokenContract.name()
            const decimals = await tokenContract.decimals()
            const symbol = await tokenContract.symbol()
            return { address: res, name: name, symbol: symbol, decimals: decimals }
        }
    }

    const fetchAvailableRewards = async (stakingContract: Contract) => {
        const res = await stakingContract.availableRewards(account)
        return res
    }

    const fetchIsApprovedForAll = async (stakingContract: Contract) => {
        let tokenContract: Contract = nftCollection
        if (!tokenContract) {
            const nftAddress = await stakingContract.nftCollection()
            const chainId = getChainIdFromName(blockchain);
            tokenContract = getContract(nftAddress, nft_abi, RpcProviders[chainId], account ? account : undefined)
        }
        const res = await tokenContract.isApprovedForAll(account, NFTStakingContractAddress)
        return res
    }

    const fetchNftCollection = async (stakingContract: Contract) => {
        const res = await stakingContract.nftCollection()
        return res
    }

    const fetchRewardsPerDay = async (stakingContract: Contract) => {
        const res = await stakingContract.rewardsPerDay()
        return res
    }

    const fetchUnstakedInfo = async (stakingContract: Contract) => {
        let tokenContract: Contract = nftCollection
        if (!tokenContract) {
            const nftAddress = await stakingContract.nftCollection()
            const chainId = getChainIdFromName(blockchain);
            tokenContract = getContract(nftAddress, nft_abi, RpcProviders[chainId], account ? account : undefined)
        }
        const res = await tokenContract.getNFTSofAddress(account)
        return { tokenContract: tokenContract, result: res }
    }

    const fetchStakedInfo = async (stakingContract: Contract) => {
        const res = await stakingContract.getStakedInfo(account)
        return res
    }

    const fetchAllStakedInfo = async (stakingContract: Contract) => {
        const res = await stakingContract.getAllStakedInfo()
        return res
    }

    const updateNFTsHoldenStats = async () => {
        const chainId = getChainIdFromName(blockchain);
        const stakingContract: Contract = getContract(NFTStakingContractAddress, nftStaking_abi, RpcProviders[chainId], account ? account : undefined)
        if (account) {
            fetchUnstakedInfo(stakingContract).then(async res => {
                let tokenContract = res.tokenContract
                let stakedTokens = res.result[1]
                if (stakedTokens.length > 0) {
                    let temp: INFTokenInfo[] = []
                    let tokenURI = ""
                    let metadata: any
                    await Promise.all(stakedTokens.map(async (item) => {
                        try {
                            tokenURI = await tokenContract.tokenURI(Number(item.tokenId))
                            metadata = await fetch(tokenURI).then((res) => res.json())                            
                            temp.push({ owner: item.owner, tokenId: Number(item.tokenId), tokenURI: tokenURI, metadata: metadata, isSelected: false })
                        } catch (err) { }
                    }))
                    temp.sort((a: INFTokenInfo, b: INFTokenInfo) => a.tokenId - b.tokenId)
                    setUnstakedInfo(temp)
                } else {
                }
            }).catch(error => { console.log(error) })

            fetchStakedInfo(stakingContract).then(async result => {
                if (result.length > 0) {
                    let temp: INFTokenInfo[] = []
                    let stakedTokens = result[1]
                    let tokenContract: Contract = nftCollection
                    if (!tokenContract) {
                        const nftAddress = await stakingContract.nftCollection()
                        const chainId = getChainIdFromName(blockchain);
                        tokenContract = getContract(nftAddress, nft_abi, RpcProviders[chainId], account ? account : undefined)
                    }
                    let tokenURI = ""
                    let metadata: any
                    await Promise.all(stakedTokens.map(async (item) => {
                        try {
                            tokenURI = await tokenContract.tokenURI(Number(item.tokenId))
                            metadata = await fetch(tokenURI).then((res) => res.json())                            
                            temp.push({ owner: item.staker, tokenId: Number(item.tokenId), tokenURI: tokenURI, metadata: metadata, isSelected: false })
                        } catch (err) { }
                        temp.sort((a: INFTokenInfo, b: INFTokenInfo) => a.tokenId - b.tokenId)
                        setStakedInfo({ amountStaked: Number(result[0]), stakedTokens: temp, timeOfLastUpdate: Number(result[2]), unclaimedRewards: result[3], rewardDebt: result[4] })
                    }))
                } else {
                    setStakedInfo({ amountStaked: 0, stakedTokens: [], timeOfLastUpdate: 0, unclaimedRewards: BigNumber.from(0), rewardDebt: BigNumber.from(0) })
                }
            }).catch(error => { console.log(error) })
        }
    }

    const updateStakingStats = async () => {
        const chainId = getChainIdFromName(blockchain);
        const stakingContract: Contract = getContract(NFTStakingContractAddress, nftStaking_abi, RpcProviders[chainId], account ? account : undefined)
        setFetchingStatus(true)

        fetchRewardsToken(stakingContract).then(async (result: any) => {
            setRewardsToken(result)
        }).catch(error => { console.log(error) })

        fetchNftCollection(stakingContract).then(result => {
            const chainId = getChainIdFromName(blockchain);
            const tokenContract: Contract = getContract(result, nft_abi, RpcProviders[chainId], account ? account : undefined)
            setNFTCollection(tokenContract)
        }).catch(error => { console.log(error) })

        fetchRewardsPerDay(stakingContract).then(result => {
            setRewardsPerDay(result)
        }).catch(error => { console.log(error) })

        fetchAllStakedInfo(stakingContract).then(result => {
            setAllStakedInfo(result)
        }).catch(error => { console.log(error) })

        if (account) {
            fetchIsApprovedForAll(stakingContract).then(result => {
                setIsApprovedForAll(result)
                setFetchingStatus(false)
            }).catch(error => { console.log(error) })

            fetchAvailableRewards(stakingContract).then(result => {
                setAvailableRewards(result)
            }).catch(error => { console.log(error) })
        }

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
        <NFTStakingContext.Provider
            value={{
                bnbBalance,
                stfuBalance,
                rewardsToken,
                availableRewards,
                isApprovedForAll,
                nftCollection,
                rewardsPerDay,
                unstakedInfo,
                stakedInfo,
                allStakedInfo,
                blockTimestamp,
                fetchingStatus,
                stakeCallback,
                claimCallback,
                unstakeCallback,
                setApprovalForAllCallback,
                updateNFTsHoldenStats,
                updateStakingStats,
                setSelectStakedNFT,
                setSelectUnstakedNFT
            }}
        >
            {children}
        </NFTStakingContext.Provider >
    )
}

export const useNFTStaking = () => {
    const context = useContext(NFTStakingContext)

    if (!context) {
        throw new Error('Component rendered outside the provider tree')
    }

    return context
}
