import React, {useEffect} from 'react'
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native'

import {useTranslation} from 'react-i18next'

// components
import {BaseHeader} from 'components'

// utils
import {Colors} from 'utils'

type DetailsItemType = {
  name: string
  value: string
}

const DetailsItem = ({name, value}: DetailsItemType) => {
  return (
    <View style={styles.detailsItem}>
      <Text style={styles.detailsItemName}>{name}: </Text>
      <Text style={styles.detailsItemValue}>{value}</Text>
    </View>
  )
}

const showTransactions = ({navigation}: any) => {
  const {t} = useTranslation()
  const params = navigation.state.params

  useEffect(() => {
    console.log(params)
  }, [])

  return (
    <View style={styles.container}>
      <BaseHeader
        title={'transactions.transactions'}
        onPressLeft={() => navigation.goBack()}
      />
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../../assets/images/icons/transaction.png')}
            style={styles.transactionIcon}
          />
          <Text style={styles.title}>{params.title}</Text>
          <Text style={styles.dateAndTime}>
            {' '}
            {params.date} {params.time}
          </Text>
          <Text style={styles.price}>{params.price}</Text>
        </View>

        <Text style={styles.detailsCopy}>{t('transactions.details')}</Text>

        <View style={styles.detailsContainer}>
          <DetailsItem
            name={t('transactions.duration')}
            value={params.duration}
          />
          <DetailsItem name={t('transactions.power')} value={params.power} />
          <DetailsItem name={t('transactions.energy')} value={params.energy} />
        </View>

        <View style={styles.addressConatainer}>
          <DetailsItem
            name={t('transactions.address')}
            value={params.address}
          />
        </View>

        <View style={styles.cardDetailsContainer}>
          <Text style={styles.cardNumberCopy}>
            {t('transactions.cardNumber')}
          </Text>
          <Text style={styles.cardNumber}>{params.cardNumber}</Text>
        </View>
      </View>
      <SafeAreaView />
    </View>
  )
}

export default showTransactions

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
  addressConatainer: {
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
