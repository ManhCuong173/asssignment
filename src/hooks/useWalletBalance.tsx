import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'config'
import { useEffect, useMemo, useState } from 'react'
import { errorMonitor } from 'stream'
import { getBalanceAmount } from 'utils/formatBalances'
import { useWeb3React } from './useWeb3React'

export const useWalletBalance = () => {
  const [balance, setBalance] = useState<BigNumber>(BIG_ZERO)
  const { account, etherProvider } = useWeb3React()

  useEffect(() => {
    const fetch = async () => {
      if (account) {
        try {
          const balance = await etherProvider.getBalance(account.address)
          setBalance(getBalanceAmount(new BigNumber(balance.toString())))
        } catch (error) {
          console.error(errorMonitor)
        }
      }
    }

    fetch()
  }, [account])

  return useMemo(() => {
    return balance
  }, [balance])
}
