import { Outlet } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar";
import FooterShort from "../../components/footers/FooterShort";

export default function NoauthLayout() {
	return (
		<>
			<NavBar />
			<Outlet />
			<FooterShort />
		</>
	)
}