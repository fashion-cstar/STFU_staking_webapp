/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState, useRef } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { useEthers } from "@usedapp/core";
import { getContract, calculateGasMargin } from 'src/utils'
import { TransactionResponse } from '@ethersproject/providers'
import { RpcProviders, NFTContractAddress, AppTokenAddress } from "src/constants/AppConstants"
import useRefresh from 'src/hooks/useRefresh'
import { getChainIdFromName } from 'src/utils'
import nft_abi from 'src/constants/abis/STFU_NFT.json'
import ERC20_ABI from 'src/constants/abis/erc20.json'
import { useNativeTokenBalance, useTokenBalanceCallback } from 'src/hooks/hooks'

declare type Maybe<T> = T | null | undefined

export interface INFTInfo {
    owner: string
    tokenId: number
    tokenURI: string
    mintTimestamp: number
    payedTokenAmount: BigNumber
    payedBNBAmount: BigNumber
}

export interface IUserMintInfo {
    balance: number
    tokens: number[]
    nfts: INFTInfo[]
}

export interface IMintStatus {
    isMintingEnabled: boolean
    isPaymentForMint: boolean
    isBurningEnabled: boolean
    isTransferEnabled: boolean
}

export interface INFTContext {
    totalSupply: number
    bnbBalance: BigNumber
    stfuBalance: BigNumber
    nfts: INFTInfo[]
    userNfts: IUserMintInfo
    blockTimestamp: number
    mintStatus: IMintStatus
    tokenPerMint: BigNumber
    bnbPerMint: BigNumber
    maxSupply: number
    maxBalance: number
    mintCallback: (quantity: BigNumber, stfuAmount: BigNumber, bnbAmount: BigNumber) => Promise<any>
    burnCallback: (tokenIds: BigNumber[]) => Promise<any>
    tokenURICallback: (tokenId: BigNumber) => Promise<any>
    approveCallback: (to: string, tokenId: BigNumber) => Promise<any>
    transferFromCallback: (from: string, to: string, tokenId: BigNumber) => Promise<any>
    updateNFTStats: () => void
}

const NFTContext = React.createContext<Maybe<INFTContext>>(null)
const blockchain = 'bsc'

export const NFTProvider = ({ children = null as any }) => {
    const { account, library } = useEthers()
    const [stfuBalance, setStfuBalance] = useState(BigNumber.from(0))
    const { slowRefresh, fastRefresh } = useRefresh()
    const [bnbBalance, setBnbBalance] = useState(BigNumber.from(0))
    const nativeBalance = useNativeTokenBalance('bsc')
    const { nativeBalanceCallback } = useTokenBalanceCallback()
    const [totalSupply, setTotalSupply] = useState(0)
    const [nfts, setNFTS] = useState<INFTInfo[]>()
    const [userNfts, setUserNFTS] = useState<IUserMintInfo>()
    const [mintStatus, setMintStatus] = useState<IMintStatus>()
    const [blockTimestamp, setBlockTimestamp] = useState(0)
    const [tokenPerMint, setTokenPerMint] = useState(BigNumber.from(0))
    const [bnbPerMint, setBnbPerMint] = useState(BigNumber.from(0))
    const [maxSupply, setMaxSupply] = useState(0)
    const [maxBalance, setMaxBalance] = useState(0)

    useEffect(() => {
        if (nativeBalance) {
            setBnbBalance(nativeBalance)
        }
    }, [nativeBalance])

    useEffect(() => {
        // if (account && library) {
        try {
            updateNFTStats()
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
        setUserNFTS(undefined)
    }, [account])

    const mintCallback = async function (quantity: BigNumber, stfuAmount: BigNumber, bnbAmount: BigNumber) {
        if (!account || !library || !NFTContractAddress) return
        const NFTContract: Contract = getContract(NFTContractAddress, nft_abi, library, account ? account : undefined)
        return NFTContract.estimateGas.createNFT(quantity, stfuAmount, { value: bnbAmount }).then(estimatedGasLimit => {
            const gas = estimatedGasLimit
            return NFTContract.createNFT(quantity, stfuAmount, {
                gasLimit: calculateGasMargin(gas), value: bnbAmount
            }).then((response: TransactionResponse) => {
                return response.wait().then((res: any) => {
                    return { status: res.status, hash: response.hash }
                })
            })
        })
    }

    const burnCallback = async function (tokenIds: BigNumber[]) {
        if (!account || !library || !NFTContractAddress) return
        const NFTContract: Contract = getContract(NFTContractAddress, nft_abi, library, account ? account : undefined)
        return NFTContract.estimateGas.burn(tokenIds).then(estimatedGasLimit => {
            const gas = estimatedGasLimit
            return NFTContract.burn(tokenIds, {
                gasLimit: calculateGasMargin(gas)
            }).then((response: TransactionResponse) => {
                return response.wait().then((res: any) => {
                    return { status: res.status, hash: response.hash }
                })
            })
        })
    }

    const approveCallback = async function (to: string, tokenId: BigNumber) {
        if (!account || !library || !NFTContractAddress) return
        const NFTContract: Contract = getContract(NFTContractAddress, nft_abi, library, account ? account : undefined)
        return NFTContract.estimateGas.approve(to, tokenId).then(estimatedGasLimit => {
            const gas = estimatedGasLimit
            return NFTContract.approve(to, tokenId, {
                gasLimit: calculateGasMargin(gas)
            }).then((response: TransactionResponse) => {
                return response.wait().then((res: any) => {
                    return { status: res.status, hash: response.hash }
                })
            })
        })
    }

    const transferFromCallback = async function (from: string, to: string, tokenId: BigNumber) {
        if (!account || !library || !NFTContractAddress) return
        const NFTContract: Contract = getContract(NFTContractAddress, nft_abi, library, account ? account : undefined)
        return NFTContract.estimateGas.safeTransferFrom(from, to, tokenId).then(estimatedGasLimit => {
            const gas = estimatedGasLimit
            return NFTContract.safeTransferFrom(from, to, tokenId, {
                gasLimit: calculateGasMargin(gas)
            }).then((response: TransactionResponse) => {
                return response.wait().then((res: any) => {
                    return { status: res.status, hash: response.hash }
                })
            })
        })
    }

    const tokenURICallback = async function (tokenId: BigNumber) {
        if (!account || !library || !NFTContractAddress) return
        const NFTContract: Contract = getContract(NFTContractAddress, nft_abi, library, account ? account : undefined)
        return NFTContract.tokenURI(tokenId).then((res: string) => {
            return res
        })
    }

    const fetchContractStatus = async (NFTContract: Contract) => {
        const res = await NFTContract.getContractStatus()
        return res
    }

    const fetchTokenPerMint = async (NFTContract: Contract) => {
        const res = await NFTContract.tokenPerMint()
        return res
    }

    const fetchBnbPerMint = async (NFTContract: Contract) => {
        const res = await NFTContract.bnbPerMint()
        return res
    }

    const fetchMaxSupply = async (NFTContract: Contract) => {
        const res = await NFTContract.MAX_SUPPLY()
        return res
    }

    const fetchMaxBalance = async (NFTContract: Contract) => {
        const res = await NFTContract.maxBalance()
        return res
    }

    const fetchTotalSupply = async (NFTContract: Contract) => {
        const res = await NFTContract.totalSupply()
        return res
    }

    const fetchAllMintedNfts = async (NFTContract: Contract) => {
        const res = await NFTContract.getAllMintedNFTs()
        return res
    }

    const updateNFTStats = async () => {
        const chainId = getChainIdFromName(blockchain);
        const NFTContract: Contract = getContract(NFTContractAddress, nft_abi, RpcProviders[chainId], account ? account : undefined)
        fetchContractStatus(NFTContract).then(async (result: any) => {
            setMintStatus({ isMintingEnabled: result.isMintingEnabled, isPaymentForMint: result.isTokenPaymentEnabled, isBurningEnabled: result.isBurningEnabled, isTransferEnabled: result.isTransferEnabled })
        }).catch(error => { console.log(error) })

        fetchTokenPerMint(NFTContract).then(result => {
            setTokenPerMint(result)
        }).catch(error => { console.log(error) })

        fetchBnbPerMint(NFTContract).then(result => {
            setMintStatus((item: IMintStatus) => ({ ...item, bnbPerMint: result }))
            setBnbPerMint(result)
        }).catch(error => { console.log(error) })

        fetchMaxSupply(NFTContract).then(result => {
            setMaxSupply(Number(result))
        }).catch(error => { console.log(error) })

        fetchMaxBalance(NFTContract).then(result => {
            setMaxBalance(Number(result))
        }).catch(error => { console.log(error) })

        fetchTotalSupply(NFTContract).then(result => {
            setTotalSupply(Number(result))
        }).catch(error => { console.log(error) })

        // fetchAllMintedNfts(NFTContract).then(result => {
        //     console.log(result)
        // }).catch(error => { console.log(error) })

        if (account) {
            const tokenContract: Contract = getContract(AppTokenAddress, ERC20_ABI, RpcProviders[chainId], account ? account : undefined)
            try {
                let bal = await tokenContract.balanceOf(account)
                setStfuBalance(bal)
                bal = await nativeBalanceCallback('bsc')
                setBnbBalance(bal)
            } catch (e) { }
            try {
                const bal = await NFTContract.balanceOf(account)
                const res = await NFTContract.getNFTSofAddress(account)
                setUserNFTS({ balance: Number(bal), tokens: res.tokens, nfts: res.nfts })
            } catch (e) { }
        } else {
            setStfuBalance(BigNumber.from(0))
            setUserNFTS(undefined)
        }
    }

    return (
        <NFTContext.Provider
            value={{
                totalSupply,
                bnbBalance,
                stfuBalance,
                nfts,
                userNfts,
                blockTimestamp,
                mintStatus,
                tokenPerMint,
                bnbPerMint,
                maxSupply,
                maxBalance,
                mintCallback,
                burnCallback,
                tokenURICallback,
                approveCallback,
                transferFromCallback,
                updateNFTStats,
            }}
        >
            {children}
        </NFTContext.Provider >
    )
}

export const useNFT = () => {
    const context = useContext(NFTContext)

    if (!context) {
        throw new Error('Component rendered outside the provider tree')
    }

    return context
}
