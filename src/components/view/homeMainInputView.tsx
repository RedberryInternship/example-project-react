import React, { RefObject } from 'react';
import { StyleSheet,Animated, View, TouchableOpacity,  Alert, Platform} from 'react-native';
import { useHomeMainInputHook } from '../../hooks';
import { Const, Colors, Defaults, getLocaleText, regionFrom } from '../../utils';
import { MainSearchItem, HomeMainSearchInput } from '..';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { Charger } from '../../../@types/allTypes.d';
import MapView from 'react-native-maps';

type MainInput = {
  allChargers : Charger[],
  mapRef : RefObject<MapView>,
  setShowAll : (boolean: boolean) => void
}


const MainInput = ( {allChargers , mapRef, setShowAll} : MainInput) => {

  const hook = useHomeMainInputHook(allChargers, mapRef, setShowAll);
  
  
  const InputSubmit = () => {
    Alert.alert(JSON.stringify(hook._this.current))
  }

  console.log(hook._this.animatedSearchContentHeight);
  
  
  return (
    <TouchableOpacity activeOpacity={1} onPress={hook.closeClick} style={[styles.container]}>
      <>
        <Animated.View style={[styles.inputStyleContainer, hook.animate()]}>
          <HomeMainSearchInput 
            setShowSearchContent={hook.setShowSearchContent.bind(MainInput,!hook.showSearchContent)}
            showSearchContent={hook.showSearchContent}
            placeholder={`${hook.t("home.location")}/${hook.t("home.organization")}`}
            textHandler={hook.textHandler}
            InputSubmit={InputSubmit}
            closeClick={hook.closeClick}
            ref={hook.InputRef}
          />
          </Animated.View>
          <Animated.View style={[styles.searchContent, {height : hook._this.current.animatedSearchContentHeight,}]}>
          <View style={{display : hook.showSearchContent ?  "flex" : "none", flex:1, marginBottom:16}}>
            <KeyboardAwareFlatList
              style={{flex: 1}}
              contentContainerStyle={{}}
              keyboardShouldPersistTaps={"handled"}
              enableOnAndroid={true}
              enableAutomaticScroll={true}
              extraScrollHeight={0}
              showsVerticalScrollIndicator={false}
              enableResetScrollToCoords={true}
              resetScrollToCoords={{x:0,y:0}}
              viewIsInsideTabBar={true}
              data={[1]}
              renderItem={() => (
                <>
                {
                  hook.filterChargers?.map((val : Charger) =>
                    (<MainSearchItem 
                      key={val.id} 
                      text ={getLocaleText(val.name)} 
                      mainTitle={getLocaleText(val.location)} 
                      onPress={hook.onSearchItemClickHandler.bind(MainInput,val.lat, val.lng )}/>)
                  )
                }
                  
                  
                </>
              )}
            />
          </View>
          </Animated.View>
      </>
  </TouchableOpacity>
  );
};


export default MainInput;



const styles = StyleSheet.create({
  container : {
    width:"100%",
    elevation:11,
    marginTop : 12,
    zIndex:4,
    position:"relative",
  },
  inputStyleContainer : {
    flex:0, 
    width: Const.Width - 48, 
    height:  36,
    elevation:1,
    backgroundColor:"#023D63",
    marginHorizontal:24
  },
  inputStyle :{
    alignItems:"stretch", 
    justifyContent:"center", 
    flex:1, 
    height:  36,
  },
  searchContent : {
    width:  Const.Width - 48, 
    backgroundColor:Colors.primaryBackground,
    marginHorizontal:24,
    borderBottomRightRadius : 4,
    borderBottomLeftRadius : 4,
    position:"relative",
    alignContent:"stretch",
  }
});