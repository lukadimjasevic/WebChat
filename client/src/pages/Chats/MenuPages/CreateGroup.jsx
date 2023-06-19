import React, { useState, useRef } from "react";
import { useUser } from "../../../store/hooks";
import { Group } from "./utils/Group";
import { createGroup } from "../../../api/groups";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";


const CreateGroup = () => {

	const user = useUser();
	const [group, setGroup] = useState(new Group());
	const groupNameRef = useRef();

	const revalidator = useOutletContext();

	const handleCreateGroup = async() => {
		const { status, message } = await createGroup(group);

		if (status === "success") {
			groupNameRef.current.value = "";
			setGroup(group.reset());

			// Updating groups list
			revalidator.revalidate();
		}

		toast(message, { type: status });
	}

    return (
	<div className="p-3">
		<div className="row row-cols-1 g-0 gap-3">
			<span className="col">Create a new group</span>
			<hr className="col" />
		</div>
		<div className="row g-0 my-3">
			<div className="col bd-callout bd-callout-info">
				<span>You can here create a new chat group.</span>
			</div>
		</div>
		<div className="p-3 bg-custom-primary rounded">
			<table className="table table-sm table-borderless caption-top text-primary">
				<caption>Group details</caption>
				<thead>
					<tr className="text-highlight">
						<th scope="col">Admin</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{user.email} (You)</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div className="row g-0 my-3">
			<div className="col row g-0 input-group mb-3">
				<div className="col-9 col-sm-10 form-floating">
					<input 
						type="text" 
						id="group-create"
						className="form-control bg-custom-primary text-primary border-custom-primary" 
						placeholder="Enter a group name..." 
						onChange={(e) => setGroup(group.setName(e.target.value))}
						ref={groupNameRef}
					/>
					<label htmlFor="group-create">Group name</label>
				</div>
				<button type="button" className="col-3 col-sm-2 btn btn-primary" onClick={handleCreateGroup}>
					Create
				</button>
			</div>
		</div>
	</div>
	);
};

export default CreateGroup;
