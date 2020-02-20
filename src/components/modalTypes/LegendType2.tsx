/* eslint-disable react/display-name */
import React, {ReactElement} from 'react'
import {Text, View, TouchableOpacity, Image} from 'react-native'
import {Colors} from 'utils'
import {LegendItem, LegendColorItem} from 'components'
import {useTranslation} from 'react-i18next'

const legendTypes = [
  {
    text: 'popup.fastNonCommercial',
    image: require('../../../assets/images/icons/Delete.png'),
  },
  {
    text: 'popup.fastCommercial',
    image: require('../../../assets/images/icons/Frame.png'),
  },
  {
    text: 'popup.lvl2NonCommercial',
    image: require('../../../assets/images/icons/Frame.png'),
  },
  {
    text: 'popup.lvl2Commercial',
    image: require('../../../assets/images/icons/Frame.png'),
  },
]
const legendColorTypes = [
  {text: 'popup.busy', color: '#FF9500'},
  {text: 'popup.notWorking', color: '#FF3B3B'},
  {text: 'popup.free', color: '#3FD560'},
]
type LegendType2Props = {
  onPress: () => void
}
const LegendType2 = ({onPress}: LegendType2Props): ReactElement => {
  const {t} = useTranslation()
  return (
    <>
      <View style={{alignItems: 'stretch'}}>
        <Text
          style={{
            fontSize: 17,
            lineHeight: 22,
            color: Colors.primaryBackground,
            marginBottom: 32,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          {t('popup.legend')}
        </Text>
        {legendTypes &&
          legendTypes.map((val, ind) => <LegendItem key={ind} {...val} />)}
        <View style={{marginHorizontal: 16, marginVertical: 24}}>
          <View
            style={{
              borderBottomWidth: 1,
              opacity: 0.1,
              height: 0,
              borderBottomColor: Colors.primaryBackground,
              width: '100%',
            }}
          />
        </View>
        <View
          style={{
            flex: 0,
            flexDirection: 'row',
            marginRight: 32,
            flexWrap: 'wrap',
          }}>
          {legendColorTypes &&
            legendColorTypes.map((val, ind) => (
              <LegendColorItem key={ind} {...val} />
            ))}
        </View>
      </View>
      <View style={{alignItems: 'stretch'}}>
        <TouchableOpacity
          style={{
            borderRadius: 25,
            width: 50,
            height: 50,
            backgroundColor: '#0199F011',
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          onPress={onPress}>
          <Image
            source={require('../../../assets/images/icons/close.png')}
            style={{
              width: 28,
              height: 28,
              resizeMode: 'contain',
              alignSelf: 'center',
              tintColor: Colors.primaryBlue,
            }}
          />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default LegendType2
