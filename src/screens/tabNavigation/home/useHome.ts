import {
  useCallback,
  useEffect,
  RefObject,
  useState,
  useRef,
} from 'react'
import { useNavigation, DrawerActions, useRoute } from '@react-navigation/native'
import { GetFilteredCharger } from 'helpers/chargerFilter'
import { Modalize } from 'react-native-modalize'
import {
  MapImperativeRefObject,
  HomeNavigateModes,
  ChargerDetail,
  Charger,
} from 'types'

const useHome = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const [selectedFilters, setSelectedFilters] = useState<boolean[]>(Array(6).fill(false))
  const [onMapFilteredChargers, setOnMapFilteredChargers] = useState<Charger[]>([])
  const [bottomSearchPanelChargers, setBottomSearchPanelChargers] = useState<Charger[]>([])
  const [selectedFiltersOnMap, setSelectedFiltersOnMap] = useState<boolean[]>(Array(6).fill(false))
  const [bottomPanelSearchInputText, setBottomPanelSearchInputText] = useState('')

  const [showAll, setShowAll] = useState(true)

  const bottomSheetRef: RefObject<Modalize> = useRef(null)
  const mapRef: MapImperativeRefObject = useRef(null)
  const mainInputRef: any = useRef(null)

  /**
   * Mange bottom search panel,
   * close or open.
   */
  const handleBottomSearchModal = useCallback(
    (open = true): void => {
      if (open) {
        bottomSheetRef.current?.open('top')
      } else {
        bottomSheetRef.current?.close('alwaysOpen')
      }
    },
    [bottomSheetRef],
  )

  /**
   * Setup specific actions on map navigate depending
   * passed navigation parameters.
   */
  const onScreenFocus = useCallback(
    (): void => {
      const mode = route.params?.mode
      const lat = route.params?.lat
      const lng = route.params?.lng

      if (route.params !== undefined) {
        setTimeout(() => {
          switch (mode) {
            /**
             * Open bottom search panel and show all chargers.
             */
            case HomeNavigateModes.showAllChargers: {
              handleBottomSearchModal()
              break
            }

            /**
             * Show charger location on map.
             */
            case HomeNavigateModes.chargerLocateOnMap: {
              handleBottomSearchModal(false)
              mapRef.current?.animateToCoords(lat, lng)
              break
            }

            /**
             * Show routes to specific charger.
             */
            case HomeNavigateModes.showRoutesToCharger: {
              handleBottomSearchModal(false)
              mapRef.current?.showRoute(lat, lng)
              break
            }
            default:
              break
          }
        }, 500)
      }
    },
    [mapRef, handleBottomSearchModal, route.params],
  )

  useEffect(() => {
    /**
     * Setup navigation listeners.
     */
    const didFocus = navigation.addListener('focus', onScreenFocus)
    const willBlur = navigation.addListener(
      'blur',
      () => mapRef.current && mapRef.current.showRoute(0, 0, false) && navigation.setParams({}),
    )

    /**
     * On map navigate close drawer and close bottom search panel.
     */
    navigation.dispatch(DrawerActions.closeDrawer())
    handleBottomSearchModal(false)

    /**
     * Remove subscriptions at unmount.
     */
    return (): void => {
      // didFocus.remove()
      // willBlur.remove()
    }
  }, [handleBottomSearchModal, navigation, onScreenFocus])

  /**
   * Manage all show or all discard chargers action.
   */
  useEffect(() => {
    if (showAll) {
      setSelectedFiltersOnMap(Array(6).fill(false))
      setOnMapFilteredChargers([])
    } else {
      setBottomPanelSearchInputText('')
      setSelectedFilters(Array(6).fill(0))
    }
  }, [showAll])

  /**
   * Manage filter clicks.
   */
  const onFilterClick = useCallback(
    (index: number): void => {
      const newSelectedFilters: boolean[] = [...selectedFilters]
      newSelectedFilters[index] = !selectedFilters[index]
      setSelectedFilters(newSelectedFilters)
    },
    [selectedFilters],
  )

  /**
   * Handle map filter clicks.
   */
  const handleMapFilterClick = useCallback(
    (index: number): void => {
      const newSelectedFilters: boolean[] = [...selectedFiltersOnMap];
      newSelectedFilters[index] = !selectedFiltersOnMap[index]
      setSelectedFiltersOnMap(newSelectedFilters)
    },
    [selectedFiltersOnMap, setSelectedFiltersOnMap],
  )

  useEffect(() => {
    const filterData = async () => {
      const data = await GetFilteredCharger(selectedFilters, bottomPanelSearchInputText)

      setBottomSearchPanelChargers(data ?? [])
    }

    filterData()
  }, [selectedFilters, bottomPanelSearchInputText])

  /**
   * On specific charger click go to charger's details screen.
   */
  const onFilteredItemClick = useCallback(
    (charger: ChargerDetail): void => {
      navigation.navigate('ChargerDetail', {
        chargerDetails: charger,
      })
    },
    [navigation],
  )

  useEffect(() => {
    const filterData = async () => {
      const data = await GetFilteredCharger(selectedFiltersOnMap, bottomPanelSearchInputText)

      if (data) {
        setShowAll(false)
        setOnMapFilteredChargers(data)
      } else {
        setShowAll(true)
        setOnMapFilteredChargers([])
      }
    }

    filterData()
  }, [selectedFiltersOnMap, bottomPanelSearchInputText])

  return {
    setBottomPanelSearchInputText,
    bottomSearchPanelChargers,
    onMapFilteredChargers,
    selectedFiltersOnMap,
    handleMapFilterClick,
    onFilteredItemClick,
    selectedFilters,
    bottomSheetRef,
    onFilterClick,
    mainInputRef,
    setShowAll,
    showAll,
    mapRef,
  }
}
export default useHome
