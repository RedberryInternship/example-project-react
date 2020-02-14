import {
  useState,
  useEffect,
  useRef,
  RefObject,
  useContext,
  useMemo,
} from 'react'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  NavigationEventPayload,
} from 'react-navigation'
import {
  HomeNavigateModes,
  AppContextType,
  Charger,
} from '../../@types/allTypes.d'
import BottomSheet from 'reanimated-bottom-sheet'
import MapView from 'react-native-maps'
import {regionFrom} from 'utils'
import {AppContext} from '../../App'

type _This = {}

const ZOOM_LEVEL = 200

const useHomeHook = (
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
): any => {
  const context: AppContextType = useContext(AppContext)
  const [loading, setLoading] = useState<boolean>(true)

  const [selectedFilters, setSelectedFilters] = useState<number[]>(
    Array(6).fill(0),
  )
  const [selectedFiltersOnMap, setSelectedFiltersOnMap] = useState<number[]>(
    Array(6).fill(0),
  )

  const [inputText, setInputText] = useState<string>('')
  const [showAll, setShowAll] = useState<boolean>(true)
  const _this: _This = useRef({}) // Todo Vobi: this is left without type why?
  const bottomSheetRef: RefObject<BottomSheet> = useRef(null)
  const mapRef: RefObject<MapView> = useRef(null)

  useEffect(() => {
    const didFocus = navigation.addListener('didFocus', onScreenFocus)
    // Todo Vobi: Immutable variables should be stored as const not let
    // Todo Vobi: This way when you look at some variable you know that it's reference or primitive value can not be modified

    return () => {
      didFocus.remove()
    }
  }, [])

  useEffect(() => {
    if (showAll) {
      setSelectedFiltersOnMap(Array(6).fill(0))
    } else {
      setInputText('')
      setSelectedFilters(Array(6).fill(0))
    }
  }, [showAll])

  const onScreenFocus = (payload: NavigationEventPayload) => {
    const {params} = payload.state

    navigation.setParams({mode: null})

    console.log('====================================')
    // Vobi Todo: console logs must be removed everywhere
    console.log(params, 'params, homeHook')
    console.log('====================================')
    if (params !== undefined) {
      setTimeout(() => {
        switch (params?.mode) {
          case HomeNavigateModes.showAllChargers:
            bottomSheetRef.current?.snapTo(1)
            break
          case HomeNavigateModes.chargerLocateOnMap:
            bottomSheetRef.current?.snapTo(0)
            mapRef.current &&
              mapRef.current.animateToRegion(
                regionFrom(params?.lat, params.lng, ZOOM_LEVEL),
                400,
              )
            break

          default:
            break
        }
      }, 600)
    }
  }

  const onFilterClick = (index: number) => {
    let newSelectedFilters: number[] = []
    ++selectedFilters[index]
    // Todo Vobi: Mutating State is now allowed in react like this
    newSelectedFilters = selectedFilters.map(val =>
      val > 1 || val === 0 ? 0 : 1,
    )

    setSelectedFilters(newSelectedFilters)
  }

  const filteredChargers = useMemo(() => {
    return context.state.AllChargers?.filter((val: Charger) => {
      if (selectedFilters[0] && !val.active) return false
      if (selectedFilters[1] && val.active) return false
      if (selectedFilters[2]) {
        if (
          !val.charger_types.filter((type: any) => type.name === 'Fast').length
        )
          return false
      }
      if (selectedFilters[3]) {
        if (
          !val.charger_types.filter((type: any) => type.name === 'Lvl 2').length
        )
          return false
      }
      if (selectedFilters[4] && !val.public && !selectedFilters[5]) return false
      if (selectedFilters[5] && val.public && !selectedFilters[4]) return false

      if (
        Object.entries(val.name).filter(val => val[1].includes(inputText))
          .length === 0 &&
        Object.entries(val.location).filter(val => val[1].includes(inputText))
          .length === 0
      )
        return false
      // Todo Vobi: Refactor way we handle Charger data
      // Todo Vobi: This memo function runs on O(n3) time complexity
      // Todo Vobi: This might not be issue with small amount of chargers
      // Todo Vobi: but as soon as charger's data grows this will cause a serious performance issue
      // Todo Vobi: Considering that we are listening to search text change

      return true
    })
  }, [selectedFilters, inputText, []]) // Todo Vobi: why do you need to listen to empty array change?
  // Todo Vobi: move like this [selectedFilters, inputText]

  const onFilteredItemClick = (charger: Charger) => {
    navigation.navigate('ChargerDetail', {chargerDetails: charger})
  }

  const searchInputTextChangeHandler = (text: string) => {
    setInputText(text)
  }

  const searchInputTextSubmit = () => {} // Todo Vobi: remove unused function

  const onFilterClickOnMap = (index: number) => {
    let newSelectedFilters: number[] = []
    ++selectedFiltersOnMap[index]
    // Todo Vobi: Mutating State is now allowed in react like this
    // Todo Vobi: create custom variable to store mutated array or do an inline check
    // Todo Vobi: https://tppr.me/DUZxy
    newSelectedFilters = selectedFiltersOnMap.map(val =>
      val > 1 || val === 0 ? 0 : 1,
    )
    setSelectedFiltersOnMap(newSelectedFilters)
    setShowAll(false)
  }

  const filteredChargersOnMap = useMemo(() => {
    return context.state.AllChargers?.filter((val: Charger) => {
      // Todo Vobi: I think that way we store chargers and checking selected filters can be modified to be more readable
      // Todo Vobi: I Would just delete this and think of the way to store this kind of data to be more readable and easily accessible
      if (selectedFiltersOnMap[0] && !val.active) return false
      if (selectedFiltersOnMap[1] && val.active) return false
      if (selectedFiltersOnMap[2] && !selectedFiltersOnMap[3]) {
        if (
          !val.charger_types.filter((type: any) => type.name === 'Fast').length
        )
          return false
      }
      if (selectedFiltersOnMap[3] && !selectedFiltersOnMap[2]) {
        if (
          !val.charger_types.filter((type: any) => type.name === 'Lvl 2').length
        )
          return false
        // Todo Vobi: you can use find here instead of checking filtered array length
        // Todo Vobi: .filter method's time complexity is O(n) every time
        // Todo Vobi: .find stops executing right after it finds the node you were looking for
        // Todo Vobi: and it does half of the work on average so its O(n/2)
      }
      if (selectedFiltersOnMap[4] && !val.public && !selectedFiltersOnMap[5])
        return false
      if (selectedFiltersOnMap[5] && val.public && !selectedFiltersOnMap[4])
        return false

      return true
    })
  }, [selectedFiltersOnMap, []]) // Todo Vobi: Why are you listening To empty array

  return {
    loading,
    setLoading,
    _this,
    bottomSheetRef,
    mapRef,
    selectedFilters,
    onFilterClick,
    onFilteredItemClick,
    filteredChargers,
    searchInputTextChangeHandler,
    searchInputTextSubmit,
    context,
    showAll,
    setShowAll,
    filteredChargersOnMap,
    onFilterClickOnMap,
    selectedFiltersOnMap,
    setSelectedFiltersOnMap,
  }
}

export default useHomeHook
