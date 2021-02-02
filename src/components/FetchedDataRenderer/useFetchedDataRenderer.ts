import { useState, useEffect, useCallback } from 'react'
import { remoteLogger } from 'utils/inform'
import { UseFetchedDataRendererProps } from './types'

const staticData: any = {}

const useFetchedDataRenderer = (
  {
    data,
    property,
    fetchData,
    updateAlways,
  }: UseFetchedDataRendererProps,
) => {
  const [localState, setLocalState] = useState(staticData[property])

  const shouldFetch = useCallback(async (): Promise<void> => {
    if (staticData[property] === undefined || updateAlways) {
      try {
        const dataList = await fetchData()
        setLocalState(dataList)
        staticData[property] = dataList
      } catch (error) {
        remoteLogger(error)
        staticData[property] = []
        setLocalState([])
      }
    }
  }, [fetchData, property, updateAlways])

  useEffect(() => {
    if (data !== undefined) setLocalState(data ?? [])
    else shouldFetch()
  }, [data, shouldFetch])

  useEffect(() => {
    if (data) setLocalState(data ?? [])
  }, [data])

  return {
    shouldFetch,
    localState,
    staticData,
  }
}

export default useFetchedDataRenderer
