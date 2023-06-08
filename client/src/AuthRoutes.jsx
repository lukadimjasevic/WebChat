import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "./store/hooks";

const AuthRoutes = () => {

	const user = useUser();

	return user.username ? <Navigate to="/chats"/> : <Outlet />;
};

export default AuthRoutes;
