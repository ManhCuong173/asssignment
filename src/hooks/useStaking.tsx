import { utils } from 'ethers'
import { useCallback } from 'react'
import { useStakingContract } from './useContract'

export const useStakingMethods = () => {
  const contract = useStakingContract()

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

  return {
    handleStakeToken,
    handleUnstakeToken,
  }
}

export const usePeriodStakingInformation = () => {
  const contract = useStakingContract()
}
