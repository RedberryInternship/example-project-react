import React from 'react'
import {
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  Image,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import BaseText from 'components/BaseText'
import images from 'assets/images'
import * as Const from 'utils/const'
import colors from 'utils/colors'
import BottomSearchPanelFilterItem from '../BottomSearchPanelFilterItem'
import { BottomSearchPanelFC } from './types'

const BottomSearchPanelHeader: BottomSearchPanelFC = (
  {
    selectedFilters,
    onFilterClick,
    onTextChange,
    closeClick,
    inputRef,
  },
) => {
  const { t } = useTranslation()

  return (
    <View style={styles.headerComponent}>
      <View style={styles.headerComponentWrapper} />
      <BaseText style={styles.headerComponentText} testID="BottomFilterHeader">
        {t('home.allChargers')}
      </BaseText>
      <View style={styles.textInputContainer}>
        <Image source={images.iconSearch} style={styles.searchIcon} />
        <TextInput
          style={styles.textInput}
          placeholder={`${t('home.location')}/${t('home.organization')}`}
          keyboardType="default"
          onChangeText={onTextChange}
          onSubmitEditing={() => { }}
          placeholderTextColor={colors.primaryWhite}
          allowFontScaling={false}
          ref={inputRef}
          autoCorrect={false}
          editable
          autoCapitalize="none"
          returnKeyType="go"
          testID="SearchChargerInput"
        />
        <TouchableWithoutFeedback
          onPress={closeClick}
          hitSlop={{
            top: 15, bottom: 15, left: 15, right: 15,
          }}
          style={styles.closeTouchable}
        >
          <Image source={images.delete} style={styles.deleteIcon} />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.filterContainer}>
        {Const.FilterTypes.map((val: string, index: number) => (
          <BottomSearchPanelFilterItem
            key={val}
            text={t(val)}
            active={!!selectedFilters[index]}
            onPress={() => onFilterClick(index)}
          />
        ))}
      </View>
    </View>
  )
}

export default BottomSearchPanelHeader

const styles = StyleSheet.create(
  {
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
    textInputContainer: {
      alignItems: 'stretch',
      justifyContent: 'center',
      height: 36,
      position: 'relative',
      paddingBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: colors.primaryBackground,
    },
    textInput: {
      paddingLeft: 32,
      marginRight: 32,
      color: colors.primaryWhite,
      height: 40,
    },
    searchIcon: {
      width: 16,
      height: 16,
      resizeMode: 'contain',
      position: 'absolute',
    },
    deleteIcon: {
      width: 16,
      height: 16,
      resizeMode: 'contain',
      position: 'absolute',
      right: 0,
    },
    closeTouchable: {
      backgroundColor: 'red',
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
  },
)
