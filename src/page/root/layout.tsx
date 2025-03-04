import { Outlet } from "react-router-dom";
import NoauthNavbar from "../../components/navbar/NoauthNavbar";
import NoAuthFooter from "./components/NoAuthFooter";

export default function NoauthLayout() {
	return (
		<>
			<NoauthNavbar />
			<Outlet />
			<NoAuthFooter />
		</>
	)
}