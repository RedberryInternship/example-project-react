import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import   {useTranslation} from 'react-i18next';
import { MapView, CollapsibleModal, HomeComponentItems } from '../../components';
import { Colors, Const } from '../../../src/utils';

const Home = () => {

  const modalRef : any  = useRef(null);

  return (
    <View style={styles.mainContainer}>
      <MapView />
      <HomeComponentItems />
      <CollapsibleModal ref={modalRef} />
    </View>
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
