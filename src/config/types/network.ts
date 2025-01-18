import { Chain, mainnet, sepolia } from "wagmi/chains"

/**
 *  App Network information
 */
export type Network = {
    code: string
    chain: Chain
    baseInfo: {
      blockExplorer: string
    }
}

/**
 * App Chain ID base on Wagmi chain ID
 */
 export enum ChainIdEnum {
    ETH = mainnet.id,
    SEPOLIA = sepolia.id
  }