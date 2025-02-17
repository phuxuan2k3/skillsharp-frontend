import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { paths } from '../../../../../router/path';
import { useGetTestDoPageQuery } from './api';
import { socketTestProcess } from '../../../../../features/Test/test-process.socket';
import FetchStateContent from '../../../../../components/redux-api/FetchStateContent';
import QuestionComponent from './components/Question';
import Sidebar from './components/Sidebar';
import { load, save } from './components/localStore';
import { orderedArrayEqual } from '../../../../../utils/equals';
import { AnswerProps, QuestionProps } from './types';

const TestDo = () => {
	const navigate = useNavigate();
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [answers, setAnswers] = useState<AnswerProps[]>([]);
	const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
	const [indexMapQuestion, setIndexMapQuestion] = useState<Map<number, QuestionProps>>(new Map());
	const { testId } = useParams<{ testId: string }>();
	if (!testId) throw new Error("Test ID or Question ID is undefined");

	const { data, isLoading, error } = useGetTestDoPageQuery(testId);
	if (!data) return null;

	useEffect(() => {
		socketTestProcess.onTimeout(() => {
			navigate(paths.TEST.attempts(testId));
		});
		const loaded = load(testId);
		if (
			loaded == null ||
			orderedArrayEqual(loaded.answers, data.questions, (a, b) => a.questionId === b.ID) == false
		) {
			const answersNew: AnswerProps[] = [];
			data.questions.forEach((question) => {
				answersNew.push({ questionId: question.ID, optionId: -1 });
			});
			setAnswers(answersNew);
			save(testId, answersNew, new Set());
		} else {
			setAnswers(loaded.answers);
			setFlaggedQuestions(loaded.flaggedQuestions);
		}
		const indexMapNew = new Map<number, QuestionProps>();
		data.questions.forEach((question, index) => {
			indexMapNew.set(index, question);
		});
		setIndexMapQuestion(indexMapNew);
	}, [data]);

	return (
		<div className="w-full flex-grow flex flex-col items-center px-4">
			<div className="w-full max-w-7xl py-6">
				<FetchStateContent isLoading={isLoading} error={error} skeletonHeight={20}>
					<h1 className="text-2xl font-bold mb-6">
						{data.test.title}
					</h1>
				</FetchStateContent>
				<div className="flex flex-row w-full justify-between">
					<FetchStateContent isLoading={isLoading} error={error} skeletonHeight={240} skeletonAmount={4}>
						{data.questions.length === 0 ? (
							<div>No questions found</div>
						) : (
							<QuestionComponent
								indexMapQuestion={indexMapQuestion}
								currentQuestionIndex={currentQuestionIndex}
								setCurrentQuestionIndex={setCurrentQuestionIndex}
								answers={answers}
								setAnswers={setAnswers}
								flaggedQuestions={flaggedQuestions}
								setFlaggedQuestions={setFlaggedQuestions}
							/>
						)}
					</FetchStateContent>

					<Sidebar answers={answers} flaggedQuestions={flaggedQuestions} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex} endedAt={data.endedAt} />
				</div>
			</div>
		</div>
	);
}

export default TestDo