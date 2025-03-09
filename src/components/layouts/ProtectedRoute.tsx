import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../app/authSlice';
import { noAuth } from '../../app/env';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
	if (noAuth) {
		return children;
	}
	const isAuth = useSelector(selectIsAuthenticated);
	if (!isAuth) {
		return <Navigate to="/login" />;
	}
	return children;
};

export default ProtectedRoute;