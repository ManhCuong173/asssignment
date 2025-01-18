import React from 'react';
import { ExternalLinkAttribute } from './utils';


interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({
  href,
  external,
  children,
  rel,
  target,
  ...props
}) => {
  const externalProps = external ? ExternalLinkAttribute : {};

  return (
    <a
      href={href}
      {...externalProps}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;