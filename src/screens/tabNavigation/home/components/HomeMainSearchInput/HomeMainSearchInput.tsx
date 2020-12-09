import React from 'react'
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  TouchableOpacity,
} from 'react-native'
import { Colors, Const } from 'utils'
import images from 'assets/images'

const HomeMainSearchInput = React.forwardRef(
  (
    {
      showSearchContent,
      placeholder,
      textHandler,
      InputSubmit,
      onFocus,
      closeClick,
    }: any,
    ref: any,
  ) => (
      <View style={[styles.inputStyle]}>
        <Image source={images.iconSearch} style={styles.searchImage} />
        <View
          pointerEvents={showSearchContent ? 'auto' : 'none'}
          style={styles.view}
        >
          <TextInput
            style={styles.searchTextInput}
            placeholder={placeholder}
            keyboardType="default"
            onChangeText={textHandler}
            onSubmitEditing={InputSubmit}
            onFocus={onFocus}
            placeholderTextColor={Colors.primaryWhite}
            allowFontScaling={false}
            ref={ref}
            autoCorrect={false}
            editable
            autoCapitalize="none"
            returnKeyType="go"
            testID="mainInput"
          />
        </View>
        <TouchableOpacity
          onPress={closeClick}
          style={styles.deleteTouchable}
          hitSlop={styles.touchableOpacityHitSlop}
        >
          <Image source={images.delete} style={styles.deleteImage} />
        </TouchableOpacity>
      </View>
    ),
)

export default HomeMainSearchInput

const styles = StyleSheet.create({
  container: {
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: 'white',
    marginHorizontal: 8,
  },
  view: {
    flex: 1,
  },
  inputStyleContainer: {
    flex: 1,
    width: Const.Width - 48,
    height: 36,
    position: 'relative',
    elevation: 1,
    backgroundColor: '#023D63',
    marginHorizontal: 24,
  },
  inputStyle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    height: 36,
    position: 'relative',
    flexDirection: 'row',
  },
  searchImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    position: 'absolute',
    left: 12,
  },
  searchTextInput: {
    paddingLeft: 40,
    marginRight: 32,
    color: Colors.primaryWhite,
    flex: 1,
    width: '100%',
  },
  deleteImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  deleteTouchable: {
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 12,
  },
  touchableOpacityHitSlop: {
    bottom: 25,
    right: 25,
    left: 25,
    top: 25,
  },
})
