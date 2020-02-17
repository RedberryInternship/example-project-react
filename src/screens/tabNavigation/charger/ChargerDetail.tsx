import React, {ReactElement} from 'react'
import {StyleSheet, ScrollView, View, Image} from 'react-native'
import {
  BaseHeader,
  ChargerDetailTopInfo,
  CurrentTariffs,
  TitleTopLeftContainer,
  ChargerTypesItem,
  BaseButton,
} from 'components'
import {useChargerDetails} from 'hooks'
import {Colors} from 'utils'
import {getLocaleText} from 'utils/localization/localization'
import {
  NavigationScreenProp,
  NavigationParams,
  NavigationState,
} from 'react-navigation'

type ChargerDetailProps = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

const ChargerDetail = ({navigation}: ChargerDetailProps): ReactElement => {
  const hook = useChargerDetails(navigation)

  return (
    <View style={styles.container}>
      <BaseHeader
        onPressLeft={(): void => {
          navigation.goBack()
        }}
      />
      <ScrollView
        style={{paddingHorizontal: 16, marginTop: 8}}
        contentContainerStyle={{paddingBottom: 32}}>
        <ChargerDetailTopInfo
          chargerLocationDirectionPress={hook.chargerLocationDirectionHandler}
          showChargerLocationPress={hook.showChargerLocationHandler}
          favouritePress={hook.onFavoritePress}
          code={hook.charger?.code}
          name={getLocaleText(hook.charger?.name)}
          location={getLocaleText(hook.charger?.location)}
          distance={hook.getDistance}
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
        style={{marginTop: 0, marginVertical: 16, marginBottom: 16}}
        image={require('../../../../assets/images/icons/ic_charge.png')}
        imageStyle={{tintColor: 'white'}}
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
})

export default ChargerDetail
