

import React from "react";
import {View} from "react-native"
import Modal from "react-native-modal";

import { Const} from "../utils"

import {RegistrationType1, LegendType2} from "./" 

type Cofig ={
  type : number,

}
class CustomModal extends React.PureComponent {
  state = {
    visible :false,
    type : 1,
  }
  ref : any =  React.createRef()

  showModal = () => {
    this.setState({
      visible : true
    })
    // this.ref.current.open()
  }

  closeModal = () =>{
    // this.state.visible=false
    this.ref.current.close()
    this.setState({
      visible : false
    })
  }

  customUpdate= ( visible : Boolean, config : Cofig) =>{
    this.setState({visible,...config})
  }

  
  render(){

    return(
      <Modal
        isVisible={this.state.visible}
        ref={this.ref}
        onSwipeComplete={this.closeModal}
        swipeDirection={['down']}
        useNativeDriver={true}
      >
        <View style={{ height:Const.Height*0.7, backgroundColor:"#E8EEF1",borderRadius : 10, justifyContent:"space-between", marginHorizontal:16, paddingVertical:32 }}>
          {this.renderView()}
        </View>
      </Modal>
    )
  }

  renderView= () =>{
    switch (this.state.type) {
      case 1:
        return <RegistrationType1 
            onPress={this.closeModal}
          />
      case 2:
        return <LegendType2 
            onPress={this.closeModal}

          />
      default:
        break;
    }
  }
}

export default CustomModal;