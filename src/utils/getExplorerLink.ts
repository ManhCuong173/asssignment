import { appNetworkMapper } from "config/networks"
import { ChainIdEnum } from "config/types/network"

export function getExplorerLink(
    data: string | number,
    type: 'transaction' | 'token' | 'address' | 'block' | 'countdown',
    chainId: ChainIdEnum,
  ): string {
    switch (type) {
      case 'transaction': {
        return `${appNetworkMapper[chainId].baseInfo.blockExplorer}/tx/${data}`
      }
      case 'token': {
        return `${appNetworkMapper[chainId].baseInfo.blockExplorer}/token/${data}`
      }
      case 'block': {
        return `${appNetworkMapper[chainId].baseInfo.blockExplorer}/block/${data}`
      }
      case 'countdown': {
        return `${appNetworkMapper[chainId].baseInfo.blockExplorer}/block/countdown/${data}`
      }
      default: {
        return `${appNetworkMapper[chainId].baseInfo.blockExplorer}/address/${data}`
      }
    }
  }