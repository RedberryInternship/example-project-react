import React from 'react'
import {Text, View, TouchableWithoutFeedback, Image} from 'react-native'
import {Colors} from 'utils'

const chooseCardOnCharging = ({lastDigits, active, onPress}: any) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 48,
          marginVertical: 8,
          marginHorizontal: 16,
        }}>
        <Image
          source={require('../../../assets/images/icons/credit-card.png')}
          style={{width: 21, height: 21, resizeMode: 'contain', marginRight: 8}}
        />
        <Text style={{fontSize: 13, color: Colors.primaryWhite}}>
          XXXXXXXXXX {lastDigits}
        </Text>
        <View
          style={{
            alignItems: 'flex-end',
            alignSelf: 'center',
            flex: 1,
            justifyContent: 'center',
            marginRight: 12,
          }}>
          <Image
            source={
              active
                ? require('../../../assets/images/icons/green_checkmark.png')
                : require('../../../assets/images/icons/cicle.png')
            }
            style={{width: 28, height: 28, resizeMode: 'contain'}}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default chooseCardOnCharging
