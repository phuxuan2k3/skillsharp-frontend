import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ContentNotAvailable: React.FC = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
			<div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
				<div className="mb-6">
					<FontAwesomeIcon
						icon={faExclamationTriangle}
						className="text-yellow-500 text-5xl mb-4"
					/>
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						Content Not Available
					</h1>
					<p className="text-gray-600 text-lg">
						The content you are looking for is currently not available or may have been moved.
					</p>
				</div>

				<button
					onClick={handleGoBack}
					className="inline-flex items-center px-6 py-3 text-base font-medium text-white 
                   bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					<FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
					Go Back
				</button>
			</div>
		</div>
	);
};

export default ContentNotAvailable;