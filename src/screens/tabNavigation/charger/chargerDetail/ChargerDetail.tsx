import React, { useMemo } from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
} from 'react-native'
import { BusinessService } from 'types'
import {
  TitleTopLeftContainer,
  BaseHeader,
  BaseButton,
  Swipe,
} from 'components'
import { Colors, Const } from 'utils'
import { getLocaleText } from 'utils/localization/localization'
import images from 'assets/images'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getImage } from 'helpers/chargers'
import { useNavigation } from '@react-navigation/native'
import {
  ChargerDetailTopInfo,
  ChargerTypesItem,
  CurrentTariffs,
} from './components'
import useChargerDetails from './useChargerDetails'
import BusinessServiceItem from './components/BusinessServiceItem/BusinessServiceItem'

const ChargerDetail = () => {
  const {
    chargerLocationDirectionHandler,
    showChargerLocationHandler,
    onBusinessServiceClick,
    startChargingHandler,
    setActiveChargerType,
    activeChargerType,
    onFavoritePress,
    distance,
    charger,
  } = useChargerDetails()
  const { goBack } = useNavigation()

  const insets = useSafeAreaInsets()
  const image = useMemo(() => getImage(charger?.image ?? null), [charger])

  return (
    <Swipe left={goBack}>
      <View style={styles.container}>
        <View style={[styles.imageContainer, { marginTop: insets.top }]}>
          <BaseHeader
            onPressLeft={goBack}
            style={styles.baseHeader}
            colorless
            noInset
          />
          <Image source={image} style={styles.image} />
        </View>
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
                  onPress={() => setActiveChargerType(index)}
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
  baseHeader: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
  },
  imageContainer: {
    height: 180,
    position: 'relative',
    backgroundColor: 'black',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 0,
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
