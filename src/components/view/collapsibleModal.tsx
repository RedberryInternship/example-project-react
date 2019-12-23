/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */

import React, {useRef, forwardRef, useState} from 'react';
import {StyleSheet,  View,Dimensions, Text, Alert, Image, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useTranslation } from 'react-i18next';
import { GNOME, Const } from '../../../src/utils';
import CustomSlideUpModal  from '../customSlideUpModal';
import { FlatList, TouchableOpacity,TextInput } from 'react-native-gesture-handler';
import { MainSearchItem, HomeMainSearchInput, PopupFilter } from '../';
import Colors from '../../../src/utils/colors';


const screenHeight = Dimensions.get('screen').height;

enum ScrollPositionStatus{ top, onScroll}

type  _This = {
  text : string,
  scrollPositionStatus : ScrollPositionStatus
}

const collapsibleModal = forwardRef((props, ref : any) => {
  const _this  = useRef<_This>({text: '', scrollPositionStatus  : ScrollPositionStatus.top});
  const InputRef  :any = useRef(null);
  const flatListRef  :any = useRef(null);
  const {t} = useTranslation();
  const [visible, setVisible] = useState(true);
  
  const handleOpen = () => {
    setVisible(true);
  };
  
  const handleClose = () => {
    setVisible(false);
  };


  const textHandler = (text : string) =>{
    _this.current.text = text;

  }

  const InputSubmit = () =>{

  }

  const closeClick = () =>{
    InputRef.current.setNativeProps({
      text : ''
    })
    _this.current.text = '';
    InputRef.current.blur();
    Keyboard.dismiss();
    setTimeout(()=>{Keyboard.dismiss()}, 400)
  }
  
  const renderHeaderComponent = () =>(
    <View style={styles.headerComponent}>
      <Text style={styles.headerComponentText}>
        {t("home.allChargers")}
      </Text>
    </View>
  )
  return (
    <CustomSlideUpModal 
      height={screenHeight- 200}
      minHeight={55}
      onSwipePerformed={(status: string, y : any) => {
      }}
      flatListRef={flatListRef}
      onClose={() =>{InputRef.current.blur(),Keyboard.dismiss(); closeClick();  }}
      onOpen={()=>{}}
      _this={_this}
    >
      <View style={{marginHorizontal:24,}}>
        {renderHeaderComponent()}
        <View style={ [styles.inputStyle, { borderBottomWidth:1, borderBottomColor: Colors.primaryBackground}]} >
          <Image  source={require("../../../assets/images/icons/icon-search.png")}   style={{width:16, height:16, resizeMode:"contain" ,position:"absolute"}}/>
            <TextInput
              style={{paddingLeft : 40, marginRight : 32, color : Colors.primaryWhite,height:40}}
              placeholder={`${t("home.location")}/${t("home.organization")}`}
              keyboardType={"default"}
              onChangeText={textHandler}
              onSubmitEditing={InputSubmit}
              // onFocus={onFocus}
              placeholderTextColor={Colors.primaryWhite}
              allowFontScaling={false}
              ref={InputRef}
              autoCorrect={false}
              editable={true}
              autoCapitalize={"none"}
              returnKeyType={"go"}
              testID={"mainInput"}
            />
          <TouchableWithoutFeedback
            onPress={closeClick}
            hitSlop={{top : 15, bottom : 15, left : 15, right :15}}
            style={{backgroundColor:"red" }}
          >
            <Image  source={require("../../../assets/images/icons/Delete.png")}   style={{width:16, height:16, resizeMode:"contain", position:"absolute", right: 0}}/>
          </TouchableWithoutFeedback>
        </View>
        <FlatList 
          data={[""]}
          contentContainerStyle={{}}
          ref={flatListRef}
          // bounces={false}
          onScroll={(event)=> {
            if(event.nativeEvent.contentOffset.y > 0)
              _this.current.scrollPositionStatus = ScrollPositionStatus.onScroll; 
            else 
              _this.current.scrollPositionStatus = ScrollPositionStatus.top; 

            console.log(_this.current.scrollPositionStatus, event.nativeEvent.contentOffset.y);
          }}
          showsVerticalScrollIndicator={false}
          onResponderTerminationRequest={(event)=>{return true}}
          
          renderItem={({item})=>(
            <>
              <View style={{flexDirection:"row", flexWrap:"wrap", marginVertical: 16}}>
                <PopupFilter text={"asdfasdf"} onPress={() =>Alert.alert("asd")}  />
                <PopupFilter text={"asdfasdf"} onPress={() =>Alert.alert("asd")}  />
                <PopupFilter text={"asdfasdf"} onPress={() =>Alert.alert("asd")}  />
                <PopupFilter text={"asdfasdf"} onPress={() =>Alert.alert("asd")}  />
                <PopupFilter text={"asdfasdf"} onPress={() =>Alert.alert("asd")}  />
                <PopupFilter text={"asdfasdf"} onPress={() =>Alert.alert("asd")}  />
              </View>
              <MainSearchItem  text ={"ასფასფ ადს"} mainTitle={"ტბისლისი"} onPress={()=>{Alert.alert("asdf")}}/>
              <MainSearchItem  text ={"ასფასფ ადს"} mainTitle={"ტბისლისი"} onPress={()=>{Alert.alert("asdf")}}/>
              <MainSearchItem  text ={"ასფასფ ადს"} mainTitle={"ტბისლისი"} onPress={()=>{Alert.alert("asdf")}}/>
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
      
    </CustomSlideUpModal>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  headerComponent : {
    justifyContent:"center",
    alignItems:"center"
  },
  headerComponentText : {
    flex: 0,
    fontSize:11,
    lineHeight:22,
    color:"#FFFFFF",
    fontFamily : GNOME.DEJAVU_BOLD
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
    height:  36,
    position:"relative",
    paddingBottom:4,
    marginHorizontal:16,
    marginTop: 32,
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

export default collapsibleModal;
