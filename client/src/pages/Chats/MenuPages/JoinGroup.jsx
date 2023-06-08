import React, { useState, useRef } from "react";
import { Input, PrimaryButton, Tip } from "../../../components";
import { Group } from "./utils/Group";
import { joinGroup } from "./utils/post";
import { useDispatch } from "react-redux";
import { show } from "../../../features/alert";
import { useOutletContext } from "react-router-dom";

const JoinGroup = () => {

    const [group, setGroup] = useState(new Group());
	const groupCodeRef = useRef();
	const dispatch = useDispatch();

	const revalidator = useOutletContext();

    const handleOnJoinGroup = async() => {
        const res = await joinGroup(group);

        if (res.status === "ok") {
			groupCodeRef.current.value = "";
			setGroup(group.reset());

			// Updating groups list
			revalidator.revalidate();
		}

		dispatch(show(res));
    }

    return (
    <div className="container p-3 chats-menu-pages">
        <div className="row row-cols-1 g-0 gap-2 text-highlight">
			<span className="col">Join a new group</span>
			<hr className="col" />
		</div>
        <div className="row g-0 my-3">
            <Tip className="col">You can join a new chat group here and start chatting.</Tip>
		</div>
        <div className="row g-0 my-3">
            <Input 
				label="Group code"
				placeholder="Enter a group code, eg. u1lf4wshx9"
				onChange={(e) => setGroup(group.setCode(e.target.value))}
				className="col-md-8"
                reference={groupCodeRef}
			/>
        </div>
        <div className="row g-0 justify-content-end my-3">
			<PrimaryButton onClick={handleOnJoinGroup} className="col-md-3">Join</PrimaryButton>
		</div>
    </div>
    );
};

export default JoinGroup;
