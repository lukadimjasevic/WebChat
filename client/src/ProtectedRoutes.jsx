import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "./store/hooks";

const ProtectedRoutes = () => {

	const user = useUser();

	return user.username ? <Outlet /> : <Navigate to="/login"/>;
};

export default ProtectedRoutes;
