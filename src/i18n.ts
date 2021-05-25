import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from 'vuetify/lib/locale/en'
// import en from "./locales/en.json";

Vue.use(VueI18n)

enum Locales {
    EN = 'en',
    FR = 'fr',
}

// eslint-disable-next-line
const LOCALES = [
    { value: Locales.EN, caption: 'English' },
    { value: Locales.FR, caption: 'Français' }
]

const messages = {
    [Locales.EN]: {
        ...require('@/locales/en.json'),
        $vuetify: en,
    },
    
//   [Locales.FR]: fr
};

export default new VueI18n({
    locale: process.env.VUE_APP_I18N_LOCALE || 'en',
    fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
    messages,
})