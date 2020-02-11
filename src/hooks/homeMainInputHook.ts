import {useEffect, useState, useRef, useMemo, RefObject} from 'react'
import {Keyboard, Animated, Easing} from 'react-native'
import {Const, regionFrom} from '../utils'
import {useTranslation} from 'react-i18next'
import {Charger} from 'allTypes'
import MapView from 'react-native-maps'
import {useSafeArea} from 'react-native-safe-area-context'

export default (
  allChargers: Charger[],
  mapRef: RefObject<MapView>,
  setShowAll: (boolean: boolean) => void,
) => {
  const InputRef: any = useRef(null)
  const [showSearchContent, setShowSearchContent]: any = useState(false)
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
    }).start(() => (showSearchContent ? InputRef.current.focus() : 0))
  }, [showSearchContent])

  const closeClick = () => {
    if (_this.current.text !== '') return textHandler('')
    setShowSearchContent(false), Keyboard.dismiss()
  }

  const filterChargers = useMemo(() => {
    return allChargers?.filter((val: Charger) => {
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

  const animate = () => ({
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

  const onSearchItemClickHandler = (lat: string, lng: string) => {
    setShowSearchContent(false), Keyboard.dismiss()
    setShowAll(true)
    mapRef.current &&
      mapRef.current.animateToRegion(
        regionFrom(parseFloat(lat), parseFloat(lng), 100),
        400,
      )
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
