import React, {ReactElement} from 'react'
import {StyleSheet, ScrollView, View, Image, Alert} from 'react-native'
import {
  BaseHeader,
  ChargerDetailTopInfo,
  CurrentTariffs,
  TitleTopLeftContainer,
  ChargerTypesItem,
  BaseButton,
} from 'components'
import {useChargerDetails} from 'hooks'
import {Colors, Defaults} from 'utils'
import {getLocaleText} from 'utils/localization/localization'
import Imgs from '../../../../assets/images'
import {ScreenPropsWithNavigation} from 'allTypes'

const ChargerDetail = ({
  navigation,
}: ScreenPropsWithNavigation): ReactElement => {
  const hook = useChargerDetails(navigation)

  const headerLeftPress = (): void => {
    if (Defaults.token !== '') {
      navigation.goBack()
    } else {
      navigation.navigate('NotAuthorized')
    }
  }

  return (
    <View style={styles.container}>
      <BaseHeader onPressLeft={headerLeftPress} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentContainer}>
        <ChargerDetailTopInfo
          chargerLocationDirectionPress={hook.chargerLocationDirectionHandler}
          showChargerLocationPress={hook.showChargerLocationHandler}
          // TODO
          favouritePress={hook.onFavoritePress}
          favorite={hook.charger?.is_favorite}
          code={hook.charger?.code}
          name={getLocaleText(hook.charger?.name)}
          location={getLocaleText(hook.charger?.location)}
          distance={hook.distance}
        />
        <CurrentTariffs data={hook.charger?.charging_prices ?? []} />
        <TitleTopLeftContainer
          direction={'column'}
          title={'chargerDetail.connectors'}
          data={hook.charger?.connector_types ?? []}
          onRenderItem={(val, index): ReactElement => (
            <ChargerTypesItem
              key={index}
              index={index + 1}
              active={hook.activeChargerType === index}
              onPress={hook.setActiveChargerType.bind(ChargerDetail, index)}
              type={val.name}
              power={'34'}
            />
          )}
        />
        <TitleTopLeftContainer
          direction={'row'}
          title={'chargerDetail.additionalServices'}
          data={hook.services}
          onRenderItem={(val, index): ReactElement => (
            <View key={index} style={styles.serviceContainer}>
              <Image source={val} style={styles.serviceImage} />
            </View>
          )}
        />
      </ScrollView>
      <BaseButton
        onPress={hook.mainButtonClickHandler}
        text={'charger.turnOn'}
        style={styles.baseButton}
        image={Imgs.charge}
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
