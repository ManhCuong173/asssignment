import { ConnectButton } from '@rainbow-me/rainbowkit'
import Box from 'components/Box/Box'
import { AssignmentAppRoutes } from 'constants/routes'
import { useWeb3React } from 'hooks/useWeb3React'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const {
    account: { address = '' },
  } = useWeb3React()

  useEffect(() => {
    console.log(address)
    if (address) navigate(AssignmentAppRoutes.staking)
  }, [address])

  return (
    <Box>
      <ConnectButton />
    </Box>
  )
}

export default Home
