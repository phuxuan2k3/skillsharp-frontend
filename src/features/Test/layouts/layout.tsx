import { Outlet } from "react-router-dom";
import NavBar from "../../../components/ui/Navbar";
import FooterLong from "../../../components/ui/footers/FooterLong";

export default function RootLayout() {
	return (
		<>
			<NavBar />
			<Outlet />
			<FooterLong />
		</>
	)
}