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

export default (
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
  const _this: _This = useRef({})
  const bottomSheetRef: RefObject<BottomSheet> = useRef(null)
  const mapRef: RefObject<MapView> = useRef(null)

  useEffect(() => {
    const didFocus = navigation.addListener('didFocus', onScreenFocus)

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

      return true
    })
  }, [selectedFilters, inputText, []])

  const onFilteredItemClick = (charger: Charger) => {
    navigation.navigate('ChargerDetail', {chargerDetails: charger})
  }

  const searchInputTextChangeHandler = (text: string) => {
    setInputText(text)
  }

  const searchInputTextSubmit = () => {}

  const onFilterClickOnMap = (index: number) => {
    let newSelectedFilters: number[] = []
    ++selectedFiltersOnMap[index]
    newSelectedFilters = selectedFiltersOnMap.map(val =>
      val > 1 || val === 0 ? 0 : 1,
    )
    setSelectedFiltersOnMap(newSelectedFilters)
    setShowAll(false)
  }

  const filteredChargersOnMap = useMemo(() => {
    return context.state.AllChargers?.filter((val: Charger) => {
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
      }
      if (selectedFiltersOnMap[4] && !val.public && !selectedFiltersOnMap[5])
        return false
      if (selectedFiltersOnMap[5] && val.public && !selectedFiltersOnMap[4])
        return false

      return true
    })
  }, [selectedFiltersOnMap, []])

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
