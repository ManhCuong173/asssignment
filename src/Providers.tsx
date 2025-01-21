import React from 'react'
import { ThemeProvider } from 'styled-components'

import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClientProvider } from '@tanstack/react-query'
import { fetchStatusMiddleware } from 'hooks/useSWRContract'
import { queryClient } from 'packages/tanstack/queryClient'
import { wagmiConfig } from 'packages/wagmi/wagmi'
import { Provider } from 'react-redux'
import store from 'state'
import { SWRConfig } from 'swr'
import { theme } from 'theme'
import Updater from 'updaters/Updaters'
import { WagmiProvider } from 'wagmi'

const wagmiConfigInstance = wagmiConfig()

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <WagmiProvider config={wagmiConfigInstance}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <ThemeProvider theme={theme}>
              <SWRConfig
                value={{
                  use: [fetchStatusMiddleware],
                }}
              >
                {children}
                <Updater />
              </SWRConfig>
            </ThemeProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  )
}

export default Providers
