import React, {} from 'react';
import {  Text,  View, Image, StyleSheet} from 'react-native';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../../src/utils';


const chargerDetailTopInfo = ({onMapPress, onPress,} : any) => {

  const {t} = useTranslation();
  
  return (
      <View style={styles.container}>
        <View style={{flexDirection:"row", justifyContent:"space-between",  flex:1}}>
          <View style={{flex:1, justifyContent:"space-between",}}>
            <Text style={{fontSize:13, color:"white", opacity:0.8}}>პარკინგის სერვისი რაღაცა</Text>
            <Text style={{fontSize:15, color:"white", fontWeight:"bold"}} >კოდი:#234</Text>
          </View>
          <View style={{}}>
            <TouchableOpacity 
             onPress={onPress}
             style={{width:50, height:50, borderRadius:25, backgroundColor : "#0199F016", justifyContent:"center", alignItems:"center"}}
            >  
              <Image  source={require("../../../assets/images/icons/ic_favorite.png")} style={{width:23, height:23, resizeMode:"contain", tintColor : Colors.primaryBlue}}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height:24}}/>
        <View style={{flexDirection:"row", justifyContent:"space-between",  flex:1}}>
          <View style={{flex:1,justifyContent:"space-between"}}>
            <View  style={{flexDirection:"row", justifyContent:"flex-start", alignItems:'center',}}>
              <Image  source={require("../../../assets/images/icons/ic_map_pin.png")} style={{width:19, height:19, resizeMode:"contain"}}/>
              <Text style={{color : Colors.primaryGray, fontSize:11, marginLeft:8,}} numberOfLines={1}>aaasdas</Text>
            </View>
            <TouchableOpacity 
              onPress={onMapPress}
              style={{flexDirection:"row",justifyContent:"flex-start", alignItems:"center" }}
            >  
              <Text style={{color : Colors.primaryGreen, fontSize:13, marginLeft:8,}} numberOfLines={1}>{t("chargerDetail.seeOnMap")}</Text>
              <Image  source={require("../../../assets/images/icons/arrow_right.png")} style={{width:23, height:23, resizeMode:"contain", tintColor: Colors.primaryGreen}}/>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent:"flex-end"}}>
          <TouchableOpacity 
            onPress={onMapPress}
            style={{flexDirection:"row",justifyContent:"center", alignItems:"center", backgroundColor:Colors.primaryBlue, height:41, borderRadius:6, width:100 }}
            >  
              <Image  source={require("../../../assets/images/icons/corner-up-right.png")} style={{width:28, height:28, resizeMode:"contain"}}/>
              <Text style={{color : Colors.primaryWhite, fontSize:13, marginLeft:8, fontWeight:"bold"}} numberOfLines={1}>1.3კს</Text>
            
            </TouchableOpacity>
          </View>      
        </View>
      </View>
  );
};


const styles = StyleSheet.create({
  container : {
    justifyContent:"space-between", 
    alignItems:"stretch", 
    padding : 16, 
    backgroundColor:Colors.primaryBlue.concat("16"), 
    borderRadius:8,
    height : 152
  }

})

export default chargerDetailTopInfo;
