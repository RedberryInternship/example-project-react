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
import { ConnectorTypes } from 'types'
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
        <View>
          <View style={styles.textContainer}>
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
          <View style={styles.textContainer}>
            <BaseText style={styles.currentPriceText}>
              {
                connector?.name === ConnectorTypes.TYPE_2
                  ? t('chargerDetail.powerRange')
                  : t('chargerDetail.timeRange')
              }
            </BaseText>
            <BaseText style={[styles.currentPriceText, styles.stayAwayFromEdge]}>
              {t('chargerDetail.minuteGel')}
            </BaseText>

          </View>
        </View>
        {connector?.charging_prices?.map((val) => (
          <Row
            key={val.id}
            col1={`${val.min_kwt} ${t('kw')}`}
            col2="-"
            col3={`${val.max_kwt} ${t('kw')}`}
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
  textContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    paddingBottom: 18,
  },
  currentPriceText: {
    color: 'white',
  },
  arrow: {
    height: 8,
    marginRight: 30,
  },
  stayAwayFromEdge: {
    marginRight: 15,
  },
})
