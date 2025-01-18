import React from 'react'
import useEventListener from './useEventListener'
import useWindowRef from './useWindowRef'

export default (callback: (event: React.KeyboardEvent) => void) => {
  useEventListener('keydown', callback, useWindowRef())
}
