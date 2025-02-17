import testApi from "../../../../features/Test/test.api";
import { Paged } from "../../../../interfaces/paged.type";
import { FilterQuestionAnswerParams, TestQuestionAnswer, TestViewAnswerProps } from "./types";

const viewAnswerApi = testApi.injectEndpoints({
	endpoints: (build) => ({
		getAttemptDetail: build.query<TestViewAnswerProps, string>({
			query: (attemptId) => `/attempts/${attemptId}`,
		}),
		getAttemptAnswers: build.query<Paged<TestQuestionAnswer>, FilterQuestionAnswerParams>({
			query: (filter) => ({
				url: `/attempts/${filter.attemptId}/answers`,
				params: {
					page: filter.page,
					perPage: filter.perPage,
				},
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useGetAttemptDetailQuery,
	useLazyGetAttemptAnswersQuery
} = viewAnswerApi;