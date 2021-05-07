import React from 'react'
import {
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Image,
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
      dropdownIcon,
      onChange,
      testID,
      title,
      image,
      data,
      t,
    } = this.props
    return (
      <>
        <BaseText style={styles.title}>{t(title)}</BaseText>
        <TouchableHighlight onPress={this.openModal} hitSlop={styles.hitSlop} testID={testID}>
          <View style={styles.input}>
            <Image
              source={image}
              style={[styles.inputImage]}
              resizeMode="contain"
            />
            <BaseText>{selectedValue === undefined ? '' : selectedValue}</BaseText>
            <Image
              source={dropdownIcon}
              style={[styles.dropDownIcon]}
              resizeMode="contain"
            />
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
            <BaseText style={styles.headerText}>{t(title)}</BaseText>
            <ScrollView style={styles.contentContainer}>
              {
                data.map((val) => (
                  <ListItem
                    onPress={() => {
                      onChange(val)
                      this.closeModal()
                    }}
                    key={val}
                    value={val}
                    selected={val === selectedValue}
                  />
                ))
              }
            </ScrollView>
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
      flexGrow: 1,
      width: '100%',
      color: colors.primaryWhite,
      height: 48,
      borderWidth: 0,
      paddingLeft: 50,
      display: 'flex',
      justifyContent: 'center',
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
