import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import GradientBorderGood from '../../../../../../components/border/GradientBorder.good';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { TestAttemptsProps } from '../types';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../router/path';
import FetchStateContent from '../../../components/legacy/FetchStateContent';
import Timer from './Timer';
import { useGetCurrentAttemptSmallQuery } from '../apis/api';

interface AttemptCardInProgressProps {
	companyProps: { imageUrl: string; name: string };
	testAttemptsProps: TestAttemptsProps;
}

const AttemptCardInProgress: React.FC<AttemptCardInProgressProps> = ({ companyProps, testAttemptsProps }) => {
	const navigate = useNavigate();
	const testId = testAttemptsProps.ID;
	const { isLoading, error, data } = useGetCurrentAttemptSmallQuery(testAttemptsProps.ID);
	if (data == null) return null;

	const handleOnAttemptClick = () => {
		navigate(paths.TEST.do(testAttemptsProps.ID));
	};

	return (
		<FetchStateContent isLoading={isLoading} error={error}>
			<div className="bg-white rounded-lg shadow-primary p-6 border-r border-b border-primary">
				<div key={data.ID} className="bg-secondary-toned-50 p-4 mb-4 rounded-lg shadow-md cursor-pointer" onClick={() => handleOnAttemptClick()}>
					<div className="flex flex-row border-b border-secondary pb-4 items-center gap-3 mb-3 h-fit">
						<img className="w-12 h-12 rounded-full" src={companyProps.imageUrl} alt={companyProps.name} />
						<div className="flex flex-col h-fit">
							<div className="flex items-center text-sm text-blue-chill-500 mb-0">
								<span className="font-semibold">Asked at {companyProps.name}</span>
								<span className="mx-2">&#8226;</span>
								<span className="">{formatDistanceToNow(new Date(testAttemptsProps.createdAt))} ago</span>
							</div>
							<h3 className="text-lg font-semibold text-gray-800 my-0">{testAttemptsProps.title}</h3>
						</div>
					</div>
					<div className="flex flex-wrap gap-2 mb-4">
						{testAttemptsProps.tags.map((tag, index: number) => (
							<GradientBorderGood key={index}>
								{tag}
							</GradientBorderGood>
						))}
					</div>
					<div className="flex flex-row text-xl font-bold mb-2">
						<Timer testId={testId} endedAt={new Date(data.endedAt)} />
					</div>
					<div className="flex flex-row font-semibold mb-2 text-[#39A0AD] items-center">
						<div className="text-lg">In Progress</div>
						<div className="ml-20">
							{`Submitted at ${format(new Date(data.startedAt), "PPPP")}`}
						</div>
					</div>
					<div className="mt-6 flex flex-row items-start bg-gray-50 rounded-xl px-6 py-4 justify-between font-sans">
						<span className=" text-blue-chill-600 italic font-medium">Not yet graded</span>
						<div className="font-semibold flex items-center min-w-fit cursor-pointer">
							<span className="whitespace-pre">Continue</span>
							<FontAwesomeIcon icon={faCaretDown} />
						</div>
					</div>
				</div>
			</div>
		</FetchStateContent>
	);
};

export default AttemptCardInProgress;