import { Outlet } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar";
import FooterShort from "../../components/FooterShort";

export default function CandidateLayout() {
	return (
		<>
			<NavBar />
			<Outlet />
			<FooterShort />
		</>
	);
}
