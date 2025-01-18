import { Contract } from '@ethersproject/contracts'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import STAKING_ABI from 'config/abi/staking.json'
import { ChainIdEnum } from 'config/types/network'
import { IStakingContract } from 'config/types/staking'
import { AddressByChainMapper } from 'constants/address'
import { isFunction } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from './useWeb3React'

export const useGetContract = (signerOrProvider?: Web3Provider | JsonRpcSigner) => {
  const { etherProvider } = useWeb3React()
  const contractProviderOrSigner = signerOrProvider || etherProvider

  const contractFetcher = useCallback(
    (address: string, ABI: any) => {
      return new Contract(address, ABI, contractProviderOrSigner)
    },
    [contractProviderOrSigner],
  )

  return contractFetcher
}

export const useStakingContract = (): IStakingContract => {
  const { etherProvider, account } = useWeb3React()
  const getContract = useGetContract(etherProvider?.getSigner())
  const [contract, setContract] = useState<IStakingContract>()

  useEffect(() => {
    if (isFunction(getContract)) {
      const fetch = async () => {
        try {
          const contract = await getContract(AddressByChainMapper[ChainIdEnum.SEPOLIA].Staking, STAKING_ABI)
          if (contract) {
            setContract(contract)
          }
        } catch (error) {
          console.error('Get staking contract Failed:')
        }
      }
      fetch()
    }
  }, [account])

  return contract
}
