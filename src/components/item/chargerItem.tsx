import React from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'
import {Colors} from 'utils'
import {BaseButton} from 'components'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 16,
    height: 81,
    borderRadius: 8,
    backgroundColor: '#08141B',
    marginBottom: 8,
  },
})

type ChargerItem = {
  code: string | undefined
  address: string | undefined
  onPress: () => void | undefined
}

const chargerItem = ({code, onPress, address}: ChargerItem): Element => {
  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'space-between', maxWidth: '55%'}}>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
          #{code}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/images/icons/ic_map_pin.png')}
            style={{width: 17, height: 17, resizeMode: 'contain'}}
          />
          <Text
            style={{color: Colors.primaryGray, fontSize: 11, marginLeft: 8}}
            numberOfLines={1}>
            {address}
          </Text>
        </View>
      </View>
      <BaseButton
        onPress={onPress}
        text={'next'}
        style={{
          marginTop: 0,
          marginHorizontal: 0,
          alignSelf: 'center',
          width: 120,
          backgroundColor: '#0199F033',
        }}
        imageStyle={{tintColor: Colors.primaryBlue}}
        image={require('../../../assets/images/icons/arrow_right.png')}
        textStyle={{color: Colors.primaryBlue}}
      />
    </View>
  )
}

export default chargerItem
