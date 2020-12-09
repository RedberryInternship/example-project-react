import {
  useImperativeHandle,
  MutableRefObject,
  useState,
  useRef,
} from 'react'
import { Animated, TextInput } from 'react-native'

const CodeInputWidth = 128
const animationDuration = 10000

const useReceiveCode = (ref: any) => {
  const [animation] = useState(new Animated.Value(0))
  const [disabled, setDisabled] = useState(false)
  const [disabledInput, setDisabledInput] = useState(true)
  const [showText, setShowText] = useState(false)
  const inputRef: MutableRefObject<TextInput | undefined> = useRef()

  const codeReceiveHandler = (): void => {
    if (disabled) {
      return
    }
    setDisabled(true)
    animation.setValue(0)

    setShowText(true)

    Animated.timing(animation, {
      toValue: CodeInputWidth,
      duration: animationDuration,
      useNativeDriver: false,
    }).start(() => {
      setDisabled(false)
    })
  }

  useImperativeHandle(ref, () => ({
    focus: inputRef?.current?.focus,
    activateButton: (): void => {
      animation.setValue(CodeInputWidth)
    },
    disableActivateButton: (): void => {
      animation.setValue(0)
      setDisabledInput(true)
    },
    startCodeAnimation: codeReceiveHandler,
    setDisabledInput,
  }))

  return {
    disabledInput,
    animation,
    disabled,
    inputRef,
    showText,
  }
}

export default useReceiveCode
