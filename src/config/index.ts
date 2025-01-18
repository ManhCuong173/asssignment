import BigNumber from "bignumber.js";

export const BIG_TEN = new BigNumber(10)
export const BIG_ZERO = new BigNumber(0)


export enum FetchStatus {
    Idle = 'IDLE',
    Fetching = 'FETCHING',
    Fetched = 'FETCHED',
    Failed = 'FAILED',
  }
  