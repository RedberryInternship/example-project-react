import React, {ReactElement} from 'react'
import {View, StyleSheet, Image} from 'react-native'

import {Colors} from 'utils'
import {BaseNativeTouchable, BaseText} from 'components'
import images from 'assets/images'

type CardListItemProps = {
  code: string
  selected: boolean
  onPress: () => void | null | any
}

const CardListItem = ({
  code,
  onPress,
  selected = false,
}: CardListItemProps): ReactElement => {
  const selectedStatus = selected ? (
    <Image source={images.greenTick} style={styles.selectedCardCircle} />
  ) : (
    <View style={styles.selectableCardCircle} />
  )

  return (
    <BaseNativeTouchable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.innerLeftContainer}>
          <Image source={images.creditCard} style={styles.image} />
          <BaseText style={{color: Colors.primaryGray}}>
            {'xxxx xxxx xxxx '}
          </BaseText>
          <BaseText
            style={{
              color: selected ? Colors.primaryWhite : Colors.primaryGray,
            }}
          >
            {code.slice(12, 16)}
          </BaseText>
        </View>
        {selectedStatus}
      </View>
    </BaseNativeTouchable>
  )
}

export default CardListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryDark,
    height: 66,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
  },

  innerLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  image: {
    width: 23,
    height: 23,
    marginHorizontal: 30,
  },
  selectableCardCircle: {
    width: 26.81,
    height: 26.81,
    borderRadius: 15,
    borderColor: Colors.primaryWhite,
    borderWidth: 2,
    marginRight: 20,
  },
  selectedCardCircle: {
    width: 26.81,
    height: 26.81,
    marginRight: 20,
  },
})
