import { useState, useContext, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Alert } from 'react-native'

import { finishCharging } from 'hooks/actions/chargerActions'
import ChargerContext from 'hooks/contexts/charger'

export default (navigation: any) => {
  const {
    state: { chargingState },
    dispatch: chargerDispatch,
  } = useContext(ChargerContext)

  const [activeTab, setActiveTab] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const { t } = useTranslation()

  const insets = useSafeAreaInsets()

  const changeActiveTab = useCallback(
    (index: number) => {
      setActiveTab(index)
    },
    [setActiveTab],
  )

  const onFinish = useCallback(
    (orderId: number) => {
      Alert.alert(
        t('dropDownAlert.charging.areUSore'),
        '',
        [
          { text: t('no'), onPress: () => {setLoading(false); console.log('Ask me later pressed: ',loading);} },
          {
            text: t('yes'),
            onPress: () =>
              finishCharging(
                {
                  orderId,
                },
                chargerDispatch,
              ).then(() => {
                setLoading(false)
              }),
            style: 'cancel',
          },
        ],
        { cancelable: false },
      )
    },
    [t, finishCharging, chargerDispatch, setLoading, loading],
  )

  return {
    insets,
    t,
    chargingState,
    activeTab,
    setActiveTab,
    changeActiveTab,
    onFinish,
    navigation,
    setLoading,
    loading
  }
}
