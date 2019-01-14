import i18n from "i18next"
import {reactI18nextModule} from "react-i18next"
import translationEN from "./locales/en/translation"
import translationFR from "./locales/fr/translation"
import translationAR from "./locales/ar/translation"
// the translations
const resources = {
    en: {
        translation: translationEN
    },
    fr: {
        translation: translationFR
    },
    ar: {
        translation: translationAR
    }
}

const lang = localStorage.getItem('localeId') ? localStorage.getItem('localeId') : 'en';

i18n.use(reactI18nextModule).init({
        resources,
        lng: lang, keySeparator: false, interpolation: {
            escapeValue: false
        }});
export default i18n;
