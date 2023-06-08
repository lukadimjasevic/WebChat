import React from "react";
import "./Chats.css";
import { Outlet, useNavigate, useLoaderData, useRevalidator } from "react-router-dom";
import { PrimaryButton } from "../../components";

const Chats = () => {

	const navigate = useNavigate();
	const userGroups = useLoaderData();
	const revalidator = useRevalidator();

    return (
	<div className="row g-0 chats">
		<div className="col-md-3 px-3 pt-3 chats-menu fs-14">
			<div className="row row-cols-1 g-0 gap-2 text-uppercase text-highlight">
				<span className="col">Join / Create group</span>
				<hr className="col" />
			</div>
			<div className="row g-0 gap-2 mt-2 mb-3">
				<PrimaryButton className="col" onClick={() => navigate("/chats/join")}>Join</PrimaryButton>
				<PrimaryButton className="col" onClick={() => navigate("/chats/create")}>Create</PrimaryButton>
			</div>
			<div className="row row-cols-1 g-0 gap-2 my-2 text-uppercase text-highlight">
				<span className="col">Chats</span>
				<hr className="col" />
			</div>
			<div className="row row-cols-1 g-0 gap-2 overflow-scroll chats-list">
				{userGroups.groups.map(({ group_id, name }, index) => (
					<button 
						key={index} 
						type="button" 
						className="col p-3 chat-item d-flex align-items-center"
						onClick={() => navigate(`/chats/${group_id}`)}
					>
						{name}
					</button>
				))}
			</div>
		</div>

		<div className="col-md-9">
			<Outlet context={revalidator}/>
		</div>
	</div>
	);
};

export default Chats;
