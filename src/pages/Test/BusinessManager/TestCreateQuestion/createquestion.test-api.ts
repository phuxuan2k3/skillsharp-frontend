import testApi from "../../../../features/Test/test.api";
import { TestSubmissionParams } from "./types";

const createnewAPI = testApi.injectEndpoints({
	endpoints: (builder) => ({
		createnewtest: builder.mutation<void, TestSubmissionParams>({
			query: ({ testId, questions }) => ({
				url: `/${testId}/create/question`,
				method: "POST",
				body: {
					questions,
				}
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useCreatenewtestMutation,
} = createnewAPI;