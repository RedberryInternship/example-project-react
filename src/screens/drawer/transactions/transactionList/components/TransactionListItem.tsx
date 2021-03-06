import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native'
import { Colors } from 'utils'
import images from 'assets/images'
import BaseText from 'components/BaseText'
import { TransactionItemFC } from 'screens/drawer/transactions/transactionList/types'

const TransactionListItem: TransactionItemFC = (
  {
    charger_name,
    start_date,
    charge_price,
    onPress,
  },
) => {
  const chargePrice = `${charge_price ?? 0} ₾`

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <BaseText style={styles.title}>{charger_name}</BaseText>
          <BaseText style={styles.dateAndTime}>{start_date}</BaseText>
          <BaseText style={styles.price}>
            {chargePrice}
          </BaseText>
        </View>
        <View style={styles.iconsContainer}>
          <Image source={images.creditCard} style={styles.transactionIcon} />
          <Image source={images.arrowRight} style={styles.arrowIcon} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default TransactionListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.secondaryGrey,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 16,
  },
  iconsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  transactionIcon: {
    width: 28,
    height: 21,
  },
  arrowIcon: {
    width: 28,
    height: 20,
    tintColor: Colors.blackish,
    marginTop: 20,
  },
  textContainer: {
    display: 'flex',
    marginLeft: 8,
  },
  title: {
    letterSpacing: 0.2,
    color: Colors.primaryBackground,
    fontSize: 15,
    lineHeight: 24,
  },
  dateAndTime: {
    color: Colors.primaryGray,
    letterSpacing: 0.2,
    fontSize: 13,
    lineHeight: 24,
  },
  price: {
    fontSize: 24,
    letterSpacing: 0.2,
    fontWeight: 'bold',
    color: Colors.primaryGold,
    marginTop: 5,
  },
})
