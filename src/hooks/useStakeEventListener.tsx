import { BigNumberish } from 'ethers'
import { isContractInitialized } from 'utils/contract'
import { useStakeContract } from './useContract'
import { useVariableInitialize } from './useVariableInitialize'
import useWindowRef from './useWindowRef'

export const useStakingEventListener = ({
  onStaked,
  onUnstaked,
  onClaimed,
}: {
  onStaked?: (userAddress: string, amount: BigNumberish) => void
  onUnstaked?: (userAddress: string, amount: BigNumberish) => void
  onClaimed?: (userAddress: string, amount: BigNumberish) => void
}) => {
  const contract = useStakeContract()
  useVariableInitialize(isContractInitialized(contract), () => {
    contract.on('Staked', onStaked ?? null)
    contract.on('Unstaked', onUnstaked ?? null)
    contract.on('RewardClaimed', onClaimed ?? null)
  })

  const windowRef = useWindowRef().current
}
