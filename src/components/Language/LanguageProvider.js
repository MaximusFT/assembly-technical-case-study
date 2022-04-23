import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { converObjectToProxy } from '../../core/utils';
import { revertCamelCase, upperCaseFirstLetter } from '../../core/utils';

import { makeSelectLocale } from './selectors';
import { DEFAULT_LOCALE } from './constants';

export const callbackLangProxy = (target, name) =>
  upperCaseFirstLetter(revertCamelCase(name.split('.').slice(-1).pop(), ' ').trim());

export const formatTranslationMessages = (locale, messages, defaultTranslation) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, defaultTranslation, defaultTranslation)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE ? defaultFormattedMessages[key] : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  const result = Object.keys(defaultTranslation).reduce(flattenFormattedMessages, {});
  return converObjectToProxy(result, callbackLangProxy);
};

export const appLocales = ['en', 'fr'];

export const appLocalesSelect = {
  en: { id: 'LocaleToggle.en' },
  fr: { id: 'LocaleToggle.fr' },
};

const LanguageProvider = ({ children }) => {
  const [mess, setMess] = useState(null);
  const locale = useSelector(createSelector(makeSelectLocale(), stateLocale => stateLocale));

  useEffect(() => {
    async function fetchLang() {
      const defaultTranslation = await fetch('/lang/en.json').then(response => response.json());
      const frTranslationJson = await fetch('/lang/fr.json').then(response => response.json());

      setMess({
        en: formatTranslationMessages('en', defaultTranslation, defaultTranslation),
        fr: formatTranslationMessages('fr', frTranslationJson, defaultTranslation),
      });
    }
    fetchLang();
  }, []);

  return mess ? (
    <IntlProvider
      textComponent={React.Fragment}
      defaultLocale={DEFAULT_LOCALE}
      locale={locale}
      key={locale}
      messages={mess[locale]}
      fallbackOnEmptyString={false}
    >
      {React.Children.only(children)}
    </IntlProvider>
  ) : (
    <div>Loading</div>
  );
};

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.any,
};

export default LanguageProvider;
