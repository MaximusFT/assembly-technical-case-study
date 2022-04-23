import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const githubApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  tagTypes: ['User', 'Org'],
  endpoints: builder => ({
    getUser: builder.query({
      query: ({ login }) => ({ url: `/users/${login}`, method: 'get' }),
    }),
    getAdditionalInfo: builder.query({
      query: ({ login, modalType }) => ({ url: `/users/${login}/${modalType}`, method: 'get' }),
    }),
    getSearchUsers: builder.query({
      query: params => ({
        url: `/search/users`,
        method: 'get',
        params: { q: `${params.searchTerm} type:user` },
      }),
      providesTags: ['User'],
    }),
    getSearchOrg: builder.query({
      query: params => ({
        url: `/search/users`,
        method: 'get',
        params: { q: `${params.searchTerm} type:org` },
      }),
      providesTags: ['Org'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAdditionalInfoQuery,
  useGetSearchUsersQuery,
  useGetSearchOrgQuery,
} = githubApi;

export default githubApi;
