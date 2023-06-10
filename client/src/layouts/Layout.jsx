import React from "react";
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import { Navbar, Loader, Alert } from "../components";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user";
import { useAlert } from "../store/hooks";

const Layout = () => {

    const isAuth = useLoaderData();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const alert = useAlert();

    if (navigation.state === "loading") {
        return <Loader />
    }

    if (isAuth.data) {
        dispatch(addUser(isAuth.data));
    }

    return (
        <>
            <Navbar />
            <div className="bg-custom-primary py-3">
                <Outlet />
            </div>
            { alert.visible ? <Alert /> : null}
        </>
    );
};

export default Layout;
