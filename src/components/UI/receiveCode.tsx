import React, {useRef,useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView,Text,TextInput,  View, TouchableOpacity, Animated, Alert} from 'react-native';
import { useMap } from '../../hooks';
import { Colors } from '../../utils';
import MaskedView from '@react-native-community/masked-view';
import colors from '../../../src/utils/colors';
import { useTranslation } from 'react-i18next';


const CodeInputWidth = 128

const receiveCode = React.forwardRef( ({onChangeText, onSubmit,onFocus, active} : any, ref: any) => {

  const [animation, setAnimation] = useState(new Animated.Value(CodeInputWidth))
  const [disabled, setDisabled] = useState(false)
  const [showText, setShowText] = useState(false)
  const { t, i18n } = useTranslation();
  

  const codeReceiveHandler = () => {
    if(disabled) return;
    setDisabled(true)
    animation.setValue(0)
    setShowText(true)
    //ajax
    Animated.timing(animation, {
      toValue:CodeInputWidth,
      duration:2000
    }).start(()=>{
      setDisabled(false)
    })

    
  }
  
  return (
    <View style={{marginVertical:16}}>
      <Text style={{flex: 0,width:"100%",fontSize:13, color : Colors.primaryGray, marginBottom:8}}>{t("authentication.forgotPasswordPage.smsCode")}</Text>
      <View style={{flexDirection:"row",backgroundColor:colors.primaryBackground, marginBottom:8 }}>
        <TouchableOpacity activeOpacity={1} onPress={codeReceiveHandler} style={{position:"relative",  width: 128, height:48,backgroundColor:"#879299", borderRadius:6, }}>
          <Animated.View style={[styles.codeReceive, {width:animation}]}/>
          <MaskedView
            style={{  flexDirection: 'row', height: '100%'}}
            maskElement={
              <View style={{justifyContent:"center", flex:1, alignItems:"center"}}>
                <Animated.Text style={[styles.codeReceiveText,]}>
                  {t("authentication.forgotPasswordPage.receiveCode")}
                </Animated.Text>
              </View>
            }
          >
            <Animated.View style={{ flex: 0, height: '100%',width:animation, backgroundColor: '#009AF0' }} />
            <Animated.View style={{ flex: 1, height: '100%', backgroundColor: '#000000' }} />
          </MaskedView>
        </TouchableOpacity>
        <TextInput 
          style={styles.codeTextInput}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          onFocus={onFocus}
          placeholderTextColor={Colors.primaryWhite}
          allowFontScaling={false}
          ref={ref}    
        />
      </View>
      <Animated.Text style={{color:Colors.primaryGray, fontSize:11, }}>{showText && t("authentication.forgotPasswordPage.codeValidity")}</Animated.Text>
    </View>
  );
});


export default receiveCode;

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
  codeReceive : {
    width: 128, 
    height:48, 
    borderRadius : 6, 
    backgroundColor:"blue", 
    justifyContent:"center", 
    alignItems:"center", 
    position:"absolute"
  },
  codeReceiveText : {
    fontSize:13, 
    color : "#009AF0", 
    letterSpacing:0.2,
  },
  codeTextInput : {
    flex:1,
    marginLeft:12,
    borderRadius:6, 
    backgroundColor:colors.primaryDark, 
    flexGrow:1,
    paddingHorizontal:8,
    color:Colors.primaryWhite
  }
});