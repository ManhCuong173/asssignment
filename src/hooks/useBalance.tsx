import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'config'
import { utils } from 'ethers'
import { isUndefined } from 'lodash'
import { useMemo, useState } from 'react'
import { errorMonitor } from 'stream'
import { getBalanceAmount } from 'utils/formatBalances'
import { useErc20Contract, useStakeContract } from './useContract'
import { useVariableInitialize } from './useVariableInitialize'
import { useWeb3React } from './useWeb3React'

export const useTokenBalance = (tokenAddress: string) => {
  const contract = useErc20Contract(tokenAddress)
  const { account } = useWeb3React()
  const [balance, setBalance] = useState<BigNumber>(BIG_ZERO)

  useVariableInitialize(!isUndefined(contract) && !isUndefined(account), async () => {
    try {
      const balance = await contract.balanceOf(account.address)
      setBalance(new BigNumber(utils.formatEther(balance)))
    } catch (error) {
      console.error(errorMonitor)
    }
  })

  return useMemo(() => {
    return balance
  }, [balance])
}

export const useNativeBalance = () => {
  const [balance, setBalance] = useState<BigNumber>(BIG_ZERO)
  const contract = useStakeContract()
  const { account, etherProvider } = useWeb3React()

  useVariableInitialize(!isUndefined(account) && !isUndefined(etherProvider) && !isUndefined(contract), async () => {
    try {
      const balance = await etherProvider.getBalance(account.address)
      setBalance(getBalanceAmount(new BigNumber(balance.toString())))
    } catch (error) {
      console.error(errorMonitor)
    }
  })

  return useMemo(() => {
    return balance
  }, [balance])
}
