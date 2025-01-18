import { ChainIdEnum } from "./types/network";
import { Token } from "./types/token";



export const SepoliaNativeEth: Token = {
    name: 'Ether',
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    symbol: 'ETH',
    decimals: 18,
    chainId: ChainIdEnum.SEPOLIA,
    isNative: true,
    logo: ''
}

export const RewardToken: Token = {
    name: 'Reward',
    address: '0x099c0EBa98713231f2585F1dD7DCB01e6a1e0DD',
    symbol: 'REWARD',
    decimals: 18,
    chainId: ChainIdEnum.SEPOLIA,
    isNative: false,
    logo: ''
}

export const AddressTokenByChain: {[ChainEnum in ChainIdEnum]: {[tokenCode:string]: Token}} = {
    [ChainIdEnum.SEPOLIA]: {
        'ETH': SepoliaNativeEth,
        'REWARD': RewardToken
    }   
}

