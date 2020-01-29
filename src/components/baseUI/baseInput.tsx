import React, {useState, useImperativeHandle, useRef} from "react"

import {View,TextInput,Text,Image,StyleSheet} from "react-native"
import { Colors } from "../../../src/utils"
import {useTranslation} from 'react-i18next';
import { BaseInput } from "../../../@types/allTypes";

// eslint-disable-next-line react/display-name
export default  React.forwardRef( (props : BaseInput, ref : any) =>{

  const { t } = useTranslation();
  const inputRef : any = useRef(null)

  const [errorText, setErrorText] = useState('')
    
  useImperativeHandle(ref,
    () => (
      {
        ...inputRef.current,
        errorText : setErrorText
      }
    ),
  )
  
  const _onChangeText = (text : string) =>{
    props.onChangeText && props.onChangeText(text)
    setErrorText('')
  }

  return(
    <View style={{flex:0,marginVertical:16, marginBottom:8 }}>
      <Text style={styles.title}>{t(props.title)}</Text>
      <View style={{width:"100%", position:"relative"}}>
        {
          props.image && <Image source={props.image}  style={[{width: 24,flex:-1, height: 24,position: 'absolute',left: 12.5,bottom: 12.5,zIndex:22,alignSelf:"center"}, {...props.imageStyle}]} resizeMode="contain"/>
        }
        <TextInput
          {...props}
          placeholder={props.placeholder}
          keyboardType={props.keyboardType ?props.keyboardType :  "default"}
          onChangeText={_onChangeText}
          onSubmitEditing={props.onSubmit}
          onFocus={props.onFocus}
          placeholderTextColor={Colors.primaryWhite}
          allowFontScaling={false}
          ref={inputRef}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
          secureTextEntry={props.secure || false}
          autoCorrect={false}
          editable={true}
          autoCapitalize={"none"}
          returnKeyType={props.returnKeyType}
          testID={props.testID}
          style={[styles.Input, props.style, {
              paddingLeft :  props.image ? 50 :props.paddingLeft || 20,
              borderColor:errorText ? "#FF3B3B" : "transparent",
          }
          ]}
        />
        { props.required && <Text style={{position:"absolute", right:8, top:8, color:"white", fontSize:18}}>*</Text> }
      </View>
      <Text style={[styles.errorText,{opacity:errorText ? 1 : 0 }]}>{errorText ? t(errorText) : ' '}</Text>
    </View>
  )
})

const styles = StyleSheet.create({
    containerInput : {
        flex:0,
        justifyContent: "center",
        alignItems : "flex-start",
        height : 50,
        width:"100%",
        // backgroundColor:"red"
    },
    title : {
        flex: 0,
        width:"100%",
        fontSize:13, 
        color : Colors.primaryGray, 
        marginBottom:8
    },
    Input: {
        backgroundColor : Colors.primaryDark,
        borderRadius : 6,
        flex:0,
        flexGrow:1,
        width: "100%",
        color : Colors.primaryWhite,
        height:48,
        borderWidth : .5
    },
    errorText : {
        flex: 0,
        width:"100%",
        fontSize:13, 
        color : "#FF3B3B", 
        marginTop:4
    }
})