import {useState, useEffect, useRef, RefObject, useContext} from "react";
import { NavigationParams, NavigationScreenProp,NavigationState, NavigationEventPayload } from 'react-navigation';
import { HomeNavigateModes, AppContextType, Charger } from "../../@types/allTypes.d";
import BottomSheet from 'reanimated-bottom-sheet'
import { InteractionManager } from "react-native";
import MapView from "react-native-maps";
import { regionFrom } from "../../src/utils";
import { AppContext } from "../../App";

type _This = {
  
}

const ZOOM_LEVEL : number = 200;


export default (navigation :  NavigationScreenProp<NavigationState, NavigationParams>) => {


  const context : AppContextType = useContext(AppContext)
  const [loading, setLoading] = useState<Boolean>(true);
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
  const _this : _This = useRef({})
  const bottomSheetRef : RefObject<BottomSheet> = useRef(null)
  const mapRef : RefObject<MapView> = useRef(null)

  useEffect(() => {
    let didFocus = navigation.addListener("didFocus", onScreenFocus)
    setTimeout(
      () =>{
        setSelectedFilters(Array(6).fill(0))

      }, 600
    )
    return () => {
      didFocus.remove()
    };
  }, [])

  const onScreenFocus = (payload : NavigationEventPayload) =>{
    let { params } = payload.state

    if (params !== undefined){
      setTimeout(
        () =>{
          switch (params?.mode) {
            case HomeNavigateModes.showAllChargers:
              bottomSheetRef.current?.snapTo(1)
              break;
            case HomeNavigateModes.chargerLocateOnMap:
              mapRef.current && mapRef.current.animateToRegion(
                regionFrom( params?.lat, params.lng, ZOOM_LEVEL ),
                400,
              )
              break;
          
            default:
              break;
          }
        }, 600
      )
    }
  }


  const onFilterClick = (index: number) =>{
    let newSelectedFilters : number[] = [];
    ++selectedFilters[index] 
    newSelectedFilters = selectedFilters.map((val) => val > 1 || val === 0 ? 0 : 1 )

    setSelectedFilters(newSelectedFilters)
  }


  const filteredChargers = () =>{
    return context.state.AllChargers?.filter((val: Charger) => {
      if(selectedFilters[0] && !val.active && !selectedFilters[1] ) return false
      if(selectedFilters[1] && val.active  && !selectedFilters[0] ) return false
      if(selectedFilters[2]  ) {
        if( !val.charger_types.filter((type : any) => type.name === "Fast" ).length ) return false
      }
      if(selectedFilters[3]  ) {
        if( !val.charger_types.filter((type : any) => type.name === "Lvl 2" ).length ) return false
      }
      if(selectedFilters[4] && !val.public && !selectedFilters[5] ) return false
      if(selectedFilters[5] && val.public && !selectedFilters[4] ) return false
      return  true
    } )
  }

  const onFilteredItemClick = (charger : Charger) =>{
    navigation.navigate("ChargerDetail", {chargerDetails : charger } )
  }

  return {loading, setLoading, _this, bottomSheetRef, mapRef, selectedFilters,  onFilterClick, onFilteredItemClick, filteredChargers}
}