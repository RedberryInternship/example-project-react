import React from 'react';
import {
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert
} from 'react-native';


import {
  BaseHeader,
  FavouriteChargerListItem
} from '../components';

const favourites = ({ navigation }: any) => {


  return (
    <SafeAreaView>
      <BaseHeader
        title={'favourites.favourites'}
        onPressLeft={() => navigation.goBack()} />

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
    </SafeAreaView>
  )
}

export default favourites;

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    paddingBottom: 32
  }
});