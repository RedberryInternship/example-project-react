import {useState, useRef} from 'react'
import {useTranslation} from 'react-i18next'
import {useSafeArea} from 'react-native-safe-area-context'
import {Alert} from 'react-native'

import {Defaults} from 'utils'

export default (navigation: any) => {
  const [activeTab, setActiveTab] = useState<number>(0)

  const _this: React.RefObject<any> = useRef()

  const {t} = useTranslation()

  const insets = useSafeArea()

  const changeActiveTab = (index: number) => {
    setActiveTab(index)
  } // Vobi Todo: this does same as setActiveTab

  const onFinish = () => {
    Alert.alert(
      t('dropDownAlert.charging.areUSore'),
      '',
      [
        {text: t('no'), onPress: () => console.log('Ask me later pressed')},
        {
          text: t('yes'),
          onPress: showModal,
          style: 'cancel',
        },
      ],
      {cancelable: true},
    )
  }

  const showModal = () => {
    return Defaults.modal.current?.customUpdate(true, {
      type: 3,
      subType: 1,
      data: {
        title: 'popup.thankYou',
        description: 'popup.automobileChargingFinished',
        bottomDescription: 'popup.finishedChargingOfAutomobile',
        price: 22,
      },
      onCloseClick: () => navigation.navigate('Home'),
    })
  }

  return {
    insets,
    _this,
    t,
    activeTab,
    setActiveTab,
    changeActiveTab,
    onFinish,
    navigation,
  }
}
