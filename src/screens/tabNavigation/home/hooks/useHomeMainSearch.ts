import {useEffect, useState, useRef} from 'react'
import {Keyboard, Animated, Easing, TextInput, Alert} from 'react-native'
import {useSafeArea} from 'react-native-safe-area-context'
import {useTranslation} from 'react-i18next'

import {Charger, MapImperativeRefObject} from 'allTypes'

import {Const, Helpers} from 'utils'

const useHomeMainSearch = (
  allChargers: Charger[],
  mapRef: MapImperativeRefObject,
  setShowAll: (boolean: boolean) => void,
) => {
  const InputRef = useRef<TextInput>(null)
  const [showSearchContent, setShowSearchContent] = useState<boolean>(false)
  const [inputText, setInputText] = useState<string>('')
  const [filteredChargers, setFilteredChargers] = useState<Charger[]>([])
  const insets = useSafeArea()

  const {t} = useTranslation()

  const _this: any = useRef({
    animatedSearchContentHeight: new Animated.Value(0),
    text: '',
    searchContentHeight:
      Const.Height * 0.95 - 65 - insets.top - insets.bottom - 180,
  })

  const textHandler = (val: string): void => {
    setInputText(val.toLowerCase())
  }

  useEffect(() => {
    Animated.timing(_this.current.animatedSearchContentHeight, {
      toValue: showSearchContent ? _this.current.searchContentHeight : 0,
      duration: 350,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start(() => (showSearchContent ? InputRef.current?.focus() : 0))
  }, [showSearchContent])

  const closeClick = (instantly = false): void => {
    if (instantly) {
      InputRef.current?.clear()
      textHandler('')
      setShowSearchContent(false)
      Keyboard.dismiss()
      return
    }
    if (inputText !== '') {
      InputRef.current?.clear()
      textHandler('')
    } else {
      setShowSearchContent(false)
      Keyboard.dismiss()
    }
  }

  useEffect(() => {
    Helpers.GetFilteredCharger([], inputText).then((data) => {
      setFilteredChargers(data ?? allChargers ?? [])
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
    setShowSearchContent(false)
    Keyboard.dismiss()
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
    filteredChargers,
    inputText,
    onSearchItemClickHandler,
  }
}

export default useHomeMainSearch
