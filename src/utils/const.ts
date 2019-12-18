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
        route: "Tarrif"
    },
    {
        image: require('../../assets/images/icons/phone.png'),
        text: 'drawer.contact',
        route: 'Contact'
    },
    {
        image: require('../../assets/images/icons/message-square.png'),
        text: 'drawer.faq',
        route: 'Faq'
    },
    {
        image: require('../../assets/images/icons/Frame.png'),
        text: 'drawer.partners',
        route: 'Partners'
    }
];


export const DrawerFieldsAfterAuthorization = [
    {
        image: require('../../assets/images/icons/settings.png'),
        text: 'drawer.settings',
        route: "Settings"
    },
    ...DrawerFieldsBeforeAuthorization,
    {
        image: require('../../assets/images/icons/credit-card.png'),
        text: 'drawer.transactions',
        route: "Transactions"
    },
    {
        image: require('../../assets/images/icons/mail.png'),
        text: 'drawer.notifications',
        route: "Notifications"
    }
];

export const SettingsListFields = [
    {
        image:require('../../assets/images/icons/blue-user.png'),
        name: "settings.firstname",
        type:"FirstnameChange",
        editableComponentName: "settings.editFirstname.editFirstname"
    },
    {
        image:require('../../assets/images/icons/blue-user.png'),
        name: "settings.lastname",
        type: "LastnameChange",
        editableComponentName: "settings.editLastname.editLastname"
    },
    {
        image:require('../../assets/images/icons/mail.png'),
        name: "settings.mail",
        type: "MailChange",
        editableComponentName: "settings.editMail.editMail"
    },
    {
        image:require('../../assets/images/icons/phone.png'),
        name: "settings.phone",
        type: "PhoneChange",
        editableComponentName: "settings.editPhoneNumber.editPhoneNumber"
    },
    {
        image:require('../../assets/images/icons/credit-card.png'),
        name: "settings.cards",
        type: "CardChange",
        editableComponentName: "settings.editCard.editCard"
    },
    {
        image:require('../../assets/images/icons/lock.png'),
        name: "settings.password",
        type: "PasswordChange",
        editableComponentName: "settings.editPassword.editPassword"
    }
];