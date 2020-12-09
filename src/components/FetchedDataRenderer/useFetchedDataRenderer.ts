import { useState, useEffect } from 'react'
import { remoteLogger, DisplayDropdownWithError } from 'helpers/inform'
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

  useEffect(() => {
    if (data !== undefined) setLocalState(data ?? [])
    else shouldFetch()
  }, [])

  useEffect(() => {
    if (data) setLocalState(data ?? [])
  }, [data])

  const shouldFetch = async (): Promise<void> => {
    if (staticData[property] === undefined || updateAlways) {
      try {
        const dataList = await fetchData()
        setLocalState(dataList)
        staticData[property] = dataList
      } catch (error) {
        remoteLogger(error)
        DisplayDropdownWithError()
        staticData[property] = []
        setLocalState([])
      }
    }
  }

  return {
    shouldFetch,
    localState,
    staticData,
  }
}

export default useFetchedDataRenderer
