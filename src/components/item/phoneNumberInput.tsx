/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { BaseInput, BasePickerSelect } from "../"
import {  Ajax, Defaults } from '../../../src/utils';
import { useTranslation } from 'react-i18next';
import { PhoneCountryCodesData, PhoneCountryCode } from '../../../@types/allTypes';
import { Item } from 'react-native-picker-select';


let pickeritems : Item[] = []

// eslint-disable-next-line react/display-name
const phoneNumberInput = React.forwardRef(({ _this, onSubmit, onBlur, onFocus, style, errorText, codeRef }: any, ref: any) => {
 
  const [animation] = useState(new Animated.Value(0))
  const pickerRef = useRef(null)
  const [showSelector, setShowSelector] = useState(false)
  const [selectedCountryCode, setSelectedCountryCode] = useState({label :"+995", value : "+995"})
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

  const phoneTextHandler= (text : string) =>{
    _this.current.phone  =selectedCountryCode.value
    if(text !==""){
      codeRef && codeRef.current && codeRef.current.activateButton()
    }
  }

  const fetchPhoneCountryCodes = () =>{
    if(pickeritemsState.length === 0){
      Ajax.get("/phone-codes")
      .then(({data} : PhoneCountryCodesData) =>{
        data.forEach((val :PhoneCountryCode) =>{
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
        onSubmit={onSubmit}
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
          // onPress={() => Alert.alert("sf")}
          style={styles.touchableStyle}
          hitSlop={{ top: 10, bottom: 10, left: 15, right: 15 }}
        >
          <BasePickerSelect 
            onDone={onPickerDone}
            onChange={onPickerChange}
            items={pickeritemsState}
            placeholder={selectedCountryCode}
            value={selectedCountryCode}
            ref={pickerRef}
            onOpen={phoneTextHandler(" ")}
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
