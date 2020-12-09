import React, {
  forwardRef,
  useMemo,
} from 'react'
import {
  useWindowDimensions,
  StyleSheet,
  Keyboard,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Modalize } from 'react-native-modalize'
import { Const, Colors } from 'utils'
import {
  BottomSearchPanelResult,
  BottomSearchPanelHeader,
} from '../index'
import { BottomSearchPanelProps } from './types'
import useBottomSheetModalize from './useBottomSheetModalize'

const BottomSearchPanel = forwardRef<any, BottomSearchPanelProps>(
  (
    {
      onFilterClick,
      selectedFilters,
      filteredChargers,
      onFilteredItemClick,
      textHandler,
    },
    ref,
  ) => {
    const { height } = useWindowDimensions()
    const { top, bottom } = useSafeAreaInsets()
    const {
      inputRef,
      closeClick,
      onTextChange,
    } = useBottomSheetModalize(textHandler)

    const modalHeader = BottomSearchPanelHeader(
      {
        selectedFilters,
        onFilterClick,
        onTextChange,
        closeClick,
        inputRef,
      },
    )

    return useMemo(
      () => (
        <View style={styles.container} pointerEvents="box-none">
          <Modalize
            ref={ref}
            HeaderComponent={modalHeader}
            adjustToContentHeight={false}
            modalHeight={height - top - bottom - 65 - 12}
            alwaysOpen={55}
            rootStyle={{ elevation: 22, zIndex: 34 }}
            avoidKeyboardLikeIOS
            onPositionChange={(position) => {
              if (position === 'initial') {
                Keyboard.dismiss()
                inputRef.current && inputRef.current.blur()
              }
            }}
            onClose={() => {
              Keyboard.dismiss()
              inputRef.current?.blur()
            }}
            onClosed={() => {
              Keyboard.dismiss()
              inputRef.current?.blur()
            }}
            modalStyle={styles.modalizeModalStyle}
            withHandle={false}
            panGestureComponentEnabled
            panGestureEnabled
            closeOnOverlayTap
          >
            <BottomSearchPanelResult
              filteredChargers={filteredChargers}
              onFilteredItemClick={onFilteredItemClick}
            />
          </Modalize>
        </View>
      ),
      [
        filteredChargers,
        inputRef,
        height,
        bottom,
        top,
      ],
    )
  },
)

export default React.memo(BottomSearchPanel)

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
  searchContent: {
    width: Const.Width - 48,
    backgroundColor: Colors.primaryBackground,
    marginHorizontal: 24,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    position: 'relative',
    alignContent: 'stretch',
  },
  modalizeModalStyle: {
    elevation: 22,
    zIndex: 34,
    marginHorizontal: 8,
    backgroundColor: '#023D63',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
})
