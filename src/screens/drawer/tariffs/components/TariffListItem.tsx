import React, {ReactElement} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'

import {Colors} from 'utils'
import {BaseText} from 'components'

type TariffItemProps = {
  company: string
  power: string
  chargerType: string
  title: string
}

const TariffListItem = ({
  company,
  power,
  chargerType,
  title,
}: TariffItemProps): ReactElement => {
  const {t} = useTranslation()

  return (
    <View style={styles.container}>
      <View style={styles.innerUpperContainer}>
        <View style={[styles.upperFields, styles.borderRight]}>
          <BaseText style={styles.upperFieldsText}>
            {t('tariffs.company')}
          </BaseText>
        </View>
        <View style={[styles.upperFields, styles.borderRight]}>
          <BaseText style={styles.upperFieldsText}>
            {t('tariffs.power')}
          </BaseText>
        </View>
        <View style={[styles.upperFields]}>
          <BaseText style={styles.upperFieldsText}>
            {t('tariffs.chargerType')}
          </BaseText>
        </View>
      </View>

      <View style={styles.innerLowerContainer}>
        <View
          style={[styles.lowerFields, styles.borderBottom, styles.borderRight]}
        >
          <BaseText style={styles.lowerFieldsText}>{company}</BaseText>
        </View>
        <View
          style={[styles.lowerFields, styles.borderBottom, styles.borderRight]}
        >
          <BaseText style={styles.lowerFieldsText}>{power}</BaseText>
        </View>
        <View style={[styles.lowerFields, styles.borderBottom]}>
          <BaseText style={styles.lowerFieldsText}>{chargerType}</BaseText>
        </View>
      </View>
      <BaseText style={styles.title}>{title}</BaseText>
    </View>
  )
}

export default TariffListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryGrey,
    borderRadius: 10,
    marginBottom: 16,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  innerUpperContainer: {
    backgroundColor: Colors.secondaryLightGrey,
    flexDirection: 'row',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  upperFields: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  upperFieldsText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#11222D',
  },
  innerLowerContainer: {
    flexDirection: 'row',
  },
  lowerFields: {
    flex: 1,
    paddingVertical: 16,
    justifyContent: 'center',
    padding: 8,
  },
  lowerFieldsText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#9A99A2',
  },
  borderBottom: {
    borderBottomColor: 'rgba(17, 34, 45, 0.1)',
    borderBottomWidth: 1,
  },
  borderRight: {
    borderRightColor: 'rgba(17, 34, 45, 0.1)',
    borderRightWidth: 1,
  },
  title: {
    color: Colors.secondaryBlue,
    fontSize: 18,
    letterSpacing: 0.3,
    marginVertical: 16,
  },
})
