import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Button,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';

import   {useTranslation} from 'react-i18next';
import { MapView, CollapsibleModal, HomeComponentItems } from '../../components';

const App = () => {
  const { t, i18n } = useTranslation();

  const modalRef : any  = useRef(null);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
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
    backgroundColor: "blue"

  },
  absoluteContentOverlayContainer : {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent:"center",
  },
  contentOverlayContainer  : {
    flex: 1,
    backgroundColor: "red"

  }
});

export default App;
