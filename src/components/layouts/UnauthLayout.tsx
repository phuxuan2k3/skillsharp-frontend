import { Outlet } from "react-router-dom";
import UnauthNavbar from "../ui/navbar/UnauthNavbar";
import FooterLong from "../ui/footer/FooterLong";
import RoleGuard from "../wrapper/ProtectedRoute";
import { Role } from "../../app/enum";
import paths2 from "../../router/path-2";

export default function UnauthLayout() {
	return <>
		<RoleGuard
			roles={[Role.None]}
			exclude={false}
			alternativeUrl={[
				{ role: Role.Candidate, alternativeUrl: paths2.candidate.ROOT },
				{ role: Role.Manager, alternativeUrl: paths2.manager.ROOT },
			]}>
			<UnauthNavbar />
			<Outlet />
			<FooterLong />
		</RoleGuard>
	</>;
}