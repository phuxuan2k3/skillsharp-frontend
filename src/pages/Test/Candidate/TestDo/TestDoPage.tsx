import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionComponent from './Question';
import Sidebar from './Sidebar';
import useGetTestIdParams from '../../../../features/Test/hooks/useGetTestIdParams';
import paths2 from '../../../../router/path-2';
import FetchState from '../../../../components/wrapper/FetchState';
import { useAppSelector } from '../../../../app/redux/hooks';
import { curerntAttemptSelects } from '../../../../features/Test/reducers/currentAttemtpSlice';
import { useGetCurrentAttemptDoQuery, useGetCurrentAttemptStateQuery } from '../../../../features/Test/api/test.api-gen';

const TestDoPage = () => {
	const navigate = useNavigate();
	const testId = useGetTestIdParams();
	const doQuery = useGetCurrentAttemptDoQuery({});
	const { currentQuestionIndex } = useAppSelector(curerntAttemptSelects.selectCurrentAttempt);
	const stateQuery = useGetCurrentAttemptStateQuery({});

	// TODO: Add notification upon test ends.
	useEffect(() => {
		if (stateQuery.isSuccess == false) return;
		if (stateQuery.data.hasCurrentAttempt === false) {
			// TODO: Add modal to notify user that the test has ended.
			navigate(paths2.candidate.tests.in(testId).ATTEMPTS);
		}
	}, [stateQuery]);

	// TODO: Use loading page
	if (doQuery.isLoading || stateQuery.isLoading) return <>Loading...</>;
	if (doQuery.error || stateQuery.error) return <>Error</>;
	if (doQuery.data == null || stateQuery.data == null) return <>No data</>;
	if (stateQuery.data.currentAttempt == null) return <>No current attempt</>;

	const currentQuestion = doQuery.data.questions[currentQuestionIndex];
	const { currentAttempt } = stateQuery.data;

	return (
		<div className="w-full flex-grow flex flex-col items-center px-4">
			<div className="w-full max-w-7xl py-6">
				<FetchState
					isLoading={doQuery.isLoading}
					error={doQuery.error}
				>
					<h1 className="text-2xl font-bold mb-6">
						{doQuery.data.test.title}
					</h1>
				</FetchState>
				<div className="flex flex-row w-full justify-between">
					<FetchState
						isLoading={doQuery.isLoading}
						error={doQuery.error}
					>
						{doQuery.data.questions.length === 0 ? (
							<div>No questions found</div>
						) : (
							<>
								{doQuery.data &&
									<QuestionComponent
										currentAttempt={currentAttempt}
										question={currentQuestion}
										totalQuestion={doQuery.data.questions.length}
									/>
								}
							</>
						)}
					</FetchState>

					<Sidebar
						questionIds={doQuery.data.questions.map((q) => q.id) ?? []}
						currentAttempt={currentAttempt}
					/>
				</div>
			</div>
		</div>
	);
}

export default TestDoPage