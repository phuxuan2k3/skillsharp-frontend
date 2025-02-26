import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../../../../router/path";
import { usePostSubmitMutation } from "../apis/api";
import { AnswerProps } from "../types";
import Timer from "../../components/Timer";

interface SidebarProps {
	answers: AnswerProps[];
	flaggedQuestions: Set<number>;
	currentQuestionIndex: number;
	setCurrentQuestionIndex: (questionNumber: number) => void;
	endedAt: Date;
}

export default function Sidebar({ answers, flaggedQuestions, currentQuestionIndex, setCurrentQuestionIndex, endedAt }: SidebarProps) {
	const navigate = useNavigate();
	const { testId } = useParams<{ testId: string }>();
	if (!testId) throw new Error("Test ID is undefined");

	const [submitTest] = usePostSubmitMutation();

	const handleCancelTest = () => {
		navigate(paths.TEST.attempts(testId));
	}

	const handleSubmitClick = async () => {
		const res = await submitTest(testId);
		if (res.error) {
			console.error(res.error);
		}
		else {
			navigate(paths.TEST.attempts(testId));
		}
	}

	console.log(flaggedQuestions);

	return (
		<div className="flex flex-col w-64 ml-4">
			<div className="font-bold text-xl flex justify-center mb-4" >
				<Timer testId={testId} endedAt={endedAt} />
			</div>
			<div className="bg-white rounded-lg shadow-primary p-6 border-r border-b border-primary">
				<div className="mb-4 font-semibold">Quiz navigation</div>
				<div className="grid grid-cols-5 gap-2">
					{answers.map(({ questionId, optionId }, index) => (
						<button
							key={questionId}
							className={`w-10 h-10 rounded-full text-sm font-bold text-primary border border-primary cursor-pointer ${currentQuestionIndex === index
								? "bg-primary-toned-600 text-white"
								: flaggedQuestions.has(questionId)
									? "bg-secondary-toned-200"
									: optionId !== -1
										? "bg-primary-toned-200"
										: "bg-white"
								}`}
							onClick={() => setCurrentQuestionIndex(index)}
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
	)
}