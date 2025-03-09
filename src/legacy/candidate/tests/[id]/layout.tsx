import { Outlet, useLocation, useParams } from "react-router-dom";
import { TestContextProvider } from "./context";

export default function TestDetailLayout() {
	const { testId } = useParams<{ testId: string }>();
	const { state } = useLocation();

	return (
		<>
			<TestContextProvider initialValue={state} >
				<Outlet />
			</TestContextProvider>
		</>
	);
}
