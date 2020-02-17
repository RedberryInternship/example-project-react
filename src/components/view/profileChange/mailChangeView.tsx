import React from 'react';

import {
  View,
  StyleSheet
} from 'react-native';


// components
import { BaseInput } from '../..';

// hooks
import { useEmailChange } from '../../../hooks';


const mailChangeView = ({ navigation, clicked, setClicked }: any) => {

  const hook = useEmailChange(navigation, clicked, setClicked);

  return (
    <View style={styles.container}>
      <BaseInput
        title={"settings.newMail"}
        image={require("../../../../assets/images/icons/mail.png")}
        value={hook.email}
        onChangeText={hook.onChangeText}
        onSubmit={hook.onSubmit}
        ref={hook.emailInputRef}
      />
    </View>
  );
}



export default mailChangeView

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 80,
  },
})
