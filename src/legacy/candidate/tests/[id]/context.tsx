import React, { createContext, useContext, ReactNode } from 'react';
import { TestProps } from '../types';

const TestContext = createContext<TestProps | undefined>(undefined);

export const TestContextProvider: React.FC<{ children: ReactNode, initialValue: TestProps | undefined }> = ({ children, initialValue }) => {
	return (
		<TestContext.Provider value={initialValue}>
			{children}
		</TestContext.Provider>
	);
};

export const useTestContext = () => {
	const context = useContext(TestContext);
	if (context === undefined) {
		throw new Error('useTestContext must be used within a TestContextProvider');
	}
	return context;
};
