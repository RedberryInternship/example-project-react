import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { selectUser } from 'state/selectors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BaseButton from 'components/BaseButton'
import { Defaults } from 'utils'
import {
  getAndRequestLocation,
  isLocationEnabled,
} from 'utils/location'
import images from 'assets/images'
import HomeMainSearchView from '../HomeMainSearchView'
import OnMapRoundButton from '../OnMapRoundButton'
import HomeFilterView from '../HomeFilterView'
import { HomeMainFC } from './types'

const HomeMainComponent: HomeMainFC = (
  {
    handleMapFilterClick,
    selectedFiltersOnMap,
    allChargers,
    setShowAll,
    mainInputRef,
    mapRef,
  },
) => {
  const { navigate } = useNavigation()
  const insets = useSafeAreaInsets()
  const homeState = useSelector((state) => state.home)
  const { authStatus } = useSelector(selectUser)

  return (
    <View
      style={[styles.container, { paddingTop: insets.top }]}
      pointerEvents="box-none"
    >
      {authStatus === 'success' ? null : (
        <BaseButton
          image={images.user}
          onPress={() => navigate('AuthStack', { screen: 'Auth' })}
          text="home.authorization"
          style={styles.authorizeBtn}
          imageStyle={styles.authorizeBtnImage}
          testID="AuthButton"
        />
      )}
      <View style={styles.onMapRoundContainer} pointerEvents="box-none">
        <OnMapRoundButton
          style={styles.onMapRoundBtn}
          onPress={(): void => {
            Defaults.modal.current?.customUpdate(true, {
              type: 2,
            })
          }}
          image={images.alertCircle2}
        />
        <HomeMainSearchView
          allChargers={allChargers}
          mapRef={mapRef}
          setShowAll={setShowAll}
          ref={mainInputRef}
        />
      </View>
      <View style={styles.modalContainer} pointerEvents="box-none">
        <View style={styles.modalOnMapRoundContainer} />

        <OnMapRoundButton
          style={styles.modalOnMapRound}
          onPress={(): void => {
            if (isLocationEnabled()) {
              getAndRequestLocation()
            } else {
              mapRef.current?.locate()
            }
          }}
          image={homeState.locationImageType}
          imageStyle={styles.onMapRoundImage}
        />
        <HomeFilterView
          selectedFiltersOnMap={selectedFiltersOnMap}
          handleMapFilterClick={handleMapFilterClick}
        />
      </View>
    </View>
  )
}

export default React.memo(HomeMainComponent)

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  authorizeBtn: {
    marginTop: 12,
  },
  authorizeBtnImage: {
    marginLeft: 10,
    tintColor: 'white',
    width: 15,
    height: 15,
  },
  onMapRoundContainer: {
    zIndex: 44,
    elevation: 12,
    height: 100,
    flex: 1,
  },
  onMapRoundBtn: {
    backgroundColor: '#FFFFFF',
    width: 38,
    height: 38,
    borderRadius: 19,
    position: 'absolute',
    marginTop: 60,
    right: 24,
    alignSelf: 'flex-end',
  },
  onMapRoundImage: {
    width: 24,
    height: 24,
  },
  modalContainer: {
    flex: 0,
    position: 'relative',
  },
  modalOnMapRound: {
    right: 24,
    bottom: 138,
    backgroundColor: '#FFFFFF',
  },
  modalOnMapRoundContainer: {
    flex: 0,
    position: 'absolute',
    right: 0,
    bottom: 130,
    paddingRight: 24,
    paddingBottom: 60,
    backgroundColor: 'transparent',
  },
})
