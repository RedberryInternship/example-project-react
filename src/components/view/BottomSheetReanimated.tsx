import React, {useRef, forwardRef, ReactElement} from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Const, Colors, getLocaleText} from 'utils'
import {TextInput} from 'react-native-gesture-handler'
import {MainSearchItem, PopupFilter} from 'components'
import BottomSheet from 'reanimated-bottom-sheet'
import {useSafeArea} from 'react-native-safe-area-context'
import {Charger, ChargerDetail} from 'allTypes'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import Imgs from '../../../assets/images'

const screenHeight = Dimensions.get('window').height

enum ScrollPositionStatus {
  top,
  onScroll,
}

type _This = {
  text: string
  scrollPositionStatus: ScrollPositionStatus
}

type BottomSheetReanimatedProps = {
  onFilterClick: (index: number) => void
  selectedFilters: number[]
  filteredChargers: Charger[]
  onFilteredItemClick: (charger: Charger | ChargerDetail) => void
  textHandler: (text: string) => void
  inputSubmit: () => void
}

const BottomSheetReanimated = forwardRef(
  (
    {
      onFilterClick,
      selectedFilters,
      filteredChargers,
      onFilteredItemClick,
      textHandler,
      inputSubmit,
    }: BottomSheetReanimatedProps,
    ref: any,
  ) => {
    const _this = useRef<_This>({
      text: '',
      scrollPositionStatus: ScrollPositionStatus.top,
    })
    const InputRef = useRef<TextInput>(null)

    const {t} = useTranslation()

    const insets = useSafeArea()

    const closeClick = (): void => {
      _this.current.text = ''
      InputRef.current?.blur()
      Keyboard.dismiss()
      setTimeout(() => {
        Keyboard.dismiss()
      }, 400)
    }

    const renderHeaderComponent = (): ReactElement => (
      <View style={styles.headerComponent}>
        <View style={styles.headerComponentWrapper} />
        <Text style={styles.headerComponentText}>
          {t('home.allChargers').toUpperCase()}
        </Text>
        <View style={styles.textInputContainer}>
          <Image source={Imgs.iconSearch} style={styles.searchIcon} />
          <TextInput
            style={styles.textInput}
            placeholder={`${t('home.location')}/${t('home.organization')}`}
            keyboardType={'default'}
            onChangeText={textHandler}
            onSubmitEditing={inputSubmit}
            placeholderTextColor={Colors.primaryWhite}
            allowFontScaling={false}
            ref={InputRef}
            autoCorrect={false}
            editable={true}
            autoCapitalize={'none'}
            returnKeyType={'go'}
            testID={'mainInput'}
          />
          <TouchableWithoutFeedback
            onPress={closeClick}
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
            style={styles.closeTouchable}>
            <Image source={Imgs.delete} style={styles.deleteIcon} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
    const renderContent = (): ReactElement => {
      return (
        <View style={styles.bodyContainer}>
          <View style={styles.filterContainer}>
            {Const.FilterTypes.map((val: string, index: number) => (
              <PopupFilter
                key={index}
                text={t(val)}
                onPress={onFilterClick?.bind(BottomSheetReanimated, index)}
                active={Boolean(selectedFilters[index])}
              />
            ))}
          </View>

          {filteredChargers?.map((chargerObj: Charger) => {
            const view = []
            view.push(
              <MainSearchItem
                key={chargerObj.id}
                text={getLocaleText(chargerObj.location)}
                mainTitle={getLocaleText(chargerObj.name)}
                onPress={onFilteredItemClick?.bind(
                  BottomSheetReanimated,
                  chargerObj,
                )}
              />,
            )
            if (chargerObj.charger_group?.chargers?.length !== 0) {
              chargerObj.charger_group?.chargers?.map(val => (
                <MainSearchItem
                  key={val.id}
                  text={getLocaleText(val.location)}
                  mainTitle={getLocaleText(val.name)}
                  onPress={onFilteredItemClick?.bind(
                    BottomSheetReanimated,
                    val,
                  )}
                />
              ))
              // Vobi Todo: what does this code do
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
          snapPoints={[55, screenHeight - insets.top - insets.bottom - 65 - 12]}
          renderContent={renderContent}
          renderHeader={renderHeaderComponent}
          onCloseEnd={(): void => {
            Keyboard.dismiss()
          }}
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
    lineHeight: 22,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
})
