/* eslint-disable @typescript-eslint/camelcase */
import React, {ReactElement} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'

import {Colors} from 'utils'
import {ChargerConnectorType} from 'allTypes'
import {BaseText} from 'components'

type CurrentTariffsProps = {
  connector?: ChargerConnectorType
}

const CurrentTariffs = ({connector}: CurrentTariffsProps): ReactElement => {
  const {t} = useTranslation()
  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <BaseText style={styles.currentPriceText}>
          {t('chargerDetail.currentPrices')}
        </BaseText>
        <BaseText style={styles.currentPrice2Text}>
          {t('chargerDetail.minutesPrice')}
        </BaseText>
      </View>
      {connector?.charging_prices?.map((val, ind: number) => (
        <Row
          key={ind}
          col1={`${val.min_kwt} ${t('kwh')} ${t('from')}`}
          col2={`${val.max_kwt} ${t('kwh')} ${t('till')}`}
          col3={val.price}
        />
      ))}
      {connector?.fast_charging_prices?.map((val, ind: number) => (
        <Row
          key={ind}
          col1={`${val.start_minutes} ${t('minute')} ${t('from')}`}
          col2={`${val.end_minutes} ${t('minute')} ${t('till')}`}
          col3={val.price}
        />
      ))}
    </View>
  )
}

export default CurrentTariffs

type RowProps = {
  col1: string
  col2: string
  col3: string
}
const Row = ({col1, col2, col3}: RowProps): ReactElement => {
  return (
    <View style={styles.rowContainer}>
      <BaseText style={styles.rowCol1}>{col1}</BaseText>
      <BaseText style={styles.rowCol2}>{col2}</BaseText>
      <BaseText style={styles.rowCol3}>{col3}</BaseText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#08141B',
    borderRadius: 8,
    marginVertical: 16,
    padding: 12,
  },
  tableHeader: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentPriceText: {
    color: 'white',
  },
  currentPrice2Text: {
    fontSize: 11,
    color: '#A1A8AB',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderTopColor: '#11222D',
    borderTopWidth: 1,
  },
  rowCol1: {
    flex: 1,
    alignSelf: 'center',
    color: Colors.primaryWhite,
    fontSize: 11,
  },
  rowCol2: {
    flex: 1.2,
    alignSelf: 'center',
    color: Colors.primaryWhite,
    fontSize: 11,
    flexWrap: 'nowrap',
  },
  rowCol3: {
    flex: 0.8,
    alignSelf: 'center',
    color: Colors.primaryWhite,
    fontSize: 11,
    textAlign: 'center',
  },
})
