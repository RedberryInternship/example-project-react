<<<<<<< HEAD
import React, {useEffect, ReactElement} from 'react'
=======
import React, {ReactElement} from 'react'
>>>>>>> fd02ad0278b69805524ba8d1eb16c2c8ae8b5ea3
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native'
import {NavigationScreenProp, NavigationState} from 'react-navigation'
import {TransactionListItemType} from './TransactionList'
import {useTranslation} from 'react-i18next'

// components
import {BaseHeader} from 'components'

// utils
import {Colors, getLocaleText} from 'utils'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import {OrderResponse} from 'allTypes'

<<<<<<< HEAD
type DetailsItemType = {
  name: string
  value: string | null
}
type ShowTransactionsProps = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}
const DetailsItem = ({name, value}: DetailsItemType): ReactElement => {
  return (
    <View style={styles.detailsItem}>
      <Text style={styles.detailsItemName}>{name}: </Text>
      <Text style={styles.detailsItemValue}>{value}</Text>
    </View>
  )
=======
// images
import Imgs from '../../../assets/images'

type NavigationStateType = {
  params: TransactionListItemType
}

type ShowTransactionsScreenPropsType = {
  navigation: NavigationScreenProp<NavigationStateType & NavigationState>
>>>>>>> fd02ad0278b69805524ba8d1eb16c2c8ae8b5ea3
}

const ShowTransactions = ({
  navigation,
<<<<<<< HEAD
}: ShowTransactionsProps): ReactElement => {
  const {t} = useTranslation()
  const order: OrderResponse = navigation.getParam('order', [])
=======
}: ShowTransactionsScreenPropsType): ReactElement => {
  const {t} = useTranslation()
  const {
    title,
    date,
    time,
    price,
    duration,
    power,
    energy,
    address,
    cardNumber,
  } = navigation.state.params
>>>>>>> fd02ad0278b69805524ba8d1eb16c2c8ae8b5ea3

  return (
    <View style={styles.container}>
      <BaseHeader
        title={'transactions.transactions'}
        onPressLeft={navigation.goBack}
      />
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
<<<<<<< HEAD
          <Image
            source={require('../../../assets/images/icons/transaction.png')}
            style={styles.transactionIcon}
          />
          <Text style={styles.title}>{getLocaleText(order.charger.name)}</Text>
          <Text style={styles.dateAndTime}> {order.confirm_date}</Text>
          <Text style={styles.price}>{order.price}</Text>
=======
          <Image source={Imgs.transaction} style={styles.transactionIcon} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.dateAndTime}>
            {' '}
            {date} {time}
          </Text>
          <Text style={styles.price}>{price}</Text>
>>>>>>> fd02ad0278b69805524ba8d1eb16c2c8ae8b5ea3
        </View>
        <Text style={styles.detailsCopy}>{t('transactions.details')}</Text>
        <View style={styles.detailsContainer}>
<<<<<<< HEAD
          <DetailsItem
            name={t('transactions.duration')}
            value={order.charge_time}
          />
          {/* TODO */}
          {/* <DetailsItem name={t('transactions.power')} value={order.power} />
          <DetailsItem name={t('transactions.energy')} value={order.energy} /> */}
        </View>
        <View style={styles.addressConatainer}>
          <DetailsItem
            name={t('transactions.address')}
            value={getLocaleText(order.charger.location)}
          />
=======
          <DetailsItem name={t('transactions.duration')} value={duration} />
          <DetailsItem name={t('transactions.power')} value={power} />
          <DetailsItem name={t('transactions.energy')} value={energy} />
        </View>

        <View style={styles.addressFieldConatainer}>
          <DetailsItem name={t('transactions.address')} value={address} />
>>>>>>> fd02ad0278b69805524ba8d1eb16c2c8ae8b5ea3
        </View>
        <View style={styles.cardDetailsContainer}>
          <Text style={styles.cardNumberCopy}>
            {t('transactions.cardNumber')}
          </Text>
<<<<<<< HEAD
          <Text style={styles.cardNumber}>
            {order.payments[0]?.user_card?.masked_pan}
          </Text>
=======
          <Text style={styles.cardNumber}>{cardNumber}</Text>
>>>>>>> fd02ad0278b69805524ba8d1eb16c2c8ae8b5ea3
        </View>
      </View>
      <SafeAreaView />
    </View>
  )
}

export default ShowTransactions
<<<<<<< HEAD
=======

type DetailsItemType = {
  name: string
  value: string
}

const DetailsItem = ({name, value}: DetailsItemType): ReactElement => {
  return (
    <View style={styles.detailsItem}>
      <Text style={styles.detailsItemName}>{name}: </Text>
      <Text style={styles.detailsItemValue}>{value}</Text>
    </View>
  )
}
>>>>>>> fd02ad0278b69805524ba8d1eb16c2c8ae8b5ea3

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: Colors.secondaryLightGrey,
    borderRadius: 10,
    margin: 16,
  },
  headerContainer: {
    backgroundColor: Colors.secondaryGrey,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryLightGrey,
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 32,
  },
  transactionIcon: {
    width: 46,
    height: 33,
  },
  title: {
    fontSize: 15,
    letterSpacing: 0.2,
    marginTop: 16,
    marginBottom: 8,
    color: Colors.primaryBackground,
  },
  dateAndTime: {
    fontSize: 13,
    color: Colors.primaryGray,
    letterSpacing: 0.2,
  },
  price: {
    marginTop: 16,
    fontSize: 17,
    letterSpacing: 0.2,
    color: Colors.secondaryBlue,
  },
  detailsCopy: {
    color: Colors.primaryBackground,
    marginVertical: 16,
    marginLeft: 32,
    fontSize: 15,
    letterSpacing: 0.2,
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.primaryLightGrey,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryLightGrey,
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  detailsItem: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  detailsItemName: {
    fontSize: 13,
    letterSpacing: 0.2,
    color: Colors.primaryGray,
  },
  detailsItemValue: {
    fontSize: 13,
    letterSpacing: 0.2,
    color: Colors.primaryBackground,
  },
  addressFieldConatainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryLightGrey,
    paddingLeft: 32,
    paddingRight: 16,
    paddingVertical: 8,
  },
  cardDetailsContainer: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  cardNumberCopy: {
    fontSize: 13,
    letterSpacing: 0.2,
    color: Colors.primaryBackground,
  },
  cardNumber: {
    fontSize: 13,
    letterSpacing: 0.2,
    color: Colors.primaryGray,
    marginTop: 8,
  },
})
