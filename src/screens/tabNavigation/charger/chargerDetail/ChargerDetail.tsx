import React, {ReactElement} from 'react'
import {StyleSheet, ScrollView, View, Image} from 'react-native'

import {ScreenPropsWithNavigation} from 'allTypes'

import {BaseHeader, TitleTopLeftContainer, BaseButton} from 'components'
import {Colors, Defaults} from 'utils'
import {getLocaleText} from 'utils/localization/localization'
import images from 'assets/images'
import {
  CurrentTariffs,
  ChargerDetailTopInfo,
  ChargerTypesItem,
} from './components'
import useChargerDetails from './useChargerDetails'

const ChargerDetail = ({
  navigation,
}: ScreenPropsWithNavigation): ReactElement => {
  const {
    headerLeftPress,
    chargerLocationDirectionHandler,
    onFavoritePress,
    showChargerLocationHandler,
    charger,
    distance,
    activeChargerType,
    setActiveChargerType,
    dummyServices,
    mainButtonClickHandler,
  } = useChargerDetails(navigation)

  return (
    <View style={styles.container}>
      <BaseHeader onPressLeft={headerLeftPress} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        <ChargerDetailTopInfo
          chargerLocationDirectionPress={chargerLocationDirectionHandler}
          showChargerLocationPress={showChargerLocationHandler}
          // TODO
          favouritePress={onFavoritePress}
          favorite={charger?.is_favorite}
          code={charger?.code}
          name={getLocaleText(charger?.name)}
          location={getLocaleText(charger?.location)}
          distance={distance}
        />
        <CurrentTariffs data={charger?.charging_prices ?? []} />
        <TitleTopLeftContainer
          direction={'column'}
          title={'chargerDetail.connectors'}
          data={charger?.connector_types ?? []}
          onRenderItem={(val, index): ReactElement => (
            <ChargerTypesItem
              key={index}
              index={index + 1}
              active={activeChargerType === index}
              onPress={setActiveChargerType.bind(ChargerDetail, index)}
              type={val.name}
              power={'34'}
            />
          )}
        />
        <TitleTopLeftContainer
          direction={'row'}
          title={'chargerDetail.additionalServices'}
          data={dummyServices}
          onRenderItem={(val, index): ReactElement => (
            <View key={index} style={styles.serviceContainer}>
              <Image source={val} style={styles.serviceImage} />
            </View>
          )}
        />
      </ScrollView>
      <BaseButton
        onPress={mainButtonClickHandler}
        text={'charger.turnOn'}
        style={styles.baseButton}
        image={images.charge}
        imageStyle={styles.baseButtonImageStyle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.primaryBackground,
  },
  scrollView: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  scrollViewContentContainer: {
    paddingBottom: 32,
  },
  serviceContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CD96433',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  serviceImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    tintColor: Colors.primaryGreen,
  },
  baseButton: {
    marginTop: 0,
    marginVertical: 16,
    marginBottom: 16,
  },
  baseButtonImageStyle: {
    tintColor: 'white',
  },
})

export default ChargerDetail
