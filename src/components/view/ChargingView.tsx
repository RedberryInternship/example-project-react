import React, {ReactElement} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native'
import {Const, Colors} from 'utils'
import {Pulse, CountDown, BaseButton} from 'components'
import images from 'assets/images'

const CircleDiameter = Const.Width - 150

// Vobi Todo: no any type
const ChargingView = ({hook}: any): ReactElement => {
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
          <CountDown duration={12000000} up={false} alarm={false} />
        </View>
      </View>
      <View style={styles.pricingView}>
        <Text style={styles.currentlyChargedPrice}>5.30 / </Text>
        <Text style={styles.finalPrice}>20 {hook.t('gel')}</Text>
      </View>

      <View style={styles.chargeAnotherCarContainer}>
        <TouchableOpacity
          onPress={hook.navigation.navigate.bind(ChargingView, 'MainDrawer')}
          style={styles.chargeAnotherCarTouchable}>
          <Text style={styles.chargeAnotherCarText}>
            {hook.t('charging.chargeAnotherCar')}
          </Text>
        </TouchableOpacity>
        <BaseButton
          onPress={hook.onFinish}
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
