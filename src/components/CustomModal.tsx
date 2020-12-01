import React, { ReactElement } from 'react'
import { View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import { Const } from 'utils'
import ChargerModalMainWrapper from 'components/modalTypes/ChargerModalMainWrapper'
import LocationPermission from 'components/modalTypes/LocationPermission'
import RegistrationType1 from 'components/modalTypes/RegistrationType1'
import PrivacyPolicy from 'components/modalTypes/PrivacyPolicy'
import LegendType2 from 'components/modalTypes/LegendType2'
import { ModalTypes } from 'utils/enums'
import MapPopUp from 'components/modalTypes/MapPopUp'
import { InitialState, CustomModalInterface, Config } from 'allTypes'

const initialState: InitialState = {
  visible: false,
  config: {
    type: ModalTypes.MAP_POPUP,
    data: {
      title: 'popup.thankYou',
      description: 'popup.automobileChargingFinished',
      bottomDescription: 'popup.chargingFinishedWarning',
      address: '#1',
    },
  },
}

class CustomModal extends React.PureComponent implements CustomModalInterface {
  state = { ...initialState }

  ref: any = React.createRef()

  showModal = (): void => {
    this.setState({
      visible: true,
    })
  }

  closeModal = (): void => {
    this.setState({
      visible: false,
    })
    this.state.config.onCloseClick && this.state.config.onCloseClick()
  }

  customUpdate = (visible: boolean, config?: Config): void => {
    this.setState({
      ...initialState,
      visible,
      config: config ?? initialState.config,
    })
  }

  renderView = (): ReactElement | undefined => {
    // Vobi Done: make enum types instead of numbers this.state.config.type
    switch (this.state.config.type) {
      case ModalTypes.REGISTER:
        return <RegistrationType1 onPress={this.closeModal} />
      case ModalTypes.LEGEND:
        return <LegendType2 onPress={this.closeModal} />
      case ModalTypes.CHARGER_WRAPPER:
        return (
          <ChargerModalMainWrapper
            onPress={this.closeModal}
            subType={this.state.config.subType}
            data={this.state.config.data}
          />
        )
      case ModalTypes.MAP_POPUP:
        return <MapPopUp close={this.closeModal} data={this.state.config.data} />
      case ModalTypes.LOCATION_PERMISSION:
        return <LocationPermission onPress={this.closeModal} data={this.state.config.data} />
      case ModalTypes.PRIVACY_AND_POLICY:
        return <PrivacyPolicy onPress={this.closeModal} />
      default: {
        return <></>
      }
    }
  }

  render(): ReactElement {
    return (
      <Modal
        isVisible={this.state.visible}
        ref={this.ref}
        onSwipeComplete={this.closeModal}
        swipeDirection={['down']}
        useNativeDriver
        onBackdropPress={this.closeModal}
        onBackButtonPress={this.closeModal}
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
                this.state.config && this.state.config.type === ModalTypes.CHARGER_WRAPPER
                  ? 'flex-start'
                  : 'space-between',
              height:
                this.state.config
                  && this.state.config.type === ModalTypes.MAP_POPUP
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
