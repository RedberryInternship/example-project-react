import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native'
import { BusinessServiceItemFC } from 'screens/tabNavigation/charger/chargerDetail/types'

const BusinessServiceItem: BusinessServiceItemFC = ({ image, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.serviceContainer}>
      <Image source={{ uri: image }} style={styles.serviceImage} />
    </View>
  </TouchableOpacity>
)

export default BusinessServiceItem

const styles = StyleSheet.create({
  serviceContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CD96433',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  serviceImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
})
