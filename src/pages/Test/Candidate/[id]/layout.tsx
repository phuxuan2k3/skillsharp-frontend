import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { socketTestProcess } from "../../../../features/Test/test-process.socket";

interface Props {
	children: React.ReactNode;
}

export default function TestDetailLayout({ children }: Props) {
	const { testId } = useParams<{ testId: string }>();
	if (!testId) throw new Error('Test ID is required');

	useEffect(() => {
		socketTestProcess.connect(testId);
		return () => {
			socketTestProcess.disconnect();
		};
	}, []);

	return children;
}
