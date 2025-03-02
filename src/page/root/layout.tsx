import { Outlet } from "react-router-dom";
import NoAuthHeader from "./common/NoAuthHeader";
import NoAuthFooter from "./common/NoAuthFooter";

export default function Layout() {
	return (
		<>
			<NoAuthHeader />
			<Outlet />
			<NoAuthFooter />
		</>
	)
}