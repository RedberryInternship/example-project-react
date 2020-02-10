import i18n from 'i18next';
import { initReactI18next,  } from 'react-i18next';

import {LocaleStringObject} from "../../../@types/allTypes" 
import en from "./en";
import ka from "./ka";
import { Defaults } from '../';

// const locales = RNLocalize.getLocales();

// if (Array.isArray(locales)) {
//   I18n.locale = locales[0].languageTag;
// }

// I18n.locale="ka"

// I18n.fallbacks = true;
// I18n.translations = {
//   en,
//   ka
// };

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'ka',
    debug: true,
    lng: "ka",

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources:{
      en,
      ka
    }
  });

export default i18n;

export const t=  i18n.t;


export const getLocaleText = (stringObj : LocaleStringObject) : string => {
  return stringObj ? stringObj[ Defaults.locale ] : ""
}