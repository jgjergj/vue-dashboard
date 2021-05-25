import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
// import i18n from '@/i18n';


Vue.use(Vuetify);

const theme = {
  primary: '#4CAF50',
  secondary: '#9C27b0',
  accent: '#9C27b0',
  info: '#00CAE3',
  // success: '#4CAF50',
  // warning: '#FFC107'
}

export default new Vuetify({
  // lang: {
  //   t: (key, ...params) => i18n.t(key, params),
  // },
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      dark: theme,
      light: theme,
    }
  },
});
