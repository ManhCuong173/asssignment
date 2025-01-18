import Box from 'components/Box/Box'
import Input from 'components/Input'
import Text from 'components/Text'
import { useStakingMethods } from 'hooks/useStaking'
import { usePendingReward, useStakableBalance } from 'hooks/useSystemBalance'
import { useWalletBalance } from 'hooks/useWalletBalance'
import { delineate } from 'utils/number'

const StakingPage = () => {
  const balance = useWalletBalance()
  const pendingReward = usePendingReward()
  const stakableToken = useStakableBalance()
  const { handleStakeToken, handleUnstakeToken } = useStakingMethods()

  return (
    <Box px="200px">
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

      <Text>
        Reward: {pendingReward.amount?.toString()} ${pendingReward.token.symbol}
      </Text>

      <Text>
        Stakable Token: {stakableToken.amount.toString()} ${stakableToken.token.symbol}
      </Text>
    </Box>
  )
}

export default StakingPage
