import Flex from 'components/Box/Flex'
import Button from 'components/Button'
import Input from 'components/Input'
import { StyledInputContainer } from 'components/Input/Input'
import { ValidationError } from 'components/Input/validator'
import Page from 'components/Page'
import Text from 'components/Text'
import { FormValidator } from 'config/formValidator'
import { useNativeBalance } from 'hooks/useBalance'
import useForm from 'hooks/useForm'
import { useStakeDuration, useStakeMethods } from 'hooks/useStake'
import { useWeb3React } from 'hooks/useWeb3React'
import Column from 'layout/components/Column'
import { RowBetween } from 'layout/components/Row'
import {
  useIsClaiming,
  useIstaking,
  useIsUnstaking,
  useStakingAmountState,
  useStakingPendingRewardAmountState,
  useStakingRewardAmountState,
} from 'state/stake/states'
import styled from 'styled-components'
import { delineate } from 'utils/number'
import { timeSince } from 'utils/time'

const InputAmountErrors = {
  [ValidationError.GreaterThanEqual]: 'Amount must be lesser than or equal your balance',
}

const StakingPage = () => {
  const { account } = useWeb3React()
  const balance = useNativeBalance()
  const { handleStakeToken, handleUnstakeToken, handleClaimReward } = useStakeMethods()
  const durationInDayObject = useStakeDuration()
  const [time, unit] = durationInDayObject ? timeSince(durationInDayObject.getTime()) : [null, null]

  const stakingAmountState = useStakingAmountState()
  const stakingRewardAmountState = useStakingRewardAmountState()
  const stakingPendingRewardAmountState = useStakingPendingRewardAmountState()

  const isStaking = useIstaking()
  const isUnstaking = useIsUnstaking()
  const isClaiming = useIsClaiming()

  const { states, controls, isValid } = useForm({
    inputAmount: {
      value: '',
      validateOnChange: true,
    },
  })

  return (
    <StyledPage>
      <Column style={{ gap: '20px' }}>
        <Column style={{ gap: '6px' }}>
          <Flex>
            <Text color="light" fontSize={'16px'}>
              Wallet Address:{' '}
              <Text as="span" color="light" bold ml="4px" fontSize={'inherit'}>
                {account.address}
              </Text>
            </Text>
          </Flex>
          <Flex>
            <Text color="light" fontSize={'16px'}>
              Balance:{' '}
              <Text as="span" color="light" bold ml="4px" fontSize={'inherit'} letterSpacing={0.28}>
                {delineate(balance.amount.toString(), 5)} ${balance?.token?.symbol}
              </Text>
            </Text>
          </Flex>
          <Flex>
            <Text color="light" fontSize={'16px'}>
              Reward Balance:{' '}
              <Text as="span" color="light" bold ml="4px" fontSize={'inherit'} letterSpacing={0.28}>
                {delineate(stakingRewardAmountState.amount.toString(), 5)} ${stakingRewardAmountState.token.symbol}
              </Text>
            </Text>
          </Flex>
        </Column>
        <Flex alignItems="center" style={{ gap: '6px' }}>
          <StyledInputContainer $error={!!states.inputAmount.errors?.length} width={320}>
            <Input
              {...controls.inputAmount}
              validators={[FormValidator.gte(balance.amount)]}
              placeholder="Enter amount"
              inputMode="decimal"
              width={100}
            />
          </StyledInputContainer>
          <Button
            onClick={() => {
              if (isValid) {
                handleStakeToken(states.inputAmount.value)
                controls.inputAmount.onValueChanged('')
              }
            }}
            width={120}
            height={40}
            disabled={!isValid || !controls.inputAmount.value || isStaking}
          >
            <Text fontSize="14px" bold color="light">
              {isStaking ? 'Loading...' : 'Stake'}
            </Text>
          </Button>
        </Flex>
        {!!states.inputAmount.errors?.length && (
          <Text color="danger" fontSize="14px">
            {InputAmountErrors[states.inputAmount.errors[0]]}
          </Text>
        )}

        <Column style={{ gap: '0px' }}>
          <RowBetween flexGrow={1}>
            <Text color="light" fontSize={'16px'}>
              Staked Amount:{' '}
              <Text as="span" color="light" bold ml="4px" fontSize={'inherit'}>
                {stakingAmountState.amount.toString()} ${stakingAmountState.token.symbol}
              </Text>
            </Text>
            <Button
              onClick={() => {
                handleUnstakeToken()
              }}
              width={120}
              height={40}
              disabled={stakingAmountState.amount.lte(0) || isUnstaking}
            >
              <Text fontSize="14px" bold color="light">
                {isUnstaking ? 'Loading...' : 'Unstake'}
              </Text>
            </Button>{' '}
          </RowBetween>
          {time && (
            <Text color="light" fontSize={'14px'}>
              Duration{' '}
              <Text as="span" color="light" bold ml="4px" fontSize={'inherit'}>
                {time} {unit}
              </Text>
            </Text>
          )}
        </Column>

        <Column style={{ gap: '10px' }}>
          <Column style={{ gap: '4px' }}>
            <Text color="light" fontSize={'16px'}>
              Pending Reward Balance:{' '}
            </Text>
            <Text as="span" color="light" bold ml="4px" fontSize={'16px'}>
              {stakingPendingRewardAmountState.amount?.toString()} ${stakingPendingRewardAmountState.token.symbol}
            </Text>
          </Column>
          <Button
            onClick={() => handleClaimReward()}
            width={'100%'}
            height={40}
            disabled={stakingPendingRewardAmountState.amount.lte(0) || isClaiming}
          >
            <Text fontSize="14px" bold color="light">
              {isClaiming ? 'Loading...' : 'Claim'}
            </Text>
          </Button>
        </Column>
      </Column>
    </StyledPage>
  )
}

const StyledPage = styled(Page)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default StakingPage
