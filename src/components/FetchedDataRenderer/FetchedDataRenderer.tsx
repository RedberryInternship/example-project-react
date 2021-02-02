import React from 'react'
import { useTranslation } from 'react-i18next'
import { Defaults } from 'utils'
import BaseText from 'components/BaseText'
import { StyleSheet } from 'react-native'
import { FetchedDataRendererFC } from './types'
import useFetchedDataRenderer from './useFetchedDataRenderer'

const FetchedDataRenderer: FetchedDataRendererFC = (
  {
    updateAlways = false,
    onItemRender,
    fetchData,
    property,
    data,
  },
) => {
  const { t } = useTranslation()
  const {
    shouldFetch,
    localState,
    staticData,
  } = useFetchedDataRenderer(
    {
      updateAlways,
      fetchData,
      property,
      data,
    },
  )
  // Refetch data after logout and login
  if (!Defaults.userDetail && localState?.length > 0) {
    staticData[property] = undefined
  } else if (updateAlways && staticData[property] === undefined && Defaults.userDetail !== null) {
    shouldFetch()
  }

  if (localState === undefined) {
    return <BaseText style={styles.text}>{t('loading')}</BaseText>
  }
  if (!localState?.length) {
    return <BaseText style={styles.text}>{t('notFound')}</BaseText>
  }

  return localState.map(onItemRender)
}

export default FetchedDataRenderer

const styles = StyleSheet.create({
  text: {
    margin: 32,
    alignSelf: 'center',
  },
})
