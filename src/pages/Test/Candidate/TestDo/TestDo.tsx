import { useState } from 'react';
import QuestionComponent from './QuestionComponent';
import { useNavigate, useParams } from 'react-router-dom';
import { mockData } from './types';
import { paths } from '../../../../router/path';

const TestDo = () => {
	const navigate = useNavigate();
	const [questionNumber, setQuestionNumber] = useState(1);
	const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string | null }>({});
	const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

	const { testId } = useParams<{ testId: string }>();
	if (!testId) throw new Error("Test ID or Question ID is undefined");
	// todo
	const testQuestions = mockData;

	const questionLength = testQuestions.questions.length;
	const goToNextQuestion = () => {
		if (questionNumber < questionLength) {
			setQuestionNumber(questionNumber + 1);
		}
	};

	const handleOptionChange = (questionNumber: number, selectedOption: string | null) => {
		setSelectedOptions((prevSelectedOptions) => ({
			...prevSelectedOptions,
			[questionNumber]: selectedOption,
		}));
	};

	const toggleFlag = (questionNumber: number) => {
		setFlaggedQuestions((prevFlagged) => {
			const updatedFlags = new Set(prevFlagged);
			if (updatedFlags.has(questionNumber)) {
				updatedFlags.delete(questionNumber);
			} else {
				updatedFlags.add(questionNumber);
			}
			return updatedFlags;
		});
	};

	const getButtonStyle = (index: number) => {
		if (questionNumber === index + 1) {
			return "bg-[#C0E5EA]";
		} else if (flaggedQuestions.has(index + 1)) {
			return "bg-[#E6C1B8]";
		} else if (selectedOptions[index + 1]) {
			return "bg-[#EAF6F8]";
		}
		return "bg-white";
	};

	const handleCancelTest = () => {
		navigate(paths.TEST.attempts(testId));
	}

	const handleSubmitClick = () => {
		// todo: submit answers
		navigate(paths.TEST.attempts(testId));
	}

	return (
		<div className="w-full flex-grow flex flex-col items-center px-4">
			<div className="w-full max-w-7xl py-6">
				<h1 className="text-2xl font-bold mb-6">
					{testQuestions.title}
				</h1>
				<div className="flex">
					{/* QuestionComponent */}
					<QuestionComponent
						questionNumber={questionNumber}
						question={testQuestions.questions[questionNumber - 1].text}
						options={testQuestions.questions[questionNumber - 1].choices.map((choice) => choice.text)}
						selectedOption={selectedOptions[questionNumber] || null}
						onOptionChange={handleOptionChange}
						goToNextQuestion={goToNextQuestion}
						isLastQuestion={questionNumber === questionLength}
						toggleFlag={toggleFlag}
						isFlagged={flaggedQuestions.has(questionNumber)}
					/>
					{/* Sidebar */}
					<div className="w-64 ml-4">
						<div className="text-4xl text-center font-bold text-primary mb-6">37:39</div>
						<div className="bg-white rounded-lg shadow-primary p-6 border-r border-b border-primary">
							<div className="mb-4 font-semibold">Quiz navigation</div>
							<div className="grid grid-cols-5 gap-2">
								{[...Array(questionLength)].map((_, index) => (
									<button
										key={index}
										className={`w-10 h-10 rounded-full text-sm font-bold text-primary border border-primary cursor-pointer ${getButtonStyle(index)}`}
										onClick={() => setQuestionNumber(index + 1)}
									>
										{index + 1}
									</button>
								))}
							</div>
						</div>
						<button className="mt-4 w-full bg-gradient-text text-md font-bold text-white px-6 py-3 rounded-lg" onClick={handleSubmitClick}>
							Submit
						</button>
						<button className="mt-4 w-full px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleCancelTest}>
							Cancel Test
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TestDo