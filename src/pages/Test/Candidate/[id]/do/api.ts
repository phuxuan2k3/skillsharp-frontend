import testApi from "../../../../../features/Test/test.api";
import { CurrentAttemptDetailResponse, TestSubmitRequest } from "./types";

const api = testApi.injectEndpoints({
	endpoints: (builder) => ({
		getTestDoPage: builder.query<CurrentAttemptDetailResponse, string>({
			query: (testId) => `/${testId}/current/do`
		}),

		postSubmit: builder.mutation<void, TestSubmitRequest>({
			query: ({ testId, answers }) => ({
				url: `/${testId}/current/submit`,
				method: "POST",
				body: { answers },
			})
		})
	}),
	overrideExisting: false,
});

export const {
	useGetTestDoPageQuery,
	usePostSubmitMutation,
} = api;