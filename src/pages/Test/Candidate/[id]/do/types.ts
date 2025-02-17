export type CurrentAttemptDetailResponse = {
	ID: string;
	test: {
		ID?: number;
		companyId: string;
		title: string;
		description: string;
		minutesToAnswer: number;
		difficulty?: string;
		createdAt?: Date;
		updatedAt?: Date;
	};
	questions: {
		ID: number;
		text: string;
		options: {
			ID: number;
			text: string;
		}[];
		points: number;
	}[];
	startedAt: Date;
	endedAt: Date;
}

export type TestSubmitRequest = {
	testId: string;
	answers: {
		questionId: number;
		optionId: number;
	}[];
}

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