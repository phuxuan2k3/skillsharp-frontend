import { useNavigate, useParams } from "react-router-dom"
import { paths } from "../../../router/path";
import { usePostNewAttemptMutation } from "../apis/api";

export default function Sidebar() {
	const navigate = useNavigate();
	const [postNewAttempt] = usePostNewAttemptMutation();
	const { testId } = useParams<{ testId: string }>();
	if (!testId) throw new Error("Test ID is undefined");

	const handleStartNewQuiz = async () => {
		const res = await postNewAttempt(testId);
		if (res.error) {
			console.error(res.error);
			return;
		}
		navigate(paths.TEST.do(testId));
	};

	const handleBackToQuestions = () => {
		navigate(paths.TEST.LIST);
	};

	const handleViewEvaluated = () => {
		navigate(paths.TEST.evaluate(testId));
	}

	return (
		<>
			<div className="w-64 ml-4">
				<button className="w-full px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={handleStartNewQuiz}>
					Start a new quiz
				</button>
				<button className="mt-4 w-full px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleBackToQuestions}>
					Back to Questions
				</button>
				<div className="mt-4 bg-white rounded-lg shadow-primary p-6 border-r border-b border-primary">
					<h3 className="text-lg font-bold">Notes</h3>
					<p className="text-sm text-[#39A0AD] mt-2">
						Please read each question carefully and double-check your
						answers. Manage your time wisely, stay calm, and focus on
						accuracy rather than speed. Good luck!
					</p>
				</div>
				<button className="mt-4 w-full border bg-gradient-text text-md font-bold text-white px-6 py-3 rounded-lg cursor-pointer" onClick={handleViewEvaluated}>
					View Evaluated
				</button>
			</div>
		</>
	)
}
