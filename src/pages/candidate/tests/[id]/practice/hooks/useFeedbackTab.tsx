import { PostPracticesByTestIdFeedbackApiArg, useGetPracticesByTestIdFeedbackQuery, useGetPracticesByTestIdQuery, usePostPracticesByTestIdFeedbackMutation } from '../../../../../../features/tests/api/test.api-gen';
import { useCallback, useEffect, useState } from 'react';
import { FeedbackCore } from '../../../../../../infra-test/core/test.model';
import useGetTestIdParams from '../../../../../../infra-test/hooks/useGetTestIdParams';

export default function useFeedbackTab() {
	const testId = useGetTestIdParams();
	const [feedback, setFeedback] = useState<Required<FeedbackCore>>({
		rating: 0,
		comment: '',
		problems: [],
	});

	const [postFeedback, postFeedbackState] = usePostPracticesByTestIdFeedbackMutation();

	const practicQuery = useGetPracticesByTestIdQuery({ testId });
	const feedbackQuery = useGetPracticesByTestIdFeedbackQuery({ testId });

	const submitFeedback = useCallback(() => {
		postFeedback({
			testId,
			body: {
				...feedback,
				problems: feedback.problems as PostPracticesByTestIdFeedbackApiArg['body']['problems'],
			},
		})
	}, [feedback])

	useEffect(() => {
		if (feedbackQuery.data) {
			setFeedback({
				...feedbackQuery.data,
				rating: feedbackQuery.data.rating || 0,
			});
		}
	}, [feedbackQuery.data]);

	return {
		data: {
			practice: practicQuery.data,
		},
		feedback,
		setFeedback,
		isLoading: practicQuery.isLoading || feedbackQuery.isLoading,
		submitFeedback,
		postFeedbackState,
	}
}
