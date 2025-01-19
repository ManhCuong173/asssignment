import { Interface } from "@ethersproject/abi";
import ERC20_ABI from "./erc20.json";
import STAKING_ABI from "./staking.json";

 const ERC20_ABI_INTERFACE = new Interface(ERC20_ABI)
 const STAKING_ABI_INTERFACE = new Interface(STAKING_ABI)


export {
    ERC20_ABI, ERC20_ABI_INTERFACE, STAKING_ABI, STAKING_ABI_INTERFACE
};

