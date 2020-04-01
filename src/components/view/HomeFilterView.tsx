import React, {useState, useEffect, ReactElement} from 'react'
import {
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native'
import {FilterTextItem} from 'components'
import {Const, Colors} from 'utils'
import {useTranslation} from 'react-i18next'
// Vobi todo: package imports up
import {HomeContextType} from 'allTypes'
import images from 'assets/images'

type HomeFilter = {
  context: HomeContextType
  selectedFiltersOnMap: number[]
  onFilterClickOnMap: (index: number) => void
}

const translate = Const.Width - 98

const HomeFilter = ({
  selectedFiltersOnMap,
  onFilterClickOnMap,
}: HomeFilter): ReactElement => {
  const [showFilter, setShowFilter] = useState(false)
  const {t} = useTranslation()

  const [translateX] = useState(new Animated.Value(translate))

  const handleFilterButton = (): void => {
    setShowFilter(!showFilter)
  }

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: showFilter ? 0 : translate,
      duration: 300,
      easing: Easing.out(Easing.ease),
    }).start()
  }, [showFilter])

  const buttonImageStyle = showFilter
    ? {width: 23, height: 23}
    : {width: 18, height: 18}
  // Vobi todo: use memoized value here
  // Vobi Todo: const buttonImageStyle = useMemo(() =>
  // showFilter
  //   ? { width: 23, height: 23 }
  //   : { width: 18, height: 18 }
  // , [showFilter])

  return (
    <Animated.View style={[styles.container, {transform: [{translateX}]}]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentContainer}
        horizontal
        pointerEvents={'box-none'}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={showFilter}>
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              backgroundColor: translateX.interpolate({
                inputRange: [0, translate],
                outputRange: [Colors.primaryYellow, '#009AF0'],
              }),
            },
          ]}>
          <TouchableOpacity
            onPress={handleFilterButton}
            hitSlop={styles.buttonHitSlop}>
            <Image
              source={showFilter ? images.close : images.filterType}
              style={[buttonImageStyle, styles.buttonImage]}
            />
          </TouchableOpacity>
        </Animated.View>
        {Const.FilterTypes.map((val: string, index: number) => (
          <FilterTextItem
            text={t(val)}
            key={index}
            // Vobi Todo: move this kind of checks in body of function
            // Vobi Todo: const isActive = !!selectedFiltersOnMap[index]
            active={!!selectedFiltersOnMap[index]}
            onPress={onFilterClickOnMap.bind(HomeFilter, index)}
          />
        ))}
      </ScrollView>
    </Animated.View>
  )
}

export default HomeFilter

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
