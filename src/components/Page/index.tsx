import Box from 'components/Box/Box'
import { BoxProps } from 'components/Box/types'
import React from 'react'
import { layouts } from 'theme/layout'

const Page: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box px={['12px', '', '24px']} mx="auto" width="100%" maxWidth={layouts.sizeWidth} {...props}>
      {children}
    </Box>
  )
}

export default Page
