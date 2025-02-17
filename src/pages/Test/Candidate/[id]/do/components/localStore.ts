import { AnswerProps } from "../types";

const save = (testId: string, answers: AnswerProps[], flaggedQuestions: Set<number>) => {
	localStorage.setItem(testId, JSON.stringify({
		answers,
		flaggedQuestions: Array.from(flaggedQuestions)
	}));
}

const saveAnswers = (testId: string, answers: AnswerProps[]) => {
	const data = localStorage.getItem(testId);
	if (!data) return;
	const { flaggedQuestions } = JSON.parse(data);
	save(testId, answers, flaggedQuestions);
}

const saveFlaggedQuestions = (testId: string, flaggedQuestions: Set<number>) => {
	const data = localStorage.getItem(testId);
	if (!data) return;
	const { answers } = JSON.parse(data);
	save(testId, answers, flaggedQuestions);
}

const load = (testId: string) => {
	const data = localStorage.getItem(testId);
	if (!data) return null;
	const { answers: rawAnswers, flaggedQuestions: rawFlaggedQuestions } = JSON.parse(data);
	const flaggedQuestions = new Set<number>(rawFlaggedQuestions as number[]);
	const answers = rawAnswers as AnswerProps[];
	return {
		answers,
		flaggedQuestions
	};
}

export { save, saveAnswers, saveFlaggedQuestions, load };