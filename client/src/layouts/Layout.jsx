import React from "react";
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import { Navbar, Loader } from "../components";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user";
import { ToastContainer } from "react-toastify";

const Layout = () => {

    const isAuth = useLoaderData();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    if (navigation.state === "loading") {
        return <Loader />
    }

    if (isAuth.data) {
        dispatch(addUser(isAuth.data));
    }

    return (
        <>
            <Navbar />
            <div className="container-fluid bg-custom-primary py-3" >
                <Outlet />
            </div>
            <ToastContainer limit={3} theme="colored"/>
        </>
    );
};

export default Layout;
//style={{ height: "calc(100vh - 4rem)" }}