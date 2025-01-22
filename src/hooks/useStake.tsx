import BigNumber from 'bignumber.js'
import { utils } from 'ethers'
import { useCallback, useMemo, useState } from 'react'
import { useAppDispatch } from 'state'
import { claimAction, stakeAction, unstakeAction } from 'state/stake/action'
import { useStakeContract } from './useContract'
import { useTransactionProcessToast } from './useTransactionProcessToast'
import { useVariableInitialize } from './useVariableInitialize'
import { useWeb3React } from './useWeb3React'

export const useStakeMethods = () => {
  const contract = useStakeContract()
  const { onUserRejectTxnToasted } = useTransactionProcessToast()
  const dispatch = useAppDispatch()

  const handleStakeToken = useCallback(
    async (inputAmount: string) => {
      try {
        dispatch(stakeAction.pending())
        const etherAmount = utils.parseEther(inputAmount)
        const tx = await contract.stake({ value: etherAmount })
        await tx.wait()
        return tx
      } catch (error) {
        onUserRejectTxnToasted(error.code)
        dispatch(stakeAction.rejected({ errorMessage: error.message || '' }))
      }
    },
    [contract],
  )

  const handleUnstakeToken = useCallback(async () => {
    try {
      dispatch(unstakeAction.pending())
      const tx = await contract.unstake()
      await tx.wait()
      return tx
    } catch (error) {
      onUserRejectTxnToasted(error.code)
      dispatch(unstakeAction.rejected({ errorMessage: error.message || '' }))
    }
  }, [contract])

  const handleClaimReward = useCallback(async () => {
    try {
      dispatch(claimAction.pending())
      const tx = await contract.claimReward()
      await tx.wait()
      return tx
    } catch (error) {
      onUserRejectTxnToasted(error.code)
      dispatch(claimAction.pending())
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
  const { account, etherProvider } = useWeb3React()
  const [stakeDuration, setStakeDuration] = useState<Date>(null)

  useVariableInitialize(!!(contract && etherProvider && account), async () => {
    try {
      const stakeDuration = await contract.lastStakeTime(account.address)
      if (new BigNumber(stakeDuration.toString()).lte(0)) return
      if (stakeDuration) {
        setStakeDuration(new Date(new BigNumber(stakeDuration.toString()).multipliedBy(1000).toNumber()))
      }
    } catch (error) {
      console.error(error)
    }
  })

  return useMemo(() => stakeDuration, [stakeDuration])
}
