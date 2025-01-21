import { useConnectModal } from '@rainbow-me/rainbowkit'
import Button from 'components/Button'
import Page from 'components/Page'
import Text from 'components/Text'
import { AssignmentAppRoutes } from 'constants/routes'
import { useWeb3React } from 'hooks/useWeb3React'
import { ColumnCenter } from 'layout/components/Column'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { openConnectModal } = useConnectModal()
  const { account } = useWeb3React()
  const navigate = useNavigate()

  useEffect(() => {
    if (account.address) navigate(AssignmentAppRoutes.staking)
  }, [account?.address])

  return (
    <Page>
      <ColumnCenter flexGrow={1}>
        <Button onClick={() => openConnectModal()} width={260}>
          <Text color="light" fontWeight={600}>
            Connect Wallet
          </Text>
        </Button>
      </ColumnCenter>
    </Page>
  )
}

export default Home
