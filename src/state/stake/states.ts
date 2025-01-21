import { useMemo } from "react"
import { useAppSelector } from "state"
import { Status } from "./reducer"

export const useStakingAmountState = () => {
    const {stakingAmount} = useAppSelector(state => state.staking)
    return useMemo(() => stakingAmount, [stakingAmount])
}
export const useStakingRewardAmountState = () => {
    const {rewardAmount} = useAppSelector(state => state.staking)
    return useMemo(() => rewardAmount, [rewardAmount])
}
export const useStakingPendingRewardAmountState = () => {
    const {pendingRewardAmount} = useAppSelector(state => state.staking)
    return useMemo(() => pendingRewardAmount, [pendingRewardAmount])
}

export const useIstaking = () => {
    const status = useAppSelector(state => state.staking.status)
    return useMemo(() => status === Status.IsStaking, [status])
}
export const useIsUnstaking = () => {
    const status = useAppSelector(state => state.staking.status)
    return useMemo(() => status === Status.IsUnstaking, [status])
}
export const useIsClaiming = () => {
    const status = useAppSelector(state => state.staking.status)
    return useMemo(() => status === Status.IsClaiming, [status])
}

