import React, { useEffect } from "react";
import { Outlet, useLoaderData, useNavigation, useLocation } from "react-router-dom";
import { Navbar, Loader } from "../components";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user";
import { titles } from "../routes";


const Layout = () => {

    const isAuth = useLoaderData();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const location = useLocation();


    useEffect(() => {
        document.title = titles[location.pathname] ?? "WebChat";
    }, [location]);


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
            
        </>
    );
};

export default Layout;