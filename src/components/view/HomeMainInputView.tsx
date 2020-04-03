import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  ReactElement,
} from 'react'
import {StyleSheet, Animated, View, TouchableOpacity, Alert} from 'react-native'
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view'

import {Charger, MapImperativeRefObject, ChargerMarkerStatus} from 'allTypes'

import {MainSearchItem, HomeMainSearchInput} from 'components'
import {useHomeMainInputHook} from 'hooks'
import {Const, Colors, getLocaleText} from 'utils'

type MainInput = {
  allChargers: Charger[]
  mapRef: MapImperativeRefObject
  setShowAll: (boolean: boolean) => void
}
// eslint-disable-next-line react/display-name
const MainInput = forwardRef(
  ({allChargers, mapRef, setShowAll}: MainInput, ref: any): ReactElement => {
    const hook = useHomeMainInputHook(allChargers, mapRef, setShowAll)
    // Vobi Todo: destructure hook
    const InputSubmit = (): void => {
      Alert.alert(JSON.stringify(hook._this.current))
    }

    useImperativeHandle(ref, () => ({
      close: hook.closeClick.bind(MainInput),
      show: hook.setShowSearchContent.bind(MainInput, true),
    }))
    // Vobi Todo: move this as separate component or view
    // Vobi Todo: inside component
    // if(chargers.length !== 0) {
    //   return (
    //     <MainSearchItem
    //       key={chargerObj.id}
    //       text={getLocaleText(chargerObj.name)}
    //       mainTitle={getLocaleText(chargerObj.location)}
    //       onPress={hook.onSearchItemClickHandler.bind(
    //         MainInput,
    //         chargerObj.lat,
    //         chargerObj.lng,
    //       )}
    //     />
    //   )
    // }

    // return chargers.map(val => (
    //   <MainSearchItem
    //     key={val.id}
    //     text={getLocaleText(val.name)}
    //     mainTitle={getLocaleText(val.location)}
    //     onPress={hook.onSearchItemClickHandler.bind(
    //       MainInput,
    //       val.lat,
    //       val.lng,
    //     )}
    //   />
    // ))
    const searchedItems = (): ReactElement => (
      <>
        {hook.filteredChargers?.map((chargerObj: Charger) => {
          const view = []

          if (chargerObj.charger_group?.chargers?.length !== 0) {
            view.push(
              <MainSearchItem
                key={chargerObj.id}
                text={getLocaleText(chargerObj.name)}
                mainTitle={getLocaleText(chargerObj.location)}
                onPress={hook.onSearchItemClickHandler.bind(
                  MainInput,
                  chargerObj.lat,
                  chargerObj.lng,
                )}
              />,
            )
          } else {
            chargerObj.charger_group?.chargers?.map(val =>
              view.push(
                <MainSearchItem
                  key={val.id}
                  text={getLocaleText(val.name)}
                  mainTitle={getLocaleText(val.location)}
                  onPress={hook.onSearchItemClickHandler.bind(
                    MainInput,
                    val.lat,
                    val.lng,
                  )}
                />,
              ),
            )
          }
          return view
        })}
      </>
    )

    return useMemo(
      // Vobi Todo: move this as components and wrap inside React.memo()
      () => (
        <TouchableOpacity
          activeOpacity={1}
          onPress={hook.closeClick}
          style={styles.container}>
          <>
            <Animated.View style={[styles.inputStyleContainer, hook.animate()]}>
              <HomeMainSearchInput
                setShowSearchContent={hook.setShowSearchContent.bind(
                  MainInput,
                  !hook.showSearchContent,
                )}
                showSearchContent={hook.showSearchContent}
                // Vobi todo: const { t } = useTranslation()
                placeholder={`${hook.t('home.location')}/${hook.t(
                  'home.organization',
                )}`}
                textHandler={hook.textHandler}
                InputSubmit={InputSubmit}
                closeClick={hook.closeClick}
                ref={hook.InputRef}
                // Vobi Todo: InputRef variables shouldn't start with upper case
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.searchContent,
                {height: hook._this.current.animatedSearchContentHeight},
              ]}>
              <View
                style={{
                  display: hook.showSearchContent ? 'flex' : 'none',
                  flex: 1,
                  marginBottom: 16,
                }}>
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
                  data={[1]}
                  renderItem={searchedItems}
                />
              </View>
            </Animated.View>
          </>
        </TouchableOpacity>
      ),
      [allChargers, setShowAll, hook],
    )
  },
)

export default MainInput

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
