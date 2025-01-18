import { RefObject, useEffect, useRef } from 'react'

function useEventListener(
  eventName: string,
  handler: (event: any) => void,
  element?: RefObject<Window & typeof globalThis>,
  options?: boolean | AddEventListenerOptions,
) {
  // Create a ref that stores handler
  const savedHandler = useRef(handler)

  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    // Define the listening target
    const targetElement: any = element?.current || window
    if (!targetElement || !targetElement.addEventListener) {
      return
    }

    // Create event listener that calls handler function stored in ref
    const eventListener: typeof handler = (event) => savedHandler.current(event)
    targetElement.addEventListener(eventName, eventListener, options)

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element, options])
}

export default useEventListener
