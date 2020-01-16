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
    if(name == "") Defaults.dropdown.alertWithType("error", "please, Fill name ")
    else if (surname == "") Defaults.dropdown.alertWithType("error", "please, Fill surName ")
    else  setActivePage(2)
  }

  return {
      name, surname, email,
      buttonClickHandler,_this
    }
}