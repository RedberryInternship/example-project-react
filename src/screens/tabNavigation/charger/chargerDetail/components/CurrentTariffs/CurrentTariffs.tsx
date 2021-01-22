import React from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { BaseText } from 'components'
import images from 'assets/images'
import { CurrentTariffsFC } from './types'
import Row from '../CurrentTariffsRow/CurrentTariffsRow'
import useCurrentTariffs from './useCurrentTariffs'

const CurrentTariffs: CurrentTariffsFC = ({ connector }) => {
  const { t } = useTranslation()
  const {
    toggleTariffs,
    rotateZ,
    height,
  } = useCurrentTariffs({ connector })

  return (
    <TouchableOpacity onPress={toggleTariffs}>
      <Animated.View style={[styles.container, { height }]}>
        <View style={styles.tableHeader}>
          <BaseText style={styles.currentPriceText}>
            {t('chargerDetail.tariffs')}
          </BaseText>
          <Animated.Image
            source={images.caretDown}
            resizeMode="contain"
            style={
              [
                styles.arrow,
                {
                  transform: [{ rotateZ }],
                },
              ]
            }
          />
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
      </Animated.View>
    </TouchableOpacity>
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
    height: 60,
    overflow: 'hidden',
  },
  tableHeader: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 18,
  },
  currentPriceText: {
    color: 'white',
  },
  arrow: {
    height: 8,
    marginRight: 30,
  },
})
