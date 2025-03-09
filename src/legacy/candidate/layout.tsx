import { Outlet } from "react-router-dom";
import NavBar from "../../components/ui/Navbar";
import FooterShort from "../../components/ui/footers/FooterShort";

export default function CandidateLayout() {
	return (
		<div className="min-h-screen flex flex-col">
			<NavBar />
			<Outlet />
			<FooterShort />
		</div>
	);
}
