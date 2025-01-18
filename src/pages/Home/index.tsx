import { useConnectModal } from '@rainbow-me/rainbowkit'
import Box from "components/Box/Box"
import { Routes } from 'constants/routes'
import { useWeb3React } from 'hooks/useWeb3React'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {

    const navigate = useNavigate()
    const {openConnectModal} = useConnectModal()
    const {account: {address = ''}} = useWeb3React()

    useEffect(() => {
        console.log(address)
        if(address)
             navigate(Routes.staking)
    }, [address])
    
    return <Box >
        <button onClick={() => {
            openConnectModal()
        }}>Connect wallet</button>
    </Box>
}

export default Home