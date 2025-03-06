import { Outlet } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar";
import FooterLong from "../../components/footers/FooterLong";

export default function RootLayout() {
	return (
		<>
			<NavBar />
			<Outlet />
			<FooterLong />
		</>
	)
}