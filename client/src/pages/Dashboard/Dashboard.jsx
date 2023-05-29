import React, { useState } from "react";
import "./Dashboard.css";
import { MdPerson, MdSettings, MdPalette, MdNotifications } from "react-icons/md";
import MyProfile from "./MenuPages/MyProfile";
import Account from "./MenuPages/Account";
import Appearance from "./MenuPages/Appearance";
import Notifications from "./MenuPages/Notifications";

const Dashboard = () => {

    const menuProfileItems = [
        { Icon: MdPerson, name: "My profile", Element: MyProfile },
        { Icon: MdSettings, name: "Account", Element: Account },
        { Icon: MdPalette, name: "Appearance", Element: Appearance },
        { Icon: MdNotifications, name: "Notifications", Element: Notifications },
    ];

    const [selectedItem, setSelectedItem] = useState(0);

    const renderMenuElement = () => {
        const MenuElement = menuProfileItems[selectedItem].Element;
        return <MenuElement />;
    }

    return (
    <div className="dashboard">

        <div className="dashboard-menu">
            <div className="dashboard-menu-part">
                <span className="dashboard-menu-title">User</span>
                {menuProfileItems.map(({ Icon, name }, index) => (
                    <button 
                        key={index} 
                        className={index === selectedItem 
                            ? "dashboard-menu-item dashboard-menu-item-selected" 
                            : "dashboard-menu-item"} 
                        onClick={() => setSelectedItem(index)}
                    >
                        <Icon size={24} />
                        <span>{name}</span>
                    </button>
                ))}
            </div>
        </div>

        <div className="dashboard-whitespace">
            {renderMenuElement()}
        </div>

    </div>
    );
};

export default Dashboard;
