import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";


const ProtectedRoutes = () => {

	const [{ access_token }] = useCookies(["access_token"]);
	
	return access_token ? <Outlet /> : <Navigate to="/login"/>;
};

export default ProtectedRoutes;
