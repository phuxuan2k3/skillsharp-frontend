import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:8080",
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