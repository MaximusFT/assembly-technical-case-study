import { createReducer, combineReducers, configureStore } from '@reduxjs/toolkit';

import language from '../components/Language/reducers';

import githubApi from './api/index';

const initialState = [];

const termsReducer = createReducer(initialState, builder => {
  builder
    .addMatcher(githubApi.endpoints.getSearchUsers.matchFulfilled, (state, data) => {
      if (data?.meta?.arg?.originalArgs?.type === 'user') {
        return {
          ...state,
          user: {
            ...state.user,
            [data?.meta?.arg?.originalArgs?.searchTerm]: data?.payload?.items,
          },
        };
      }
      return state;
    })
    .addMatcher(githubApi.endpoints.getSearchOrg.matchFulfilled, (state, data) => {
      if (data?.meta?.arg?.originalArgs?.type === 'org') {
        return {
          ...state,
          org: { ...state.org, [data?.meta?.arg?.originalArgs?.searchTerm]: data?.payload?.items },
        };
      }
      return state;
    });
});

const rootReducer = combineReducers({
  language,
  terms: termsReducer,
  [githubApi.reducerPath]: githubApi.reducer,
});

export const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(githubApi.middleware),
    preloadedState,
  });
};
