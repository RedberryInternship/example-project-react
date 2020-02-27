import React, {ReactElement} from 'react'
import {StyleSheet, ScrollView, View, Text} from 'react-native'
import {
  BaseInput,
  BaseHeader,
  BaseButton,
  ChargerItem,
  TitleTopLeftContainer,
  FetchedDataRenderer,
} from 'components'
import {useChargerWithCode} from 'hooks'
import {Const, Colors, getLocaleText} from 'utils'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Imgs from '../../../../assets/images'
import {ScreenPropsWithNavigation, LastUsedCharger} from 'allTypes'

const ChargerWithCode = ({
  navigation,
}: ScreenPropsWithNavigation): ReactElement => {
  const hook = useChargerWithCode(navigation)

  return (
    <View style={styles.container}>
      <BaseHeader title={'charger.chargeWitchCode'} />
      <ScrollView style={styles.scrollView}>
        <BaseInput
          image={Imgs.lock}
          keyboardType={'email-address'}
          onChangeText={hook.codeTextHandler}
          onSubmit={hook.codeInputSubmit}
          ref={hook.chargeWitchCode}
          testID={'codeSumit'}
          title={'charger.enterCode'}
        />
        <BaseButton
          onPress={hook.codeInputSubmit}
          text={'next'}
          style={styles.baseButton}
          imageStyle={styles.baseButtonImageStyle}
          image={Imgs.arrowRight}
        />

        <TouchableOpacity
          onPress={hook.allChargerHandler}
          style={styles.allChargersWrapper}>
          <Text style={styles.allChargersText}>
            {hook.t('charger.allChargerList')}
          </Text>
        </TouchableOpacity>
        <View style={{height: 32}} />
        <TitleTopLeftContainer
          title={'charger.lastUsed'}
          direction={'column'}
          data={['s']}
          onRenderItem={(val: any): ReactElement => (
            <FetchedDataRenderer
              property={'Faq'}
              onItemRender={(val: any): ReactElement => (
                <ChargerItem
                  key={val.id}
                  onPress={() => {}}
                  address={getLocaleText(val.location)}
                  code={val.code}
                />
              )}
              fetchData={hook.lastUsed}
              updateAlways={true}
            />
          )}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.primaryBackground,
    alignItems: 'stretch',
  },
  scrollView: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  baseButton: {
    marginTop: 24,
    marginHorizontal: 0,
    alignSelf: 'center',
    width: Const.Width - 32,
  },
  baseButtonImageStyle: {
    tintColor: 'white',
  },
  allChargersWrapper: {
    marginVertical: 16,
    alignItems: 'center',
  },
  allChargersText: {
    color: Colors.primaryGreen,
    fontSize: 13,
  },
})

export default ChargerWithCode
