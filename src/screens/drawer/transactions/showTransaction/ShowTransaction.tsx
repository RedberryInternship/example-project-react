/* eslint-disable @typescript-eslint/camelcase */
import React, {ReactElement} from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import {useTranslation} from 'react-i18next'
import {SafeAreaView} from 'react-navigation'

// components
import {BaseHeader, BaseText} from 'components'

// utils
import {Colors, getLocaleText} from 'utils'
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation'
import {TransactionsHistoryResponseItem} from 'allTypes'
import images from 'assets/images'

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
      <BaseText style={styles.detailsItemName}>{name}: </BaseText>
      <BaseText style={styles.detailsItemValue}>{value ?? ''}</BaseText>
    </View>
  )
}

const ShowTransactions = ({
  navigation,
}: ShowTransactionsProps): ReactElement => {
  const {t} = useTranslation()
  const {
    charger_name,
    address,
    duration,
    penalty_fee,
    charge_power,
    start_date,
    charge_price,
    user_card_pan,
  }: TransactionsHistoryResponseItem = navigation.getParam('order', [])

  const penaltyFee      = (): string => (`${penalty_fee ?? 0} ${t('gel')}`)
  const chargePrice     = (): string => (`${charge_price ?? 0} ${t('gel')}`) 
  const durationInMins  = (): string => (`${duration ?? 0} ${t('minute')}`)

  const shouldNotRender    = (): boolean => (! duration) && (! penalty_fee ) && (! charge_price)

  return (
    <View style={styles.container}>
      <BaseHeader
        title={'transactions.transactions'}
        onPressLeft={navigation.goBack}
      />
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Image source={images.transaction} style={styles.transactionIcon} />
          <BaseText style={styles.title}> {charger_name} </BaseText>
          <BaseText style={styles.dateAndTime}> {' '} { start_date } </BaseText>
          <BaseText style={styles.price}>{chargePrice()}</BaseText>
        </View>
        <BaseText style={styles.detailsCopy}> {t('transactions.details')} </BaseText>
        { ! shouldNotRender() && <View style={styles.detailsContainer}>
          {duration     && ( <DetailsItem name={t('transactions.duration')}    value={durationInMins()}  /> )}
          {charge_power && ( <DetailsItem name={t('transactions.power')}       value={charge_power}      /> )}
          {penalty_fee  && ( <DetailsItem name={t('transactions.penaltyFee')}  value={penaltyFee()}      /> )}
        </View> }
        <View style={styles.addressFieldConatainer}>
          <DetailsItem name={t('transactions.address')} value={address} />
        </View>
        <View style={styles.cardDetailsContainer}>
          <BaseText style={styles.cardNumberCopy}> {t('transactions.cardNumber')} </BaseText>
          <BaseText style={styles.cardNumber}>{user_card_pan ?? ''}</BaseText>
        </View>
      </View>
      <SafeAreaView />
    </View>
  )
}

export default ShowTransactions

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
