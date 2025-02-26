import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from "../../app/env"

const threshUrl = url.thresh.base + '/tests';
console.log('Thresh Url:', threshUrl);

const baseQuery = fetchBaseQuery({
	baseUrl: threshUrl,
	prepareHeaders: (headers) => {
		headers.set('Content-Type', 'application/json');
		headers.set('Authorization', `Bearer token`); // todo: replace with actual token
		return headers;
	},
});

export const testApi = createApi({
	reducerPath: 'testApi',
	baseQuery: baseQuery,
	endpoints: () => ({}),
});

export default testApi;