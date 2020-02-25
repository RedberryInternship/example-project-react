import React from 'react'
import {View} from 'react-native'
import {Const} from 'utils'
import {PhoneNumberInput, ReceiveCode} from 'components'

// eslint-disable-next-line react/display-name
const FilterTextItem = React.memo(
  ({hook, startCodeAnimation}: any) => {
    const codeTextHandler = (text: string): void => {
      hook._this.current.code = text
    }
    const codeInputSubmit = (): void => {
      // hook.current.code = text
    }

    const phoneInputSubmitHandler = (): void => {
      hook.phoneInputSubmit()
    }

    return (
      <View style={{width: Const.Width, paddingHorizontal: 16}}>
        <PhoneNumberInput
          _this={hook._this}
          onSubmit={phoneInputSubmitHandler}
          codeRef={hook.codeRef}
          ref={hook.phoneRef}
        />
        <ReceiveCode
          ref={hook.codeRef}
          onChangeText={codeTextHandler}
          onSubmit={codeInputSubmit}
          recieveCode={phoneInputSubmitHandler}
          startCodeAnimation={startCodeAnimation}
        />
      </View>
    )
  },
  ({activePage}, {activePage: nextActivePage}) =>
    nextActivePage != 0 || activePage != 0,
)

export default FilterTextItem
