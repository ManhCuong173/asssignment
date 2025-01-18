import React from 'react'
import { ThemeProvider } from 'styled-components'

import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClientProvider } from '@tanstack/react-query'
import { fetchStatusMiddleware } from 'hooks/useSWRContract'
import { queryClient } from 'packages/tanstack/queryClient'
import { wagmiConfig } from 'packages/wagmi/wagmi'
import { SWRConfig } from 'swr'
import { theme } from 'theme'
import { WagmiProvider } from 'wagmi'

const Providers: React.FC<{  children: React.ReactNode }> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig()}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider >
            <ThemeProvider theme={theme}>
              <SWRConfig
                value={{
                  use: [fetchStatusMiddleware],
                }}
                >
                {children}
              </SWRConfig>
            </ThemeProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Providers
