import BigNumber from 'bignumber.js'
import { TokenAmount } from 'config/types/tokenAmount'
import { utils } from 'ethers'
import { useMemo, useState } from 'react'
import { isContractInitialized } from 'utils/contract'
import { useStakeContract } from './useContract'
import { useStakingTokens } from './useStakeToken'
import { useVariableInitialize } from './useVariableInitialize'
import { useWeb3React } from './useWeb3React'

export const useStakeBalance = () => {
  const contract = useStakeContract()
  const { account } = useWeb3React()
  const { stakingToken } = useStakingTokens()
  const [balance, setBalance] = useState<TokenAmount>({ token: stakingToken, amount: new BigNumber(0) })

  useVariableInitialize(isContractInitialized(contract), async () => {
    try {
      const balanceOnChain = await contract.stakingBalance(account.address)
      const normalizeValue = utils.formatEther(balanceOnChain)
      setBalance({ ...balance, amount: new BigNumber(normalizeValue) })
    } catch (error) {}
  })

  return balance
}

export const usePendingReward = (): { pendingRewardBalance: TokenAmount; claimableRewardBalance: TokenAmount } => {
  const contract = useStakeContract()

  const { account } = useWeb3React()
  const { rewardToken } = useStakingTokens()

  const [pendingRewardBalance, setPendingRewardBalance] = useState<TokenAmount>({
    token: rewardToken,
    amount: new BigNumber(0),
  })
  const [claimableRewardBalance, setClaimableRewardBalance] = useState<TokenAmount>({
    token: rewardToken,
    amount: new BigNumber(0),
  })

  useVariableInitialize(isContractInitialized(contract), async () => {
    try {
      const pendingRewardOnChain = await contract.getPendingReward(account.address)
      const claimableRewardOnChain = await contract.rewardDebt(account.address)

      const normalizePendingReward = utils.formatEther(pendingRewardOnChain)
      const normalizeClaimableReward = utils.formatEther(claimableRewardOnChain)

      setPendingRewardBalance({ ...pendingRewardBalance, amount: new BigNumber(normalizePendingReward) })
      setClaimableRewardBalance({ ...claimableRewardBalance, amount: new BigNumber(normalizeClaimableReward) })
    } catch (error) {}
  })

  return useMemo(
    () => ({
      pendingRewardBalance,
      claimableRewardBalance,
    }),
    [pendingRewardBalance, claimableRewardBalance],
  )
}
