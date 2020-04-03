import React, {useContext, ReactElement, useEffect} from 'react'
import {ScrollView, View, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'

import {ScreenPropsWithNavigation, AppContextType, Charger} from 'allTypes'

import {
  BaseHeader,
  FavoriteChargerListItem,
  FetchedDataRenderer,
} from 'components'
import {Colors, Defaults} from 'utils'
import {deleteToFavorites, getFavoriteChargers} from 'hooks/actions/rootActions'
import {AppContext} from '../../../App'
import {getLocaleText} from 'utils/localization/localization'

const Favorites = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const {t} = useTranslation()
  const context: AppContextType = useContext(AppContext)

  useEffect(() => {
    getFavoriteChargers(context.dispatch)
  }, [])

  const deleteFavoriteCharger = (chargerId: number): void => {
    deleteToFavorites(chargerId, context.dispatch)
  }

  const turonOnHandler = (id: number): void => {
    const charger =
      context.state.AllChargers?.filter((val: Charger) => val.id == id) ?? []

    if (charger.length !== 0) {
      navigation.navigate('ChargerDetail', {chargerDetails: charger[0]})
    } else {
      return Defaults.dropdown?.alertWithType(
        'error',
        t('dropDownAlert.chargerNotExist'),
      )
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.primaryBackground}}>
      <BaseHeader title={'favourites.favourites'} />
      <ScrollView style={styles.container}>
        {
          <FetchedDataRenderer
            property={'Favourites'}
            onItemRender={(val, index): ReactElement => (
              <FavoriteChargerListItem
                key={index}
                title={getLocaleText(val.name)}
                address={getLocaleText(val.location)}
                turnon={turonOnHandler.bind(Favorites, val.id)}
                deleteItem={deleteFavoriteCharger.bind(Favorites, val.id)}
              />
            )}
            fetchData={() => Promise.resolve(context.state.favoriteChargers)}
            data={context.state.favoriteChargers}
          />
        }
      </ScrollView>
    </View>
  )
}

export default Favorites

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
  },
  notFound: {
    margin: 32,
    alignSelf: 'center',
  },
})
