import React from "react";
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import { Navigation } from "../components";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user";

const Layout = () => {

    const isAuth = useLoaderData();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    if (navigation.state === "loading") {
        return <h1>Loading...</h1>
    }

    if (isAuth.data) {
        dispatch(addUser(isAuth.data));
    }

    return (
        <>
            <Navigation />
            <Outlet />
        </>
    );
};

export default Layout;
