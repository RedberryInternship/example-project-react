import React from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
} from 'react-native'
import { FCWithNavigation, BusinessService } from 'types'
import {
  TitleTopLeftContainer,
  BaseHeader,
  BaseButton,
  Swipe,
} from 'components'
import { Colors, Const } from 'utils'
import { getLocaleText } from 'utils/localization/localization'
import images from 'assets/images'
import {
  ChargerDetailTopInfo,
  ChargerTypesItem,
  CurrentTariffs,
} from './components'
import useChargerDetails from './useChargerDetails'
import BusinessServiceItem from './components/BusinessServiceItem'

const ChargerDetail: FCWithNavigation = ({ navigation }) => {
  const {
    chargerLocationDirectionHandler,
    showChargerLocationHandler,
    onBusinessServiceClick,
    startChargingHandler,
    setActiveChargerType,
    activeChargerType,
    onFavoritePress,
    goBackHandler,
    distance,
    charger,
  } = useChargerDetails(navigation)

  return (
    <Swipe left={goBackHandler}>
      <View style={styles.container}>
        <BaseHeader onPressLeft={goBackHandler} />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContentContainer}
        >
          <ChargerDetailTopInfo
            chargerLocationDirectionPress={chargerLocationDirectionHandler}
            showChargerLocationPress={showChargerLocationHandler}
            favoritePress={onFavoritePress}
            favorite={charger?.is_favorite}
            code={charger?.code}
            location={getLocaleText(charger?.location)}
            distance={distance}
          />
          <CurrentTariffs
            connector={charger?.connector_types[activeChargerType]}
          />
          <TitleTopLeftContainer
            direction="column"
            title="chargerDetail.connectors"
            data={charger?.connector_types ?? []}
            onRenderItem={(val, index) => {
              const power = Const
                .connectorTypeChargePowers[val.name as Const.ConnectorTypes]
                .toString()
              return (
                <ChargerTypesItem
                  key={index}
                  active={activeChargerType === index}
                  onPress={setActiveChargerType.bind(ChargerDetail, index)}
                  type={val.name}
                  power={power}
                />
              )
            }}
          />
          {!!charger?.business_services?.length && (
            <TitleTopLeftContainer
              title="chargerDetail.additionalServices"
              direction="row"
              data={charger?.business_services}
              onRenderItem={(val: BusinessService) => (
                <BusinessServiceItem
                  key={val.id}
                  onPress={() => onBusinessServiceClick(val.title, val.description)}
                  image={val.image_path}
                />
              )}
            />
          )}
        </ScrollView>
        <BaseButton
          onPress={startChargingHandler}
          text="charger.turnOn"
          style={styles.baseButton}
          image={images.charge}
          imageStyle={styles.baseButtonImageStyle}
        />
      </View>
    </Swipe>
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
