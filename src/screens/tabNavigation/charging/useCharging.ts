import {useState, useContext, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {useSafeArea} from 'react-native-safe-area-context'
import {Alert} from 'react-native'

import {
  finishCharging,
  chargingState as chargingStateAction,
} from 'hooks/actions/chargerActions'
import {AppContext} from '../../../../App'
import {AppContextType} from 'allTypes'

export default (navigation: any) => {
  const {
    state: {chargingState},
    dispatch,
  }: AppContextType = useContext(AppContext)

  const [activeTab, setActiveTab] = useState<number>(0)

  const {t} = useTranslation()

  const insets = useSafeArea()

  useEffect(() => {
    const timeInterval = setInterval(() => {
      chargingStateAction(dispatch)
    }, 30000) // time interval for per request

    return (): void => {
      clearInterval(timeInterval)
    }
  }, [])

  const changeActiveTab = (index: number) => {
    setActiveTab(index)
  }

  const onFinish = (orderId: number) => {
    Alert.alert(
      t('dropDownAlert.charging.areUSore'),
      '',
      [
        {text: t('no'), onPress: () => console.log('Ask me later pressed')},
        {
          text: t('yes'),
          onPress: () =>
            finishCharging(
              {
                orderId,
              },
              dispatch,
            ),
          style: 'cancel',
        },
      ],
      {cancelable: true},
    )
  }

  return {
    insets,
    t,
    chargingState,
    activeTab,
    setActiveTab,
    changeActiveTab,
    onFinish,
    navigation,
  }
}
