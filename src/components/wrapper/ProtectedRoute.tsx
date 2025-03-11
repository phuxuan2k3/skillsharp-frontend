import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { noAuth } from '../../app/env';
import { selectRole } from '../../app/redux/authSlice';
import { Role } from '../../app/enum';
import paths2 from '../../router/path-2';

type RoleAlternativeUrl = {
	role: Role;
	alternativeUrl: string;
}

type Props = {
	children: React.ReactNode;
	roles: Role[];
	exclude?: boolean;
	alternativeUrl?: string | RoleAlternativeUrl[];
}

const RoleGuard: React.FC<Props> = ({
	children,
	roles,
	exclude = false,
	alternativeUrl = paths2.auth.LOGIN,
}) => {
	if (noAuth) {
		return children;
	}
	const role = useSelector(selectRole);
	const _alternativeUrl = typeof alternativeUrl === 'string'
		? alternativeUrl
		: (alternativeUrl as RoleAlternativeUrl[]).find(a => a.role === role)?.alternativeUrl || paths2.auth.LOGIN;
	const alternativeLink = <Navigate to={_alternativeUrl} />
	if (exclude == false) {
		if (roles.find(r => r === role)) {
			return children;
		}
		return alternativeLink;
	} else {
		if (roles.find(r => r === role)) {
			return alternativeLink;
		}
		return children;
	}
};

export default RoleGuard;