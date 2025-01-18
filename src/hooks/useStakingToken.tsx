import { AddressTokenByChain } from 'config/tokens'
import { ChainIdEnum } from 'config/types/network'
import { Token } from 'config/types/token'
import { useMemo } from 'react'

export const useStakingTokens = (): { stakingToken: Token; rewardToken: Token } => {
  return useMemo(() => {
    const chain = AddressTokenByChain[ChainIdEnum.SEPOLIA]

    return {
      stakingToken: chain['ETH'],
      rewardToken: chain['REWARD'],
    }
  }, [])
}
