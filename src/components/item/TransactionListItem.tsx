import React, {ReactElement} from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'

// utils
import {Colors} from 'utils'

type TransactionItemProps = {
  title: string
  date: string
  price: string
  onPress: () => void
}

const transactionListItem = ({
  title,
  date,
  price,
  onPress,
}: TransactionItemProps): ReactElement => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.innerLeftContainer}>
          <Image
            source={require('../../../assets/images/icons/transaction.png')}
            style={styles.transactionIcon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.dateAndTime}>{date}</Text>
          </View>
        </View>
        <Text style={styles.price}>{price}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default transactionListItem

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
  innerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 28,
    height: 20,
  },
  textContainer: {
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
    fontSize: 15,
    letterSpacing: 0.2,
    fontWeight: 'bold',
    color: Colors.secondaryBlue,
  },
})
