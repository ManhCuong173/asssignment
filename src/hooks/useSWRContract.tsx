import { FetchStatus } from 'config'
import { Middleware } from 'swr'
import { BlockingData, KeyedMutator } from 'swr/_internal'

declare module 'swr' {
    interface SWRResponse<Data = any, Error = any, Config = any> {
      data: BlockingData<Data, Config> extends true ? Data : Data | undefined
      error: Error
      mutate: KeyedMutator<Data>
      isValidating: boolean
      /**
       * @Note: Add customization status for fetching Data 
       */
      status: FetchStatus
    }
  }

export const fetchStatusMiddleware: Middleware = (useSWRNext) => {
  return (key, fetcher, config) => {
    const swr = useSWRNext(key, fetcher, config)
    let status = FetchStatus.Idle

    if (!swr.isValidating && !swr.error && !swr.data) {
      status = FetchStatus.Idle
    } else if (swr.isValidating && !swr.error && !swr.data) {
      status = FetchStatus.Fetching
    } else if (swr.data) {
      status = FetchStatus.Fetched
    } else if (swr.error && !swr.data) {
      status = FetchStatus.Failed
    }

    return {
      status,
      ...swr,
    }
  }
}
