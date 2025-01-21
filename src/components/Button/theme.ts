import { colors } from 'theme/colors'
import { scales, variants } from './types'

export const styleVariants = {
  [variants.PRIMARY]: {
    background: colors.gradient,
    color: 'text',
  },
  [variants.TEXT]: {
    background: 'transparent',
    color: 'text',

    '&:disabled': {
      background: 'transparent !important',
      borderColor: 'transparent !important',
    },
  },
  [variants.SECONDARY]: {
    backgroundColor: '#1D2533',
    boxShadow: 'none',
    color: 'text',
    ':disabled': {
      backgroundColor: 'transparent',
    },
  },
  [variants.ROUND]: {
    width: '100%',
    border: 0,
    borderRadius: '40px',
    color: 'text',
    background: 'transparent',
  }
}

export const styleScales = {
  [scales.SM]: {
    height: '30px',
  },
  [scales.MD]: {
    height: '46px',
  },
  [scales.LG]: {
    height: '55px',
  },
}
