import React, { ReactElement } from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import { Charger } from 'types'
import TitleTopLeftContainer from 'components/TitleTopLeftContainer'
import FetchedDataRenderer from 'components/FetchedDataRenderer'
import BaseButton from 'components/BaseButton'
import BaseHeader from 'components/BaseHeader'
import BaseInput from 'components/BaseInput'
import BaseText from 'components/BaseText'
import {
  getLocaleText,
  Colors,
  Const,
} from 'utils'
import images from 'assets/images'
import { recentlyUsedChargers } from './helpers'
import { ChargerItem } from './components'
import useChargerWithCode from './useChargerWithCode'

const ChargerWithCode = () => {
  const {
    navigateToChargerDetailScreen,
    setChargerWithCode,
    allChargerHandler,
    findCharger,
  } = useChargerWithCode()
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <BaseHeader title="charger.chargeWitchCode" />
      <ScrollView style={styles.scrollView}>
        <BaseInput
          image={images.chargeWithCode}
          imageStyle={styles.inputImage}
          keyboardType="number-pad"
          onChangeText={setChargerWithCode}
          onSubmit={findCharger}
          title="charger.enterCode"
        />
        <BaseButton
          onPress={findCharger}
          text="next"
          style={styles.baseButton}
          imageStyle={styles.baseButtonImageStyle}
          image={images.arrowRight}
        />

        <TouchableOpacity
          onPress={allChargerHandler}
          style={styles.allChargersWrapper}
        >
          <BaseText style={styles.allChargersText}>
            {t('charger.allChargerList')}
          </BaseText>
        </TouchableOpacity>
        <View style={{ height: 32 }} />
        <TitleTopLeftContainer
          title="charger.lastUsed"
          direction="column"
          data={['oneRender']}
          onRenderItem={(val: string): ReactElement => (
            <FetchedDataRenderer
              property="lastUsedCharger"
              key={val}
              onItemRender={(item: Charger, index): ReactElement => (
                <ChargerItem
                  key={index}
                  onPress={() => navigateToChargerDetailScreen(item)}
                  address={getLocaleText(item.location)}
                  code={item.code}
                />
              )}
              fetchData={recentlyUsedChargers}
              updateAlways
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
  inputImage: {
    top: 15,
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
