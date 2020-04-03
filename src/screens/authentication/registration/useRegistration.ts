// eslint-disable-next-line no-unused-vars
import {useEffect, useState, useRef, RefObject} from 'react'
import {Animated} from 'react-native'
import {useTranslation} from 'react-i18next'

import {Defaults} from 'utils'

import useRegistrationHookStep1 from './useRegistrationStep1'
import useRegistrationHookStep2 from './useRegistrationStep2'
import useRegistrationHookStep3 from './useRegistrationStep3'
import useRegistrationHookStep4 from './useRegistrationStep4'

type _This = {
  codeReceiveAnimation: Animated.Value
  userRegistrationState: number
}

const CodeInputWidth = 128

export default (navigation: any, dispatch: any) => {
  const flatListRef: any = useRef(null)
  const KeyboardAwareScrollViewRef: any = useRef(null)

  const [loading, setLoading] = useState<boolean>(true)
  const [activePage, setActivePage] = useState<number>(0)

  const newPasswordRef: any = useRef(null)
  const repeatPasswordRef: any = useRef(null)

  const {t} = useTranslation()

  const _this: RefObject<_This> = useRef({
    userRegistrationState: 0,
    codeReceiveAnimation: new Animated.Value(CodeInputWidth),
  })

  const regStep1 = useRegistrationHookStep1(setActivePage, t)
  const regStep2 = useRegistrationHookStep2(setActivePage, t)
  const regStep3 = useRegistrationHookStep3(
    setActivePage,
    t,
    regStep1,
    regStep2,
    dispatch,
  )
  const regStep4 = useRegistrationHookStep4(setActivePage, t)

  useEffect(() => {
    _this.current!.userRegistrationState = Math.max(
      activePage,
      _this.current!.userRegistrationState,
    )
    KeyboardAwareScrollViewRef.current.scrollToPosition(0, 0)
    setTimeout(() => paginationClickHandler(activePage), 250)

    console.log(
      activePage,
      regStep3.password.current,
      regStep1.phoneRef.current,
      'activePage',
    )

    switch (activePage) {
      case 0:
        regStep1.phoneRef.current?.focus()
        break
      case 1:
        regStep2.name.current?.focus()
        break
      case 2:
        regStep3.password.current?.focus()
        break
      case 3:
        break

      default:
        break
    }
  }, [activePage])

  const paginationClickHandler = (index: number) => {
    if (index > _this.current!.userRegistrationState) return

    flatListRef.current.scrollToIndex({index, animated: true})
    setActivePage(index)
  }

  const headerRightClick = () => {
    // show modal
    Defaults.modal.current &&
      Defaults.modal.current.customUpdate(true, {
        type: 1,
        onCloseClick: addCardSkip,
      })
  }

  const addCardSkip = (): void => {
    navigation.navigate('MainDrawer')
  }

  const registrationStepHandler = (): void => {
    // if (activePage === allPageLength - 1) {
    //   Defaults.modal.current &&
    //     Defaults.modal.current.customUpdate(true, {type: 2})
    //   return
    // }

    // validate input and continue
    switch (activePage) {
      case 0:
        regStep1.buttonClickHandler()
        break
      case 1:
        regStep2.buttonClickHandler()
        break
      case 2:
        regStep3.buttonClickHandler()
        break
      case 3:
        Defaults.dropdown?.alertWithType(
          'error',
          t('dropDownAlert.registration.needsCardAddOrPleaseSkip'),
        )
        regStep4.buttonClickHandler()
        break

      default:
        break
    }
  }

  return {
    loading,
    setLoading,
    _this,
    flatListRef,
    paginationClickHandler,
    KeyboardAwareScrollViewRef,
    t,
    newPasswordRef,
    repeatPasswordRef,
    activePage,
    headerRightClick,
    registrationStepHandler,
    regStep1,
    regStep2,
    regStep3,
  }
}
