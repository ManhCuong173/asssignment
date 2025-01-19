import { ChainIdEnum } from "./types/network";
import { Token } from "./types/token";



export const ETH: Token = {
    name: 'Ether',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    symbol: 'ETH',
    decimals: 18,
    chainId: ChainIdEnum.SEPOLIA,
    isNative: true,
    logo: ''
}

export const REWARD: Token = {
    name: 'Reward',
    address: '0x099c0EBa98713231f2585F1dD7DCB01e6a1e0DD1',
    symbol: 'REWARD',
    decimals: 18,
    chainId: ChainIdEnum.SEPOLIA,
    isNative: false,
    logo: ''
}

export const AddressTokenByChain: {[ChainEnum in ChainIdEnum]: {[tokenCode:string]: Token}} = {
    [ChainIdEnum.SEPOLIA]: {
        'ETH': ETH,
        'REWARD': REWARD
    }   
}

