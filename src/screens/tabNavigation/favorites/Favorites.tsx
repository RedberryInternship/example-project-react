import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { FCWithNavigation } from 'types'
import BaseHeader from 'components/BaseHeader'
import FetchedDataRenderer from 'components/FetchedDataRenderer'
import colors from 'utils/colors'
import { getLocaleText } from 'utils/localization/localization'
import { selectUser } from 'state/selectors'
import { FavoriteChargerListItem } from './components'
import useFavorites from './useFavorites'

const Favorites: FCWithNavigation = ({ navigation }) => {
  const {
    deleteFavoriteCharger,
    turnOnOnHandler,
  } = useFavorites(navigation)
  const state = useSelector(selectUser)

  return (
    <View style={styles.mainContainer}>
      <BaseHeader title="favourites.favourites" />
      <ScrollView style={styles.container}>
        <FetchedDataRenderer
          property="Favourites"
          onItemRender={(val) => (
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
  mainContainer: { flex: 1, backgroundColor: colors.primaryBackground },
  container: {
    paddingVertical: 32,
  },
  notFound: {
    margin: 32,
    alignSelf: 'center',
  },
})
