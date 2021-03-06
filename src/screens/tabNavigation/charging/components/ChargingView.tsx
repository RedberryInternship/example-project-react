import React, { useMemo } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
} from 'react-native'
import { Const, Colors } from 'utils'
import BaseButton from 'components/BaseButton'
import CountDown from 'components/CountDown'
import BaseText from 'components/BaseText'
import Pulse from 'components/Pulse'
import images from 'assets/images'
import { ChargingViewFC } from 'screens/tabNavigation/charging/types'
import { HomeNavigateModes } from 'types'

const ChargingView: ChargingViewFC = (
  {
    hook: {
      t, navigation, onFinish, setLoading, loading,
    },
    chargingState: {
      consumed_money,
      already_paid,
      order_id,
      start_charging_time,
      consumed_kilowatts,
    },
    singleCharger,
  },
) => {
  const CircleDiameter = useMemo(
    () => Const.Width - 150 - (singleCharger ? 0 : 50),
    [singleCharger],
  )

  const { navigate } = navigation

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View style={styles.MainChargerCircleContainer}>
        <Pulse
          color="transparent"
          numPulses={3}
          diameter={Const.Width - 40 - (singleCharger ? 0 : 50)}
          initialDiameter={CircleDiameter}
          speed={20}
          duration={1200}
          pulseStyle={styles.pulseStyle}
        />
        <View
          style={[
            styles.MainChargerCircle,
            {
              width: CircleDiameter,
              height: CircleDiameter,
              minHeight: CircleDiameter,
              borderRadius: CircleDiameter / 2,
            },
          ]}
        >
          <Image
            source={images.chargerWithGradient}
            style={styles.chargerImage}
          />
          <CountDown startTime={start_charging_time} alarm={false} />
        </View>
      </View>

      <View style={styles.informationPanel}>
        <View style={styles.pricingView}>
          <BaseText style={styles.currentlyChargedPrice}>
            {consumed_money}
            {' '}
            /
            {' '}
          </BaseText>
          <BaseText style={styles.finalPrice} testID="alreadyPaidAmount">
            {already_paid}
            {' '}
            {t('gel')}
          </BaseText>
        </View>
        <View style={styles.dividerWrapper}>
          <View style={styles.divider} />
        </View>
        <View style={styles.kilowattsWrapper}>
          <BaseText style={styles.kilowatts} testID="consumedKilowatts">
            {consumed_kilowatts}
            {' '}
            {t('kw')}
          </BaseText>
        </View>
      </View>

      <View style={styles.chargeAnotherCarContainer}>
        {singleCharger && (
          <TouchableOpacity
            onPress={() => navigate('Home', {
              mode: HomeNavigateModes.showAllChargers,
            })}
            style={styles.chargeAnotherCarTouchable}
          >
            <BaseText style={styles.chargeAnotherCarText}>
              {t('charging.chargeAnotherCar')}
            </BaseText>
          </TouchableOpacity>
        )}

        <BaseButton
          onPress={() => { setLoading(true); onFinish(order_id) }}
          text="charging.finish"
          style={styles.finishBtn}
          loading={loading}
          testID="finishChargingButton"
        />
      </View>
    </View>
  )
}

export default ChargingView

const styles = StyleSheet.create(
  {
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
      backgroundColor: Colors.primaryBackground,
      borderWidth: 4,
      borderColor: Colors.primaryGreen,
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
      borderColor: Colors.primaryGreen,
      borderWidth: 2,
    },
    chargerImage: {
      width: 55,
      height: 55,
      resizeMode: 'contain',
      tintColor: Colors.primaryGreen,
    },
    informationPanel: {
      marginBottom: 100,
    },
    pricingView: {
      display: 'flex',
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
      marginTop: 6,
    },
    dividerWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    divider: {
      width: 200,
      borderBottomWidth: 1,
      borderBottomColor: Colors.primaryGray,
      marginTop: 20,
      marginBottom: 20,
    },
    kilowattsWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    kilowatts: {
      fontSize: 17,
      color: Colors.primaryBlue,
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
    isChargerConnected: {},
  },
)
