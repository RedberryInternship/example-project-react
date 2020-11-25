import React, { ReactElement, useEffect } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { selectUser } from 'state/selectors'
import { ScreenPropsWithNavigation, Charger } from 'allTypes'
import { BaseHeader, FetchedDataRenderer } from 'components'
import { Colors, Defaults } from 'utils'
import {
  removeChargerFromFavorites,
  refreshFavoriteChargers,
} from 'state/actions/userActions'
import { getLocaleText } from 'utils/localization/localization'
import { FavoriteChargerListItem } from './components'

const Favorites = ({ navigation }: ScreenPropsWithNavigation): ReactElement => {
  const { t } = useTranslation()
  const state = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshFavoriteChargers())
  }, [])

  const deleteFavoriteCharger = (chargerId: number) => {
    dispatch(removeChargerFromFavorites(chargerId))
  }

  const turnOnOnHandler = (id: number): void => {
    const charger = state?.AllChargers?.filter((val: Charger) => +val.id === +id) ?? []

    if (charger.length !== 0) {
      navigation.navigate('ChargerDetail', { chargerDetails: charger[0] })
    } else {
      return Defaults.dropdown?.alertWithType(
        'error',
        t('dropDownAlert.chargerNotExist'),
      )
    }
  }

  return (
    <View style={styles.mainContainer}>
      <BaseHeader title="favourites.favourites" />
      <ScrollView style={styles.container}>
        <FetchedDataRenderer
          property="Favourites"
          onItemRender={(val): ReactElement => (
            <FavoriteChargerListItem
              key={val.id}
              title={getLocaleText(val.name)}
              address={getLocaleText(val.location)}
              turnon={turnOnOnHandler.bind(Favorites, val.id)}
              deleteItem={deleteFavoriteCharger.bind(Favorites, val.id)}
            />
          )}
          fetchData={() => Promise.resolve(state?.favoriteChargers)}
          data={state?.favoriteChargers}
        />
      </ScrollView>
    </View>
  )
}

export default Favorites

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: Colors.primaryBackground },
  container: {
    paddingVertical: 32,
  },
  notFound: {
    margin: 32,
    alignSelf: 'center',
  },
})
