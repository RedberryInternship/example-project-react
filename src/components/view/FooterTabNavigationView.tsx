import React, {ReactElement} from 'react'
import {View, StatusBar, StyleSheet} from 'react-native'
import {Defaults} from 'utils'
import {useSafeArea} from 'react-native-safe-area-context'
import {TabNavigationButtons} from 'components'
import {determineTimePeriod} from 'utils/mapAndLocation/mapFunctions'
import Imgs from '../../../assets/images'

// Vobi todo: no any
const FooterTabNavigator = (props: any): ReactElement => {
  // Vobi todo: use destructure { navigation }
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
      ]}>
      <TabNavigationButtons
        active={currentRouteName === 'Home'}
        navigate={() => {
          props.navigation.setParams({})
          navigate('Home')
        }}
        image={Imgs.mapPin}
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
        image={Imgs.charge}
      />
      {Defaults.token != null && Defaults.token != '' && (
        <TabNavigationButtons
          navigate={navigate.bind(FooterTabNavigator, 'Favorites')}
          image={Imgs.favorite}
          active={currentRouteName === 'Favorites'}
        />
      )}
      <TabNavigationButtons
        navigate={navigate.bind(FooterTabNavigator, 'drawer')}
        image={Imgs.menu}
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
