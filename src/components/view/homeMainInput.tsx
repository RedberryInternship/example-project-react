import React, {useRef, useState, useEffect} from 'react';
import { StyleSheet, ScrollView,Text,Animated, TouchableWithoutFeedback, View, TouchableOpacity, Image,TextInput ,  Alert} from 'react-native';
import { useMap, useHomeMainInputHook } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { Const, Colors, Defaults } from '../../utils';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { BaseInput, MainSearchItem } from '..';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'


const searchContentHeight = Const.Height - 350;


const MainInput = ({onPress, style, image, imageStyle} : any) => {

  const hook = useHomeMainInputHook();
  
  
  const InputSubmit = () => {
    Alert.alert(JSON.stringify(hook._this.current))
  }

  const onFocus = () => {

  }
  console.log(hook._this.animatedSearchContentHeight);
  
  
  
  return (
    <TouchableOpacity activeOpacity={1} onPress={hook.closeClick} style={[styles.container, {}]}>
      <>
        <Animated.View style={[styles.inputStyleContainer, hook.animate()]}>
          <TouchableOpacity
            onPress={() => {hook.setShowSearchContent(!hook.showSearchContent)}}
            style={ [styles.inputStyle,]}
            activeOpacity={1}
          >
            <Image  source={require("../../../assets/images/icons/icon-search.png")}   style={{width:16, height:16, resizeMode:"contain" ,position:"absolute", left:12 }}/>
            <View pointerEvents={hook.showSearchContent ? "auto" : "none"} >
              <TextInput 
                style={{paddingLeft : 40, marginRight : 32, color : Colors.primaryWhite,}}
                placeholder={`${hook.t("home.location")}/${hook.t("home.organization")}`}
                keyboardType={"default"}
                onChangeText={hook.textHandler}
                onSubmitEditing={InputSubmit}
                onFocus={onFocus}
                placeholderTextColor={Colors.primaryWhite}
                allowFontScaling={false}
                // value={''}
                ref={hook.InputRef}
                autoCorrect={false}
                editable={true}
                autoCapitalize={"none"}
                returnKeyType={"go"}
                testID={"mainInput"}
                />
            </View>
            <TouchableWithoutFeedback
              onPress={hook.closeClick}
              hitSlop={{top : 15, bottom : 15, left : 15, right :15}}
            >
              <Image  source={require("../../../assets/images/icons/Delete.png")}   style={{width:16, height:16, resizeMode:"contain", position:"absolute", right: 12}}/>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
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
              renderItem={({item}) => (
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
    position: "absolute",
    elevation:1,
    
    marginTop : Const.NotchHeight +  (Defaults.token ? 16 : 72) ,
    // zIndex:4444=
  },
  inputStyleContainer : {
    flex:1, 
    width: Const.Width - 48, 
    height:  36,
    position: "relative",
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