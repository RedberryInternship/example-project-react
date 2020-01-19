/* eslint-disable no-unused-vars */
import {useRef, RefObject,} from "react";
import {TextInput} from "react-native"
import { Defaults} from "../../../utils";


export default (setActivePage : any, t : any ) => {

  const name : RefObject<TextInput> = useRef(null);
  const surname : RefObject<TextInput> = useRef(null);
  const email : RefObject<TextInput> = useRef(null);

  const _this : RefObject<any> = useRef({name : '', surname:'', email : ''});

  const buttonClickHandler = () =>{
    let {name, surname, email} = _this.current

    console.log( name, surname, email, "name, surName") ;
    if(name === "") {
      Defaults.dropdown.alertWithType("error", t("dropDownAlert.registration.fillName") )
    } 
    else if (surname === "") {
      Defaults.dropdown.alertWithType("error", t("dropDownAlert.registration.fillSurname") )
    }
    else if(email !== "") {
      let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w+)+$/;
        if(!reg.test(email)){
          Defaults.dropdown.alertWithType("error", t("dropDownAlert.registration.incorrectEmail") )
          return
        }
    }

    setActivePage(2)
  }

  return {
      name, surname, email,
      buttonClickHandler,_this
    }
}