import { createReducer } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'config'
import { PendingRewardTokenAmount, RewardTokenAmount, StakingTokenAmount } from 'config/tokens'
import { TokenAmount } from 'config/types/tokenAmount'
import { claimAction, stakeAction, unstakeAction, updatePendingRewardAmount, updateRewardAmount, updateStakingAmount } from './action'


export enum Status {
    NotStaking = 'NotStaking',
    ConnectWallet = 'ConnectWallet',
    IsStaking = 'IsStaking',
    IsUnstaking = 'IsUnstaking',
    IsClaiming = 'IsClaiming',
    IsStakingSuccess = 'IsStakingSuccess',
    IsStakingFailed = 'IsStakingFailed',
    IsUnstakingSuccess = 'IsUnstakingSuccess',
    IsUnstakingFailed = 'IsUnstakingFailed',
    IsClaimingSuccess = 'IsClaimingSuccess',
    IsClaimingFailed = 'IsClaimingFailed',
    
}

export interface StakingState {
  status: Status,
  stakingAmount: TokenAmount,
  pendingRewardAmount: TokenAmount
  rewardAmount: TokenAmount
}

const initialState: StakingState = {
    status: Status.NotStaking,
    stakingAmount: StakingTokenAmount,
    rewardAmount: RewardTokenAmount,
    pendingRewardAmount: PendingRewardTokenAmount
}

export default createReducer<StakingState>(initialState, (builder) =>
  builder
    .addCase(updateStakingAmount, (state, {payload}) => {
        state.stakingAmount = {...state.stakingAmount, amount: payload.amount}
    })
    .addCase(updateRewardAmount, (state, {payload}) => {
        state.rewardAmount = {...state.rewardAmount, amount: payload.amount}
    })
    .addCase(updatePendingRewardAmount, (state, {payload}) => {
        state.pendingRewardAmount = {...state.pendingRewardAmount, amount: payload.amount}
    })
    .addCase(stakeAction.pending, (state) => {
    state.status = Status.IsStaking
    })
    .addCase(stakeAction.fulfilled, (state, {payload: {data}}) => {
        state.status = Status.IsStakingSuccess
        state.stakingAmount = {...state.stakingAmount, amount: state.stakingAmount.amount.plus(data)}
    })
    .addCase(stakeAction.rejected, (state) => {
        state.status = Status.IsClaimingFailed
    })
    .addCase(unstakeAction.pending, (state) => {
    state.status = Status.IsUnstaking
    })
    .addCase(unstakeAction.fulfilled, (state, {payload: {data}}) => {
        state.status = Status.IsUnstakingSuccess
        state.stakingAmount = {...state.stakingAmount, amount: BIG_ZERO}

        state.rewardAmount = {...state.stakingAmount, amount: BIG_ZERO}
        state.pendingRewardAmount = {...state.pendingRewardAmount, amount: BIG_ZERO}
    })
    .addCase(unstakeAction.rejected, (state) => {
        state.status = Status.IsUnstakingFailed
    })
    .addCase(claimAction.pending, (state) => {
    state.status = Status.IsClaiming
    })
    .addCase(claimAction.fulfilled, (state, {payload: {data}}) => {
        state.status = Status.IsClaimingSuccess
        state.rewardAmount = {...state.rewardAmount, amount: new BigNumber(state.rewardAmount.amount).plus(data)}

        state.stakingAmount = {...state.stakingAmount, amount: BIG_ZERO}
        state.pendingRewardAmount = {...state.pendingRewardAmount, amount: BIG_ZERO}
    })
    .addCase(claimAction.rejected, (state) => {
        state.status = Status.IsClaimingFailed
    })
   
)
