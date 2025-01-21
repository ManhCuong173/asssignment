import BigNumber from "bignumber.js";
import { ChainIdEnum } from "./types/network";
import { Token } from "./types/token";
import { TokenAmount } from "./types/tokenAmount";



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


export const StakingTokenAmount: TokenAmount = {token: ETH, amount: new BigNumber(0)}
export const RewardTokenAmount: TokenAmount = {token: REWARD, amount: new BigNumber(0)}
export const PendingRewardTokenAmount: TokenAmount = {token: REWARD, amount: new BigNumber(0)}
