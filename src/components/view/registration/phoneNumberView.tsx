import React, {useState, useMemo, useEffect} from 'react';
import {View, Keyboard, } from 'react-native';
import { Const } from '../../../../src/utils';
import { PhoneNumberInput, ReceiveCode } from '../../../../src/components';


// eslint-disable-next-line react/display-name
const filterTextItem =React.memo( ({_this,hook, startCodeAnimation } : any) => {
  
  const codeTextHandler= (text : string) =>{
    _this.current.code = text
  }
  const codeInputSubmit= () =>{
    // hook.current.code = text
  }
 
  const phoneInputSubmitHandler= () =>{
    hook.phoneInputSubmit()
  }

  return (
    <View style={{width: Const.Width, paddingHorizontal:16}} >
      <PhoneNumberInput
          _this={_this}
          onSubmit={phoneInputSubmitHandler}
          // value={hook._this.current.phone}
          // onFocus={hook.onFocusPhone}
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
}, ({activePage}, {activePage : nextActivePage}) => nextActivePage != 0 || activePage != 0 );


export default filterTextItem;
