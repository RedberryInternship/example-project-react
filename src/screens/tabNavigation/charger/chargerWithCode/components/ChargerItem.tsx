import React, {ReactElement} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'

import {Colors} from 'utils'
import {BaseButton, BaseText} from 'components'
import images from 'assets/images'

type ChargerItemProps = {
  code: string | number | undefined
  address: string | undefined
  onPress: () => void | undefined
}

const ChargerItem = ({
  code,
  onPress,
  address,
}: ChargerItemProps): ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.codeTextContainer}>
        <BaseText style={styles.codeText}>#{code}</BaseText>
        <View style={styles.addressContainer}>
          <Image source={images.mapPin} style={styles.addressImage} />
          <BaseText style={styles.addressText} numberOfLines={1}>
            {address}
          </BaseText>
        </View>
      </View>
      <BaseButton
        onPress={onPress}
        text={'next'}
        style={styles.buttonStyle}
        imageStyle={{tintColor: Colors.primaryBlue}}
        image={images.arrowRight}
        textStyle={{color: Colors.primaryBlue}}
      />
    </View>
  )
}

export default ChargerItem

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
  codeTextContainer: {
    justifyContent: 'space-between',
    maxWidth: '55%',
  },
  codeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  addressText: {
    color: Colors.primaryGray,
    fontSize: 11,
    marginLeft: 8,
  },
  buttonStyle: {
    marginTop: 0,
    marginHorizontal: 0,
    alignSelf: 'center',
    width: 120,
    backgroundColor: '#0199F033',
  },
  addressImage: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
})
