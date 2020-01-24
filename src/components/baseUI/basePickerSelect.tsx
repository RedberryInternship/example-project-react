/* eslint-disable react/display-name */

import React, {useEffect} from "react";
import { View} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { BasePickerSelect } from "../../../@types/allTypes";

export default ({style, placeholder, items, onChange, value, onDone} : BasePickerSelect ) =>{


    return (
        <View style={style}>
            <RNPickerSelect
                placeholder={placeholder}
                items={items}
                onValueChange={onChange}
                style={{inputIOSContainer : {
                    flex:0,
                    width:"100%",
                    height:50,
                    alignSelf:"flex-start",
                    alignItems:"flex-start",
                    justifyContent:"center",
                },inputAndroidContainer :{
                    flex:0,
                    width:"100%",
                    height:50,
                    alignSelf:"flex-start",
                    alignItems:"flex-start",
                    justifyContent:"center",
                },inputIOS : {
                    fontSize:15,
                    color : "#000000",
                },inputAndroid : {
                    fontSize:15,
                    color : "#000000",
                },
                placeholder:{
                    color : "#00000050",
                    fontSize:15
                },iconContainer: {
                    top: 15,
                    right: 15,
                  },
                }}
                onDonePress={onDone}
                // value={value}
                useNativeAndroidPickerStyle={false}
            />   
        </View>
    );
}
