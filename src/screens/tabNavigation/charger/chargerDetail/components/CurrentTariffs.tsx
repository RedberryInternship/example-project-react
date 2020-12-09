import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { BaseText } from 'components'
import { CurrentTariffsFC } from 'screens/tabNavigation/charger/chargerDetail/types'
import Row from './CurrentTariffsRow'

const CurrentTariffs: CurrentTariffsFC = ({ connector }) => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <BaseText style={styles.currentPriceText}>
          {
            connector?.pivot?.connector_type_id === 2
              ? t('chargerDetail.minutes')
              : t('chargerDetail.kw')
          }
        </BaseText>
        <BaseText style={styles.currentPrice2Text}>
          {t('chargerDetail.tariffs')}
        </BaseText>
      </View>
      {connector?.charging_prices?.map((val) => (
        <Row
          key={val.id}
          col1={`${val.min_kwt} ${t('kwh')}`}
          col2="-"
          col3={`${val.max_kwt} ${t('kwh')}`}
          col4={val.price}
        />
      ))}
      {connector?.fast_charging_prices?.map((val) => (
        <Row
          key={val.id}
          col1={`${val.start_minutes} ${t('minute')}`}
          col2="-"
          col3={`${val.end_minutes} ${t('minute')}`}
          col4={val.price}
        />
      ))}
    </View>
  )
}

export default CurrentTariffs

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
})
