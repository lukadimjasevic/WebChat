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
import { MyProfile, Account, Appearance, Notifications, Logout } from "./pages/Dashboard/MenuPages";
import Chats from "./pages/Chats";
import { JoinGroup, CreateGroup, Chat } from "./pages/Chats/MenuPages";
import { getUser } from "./api/users";
import { getGroup, getUserGroups } from "./api/groups";

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
                        <Route path="/dashboard/logout" element={<Logout />} />
                    </Route>
                    <Route path="/chats" element={<Chats />} loader={getUserGroups}>
                        <Route path="/chats/join" element={<JoinGroup />} />
                        <Route path="/chats/create" element={<CreateGroup />} />
                        <Route path="/chats/:groupId" element={<Chat />} 
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
        </>
    );
};

export default App;
