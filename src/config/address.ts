import { ChainIdEnum } from "./types/network";

export type Address = {
    [chainIdEnum in ChainIdEnum]?: string
  }
  