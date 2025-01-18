import { ChainIdEnum } from "config/types/network";

type AddressByChain = {
    [key in ChainIdEnum]: {
        Staking: string
    }
}

export const AddressByChainMapper: AddressByChain = {
    [ChainIdEnum.SEPOLIA]: {
        Staking: '0x73EC97F9b3694e230FEe46c8309fef2d753cE1b1'
    }
}

