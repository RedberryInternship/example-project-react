import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Image,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import Autocomplete from 'react-native-autocomplete-input'
import { Colors } from 'utils'
import { BaseText } from 'components'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AutoCompleteDropdownFC } from './types'

const AutoCompleteDropdown: AutoCompleteDropdownFC = (props) => {
  const {
    title,
    data,
    onChange,
    image,
    errorText,
    zIndex,
    dropdownIcon,
    value,
  } = props
  const { t } = useTranslation()
  const [filteredMarks, setFilteredMarks] = useState<string[]>(data)
  const [hideResults, setHideResults] = useState<boolean>(true)
  const onTextChange = (text: string) => {
    onChange(text)
    if (!text) setFilteredMarks(data)
    else {
      setFilteredMarks(
        data.filter((val) => val.toLowerCase().includes(text?.toLowerCase()))
        ?? [],
      )
    }
    setHideResults(false)
  }

  return (
    <View style={[styles.container, { zIndex }]}>
      <BaseText style={styles.title}>{t(title)}</BaseText>
      <View style={styles.innerContainer}>
        <View style={styles.autocompleteContainer}>
          {image && (
            <Image
              source={image}
              style={[styles.inputImage]}
              resizeMode="contain"
            />
          )}
          <Autocomplete
            data={filteredMarks}
            defaultValue={value?.[0] ?? ''}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={onTextChange}
            hideResults={hideResults}
            keyExtractor={(item, i) => item + i}
            flatListProps={{}}
            onFocus={() => {
              console.log(['value', value])
              onTextChange(value?.[0] ?? '')
              setHideResults(false)
            }}
            onBlur={() => setHideResults(true)}
            containerStyle={styles.autoCompleteContainer}
            inputContainerStyle={[styles.autoCompleteInputContainer, { zIndex }]}
            listContainerStyle={[styles.autoCompleteListContainer, { zIndex: zIndex + 1 }]}
            listStyle={[styles.autoCompleteList, { zIndex: zIndex + 2 }]}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.listItemStyle, { zIndex }]}
                onPress={() => {
                  onChange(item)
                  setHideResults(true)
                }}
              >
                <BaseText style={{ opacity: 0.65, color: 'white' }}>
                  {item}
                </BaseText>
              </TouchableOpacity>
            )}
            style={[
              styles.Input,
            ]}
          />
          <View style={styles.dropdownIconContainer}>
            <Image
              style={
                [
                  styles.imageSizes,
                  !hideResults
                    ? styles.rotateDropdown
                    : null,
                ]
              }
              source={dropdownIcon}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      <BaseText style={[styles.errorText, { opacity: errorText ? 1 : 0 }]}>
        {errorText ? t(errorText) : ' '}
      </BaseText>
    </View>
  )
}

export default AutoCompleteDropdown

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  container: {
    flex: 0,
    marginVertical: 16,
    marginBottom: 8,
  },
  innerContainer: {
    width: '100%',
    position: 'relative',
    height: 48,
  },
  title: {
    flex: 0,
    width: '100%',
    fontSize: 13,
    color: Colors.primaryGray,
    marginBottom: 8,
  },
  Input: {
    backgroundColor: Colors.primaryDark,
    borderRadius: 6,
    flex: 0,
    flexGrow: 1,
    width: '100%',
    color: Colors.primaryWhite,
    height: 48,
    borderWidth: 0,
    paddingLeft: 50,
  },
  inputImage: {
    width: 24,
    flex: -1,
    height: 24,
    position: 'absolute',
    left: 12.5,
    top: 12.5,
    zIndex: 22,
    alignSelf: 'center',
  },
  errorText: {
    flex: 0,
    width: '100%',
    fontSize: 13,
    color: '#FF3B3B',
    marginTop: 4,
  },
  dropdownIconContainer: {
    position: 'absolute',
    right: 22,
    top: 20,
    zIndex: 5,
  },
  rotateDropdown: {
    transform: [{ rotate: '180deg' }],
  },
  listItemStyle: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 50,
    borderBottomColor: Colors.primaryGray.concat('22'),
    borderBottomWidth: 1,
    zIndex: 11,
  },
  imageSizes: {
    width: 10,
    height: 10,
  },
  autoCompleteContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  autoCompleteInputContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  autoCompleteListContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  autoCompleteList: {
    backgroundColor: '#0D1B24',
    borderWidth: 0,
    paddingBottom: 6,
    borderRadius: 6,
    maxHeight: 136,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    top: -3,
    margin: 0,
    padding: 0,
  },
})
