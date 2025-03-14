import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendEndpoint } from "../../app/env"

const loginBackendURL = backendEndpoint + '/bulbasaur';

const baseQuery = fetchBaseQuery({
    baseUrl: loginBackendURL,
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        return headers;
    },
});

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
		verificationEmail: builder.mutation<void, { email: string }>({
			query: ({ email }) => ({
				url: `/account/verify/email`,
				method: "POST",
				body: {email },
			})
		})
	}),
});

export default loginAPI;