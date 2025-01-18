import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import * as wallets from '@rainbow-me/rainbowkit/wallets';
import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { CHAINS } from '../../config/networks';


export const wagmiConfig = () => {
  const config = getDefaultConfig({
    appName: 'Assignment',
    projectId: '',
    wallets: [
      {groupName: 'Popular', wallets:[wallets.metaMaskWallet] }
    ],
    chains: CHAINS
  })

  return config
}

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http()
})
