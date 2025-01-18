import { useMemo } from "react"
import { useAccount } from "wagmi"
import { useEthersProvider } from "./useWagmiSignerOrProvider"

export const useWeb3React = () => {
    const account  = useAccount()
    const etherProvider = useEthersProvider()

    return useMemo(() => ({account, etherProvider,}), [account, etherProvider,])
}