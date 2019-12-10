import {Dimensions} from "react-native"
import { isIphoneX } from "react-native-iphone-x-helper";

export const API:string = ""

export const Width = Dimensions.get("window").width;
export const Height = Dimensions.get("window").height;


export const NotchHeight = isIphoneX ? 30 : 0