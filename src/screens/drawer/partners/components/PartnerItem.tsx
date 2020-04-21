import React, {ReactElement} from 'react'
import {View, Image, StyleSheet} from 'react-native'

import {Colors, Const} from 'utils'

type PartnerItemProps = {
  image: string
}

const PartnerItem = ({image}: PartnerItemProps): ReactElement => {
  return (
    <View style={styles.partnerImageContainer}>
      <Image
        source={{uri: image}}
        style={{width: 80, height: 40}}
        resizeMode={'contain'}
      />
    </View>
  )
}

export default PartnerItem

const styles = StyleSheet.create({
  partnersInnerContainer: {
    flex: 1,
    backgroundColor: Colors.secondaryGrey,
    marginTop: 32,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    padding: 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  partnerImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    width: (Const.Width - 32) / 3,
    height: 80,
  },
})
