import React, {ReactElement} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {useTranslation} from 'react-i18next'

import {Colors} from 'utils'

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
          <Text style={styles.upperFieldsText}>{t('tariffs.company')}</Text>
        </View>
        <View style={[styles.upperFields, styles.borderRight]}>
          <Text style={styles.upperFieldsText}>{t('tariffs.power')}</Text>
        </View>
        <View style={[styles.upperFields]}>
          <Text style={styles.upperFieldsText}>{t('tariffs.chargerType')}</Text>
        </View>
      </View>

      <View style={styles.innerLowerContainer}>
        <View
          style={[styles.lowerFields, styles.borderBottom, styles.borderRight]}>
          <Text style={styles.lowerFieldsText}>{company}</Text>
        </View>
        <View
          style={[styles.lowerFields, styles.borderBottom, styles.borderRight]}>
          <Text style={styles.lowerFieldsText}>{power}</Text>
        </View>
        <View style={[styles.lowerFields, styles.borderBottom]}>
          <Text style={styles.lowerFieldsText}>{chargerType}</Text>
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
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
  },
  upperFieldsText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  innerLowerContainer: {
    flexDirection: 'row',
  },
  lowerFields: {
    flex: 1,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  lowerFieldsText: {
    textAlign: 'center',
    textAlignVertical: 'center',
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
