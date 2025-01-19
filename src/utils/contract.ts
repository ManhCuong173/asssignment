import { IStakingContract } from "config/types/staking"
import { Contract } from "ethers"
export const isContractInitialized = (contract: Contract | IStakingContract) => {
  return !!(contract.signer || contract.provider)
}
