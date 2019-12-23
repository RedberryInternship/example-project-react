import React from 'react';
import {StyleSheet,TouchableWithoutFeedback, TextInput, Image, View, TouchableOpacity,} from 'react-native';
import { Colors, Const } from '../../utils';




// eslint-disable-next-line react/display-name
const registartionPagination =  React.forwardRef( ({setShowSearchContent, showSearchContent, placeholder, textHandler, InputSubmit, onFocus, closeClick} : any, ref: any) => {


  return (
    <TouchableOpacity
      onPress={() => {setShowSearchContent(!showSearchContent)}}
      style={ [styles.inputStyle,]}
      activeOpacity={1}
    >
      <Image  source={require("../../../assets/images/icons/icon-search.png")}   style={{width:16, height:16, resizeMode:"contain" ,position:"absolute", left:12 }}/>
      <View pointerEvents={showSearchContent ? "auto" : "none"} >
        <TextInput 
          style={{paddingLeft : 40, marginRight : 32, color : Colors.primaryWhite,}}
          placeholder={placeholder}
          keyboardType={"default"}
          onChangeText={textHandler}
          onSubmitEditing={InputSubmit}
          onFocus={onFocus}
          placeholderTextColor={Colors.primaryWhite}
          allowFontScaling={false}
          ref={ref}
          autoCorrect={false}
          editable={true}
          autoCapitalize={"none"}
          returnKeyType={"go"}
          testID={"mainInput"}
          />
      </View>
      <TouchableWithoutFeedback
        onPress={closeClick}
        hitSlop={{top : 15, bottom : 15, left : 15, right :15}}
      >
        <Image  source={require("../../../assets/images/icons/Delete.png")}   style={{width:16, height:16, resizeMode:"contain", position:"absolute", right: 12}}/>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
});


export default registartionPagination;

const styles = StyleSheet.create({
  container : {
    height:30,
    borderRadius:15,
    justifyContent:"center",
    alignItems:"center",
    elevation:1,
    paddingHorizontal:16,
    paddingVertical:4,
    backgroundColor:"white",
    marginHorizontal:8
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