import { StackNavigationOptions } from '@react-navigation/stack'
import { Colors } from 'utils'

export const chargerStackOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
  // gestureDirection: 'horizontal',
  cardStyle: {
    backgroundColor: 'transparent',
    opacity: 1,
  },
}

export const authStackOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyle: {
    backgroundColor: 'transparent',
    opacity: 1,
  },
}

export const drawerMenuOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyle: {
    backgroundColor: Colors.primaryBackground,
    opacity: 1,
    backfaceVisibility: 'hidden',
  },
}

export const transactionStackOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyle: {
    backgroundColor: 'transparent',
    opacity: 1,
  },
}

export const mainStackOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  cardStyle: {
    backgroundColor: Colors.primaryBackground,
    backfaceVisibility: 'hidden',
    opacity: 1,
  },
}
