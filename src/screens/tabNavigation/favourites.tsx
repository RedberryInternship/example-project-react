import React, { useContext } from 'react';
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
import { AppContext } from '../../../App';
import { getLocaleText } from '../../../src/utils/localization/localization';
import { AppContextType, Favorite } from '../../../@types/allTypes';

const favourites = () => {

  const context : AppContextType = useContext(AppContext)

  const deleteFavoriteCharger = () =>{

  }

  const turonOnHandler = () =>{

  }

  
  return (
    <View style={{flex:1, backgroundColor: Colors.primaryBackground}}>
      <BaseHeader
        title={'favourites.favourites'}
      />
      <ScrollView style={styles.container} >
      {
        context.state.favoriteChargers?.map((val : Favorite, index : number) =>(
          <FavouriteChargerListItem
            key={index}
            title={getLocaleText (val.name) }
            address={getLocaleText (val.location)}
            turnon={turonOnHandler.bind(favourites, val.id)}
            deleteItem={deleteFavoriteCharger.bind(favourites,val.id )} 
          />
        ))
      }
        
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