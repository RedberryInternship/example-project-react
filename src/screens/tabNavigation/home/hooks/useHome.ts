import {useState, useEffect, useRef, RefObject, useContext} from 'react'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
  NavigationEventPayload,
} from 'react-navigation'
import BottomSheet from 'reanimated-bottom-sheet'

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

  const bottomSheetRef: RefObject<BottomSheet> = useRef(null)
  const mapRef: MapImperativeRefObject = useRef(null)
  const mainInputRef: any = useRef(null)

  useEffect(() => {
    const didFocus = navigation.addListener('didFocus', onScreenFocus)
    const willBlur = navigation.addListener(
      'willBlur',
      () => mapRef.current && mapRef.current.showRoute(0, 0, false),
    )
    navigation.dispatch(DrawerActions.closeDrawer())
    bottomSheetSnapTo()
    return (): void => {
      didFocus.remove()
      willBlur.remove()
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

    // mainInputRef.current?.close() //close main input always
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
    newSelectedFilters = selectedFilters.map((val) =>
      val > 1 || val === 0 ? 0 : 1,
    )
    setSelectedFilters(newSelectedFilters)
  }

  useEffect(() => {
    Helpers.GetFilteredCharger(selectedFilters, inputText).then((data) => {
      setBottomSheetChargers(data ?? context.state?.AllChargers ?? [])
    })
  }, [selectedFilters, inputText, context.state.AllChargers])

  const onFilteredItemClick = (charger: ChargerDetail): void => {
    navigation.navigate('ChargerDetail', {
      chargerDetails: {...charger, from: 'Home'},
    })
  }

  const searchInputTextChangeHandler = (text: string): void => {
    setInputText(text)
  }

  const onFilterClickOnMap = (index: number): void => {
    let newSelectedFilters: number[] = []
    ++selectedFiltersOnMap[index]
    newSelectedFilters = selectedFiltersOnMap.map((val) =>
      val > 1 || val === 0 ? 0 : 1,
    )

    setSelectedFiltersOnMap(newSelectedFilters)
    setShowAll(false)
  }

  useEffect(() => {
    Helpers.GetFilteredCharger(selectedFiltersOnMap, inputText).then((data) => {
      setOnMapFilteredChargers(data ?? context.state?.AllChargers ?? [])
    })
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
