import React, {
  useImperativeHandle,
  forwardRef,
  useMemo,
} from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  KeyboardAwareFlatList,
} from 'react-native-keyboard-aware-scroll-view'
import { Charger } from 'allTypes'
import { Const, Colors } from 'utils'
import { HomeMainSearchInput, HomeMainSearchResult } from '../index'
import useHomeMainSearchView from './useHomeMainSearchView'

import {
  HomeMainSearchViewProps,
  SearchResultItem,
} from './types'

const HomeMainSearchView = forwardRef<any, HomeMainSearchViewProps>(
  (
    {
      allChargers,
      mapRef,
      setShowAll,
    },
    ref,
  ) => {
    const {
      onSearchItemClickHandler,
      setShowSearchContent,
      showSearchContent,
      animationOptions,
      filteredChargers,
      setInputText,
      closeClick,
      inputText,
      animate,
      inputRef,
    } = useHomeMainSearchView(
      {
        allChargers,
        setShowAll,
        mapRef,
      },
    )
    const { t } = useTranslation()
    const InputSubmit = (): void => { }

    useImperativeHandle(ref, () => ({
      close: closeClick.bind(HomeMainSearchView, true),
      show: setShowSearchContent.bind(HomeMainSearchView, true),
    }))

    /**
     * Prepare render items callback.
     */
    const searchResult: SearchResultItem = ({ item }) => HomeMainSearchResult(
      {
        item,
        onSearchItemClickHandler,
      },
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
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setShowSearchContent(true)}
            style={styles.container}
          >
            <>
              <Animated.View style={[styles.inputStyleContainer, animate]}>
                <HomeMainSearchInput
                  showSearchContent={showSearchContent}
                  placeholder={`${t('home.location')}/${t('home.organization')}`}
                  textHandler={setInputText}
                  InputSubmit={InputSubmit}
                  closeClick={closeClick}
                  ref={inputRef}
                />
              </Animated.View>
              <Animated.View
                style={
                  [
                    styles.searchContent,
                    {
                      height: animationOptions.animatedSearchContentHeight,
                    },
                  ]
                }
              >
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
                    renderItem={searchResult}
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
      [allChargers, setShowAll, filteredChargers, showSearchContent, inputText],
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
