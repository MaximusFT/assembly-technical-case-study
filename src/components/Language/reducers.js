import { createReducer } from '@reduxjs/toolkit';

import { DEFAULT_LOCALE, CHANGE_LOCALE } from './constants';

export const initialState = {
  locale: DEFAULT_LOCALE,
};

const languageProviderReducer = createReducer(initialState, builder => {
  builder.addCase(CHANGE_LOCALE, (state, action) => ({ locale: action.locale }));
});

export default languageProviderReducer;
