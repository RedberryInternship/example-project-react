import React from "react"

import {View,TextInput,Image,StyleSheet} from "react-native"
import { Const, Colors } from "../../../src/utils"

export default  React.forwardRef( (props : any, ref : any) =>{
    return(
        <View >
            <Image source={props.image}  style={{width: 16,height: 16,position: 'absolute',left: 12.5,bottom: 12.5,zIndex:22}} resizeMode="contain"/>
            <TextInput 
                style={[styles.Input]}
                placeholder={props.placeholder}
                keyboardType={props.keyboardType ?props.keyboardType :  "default"}
                onChangeText={props.onChangeText}
                onSubmitEditing={props.onSubmit}
                onFocus={props.onFocus}
                placeholderTextColor={Colors.primaryWhite}
                allowFontScaling={false}
                value={props.value}
                ref={ref}
                secureTextEntry={props.secure}
                autoCorrect={false}
                editable={true}
                autoCapitalize={"none"}
                returnKeyType={props.returnKeyType}
                testID={props.testID}
                {...props}
            />
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
        backgroundColor : "transparent",
        paddingLeft:50,
        borderRadius : 5,
        flex:1,
        width: "100%",
        color : Colors.primaryWhite

    },
    
})