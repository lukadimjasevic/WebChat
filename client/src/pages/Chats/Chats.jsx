import React from "react";
import "./Chats.css";
import { Outlet, useLoaderData, useRevalidator } from "react-router-dom";
import { Sidebar } from "../../components";
import { routes, chatsSidebarLinks } from "../../routes";


const Chats = () => {

	const userGroups = useLoaderData();
	const revalidator = useRevalidator();

	const groups = userGroups.groups.map(({ name, group_id }) => {
		return { path: `${routes.chat}/${group_id}`, name };
	});

    chatsSidebarLinks[1].items = groups;

    return (
	<div className="d-flex flex-column flex-md-row gap-3">
        <Sidebar links={chatsSidebarLinks} />
        <div className="container-fluid g-0 bg-custom-secondary rounded">
            <Outlet context={revalidator} />
        </div>
    </div>
	);
};


export default Chats;