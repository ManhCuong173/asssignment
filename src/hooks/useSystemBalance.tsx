import BigNumber from 'bignumber.js'
import { TokenAmount } from 'config/types/tokenAmount'
import { utils } from 'ethers'
import { useEffect, useState } from 'react'
import { useStakingContract } from './useContract'
import { useStakingTokens } from './useStakingToken'
import { useWeb3React } from './useWeb3React'

export const useStakableBalance = () => {
  const contract = useStakingContract()
  const { account } = useWeb3React()
  const { stakingToken } = useStakingTokens()
  const [stakableToken, setStakeableToken] = useState<TokenAmount>({ token: stakingToken, amount: new BigNumber(0) })

  useEffect(() => {
    if (account) {
      const fetch = async () => {
        try {
          const reward = await contract.stakingBalance(account.address)
          const normalizeValue = utils.formatEther(reward.toString()).toString()
          setStakeableToken({ ...stakableToken, amount: new BigNumber(normalizeValue) })
        } catch (error) {}
      }

      fetch()
    }
  }, [contract, account])

  return stakableToken
}

export const usePendingReward = (): TokenAmount => {
  const contract = useStakingContract()
  const { account } = useWeb3React()
  const { rewardToken } = useStakingTokens()
  const [pendingReward, setPendingReward] = useState<TokenAmount>({ token: rewardToken, amount: new BigNumber(0) })

  useEffect(() => {
    if (account) {
      const fetch = async () => {
        try {
          const reward = await contract.getPendingReward(account.address)
          const normalizeValue = utils.formatEther(reward)
          setPendingReward({ ...pendingReward, amount: new BigNumber(normalizeValue) })
        } catch (error) {}
      }

      fetch()
    }
  }, [contract, account])

  return pendingReward
}
