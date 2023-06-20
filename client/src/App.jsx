import React from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import { ToastContainer } from "react-toastify";
import Layout from "./layouts/Layout";
import AuthRoutes from "./AuthRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Dashboard from "./pages/Dashboard";
import { MyProfile, Account, Appearance, Notifications, Logout } from "./pages/Dashboard/MenuPages";
import Chats from "./pages/Chats";
import { JoinGroup, CreateGroup, Chat } from "./pages/Chats/MenuPages";
import { getUser } from "./api/users";
import { getGroup, getUserGroups } from "./api/groups";


const App = () => {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path={routes.home} element={<Layout />} loader={getUser}>
                <Route index element={<Home />} />
                <Route element={<AuthRoutes />}>
                    <Route path={routes.register} element={<Register />} />
                    <Route path={routes.login} element={<Login />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route index element={<Navigate to={routes.dashProfile}/>} />
                        <Route path={routes.dashProfile} element={<MyProfile />} loader={getUser} />
                        <Route path={routes.dashAccount} element={<Account />} />
                        <Route path={routes.dashAppearance} element={<Appearance />} />
                        <Route path={routes.dashNotifications} element={<Notifications />} />
                        <Route path={routes.dashLogout} element={<Logout />} />
                    </Route>
                    <Route path="/chats" element={<Chats />} loader={getUserGroups}>
                        <Route path={routes.chatJoin} element={<JoinGroup />} />
                        <Route path={routes.chatCreate} element={<CreateGroup />} />
                        <Route path={`${routes.chat}/:groupId`} element={<Chat />} 
                            loader={({ params }) => getGroup(params.groupId)}
                        />
                    </Route>
                </Route>
                <Route path="/*" element={<NoPage />} />
            </Route>
        )
    );

    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer limit={3} theme="colored"/>
        </>
    );
};

export default App;
