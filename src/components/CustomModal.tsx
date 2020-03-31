import React, {ReactElement} from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import Modal from 'react-native-modal'

import {Const} from 'utils'

import {
  RegistrationType1,
  LegendType2,
  ChargerModalMainWrapper,
  MapPopUp,
  LocationPermission,
} from 'components'

type Data = {
  title?: string
  description?: string
  bottomDescription?: string
  price?: number
}
type Config = {
  type: number
  onCloseClick?: () => void
  subType?: number
  data?: Data | any
}

type InitialState = {
  visible: boolean
  config: Config
}

export interface CustomModalInterface {
  customUpdate: (visible: boolean, config?: Config) => void
  state: InitialState
}

const initialState: InitialState = {
  visible: false,
  config: {
    type: 4,
    data: {
      title: 'popup.thankYou',
      description: 'popup.automobileChargingFinished',
      bottomDescription: 'popup.chargingFinishedWarning',
      address: 'asdfasdf dsfd',
    },
  },
}

// Vobi todo: why is this class instead of functional component
class CustomModal extends React.PureComponent implements CustomModalInterface {
  state = {...initialState}
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
    InteractionManager.runAfterInteractions(() => {
      // Vobi todo: state should not have functions in it
      this.state.config.onCloseClick && this.state.config.onCloseClick()
    })
  }

  customUpdate = (visible: boolean, config?: Config): void => {
    this.setState({
      ...initialState,
      visible,
      config,
    })
  }

  render(): ReactElement {
    return (
      <Modal
        isVisible={this.state.visible}
        ref={this.ref}
        onSwipeComplete={this.closeModal}
        swipeDirection={['down']}
        useNativeDriver={true}
        onBackdropPress={this.closeModal}
        onBackButtonPress={this.closeModal}
        hideModalContentWhileAnimating={true}>
        <View
          style={[
            styles.modalContentContainer,
            // Vobi todo: const isConfig3 = this.state.config && this.state.config.type === 3
            // Vobi todo: const isConfig4 = this.state.config && this.state.config.type === 4
            // {
            //   justifyContent: isConfig3 ? 'flex-start' : 'space-between',
            //   height: isConfig4 ? 'auto' : Const.Height * 0.7
            // }
            {
              justifyContent:
                this.state.config && this.state.config.type === 3
                  ? 'flex-start'
                  : 'space-between',
              height:
                this.state.config && this.state.config.type === 4
                  ? 'auto'
                  : Const.Height * 0.7,
            },
          ]}>
          {this.renderView()}
        </View>
      </Modal>
    )
  }

  renderView = (): ReactElement | undefined => {
    switch (this.state.config.type) {
      case 1:
        return <RegistrationType1 onPress={this.closeModal} />
      case 2:
        return <LegendType2 onPress={this.closeModal} />
      case 3:
        return (
          <ChargerModalMainWrapper
            onPress={this.closeModal}
            subType={this.state.config.subType}
            data={this.state.config.data}
          />
        )
      case 4:
        return (
          <MapPopUp close={this.closeModal} data={this.state.config.data} />
        )
      case 5:
        return (
          <LocationPermission
            onPress={this.closeModal}
            data={this.state.config.data}
          />
        )
      default: {
        return <></>
      }
    }
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
