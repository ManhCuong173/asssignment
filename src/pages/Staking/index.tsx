import Box from 'components/Box/Box'
import Input from 'components/Input'
import Text from 'components/Text'
import { AddressTokenByChain } from 'config/tokens'
import { ChainIdEnum } from 'config/types/network'
import { useNativeBalance, useTokenBalance } from 'hooks/useBalance'
import { ueStakeMethods, useStakeDuration } from 'hooks/useStake'
import { useStakingEventListener } from 'hooks/useStakeEventListener'
import { usePendingReward, useStakeBalance } from 'hooks/useSystemBalance'
import { useWeb3React } from 'hooks/useWeb3React'
import { delineate } from 'utils/number'
import { useDisconnect } from 'wagmi'

const StakingPage = () => {
  const balance = useNativeBalance()
  const rewardBalance = useTokenBalance(AddressTokenByChain[ChainIdEnum.SEPOLIA]['REWARD'].address)

  const { claimableRewardBalance, pendingRewardBalance } = usePendingReward()
  const stakeBalance = useStakeBalance()
  const { handleStakeToken, handleUnstakeToken, handleClaimReward } = ueStakeMethods()
  const { account } = useWeb3React()
  const { disconnect } = useDisconnect()
  useStakeDuration()

  useStakingEventListener({
    onStaked(userAddress, amount) {
      console.log(amount.toString())
      console.log(userAddress)
    },
    onUnstaked(userAddress, amount) {
      console.log(amount.toString())
      console.log(userAddress)
    },
    onClaimed(userAddress, amount) {
      console.log(amount.toString())
    },
  })
  console.log('run')

  return (
    <Box px="200px">
      <Text>Account: {account.address}</Text>
      <Text>Balance: {delineate(balance.toString(), 5)}</Text>
      <Input placeholder="Enter amount" width={100} />
      <button
        onClick={() => {
          handleStakeToken('0.0001')
        }}
      >
        Staking
      </button>
      <button
        onClick={() => {
          handleUnstakeToken()
        }}
      >
        Unstake
      </button>

      <button
        onClick={() => {
          handleClaimReward()
        }}
      >
        Claim
      </button>

      <Text>
        Pending Reward: {pendingRewardBalance.amount?.toString()} ${pendingRewardBalance.token.symbol}
      </Text>
      <Text>
        Claimable Reward: {claimableRewardBalance.amount?.toString()} ${claimableRewardBalance.token.symbol}
      </Text>

      <Text>
        Stakable Token: {stakeBalance.amount.toString()} ${stakeBalance.token.symbol}
      </Text>

      <Text>Reward token {rewardBalance.toString()}</Text>

      <button
        onClick={() => {
          disconnect()
        }}
      >
        Logout
      </button>
    </Box>
  )
}

export default StakingPage
