import memoize from 'lodash.memoize';
import i18n from 'i18n-js';

export const translationGetters = {
  'ar-IQ': () => require('../translations/ar.json'),
  'en-US': () => require('../translations/en.json'),
  'fr-FR': () => require('../translations/fr.json'),
};

export const IMLocalized = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const init = (language) => {

  let localeLanguageTag = language;

  IMLocalized.cache.clear();

  i18n.translations = {
    [localeLanguageTag]: translationGetters[localeLanguageTag](),
  };

  i18n.locale = localeLanguageTag;
};