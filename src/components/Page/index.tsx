import Box from 'components/Box/Box'
import { BoxProps } from 'components/Box/types'
import React from 'react'
import { layouts } from 'theme/layout'

const Page: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box width="100%" maxWidth={layouts.sizeWidth} {...props}>
      {children}
    </Box>
  )
}

export default Page
