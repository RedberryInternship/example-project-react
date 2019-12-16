import React from "react"

import {View,TextInput,Text,Image,StyleSheet} from "react-native"
import { Const, Colors } from "../../../src/utils"
import {useTranslation} from 'react-i18next';

export default  React.forwardRef( (props : any, ref : any) =>{

    const { t, i18n } = useTranslation();

    return(
        <View style={{flex:0,marginVertical:16}}>
            <Text style={{flex: 0,width:"100%",fontSize:13, color : Colors.primaryGray, marginBottom:8}}>{t(props.title)}</Text>
            <View style={{width:"100%", position:"relative"}}>
                {
                    props.image && <Image source={props.image}  style={[{width: 24,flex:-1, height: 24,position: 'absolute',left: 12.5,bottom: 12.5,zIndex:22,alignSelf:"center"}, {...props.imageStyle}]} resizeMode="contain"/>
                }
                <TextInput
                    style={[styles.Input, {paddingLeft :  props.image ? 50 :props.paddingLeft || 20}]}
                    placeholder={props.placeholder}
                    keyboardType={props.keyboardType ?props.keyboardType :  "default"}
                    onChangeText={props.onChangeText}
                    onSubmitEditing={props.onSubmit}
                    onFocus={props.onFocus}
                    placeholderTextColor={Colors.primaryWhite}
                    allowFontScaling={false}
                    // value={props.value}
                    ref={ref}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    secureTextEntry={props.secure || false}
                    autoCorrect={false}
                    editable={true}
                    autoCapitalize={"none"}
                    returnKeyType={props.returnKeyType}
                    testID={props.testID}
                    {...props}
                />
            </View>
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
    Input: {
        backgroundColor : Colors.primaryDark,
        borderRadius : 6,
        flex:0,
        flexGrow:1,
        width: "100%",
        color : Colors.primaryWhite,
        height:48,
    },
})