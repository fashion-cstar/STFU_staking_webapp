import { ChainId } from "@usedapp/core"
import BSCIcon from "src/common/svgs/BSCIcon"
import ETHIcon from "src/common/svgs/ETHIcon"
import { FC } from "react"
import { ethers } from "ethers"
import { JsonRpcProvider } from "@ethersproject/providers"

export const CHAIN_ID_MAP: { [key: ChainId | number]: string } = {
    1: "Ethereum Mainnet",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Görli Test Network",
    42: "Kovan Test Network",
    56: "Binance Smart Chain",
    0: "Not Connected",
}

export const CHAIN_ID_NAME_MAP: { [key: ChainId | number]: string } = {
    1: "ETH",
    3: "Ropsten",
    4: "Rinkeby",
    5: "Görli",
    42: "Kovan",
    56: "BEP20",
    0: "Not Connected",
}

export const CHAIN_ID_ICON_MAP: { [key: ChainId | number]: FC } = {
    1: ETHIcon,
    3: ETHIcon,
    4: ETHIcon,
    5: ETHIcon,
    42: ETHIcon,
    56: BSCIcon,
}

export const HTTP_METHODS: {
    [key: string]: "GET" | "POST" | "PUT" | "DELETE"
} = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
}

export const Rpc_URLS: { [chainId in ChainId]?: string } = {
    [ChainId.Mainnet]: 'https://mainnet.infura.io/v3/b6a2f439eeb57f2c3c4334a6/eth/mainnet',
    [ChainId.Rinkeby]: 'https://rinkeby.infura.io/v3/b6a2f439eeb57f2c3c4334a6/eth/rinkeby',
    [ChainId.BSC]: 'https://bsc-dataseed.binance.org',
    [ChainId.BSCTestnet]: 'https://data-seed-prebsc-1-s1.binance.org:8545'    
}

export const RpcProviders: { [chainId in ChainId]?: JsonRpcProvider } = {
    // [ChainId.Mainnet]: new ethers.providers.JsonRpcProvider(Rpc_URLS[ChainId.Mainnet]),
    // [ChainId.Rinkeby]: new ethers.providers.JsonRpcProvider(Rpc_URLS[ChainId.Rinkeby]),
    [ChainId.BSC]: new ethers.providers.JsonRpcProvider(Rpc_URLS[ChainId.BSC]),
    [ChainId.BSCTestnet]: new ethers.providers.JsonRpcProvider(Rpc_URLS[ChainId.BSCTestnet])
}

export const AppTokenAddress = "0x06b0e37F89faeF0BA9B3083a1adb4Bc4893997F6"
export const StakingContractAddress = "0x0980e91480268Bb5BB740A8C300573F534216c05"

export const BUY_STFU_URL = 'https://pancakeswap.finance/swap?outputCurrency=' + AppTokenAddress

export const PCS_API_ENDPOINTS = process.env.PCS_API_ENDPOINTS || "https://api.pancakeswap.info"