import React, {ReactElement} from 'react'
import {View, StatusBar, StyleSheet} from 'react-native'
import {useSafeArea} from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'

import {TabNavigationButtons} from 'components'
import {determineTimePeriod} from 'utils/mapAndLocation/mapFunctions'
import {Defaults} from 'utils'
import images from 'assets/images'

const FooterTabNavigator = (props: any): ReactElement => {
  const currentRouteName =
    props.navigation.state.routes[props.navigation.state.index].key
  const insets = useSafeArea()

  const navigate = (name: string): void => {
    if (name === 'drawer') return props.navigation.openDrawer()
    props.navigation.navigate(name, {mode: null})
  }

  if (currentRouteName !== 'Home') {
    StatusBar.setBarStyle('light-content')
  } else {
    StatusBar.setBarStyle(
      determineTimePeriod() ? 'dark-content' : 'light-content',
    )
  }

  return (
    <View
      style={[
        styles.bottomTabContainer,
        {paddingBottom: insets.bottom, height: 65 + insets.bottom},
      ]}
    >
      <TabNavigationButtons
        active={currentRouteName === 'Home'}
        navigate={() => {
          props.navigation.setParams({})
          navigate('Home')
        }}
        image={images.mapPin}
      />
      <TabNavigationButtons
        active={
          currentRouteName === 'chargerStack' ||
          currentRouteName === 'NotAuthorized'
        }
        navigate={navigate.bind(
          FooterTabNavigator,
          Defaults.token ? 'chargerStack' : 'NotAuthorized',
        )}
        image={images.charge}
      />
      {props.screenProps.chargingState.length > 0 && !!Defaults.token && (
        <Animatable.View
          animation={zoomOut}
          iterationCount={'infinite'}
          duration={1500}
          useNativeDriver={true}
          easing={'ease-in-out-cubic'}
        >
          <TabNavigationButtons
            navigate={navigate.bind(FooterTabNavigator, 'Charging')}
            image={images.charge}
            active={currentRouteName === 'Charging'}
          />
        </Animatable.View>
      )}

      {Defaults.token != null && Defaults.token != '' && ( // Vobi Todo: !Defaults.token will do same
        <TabNavigationButtons
          navigate={navigate.bind(FooterTabNavigator, 'Favorites')}
          image={images.favorite}
          active={currentRouteName === 'Favorites'}
        />
      )}
      <TabNavigationButtons
        navigate={navigate.bind(FooterTabNavigator, 'drawer')}
        image={images.menu}
        active={currentRouteName === 'drawer'}
      />
    </View>
  )
}
export default FooterTabNavigator

const styles = StyleSheet.create({
  bottomTabContainer: {
    backgroundColor: '#111314',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})

const zoomOut = {
  0: {
    opacity: 1,
    scale: 1.3,
  },
  0.5: {
    opacity: 0.7,
    scale: 1.1,
  },
  1: {
    opacity: 1,
    scale: 1.3,
  },
}
