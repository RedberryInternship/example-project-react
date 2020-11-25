import {
  useCallback,
  useEffect,
  RefObject,
  useState,
  useRef,
} from 'react'
import {
  NavigationEventPayload,
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
} from 'react-navigation'
import { GetFilteredCharger } from 'helpers/chargerFilter'
import { DrawerActions } from 'react-navigation-drawer'
import { Modalize } from 'react-native-modalize'
import {
  MapImperativeRefObject,
  HomeNavigateModes,
  ChargerDetail,
  Charger,
} from '../../../../../@types/allTypes.d'

const useHome = (navigation: NavigationScreenProp<NavigationState, NavigationParams>) => {
  const [loading, setLoading] = useState<boolean>(true)

  const [selectedFilters, setSelectedFilters] = useState<boolean[]>(Array(6).fill(false))
  const [bottomSheetChargers, setBottomSheetChargers] = useState<Charger[]>([])
  const [onMapFilteredChargers, setOnMapFilteredChargers] = useState<Charger[]>([])
  const [selectedFiltersOnMap, setSelectedFiltersOnMap] = useState<boolean[]>(Array(6).fill(false))

  const [inputText, setInputText] = useState('')
  const [showAll, setShowAll] = useState(true)

  const bottomSheetRef: RefObject<Modalize> = useRef(null)
  const mapRef: MapImperativeRefObject = useRef(null)
  const mainInputRef: any = useRef(null)

  useEffect(() => {
    const didFocus = navigation.addListener('didFocus', onScreenFocus)
    const willBlur = navigation.addListener(
      'willBlur',
      () => mapRef.current && mapRef.current.showRoute(0, 0, false) && navigation.setParams(''),
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
    },
    [bottomSheetRef],
  )

  const onScreenFocus = useCallback(
    (payload: NavigationEventPayload): void => {
      const { params } = payload.state

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
      const newSelectedFilters: boolean[] = [...selectedFilters]
      newSelectedFilters[index] = !selectedFilters[index]
      setSelectedFilters(newSelectedFilters)
    },
    [selectedFilters, setSelectedFilters],
  )

  useEffect(() => {
    GetFilteredCharger(selectedFilters, inputText).then((data) => {
      setBottomSheetChargers(data ?? [])
    })
  }, [selectedFilters, inputText])

  const onFilteredItemClick = useCallback(
    (charger: ChargerDetail): void => {
      navigation.navigate('ChargerDetail', {
        chargerDetails: { ...charger, from: 'Home' },
      })
    },
    [navigation],
  )

  // Vobi Todo: what is purpose of this function
  const searchInputTextChangeHandler = useCallback(
    (text: string): void => {
      setInputText(text)
    },
    [setInputText],
  )

  const onFilterClickOnMap = useCallback(
    (index: number): void => {
      const newSelectedFilters: boolean[] = [...selectedFiltersOnMap]
      newSelectedFilters[index] = !selectedFiltersOnMap[index]
      setSelectedFiltersOnMap(newSelectedFilters)
    },
    [selectedFiltersOnMap, setSelectedFiltersOnMap],
  )

  useEffect(() => {
    GetFilteredCharger(selectedFiltersOnMap, inputText).then((data) => {
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
    searchInputTextChangeHandler,
    setSelectedFiltersOnMap,
    onMapFilteredChargers,
    selectedFiltersOnMap,
    onFilteredItemClick,
    bottomSheetChargers,
    onFilterClickOnMap,
    selectedFilters,
    bottomSheetRef,
    onFilterClick,
    mainInputRef,
    setShowAll,
    setLoading,
    showAll,
    loading,
    mapRef,
  }
}
export default useHome
