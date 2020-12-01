import React, { ReactElement } from 'react'
import {
  StyleSheet,
  Image,
  View,
} from 'react-native'
import { Colors } from 'utils'
import images from 'assets/images'
import { BaseText } from 'components'

type TariffProps = {
  title: string
  description: string
}

const TariffDetail = ({ title, description }: TariffProps): ReactElement => (
  <View style={styles.container}>
    <Image source={images.alertCircle} style={styles.image} />
    <BaseText style={styles.description}>
      {' '}
      {description}
      {' '}
    </BaseText>
    <BaseText style={styles.title}>
      {' '}
      {title}
      {' '}
    </BaseText>
  </View>
)

export default TariffDetail

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryGrey,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingHorizontal: 64,
    paddingVertical: 16,
    marginTop: 32,
    marginBottom: 16,
  },
  image: {
    width: 40,
    height: 40,
  },
  description: {
    color: Colors.primaryBackground,
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 13,
    letterSpacing: 0.3,
  },
  title: {
    color: Colors.secondaryBlue,
    fontSize: 18,
    letterSpacing: 0.3,
  },
})
