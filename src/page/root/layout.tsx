import { Outlet } from "react-router-dom";
import NoAuthHeader from "./components/NoAuthHeader";
import NoAuthFooter from "./components/NoAuthFooter";

export default function NoauthLayout() {
	return (
		<>
			<NoAuthHeader />
			<Outlet />
			<NoAuthFooter />
		</>
	)
}