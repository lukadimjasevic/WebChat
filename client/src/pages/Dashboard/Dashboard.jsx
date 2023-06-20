import React from "react";
import "./Dashboard.css";
import { Sidebar } from "../../components";
import { Outlet } from "react-router-dom";
import { dashboardSidebarLinks } from "../../routes";


const Dashboard = () => {
    return (
    <div className="container-fluid g-0 d-flex flex-column flex-md-row gap-3 h-100">
        <Sidebar links={dashboardSidebarLinks} />
        <div className="container-fluid p-3 bg-custom-secondary rounded">
            <Outlet />
        </div>
    </div>
    );
};


export default Dashboard;
