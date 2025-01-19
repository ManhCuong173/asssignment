import { utils } from 'ethers'
import { isUndefined } from 'lodash'
import { useCallback } from 'react'
import { useStakeContract } from './useContract'
import { useVariableInitialize } from './useVariableInitialize'
import { useWeb3React } from './useWeb3React'

export const ueStakeMethods = () => {
  const contract = useStakeContract()
  const handleStakeToken = useCallback(
    async (inputAmount: string) => {
      try {
        const etherAmount = utils.parseEther(inputAmount)
        const tx = await contract.stake({ value: etherAmount })
        await tx.wait()
        return tx
      } catch (error) {
        if (error.code === 'ACTION_REJECTED') {
          alert('reject transaction')
        }
      }
    },
    [contract],
  )

  const handleUnstakeToken = useCallback(async () => {
    try {
      const tx = await contract.unstake()
      await tx.wait()
      return tx
    } catch (error) {
      if (error.code === 'ACTION_REJECTED') {
        alert('reject transaction')
      }
    }
  }, [contract])

  const handleClaimReward = useCallback(async () => {
    try {
      const tx = await contract.claimReward()
      await tx.wait()
      return tx
    } catch (error) {
      if (error.code === 'ACTION_REJECTED') {
        alert('reject transaction')
      }
    }
  }, [contract])

  return {
    handleStakeToken,
    handleUnstakeToken,
    handleClaimReward,
  }
}

export const useStakeDuration = () => {
  const contract = useStakeContract()
  const { account } = useWeb3React()

  useVariableInitialize(!isUndefined(contract) && !isUndefined(account), async () => {
    const stakeDuration = await contract.lastStakeTime(account.address)
    console.log(stakeDuration)
  })
}
