import { Outlet } from "react-router-dom";
import UnauthNavbar from "../../components/ui/navbar/UnauthNavbar";
import FooterLong from "../../components/ui/footer/FooterLong";
import RoleGuard from "../../components/wrapper/RoleGuard";
import paths from "../../router/paths";
import { Role } from "../../features/auth/types/auth";

// Has extra footer in comparision to AuthLayout
export default function UnauthLayout() {
	return <>
		<RoleGuard
			roles={[Role.None]}
			alternativeUrl={[
				{
					role: Role.Candidate,
					alternativeUrl: paths.candidate._layout
				},
				{
					role: Role.Manager,
					alternativeUrl: paths.manager._layout
				},
			]}>
			<div className="flex flex-col min-h-screen">
				<UnauthNavbar />
				<div className="flex-grow overflow-y-auto">
					<Outlet />
				</div>
				<FooterLong />
			</div>
		</RoleGuard>
	</>;
}