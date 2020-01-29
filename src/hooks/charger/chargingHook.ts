import  { useState,useRef} from "react";
import {useTranslation} from 'react-i18next';
import { useSafeArea } from "react-native-safe-area-context";
import { Defaults } from "../../../src/utils";


export default (navigation : any) => {

  const [loading, SetLoading] = useState<Boolean>(true);
  const [activeTab, SetActiveTab] = useState<number>(0);

  const _this : React.RefObject<any> = useRef({tabsArray : navigation.getParam("tabsArray", [''])})

  const { t} = useTranslation();


  const insets = useSafeArea();

  const changeActiveTab = (index) =>{
    SetActiveTab(index)
  }

  const onFinish= () =>{
    Defaults.modal.current?.customUpdate(
      true, 
      {type:3, subType : 1, data : 
        {
          title : "popup.thankYou",
          description : "popup.automobileChargingFinished",
          bottomDescription : "popup.finishedChargingOfAutomobile",
          price: 22
        },
        onCloseClick : () => navigation.navigate("MainDrawer")
      }
    )

  }  

  return {
    insets, _this, t, activeTab, SetActiveTab, changeActiveTab, onFinish, 
    navigation
  }
}