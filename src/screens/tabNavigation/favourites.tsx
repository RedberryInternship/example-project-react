import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Alert
} from 'react-native';


import {
  BaseHeader,
  FavouriteChargerListItem
} from '../../components';
import { Colors } from '../../../src/utils';

const favourites = () => {


  return (
    <View style={{flex:1, backgroundColor: Colors.primaryBackground}}>
      <BaseHeader
        title={'favourites.favourites'}
      />
      <ScrollView style={styles.container} >
        <FavouriteChargerListItem
          title='თბილისი მოლი'
          address='საიათნოვას ქუჩა'
          turnon={() => Alert.alert("this is a turnon!")}
          deleteItem={() => Alert.alert("this deletes the item!")} />

        <FavouriteChargerListItem
          title='ლილო მოლი'
          address='ლუბლიანას ქუჩა'
          turnon={() => Alert.alert("this is a turnon!")}
          deleteItem={() => Alert.alert("this deletes the item!")} />


      </ScrollView>
    </View>
  )
}

export default favourites;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32
  }
});