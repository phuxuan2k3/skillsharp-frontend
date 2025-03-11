import { ReactNode } from "react";
import { Role } from "../../app/enum"
import { useRole } from "../../app/redux/hooks";

type Props = {
	roleSwitch: {
		role: Role;
		component: ReactNode;
	}[];
}

/**
 * @description RoleBaseSwitch is a component that takes a list of components and renders the component that matches the current user's role.
 * @param roleSwitch - A list of components and their corresponding roles. The component that matches the current user's role will be rendered.
 */

export default function RoleBaseSwitch({ roleSwitch }: Props) {
	const role = useRole();
	const component = roleSwitch.find(r => r.role === role)?.component;
	return (
		<>
			{component}
		</>
	)
}