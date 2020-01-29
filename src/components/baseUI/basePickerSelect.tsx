/* eslint-disable react/display-name */

import React, {useEffect, forwardRef} from "react";
import { View} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import { BasePickerSelect } from "../../../@types/allTypes";

export default forwardRef( ({style, placeholder, items, onChange, value, onDone, onOpen } : BasePickerSelect, ref ) =>{


    return (
        <View style={style}>
            <RNPickerSelect
                placeholder={placeholder}
                items={items}
                onValueChange={onChange}
                style={{inputIOSContainer : {
                    height:48,
                    alignItems:"center",
                    justifyContent:"center",
                },inputAndroidContainer :{            
                    height:48,
                    alignItems:"center",
                    justifyContent:"center",
                },inputIOS : {
                    fontSize:13,
                    color : "white",
                },inputAndroid : {
                    fontSize:13,
                    color : "white",
                },
                placeholder:{
                    color : "white",
                    fontSize:13
                }
                }}
                onDonePress={onDone}
                // value={value}
                useNativeAndroidPickerStyle={false}
                ref={ref}
                onOpen={onOpen}
            />   
        </View>
    );
})
