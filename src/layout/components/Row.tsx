import Flex from 'components/Box/Flex'
import styled from 'styled-components'

export const RowFixed = styled(Flex)`
  align-items: center;
`
export const RowMiddle = styled(RowFixed)`
  align-items: center;
  flex: 1;
`

export const RowBetween = styled(RowMiddle)`
  justify-content: space-between;
`

export const RowCenter = styled(RowMiddle)`
  justify-content: center;
`

export const AutoRow = styled(RowMiddle)<{ gap?: string; justify?: string }>`
  align-items: flex-start;
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify};
  width: calc(100% + ${({ gap }) => gap} * 2);

  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`
