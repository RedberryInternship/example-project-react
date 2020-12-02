import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import * as Const from 'utils/const'
import { PartnerItemFC } from 'screens/drawer/partners/types'

const PartnerItem: PartnerItemFC = ({ image }) => (
  <View style={styles.partnerImageContainer}>
    <Image
      source={{ uri: image }}
      style={styles.image}
      resizeMode="contain"
    />
  </View>
)

export default PartnerItem

const styles = StyleSheet.create(
  {
    partnerImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 32,
      width: (Const.Width - 64) / 3,
      height: 80,
    },
    image: {
      width: 80,
      height: 40
    }
  }
)
