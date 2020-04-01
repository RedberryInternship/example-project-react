import { useEffect, useState, useRef } from 'react'
import { Keyboard, Animated, Easing, TextInput, Alert } from 'react-native'
import { Const, Helpers, Ajax } from '../utils'
import { useTranslation } from 'react-i18next'
import {
  Charger,
  MapImperativeRefObject,
  ChargerFilters,
  ChargersObject,
} from 'allTypes'
import { useSafeArea } from 'react-native-safe-area-context'

const useHomeMainInputHook = (
  allChargers: Charger[],
  mapRef: MapImperativeRefObject,
  setShowAll: (boolean: boolean) => void,
): any => {
  const InputRef = useRef<TextInput>(null)
  const [showSearchContent, setShowSearchContent] = useState<boolean>(false)
  const [inputText, setInputText] = useState<string>('')
  const [filteredChargers, setFilteredChargers] = useState<Charger[]>([])
  const insets = useSafeArea()

  const _this: any = useRef({
    animatedSearchContentHeight: new Animated.Value(0),
    text: '',
    searchContentHeight: Const.Height - 65 - insets.top - insets.bottom - 180,
  })
  const { t } = useTranslation()

  const textHandler = (val: string): void => {
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

  useEffect(() => {
    // Vobi Todo: const data = Helpers.GetFilteredCharger([], inputText, allChargers)
    // Vobi Todo: setFilteredChargers(data)
    // Vobi Todo: you shouldn't let helper mutate state
    Helpers.GetFilteredCharger([], inputText, allChargers, setFilteredChargers)
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
    onSearchItemClickHandler,
  }
}

export default useHomeMainInputHook
