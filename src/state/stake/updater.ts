import { REWARD } from "config/tokens";
import { utils } from "ethers";
import { useTokenBalance } from "hooks/useBalance";
import { useStakingEventListener } from "hooks/useStakeEventListener";
import { usePendingReward, useStakeBalance } from "hooks/useSystemBalance";
import { useWeb3React } from "hooks/useWeb3React";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showSuccessToast } from "utils/toastify";
import { claimAction, stakeAction, unstakeAction, updatePendingRewardAmount, updateRewardAmount, updateStakingAmount } from "./action";


const useInitializeStaking = () => {
    const rewardAmount = useTokenBalance(REWARD.address)
    const stakingAmount = useStakeBalance()
    const pendingRewardAmount = usePendingReward()
    const dispatch = useDispatch()
    const {account} = useWeb3React()    

    useEffect(() => {
        if(account.address && stakingAmount.amount?.gt(0))
            dispatch(updateStakingAmount({amount:stakingAmount?.amount}))
    }, [stakingAmount, account.address])
    
    useEffect(() => {
        if(account.address && pendingRewardAmount?.amount.gt(0))
            dispatch(updatePendingRewardAmount({amount:pendingRewardAmount?.amount}))
    }, [pendingRewardAmount,account.address])

    useEffect(() => {
        if(account.address && rewardAmount?.gt(0))
            dispatch(updateRewardAmount({amount:rewardAmount}))
    }, [rewardAmount,account.address])
}

export default function StakingUpdate() {
    const dispatch = useDispatch()
    useInitializeStaking()

   useStakingEventListener({
       onStaked(_, amount) {
        dispatch(stakeAction.fulfilled({data: utils.formatEther(amount)}))
        showSuccessToast('Stake successfully!')
       },
    onClaimed(_, amount) {
        dispatch(claimAction.fulfilled({data: utils.formatEther(amount)}))
        showSuccessToast('Claim successfully!')
    },
    onUnstaked(_, amount) {
        dispatch(unstakeAction.fulfilled({data: utils.formatEther(amount)}))
        showSuccessToast('Unstake successfully!')
    },
   })

   return null;
}