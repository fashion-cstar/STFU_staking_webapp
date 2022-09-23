import { JsonRpcSigner, JsonRpcProvider } from '@ethersproject/providers'

import { AddressZero } from '@ethersproject/constants'
import { BigNumber, ethers, utils } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { getAddress } from '@ethersproject/address'
import { ChainId } from "@usedapp/core";
import { RpcProviders } from 'src/constants/AppConstants'

export var network='mainnet'

enum NETWORK_NAME {
    Ethereum = 'ethereum',
    BSC = 'bsc',
    Polygon = 'polygon'
}

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
    if (value) {
        try {
            return getAddress(value)
        } catch (e) {
            return false
        }
    }
    return false
}

export const CHAIN_LABELS: { [chainId in ChainId]?: string } = {
    [ChainId.Mainnet]: 'Ethereum',
    [ChainId.Rinkeby]: 'Rinkeby',
    [ChainId.BSC]: 'Smart Chain',
    [ChainId.BSCTestnet]: 'Smart Chain Testnet',
    [ChainId.Polygon]: 'Polygon',
    [ChainId.Mumbai]: 'Mumbai',
}

export function getEtherscanLink(
    chainId: number,
    data: string,
    type: string
): string {
    let prefix = `https://etherscan.io`
    if (chainId === ChainId.Rinkeby) {
        prefix = `https://rinkeby.etherscan.io`
    }
    if (chainId === ChainId.BSCTestnet) {
        prefix = `https://testnet.bscscan.com`
    }
    if (chainId === ChainId.BSC) {
        prefix = `https://bscscan.com`
    }
    if (chainId === ChainId.Polygon) {
        prefix = `https://polygonscan.com`
    }
    switch (type) {
        case 'transaction': {
            return `${prefix}/tx/${data}`
        }
        case 'token': {
            return `${prefix}/token/${data}`
        }
        case 'block': {
            return `${prefix}/block/${data}`
        }
        case 'address':
        default: {
            return `${prefix}/address/${data}`
        }
    }
}

export function calculateGasMargin(value: BigNumber): BigNumber {
    // return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
    return value.mul(BigNumber.from(2))
}

export function shortenAddress(address: string, chars = 4): string {
    const parsed = isAddress(address)
    if (!parsed) {
        throw Error(`Invalid 'address' parameter '${address}'.`)
    }
    return `${parsed.substring(0, chars + 3)}...${parsed.substring(42 - chars)}`
}

export function getSigner(library: JsonRpcProvider, account: string): JsonRpcSigner {
    return library.getSigner(account).connectUnchecked()
}

export function getProviderOrSigner(library: JsonRpcProvider, account?: string): JsonRpcProvider | JsonRpcSigner {
    return account ? getSigner(library, account) : library
}

export function getContract(address: string, ABI: any, library: JsonRpcProvider, account?: string): Contract {
    if (!isAddress(address) || address === AddressZero) {
        throw Error(`Invalid 'address' parameter '${address}'.`)
    }

    return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export const wait = (time: number) =>
    new Promise(resolve => {
        setTimeout(resolve, time * 1000)
    })

export const formatEther = (amount: BigNumber, decimals: number = 18, toFixed: number, groupSeparator: boolean): string => {
    let res
    if (toFixed >= decimals) {
        res = ethers.FixedNumber.fromString(utils.formatUnits(amount, decimals)).toString()
    } else {
        let fixed = ethers.FixedNumber.fromString(utils.formatUnits(BigNumber.from(10).pow(toFixed), 0))
        res = ethers.FixedNumber.fromString(utils.formatUnits(amount, decimals - toFixed)).floor().divUnsafe(fixed).toString()
    }
    if (res.substring(res.length - 2, res.length) === '.0') {
        res = res.substring(0, res.length - 2)
    }
    if (groupSeparator) {
        res = utils.commify(res)
    }

    return res
}

export const parseEther = (n: string, decimals: number = 18): BigNumber => {
    return utils.parseUnits(n, decimals)
}

export const getChainIdFromName = (name: string): number => {
    let chainId = 1
    switch (name.toLowerCase()) {
        case NETWORK_NAME.Ethereum:
            if (network === 'mainnet') chainId = 1; //ethereum mainnet
            else if (network === 'testnet') chainId = 4; //ethereum rinkeby
            break;
        case NETWORK_NAME.BSC:
            if (network === 'mainnet') chainId = 56; //bsc mainnet
            else if (network === 'testnet') chainId = 97; //bsc testnet            
            break;
        case NETWORK_NAME.Polygon:
            if (network === 'mainnet') chainId = 137; //polygon mainnet
            else if (network === 'testnet') chainId = 80001; //mumbai testnet            
            break;
        default:
            if (network === 'mainnet') chainId = 56; //bsc mainnet
            else if (network === 'testnet') chainId = 97; //bsc testnet            
    }
    return chainId
}

export const getNativeSymbol = (name: string): string => {
    let symbol = 'BNB'
    switch (name.toLowerCase()) {
        case NETWORK_NAME.Ethereum:
            symbol = "ETH"
            break;
        case NETWORK_NAME.BSC:
            symbol = "BNB"
            break;
        case NETWORK_NAME.Polygon:
            symbol = "MATIC"
            break;
        default:
    }
    return symbol
}

export const isNativeCoin = (blockchain: string, symbol: string) => {
    switch (blockchain) {
        case NETWORK_NAME.BSC:
            return (symbol.toLowerCase().indexOf('bnb') >= 0)
        case NETWORK_NAME.Ethereum:
            return (symbol.toLowerCase().indexOf('eth') >= 0)
        case NETWORK_NAME.Polygon:
            return (symbol.toLowerCase().indexOf('matic') >= 0)
    }
}

export const getFixedDecimals = (p: number, precisions: number): number => {
    for (let i = 0; i >= -18; i--) {
        if (p >= Math.pow(10, i)) {
            return Math.abs(i) + precisions
        }
    }
    return 0
}

export const isContract = async (address: string, blockchain: string): Promise<boolean> => {
    try {
        const chainId = getChainIdFromName(blockchain);
        const code = await RpcProviders[chainId].getCode(address);
        if (code !== '0x') return true
    } catch (error) { }
    return false
}

export const getShortDateTimeWithoutSeconds = (d: Date): string => {
    return d.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
    // let res: string = d.toISOString().slice(0, 16)
    // return res.split('T')[0] + '  ' + res.split('T')[1]
}

export const getShortDateTime = (d: Date): string => {
    return d.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    // let res: string = d.toISOString().slice(0, 19)
    // return res.split('T')[0] + '  ' + res.split('T')[1]
}


export const getShortDateTimeWithoutSeconds_ = (d: Date): string => {
    let y = d.getFullYear()
    let m = (d.getMonth() + 1).toString().padStart(2, '0')
    let date = d.getDate().toString().padStart(2, '0')
    let h = d.getHours().toString().padStart(2, '0')
    let min = d.getMinutes().toString().padStart(2, '0')
    return y + "-" + m + "-" + date + " " + h + ':' + min
}

export const getShortDateTimeWithoutSeconds_yy = (d: Date): string => {
    let y = d.getFullYear().toString().substring(2)
    let m = (d.getMonth() + 1).toString().padStart(2, '0')
    let date = d.getDate().toString().padStart(2, '0')
    let h = d.getHours().toString().padStart(2, '0')
    let min = d.getMinutes().toString().padStart(2, '0')
    return m + "-" + date + "-" + y + " " + h + ':' + min
}

export const getShortDateTime_ = (d: Date): string => {
    let y = d.getFullYear()
    let m = (d.getMonth() + 1).toString().padStart(2, '0')
    let date = d.getDate().toString().padStart(2, '0')
    let h = d.getHours().toString().padStart(2, '0')
    let min = d.getMinutes().toString().padStart(2, '0')
    let s = d.getSeconds().toString().padStart(2, '0')
    return y + "-" + m + "-" + date + " " + h + ':' + min + ':' + s
}

export const getShortenAmount = (amount: number, fixed: number): string => {
    let res = amount
    let unit = ''
    if (amount >= 1000000000) {
        res = amount / 1000000000
        unit = 'B'
    } else if (amount >= 1000000) {
        res = amount / 1000000
        unit = 'M'
    } else if (amount >= 1000) {
        res = amount / 1000
        unit = 'K'
    }
    return res.toFixed(getFixedDecimals(res, fixed)) + unit
}

export const maxStakingAmount = 1000000000