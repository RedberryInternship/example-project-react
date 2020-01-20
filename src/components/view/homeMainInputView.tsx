import React from 'react';
import { StyleSheet,Animated, View, TouchableOpacity,  Alert, Platform} from 'react-native';
import { useHomeMainInputHook } from '../../hooks';
import { Const, Colors, Defaults } from '../../utils';
import { MainSearchItem, HomeMainSearchInput } from '..';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'

type MainInput = {
  style?: StyleProp<ViewStyle> ,
}


const MainInput = ( {style} : MainInput) => {

  const hook = useHomeMainInputHook();
  
  
  const InputSubmit = () => {
    Alert.alert(JSON.stringify(hook._this.current))
  }

  const onFocus = () => {

  }
  console.log(hook._this.animatedSearchContentHeight);
  
  
  return (
    <TouchableOpacity activeOpacity={1} onPress={hook.closeClick} style={[styles.container, style]}>
      <>
        <Animated.View style={[styles.inputStyleContainer, hook.animate()]}>
          <HomeMainSearchInput 
            setShowSearchContent={hook.setShowSearchContent.bind(MainInput,!hook.showSearchContent)}
            showSearchContent={hook.showSearchContent}
            placeholder={`${hook.t("home.location")}/${hook.t("home.organization")}`}
            textHandler={hook.textHandler}
            InputSubmit={InputSubmit}
            onFocus={onFocus}
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
              extraScrollHeight={-150}
              showsVerticalScrollIndicator={false}
              enableResetScrollToCoords={true}
              resetScrollToCoords={{x:0,y:0}}
              viewIsInsideTabBar={true}
              data={[1]}
              renderItem={() => (
                <>
                  <MainSearchItem  text ={"ასფასფ ადს"} mainTitle={"ტბისლისი"} onPress={()=>{Alert.alert("asdf")}}/>
                  <MainSearchItem  text ={"ასფასფ ადს"} mainTitle={"ტბისლისი"} onPress={()=>{Alert.alert("asdf")}}/>
                  <MainSearchItem  text ={"ასფასფ ადს"} mainTitle={"ტბისლისი"} onPress={()=>{Alert.alert("asdf")}}/>
                  <MainSearchItem  text ={"ასფასფ ადს"} mainTitle={"ტბისლისი"} onPress={()=>{Alert.alert("asdf")}}/>
                  <MainSearchItem  text ={"ასფასფ ადს"} mainTitle={"ტბისლისი"} onPress={()=>{Alert.alert("asdf")}}/>
                  <MainSearchItem  text ={"ასფასფ ადს"} mainTitle={"ტბისლისი"} onPress={()=>{Alert.alert("asdf")}}/>
                  <MainSearchItem  text ={"ასფასფ ადს"} mainTitle={"ტბისლისი"} onPress={()=>{Alert.alert("asdf")}}/>
                  <MainSearchItem  text ={"ასფასფ ადს"} mainTitle={"ტბისლისი"} onPress={()=>{Alert.alert("asdf")}}/>
                  <MainSearchItem  text ={"ასფაawawdსფ ადს"} mainTitle={"ტბისლawdaისი"} onPress={()=>{Alert.alert("asdf")}}/>
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
    height:  36,
    marginTop : 12,
    zIndex:4,
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