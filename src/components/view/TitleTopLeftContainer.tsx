import React, {ReactElement} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {BaseText} from 'components'

type TitleTopLeftContainer = {
  title?: string
  data: Array<any> | null
  onRenderItem: (value: any, index: number) => {} | null | undefined
  direction: 'row' | 'column'
}
const TitleTopLeftContainer = ({
  title,
  data,
  onRenderItem,
  direction,
}: TitleTopLeftContainer): ReactElement => {
  const {t} = useTranslation()
  return (
    <View>
      {title !== '' && <Text style={styles.text}>{t(title ?? '')}</Text>}
      <View style={{flexDirection: direction}}>
        {data !== null ? (
          data && data.length > 0 ? (
            data.map(onRenderItem)
          ) : (
            <BaseText style={{margin: 32, alignSelf: 'center'}}>
              {t('notFound')}
            </BaseText>
          )
        ) : (
          <BaseText style={{margin: 32, alignSelf: 'center'}}>
            {t('loading')}
          </BaseText>
        )}
      </View>
    </View>
  )
}

export default TitleTopLeftContainer

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 16,
  },
})
