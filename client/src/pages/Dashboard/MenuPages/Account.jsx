import React, { useEffect } from "react";
import { UserAccount } from "../../../models";
import { useDispatch } from "react-redux";
import { useUser } from "../../../store/hooks";


const Account = () => {

	const dispatch = useDispatch();
	const { username } = useUser();
	const account = new UserAccount(username);


	// Sets loaded username
	useEffect(() => {
		account.setUsernameRef(username);
	}, []);


    return (
	<>
		<div className="row g-0 row-cols-1 gap-3">
			<span className="col">Account</span>
			<hr className="col" />
		</div>
		<div className="row g-0">
			<div className="bd-callout bd-callout-info">
				<span>You can change your Account settings, such as username, password, etc...</span>
			</div>
		</div>
		<div className="row g-0">
			<div className="col-md-6 form-floating my-3">
				<input 
					type="text"
					id="username"
					placeholder="New username"
					className="form-control bg-custom-primary text-primary border-custom-primary"
					onChange={(e) => account.setUsername(e.target.value)}
					ref={account.getUsernameRef()}
				/>
				<label htmlFor="username">Username</label>
			</div>
		</div>
		<div className="row g-0 mt-3">
			<button type="button" className="col-md-3 btn btn-primary btn-lg" 
					onClick={() => account.update(dispatch)}
			>
				Update
			</button>
		</div>
	</>
	);
};


export default Account;