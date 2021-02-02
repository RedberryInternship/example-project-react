import React from 'react'
import {
  TouchableHighlight,
  StyleSheet,
  FlatList,
  View,
} from 'react-native'
import Modal from 'react-native-modal'
import BaseText from 'components/BaseText'
import colors from 'utils/colors'
import { withTranslation } from 'react-i18next'
import { ListItem } from './components'
import { State, Props } from './types'

class SelectCar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      visible: false,
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  closeModal() {
    this.setState((prevState) => ({ ...prevState, visible: false }))
  }

  openModal() {
    const { disabled, onPress } = this.props
    onPress && onPress()

    if (!disabled) {
      this.setState((prevState) => ({ ...prevState, visible: true }))
    }
  }

  render() {
    const { visible } = this.state
    const {
      selectedValue,
      onChange,
      title,
      data,
      labels,
    } = this.props

    return (
      <>
        <TouchableHighlight onPress={this.openModal} hitSlop={styles.hitSlop}>
          <View style={styles.input}>
            <BaseText style={styles.inputText}>
              {
                selectedValue === undefined
                  ? ''
                  : selectedValue
              }
            </BaseText>
          </View>
        </TouchableHighlight>
        <Modal
          backdropColor="rgba(255, 255, 255, .5)"
          onBackdropPress={this.closeModal}
          isVisible={visible}
          hasBackdrop
          animationOutTiming={1000}
        >
          <View style={styles.modal}>
            <BaseText style={styles.headerText}>{title}</BaseText>
            <FlatList
              style={styles.contentContainer}
              data={data}
              renderItem={({ item, index }) => (
                <ListItem
                  value={item}
                  onPress={() => {
                    onChange(item)
                    this.closeModal()
                  }}
                  label={labels[index]}
                  selected={item === selectedValue}
                />
              )}
            />
          </View>
        </Modal>
      </>
    )
  }
}

export default withTranslation()(SelectCar)

const styles = StyleSheet.create(
  {
    modal: {
      margin: 20,
      backgroundColor: colors.primaryBackground,
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      height: '50%',
      width: '90%',
      alignSelf: 'center',
    },
    title: {
      flex: 0,
      width: '100%',
      fontSize: 13,
      color: colors.primaryGray,
      marginBottom: 8,
    },
    contentContainer: {
      width: '100%',
      marginTop: 30,
      paddingRight: 20,
    },
    headerText: {
      color: colors.primaryWhite,
      fontSize: 16,
    },
    input: {
      backgroundColor: colors.primaryDark,
      borderRadius: 6,
      flex: 0,
      width: '100%',
      height: '100%',
      color: colors.primaryWhite,
      borderWidth: 0,
      display: 'flex',
      justifyContent: 'center',
    },
    inputText: {
      textAlign: 'center',
    },
    hitSlop: {
      top: 10,
      bottom: 10,
      right: 10,
      left: 10,
    },
    inputImage: {
      width: 24,
      flex: -1,
      height: 24,
      position: 'absolute',
      left: 12.5,
      top: 12.5,
      zIndex: 22,
      alignSelf: 'center',
    },
    dropDownIcon: {
      width: 10,
      flex: -1,
      height: 10,
      position: 'absolute',
      right: 22,
      top: 20,
      zIndex: 22,
      alignSelf: 'center',
    },
  },
)
