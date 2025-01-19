import { Contract } from '@ethersproject/contracts'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { ERC20_ABI, STAKING_ABI } from 'config/abi/index'
import { ChainIdEnum } from 'config/types/network'
import { IStakingContract } from 'config/types/staking'
import { AddressByChainMapper } from 'constants/address'
import { useMemo } from 'react'
import { useEthersSigners } from './useEthersProvider'
import { useWeb3React } from './useWeb3React'

export const useContract = (address: string, ABI: any, signerOrProvider?: Web3Provider | JsonRpcSigner) => {
  const { etherProvider } = useWeb3React()
  const contractProviderOrSigner = signerOrProvider || etherProvider
  return useMemo(() => new Contract(address, ABI, contractProviderOrSigner), [address, ABI, contractProviderOrSigner])
}

export const useStakeContract = (): IStakingContract => {
  const signer = useEthersSigners()
  return useContract(AddressByChainMapper[ChainIdEnum.SEPOLIA].Staking, STAKING_ABI, signer)
}

export const useErc20Contract = (tokenAddress: string): Contract => {
  const { etherProvider } = useWeb3React()

  return useContract(tokenAddress, ERC20_ABI, etherProvider)
}
