import { useNavigate } from "react-router-dom"
import useGetTestIdParams from "../../../../../features/tests/hooks/useGetTestIdParams";
import { useEffect, useState } from "react";
import ModalBase from "../../../../../components/ui/modal/Modal.base";
import { usePostCandidateCurrentAttemptNewMutation } from "../../../../../features/tests/api/test.api-gen";
import paths from "../../../../../router/paths";

export default function Sidebar() {
	const testId = useGetTestIdParams();
	const navigate = useNavigate();
	const [openNewAttemptModal, setOpenNewAttemptModal] = useState(false);

	const [postNewAttempt, { isLoading, isSuccess, error }] = usePostCandidateCurrentAttemptNewMutation();

	useEffect(() => {
		if (isSuccess) {
			navigate(paths.candidate.tests.in(testId).DO);
		}
	}, [isSuccess]);

	const handleNewAttemptAccept = () => {
		setOpenNewAttemptModal(false);
		postNewAttempt({
			body: { testId }
		});
	};

	const handleBackToTestLists = () => {
		navigate(paths.candidate.tests._layout);
	};

	const handleViewAssessment = () => {
		navigate(paths.candidate.tests.in(testId).ASSESSMENT);
	};

	return (
		<>
			<ModalBase
				isOpen={openNewAttemptModal}
				onClose={() => setOpenNewAttemptModal(false)}
			>
				<div>
					<h3 className="text-lg font-bold">Start a new quiz</h3>
					<p className="text-sm text-[#39A0AD] mt-2">
						Are you sure you want to start a new quiz? Your current quiz
						progress will be lost.
					</p>
					<div className="mt-4 flex justify-end">
						<button
							className="px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer"
							onClick={handleNewAttemptAccept}
							disabled={isLoading}
						>
							Yes
						</button>
						<button
							className="ml-2 px-3 font-semibold rounded-lg py-2 text-white bg-[#FF5C5C] cursor-pointer"
							onClick={() => setOpenNewAttemptModal(false)}
						>
							No
						</button>
					</div>
				</div>
			</ModalBase>
			<div className="w-64 ml-4">
				<div>
					<button
						className="w-full px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer"
						onClick={() => setOpenNewAttemptModal(true)}
						disabled={isLoading}
					>
						Start a new quiz
					</button>
					<span className="text-sm text-[#39A0AD] mt-2 block">
						{error && "Failed to start a new quiz. Please try again."}
					</span>
				</div>
				<button className="mt-4 w-full px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleBackToTestLists}>
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
				<button className="mt-4 w-full border bg-gradient-text text-md font-bold text-white px-6 py-3 rounded-lg cursor-pointer" onClick={handleViewAssessment}>
					View Evaluated
				</button>
			</div>
		</>
	);
}
