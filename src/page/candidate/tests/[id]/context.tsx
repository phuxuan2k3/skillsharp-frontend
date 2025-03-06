import React, { createContext, useContext, ReactNode } from 'react';

interface TestContextProps {
	socket: SocketIOClient.Socket;
	connect(testId: string): void;
}

const TestContext = createContext<TestContextProps | undefined>(undefined);

export const TestContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<TestContext.Provider value={undefined}>
			{children}
		</TestContext.Provider>
	);
};

export const useSocketForProcess = () => {
	const context = useContext(TestContext);
	if (!context) {
		throw new Error('useTestId must be used within a TestIdProvider');
	}
	return context;
};

