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
  MapImperativeRefObject,
  ChargerFilters,
  ChargersObject,
} from '../../@types/allTypes.d'
import BottomSheet from 'reanimated-bottom-sheet'
import {AppContext} from '../../App'
import {Ajax, Helpers, apiServices, Defaults} from 'utils'

type _This = {}

const useHomeHook = (
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
  const bottomSheetRef: RefObject<BottomSheet> = useRef(null)
  const mapRef: MapImperativeRefObject = useRef(null)
  const mainInputRef: any = useRef(null)

  useEffect(() => {
    const didFocus = navigation.addListener('didFocus', onScreenFocus)
    bottomSheetRef.current?.snapTo(0)
    bottomSheetRef.current?.snapTo(0)

    return (): void => {
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

  const onScreenFocus = (payload: NavigationEventPayload): void => {
    const {params} = payload.state

    // remove directions on every focus
    if (!params?.mode) {
      mapRef.current &&
        mapRef.current.showRoute(params?.lat, params?.lng, false)
    }

    mainInputRef.current?.close() //close main input always
    if (params !== undefined) {
      setTimeout(() => {
        switch (params?.mode) {
          case HomeNavigateModes.showAllChargers: {
            bottomSheetSnapTo(1)
            break
          }
          case HomeNavigateModes.chargerLocateOnMap: {
            bottomSheetSnapTo()
            mapRef.current?.animateToCoords(params?.lat, params?.lng)
            break
          }
          case HomeNavigateModes.showRoutesToCharger: {
            bottomSheetSnapTo()
            mapRef.current?.showRoute(params?.lat, params?.lng)
            break
          }
          default:
            break
        }
      }, 600)
    }
  }
  const bottomSheetSnapTo = (snapPoint = 0): void => {
    // because of library bug
    bottomSheetRef.current?.snapTo(snapPoint)
    bottomSheetRef.current?.snapTo(snapPoint)
  }

  const onFilterClick = (index: number): void => {
    let newSelectedFilters: number[] = []
    ++selectedFilters[index]
    newSelectedFilters = selectedFilters.map(val =>
      val > 1 || val === 0 ? 0 : 1,
    )
    setSelectedFilters(newSelectedFilters)
  }

  useEffect(() => {
    Helpers.GetFilteredCharger(
      selectedFilters,
      inputText,
      context.state?.AllChargers,
      setBottomSheetChargers,
    )
  }, [selectedFilters, inputText, context.state.AllChargers])

  const onFilteredItemClick = (charger: Charger): void => {
    navigation.navigate('ChargerDetail', {chargerDetails: charger})
  }

  const searchInputTextChangeHandler = (text: string): void => {
    setInputText(text)
  }

  const searchInputTextSubmit = () => {} // Todo : need to be handled

  const onFilterClickOnMap = (index: number): void => {
    let newSelectedFilters: number[] = []
    ++selectedFiltersOnMap[index] // Vobi Todo: what is purpose of this
    newSelectedFilters = selectedFiltersOnMap.map(val =>
      val > 1 || val === 0 ? 0 : 1,
    )
    setSelectedFiltersOnMap(newSelectedFilters)
    setShowAll(false)
  }

  useEffect(() => {
    Helpers.GetFilteredCharger(
      selectedFiltersOnMap,
      inputText,
      context.state?.AllChargers,
      setOnMapFilteredChargers,
    ) // Vobi Todo: this is bad way to mutate state you should return value or
    // Vobi Todo: use callbacks to call state change. when reading this code you cant really understand what it does
  }, [selectedFiltersOnMap, context.state.AllChargers])

  return {
    loading,
    setLoading,
    bottomSheetRef,
    mapRef,
    selectedFilters,
    onFilterClick,
    onFilteredItemClick,
    searchInputTextChangeHandler,
    searchInputTextSubmit,
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
export default useHomeHook
