import React, {ReactElement} from 'react'
import {StyleSheet, ScrollView, View, Text} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'

import {ScreenPropsWithNavigation, Charger} from 'allTypes'

import {
  BaseInput,
  BaseHeader,
  BaseButton,
  TitleTopLeftContainer,
  FetchedDataRenderer,
} from 'components'
import {Const, Colors, getLocaleText} from 'utils'
import images from 'assets/images'
import {ChargerItem} from './components'
import useChargerWithCode from './useChargerWithCode'

const ChargerWithCode = ({
  navigation,
}: ScreenPropsWithNavigation): ReactElement => {
  const {
    codeTextHandler,
    chargeWitchCode,
    codeInputSubmit,
    allChargerHandler,
    t,
    navigateToChargerDetailScreen,
    lastUsed,
  } = useChargerWithCode(navigation)

  return (
    <View style={styles.container}>
      <BaseHeader title={'charger.chargeWitchCode'} />
      <ScrollView style={styles.scrollView}>
        <BaseInput
          image={images.lock}
          keyboardType={'email-address'}
          onChangeText={codeTextHandler}
          onSubmit={codeInputSubmit}
          ref={chargeWitchCode}
          testID={'codeSumit'}
          title={'charger.enterCode'}
        />
        <BaseButton
          onPress={codeInputSubmit}
          text={'next'}
          style={styles.baseButton}
          imageStyle={styles.baseButtonImageStyle}
          image={images.arrowRight}
        />

        <TouchableOpacity
          onPress={allChargerHandler}
          style={styles.allChargersWrapper}
        >
          <Text style={styles.allChargersText}>
            {t('charger.allChargerList')}
          </Text>
        </TouchableOpacity>
        <View style={{height: 32}} />
        <TitleTopLeftContainer
          title={'charger.lastUsed'}
          direction={'column'}
          data={['oneRender']}
          onRenderItem={(val: string): ReactElement => (
            <FetchedDataRenderer
              property={'Faq'}
              key={val}
              onItemRender={(val: Charger): ReactElement => (
                <ChargerItem
                  key={val.id}
                  onPress={() => navigateToChargerDetailScreen(val)}
                  address={getLocaleText(val.location)}
                  code={val.code}
                />
              )}
              fetchData={lastUsed}
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
