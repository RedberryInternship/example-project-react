import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native'
import {FilterTextItem} from 'components'
import {Const, Colors} from 'utils'
import {useTranslation} from 'react-i18next'
import {HomeContextType} from 'allTypes'

type HomeFilter = {
  context: HomeContextType
  selectedFiltersOnMap: number[]
  onFilterClickOnMap: (index: number) => void
}

const translate = Const.Width - 98

const homeFilter = ({selectedFiltersOnMap, onFilterClickOnMap}: HomeFilter) => {
  const [showFilter, setShowFilter] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const {t} = useTranslation()

  let [translateX] = useState(new Animated.Value(translate))

  const handleFilterItemPress = (index: number) => {
    Alert.alert(index.toString())
    setActiveIndex(index)
  }

  const handleFilterButton = () => {
    setShowFilter(!showFilter)
    setActiveIndex(-1)
  }

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: showFilter ? 0 : translate,
      duration: 300,
      easing: Easing.out(Easing.ease),
      // useNativeDriver : true
    }).start()
  }, [showFilter])

  return (
    <Animated.View style={[styles.container, {transform: [{translateX}]}]}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          flex: 0,
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
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
            hitSlop={{
              top: 20,
              bottom: 20,
              left: 20,
              right: 20,
            }}>
            <Image
              source={
                showFilter
                  ? require('../../../assets/images/icons/close.png')
                  : require('../../../assets/images/icons/ic_filterType.png')
              }
              style={[
                showFilter ? {width: 23, height: 23} : {width: 18, height: 18},
                {
                  alignSelf: 'center',
                  resizeMode: 'contain',
                  tintColor: 'white',
                },
              ]}
            />
          </TouchableOpacity>
        </Animated.View>
        {Const.FilterTypes.map((val: string, index: number) => (
          <FilterTextItem
            text={t(val)}
            key={index}
            active={selectedFiltersOnMap[index]}
            onPress={onFilterClickOnMap.bind(homeFilter, index)}
          />
        ))}
      </ScrollView>
    </Animated.View>
  )
}

export default homeFilter

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
})
