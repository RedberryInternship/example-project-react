import React, {useRef} from 'react';
import { StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import  { Marker } from 'react-native-maps'; 


const styles = StyleSheet.create({
  container : {
    width:50, 
    height:50,
    borderRadius:25,
    justifyContent:"center",
    alignItems:"center",
    position: "absolute",
    elevation:1,
    backgroundColor:"#008AEE"
  },
});

const onMapRoundButton = ({lat, lng, name} : any) => {
  return (
    <Marker
      tracksViewChanges={false}
      collapsable={true}
      coordinate={{latitude : lat, longitude: lng}}
      anchor={{x:0.5, y:0.5}}
    >
      <View style={{width:20, height:20, backgroundColor:"red"}}>
        
      </View>
    </Marker>
  );
};


export default onMapRoundButton;
