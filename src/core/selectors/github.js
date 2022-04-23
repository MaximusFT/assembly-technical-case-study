import { createSelector } from 'reselect';

export const getSearchResultSelector = (type, key) =>
  createSelector(
    state => state.terms,
    terms => {
      if (type in terms && key in terms[type]) {
        return terms[type][key];
      }
      return [];
    },
  );

export const getSearchHistorySelector = () =>
  createSelector(
    state => state.terms,
    terms => {
      const res = { org: [], user: [] };
      res.user = Object.keys(terms?.user || {});
      res.org = Object.keys(terms?.org || {});
      return res;
    },
  );
