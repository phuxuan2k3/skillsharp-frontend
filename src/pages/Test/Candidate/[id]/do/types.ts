export type AnswerProps = {
	questionId: number;
	optionId: number;
}

export type QuestionProps = {
	ID: number;
	text: string;
	options: {
		ID: number;
		text: string;
	}[];
	points: number;
}