import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendUrl } from "../../app/env"

const testBackendURL = backendUrl + '/questionai';

const baseQuery = fetchBaseQuery({
	baseUrl: testBackendURL,
	prepareHeaders: (headers) => {
		headers.set('Content-Type', 'application/json');
		return headers;
	},
});

export const aiAPI = createApi({
	reducerPath: 'aiApi',
	baseQuery: baseQuery,
	endpoints: () => ({}),
});

export default aiAPI;