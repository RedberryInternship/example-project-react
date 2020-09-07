import React, {
  useRef,
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  StyleSheet,
  View,
  useWindowDimensions,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { TextInput, FlatList } from 'react-native-gesture-handler'
import BottomSheet from 'reanimated-bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { Modalize } from 'react-native-modalize'

import { Charger, ChargerDetail } from 'allTypes'

import { Const, Colors, getLocaleText } from 'utils'
import images from 'assets/images'
import { BottomSheetFilterItem, MainSearchItem } from '../components'
import { BaseText } from 'components'

type _This = {
  text: string
}

type BottomSheetModalizeProps = {
  onFilterClick: (index: number) => void
  selectedFilters: boolean[]
  allChargers: Charger[]
  onFilteredItemClick: (charger: ChargerDetail) => void
  textHandler: (text: string) => void
}

const BottomSheetReanimated = forwardRef(
  (
    {
      allChargers,
      onFilteredItemClick,
      textHandler,
    }: BottomSheetModalizeProps,
    ref: any,
  ) => {
    const _this = useRef<_This>({
      text: '',
    })
    // Vobi Todo: do not use ref's instead of state
    const inputRef = useRef<TextInput>(null)
    const backHandlerRef = useRef<any>(null)
    const { t } = useTranslation()
    const height = useWindowDimensions().height

    const { top, bottom } = useSafeAreaInsets()

    const [chargersList, setChargersList] = useState<Charger[]>(allChargers)
    const selectedFilters = [false, false, false, false, false]

    const closeClick = useCallback((): void => {
      if (_this.current.text !== '') {
        textHandler('')
        // Vobi Todo: setText('')
        _this.current.text = ''
        inputRef.current?.clear()
      }
    }, [textHandler, inputRef, _this])

    const onTextChange =
      (text: string): void => {
        _this.current.text = text
        searchChargers(text)
      }

    useEffect(() => {
      backHandlerRef.current = BackHandler.addEventListener(
        'hardwareBackPress',
        handleAndroidBack,
      )
    }, [])

    const handleAndroidBack = useCallback(() => {
      // if () {
      // ref.current?.snapTo(0)

      //   return true
      // }
      return false
    }, [])

    const filterChargers = (filterIndex: number) => {
      selectedFilters[filterIndex] = !selectedFilters[filterIndex];
      const chargers = allChargers;
      const all = selectedFilters.indexOf(true) > -1 ? false : true;
      let list = chargers.filter((charger, index) => {
        if (selectedFilters[0] && charger.status === 'ACTIVE') {
          return true;
        }
        if (selectedFilters[1] && charger.status === 'CHARGING') {
          return true;
        }
        if (selectedFilters[2] && charger.connector_types?.length > 0 &&
          (charger.connector_types[0]?.name === 'Combo 2' || charger.connector_types[0]?.name === 'Chademo')) {
          return true;
        }
        if (selectedFilters[3] && charger.connector_types?.length > 0 && charger.connector_types[0]?.name === 'Type 2') {
          return true;
        }
        if (selectedFilters[4] && charger?.public == 1) {
          return true;
        }
        if (selectedFilters[5] && charger?.public == 0) {
          return true;
        }
        return all;
      })
      setChargersList(list);
    }

    const searchChargers = (text: any) => {
      const chargers = chargersList.length ? chargersList : allChargers;
      const list = text !== "" ? chargers.filter(charger => {
        if(charger?.code.includes(text)){
          return true;
        }
        if(charger?.name.ka){
          if(charger?.name.ka.includes(text)){
            return true;
          }
        }
        if(charger?.name.en){
          if(charger?.name.en.includes(text)){
            return true;
          }
        }

        if(charger?.name.ru){
          if(charger?.name.ru.includes(text)){
            return true;
          }
        }
        return false;
      }) : allChargers;
      if(list.length){
        setChargersList(list)
      }
    }

    const renderHeaderComponent = useCallback(
      (): ReactElement => (
        <View style={styles.headerComponent}>
          <View style={styles.headerComponentWrapper} />
          <BaseText style={styles.headerComponentText}>
            {t('home.allChargers')}
          </BaseText>
          <View style={styles.textInputContainer}>
            <Image source={images.iconSearch} style={styles.searchIcon} />
            <TextInput
              style={styles.textInput}
              placeholder={`${t('home.location')}/${t('home.organization')}`}
              keyboardType={'default'}
              onChangeText={onTextChange}
              placeholderTextColor={Colors.primaryWhite}
              allowFontScaling={false}
              ref={inputRef}
              autoCorrect={false}
              editable={true}
              autoCapitalize={'none'}
              returnKeyType={'go'}
              testID={'mainInput'}
            />
            <TouchableWithoutFeedback
              onPress={closeClick}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              style={styles.closeTouchable}
            >
              <Image source={images.delete} style={styles.deleteIcon} />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.filterContainer}>
            {Const.FilterTypes.map((val: string, index: number) => (
              <BottomSheetFilterItem
                key={index}
                text={t(val)}
                onPress={() => filterChargers(index)}
                active={!!selectedFilters[index]}
              />
            ))}
          </View>
        </View>
      ),
      [t],
    )

    const renderContent = (): ReactElement => {
      return (
        <View style={styles.bodyContainer}>
          {/* <FlatList
            keyboardShouldPersistTaps={'handled'}
            data={filteredChargers}
            renderItem={({item: chargerObj, index}) => {
              const view = []
             //  bottom stuff... 
              return view
            }}
          /> */}

          {chargersList?.map((chargerObj: Charger, index: number) => {

            const view = []
            if (chargerObj.charger_group?.chargers?.length !== 0) {
              view.push(
                <MainSearchItem
                  key={chargerObj.id + getLocaleText(chargerObj.name) + index}
                  text={getLocaleText(chargerObj.location)}
                  mainTitle={getLocaleText(chargerObj.name)}
                  onPress={onFilteredItemClick?.bind(
                    BottomSheetReanimated,
                    chargerObj,
                  )}
                />,
              )
            } else {
              chargerObj.charger_group?.chargers?.map((val, index: number) => {
                console.log("Chargers:", chargerObj.charger_group?.chargers);
                view.push(
                  <MainSearchItem
                    key={val.id + getLocaleText(val.name) + index}
                    text={getLocaleText(val.location)}
                    mainTitle={getLocaleText(val.name)}
                    onPress={onFilteredItemClick?.bind(
                      BottomSheetReanimated,
                      val,
                    )}
                  />,
                )
              })
            }
            return view
          })}
          <KeyboardSpacer />
        </View>
      )
    }

    return useMemo(
      () => (
        <View style={styles.container} pointerEvents={'box-none'}>
          <Modalize
            ref={ref}
            // contentRef={contentRef}
            HeaderComponent={renderHeaderComponent}
            adjustToContentHeight={false}
            modalHeight={height - top - bottom - 65 - 12}
            alwaysOpen={55}
            rootStyle={{ elevation: 22, zIndex: 34 }}
            avoidKeyboardLikeIOS={true}
            onClose={() => {
              Keyboard.dismiss()
              inputRef.current && inputRef.current.blur()
            }}
            onClosed={() => {
              Keyboard.dismiss()
              inputRef.current && inputRef.current.blur()
            }}
            modalStyle={{
              elevation: 22,
              zIndex: 34,
              marginHorizontal: 8,
              backgroundColor: '#023D63',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
            withHandle={false}
            panGestureComponentEnabled={true}
            panGestureEnabled={true}
            closeOnOverlayTap={true}
          >
            {renderContent()}
          </Modalize>
        </View>
      ),
      [
        backHandlerRef,
        inputRef,
        height,
        top,
        bottom,
        renderHeaderComponent,
        renderContent,
      ],
    )
  },
)

export default React.memo(BottomSheetReanimated)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    elevation: 17,
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 44,
  },
  headerComponent: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#023D63',
    flex: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 0,
  },
  headerComponentWrapper: {
    backgroundColor: '#FFFFFF',
    width: 60,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: 8,
  },
  headerComponentText: {
    flex: 0,
    fontSize: 11,
    color: '#FFFFFF',
    alignSelf: 'center',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  searchIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    position: 'absolute',
  },
  textInputContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    height: 36,
    position: 'relative',
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryBackground,
  },
  textInput: {
    paddingLeft: 32,
    marginRight: 32,
    color: Colors.primaryWhite,
    height: 40,
  },
  deleteIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    position: 'absolute',
    right: 0,
  },
  closeTouchable: { backgroundColor: 'red' },
  searchContent: {
    width: Const.Width - 48,
    backgroundColor: Colors.primaryBackground,
    marginHorizontal: 24,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    position: 'relative',
    alignContent: 'stretch',
  },
  bodyContainer: {
    backgroundColor: '#023D63',
    paddingBottom: 16,
    marginTop: 0,
    minHeight: '100%',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
})
