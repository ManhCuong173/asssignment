import { Web3Provider } from '@ethersproject/providers';
import { ChainIdEnum } from "config/types/network";
import { isUndefined } from "lodash";
import { Chain, Client, Transport } from "viem";

/**
 * 
 * @param client Viem client interface
 * @param chainIdEnum App chain ids
 * @returns Convert new structure of Wagmi/View to legacy structure of Provider
 */
export const web3Provider = (client: Client<Transport, Chain>, chainIdEnum?: ChainIdEnum) => {
    if(!isUndefined(client)) {  
        const {chain, transport}: {chain: Chain, transport: unknown} = client;
        return new Web3Provider(transport, {chainId: chain.id || chainIdEnum, name: chain.name, ensAddress: chain.contracts.ensRegistry.address})
    }
    return null
}