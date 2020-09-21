import React, {
  useRef,
  forwardRef,
  ReactElement,
  useCallback,
  useEffect,
} from 'react'
import {
  StyleSheet,
  View,
  useWindowDimensions,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import {TextInput} from 'react-native-gesture-handler'
import BottomSheet from 'reanimated-bottom-sheet'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import {Charger, ChargerDetail} from 'allTypes'
import {Const, Colors, getLocaleText} from 'utils'
import images from 'assets/images'
import BottomSheetFilterItem from './BottomSheetFilterItem'
import MainSearchItem from './MainSearchItem'
import {BaseText} from 'components'

type _This = {
  text: string
}

type BottomSheetReanimatedProps = {
  onFilterClick: (index: number) => void
  selectedFilters: number[]
  filteredChargers: Charger[]
  onFilteredItemClick: (charger: ChargerDetail) => void
  textHandler: (text: string) => void
}

const BottomSheetReanimated = forwardRef(
  (
    {
      onFilterClick,
      selectedFilters,
      filteredChargers,
      onFilteredItemClick,
      textHandler,
    }: BottomSheetReanimatedProps,
    ref: any,
  ) => {
    const _this = useRef<_This>({
      text: '',
    })
    // Vobi Todo: do not use ref's instead of state
    const inputRef = useRef<TextInput>(null)
    const backHandlerRef = useRef<any>(null)
    const {t} = useTranslation()
    const height = useWindowDimensions().height

    const insets = useSafeAreaInsets()

    const closeClick = (): void => {
      if (_this.current.text !== '') {
        textHandler('')
        _this.current.text = ''
        inputRef.current?.clear()
      } else {
        inputRef.current?.blur()
        ref.current?.snapTo(0)
        ref.current?.snapTo(0)
        setTimeout(() => {
          Keyboard.dismiss()
        }, 400)
      }
    }
    const onTextChange = (text: string): void => {
      _this.current.text = text
      textHandler(text)
    }
    useEffect(() => {
      backHandlerRef.current = BackHandler.addEventListener(
        'hardwareBackPress',
        handleAndroidBack,
      )
    }, [])

    const handleAndroidBack = useCallback(() => false, [])

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
              onSubmitEditing={() => {}}
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
              hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
              style={styles.closeTouchable}
            >
              <Image source={images.delete} style={styles.deleteIcon} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      ),
      [t],
    )

    const renderContent = (): ReactElement => {
      return (
        <View style={styles.bodyContainer}>
          <View style={styles.filterContainer}>
            {Const.FilterTypes.map((val: string, index: number) => (
              <BottomSheetFilterItem
                key={index}
                text={t(val)}
                onPress={onFilterClick?.bind(BottomSheetReanimated, index)}
                active={!!selectedFilters[index]}
              />
            ))}
          </View>

          {filteredChargers?.map((chargerObj: Charger, index: number) => {
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
              chargerObj.charger_group?.chargers?.map((val, index: number) =>
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
                ),
              )
            }
            return view
          })}
          <KeyboardSpacer />
        </View>
      )
    }

    return (
      <View style={styles.container} pointerEvents={'box-none'}>
        <BottomSheet
          ref={ref}
          snapPoints={[55, height - insets.top - insets.bottom - 65 - 12]}
          renderContent={renderContent}
          renderHeader={renderHeaderComponent}
          onCloseEnd={Keyboard.dismiss}
        />
      </View>
    )
  },
)

export default BottomSheetReanimated

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
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#023D63',
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: 8,
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
  closeTouchable: {backgroundColor: 'red'},
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
    marginHorizontal: 8,
    marginTop: 0,
    minHeight: '100%',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
})
