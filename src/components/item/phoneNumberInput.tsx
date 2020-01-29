/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Platform } from 'react-native';
import { BaseInput, BasePickerSelect } from "../"
import {  Ajax, Defaults } from '../../../src/utils';
import { useTranslation } from 'react-i18next';
import { PhoneCountryCodesData, PhoneCountryCode } from '../../../@types/allTypes';
import { Item } from 'react-native-picker-select';


let pickeritems : Item[] = []

const placeholder = {label :"+995", value : "+995"}
// eslint-disable-next-line react/display-name

const phoneNumberInput = React.forwardRef(({ _this, onSubmit, onBlur, onFocus, style, errorText, codeRef }: any, ref: any) => {
 
  const [animation] = useState(new Animated.Value(0))
  const pickerRef = useRef(null)
  const [showSelector, setShowSelector] = useState(false)
  const [selectedCountryCode, setSelectedCountryCode] = useState({label :"", value : ""})
  const [pickeritemsState, setPickeritemsState] = useState(pickeritems)
  const { t } = useTranslation();
  
  useEffect(() => {
    fetchPhoneCountryCodes()
  }, [])

  const _onChange = (e: any, show = true) => {

    show ? onFocus && onFocus(e) : onBlur && onBlur(e);

    if(_this.current && _this.current.phone !== '' && !show){
      return
    }

    setShowSelector(show)

    Animated.timing(animation, {
      toValue: show ? 1 : 0,
      duration: 500,
    }).start()
  }

  const phoneTextHandler = (text : string) =>{
    console.log(selectedCountryCode);
    _this.current.phone  =  selectedCountryCode.value + text;
    if(text !== "" ){
      codeRef && codeRef.current && codeRef.current.activateButton();
    }
    else{
      codeRef && codeRef.current && codeRef.current.disableActivateButton();
    }
  }

  const _onSubmit= () =>{
    _this.current.phone = (selectedCountryCode.value == '' ?placeholder.value : selectedCountryCode.value)  + _this.current.phone

    onSubmit()
  }
  const fetchPhoneCountryCodes = () =>{
    if(pickeritemsState.length === 0){
      Ajax.get("/phone-codes")
      .then(({data} : PhoneCountryCodesData) =>{
        // pickeritems.push({value :  "+995", label : "+995"})

        data.forEach((val :PhoneCountryCode) =>{
          if (val.phone_code)
            pickeritems.push({value : val.phone_code, label : val.phone_code})
        } )
        setPickeritemsState(pickeritems)
      })
      .catch(error =>{
        Defaults.dropdown.alertWithType("success", t("dropDownAlert.registration.codeSentSuccessfully"))
      })
    }
    
  }
  const onPickerDone = () =>{
    ref.current.focus()
  }
  const onPickerChange = (val : string, index: number) =>{
    setSelectedCountryCode({label :val, value : val})
    // phoneTextHandler.bind(phoneNumberInput,'')
    if(Platform.OS == "android") ref.current.focus()
  }



  const imageAnimatedOpacity = animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  return (
    <View style={{ flex: 0, position: "relative" }} >
      <View pointerEvents={"none"} style={styles.imageContainer}>
        <Animated.Image
          source={require("../../../assets/images/icons/phone.png")}
          style={[styles.image, {opacity: imageAnimatedOpacity }]}
          resizeMode="contain" />
      </View>
      
      <BaseInput
        paddingLeft={showSelector  ? 64 : undefined}
        style={style}
        keyboardType={"phone-pad"}
        onChangeText={phoneTextHandler}
        onSubmit={_onSubmit}
        onFocus={_onChange}
        onBlur={(e: any) => _onChange(e, false)}
        ref={ref}
        testID={"loginPhone"}
        title={"authentication.number"}
        returnKeyType={"send"}
        errorText={errorText}
      />
      <Animated.View style={{ position: "absolute", width: 53, height:48, opacity: animation, bottom : 28 }}>
        <View
          style={styles.touchableStyle}
        >
          <BasePickerSelect 
            onDone={onPickerDone}
            onChange={onPickerChange}
            items={pickeritemsState}
            placeholder={placeholder}
            // value={selectedCountryCode}
            ref={pickerRef}
            // onOpen={phoneTextHandler.bind(phoneNumberInput,' ')}
          />
        </View>
      </Animated.View>
    </View>
  );
});


export default phoneNumberInput;


const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    elevation: 1,
    backgroundColor: "#008AEE"
  },
  touchableStyle: {
    marginVertical: 4,
    borderRightWidth: 1,
    flex: 1,
    borderRightColor: "#9A99A255",
    justifyContent: "center"
  },
  imageContainer : {
    width: 24,
    flex: -1,
    height: 24,
    position: 'absolute',
    left: 13,
    top: 52,
    zIndex: 22,
  },
  image: {
    width: 24,
    height: 24,
  }
});
