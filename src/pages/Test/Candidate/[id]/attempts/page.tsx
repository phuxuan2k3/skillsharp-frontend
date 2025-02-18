import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetTestDisplayQuery, useLazyGetAttemptsQuery } from './api';
import { TestAttemptsResponse } from "./types";
import { Attempt, FilterParams, TestAttemptsProps } from './types';
import FetchStateContent from '../../../../../components/redux-api/FetchStateContent';
import MyPagination from '../../../components/MyPagination';
import { useEffect, useState } from 'react';
import { useGetCompaniesQuery } from '../../../../../features/Account/account.api';
import { Paged } from '../../../../../interfaces/paged.type';
import AttemptCardFinished from './components/AttemptCardFinished';
import AttemptCardInProgress from './components/AttemptCardInProgress';
import Sidebar from './components/Sidebar';

const perPage = 5;
const bufferTestResponseData: TestAttemptsResponse = {
	ID: '',
	companyId: '',
	createdAt: Date().toString(),
	title: '',
	description: '',
	minutesToAnswer: 0,
	tags: [],
	answerCount: 0,
	highestScore: 0,
};

const bufferCompanyData = {
	id: '',
	name: '',
	imageUrl: '',
};

const bufferAttemptsData: Paged<Attempt> = {
	page: 0,
	perPage: 0,
	totalPage: 0,
	data: [],
};

const TestDetail: React.FC = () => {
	const { testId } = useParams<{ testId: string }>();
	if (!testId) throw new Error("Test ID is undefined");

	const [filter, setFilter] = useState<FilterParams>({
		testId,
		page: 1,
		perPage,
	});

	const {
		data: data_TestDisplay,
		isLoading: isLoading_TestDisplay,
		error: error_TestDisplay
	} = useGetTestDisplayQuery(testId);
	const testAttemptsResponse = data_TestDisplay ?? bufferTestResponseData;

	const { data: data_companies, isLoading: isLoading_companies, error: error_companies } = useGetCompaniesQuery([testAttemptsResponse.companyId]);
	const companyProps = data_companies?.[0] ?? bufferCompanyData;

	const testAttemptsProps: TestAttemptsProps = {
		...testAttemptsResponse,
		company: companyProps.name,
	}
	const isLoadingProps = isLoading_TestDisplay || isLoading_companies;
	const errorProps = error_TestDisplay || error_companies;

	const [getAttempts, {
		data: data_PagedAttemps,
		isLoading: isLoading_PagedAttempts,
		error: error_PagedAttempts
	}] = useLazyGetAttemptsQuery();
	const pagedAttempts = data_PagedAttemps ?? bufferAttemptsData;

	const handlePaging = (page: number) => {
		setFilter({ ...filter, page });
	}

	const handleAttemptEvaluated = () => {
		getAttempts(filter);
	}

	useEffect(() => {

	}, []);

	useEffect(() => {
		getAttempts(filter);
	}, [filter, getAttempts]);

	return (
		<div className="w-full flex-grow flex flex-col items-center px-4">
			<div className="w-full max-w-7xl py-6">
				<h1 className="text-2xl font-bold mb-6">
					<FetchStateContent isLoading={isLoadingProps} error={errorProps} skeletonHeight={20}>
						{testAttemptsProps.title}
					</FetchStateContent>
				</h1>

				<div className="flex">
					<div className='flex flex-col flex-1'>
						<FetchStateContent isLoading={isLoading_TestDisplay} error={error_TestDisplay}>
							<AttemptCardInProgress companyProps={companyProps} testAttemptsProps={testAttemptsProps} />
						</FetchStateContent>
						<div className="flex flex-col bg-white rounded-lg shadow-primary p-6 border-r border-b border-primary">
							<FetchStateContent isLoading={isLoading_PagedAttempts} error={error_PagedAttempts} skeletonAmount={2}>
								{pagedAttempts.data.map((attempt) => (
									<AttemptCardFinished
										key={attempt.ID}
										attempt={attempt}
										companyProps={companyProps}
										testAttemptsProps={testAttemptsProps}
									/>
								))}
								<div className="w-full text-2xl text-center font-bold text-primary mt-10 mb-6">
									<span>Highest score: {testAttemptsProps.highestScore}</span>
								</div>
							</FetchStateContent>
							<div className="flex justify-center pt-5">
								<MyPagination totalPage={pagedAttempts.totalPage} onPageChange={handlePaging} />
							</div>
						</div>
					</div>

					<Sidebar />

				</div>
			</div>
		</div>
	);
}

export default TestDetail;