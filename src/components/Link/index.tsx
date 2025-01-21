import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { ExternalLinkAttribute } from './utils'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  external?: boolean
}

const Link: React.FC<LinkProps> = ({ href, external, children, rel, target, ...props }) => {
  const externalProps = external ? ExternalLinkAttribute : {}
  return (
    <StyledLink to={href} {...externalProps} {...props}>
      {children}
    </StyledLink>
  )
}

const StyledLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.light};
  font-size: 14px;
  text-decoration: none;

  &:hover {
    * {
      fill: ${({ theme }) => theme.colors.light};
      opacity: 0.8;
    }
  }
`

export default Link
