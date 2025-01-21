import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from "@reduxjs/toolkit"
import BigNumber from "bignumber.js"
import { TokenAmount } from "config/types/tokenAmount"

export const updateStakingAmount = createAction<{amount: BigNumber}>('stake/updateStakingAmount')
export const updatePendingRewardAmount = createAction<{amount: BigNumber}>('stake/updatePendingRewardAmount')
export const updateRewardAmount = createAction<{amount: BigNumber}>('stake/updateRewardAmount')

export const stakeAction: Readonly<{
    pending: ActionCreatorWithoutPayload
    fulfilled: ActionCreatorWithPayload<{ data: any }>
    rejected: ActionCreatorWithPayload<{ errorMessage: string }>
  }> = {
    pending: createAction('stake/stakeAction/pending'),
    fulfilled: createAction<{data: {stakingAmount: TokenAmount}}>('stake/stakeAction/fulfilled'),
    rejected: createAction('stake/stakeAction/rejected'),
  }

export const unstakeAction: Readonly<{
    pending: ActionCreatorWithoutPayload
    fulfilled: ActionCreatorWithPayload<{ data: any }>
    rejected: ActionCreatorWithPayload<{ errorMessage: string }>
  }> = {
    pending: createAction('unstakeAction/pending'),
    fulfilled: createAction<{data: {stakingAmount: TokenAmount}}>('unstakeAction/fulfilled'),
    rejected: createAction('unstakeAction/rejected'),
  }

export const claimAction: Readonly<{
    pending: ActionCreatorWithoutPayload
    fulfilled: ActionCreatorWithPayload<{ data: any }>
    rejected: ActionCreatorWithPayload<{ errorMessage: string }>
  }> = {
    pending: createAction('stake/claimAction/pending'),
    fulfilled: createAction<{data: {stakingAmount: TokenAmount}}>('stake/claimAction/fulfilled'),
    rejected: createAction('stake/claimAction/rejected'),
  }