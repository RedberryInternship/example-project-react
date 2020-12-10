import {
  useCallback,
  useEffect,
  RefObject,
  useState,
  useRef,
} from 'react'
import { NavigationEventPayload } from 'react-navigation'
import { GetFilteredCharger } from 'helpers/chargerFilter'
import { DrawerActions } from 'react-navigation-drawer'
import { Modalize } from 'react-native-modalize'
import {
  MapImperativeRefObject,
  HomeNavigateModes,
  Navigation,
  ChargerDetail,
  Charger,
} from 'types'

const useHome = (navigation: Navigation) => {
  const [selectedFilters, setSelectedFilters] = useState<boolean[]>(Array(6).fill(false))
  const [onMapFilteredChargers, setOnMapFilteredChargers] = useState<Charger[]>([])
  const [bottomSearchPanelChargers, setBottomSearchPanelChargers] = useState<Charger[]>([])
  const [selectedFiltersOnMap, setSelectedFiltersOnMap] = useState<boolean[]>(Array(6).fill(false))
  const [bottomPanelSearchInputText, setBottomPanelSearchInputText] = useState('')

  const [showAll, setShowAll] = useState(true)

  const bottomSheetRef: RefObject<Modalize> = useRef(null)
  const mapRef: MapImperativeRefObject = useRef(null)
  const mainInputRef: any = useRef(null)

  useEffect(() => {
    /**
     * Setup navigation listeners.
     */
    const didFocus = navigation.addListener('didFocus', onScreenFocus)
    const willBlur = navigation.addListener(
      'willBlur',
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
      didFocus.remove()
      willBlur.remove()
    }
  }, [])

  /**
   * Manage all show or all discard chargers action.
   */
  useEffect(() => {
    if (showAll) {
      setSelectedFiltersOnMap(Array(6).fill(0))
      setOnMapFilteredChargers([])
    } else {
      setBottomPanelSearchInputText('')
      setSelectedFilters(Array(6).fill(0))
    }
  }, [showAll])

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
    (payload: NavigationEventPayload): void => {
      const { params } = payload.state

      if (params !== undefined) {
        setTimeout(() => {
          switch (params?.mode) {
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
              mapRef.current?.animateToCoords(params?.lat, params?.lng)
              break
            }

            /**
             * Show routes to specific charger.
             */
            case HomeNavigateModes.showRoutesToCharger: {
              handleBottomSearchModal(false)
              mapRef.current?.showRoute(params?.lat, params?.lng)
              break
            }
            default:
              break
          }
        }, 500)
      }
    },
    [mapRef],
  )

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

  useEffect(() => {
    GetFilteredCharger(selectedFilters, bottomPanelSearchInputText).then((data) => {
      setBottomSearchPanelChargers(data ?? [])
    })
  }, [selectedFilters, bottomPanelSearchInputText])

  /**
   * On specific charger click go to charger's details screen.
   */
  const onFilteredItemClick = useCallback(
    (charger: ChargerDetail): void => {
      navigation.navigate('ChargerDetail', {
        chargerDetails: { ...charger, from: 'Home' },
      })
    },
    [navigation],
  )

  useEffect(() => {
    GetFilteredCharger(selectedFiltersOnMap, bottomPanelSearchInputText).then((data) => {
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
    setBottomPanelSearchInputText,
    bottomSearchPanelChargers,
    onMapFilteredChargers,
    selectedFiltersOnMap,
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
