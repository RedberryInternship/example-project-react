import {
  useCallback,
  useEffect,
  useState,
  useRef,
} from 'react'
import { BackHandler, Keyboard } from 'react-native'
import { useDispatch } from 'react-redux'
import { refreshUserData } from 'state/actions/userActions'
import defaults from 'utils/defaults'
import useRegistrationHookStep1 from './useRegistrationStep1'
import useRegistrationHookStep2 from './useRegistrationStep2'
import useRegistrationHookStep3 from './useRegistrationStep3'

let userRegistrationState = 0

/**
 * Registration hook.
 */
export default (navigation: any) => {
  const flatListRef: any = useRef(null)
  const backHandlerRef: any = useRef(null)
  const KeyboardAwareScrollViewRef: any = useRef(null)
  const dispatch = useDispatch()
  const newPasswordRef: any = useRef(null)
  const repeatPasswordRef: any = useRef(null)

  const [activePage, setActivePage] = useState<number>(0)

  const regStep1 = useRegistrationHookStep1(setActivePage)
  const regStep2 = useRegistrationHookStep2(setActivePage)
  const regStep3 = useRegistrationHookStep3(
    setActivePage,
    regStep1.getValues,
    regStep2.getValues,
  )

  useEffect(() => {
    userRegistrationState = Math.max(activePage, userRegistrationState)
    KeyboardAwareScrollViewRef.current.scrollToPosition(0, 0)
    Keyboard.dismiss()
    setTimeout(() => paginationClickHandler(activePage), 250)
  }, [activePage])


  /**
   * Pagination controller.
   */
  const paginationClickHandler = async (index: number) => {
    if (index > userRegistrationState) {
      return
    }

    if (userRegistrationState !== activePage) {
      const validationResult = await validateAccordingActivePage()
      if (!validationResult) {
        return
      }
    }

    flatListRef.current.scrollToIndex({ index, animated: true })
    setActivePage(index)
  }

  /**
   * Make active page validation.
   */
  const validateAccordingActivePage = () => {
    switch (activePage) {
      case 0:
        return regStep1.triggerValidation()
      case 1:
        return regStep2.triggerValidation()
      case 2:
        return regStep3.triggerValidation()
      case 3:
        return true // TODO: no card service
      default:
        return false
    }
  }

  /**
   * Assign skipping credit card addition.
   */
  const headerRightClick = () => {
    if (defaults.modal?.current) {
      defaults.modal?.current.customUpdate(true,
        {
          type: 1,
          onCloseClick: addCardSkip,
        }
      )
    }
  }

  /**
   * Skip credit card addition.
   */
  const addCardSkip = (): void => {
    navigation.navigate('Home')
  }

  /**
   * Registration steps validation array.
   */
  const registrationStepHandler: (() => Promise<void>)[] = [
    regStep1.handleSubmit(regStep1.buttonClickHandler),
    regStep2.handleSubmit(regStep2.buttonClickHandler),
    regStep3.handleSubmit(regStep3.buttonClickHandler),
  ]

  /**
   * Go back action.
   */
  const backButtonClick = useCallback(() => {
    if (activePage) {
      paginationClickHandler(activePage - 1)
    } else {
      navigation.navigate('Auth')
    }

    return true
  }, [activePage, paginationClickHandler])

  useEffect(() => {
    backHandlerRef.current = BackHandler.addEventListener(
      'hardwareBackPress',
      backButtonClick,
    )
    return () => {
      backHandlerRef.current.remove()
    }
  }, [backButtonClick])

  /**
   * Upon successfully adding credit card,
   * refresh user data and go to home page.
   */
  const onCardAddSuccess = () => {
    dispatch(refreshUserData())
    headerRightClick()
  }

  return {
    KeyboardAwareScrollViewRef,
    registrationStepHandler,
    paginationClickHandler,
    repeatPasswordRef,
    headerRightClick,
    onCardAddSuccess,
    backButtonClick,
    newPasswordRef,
    flatListRef,
    activePage,
    regStep1,
    regStep2,
    regStep3,
  }
}
