import React, {
  useImperativeHandle,
  ReactElement,
  useCallback,
  forwardRef,
  useMemo,
} from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  View,
} from 'react-native'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { Charger, MapImperativeRefObject } from 'allTypes'
import { HomeMainSearchInput } from 'components'
import { Const, Colors, getLocaleText } from 'utils'
import { useHomeMainSearch } from '../hooks'
import MainSearchItem from './MainSearchItem'

type MainInput = {
  allChargers: Charger[]
  mapRef: MapImperativeRefObject
  setShowAll: (boolean: boolean) => void
}

const HomeMainSearchView = forwardRef(
  (
    {
      allChargers,
      mapRef,
      setShowAll,
    }: MainInput, ref: any): ReactElement => {
    const {
      onSearchItemClickHandler,
      setShowSearchContent,
      showSearchContent,
      filteredChargers,
      closeClick,
      textHandler,
      inputText,
      animate,
      InputRef,
      _this,
      t,
    } = useHomeMainSearch(allChargers, mapRef, setShowAll)
    const InputSubmit = (): void => { }

    useImperativeHandle(ref, () => ({
      close: closeClick.bind(HomeMainSearchView, true),
      show: setShowSearchContent.bind(HomeMainSearchView, true),
    }))

    // Vobi Todo: https://tppr.me/pHt49
    // same logic is written in 2 components
    // make one SearchedItems component and render them
    // you only would write it like so here <SearchedItems chargers={chargers} />
    const searchedItems = useCallback(
      ({ item: chargerObj }: { item: Charger }): ReactElement => {
        const view = []

        if (chargerObj?.charger_group?.chargers?.length !== 0) {
          view.push(
            <MainSearchItem
              key={chargerObj.id}
              text={getLocaleText(chargerObj.name)}
              mainTitle={getLocaleText(chargerObj.location)}
              onPress={onSearchItemClickHandler.bind(HomeMainSearchView, chargerObj.lat, chargerObj.lng)}
            />,
          )
        } else {
          chargerObj?.charger_group?.chargers?.map((val) => view.push(
            <MainSearchItem
              key={`${val.id}inside`}
              text={getLocaleText(val.name)}
              mainTitle={getLocaleText(val.location)}
              onPress={onSearchItemClickHandler.bind(HomeMainSearchView, val.lat, val.lng)}
            />,
          ))
        }
        return <>{view}</>
      },
      [getLocaleText, onSearchItemClickHandler],
    )

    return useMemo(
      () => (
        <>
          {showSearchContent && (
            <TouchableOpacity
              onPress={() => {
                closeClick(true)
              }}
              style={styles.backgroundClose}
            />
          )}
          <TouchableOpacity activeOpacity={1} onPress={() => setShowSearchContent(true)} style={styles.container}>
            <>
              <Animated.View style={[styles.inputStyleContainer, animate]}>
                <HomeMainSearchInput
                  showSearchContent={showSearchContent}
                  placeholder={`${t('home.location')}/${t('home.organization')}`}
                  textHandler={textHandler}
                  InputSubmit={InputSubmit}
                  closeClick={closeClick}
                  ref={InputRef}
                />
              </Animated.View>
              <Animated.View style={[styles.searchContent, { height: _this.current.animatedSearchContentHeight }]}>
                <View
                  style={{
                    display: showSearchContent ? 'flex' : 'none',
                    flex: 1,
                    marginBottom: 16,
                  }}
                >
                  <KeyboardAwareFlatList
                    style={{ flex: 1 }}
                    contentContainerStyle={{}}
                    keyboardShouldPersistTaps="handled"
                    enableOnAndroid
                    enableAutomaticScroll
                    extraScrollHeight={0}
                    showsVerticalScrollIndicator={false}
                    enableResetScrollToCoords
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    viewIsInsideTabBar
                    data={filteredChargers}
                    renderItem={searchedItems}
                    keyExtractor={(item: Charger) => `${item.id}`}
                    initialNumToRender={6}
                    extraData={filteredChargers}
                  />
                </View>
              </Animated.View>
            </>
          </TouchableOpacity>
        </>
      ),
      [allChargers, setShowAll, filteredChargers, showSearchContent, inputText, t],
    )
  },
)

export default React.memo(HomeMainSearchView)

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
  backgroundClose: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
})
