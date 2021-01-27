import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { selectUser } from 'state/selectors'
import { CardListItem, BaseAddCardButton, BaseText } from 'components'
import { useTranslation } from 'react-i18next'
import colors from 'utils/colors'
import useCardListView from './useCardListView'

const CardListView: FC = () => {
  const { navigate } = useNavigation()
  const {
    setDefaultCreditCard,
    removeUserCreditCard,
    toggleUpdateMode,
    inUpdateMode,
  } = useCardListView()
  const { user } = useSelector(selectUser)
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <BaseText>{t('settings.cards')}</BaseText>
        <TouchableOpacity onPress={toggleUpdateMode}>
          <BaseText style={styles.updateText}>
            {
              inUpdateMode
                ? t('done')
                : t('update')
            }
          </BaseText>
        </TouchableOpacity>
      </View>
      {user?.user_cards.map((val) => (
        <CardListItem
          key={val.id}
          code={val.masked_pan}
          selected={!!val.default}
          selectDefaultCreditCard={() => setDefaultCreditCard(val.id)}
          deleteCreditCard={() => removeUserCreditCard(val.id)}
          inUpdateMode={inUpdateMode}
        />
      ))}
      <BaseAddCardButton
        onPress={() => navigate('CardAdd')}
      />
    </View>
  )
}

export default CardListView

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingTop: 50,
  },
  headingContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  updateText: {
    color: colors.primaryGreen,
  },
})
