import React, { ReactElement } from 'react'
import { View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { Const } from 'utils'
import {
  LocationPermission,
  RegistrationType1,
  PrivacyPolicy,
  ChargingModal,
  LegendType2,
  MapPopUp,
} from 'components'
import { ModalTypes } from 'types'
import { CustomModalInterface, Config } from './types'
import { initialState } from './config'

class CustomModal extends React.PureComponent implements CustomModalInterface {
  ref: any = React.createRef()

  constructor(props: any) {
    super(props)
    this.state = { ...initialState }
  }

  showModal = (): void => {
    this.setState({
      visible: true,
    })
  }

  closeModal = (): void => {
    const { onCloseClick } = this.state.config

    this.setState({
      visible: false,
    })

    onCloseClick && onCloseClick()
  }

  customUpdate = (visible: boolean, config?: Config): void => {
    this.setState({
      ...initialState,
      visible,
      config: config ?? initialState.config,
    })
  }

  renderView = (): ReactElement | undefined => {
    const {
      shouldAgree,
      subType,
      type,
      data,
    } = this.state.config

    switch (type) {
      case ModalTypes.REGISTER:
        return <RegistrationType1 onPress={this.closeModal} />
      case ModalTypes.LEGEND:
        return <LegendType2 onPress={this.closeModal} />
      case ModalTypes.CHARGER_WRAPPER:
        return (
          <ChargingModal
            onPress={this.closeModal}
            subType={subType}
            data={data}
          />
        )
      case ModalTypes.MAP_POPUP:
        return <MapPopUp close={this.closeModal} data={data} />
      case ModalTypes.LOCATION_PERMISSION:
        return <LocationPermission onPress={this.closeModal} data={data} />
      case ModalTypes.PRIVACY_AND_POLICY:
        return <PrivacyPolicy onPress={this.closeModal} shouldAgree={shouldAgree} />
      default: {
        return <></>
      }
    }
  }

  render(): ReactElement {
    const { visible, config } = this.state
    const { type, shouldAgree } = config

    shouldAgree as boolean

    return (
      <Modal
        isVisible={visible}
        ref={this.ref}
        onSwipeComplete={!shouldAgree ? this.closeModal : undefined}
        swipeDirection={['down']}
        useNativeDriver
        onBackdropPress={!shouldAgree ? this.closeModal : undefined}
        onBackButtonPress={!shouldAgree ? this.closeModal : undefined}
        hideModalContentWhileAnimating
        propagateSwipe
        coverScreen
        statusBarTranslucent
      >
        <View
          style={[
            styles.modalContentContainer,
            {
              justifyContent:
                config && type === ModalTypes.CHARGER_WRAPPER
                  ? 'flex-start'
                  : 'space-between',
              height:
                config
                  && type === ModalTypes.MAP_POPUP
                  ? 'auto'
                  : Const.Height * 0.7,
            },
          ]}
        >
          {this.renderView()}
        </View>
      </Modal>
    )
  }
}

export default CustomModal

const styles = StyleSheet.create({
  modalContentContainer: {
    backgroundColor: '#E8EEF1',
    borderRadius: 10,
    justifyContent: 'space-between',
    marginHorizontal: 16,
    paddingVertical: 16,
  },
})
