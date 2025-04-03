import { Outlet } from "react-router-dom";
import UnauthNavbar from "../../components/ui/navbar/UnauthNavbar";

export default function AuthLayout() {
	return (
		<>
			<UnauthNavbar />
			<Outlet />
			{/* Doesn't have footer */}
		</>
	);
}