import React, {ReactElement} from 'react'
import {Text, View, Image, StyleSheet, ImageSourcePropType} from 'react-native'
import {useTranslation} from 'react-i18next'

type LegendItemProps = {
  text: string
  image: ImageSourcePropType
}
const LegendItem = ({text, image}: LegendItemProps): ReactElement => {
  const {t} = useTranslation()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t(text)}</Text>
      <Image source={image} style={styles.image} />
    </View>
  )
}

export default LegendItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 32,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  text: {
    color: '#436880',
    fontSize: 13,
  },
  image: {
    width: 23,
    height: 23,
    resizeMode: 'contain',
  },
})
