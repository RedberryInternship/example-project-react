import React, {useContext, ReactElement} from 'react'
import {ScrollView, View, StyleSheet, Text} from 'react-native'
import {
  BaseHeader,
  FavoriteChargerListItem,
  BaseText,
  FetchedDataRenderer,
} from 'components'
import {Colors, Defaults} from 'utils'
import {deleteToFavorites} from 'hooks/actions/rootActions'
import {AppContext} from '../../../App'
import {getLocaleText} from 'utils/localization/localization'
import {AppContextType, Favorite, Charger} from 'allTypes'
import {useTranslation} from 'react-i18next'
import {ScreenPropsWithNavigation} from 'allTypes'

const Favorites = ({navigation}: ScreenPropsWithNavigation): ReactElement => {
  const {t} = useTranslation()
  const context: AppContextType = useContext(AppContext)

  const deleteFavoriteCharger = (chargerId: number): void => {
    deleteToFavorites(chargerId, context.dispatch)
  }

  const turonOnHandler = (id: number): void => {
    const charger =
      context.state.AllChargers?.filter((val: Charger) => val.id == id) ?? []
    // Vobi Todo: what is this operator ?? and why do we need to use it
    // it same as
    // let messages: string = "3"
    // console.log(messages ?? "ee")  // under the hood => messages !== null && messages !== void 0 ? messages : "ee"

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
                deleteItem={deleteFavoriteCharger.bind(
                  Favorites,
                  val.charger_id,
                )}
              />
            )}
            fetchData={() => Promise.resolve(context.state.favoriteChargers)}
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
