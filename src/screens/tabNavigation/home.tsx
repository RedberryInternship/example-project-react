import React, {useRef, createContext, useReducer} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';

import { MapView, CollapsibleModal, HomeComponentItems } from '../../components';
import { Colors } from '../../../src/utils';
import BottomSheetReanimated from '../../../src/components/view/bottomSheetReanimated';
import reducer, { initialState } from '../../../src/hooks/reducers/homeReducers';


export const HomeContext = createContext()

const Home = () => {

  const [state, dispatch] = useReducer(reducer, initialState )


  return (
    <HomeContext.Provider value={{state, dispatch}}>

      <View style={styles.mainContainer}>
        <MapView />
        <HomeComponentItems />
        <BottomSheetReanimated />
      </View>
    </HomeContext.Provider>
    
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
