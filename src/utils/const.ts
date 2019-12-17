import { Dimensions } from "react-native"
import { ifIphoneX } from "react-native-iphone-x-helper";


export const API: string = ""

export const Width = Dimensions.get("window").width;
export const Height = Dimensions.get("window").height;


export const NotchHeight = ifIphoneX(30, 0)


export const DrawerFieldsBeforeAuthorization = [
    {
        image: require('../../assets/images/icons/book-open.png'),
        text: 'drawer.tariff',
        route: "tarrif"
    },
    {
        image: require('../../assets/images/icons/phone.png'),
        text: 'drawer.contact',
        route: 'contact'
    },
    {
        image: require('../../assets/images/icons/message-square.png'),
        text: 'drawer.faq',
        route: 'faq'
    },
    {
        image: require('../../assets/images/icons/Frame.png'),
        text: 'drawer.partners',
        route: 'partners'
    }
];