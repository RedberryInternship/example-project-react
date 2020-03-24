import React, {ReactElement, useEffect, useState} from 'react'

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'

import {Colors, Defaults, Ajax} from 'utils'
import Imgs from '../../../assets/images'
import {useTranslation} from 'react-i18next'
import {BaseText} from 'components'
import {Charger, Favorite} from 'allTypes'

type FetchedDataRendererProp = {
  property: string
  onItemRender: (val: any, index: number) => ReactElement
  fetchData: () => Promise<any>
  updateAlways?: boolean
  data?: Favorite[] | null
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
          <BaseText style={{margin: 32, alignSelf: 'center'}}>
            {t('notFound')}
          </BaseText>
        )
      ) : (
        <BaseText style={{margin: 32, alignSelf: 'center'}}>
          {t('loading')}
        </BaseText>
      )}
    </>
  )
}

export default FetchedDataRenderer

const styles = StyleSheet.create({
  container: {
    height: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: Colors.primaryBackground.concat('33'),
    borderTopWidth: 1,
  },
  chargerPin: {
    width: 26,
    height: 32,
    resizeMode: 'contain',
  },
  chargerTypeContainer: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  chargerTypeText: {
    color: '#436880',
    marginBottom: 4,
    fontSize: 13,
  },
  chargerCodeText: {
    color: '#111314',
    fontSize: 11,
  },
  goToDetailIcon: {
    width: 12,
    height: 21,
  },
})
