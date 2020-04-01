import React from 'react'
import {View, Alert} from 'react-native'
import {Const} from 'utils'
import {PhoneNumberInput, ReceiveCode} from 'components'

// eslint-disable-next-line react/display-name
const FilterTextItem = React.memo(
  // Vobi Todo: Component should be named same as file
  ({hook, startCodeAnimation}: any) => {
    // Vobi todo: no any values
    // Vobi todo: do not pass hooks as parameter
    const codeTextHandler = (text: string): void => {
      // Vobi todo: do not use _this
      hook._this.current.code = text
    }

    return (
      <View style={{width: Const.Width, paddingHorizontal: 16}}>
        <PhoneNumberInput
          _this={hook._this}
          onSubmit={hook.buttonClickHandler}
          codeRef={hook.codeRef}
          ref={hook.phoneRef}
        />
        <ReceiveCode
          ref={hook.codeRef}
          onChangeText={codeTextHandler}
          receiveCode={hook.phoneInputSubmit}
          startCodeAnimation={startCodeAnimation}
        />
      </View>
    )
  },
  ({activePage}, {activePage: nextActivePage}) =>
    nextActivePage != 0 || activePage != 0,
)

export default FilterTextItem
