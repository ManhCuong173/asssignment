import { useEffect, useRef } from 'react'

export const useVariableInitialize = (condition: boolean, callback: () => void, deps: any[] = []) => {
  const hasRun = useRef(false)

  useEffect(() => {
    if (condition && !hasRun.current) {
      callback()
      hasRun.current = true
    }
    return () => {
      hasRun.current = false
    }
  }, [condition, ...deps])
}
