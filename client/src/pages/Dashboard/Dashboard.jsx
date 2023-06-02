import React, { useState } from "react";
import "./Dashboard.css";
import { MdPerson, MdSettings, MdPalette, MdNotifications } from "react-icons/md";
import { Outlet, Link } from "react-router-dom";

const Dashboard = () => {

    const menuProfileItems = [
        { Icon: MdPerson, name: "My profile", path: "/profile" },
        { Icon: MdSettings, name: "Account", path: "/account" },
        { Icon: MdPalette, name: "Appearance", path: "/appearance" },
        { Icon: MdNotifications, name: "Notifications", path: "/notifications" },
    ];

    const [selectedItem, setSelectedItem] = useState(0);

    return (
    <div className="dashboard">

        <div className="dashboard-menu">
            <div className="dashboard-menu-part">
                <span className="dashboard-menu-title">User</span>
                {menuProfileItems.map(({ Icon, name, path }, index) => (
                    <Link to={"/dashboard" + path}
                        key={index} 
                        className={index === selectedItem 
                            ? "dashboard-menu-item dashboard-menu-item-selected" 
                            : "dashboard-menu-item"} 
                        onClick={() => setSelectedItem(index)}
                    >
                        <Icon size={24} />
                        <span>{name}</span>
                    </Link>
                ))}
            </div>
        </div>

        <div className="dashboard-whitespace">
            <Outlet />
        </div>

    </div>
    );
};

export default Dashboard;
