import React, {useRef, createContext} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { MapView, CollapsibleModal, HomeComponentItems } from '../../components';
import { Colors } from '../../../src/utils';
import BottomSheetReanimated from '../../../src/components/view/bottomSheetReanimated';


const Homecontext = createContext()
const Home = () => {


  const modalRef : any  = useRef(null);

  return (
    <Homecontext.Provider value={{}}>
      <View style={styles.mainContainer}>
        <MapView />
        <HomeComponentItems />
        <BottomSheetReanimated />
      </View>
    </Homecontext.Provider>
    
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position:"relative",
    backgroundColor: Colors.primaryBackground,
    // minHeight : Const.Height
  },
});

export default Home;
