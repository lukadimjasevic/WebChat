import React from "react";
import { Group } from "../../../models";
import { useOutletContext, useNavigate } from "react-router-dom";


const JoinGroup = () => {

	const group = new Group();
	const revalidator = useOutletContext();
	const navigate = useNavigate();

    return (
    <div className="p-3">
        <div className="row row-cols-1 g-0 gap-3">
			<span className="col">Join a new group</span>
			<hr className="col" />
		</div>
        <div className="row g-0 my-3">
			<div className="col bd-callout bd-callout-info">
				<span>You can join a new chat group here and start chatting.</span>
			</div>
		</div>
        <div className="row g-0 my-3">
			<div className="col row g-0 input-group mb-3">
				<div className="col-9 col-sm-10 form-floating">
					<input 
						type="text" 
						id="group-join"
						className="form-control bg-custom-primary text-primary border-custom-primary" 
						placeholder="Enter a group code, eg. u1lf4wshx9" 
						onChange={(e) => group.setCode(e.target.value)}
						ref={group.codeRef}
					/>
					<label htmlFor="group-join">Group code</label>
				</div>
				<button type="button" className="col-3 col-sm-2 btn btn-primary" 
						onClick={() => group.join(revalidator, navigate)}
				>
					Join
				</button>
			</div>
		</div>
    </div>
    );
};


export default JoinGroup;
