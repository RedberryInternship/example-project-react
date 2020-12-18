import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { Const, Colors } from 'utils'
import images from 'assets/images'
import { FilterTextItem } from '../index'
import { HomeFilterFC } from './types'

const translate = Const.Width - 98

const HomeFilter: HomeFilterFC = (
  {
    selectedFiltersOnMap,
    onFilterClickOnMap,
  },
) => {
  const [showFilter, setShowFilter] = useState(false)
  const { t } = useTranslation()
  console.log('HomeFilter');
  const [translateX] = useState(new Animated.Value(translate))

  const handleFilterButton = useCallback((): void => {
    setShowFilter(!showFilter)
  }, [showFilter])

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: showFilter ? 0 : translate,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start()
  }, [showFilter, translateX])

  const buttonImageStyle = useMemo(
    () => (showFilter ? { width: 23, height: 23 } : { width: 18, height: 18 }),
    [showFilter],
  )

  return useMemo(
    () => (
      <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContentContainer}
          horizontal
          pointerEvents="box-none"
          showsHorizontalScrollIndicator={false}
          scrollEnabled={showFilter}
        >
          <Animated.View
            style={[
              styles.buttonContainer,
              {
                backgroundColor: translateX.interpolate({
                  inputRange: [0, translate],
                  outputRange: [Colors.primaryYellow, '#009AF0'],
                }),
              },
            ]}
          >
            <TouchableOpacity
              onPress={handleFilterButton}
              hitSlop={styles.buttonHitSlop}
            >
              <Image
                source={showFilter ? images.close : images.filterType}
                style={[buttonImageStyle, styles.buttonImage]}
              />
            </TouchableOpacity>
          </Animated.View>
          {Const.FilterTypes.map((val: string, index: number) => (
            <FilterTextItem
              text={t(val)}
              key={val}
              active={!!selectedFiltersOnMap[index]}
              onPress={() => onFilterClickOnMap(index)}
            />
          ))}
        </ScrollView>
      </Animated.View>
    ),
    [
      selectedFiltersOnMap,
      onFilterClickOnMap,
      handleFilterButton,
      buttonImageStyle,
      showFilter,
      translateX,
      t,
    ],
  )
}

export default React.memo(HomeFilter)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'stretch',
    position: 'absolute',
    elevation: 1,
    backgroundColor: 'transparent',
    right: 0,
    bottom: 80,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContentContainer: {
    flex: 0,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    elevation: 1,
    backgroundColor: '#008AEE',
    marginRight: 20,
    marginLeft: 24,
  },
  buttonHitSlop: {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  },
  buttonImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    tintColor: 'white',
  },
})
