import React, { useState, useRef, useEffect } from "react";
import "./MenuPages.css";
import { AccountData } from "./utils/Account";
import { updateAccount } from "../../../api/users";
import { useDispatch } from "react-redux";
import { useUser } from "../../../store/hooks";
import { updateUsername } from "../../../features/user";
import { show } from "../../../features/alert";

const Account = () => {

	const dispatch = useDispatch();
	const { username } = useUser();
	const usernameRef = useRef();
	const [account, setAccount] = useState(new AccountData());

	useEffect(() => {
		usernameRef.current.value = username;
	}, []);

	const handleOnUpdateAccount = async() => {
		const res = await updateAccount(account);

		if (res.status === "ok") {
			dispatch(updateUsername(res.data));
		}

		dispatch(show(res));
	}

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
					onChange={(e) => setAccount(account.setUsername(e.target.value))}
					ref={usernameRef}
				/>
				<label htmlFor="username">Username</label>
			</div>
		</div>
		<div className="row g-0 mt-3">
			<button type="button" className="col-md-3 btn btn-primary btn-lg" onClick={handleOnUpdateAccount}>
				Update
			</button>
		</div>
	</>
	);
};

export default Account;