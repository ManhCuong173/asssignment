import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import * as wallets from '@rainbow-me/rainbowkit/wallets';
import { isUndefined } from 'lodash';
import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { createStorage } from 'wagmi';
import { CHAINS, transport } from '../../config/networks';

const storage = createStorage({ storage: !isUndefined(window) ? window.localStorage : null , key: 'wagmi.cache'},)

export const wagmiConfig = () => {
  const config = getDefaultConfig({
    appName: 'Assignment',
    projectId: 'Asssigment',
    wallets: [
      {groupName: 'Popular', wallets:[wallets.metaMaskWallet] }
    ],
    chains: CHAINS,
    storage,
    cacheTime: 100000,
    transports: transport 
  })

  return config
}

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http()
})

