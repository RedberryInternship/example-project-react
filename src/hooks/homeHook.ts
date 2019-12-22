import {useState,} from "react";


export default function  useMap({map : mapRef} : any){

  const [loading, SetLoading] = useState<Boolean>(true);



    return {loading, SetLoading}



}