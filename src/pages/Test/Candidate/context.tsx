import React, { createContext, useContext, ReactNode } from 'react';

interface TestContextProps {
}

const TestContext = createContext<TestContextProps | undefined>(undefined);

export const TestContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<TestContext.Provider value={undefined}>
			{children}
		</TestContext.Provider>
	);
};

export const useTestContext = () => {
	const context = useContext(TestContext);
	if (!context) {
		throw new Error('useTestId must be used within a TestIdProvider');
	}
	return context;
};