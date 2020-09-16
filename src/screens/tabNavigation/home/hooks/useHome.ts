import {
  useState,
  useEffect,
  useRef,
  RefObject,
  useContext,
  useCallback,
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
  MapImperativeRefObject,
  ChargerDetail,
} from '../../../../../@types/allTypes.d'
import {AppContext} from '../../../../../App'
import {Helpers} from 'utils'
import {DrawerActions} from 'react-navigation-drawer'
import {Alert} from 'react-native'
import {Modalize} from 'react-native-modalize'

const useHome = (
  navigation: NavigationScreenProp<NavigationState, NavigationParams>,
) => {
  const context: AppContextType = useContext(AppContext)
  const [loading, setLoading] = useState<boolean>(true)

  const [selectedFilters, setSelectedFilters] = useState<number[]>(
    Array(6).fill(0),
  )
  const [bottomSheetChargers, setBottomSheetChargers] = useState<Charger[]>([])
  const [onMapFilteredChargers, setOnMapFilteredChargers] = useState<Charger[]>(
    [],
  )
  const [selectedFiltersOnMap, setSelectedFiltersOnMap] = useState<number[]>(
    Array(6).fill(0),
  )

  const [inputText, setInputText] = useState<string>('')
  const [showAll, setShowAll] = useState<boolean>(true)

  const bottomSheetRef: RefObject<Modalize> = useRef(null)
  const mapRef: MapImperativeRefObject = useRef(null)
  const mainInputRef: any = useRef(null)

  useEffect(() => {
    const didFocus = navigation.addListener('didFocus', onScreenFocus)
    const willBlur = navigation.addListener(
      'willBlur',
      () =>
        mapRef.current &&
        mapRef.current.showRoute(0, 0, false) &&
        navigation.setParams(''),
    )
    navigation.dispatch(DrawerActions.closeDrawer())
    bottomSheetSnapTo(false)
    return (): void => {
      didFocus.remove()
      willBlur.remove()
    }
  }, [])

  useEffect(() => {
    if (showAll) {
      setSelectedFiltersOnMap(Array(6).fill(0))
      setOnMapFilteredChargers([])
    } else {
      setInputText('')
      setSelectedFilters(Array(6).fill(0))
    }
  }, [showAll])

  const bottomSheetSnapTo = useCallback(
    (show = true): void => {
      // because of library bug
      if (show) bottomSheetRef.current?.open('top')
      else bottomSheetRef.current?.close('alwaysOpen')
      // bottomSheetRef.current?.snapTo(snapPoint)
    },
    [bottomSheetRef],
  )

  const onScreenFocus = useCallback(
    (payload: NavigationEventPayload): void => {
      const {params} = payload.state

      if (params !== undefined) {
        setTimeout(() => {
          switch (params?.mode) {
            case HomeNavigateModes.showAllChargers: {
              bottomSheetSnapTo()
              break
            }
            case HomeNavigateModes.chargerLocateOnMap: {
              bottomSheetSnapTo(false)
              mapRef.current?.animateToCoords(params?.lat, params?.lng)
              break
            }
            case HomeNavigateModes.showRoutesToCharger: {
              bottomSheetSnapTo(false)
              mapRef.current?.showRoute(params?.lat, params?.lng)
              break
            }
            default:
              break
          }
        }, 500)
      }
    },
    [bottomSheetSnapTo, mapRef],
  )

  const onFilterClick = useCallback(
    (index: number): void => {
      let newSelectedFilters: number[] = JSON.parse(JSON.stringify(selectedFilters))
      newSelectedFilters[index] = selectedFilters[index] > 0 ? 0 : 1;
      setSelectedFilters(newSelectedFilters)
    },
    [selectedFilters, setSelectedFilters],
  )

  useEffect(() => {
    Helpers.GetFilteredCharger(selectedFilters, inputText).then((data) => {
      setBottomSheetChargers(data ?? [])
    })
  }, [selectedFilters, inputText])

  const onFilteredItemClick = useCallback(
    (charger: ChargerDetail): void => {
      navigation.navigate('ChargerDetail', {
        chargerDetails: {...charger, from: 'Home'},
      })
    },
    [navigation],
  )

  const searchInputTextChangeHandler = useCallback(
    (text: string): void => {
      setInputText(text)
    },
    [setInputText],
  )
  
  const onFilterClickOnMap = useCallback(
    (index: number): void => {
      const newSelectedFilters: number[] = JSON.parse(JSON.stringify(selectedFiltersOnMap));
      newSelectedFilters[index] = selectedFiltersOnMap[index] > 0 ? 0 : 1;
      setSelectedFiltersOnMap(newSelectedFilters)
    },
    [selectedFiltersOnMap, setSelectedFiltersOnMap],
  )

  useEffect(() => {
    Helpers.GetFilteredCharger(selectedFiltersOnMap, inputText).then((data) => {
      if (data) {
        setShowAll(false)
        setOnMapFilteredChargers(data)
      } else {
        setShowAll(true)
        setOnMapFilteredChargers([])
      }
    })
  }, [selectedFiltersOnMap])

  return {
    loading,
    setLoading,
    bottomSheetRef,
    mapRef,
    selectedFilters,
    onFilterClick,
    onFilteredItemClick,
    searchInputTextChangeHandler,
    context,
    showAll,
    setShowAll,
    onFilterClickOnMap,
    selectedFiltersOnMap,
    setSelectedFiltersOnMap,
    mainInputRef,
    onMapFilteredChargers,
    bottomSheetChargers,
  }
}
export default useHome
