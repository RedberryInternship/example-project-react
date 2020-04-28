import {useState, useRef, useContext} from 'react'
import {useTranslation} from 'react-i18next'
import {useSafeArea} from 'react-native-safe-area-context'
import {Alert} from 'react-native'

import {finishCharging} from 'hooks/actions/chargerActions'
import {AppContext} from '../../../../App'
import {AppContextType} from 'allTypes'

export default (navigation: any) => {
  const {state, dispatch}: AppContextType = useContext(AppContext)

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
          onPress: () =>
            finishCharging(
              {
                connectorTypeId: 2, //TODO: get connectorTypeId from charging state
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
    _this,
    t,
    activeTab,
    setActiveTab,
    changeActiveTab,
    onFinish,
    navigation,
  }
}
