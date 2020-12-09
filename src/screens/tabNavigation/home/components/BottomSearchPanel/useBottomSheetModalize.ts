import { useEffect, useRef } from 'react'
import {

  BackHandler,
  TextInput,
} from 'react-native'

let inputTextHolder = ''

const useBottomSheetModalize = (textHandler: (text: string) => void) => {
  const inputRef = useRef<TextInput>(null)
  const backHandlerRef = useRef<any>(null)

  /**
   * Close modal handler.
   */
  const closeClick = (): void => {
    if (inputTextHolder !== '') {
      textHandler('')
      inputTextHolder = ''
      inputRef.current?.clear()
    }
  }

  /**
   * Modal search input text handler.
   */
  const onTextChange = (text: string): void => {
    inputTextHolder = text
    textHandler(text)
  }

  useEffect(() => {
    /**
     * Handle android back button.
     */

    const handleAndroidBack = () => false

    backHandlerRef.current = BackHandler.addEventListener(
      'hardwareBackPress',
      handleAndroidBack,
    )
  }, [])

  return {
    onTextChange,
    closeClick,
    inputRef,
  }
}

export default useBottomSheetModalize
