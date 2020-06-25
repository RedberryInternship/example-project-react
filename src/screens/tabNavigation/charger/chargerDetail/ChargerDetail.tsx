import React, {ReactElement} from 'react'
import {StyleSheet, ScrollView, View, Image} from 'react-native'

import {ScreenPropsWithNavigation, BusinessService} from 'allTypes'

import {
  BaseHeader,
  TitleTopLeftContainer,
  BaseButton,
  FetchedDataRenderer,
} from 'components'
import {Colors, Defaults} from 'utils'
import {getLocaleText} from 'utils/localization/localization'
import images from 'assets/images'
import {
  CurrentTariffs,
  ChargerDetailTopInfo,
  ChargerTypesItem,
} from './components'
import useChargerDetails from './useChargerDetails'
import BusinessServiceItem from './components/BusinessServiceItem'

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
    mainButtonClickHandler,
    onBusinessServiceClick,
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
          favouritePress={onFavoritePress}
          favorite={charger?.is_favorite}
          code={charger?.code}
          name={getLocaleText(charger?.name)}
          location={getLocaleText(charger?.location)}
          distance={distance}
        />
        <CurrentTariffs
          connector={charger?.connector_types[activeChargerType]}
        />
        <TitleTopLeftContainer
          direction={'column'}
          title={'chargerDetail.connectors'}
          data={charger?.connector_types ?? []}
          onRenderItem={(val, index): ReactElement => (
            <ChargerTypesItem
              key={index}
              active={activeChargerType === index}
              onPress={setActiveChargerType.bind(ChargerDetail, index)}
              type={val.name}
              power={'34'}
            />
          )}
        />
        {!!charger?.business_services?.length && (
          <TitleTopLeftContainer
            title={'chargerDetail.additionalServices'}
            direction={'row'}
            data={charger?.business_services}
            onRenderItem={(val: BusinessService): ReactElement => (
              <BusinessServiceItem
                key={val.id}
                onPress={() =>
                  onBusinessServiceClick(val.title, val.description)
                }
                image={val.image_path}
              />
            )}
          />
        )}
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
