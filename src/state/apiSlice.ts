import store from 'store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
    prepareHeaders: (headers) => {
      const token = store.get('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      // LOGIN
      login: builder.mutation({
        query: ({ email, password }) => ({
          url: '/auth/login',
          method: 'POST',
          body: {
            email,
            password,
          },
        }),
      }),

      // SIGNUP
      signup: builder.mutation({
        query: ({ email, name, phone, password }) => ({
          url: '/auth/signup',
          method: 'POST',
          body: {
            email,
            password,
            name,
            phone,
          },
        }),
      }),

      // LIST ALL ARTISTS
      listArtists: builder.query({
        query: ({ size, page }) => `/artists?size=${size}&page=${page}`,
      }),

      // LIST LABELS
      listLabels: builder.query({
        query: ({ size, page }) => `/labels?size=${size}&page=${page}`,
      }),

      // CREATE ARTIST
      createArtist: builder.mutation({
        query: ({ formData }) => ({
          url: '/artists',
          method: 'POST',
          body: formData,
          formData: true,
        }),
      }),
    };
  },
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLazyListArtistsQuery,
  useLazyListLabelsQuery,
  useCreateArtistMutation,
} = apiSlice;
export default apiSlice;
