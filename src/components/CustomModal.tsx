import React, {ReactElement} from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import Modal from 'react-native-modal'

import {Const} from 'utils'

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
  customUpdate: (visible: boolean, config: Config) => void
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
import {
  RegistrationType1,
  LegendType2,
  ChargerModalMainWrapper,
  MapPopUp,
} from './'

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
      this.state.config.onCloseClick && this.state.config.onCloseClick()
    })
  }

  customUpdate = (visible: boolean, config: Config): void => {
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
          <MapPopUp onPress={this.closeModal} data={this.state.config.data} />
        )
      default:
        break
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
