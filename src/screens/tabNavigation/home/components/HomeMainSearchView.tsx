import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  ReactElement,
  useCallback,
} from 'react'
import {StyleSheet, Animated, View, TouchableOpacity, Alert} from 'react-native'
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view'

import {Charger, MapImperativeRefObject, ChargerDetail} from 'allTypes'

import {HomeMainSearchInput} from 'components'
import {useHomeMainSearch} from '../hooks'
import {Const, Colors, getLocaleText} from 'utils'
import {MainSearchItem} from '../components'
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'

type MainInput = {
  allChargers: Charger[]
  mapRef: MapImperativeRefObject
  setShowAll: (boolean: boolean) => void
}
// eslint-disable-next-line react/display-name
const HomeMainSearchView = forwardRef(
  ({allChargers, mapRef, setShowAll}: MainInput, ref: any): ReactElement => {
    const {
      _this,
      closeClick,
      setShowSearchContent,
      filteredChargers,
      onSearchItemClickHandler,
      showSearchContent,
      animate,
      textHandler,
      t,
      InputRef,
      inputText,
    } = useHomeMainSearch(allChargers, mapRef, setShowAll)
    const InputSubmit = (): void => {
      // Alert.alert(JSON.stringify(_this.current))
    }

    useImperativeHandle(ref, () => ({
      close: closeClick.bind(HomeMainSearchView),
      show: setShowSearchContent.bind(HomeMainSearchView, true),
    }))

    const searchedItems = ({
      item: chargerObj,
    }: {
      item: Charger
    }): ReactElement => {
      const view = []

      if (chargerObj?.charger_group?.chargers?.length !== 0) {
        view.push(
          <MainSearchItem
            key={chargerObj.id}
            text={getLocaleText(chargerObj.name)}
            mainTitle={getLocaleText(chargerObj.location)}
            onPress={onSearchItemClickHandler.bind(
              HomeMainSearchView,
              chargerObj.lat,
              chargerObj.lng,
            )}
          />,
        )
      } else {
        chargerObj?.charger_group?.chargers?.map((val) =>
          view.push(
            <MainSearchItem
              key={val.id + 'inside'}
              text={getLocaleText(val.name)}
              mainTitle={getLocaleText(val.location)}
              onPress={onSearchItemClickHandler.bind(
                HomeMainSearchView,
                val.lat,
                val.lng,
              )}
            />,
          ),
        )
      }

      return <React.Fragment>{view}</React.Fragment>
    }

    return useMemo(
      () => (
        <>
          <TouchableOpacity
            activeOpacity={1}
            onPress={closeClick}
            style={styles.container}
          >
            <>
              <Animated.View style={[styles.inputStyleContainer, animate()]}>
                <HomeMainSearchInput
                  showSearchContent={showSearchContent}
                  placeholder={`${t('home.location')}/${t(
                    'home.organization',
                  )}`}
                  textHandler={textHandler}
                  InputSubmit={InputSubmit}
                  closeClick={closeClick}
                  ref={InputRef}
                />
              </Animated.View>
              <Animated.View
                style={[
                  styles.searchContent,
                  {height: _this.current.animatedSearchContentHeight},
                ]}
              >
                <View
                  style={{
                    display: showSearchContent ? 'flex' : 'none',
                    flex: 1,
                    marginBottom: 16,
                  }}
                >
                  <KeyboardAwareFlatList
                    style={{flex: 1}}
                    contentContainerStyle={{}}
                    keyboardShouldPersistTaps={'handled'}
                    enableOnAndroid={true}
                    enableAutomaticScroll={true}
                    extraScrollHeight={0}
                    showsVerticalScrollIndicator={false}
                    enableResetScrollToCoords={true}
                    resetScrollToCoords={{x: 0, y: 0}}
                    viewIsInsideTabBar={true}
                    data={filteredChargers}
                    renderItem={searchedItems}
                    keyExtractor={(item: Charger) => item.id + ''}
                    initialNumToRender={6}
                    extraData={filteredChargers}
                  />
                </View>
              </Animated.View>
            </>
          </TouchableOpacity>
          <TouchableWithoutFeedback
            style={{
              width: Const.Width,
              height: Const.Height,
              backgroundColor: 'red',
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: 10000,
              elevation: 100,
            }}
          />
        </>
      ),
      [
        allChargers,
        setShowAll,
        filteredChargers,
        showSearchContent,
        inputText,
        t,
      ],
    )
  },
)

export default HomeMainSearchView

const styles = StyleSheet.create({
  container: {
    width: '100%',
    elevation: 11,
    marginTop: 12,
    zIndex: 4,
    position: 'relative',
  },
  inputStyleContainer: {
    flex: 0,
    width: Const.Width - 48,
    height: 36,
    elevation: 1,
    backgroundColor: '#023D63',
    marginHorizontal: 24,
  },
  inputStyle: {
    alignItems: 'stretch',
    justifyContent: 'center',
    flex: 1,
    height: 36,
  },
  searchContent: {
    width: Const.Width - 48,
    backgroundColor: Colors.primaryBackground,
    marginHorizontal: 24,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    position: 'relative',
    alignContent: 'stretch',
  },
})
