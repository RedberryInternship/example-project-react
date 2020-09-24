import React, {useContext, ReactElement, useEffect} from 'react'
import {ScrollView, View, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'

import {ScreenPropsWithNavigation, AppContextType, Charger} from 'allTypes'

import {BaseHeader, FetchedDataRenderer} from 'components'
import {Colors, Defaults} from 'utils'
import {deleteToFavorites, getFavoriteChargers} from 'hooks/actions/rootActions'
import {AppContext} from '../../../../App' //
import {getLocaleText} from 'utils/localization/localization'
import {FavoriteChargerListItem} from './components'

const Favorites = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const {t} = useTranslation()
  const context: AppContextType = useContext(AppContext)

  useEffect(() => {
    // Vobi todo: this way of fetching data is not understandable 
    // you getFavoriteChargers but it is not shown where it goes
    // it is better to do
    // const favoriteChargers = await getFavoriteChargers()
    // dispatch(chargersFetched(favoriteChargers)
    // or even dispatch(getFavoriteChargers())
    getFavoriteChargers(context.dispatch)
  }, [])

  const deleteFavoriteCharger = (chargerId: number): void => {
    deleteToFavorites(chargerId, context.dispatch)
  }

  const turnOnOnHandler = (id: number): void => {
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
    <View style={styles.mainContainer}>
      <BaseHeader title={'favourites.favourites'} />
      <ScrollView style={styles.container}>
        {
          <FetchedDataRenderer
            property={'Favourites'}
            onItemRender={(val): ReactElement => (
              <FavoriteChargerListItem
                key={val.id}
                title={getLocaleText(val.name)}
                address={getLocaleText(val.location)}
                turnon={turnOnOnHandler.bind(Favorites, val.id)}
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
  mainContainer: {flex: 1, backgroundColor: Colors.primaryBackground},
  container: {
    paddingVertical: 32,
  },
  notFound: {
    margin: 32,
    alignSelf: 'center',
  },
})
