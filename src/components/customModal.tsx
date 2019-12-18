

import React from "react";
import {View,Text, Image} from "react-native"
import Modal from "react-native-modal";

import { Const, Colors} from "../utils"
import { TouchableOpacity } from "react-native-gesture-handler";


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

  render(){

    return(
      <Modal
        isVisible={this.state.visible}
        ref={this.ref}
        onSwipeComplete={this.closeModal}
        swipeDirection={['down']}
        useNativeDriver={true}
      >
        <View style={{ height:Const.Height*0.7, backgroundColor:"#E8EEF1",borderRadius : 10, justifyContent:"space-around" }}>

          <View style={{alignItems:"center"}}>
            <Image  source={require("../../assets/images/icons/user.png")} style={{width:28, height:28, resizeMode:"contain", marginVertical : 8, tintColor: Colors.primaryBlue}}/>
            <Text style={{fontSize:17, lineHeight:22, color: Colors.primaryDark}}>მოგესალმებბიტ</Text>
            <Text style={{fontSize:13, lineHeight:22, color: "#436880", marginVertical:8}}>saxel gvari</Text>
          </View>
          <View style={{alignItems:"center"}}>
            <Text style={{fontSize:13, lineHeight:22, color: "#436880", marginVertical:8, paddingHorizontal:32}}>saxel gasf asdf as df as df asdf vari</Text>

          </View>
            <View style={{alignItems:"center"}}>
              <TouchableOpacity
                style={{borderRadius:25, width:50, height:50, backgroundColor:"#0199F011", alignSelf:"center", justifyContent:"center"}}
                onPress={this.closeModal}
              >
                <Image  source={require("../../assets/images/icons/close.png")} style={{width:28, height:28, resizeMode:"contain",alignSelf:"center", tintColor: Colors.primaryBlue}}/>
              </TouchableOpacity>
            </View>
          
        </View>
      </Modal>
    )
  }
}

export default CustomModal;