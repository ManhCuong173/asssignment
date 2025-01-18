import React from 'react'
import { StyledCard } from './StyledCard'
import { CardProps } from './types'

const Card: React.FC<CardProps> = ({ children, background, ...props }) => {
  return (
    <StyledCard p={['12px', '12px', '24px']} background={background} {...props}>
      {children}
    </StyledCard>
  )
}

export default Card
