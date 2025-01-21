import { configureStore, Store } from "@reduxjs/toolkit";
import BigNumber from "bignumber.js";
import { PendingRewardTokenAmount, RewardTokenAmount, StakingTokenAmount } from 'config/tokens';
import { updatePendingRewardAmount, updateRewardAmount, updateStakingAmount } from "./action";
import stakingReducer, { StakingState } from './reducer';

jest.mock("wagmi/chains", () => ({
    Chain: jest.fn(),
    mainnet: jest.fn(),
    sepolia: jest.fn(),
  }));
  
  
describe('stake reducer', () => {
    let store: Store<StakingState>;

    beforeEach(() => {
        store = configureStore({
            reducer: stakingReducer,
            preloadedState: {
                stakingAmount: StakingTokenAmount, 
                pendingRewardAmount: PendingRewardTokenAmount, 
                rewardAmount: RewardTokenAmount
            }})
    })
    describe('initialize', () => {
        it('initialize staking amount', () => {
            store.dispatch(updateStakingAmount({amount: new BigNumber('0.1')}))
            expect(store.getState().stakingAmount.amount).toEqual(new BigNumber('0.1'))
        })
        it('initialize reward staking amount', () => {
            store.dispatch(updateRewardAmount({amount: new BigNumber('0.1')}))
            expect(store.getState().rewardAmount.amount).toEqual(new BigNumber('0.1'))
        })
        it('initialize pending reward staking amount', () => {

            store.dispatch(updatePendingRewardAmount({amount: new BigNumber('0.1')}))
            expect(store.getState().pendingRewardAmount.amount).toEqual(new BigNumber('0.1'))
        })
    })
})