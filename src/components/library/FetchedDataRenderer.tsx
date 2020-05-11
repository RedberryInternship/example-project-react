import React, {ReactElement, useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'

import {Defaults} from 'utils'
import {BaseText} from 'components'
import {StyleSheet} from 'react-native'

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
  const {t} = useTranslation()
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
        Defaults.dropdown?.alertWithType(
          'error',
          t('dropDownAlert.generalError'),
        )
        staticData[property] = []
        setLocalState([])
      }
    }
  }

  // Vobi Todo: rewrite like this
  // if (!localState) return <BaseText style={styles.text}>{t('loading')}</BaseText>
  // if (!(localState?.length)) return <BaseText style={styles.text}>{t('notFound')}</BaseText>
  // return localState.map(onItemRender)

  return (
    <>
      {localState !== undefined ? (
        localState?.length > 0 ? (
          localState.map(onItemRender)
        ) : (
          <BaseText style={styles.text}>{t('notFound')}</BaseText>
        )
      ) : (
        <BaseText style={styles.text}>{t('loading')}</BaseText>
      )}
    </>
  )
}

export default FetchedDataRenderer

const styles = StyleSheet.create({
  text: {
    margin: 32,
    alignSelf: 'center',
  },
})
