import BigNumber from "bignumber.js"
import { BIG_TEN } from "config"

/**
 * 1500000000000000 - > 1.5
 */
export const getBalanceAmount = (amount: BigNumber | string | number, decimals = 18) => {
    return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}

/**
 * 1.5 -> 1500000000000000
 */
export const getDecimalAmount = (amount: BigNumber | string | number, decimals = 18) => {
    return new BigNumber(amount).multipliedBy(BIG_TEN.pow(decimals)).integerValue()
}