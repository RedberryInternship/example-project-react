import {useEffect, useState, useRef, useMemo, RefObject} from 'react'
import {Keyboard, Animated, Easing, TextInput} from 'react-native'
import {Const} from '../utils'
import {useTranslation} from 'react-i18next'
import {Charger, MapImperativeRefObject} from 'allTypes'
import {useSafeArea} from 'react-native-safe-area-context'

const useHomeMainInputHook = (
  allChargers: Charger[],
  mapRef: MapImperativeRefObject,
  setShowAll: (boolean: boolean) => void,
): any => {
  const InputRef = useRef<TextInput>(null)
  const [showSearchContent, setShowSearchContent] = useState<boolean>(false)
  const [inputText, setInputText] = useState<string>('')
  const insets = useSafeArea()

  const _this: any = useRef({
    animatedSearchContentHeight: new Animated.Value(0),
    text: '',
    searchContentHeight: Const.Height - 65 - insets.top - insets.bottom - 180,
  })
  const {t} = useTranslation()

  const textHandler = (val: string) => {
    setInputText(val.toLowerCase())
  }

  useEffect(() => {
    Animated.timing(_this.current.animatedSearchContentHeight, {
      toValue: showSearchContent ? _this.current.searchContentHeight : 0,
      duration: 350,
      easing: Easing.out(Easing.ease),
      // useNativeDriver : true,
    }).start(() => (showSearchContent ? InputRef.current?.focus() : 0))
  }, [showSearchContent])

  const closeClick = (): void => {
    if (_this.current.text !== '') return textHandler('')
    setShowSearchContent(false), Keyboard.dismiss()
  }

  const filterChargers = useMemo(() => {
    return allChargers?.filter((val: Charger) => {
      // Todo Vobi: This kind of thing inside if statement is not readable i can't really understand what it does
      // Todo Vobi: At leas store each loop value inside a constant and than compare them
      if (
        Object.entries(val.name).filter(val =>
          val[1].toLowerCase().includes(inputText),
        ).length === 0 &&
        Object.entries(val.location).filter(val =>
          val[1].toLowerCase().includes(inputText),
        ).length === 0
      )
        return false

      return true
    })
  }, [inputText, allChargers])

  const animate = (): any => ({
    opacity: _this.current.animatedSearchContentHeight.interpolate({
      inputRange: [0, _this.current.searchContentHeight],
      outputRange: [0.8, 1],
    }),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: _this.current.animatedSearchContentHeight.interpolate(
      {
        inputRange: [0, _this.current.searchContentHeight],
        outputRange: [10, 0],
      },
    ),
    borderBottomRightRadius: _this.current.animatedSearchContentHeight.interpolate(
      {
        inputRange: [0, _this.current.searchContentHeight],
        outputRange: [10, 0],
      },
    ),
  })

  const onSearchItemClickHandler = (lat: string, lng: string): void => {
    setShowSearchContent(false), Keyboard.dismiss()
    setShowAll(true)
    mapRef.current?.animateToCoords(parseFloat(lat), parseFloat(lng))
  }
  return {
    t,
    _this,
    showSearchContent,
    animate,
    setShowSearchContent,
    InputRef,
    closeClick,
    textHandler,
    filterChargers,
    onSearchItemClickHandler,
  }
}

export default useHomeMainInputHook
