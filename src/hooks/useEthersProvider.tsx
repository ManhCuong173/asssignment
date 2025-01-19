import { ChainIdEnum } from 'config/types/network'
import { web3Provider } from 'utils/etherSignerOrProvider'
import { useClient, useConnect, useWalletClient } from 'wagmi'

export const useEthersProvider = (chainId?: ChainIdEnum) => {
  const { data: connectData } = useConnect()
  const wagmiClientData = useClient({ chainId })
  const { data } = useWalletClient({ chainId: chainId || connectData?.chainId })
  return web3Provider((data as any) || wagmiClientData, chainId)
}

export const useEthersSigners = (chainId?: ChainIdEnum) => {
  const provider = useEthersProvider(chainId)
  return provider?.getSigner()
}
