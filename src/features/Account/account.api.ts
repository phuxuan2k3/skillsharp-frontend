import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { backendURL } from "../../app/env"

const accountBackendURL = backendURL + '/account';

const baseQuery = fetchBaseQuery({
    baseUrl: accountBackendURL,
    prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        headers.set('Authorization', `Bearer token`); // todo: replace with actual token
        return headers;
    },
});

export type CompanyResponse = {
    id: string;
    name: string;
    imageUrl: string;
}

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getCompanies: builder.query<CompanyResponse[], string[]>({
            query: (ids) => ({
                url: `/company/many`,
                method: "POST",
                body: JSON.stringify({ ids }),
            })
        }),
    }),
});

export default accountApi;
export const {
    useGetCompaniesQuery,
    useLazyGetCompaniesQuery
} = accountApi;