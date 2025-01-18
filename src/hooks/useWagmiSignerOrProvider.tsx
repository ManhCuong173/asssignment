import { ChainIdEnum } from 'config/types/network';
import { web3Provider } from 'utils/etherSignerOrProvider';
import { useWalletClient } from 'wagmi';


export const useEthersProvider = (chainId?: ChainIdEnum) => {
    const {data} = useWalletClient({chainId})
    return web3Provider(data as any, chainId)
}

