import React, { useState, useEffect } from 'react';
import { MyPaginationProps } from '../props';

const MyPagination_modern: React.FC<MyPaginationProps> = ({
	totalPage,
	initialPage = 1,
	onPageChange
}) => {
	const [currentPage, setCurrentPage] = useState<number>(initialPage);

	useEffect(() => {
		setCurrentPage(initialPage);
	}, [initialPage]);

	const handlePageChange = (page: number) => {
		if (page < 1 || page > totalPage) return;
		setCurrentPage(page);
		onPageChange?.(page);
	};

	const renderPageNumbers = () => {
		const pages = [];
		const maxVisiblePages = 5;

		// Always show first page
		pages.push(
			<button
				key={1}
				onClick={() => handlePageChange(1)}
				className={`px-3 py-1 rounded-md ${currentPage === 1
					? 'bg-blue-500 text-white'
					: 'bg-white text-gray-700 hover:bg-gray-100'
					}`}
			>
				1
			</button>
		);

		// Calculate range of visible pages
		let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
		let endPage = Math.min(totalPage - 1, startPage + maxVisiblePages - 3);

		if (endPage - startPage < maxVisiblePages - 3) {
			startPage = Math.max(2, endPage - maxVisiblePages + 3);
		}

		// Show ellipsis after first page if needed
		if (startPage > 2) {
			pages.push(
				<span key="ellipsis1" className="px-2">
					...
				</span>
			);
		}

		// Show middle pages
		for (let i = startPage; i <= endPage; i++) {
			pages.push(
				<button
					key={i}
					onClick={() => handlePageChange(i)}
					className={`px-3 py-1 rounded-md ${currentPage === i
						? 'bg-blue-500 text-white'
						: 'bg-white text-gray-700 hover:bg-gray-100'
						}`}
				>
					{i}
				</button>
			);
		}

		// Show ellipsis before last page if needed
		if (endPage < totalPage - 1) {
			pages.push(
				<span key="ellipsis2" className="px-2">
					...
				</span>
			);
		}

		// Always show last page if more than one page
		if (totalPage > 1) {
			pages.push(
				<button
					key={totalPage}
					onClick={() => handlePageChange(totalPage)}
					className={`px-3 py-1 rounded-md ${currentPage === totalPage
						? 'bg-blue-500 text-white'
						: 'bg-white text-gray-700 hover:bg-gray-100'
						}`}
				>
					{totalPage}
				</button>
			);
		}

		return pages;
	};

	if (totalPage <= 1) return null;

	return (
		<div className="flex items-center justify-center space-x-2 my-4">
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className={`px-3 py-1 rounded-md ${currentPage === 1
					? 'bg-gray-200 text-gray-500 cursor-not-allowed'
					: 'bg-white text-gray-700 hover:bg-gray-100'
					}`}
			>
				Previous
			</button>

			<div className="flex items-center space-x-1">
				{renderPageNumbers()}
			</div>

			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPage}
				className={`px-3 py-1 rounded-md ${currentPage === totalPage
					? 'bg-gray-200 text-gray-500 cursor-not-allowed'
					: 'bg-white text-gray-700 hover:bg-gray-100'
					}`}
			>
				Next
			</button>
		</div>
	);
};

export default MyPagination_modern;