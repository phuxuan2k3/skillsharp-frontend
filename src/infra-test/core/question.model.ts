export type QuestionCore = {
	id: number;
	testId: string;
	text: string;
	options: string[];
	points: number;
	correctOption: number;
};

export type QuestionToDo = Omit<QuestionCore, "correctOption">;

export type QuestionDo = QuestionToDo & {
	isFlagged: boolean;
	chosenOption?: number;
};

// New

export type TestQuestionsAggregate = {
	questionId: number;
	numberOfAnswers: number;
	numberOfCorrectAnswers: number;
	averagePoints: number;
};
