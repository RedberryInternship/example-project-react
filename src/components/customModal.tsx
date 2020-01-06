

import React from "react";
import {View, StyleSheet} from "react-native"
import Modal from "react-native-modal";

import { Const} from "../utils"


type Data = {
  title? : string,
  description ?: string
  bottomDescription ?: string
}
type Config ={
  type : number,
  onCloseClick ?: () => void,
  subType ?: number,
  data ? : Data,
}

type InitialState = {
  visible : boolean,
  config : Config,
}

const initialState : InitialState = {
  visible :false,
  config : {
    type:3,
    data : {
      title : "მადლობა",
      description : "ავტომობილის დატენვა დასრულენულია",
      bottomDescription : "თუ 20 წუთის განმავლობაში არ გამოერთებთ კაბელს მოგიწევთ, ჯარიმის გადახდა ყოველ დამატებით წუთზე"
    }
  }
}
import {RegistrationType1, LegendType2, ChargerModalMainWrapper} from "./" 

class CustomModal extends React.PureComponent {

  state = {...initialState}
  ref : any =  React.createRef()

  showModal = () => {
    this.setState({
      visible : true
    })
  }

  closeModal = () =>{
    this.ref.current.close()

    this.state.config.onCloseClick && this.state.config.onCloseClick()
    this.setState({
      visible : false
    })
  }

  customUpdate= ( visible : Boolean, config : Config ) =>{
    this.setState({ 
      ...initialState , 
      visible,
      config
    })
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
        <View style={[styles.modalContentContainer, {justifyContent: this.state.config.type ===3 ?"flex-start" : "space-between" }]}>
          {this.renderView()}
        </View>
      </Modal>
    )
  }

  renderView= () =>{
    switch (this.state.config.type) {
      case 1:
        return <RegistrationType1 
            onPress={this.closeModal}
          />
      case 2:
        return <LegendType2 
            onPress={this.closeModal}
          />
      case 3:
        return <ChargerModalMainWrapper 
            onPress={this.closeModal}
            subType={this.state.config.subType}
            data={this.state.config.data}
          />
      default:
        break;
    }
  }
}

export default CustomModal;

const styles= StyleSheet.create({
  modalContentContainer : { 
    height:Const.Height*0.7, 
    backgroundColor:"#E8EEF1",
    borderRadius : 10, 
    justifyContent:"space-between", 
    marginHorizontal:16, 
    paddingVertical:16 
  }
})