import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; 

import React, {useRef, forwardRef, useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View,Dimensions, Text} from 'react-native';
import { useMap } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { GNOME } from '../../../src/utils';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import CustomSlideUpModal  from '../customSlideUpModal';


const screenHeight = Dimensions.get('screen').height;



const collapsibleModal =forwardRef((props, ref : any) => {
  const modalRef = useRef<CustomSlideUpModal>(null);
  const {t, i18n} = useTranslation();
  const [visible, setVisible] = useState(true);
  
  const handleOpen = () => {
    setVisible(true);
  };
  
  const handleClose = () => {
    setVisible(false);
  };
  // const onOpen = () => {
  //   const modal = modalRef.current;
  //   // i18n.changeLanguage(i18n.language === 'ka' ? 'en' : 'ka');
  //   if (modal) {
  //     modal.open();
  //   }
  // };

  const renderHeaderComponent = () =>(
    <View style={styles.headerComponent}>
      <Text style={styles.headerComponentText}>
        {t("home.allChargers")}
      </Text>
    </View>
  )
  return (
    <CustomSlideUpModal 
      ref={ref}
      height={screenHeight- 200}
      minHeight={55}
      onSwipePerformed={(status: string, y : any) => {
      }}
    >
      {renderHeaderComponent()}
    </CustomSlideUpModal>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  headerComponent : {
    justifyContent:"center",
    alignItems:"center"
  },
  headerComponentText : {
    flex: 0,
    fontSize:11,
    lineHeight:22,
    color:"#FFFFFF",
    fontFamily : GNOME.DEJAVU_BOLD
  }
});

export default collapsibleModal;
