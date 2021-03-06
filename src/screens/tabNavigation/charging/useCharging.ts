import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Alert } from 'react-native'
import { finishChargingProcess } from 'state/actions/chargingProcessActions'

export default (navigation: any) => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const { t } = useTranslation()

  const insets = useSafeAreaInsets()

  /**
   * Handle finish charging button click.
   */
  const onFinish = useCallback(
    (orderId: number) => {
      Alert.alert(
        t('dropDownAlert.charging.areUSore'),
        '',
        [
          {
            text: t('no'),
            onPress: () => {
              setLoading(false);
            },
          },
          {
            text: t('yes'),
            onPress: () => {
              dispatch(finishChargingProcess(orderId))
              setLoading(false)
            },
            style: 'cancel',
          },
        ],
        { cancelable: false },
      )
    },
    [loading],
  )

  return {
    setActiveTab,
    setLoading,
    navigation,
    activeTab,
    onFinish,
    loading,
    insets,
    t,
  }
}
