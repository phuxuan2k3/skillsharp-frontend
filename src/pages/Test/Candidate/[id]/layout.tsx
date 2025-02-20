import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { socketTestProcess } from "../../../../features/Test/test-process.socket";


export default function TestDetailLayout() {
	const { testId } = useParams<{ testId: string }>();
	if (!testId) throw new Error('Test ID is required');

	useEffect(() => {
		socketTestProcess.connect(testId);
		return () => {
			socketTestProcess.disconnect();
		};
	}, []);

	return <Outlet />;
}
