// eslint-disable-next-line no-unused-vars
import {useEffect, useState, useRef, RefObject, useContext} from 'react'

import {Defaults, NavigationActions, Helpers} from 'utils'

import useRegistrationHookStep1 from './useRegistrationStep1'
import useRegistrationHookStep2 from './useRegistrationStep2'
import useRegistrationHookStep3 from './useRegistrationStep3'
import useRegistrationHookStep4 from './useRegistrationStep4'

import {AppContext} from '../../../../App' // Vobi Todo: absolute import context
import {Alert} from 'react-native'

type _This = {
  userRegistrationState: number
}

let userRegistrationState = 0

export default (navigation: any) => {
  const flatListRef: any = useRef(null)
  const KeyboardAwareScrollViewRef: any = useRef(null)

  const newPasswordRef: any = useRef(null)
  const repeatPasswordRef: any = useRef(null)

  const {dispatch} = useContext(AppContext)

  const [activePage, setActivePage] = useState<number>(0)

  const regStep1 = useRegistrationHookStep1(setActivePage)
  const regStep2 = useRegistrationHookStep2(setActivePage)
  const regStep3 = useRegistrationHookStep3(
    setActivePage,
    regStep1.getValues,
    regStep2.getValues,
    dispatch,
  )
  //TODO
  const regStep4 = useRegistrationHookStep4(setActivePage)

  useEffect(() => {
    userRegistrationState = Math.max(activePage, userRegistrationState)
    KeyboardAwareScrollViewRef.current.scrollToPosition(0, 0)
    setTimeout(() => paginationClickHandler(activePage), 250)

    console.log(activePage, regStep1, regStep2, regStep3, 'activePage')
  }, [activePage])

  const paginationClickHandler = async (index: number) => {
    if (index > userRegistrationState) return
    else if (userRegistrationState === activePage) {
      //do nothing
    } else if (!(await validateAccordingActivePage())) return

    flatListRef.current.scrollToIndex({index, animated: true})
    setActivePage(index)
  }

  const validateAccordingActivePage = async () => {
    switch (activePage) {
      case 0:
        return await regStep1.triggerValidation()
      case 1:
        return await regStep2.triggerValidation()
      case 2:
        return await regStep3.triggerValidation()
      case 3:
        return true //TODO: no card service
      default:
        return false
    }
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
    navigation.navigate('Home')
  }

  const registrationStepHandler: (() => Promise<void>)[] = [
    regStep1.handleSubmit(regStep1.buttonClickHandler),
    regStep2.handleSubmit(regStep2.buttonClickHandler),
    regStep3.handleSubmit(regStep3.buttonClickHandler),
    // regStep4.handleSubmit(regStep4.buttonClickHandler)
  ]

  return {
    flatListRef,
    paginationClickHandler,
    KeyboardAwareScrollViewRef,
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
