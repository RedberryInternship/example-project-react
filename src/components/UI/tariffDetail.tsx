import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

import {Colors} from 'utils'

type Tariff = {
  title: string
  description: string
}

const tariffDetail = ({title, description}: Tariff) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/icons/alert-circle.png')}
        style={styles.image}
      />
      <Text style={styles.description}> {description} </Text>
      <Text style={styles.title}> {title} </Text>
    </View>
  )
}

export default tariffDetail

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryGrey,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingHorizontal: 64,
    paddingVertical: 16,
    marginTop: 32,
    marginBottom: 16,
  },
  image: {
    width: 40,
    height: 40,
  },
  description: {
    color: Colors.primaryBackground,
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 13,
    letterSpacing: 0.3,
  },
  title: {
    color: Colors.secondaryBlue,
    fontSize: 18,
    letterSpacing: 0.3,
  },
})
