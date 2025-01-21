import Grid from 'components/Box/Grid'
import Button from 'components/Button'
import Link from 'components/Link'
import Text from 'components/Text'
import { AssignmentAppRoutes } from 'constants/routes'
import { useWeb3React } from 'hooks/useWeb3React'
import { AppRoutes } from 'pages/EntryPoints'
import React, { useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { visibility } from 'theme/visibility'
import { useDisconnect } from 'wagmi'
import { RowBetween, RowFixed } from './Row'

const Topbar: React.FC = () => {
  const { disconnect } = useDisconnect()
  const { account } = useWeb3React()
  const refElement = useRef(null)
  const navigate = useNavigate()
  const renderMenu = useMemo(
    () => (
      <Grid
        display={'grid'}
        ml="40px"
        alignItems="center"
        gridTemplateColumns={`repeat(${Object.values(AppRoutes).length}, 1fr)`}
        gridGap="20px"
        position={'relative'}
        zIndex={visibility.zIndex['highest']}
      >
        {AppRoutes.filter((router) =>
          (router.mustAuthored && account.address) || !router.mustAuthored ? router : null,
        ).map((route) => {
          return (
            <StyledActiveLink key={`navigation-${route.name}`} href={route.path}>
              <Text fontSize="18px" bold>
                {route.name}
              </Text>
            </StyledActiveLink>
          )
        })}
      </Grid>
    ),
    [account],
  )

  return (
    <StyledTopbarContainer ref={refElement} p={['12px']}>
      <RowFixed>{renderMenu}</RowFixed>
      {account?.address && (
        <Button
          onClick={() => {
            disconnect(
              {},
              {
                onSuccess() {
                  navigate(AssignmentAppRoutes.home)
                },
              },
            )
          }}
          width={120}
          height={36}
        >
          <Text fontSize="14px" bold color="light">
            Logout
          </Text>
        </Button>
      )}
    </StyledTopbarContainer>
  )
}

const StyledTopbarContainer = styled(RowBetween)`
  width: 100%;
  height: ${({ theme }) => {
    return theme.layout.topbarHeight
  }}px;
  top: 0;
  backdrop-filter: blur(4px);
  background: ${({ theme }) => theme.colors.backgroundAlt};
  box-sizing: border-box;
`

const StyledActiveLink = styled(Link)`
  &.active {
    color: ${({ theme }) => theme.colors.active};
    font-weight: 600;
  }
`

export default Topbar
