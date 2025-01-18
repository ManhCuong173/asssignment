import Box from 'components/Box/Box'
import { BoxProps } from 'components/Box/types'
import { forwardRef } from 'react'
import styled from 'styled-components'
import { base, KeyFramesEnum } from 'theme/base'


const StyledContainer = styled(Box)<{ openType: KeyFramesEnum; duration: number; delay: number }>`
  animation: wait ${({ delay }) => `${delay}s`},
    ${({ openType }) => base.keyframes[openType]} ${({ duration }) => `${duration}s`} ${({ delay }) => `${delay}s`};
  /* animation-delay: ${({ delay }) => `${delay}s`}; */

  @keyframes wait {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
`

export const OpenEffect = forwardRef<
  HTMLDivElement,
  { openType?: KeyFramesEnum; duration?: number; delay?: number } & BoxProps
>(({ children, openType = KeyFramesEnum.fade, duration = 0.3, delay = 0, ...props }, ref) => {
  return (
    <StyledContainer ref={ref} openType={openType} duration={duration} delay={delay} {...props}>
      {children}
    </StyledContainer>
  )
})

export default OpenEffect
