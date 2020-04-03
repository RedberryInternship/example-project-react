import React, {ReactElement} from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'

import {Colors} from 'utils'

type CurrentTariffsProps = {
  data: any
}

const CurrentTariffs = ({data}: CurrentTariffsProps): ReactElement => {
  const {t} = useTranslation()

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.currentPriceText}>
          {t('chargerDetail.currentPrices')}
        </Text>
        <Text style={styles.currentPrice2Text}>
          {t('chargerDetail.currentPrices')}
        </Text>
      </View>
      {data.map((val: any, ind: number) => (
        <Row
          key={ind}
          col1={val.min_kwt + ' ' + t('kwh') + t('from')} // Vobi Todo: use backtick `${val.min_kwt} ${t('kwh)}${t('fom')}` it is more readable
          col2={val.max_kwt + ' ' + t('kwh') + t('till')}
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
      <Text style={styles.rowCol1}>{col1}</Text>
      <Text style={styles.rowCol2}>{col2}</Text>
      <Text style={styles.rowCol3}>{col3}</Text>
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
    letterSpacing: -0.41,
    color: 'white',
  },
  currentPrice2Text: {
    letterSpacing: -0.41,
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
    flex: 1,
    alignSelf: 'center',
    color: Colors.primaryWhite,
    fontSize: 11,
  },
  rowCol3: {
    flex: 1.5,
    alignSelf: 'center',
    color: Colors.primaryWhite,
    fontSize: 11,
    textAlign: 'center',
  },
})
