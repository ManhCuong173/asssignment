import { useEffect, useState } from 'react'

const useTryAttempt = (attempt: number, duration: number) => {
  const [isAttempting, setIsAttempting] = useState(false)
  const [attemptTime, setAttemptTime] = useState(0)
  let timer

  const clearAttempt = () => {
    setIsAttempting(false)
    setAttemptTime(0)
    clearTimeout(timer)
  }

  useEffect(() => {
    if (isAttempting && attemptTime < attempt) {
      timer = setTimeout(() => {
        setAttemptTime((prev) => prev + 1)
      }, duration)
    } else if (attemptTime >= attempt) {
      clearAttempt()
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isAttempting, attemptTime, duration])

  const startAttempt = () => {
    setIsAttempting(true)
    setAttemptTime(0)
  }

  return {
    isAttempting,
    attemptTime,
    startAttempt,
    clearAttempt,
    remainingTime: duration - attemptTime,
  }
}

export default useTryAttempt
