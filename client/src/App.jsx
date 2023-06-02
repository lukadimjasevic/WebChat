import React from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthRoutes from "./AuthRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/Dashboard/MenuPages/MyProfile";
import Account from "./pages/Dashboard/MenuPages/Account";
import Appearance from "./pages/Dashboard/MenuPages/Appearance";
import Notifications from "./pages/Dashboard/MenuPages/Notifications";
import { getUser } from "./fetchers/get";

const App = () => {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />} loader={getUser}>
                <Route index element={<Home />} />
                <Route element={<AuthRoutes />}>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route index element={<Navigate to="/dashboard/profile"/>} />
                        <Route path="/dashboard/profile" element={<MyProfile />} loader={getUser} />
                        <Route path="/dashboard/account" element={<Account />} />
                        <Route path="/dashboard/appearance" element={<Appearance />} />
                        <Route path="/dashboard/notifications" element={<Notifications />} />
                    </Route>
                </Route>
                <Route path="/*" element={<NoPage />} />
            </Route>
        )
    );

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};

export default App;
