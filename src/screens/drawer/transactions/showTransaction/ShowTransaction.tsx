import React from 'react'
import {
  StyleSheet,
  Platform,
  Image,
  View,
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import BaseHeader from 'components/BaseHeader'
import BaseText from 'components/BaseText'
import { Colors } from 'utils'
import {
  TransactionsHistoryResponseItem,
  FCWithNavigation,
} from 'types'
import images from 'assets/images'
import DetailsItem from './components/TransactionDetailsItem'

const ShowTransactions: FCWithNavigation = ({ navigation }) => {
  const { t } = useTranslation()
  const { params } = useRoute<any>()
  const {
    penalty_duration,
    user_card_pan,
    charger_name,
    charge_power,
    charge_price,
    penalty_fee,
    start_date,
    duration,
    address,
  }: TransactionsHistoryResponseItem = params.order

  const fullPrice = (): string => `${+(charge_price ?? 0) + +(penalty_fee ?? 0)}₾`
  const penaltyFee = (): string => `${penalty_fee ?? 0} ${t('gel')}`
  const durationInMins = (): string => `${duration ?? '00:00'}`
  const shouldNotRender = (): boolean => !duration && !penalty_fee && !charge_price

  return (
    <View style={styles.container}>
      <BaseHeader title="transactions.transactions" onPressLeft={navigation.goBack} />
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerInnerContainer}>
            <Image source={images.creditCard} style={styles.transactionIcon} resizeMode="contain" />
            <View style={styles.titleDateTimeContainer}>
              <BaseText style={styles.title}>
                {charger_name}
              </BaseText>
              <BaseText style={styles.dateAndTime}>
                {start_date}
              </BaseText>
            </View>
          </View>
          <BaseText style={styles.price}>{fullPrice()}</BaseText>
        </View>
        <BaseText style={styles.detailsCopy}>
          {t('transactions.details')}
        </BaseText>
        {!shouldNotRender() && (
          <View style={styles.detailsContainer}>
            {
              duration
              && <DetailsItem name={t('transactions.chargeFee')} value={`${charge_price ?? 0} ₾`} />
            }
            {
              duration
              && <DetailsItem name={t('transactions.duration')} value={durationInMins()} />
            }
            {
              charge_power
              && <DetailsItem name={t('transactions.power')} value={charge_power} />
            }
            {
              penalty_fee
              && <DetailsItem name={t('transactions.penaltyFee')} value={penaltyFee()} />
            }
            {
              penalty_fee
              && <DetailsItem name={t('transactions.penaltyDuration')} value={penalty_duration} />
            }
          </View>
        )}
        <View style={styles.addressFieldContainer}>
          <DetailsItem name={t('transactions.address')} value={address} />
        </View>
        <View style={styles.cardDetailsContainer}>
          <BaseText style={styles.cardNumberCopy}>
            {t('transactions.cardNumber')}
          </BaseText>
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
    backgroundColor: Colors.secondaryGray,
    borderRadius: 10,
    margin: 16,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.secondaryGrey,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 18,
  },
  headerInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
  },
  transactionIcon: {
    marginTop: 10,
    height: 30,
  },
  titleDateTimeContainer: {
    display: 'flex',
    marginBottom: 8,
    marginLeft: 5,
  },
  title: {
    fontSize: 15,
    letterSpacing: 0.2,
    marginTop: 16,
    color: Colors.primaryBackground,
  },
  dateAndTime: {
    fontSize: 13,
    color: Colors.primaryGray,
    letterSpacing: 0.2,
  },
  price: {
    marginTop: 12,
    fontSize: 36,
    letterSpacing: 0,
    color: Colors.primaryGold,
    fontFamily: 'FiraGO-Book',
    fontWeight: 'bold',
  },
  detailsCopy: {
    color: Colors.primaryWhite,
    backgroundColor: Colors.primaryBlue,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 16,
    paddingTop: 15,
    paddingBottom: Platform.OS === 'ios' ? 10 : 16,
    paddingLeft: 32,
    fontSize: 15,
    letterSpacing: 0.2,
  },
  detailsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryLightGrey,
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  addressFieldContainer: {
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
