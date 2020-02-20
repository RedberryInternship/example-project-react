import React, {useContext} from 'react'
import {ScrollView, View, StyleSheet, Text} from 'react-native'

import {BaseHeader, FavouriteChargerListItem} from 'components'
import {Colors, Defaults} from 'utils'
import {deleteToFavorites} from 'hooks/actions/rootActions'
import {AppContext} from '../../../App'
import {getLocaleText} from 'utils/localization/localization'
import {AppContextType, Favorite, Charger} from 'allTypes'
import {useTranslation} from 'react-i18next'

const favourites = ({navigation}: any) => {
  // Vobi Todo: No any types
  // Vobi Todo: Correct name is Favorites
  const {t} = useTranslation()
  const context: AppContextType = useContext(AppContext)

  const deleteFavoriteCharger = (charger_id: number) => {
    deleteToFavorites(charger_id, context.dispatch)
  }

  const turonOnHandler = (id: number) => {
    const charger =
      context.state.AllChargers?.filter((val: Charger) => val.id == id) ?? []
    // Vobi Todo: what is this operator ?? and why do we need to use it

    if (charger.length !== 0) {
      navigation.navigate('ChargerDetail', {chargerDetails: charger[0]})
    } else {
      return Defaults.dropdown.alertWithType(
        'error',
        t('dropDownAlert.chargerNotExist'),
      )
    }
  }
  // const { state: { favoriteChargers } } = context
  //
  //

  return (
    <View style={{flex: 1, backgroundColor: Colors.primaryBackground}}>
      <BaseHeader title={'favourites.favourites'} />
      <ScrollView style={styles.container}>
        {context.state.favoriteChargers &&
        context.state.favoriteChargers?.length > 0 ? (
          context.state.favoriteChargers?.map(
            (val: Favorite, index: number) => (
              <FavouriteChargerListItem
                key={index}
                title={getLocaleText(val.name)}
                address={getLocaleText(val.location)}
                turnon={turonOnHandler.bind(favourites, val.id)}
                deleteItem={deleteFavoriteCharger.bind(
                  favourites,
                  val.charger_id,
                )}
              />
            ),
          )
        ) : (
          <Text style={{margin: 32, alignSelf: 'center', color: 'white'}}>
            {t('notFound')}
          </Text>
        )}
        {/* Vobi Todo: move above script to following */}
        {/* !favoriteChargers.length && 
        <Text style={styles.notFound}>{t("notFound")}</Text>
      */}

        {/* favoriteChargers?.length && favoriteChargers?.map((val : Favorite, index : number) => (
              <FavouriteChargerListItem
                key={index}
                title={getLocaleText (val.name) }
                address={getLocaleText (val.location)}
                turnon={turonOnHandler.bind(favourites, val.id)}
                deleteItem={deleteFavoriteCharger.bind(favourites,val.charger_id )} 
              />
            ))
      */}
      </ScrollView>
    </View>
  )
}

export default favourites

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
  },
  // notFound: {
  //   margin: 32,
  //   alignSelf:"center",
  //   color:"white"
  // }
})
