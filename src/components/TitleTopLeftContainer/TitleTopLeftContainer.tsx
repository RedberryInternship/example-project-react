import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import BaseText from 'components/BaseText'
import { TitleTopLeftContainerFC } from './types'

const TitleTopLeftContainer: TitleTopLeftContainerFC = (
  {
    title,
    data,
    onRenderItem,
    direction,
  },
) => {
  const { t } = useTranslation()

  return (
    <View>
      {title !== '' && (
        <BaseText style={styles.text}>{t(title ?? '')}</BaseText>
      )}

      {data !== null
        ? (
          data && data.length > 0 ? (
            <ScrollView
              horizontal={direction === 'row'}
              alwaysBounceHorizontal={false}
              alwaysBounceVertical={false}
            >
              {data.map(onRenderItem)}
            </ScrollView>
          ) : (
              <BaseText style={{ margin: 32, alignSelf: 'center' }}>
                {t('notFound')}
              </BaseText>
            )
        ) : (
          <BaseText style={{ margin: 32, alignSelf: 'center' }}>
            {t('loading')}
          </BaseText>
        )}
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
