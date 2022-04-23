import { createSelector } from 'reselect';

import { DEFAULT_LOCALE } from './constants';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = state => state.language;

export const getLocalLocale = () => localStorage.getItem('locale') || DEFAULT_LOCALE;

const makeSelectLocale = () =>
  createSelector(selectLanguage, languageState => getLocalLocale() || languageState?.locale);

export { selectLanguage, makeSelectLocale };
