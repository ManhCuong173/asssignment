import { BigNumberish } from "@ethersproject/bignumber";
import { Contract } from "ethers";
import { TokenAmount } from "./tokenAmount";

export interface IStaking {
    stakeAmount: TokenAmount
}

export interface IStakingContract extends Partial<Contract> {
    /// Actions
    stake?(
        overrides: {
            value: BigNumberish
        }
    ): Promise<{wait: () => unknown}>
    unstake?(): Promise<{wait: () => unknown}>
    getPendingReward?(address: string): Promise<BigNumberish>
    stakingBalance?(address:string): Promise<BigNumberish>

    ///Events
    on?(
        event: "Staked",
        listener: (user: string, amount: BigNumberish) => void
    ): Contract
}