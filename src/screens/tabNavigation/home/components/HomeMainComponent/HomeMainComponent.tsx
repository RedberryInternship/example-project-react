import React from 'react'
import { withNavigation } from 'react-navigation'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BaseButton } from 'components'
import { Defaults } from 'utils'
import {
  getAndRequestLocation,
  isLocationEnabled,
} from 'helpers/location'
import images from 'assets/images'
import {
  HomeMainSearchView,
  OnMapRoundButton,
} from '../index'
import { HomeMainFC } from './types'

const HomeMainComponent: HomeMainFC = (
  {
    navigation,
    allChargers,
    mapRef,
    setShowAll,
    mainInputRef,
  },
) => {
  const insets = useSafeAreaInsets()
  const homeState = useSelector((state) => state.home)

  return (
    <View
      style={[styles.container, { paddingTop: insets.top }]}
      pointerEvents="box-none"
    >
      {Defaults.token ? null : (
        <BaseButton
          image={images.user}
          onPress={() => navigation?.navigate('Auth')}
          text="home.authorization"
          style={styles.authorizeBtn}
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
      </View>
    </View>
  )
}

export default withNavigation(React.memo(HomeMainComponent))

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  authorizeBtn: {
    marginTop: 12,
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
