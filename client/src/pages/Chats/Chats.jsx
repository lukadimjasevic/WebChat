import React from "react";
import "./Chats.css";
import { Outlet, useLoaderData, useRevalidator } from "react-router-dom";
import { Sidebar } from "../../components";


const Chats = () => {

	const userGroups = useLoaderData();
	const revalidator = useRevalidator();

	const groups = userGroups.groups.map(({ name, group_id }) => {
		return { name, path: "/chats/" + group_id };
	});

	const sidebarLinks = [
        { 
            category: "Join / Create group", 
            items: [
                { name: "Join", path: "/chats/join" },
                { name: "Create", path: "/chats/create" },
            ]
        },
		{
			category: "Chats",
			items: groups
		}
    ];

    return (
	<div className="d-flex flex-column flex-md-row gap-3">
        <Sidebar links={sidebarLinks} />
        <div className="container-fluid g-0 bg-custom-secondary rounded">
            <Outlet context={revalidator} />
        </div>
    </div>
	);
};


export default Chats;