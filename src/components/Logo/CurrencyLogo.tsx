import Image from 'components/Image';
import { Token } from 'config/types/token'
import React from 'react'

const CurrencyLogo = ({ token, size = 32, style }: { token?: Token; size?: number; style?: React.CSSProperties }) => {
  return <Image width={size} height={size} src={token.logo} alt={`${token?.symbol ?? 'token'} logo`} style={style} />
  
}
export default CurrencyLogo
