import React from "react";
import "./Dashboard.css";
import { Sidebar } from "../../components";
import { MdPerson, MdSettings, MdPalette, MdNotifications, MdLogout } from "react-icons/md";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

    const sidebarLinks = [
        { 
            category: "User", 
            items: [
                { Icon: MdPerson, name: "My profile", path: "/dashboard/profile" },
                { Icon: MdSettings, name: "Account", path: "/dashboard/account" },
                { Icon: MdPalette, name: "Appearance", path: "/dashboard/appearance" },
                { Icon: MdNotifications, name: "Notifications", path: "/dashboard/notifications" },
            ]
        },
        {
            category: "Account",
            items: [
                { Icon: MdLogout, name: "Logout", path: "/dashboard/logout", class: "text-danger" }
            ]
        }
    ];

    return (
    <div className="container-fluid g-0 d-flex flex-column flex-md-row gap-3 h-100">
        <Sidebar links={sidebarLinks} />
        <div className="container-fluid p-3 bg-custom-secondary rounded">
            <Outlet />
        </div>
    </div>
    );
};

export default Dashboard;
