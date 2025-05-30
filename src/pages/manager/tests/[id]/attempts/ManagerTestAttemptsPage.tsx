import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders, faMagnifyingGlass, faSquarePollHorizontal, faCalendarMinus, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import paths from "../../../../../router/paths";
import { useGetUserTestsByTestIdAttemptsQuery, useGetTestsByTestIdQuery } from "../../../../../features/tests/legacy/test.api-gen";

// TODO: add paging
const ManagerTestAttemptsPage = () => {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);

	const { data: test } = useGetTestsByTestIdQuery({ testId: 1 });
	const { data: attempts } = useGetUserTestsByTestIdAttemptsQuery({
		testId: 1,
		page: 1,
		perPage: 10,
	});

	if (!attempts || !test) return null;

	const handleGoToSubmissionDetail = (attemptId: number) => {
		navigate(paths.manager.tests.attempts.in(attemptId)._layout);
	};
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<div className="w-full flex-grow flex flex-col items-center px-4">
				<div className="w-full flex-1 flex-col mt-6 pl-16">
					<div className="w-full text-4xl font-bold">Welcome to your Test Submission Overview</div>
					<div className="w-full text-xl font-semibold">You can see all the submission for your test here!</div>

					<div className="text-sm text-gray-500 mt-4">
						<span className="font-semibold text-[var(--primary-color)]">&lt; <span className="underline">Back to test list</span></span>
					</div>
				</div>

				<div className="w-full max-w-7xl py-6">
					<h1 className="text-2xl text-center text-[var(--primary-color)] font-bold mb-6">{test.title}</h1>

					<div className="flex flex-col items-center">
						<div className="w-4/6 flex flex-row justify-between font-semibold text-[var(--primary-color)] mb-4">
							<span>Submission List ({attempts.data.length})</span>
							<div className="h-full w-fit flex items-center">
								<div className="h-7 w-7 bg-[#EAF6F8] flex items-center justify-center rounded-lg cursor-pointer" onClick={handleClickOpen}>
									<FontAwesomeIcon icon={faSliders} rotation={90} />
								</div>

								<div className="flex items-center ml-4">
									<div className="h-7 w-fit bg-[#EAF6F8] flex items-center justify-center rounded-lg p-2">
										<FontAwesomeIcon className="h-4 w-4 mr-2" icon={faMagnifyingGlass} />
										<input className="bg-[#EAF6F8]" type="text" placeholder="Search for submitter" />
									</div>
								</div>
							</div>
						</div>

						{/* Submission List */}
						{attempts.data.map((attempt, index) => (
							<div key={index} className="w-4/6 flex-1 flex flex-col bg-white rounded-lg shadow-primary p-6 border-r border-b border-solid border-primary items-between mb-4">
								<div className="flex-1 flex justify-between mb-4">
									<span className="font-bold mb-2 opacity-50">
										#Version number
									</span>

									<div className="cursor-pointer" onClick={() => handleGoToSubmissionDetail(attempt.id)}>
										<FontAwesomeIcon className="h-6 w-6" icon={faSquarePollHorizontal} />
									</div>
								</div>

								<div className="font-medium mb-8">
									Submitter: <span className="text-[#39A0AD] underline">{attempt.candidateId}</span>
								</div>

								<div className="flex justify-between">
									<div className="flex items-center">
										<div className="flex items-center">
											<FontAwesomeIcon className="h-4 w-4" icon={faCalendarMinus} />
											<span className="ml-2 text-gray-600 text-sm font-medium">{format(new Date(attempt.startDate), "dd-MM-yyyy HH:mm:ss")}</span>
										</div>
										<div className="flex items-center">
											<FontAwesomeIcon className="h-4 w-4 ml-4" icon={faListCheck} />
											<span className="ml-2 text-gray-600 text-sm font-medium">Time spent: {formatSecondsToMinutes(attempt.secondsSpent)}</span>
										</div>
									</div>
									<div>
										{attempt.score === null ? (
											<span className="text-red-600 font-semibold">Not graded</span>
										) : (
											<span className="text-primary font-semibold">
												Graded: {attempt.score}/{attempt.totalScore}
											</span>
										)}
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="flex flex-row justify-center items-center space-x-2 mt-4">
						<button className="w-10 h-10 bg-[#EAF6F8] rounded-full text-md font-bold text-primary border border-primary cursor-pointer rotate-270">
							^
						</button>

						<button className="w-10 h-10 bg-primary rounded-full text-md font-bold text-white border border-primary cursor-pointer">
							1
						</button>

						<button className="w-10 h-10 bg-[#EAF6F8] rounded-full text-md font-bold text-primary border border-primary cursor-pointer rotate-90">
							^
						</button>
					</div>
				</div>
			</div>
			<React.Fragment>
				<BootstrapDialog
					onClose={handleClose}
					aria-labelledby="customized-dialog-title"
					open={open}
					sx={{
						"& .MuiPaper-root": {
							backgroundColor: "#EAF6F8",
						},
					}}
				>
					<DialogTitle className="text-center font-bold" sx={{ m: 0, p: 2 }} id="customized-dialog-title">
						Filter
					</DialogTitle>
					<IconButton
						aria-label="close"
						onClick={handleClose}
						sx={(theme) => ({
							position: 'absolute',
							right: 8,
							top: 8,
							color: theme.palette.grey[500],
						})}
					>
						<CloseIcon />
					</IconButton>
					<DialogContent dividers>
						<div className="flex flex-row justify-center">
							<span className="font-semibold">Date</span>
							<div className="flex flex-row gap-2 ml-16">
								<input type="date" className="border border-black rounded-lg text-sm p-1"
								/>
								<input type="date" className="border border-black rounded-lg text-sm p-1"
								/>
							</div>
						</div>
						<div className="flex justify-between mt-2">
							<label className="font-semibold">Version</label>
							<select className="border border-black rounded-lg text-sm p-1 w-fit">
								<option value="all">All</option>
							</select>
						</div>
					</DialogContent>
					<DialogActions>
						<button className="w-fit px-3 font-semibold mr-3 rounded-lg py-2 border-[var(--primary-color)] text-[var(--primary-color)] border-2 cursor-pointer" onClick={handleClose}>
							Reset
						</button>
						<button className="w-fit px-3 font-semibold rounded-lg py-2 text-white bg-[var(--primary-color)] cursor-pointer" onClick={handleClose}>
							Apply
						</button>
					</DialogActions>
				</BootstrapDialog>
			</React.Fragment>
		</>
	);
}

export default ManagerTestAttemptsPage;


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

const formatSecondsToMinutes = (seconds: number): string => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};