import {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useRef,
} from 'react'
import {
  Keyboard,
  Animated,
  Easing,
  TextInput,
  BackHandler,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Charger } from 'types'
import * as Const from 'utils/const'
import { getFilteredCharger } from 'helpers/chargerFilter'
import { UseHomeMainSearchViewProps } from './types'

const animationOptions = {
  animatedSearchContentHeight: new Animated.Value(0),
  text: '',
  searchContentHeight: 0,
}

const useHomeMainSearchView = ({
  allChargers,
  setShowAll,
  mapRef,
}: UseHomeMainSearchViewProps) => {
  const inputRef = useRef<TextInput>(null)
  const backHandlerRef = useRef<any>()
  const [showSearchContent, setShowSearchContent] = useState<boolean>(false)
  const [inputText, setInputText] = useState<string>('')
  const [filteredChargers, setFilteredChargers] = useState<Charger[]>([])
  const insets = useSafeAreaInsets()

  animationOptions.searchContentHeight = Const.Height * 0.95 - 65 - insets.top - insets.bottom - 180

  useEffect(() => {
    Animated.timing(animationOptions.animatedSearchContentHeight, {
      toValue: showSearchContent ? animationOptions.searchContentHeight : 0,
      duration: 350,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start(() => (showSearchContent ? inputRef.current?.focus() : 0))
  }, [showSearchContent])

  /**
   * Handle android back button.
   */
  const handleAndroidBack = useCallback(() => {
    if (showSearchContent) {
      closeClick(true)
      return true
    }
    return false
  }, [showSearchContent])

  /**
   * Register event listener for android back button.
   */
  useEffect(() => {
    backHandlerRef.current = BackHandler.addEventListener(
      'hardwareBackPress',
      handleAndroidBack,
    )
    return () => {
      backHandlerRef.current.remove()
    }
  }, [handleAndroidBack])

  /**
   * Close modal click handler.
   */
  const closeClick = useCallback(
    (instantly = false): void => {
      if (instantly) {
        inputRef.current?.clear()
        setInputText('')
        setShowSearchContent(false)
        Keyboard.dismiss()
        return
      }
      if (inputText !== '') {
        inputRef.current?.clear()
        setInputText('')
      } else {
        setShowSearchContent(false)
        Keyboard.dismiss()
      }
    },
    [showSearchContent, inputRef],
  )

  /**
   * Memoize filtered chargers.
   */
  const memoizedFilteredChargers = useMemo(async () => {
    const retrievedChargers = await getFilteredCharger([], inputText)
    return retrievedChargers ?? allChargers ?? []
  }, [allChargers, inputText])

  /**
   * Search home main chargers.
   */
  useEffect(() => {
    (async () => {
      const chargers = await memoizedFilteredChargers
      setFilteredChargers(chargers)
    })()
  }, [inputText, allChargers])

  /**
   * Memoize animation options.
   */
  const animate = useMemo(
    () => ({
      opacity: animationOptions.animatedSearchContentHeight.interpolate({
        inputRange: [0, animationOptions.searchContentHeight],
        outputRange: [0.8, 1],
      }),
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: animationOptions.animatedSearchContentHeight.interpolate(
        {
          inputRange: [0, animationOptions.searchContentHeight],
          outputRange: [10, 0],
        },
      ),
      borderBottomRightRadius: animationOptions.animatedSearchContentHeight.interpolate(
        {
          inputRange: [0, animationOptions.searchContentHeight],
          outputRange: [10, 0],
        },
      ),
    }),
    [animationOptions],
  )

  /**
   * Handle click on search item.
   */
  const onSearchItemClickHandler = (lat: string, lng: string): void => {
    setShowSearchContent(false)
    Keyboard.dismiss()
    setShowAll(true)
    mapRef.current?.animateToCoords(parseFloat(lat), parseFloat(lng))
  }
  return {
    onSearchItemClickHandler,
    setShowSearchContent,
    showSearchContent,
    filteredChargers,
    animationOptions,
    setInputText,
    inputText,
    closeClick,
    inputRef,
    animate,
  }
}

export default useHomeMainSearchView
