import {useState, useRef} from 'react'
import {useTranslation} from 'react-i18next'
import {useSafeArea} from 'react-native-safe-area-context'
import {Defaults} from 'utils'
import {Alert} from 'react-native'

export default (navigation: any) => {
  const [loading, SetLoading] = useState<boolean>(true)
  const [activeTab, SetActiveTab] = useState<number>(0)

  const _this: React.RefObject<any> = useRef()

  const {t} = useTranslation()

  const insets = useSafeArea()

  const changeActiveTab = (index: number) => {
    SetActiveTab(index)
  }

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
      onCloseClick: () => navigation.navigate('MainDrawer'),
    })
  }

  return {
    insets,
    _this,
    t,
    activeTab,
    SetActiveTab,
    changeActiveTab,
    onFinish,
    navigation,
  }
}
