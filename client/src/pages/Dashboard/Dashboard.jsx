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
    <div className="row g-0 dashboard">

        <div className="col-md-3 px-3 pt-3 dashboard-menu fs-14">
            <div className="row row-cols-1 g-0 w-100">
                <div className="row row-cols-1 g-0 gap-2 text-uppercase text-highlight">
                    <span className="col">User</span>
                    <hr className="col" />
                </div>
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

        <div className="col-md-9">
            <div className="mx-3 p-3 menu-page">
                <Outlet />
            </div>
        </div>

    </div>
    );
};

export default Dashboard;
