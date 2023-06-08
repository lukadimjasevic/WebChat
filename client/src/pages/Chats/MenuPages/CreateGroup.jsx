import React, { useState, useRef } from "react";
import { Input, PrimaryButton, Tip } from "../../../components";
import { useUser } from "../../../store/hooks";
import { Group } from "./utils/Group";
import { createGroup } from "./utils/post";
import { useDispatch } from "react-redux";
import { show } from "../../../features/alert";
import { useOutletContext } from "react-router-dom";

const CreateGroup = () => {

	const user = useUser();
	const [group, setGroup] = useState(new Group());
	const groupNameRef = useRef();
	const dispatch = useDispatch();

	const revalidator = useOutletContext();

	const handleOnCreateGroup = async() => {
		const res = await createGroup(group);

		if (res.status === "ok") {
			groupNameRef.current.value = "";
			setGroup(group.reset());

			// Updating groups list
			revalidator.revalidate();
		}

		dispatch(show(res));
	}

    return (
	<div className="container p-3 chats-menu-pages">
		<div className="row row-cols-1 g-0 gap-2 text-highlight">
			<span className="col">Create a new group</span>
			<hr className="col" />
		</div>
		<div className="row g-0 my-3">
			<Tip className="col">You can here create a new chat group.</Tip>
		</div>
		<div className="row g-0 my-3">
			<Input 
				label="Group name"
				placeholder="Enter a group name..."
				onChange={(e) => setGroup(group.setName(e.target.value))}
				className="col-md-8"
				reference={groupNameRef}
			/>
		</div>
		<div className="row row-cols-1 g-0 gap-2 text-highlight">
			<span className="col">Group details</span>
			<hr className="col" />
		</div>
		<div className="row row-cols-2 g-0 fs-14">
			<span className="col"><b>Admin</b></span>
			<span className="col">{user.email} (You)</span>
			<span className="col"></span>
			<span className="col text-secondary">{user.username}</span>
		</div>
		<div className="row g-0 justify-content-end my-3">
			<PrimaryButton onClick={handleOnCreateGroup} className="col-md-3">Create</PrimaryButton>
		</div>
	</div>
	);
};

export default CreateGroup;
