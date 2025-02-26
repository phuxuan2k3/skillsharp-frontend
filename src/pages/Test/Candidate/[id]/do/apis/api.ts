import testApi from "../../../../../../features/Test/test.api";
import { AnswerAttemptParam } from "./param";
import { CurrentAttemptDetailResult } from "./result";

const api = testApi.injectEndpoints({
	endpoints: (builder) => ({
		getCurrentAttemptDetail: builder.query<CurrentAttemptDetailResult, string>({
			query: (testId) => `/${testId}/current/do`
		}),

		postAnswer: builder.mutation<void, AnswerAttemptParam>({
			query: ({ testId, questionId, optionId }) => ({
				url: `/${testId}/current/answer`,
				method: "POST",
				body: { questionId, optionId },
			})
		}),

		postSubmit: builder.mutation<void, string>({
			query: (testId) => ({
				url: `/${testId}/current/submit`,
				method: "POST",
			})
		})
	}),
	overrideExisting: false,
});

export const {
	useGetCurrentAttemptDetailQuery,
	usePostSubmitMutation,
} = api;