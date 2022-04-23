import { CHANGE_LOCALE } from './constants';

export function changeLocale(languageLocale) {
  localStorage.setItem('locale', languageLocale);
  return {
    type: CHANGE_LOCALE,
    locale: languageLocale,
  };
}
