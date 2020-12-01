import React, { ReactElement } from 'react'
import {
  View, TouchableOpacity, StyleSheet, Image,
} from 'react-native'

type BusinessServiceItemProps = {
  image: string
  onPress: () => void
}

const BusinessServiceItem = ({
  image,
  onPress,
}: BusinessServiceItemProps): ReactElement => (
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
