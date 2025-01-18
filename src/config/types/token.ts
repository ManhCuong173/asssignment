import { ChainIdEnum } from "./network"

/**
 * App base Token type
 */
export type Token = {
    chainId: ChainIdEnum
    name: string
    address: string
    isNative: boolean
    decimals: number
    symbol: string
    logo: string
}