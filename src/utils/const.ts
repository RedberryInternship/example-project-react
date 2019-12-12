import {Dimensions} from "react-native"
import { ifIphoneX } from "react-native-iphone-x-helper";

export const API:string = ""

export const Width = Dimensions.get("window").width;
export const Height = Dimensions.get("window").height;


export const NotchHeight = ifIphoneX (30 ,0)