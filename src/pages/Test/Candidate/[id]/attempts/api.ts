import testApi from "../../../../../features/Test/test.api";
import { Paged } from "../../../../../interfaces/paged.type";
import { Attempt, CurrentAttempt, FilterParams, TestAttemptsResponse } from "./types";

const attemptApi = testApi.injectEndpoints({
	endpoints: (builder) => ({
		getTestDisplay: builder.query<TestAttemptsResponse, string>({
			query: (testId) => `/${testId}/attempts/page`
		}),
		getAttempts: builder.query<Paged<Attempt>, FilterParams>({
			query: (filter) => ({
				url: `/${filter.testId}/attempts/data`,
				params: {
					perPage: filter.perPage,
					page: filter.page,
				},
			})
		}),
		getCurrentAttempt: builder.query<CurrentAttempt, string>({
			query: (testId) => `/${testId}/current`
		}),
		postNewAttempt: builder.mutation<void, string>({
			query: (testId) => ({
				url: `/${testId}/current/new`,
				method: "POST",
			})
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetTestDisplayQuery,
	useLazyGetAttemptsQuery,
	useGetCurrentAttemptQuery,
	usePostNewAttemptMutation,
} = attemptApi;