import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';


import { Colors } from '../../utils';

type ChargerGroupPupupItem = {
  code: string,
  onPress: () => void | null,
  active : boolean,
  text : string
};


const chargerGroupPopupItem = ({ code, onPress, active, text }: ChargerGroupPupupItem) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={!active}
    >
      <View style={styles.container}>
        <Image style={styles.chargerPin}  source={active ? require('../../../assets/images/icons/close.png') : require('../../../assets/images/icons/ic_filterType.png')} />
        <View style={styles.chargerTypeContainer}>
          <Text style={styles.chargerTypeText}>{text}</Text>
          <Text style={styles.chargerCodeText} >#{code}</Text>
        </View>
        <Image style={[styles.goToDetailIcon, {opacity : active ? 1 : 0.2}]}  source={ require('../../../assets/images/icons/Back.png')} />
      </View>
    </TouchableOpacity>
  );
}

export default chargerGroupPopupItem;


const styles = StyleSheet.create({
  container: {
    height: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopColor :Colors.primaryBackground.concat("33"),
    borderTopWidth:1,
  },
  chargerPin : {
    width:26, 
    height: 32, 
    resizeMode:"contain" 
  },
  chargerTypeContainer: {
    flex:1,
    alignItems:"flex-start",
    paddingHorizontal: 8,
    justifyContent:"center"
  },
  chargerTypeText : {
    color : "#436880",
    marginBottom:4,
    fontSize:13,
  },
  chargerCodeText : {
    color : "#111314",
    fontSize:11,
  },
  goToDetailIcon : {
    width: 12,
    height : 21
  }

});