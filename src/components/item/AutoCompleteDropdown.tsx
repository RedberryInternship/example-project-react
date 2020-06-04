import React, {ReactElement, useState} from 'react'
import {
  Text,
  View,
  StyleSheet,
  // TouchableOpacity,
  ImageSourcePropType,
  Image,
} from 'react-native'
import {useTranslation} from 'react-i18next'
import Autocomplete from 'react-native-autocomplete-input'

import {Colors} from 'utils'
import {BaseText} from 'components'
import colors from 'utils/colors'
import BaseNativeTouchable from 'components/baseUI/BaseNativeTouchable'
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import {CarMarkAndModelTypes} from 'allTypes'
type AutoCompleteDropdownProps = {
  title: string
  data: string[]
  defaultValue: string
  errorText: string
  onChange: (text: string) => void
  image: ImageSourcePropType
  zIndex: number
}
const AutoCompleteDropdown = ({
  title,
  data,
  onChange,
  image,
  errorText,
  zIndex,
  ...props
}: AutoCompleteDropdownProps): ReactElement => {
  const {t} = useTranslation()
  const [filteredMarks, setFilteredMarks] = useState<string[]>(data)
  const [hideResults, setHideResults] = useState<boolean>(true)
  const ontextChange = (text: string) => {
    onChange(text)
    if (!text) setFilteredMarks(data)
    else
      setFilteredMarks(
        data.filter((val) => val.toLowerCase().includes(text?.toLowerCase())) ??
          [],
      )
    setHideResults(false)
  }
  return (
    <View style={[styles.container, {zIndex}]}>
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
            {...props}
            data={filteredMarks}
            defaultValue={props.value?.[0]}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={ontextChange}
            hideResults={hideResults}
            keyExtractor={(item, i) => item + i}
            flatListProps={
              {
                // keyboardShouldPersistTaps: 'always',
                // keyboardDismissMode: 'none',
              }
            }
            onFocus={() => {
              ontextChange(props.value?.[0] ?? '')
              setHideResults(false)
            }}
            onBlur={() => setHideResults(true)}
            containerStyle={{
              backgroundColor: 'transparent',
              borderWidth: 0,
            }}
            inputContainerStyle={{
              backgroundColor: 'transparent',
              borderWidth: 0,
              elevation: 10,
              zIndex: zIndex,
            }}
            listContainerStyle={{
              backgroundColor: 'transparent',
              borderWidth: 0,
              // elevation: 2,
              // overflow: 'hidden',
              zIndex: zIndex + 1,
            }}
            listStyle={{
              backgroundColor: '#0D1B24',
              borderWidth: 0,
              paddingBottom: 6,
              borderRadius: 6,
              maxHeight: 136,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              zIndex: zIndex + 2,
              elevation: 2,
            }}
            renderItem={({item}: {item: string}) => (
              <TouchableOpacity
                style={[styles.listItemStyle, {zIndex}]}
                onPress={() => {
                  onChange(item)
                  setHideResults(true)
                }}
              >
                <BaseText style={{opacity: 0.65, color: 'white'}}>
                  {item}
                </BaseText>
              </TouchableOpacity>
            )}
            style={[
              styles.Input,
              {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
            ]}
          />
          {/* <BaseText style={styles.baseText}>^</BaseText> */}
        </View>
      </View>
      <BaseText style={[styles.errorText, {opacity: errorText ? 1 : 0}]}>
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
    // zIndex: 11,
  },

  container: {
    flex: 0,
    marginVertical: 16,
    marginBottom: 8,
    // zIndex: 11,
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
  baseText: {
    position: 'absolute',
    right: 8,
    top: 8,
    color: 'white',
    fontSize: 18,
  },
  listItemStyle: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 50,
    borderBottomColor: Colors.primaryGray.concat('22'),
    borderBottomWidth: 1,
    zIndex: 11,
  },
})
