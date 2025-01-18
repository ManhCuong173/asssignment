import React from 'react'
import styled, { keyframes } from 'styled-components'
import { layout, space } from 'styled-system'
import { animation as ANIMATION, SkeletonProps, variant as VARIANT } from './types'

const waves = keyframes`
   from {
        left: -150px;
    }
    to   {
        left: 100%;
    }
`

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`

const Root = styled.div<SkeletonProps>`
  min-height: 20px;
  display: block;
  background-color: ${({ theme }) => theme.colors.backgroundDisabled};

  ${layout}
  ${space}
`

const Pulse = styled(Root)`
  animation: ${pulse} 2s infinite ease-out;
  transform: translate3d(0, 0, 0);
`

const Waves = styled(Root)`
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  &:before {
    content: '';
    position: absolute;
    background-image: linear-gradient(90deg, transparent, rgb(67 80 98 / 50%), transparent);
    top: 0;
    left: -150px;
    height: 100%;
    width: 150px;
    animation: ${waves} 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
`

const Skeleton: React.FC<SkeletonProps> = ({ variant = VARIANT.RECT, animation = ANIMATION.WAVES, ...props }) => {
  if (animation === ANIMATION.WAVES) {
    return <Waves variant={variant} {...props} />
  }

  return <Pulse variant={variant} {...props} />
}

export default Skeleton
