import React from 'react'
import { useSelector } from 'react-redux'
import { View, StatusBar, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'
import { selectChargingProcess } from 'state/selectors'
import { TabNavigationButtons } from 'components'
import { isAuthenticated } from 'helpers/user'
import images from 'assets/images'
import { useNavigation } from '@react-navigation/native'
import { useCurrentRoute } from 'hooks'
import defaults from 'utils/defaults'
import { zoomOut } from './config'
import { inArray } from './helpers'

const homeScreens = ['Home', 'HomeTabNavigation']
const chargeWithCodeScreens = ['ChargerStack', 'NotAuthorized', 'ChargerWithCode', 'ChargerDetail']
const chargingScreens = ['Charging']
const favoritesScreens = ['Favorites']

const FooterTabNavigator = () => {
  const { chargingState } = useSelector(selectChargingProcess)
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const currentRouteName = useCurrentRoute()
  defaults.activeRoute = currentRouteName

  const navigate = (name: string): void => {
    if (name === 'drawer') {
      return (navigation as any).openDrawer()
    }

    navigation.navigate(name, { mode: null })
  }

  return (
    <View
      style={[
        styles.bottomTabContainer,
        { paddingBottom: insets.bottom, height: 65 + insets.bottom },
      ]}
    >
      <TabNavigationButtons
        active={inArray(homeScreens, currentRouteName)}
        navigate={() => {
          navigation.setParams({})
          navigation.navigate('HomeTabNavigation', {
            screen: 'Home',
          })
        }}
        image={images.mapPin}
      />
      <TabNavigationButtons
        active={inArray(chargeWithCodeScreens, currentRouteName)}
        navigate={() => {
          isAuthenticated()
            ? navigation.navigate('ChargerStack', { screen: 'ChargerWithCode' })
            : navigation.navigate('HomeTabNavigation', {
              screen: 'NotAuthorized',
            })
        }}
        image={images.chargeWithCode}
      />
      {chargingState.length > 0 && isAuthenticated() && (
        <Animatable.View
          animation={zoomOut}
          iterationCount="infinite"
          duration={1500}
          useNativeDriver
          delay={2000}
          easing="ease-in-out-cubic"
        >
          <TabNavigationButtons
            navigate={() => navigation.navigate('HomeTabNavigation', {
              screen: 'Charging',
            })}
            image={images.charge}
            active={inArray(chargingScreens, currentRouteName)}
          />
        </Animatable.View>
      )}
      {isAuthenticated() && (
        <TabNavigationButtons
          navigate={() => navigation.navigate('HomeTabNavigation', { screen: 'Favorites' })}
          image={images.favorite}
          active={inArray(favoritesScreens, currentRouteName)}
        />
      )}
      <TabNavigationButtons
        navigate={() => navigate('drawer')}
        image={images.menu}
        active={false}
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
