import {useRef, RefObject,} from "react";
import {TextInput} from "react-native"
import { Defaults} from "../../../utils";
import ajax from "../../../utils/ajax";




export default (setActivePage : any, t : any, _this1 : any, _this2 : any ) => {


  const password : RefObject<TextInput> = useRef(null);
  const confirmedPassword : RefObject<TextInput> = useRef(null);

  const _this : RefObject<any> = useRef({password : '', confirmedPassword:''});

  const postData = () =>{
    let {password} = _this.current
    let {phone} = _this1.current
    let {name, surname, email} = _this2.current
    ajax.post("/register", 
      {
        first_name : name,
        last_name : surname,
        phone_number : phone ,
        email,
        password
      })
      .then((val)=>{
        setActivePage(3)
      })

  }
  const buttonClickHandler = () =>{
    let {password, confirmedPassword} = _this.current

    console.log( password, confirmedPassword, "password, confirmedPassword,") ;

    if(password != confirmedPassword ){
      Defaults.dropdown.alertWithType('error', "შეცდომა 😞",'პაროლები ერთმანეთს არ ემთხვევა');
    }
    else if(password.length < 6){
      Defaults.dropdown.alertWithType('error', "შეცდომა 😞",'მინიმუმ 6 სიმბოლო უნდა იყოს პაროლში');
    }
    else postData()
    
  }

  return {
      buttonClickHandler,_this,
      password, confirmedPassword
    }
}