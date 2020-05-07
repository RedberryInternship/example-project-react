/* eslint-disable @typescript-eslint/camelcase */
import React, {ReactElement} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'

import {Const, Colors} from 'utils'
import {Pulse, CountDown, BaseButton} from 'components'
import images from 'assets/images'
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
} from 'react-navigation'
import {ChargingState} from 'allTypes'

const CircleDiameter = Const.Width - 150

type ChargingViewProps = {
  hook: {
    t: any
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
    onFinish: (charger_connector_type_id: number) => void
  }
  chargingState: ChargingState
  singleCharger?: boolean
}
const ChargingView = ({
  hook: {t, navigation, onFinish},
  chargingState: {consumed_money, already_paid, order_id, start_charging_time},
  singleCharger,
}: ChargingViewProps): ReactElement => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.MainChargerCircleContainer}>
        <Pulse
          color="transparent"
          numPulses={3}
          diameter={Const.Width - 40}
          initialDiameter={CircleDiameter}
          speed={20}
          duration={1200}
          pulseStyle={styles.pulseStyle}
        />
        <View style={styles.MainChargerCircle}>
          <Image
            source={images.chargerWithGradient}
            style={styles.chargerImage}
          />
          <CountDown startTime={start_charging_time} alarm={false} up={true} />
        </View>
      </View>
      <View style={styles.pricingView}>
        <Text style={styles.currentlyChargedPrice}>{consumed_money} / </Text>
        <Text style={styles.finalPrice}>
          {already_paid} {t('gel')}
        </Text>
      </View>
      <View style={styles.chargeAnotherCarContainer}>
        {singleCharger && (
          <TouchableOpacity
            onPress={navigation.navigate.bind(ChargingView, 'Home')}
            style={styles.chargeAnotherCarTouchable}
          >
            <Text style={styles.chargeAnotherCarText}>
              {t('charging.chargeAnotherCar')}
            </Text>
          </TouchableOpacity>
        )}

        <BaseButton
          onPress={() => onFinish(order_id)}
          text={'charging.finish'}
          style={styles.finishBtn}
        />
      </View>
    </View>
  )
}

export default ChargingView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.primaryBackground,
  },
  infoLinearGradient: {
    paddingHorizontal: 48,
    paddingVertical: 48,
    marginHorizontal: 44,
    borderRadius: 10,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainChargerCircleContainer: {
    position: 'relative',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
  },
  MainChargerCircle: {
    position: 'absolute',
    alignSelf: 'center',
    width: CircleDiameter,
    height: CircleDiameter,
    minHeight: CircleDiameter,
    borderRadius: CircleDiameter / 2,
    backgroundColor: Colors.primaryBackground,
    borderWidth: 4,
    borderColor: '#18a0fb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    lineHeight: 18,
    fontSize: 13,
    letterSpacing: 0.21,
    color: 'white',
    textAlign: 'center',
  },
  pulseStyle: {
    borderColor: '#18a0fb',
    borderWidth: 2,
  },
  chargerImage: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
    tintColor: Colors.primaryBlue,
  },
  pricingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  currentlyChargedPrice: {
    color: Colors.primaryWhite,
    fontSize: 22,
    lineHeight: 36,
  },
  finalPrice: {
    color: Colors.primaryBlue,
    fontSize: 16,
  },
  chargeAnotherCarContainer: {
    flex: 0,
    justifyContent: 'flex-end',
  },
  chargeAnotherCarTouchable: {
    marginVertical: 16,
    alignItems: 'center',
  },
  chargeAnotherCarText: {
    color: Colors.primaryGreen,
    fontSize: 13,
  },
  finishBtn: {
    marginTop: 16,
    marginVertical: 16,
    marginHorizontal: 0,
    alignSelf: 'center',
    width: Const.Width - 32,
  },
})
