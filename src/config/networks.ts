import { isTestnet } from "utils/envHelper"
import { Chain, mainnet, sepolia } from "wagmi/chains"
import { ChainIdEnum, Network } from "./types/network"

type NetworkMapper = {
    [key: string]: Network
    
}

/**
 * App network mapping information
 */
export const appNetworkMapper: NetworkMapper = {
    [ChainIdEnum.ETH]: {
        code: 'ETH',
        chain: mainnet,
        baseInfo: {
            blockExplorer: ''
        }
    },
    [ChainIdEnum.SEPOLIA]: {
        code: 'SEPOLIA',
        chain: sepolia,
        baseInfo: {
            blockExplorer: ''
        }
    }
}

export const CHAINS: [Chain, ...Chain[]] = isTestnet
  ? [sepolia]
  : [sepolia]

export const transport = CHAINS.reduce((prev, transport) => ({...prev, [transport.id]: transport.rpcUrls.default.http}), {})