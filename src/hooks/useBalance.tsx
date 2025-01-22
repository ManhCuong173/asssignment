import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'config'
import { StakingTokenAmount } from 'config/tokens'
import { TokenAmount } from 'config/types/tokenAmount'
import { utils } from 'ethers'
import { useMemo, useState } from 'react'
import {
  useStakingAmountState,
  useStakingPendingRewardAmountState,
  useStakingRewardAmountState,
} from 'state/stake/states'
import { isContractInitialized } from 'utils/contract'
import { getBalanceAmount } from 'utils/formatBalances'
import { useErc20Contract, useStakeContract } from './useContract'
import { useVariableInitialize } from './useVariableInitialize'
import { useWeb3React } from './useWeb3React'

export const useTokenBalance = (tokenAddress: string) => {
  const contract = useErc20Contract(tokenAddress)
  const { account } = useWeb3React()
  const [balance, setBalance] = useState<BigNumber>(BIG_ZERO)

  useVariableInitialize(!!(account && isContractInitialized(contract)), async () => {
    try {
      const balance = await contract?.balanceOf(account.address)
      setBalance(new BigNumber(utils.formatEther(balance)))
    } catch (error) {
      console.error(error)
    }
  })

  return useMemo(() => {
    return balance
  }, [balance])
}

export const useNativeBalance = () => {
  const [balance, setBalance] = useState<TokenAmount>(StakingTokenAmount)
  const contract = useStakeContract()
  const { account, etherProvider } = useWeb3React()
  const stakingAmountState = useStakingAmountState()
  const unstakingAmountState = useStakingPendingRewardAmountState()
  const rewardAmountState = useStakingRewardAmountState()

  useVariableInitialize(
    !!(account && isContractInitialized(contract) && stakingAmountState && unstakingAmountState && rewardAmountState),
    async () => {
      try {
        const balanceOnChain = await etherProvider?.getBalance(account.address)
        setBalance({ ...balance, amount: getBalanceAmount(new BigNumber(balanceOnChain.toString())) })
      } catch (error) {
        console.error(error)
      }
    },
  )

  return useMemo(() => {
    return balance
  }, [balance])
}
