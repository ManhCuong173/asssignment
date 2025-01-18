import Grid from 'components/Box/Grid'
import { AppRoutes } from 'pages/EntryPoints'
import React, { useMemo, useRef } from 'react'
import styled from 'styled-components'
import { RowFixed, RowMiddle } from './Row'

const Topbar: React.FC = () => {
  const refElement = useRef(null)
  const renderMenu = useMemo(
    () => (
      <Grid
        display={['none !important', '', '', 'grid !important']}
        ml="40px"
        alignItems="center"
        gridTemplateColumns={`repeat(${Object.values(AppRoutes).length}, 1fr)`}
        gridGap="24px"
      >
        {AppRoutes.map((route) => {

          return (
            <a key={`navigation-${route.name}`} href={route.path}>
              {route.name}
            </a>
          )
        })}
      </Grid>
    ),
    [],
  )

  return (
      <StyledTopbarContainer ref={refElement} p={['8px 12px', '', '', '12px 24px']}>
        <RowFixed>
            {renderMenu}
        </RowFixed>
        <RowMiddle justifyContent="flex-end">
        </RowMiddle>
      </StyledTopbarContainer>
  )
}

const StyledTopbarContainer = styled(Grid)`
  width: 100%;
  height: ${({ theme }) => {
    return theme.layout.topbarHeight
  }}px;
  grid-template-columns: auto auto;
  top: 0;
  z-index: ${({ theme }) => theme.visibility.zIndex['hight']};

`

export default Topbar
