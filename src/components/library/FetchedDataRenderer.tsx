import React, { ReactElement, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Defaults } from 'utils'
import { BaseText } from 'components'

type FetchedDataRendererProp = {
  property: string
  onItemRender: (val: any, index: number) => ReactElement
  fetchData: () => Promise<any>
  updateAlways?: boolean
  data?: any
}

const staticData: any = {}

const FetchedDataRenderer = ({
  property,
  onItemRender,
  fetchData,
  updateAlways = false,
  data,
}: FetchedDataRendererProp): ReactElement => {
  const { t } = useTranslation()
  const [localState, setLocalState] = useState(staticData[property])

  useEffect(() => {
    if (data !== undefined) setLocalState(data ?? [])
    else shouldFetch()
  }, [])

  useEffect(() => {
    setLocalState(data ?? [])
  }, [data])

  const shouldFetch = async (): Promise<void> => {
    if (staticData[property] === undefined || updateAlways) {
      try {
        const dataList = await fetchData()
        setLocalState(dataList)
        staticData[property] = dataList
      } catch (error) {
        Defaults.dropdown?.alertWithType(
          'error',
          t('dropDownAlert.generalError'),
        )
      }
    }
  }

  return (
    <>
      {localState !== undefined ? (
        localState?.length > 0 ? (
          localState.map(onItemRender)
        ) : (
            <BaseText style={{ margin: 32, alignSelf: 'center' }}>
              {t('notFound')}
            </BaseText>
          )
      ) : (
          <BaseText style={{ margin: 32, alignSelf: 'center' }}>
            {t('loading')}
          </BaseText>
        )}
    </>
  )
  // Vobi Todo: if (localState?.length > 0) return localState.map(onItemRender)
  // Vobi Todo: return (
  // Vobi Todo:   <BaseText style={{ margin: 32, alignSelf: 'center' }}> // Vobi Todo: move this as style
  // Vobi Todo:     {t('notFound')}
  // Vobi Todo:   </BaseText>
  // Vobi Todo: )
}

export default FetchedDataRenderer
