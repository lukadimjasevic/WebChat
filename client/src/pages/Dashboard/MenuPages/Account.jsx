import React, { useState, useRef } from "react";
import "./MenuPages.css";
import { Input, PrimaryButton } from "../../../components";
import { AccountData } from "./utils/Account";
import { updateAccount } from "./utils/put";
import { useDispatch } from "react-redux";
import { updateUsername } from "../../../features/user";
import { show } from "../../../features/alert";

const Account = () => {

	const dispatch = useDispatch();
	const usernameRef = useRef();
	const [account, setAccount] = useState(new AccountData());

	const handleOnUpdateAccount = async() => {
		const res = await updateAccount(account);

		if (res.status === "ok") {
			dispatch(updateUsername(res.data));
			usernameRef.current.value = "";
		}

		dispatch(show(res));
	}

    return (
	<>
		<span>Account</span>
		<hr />
		<div className="row align-items-end g-0">
			<Input 
				placeholder="New username"
				label="Change username"
				onChange={(e) => setAccount(account.setUsername(e.target.value))}
				className="col-md-7"
				reference={usernameRef}
			/>
			<div className="col-md-2"></div>
			<PrimaryButton 
				onClick={handleOnUpdateAccount}
				className="col-md-3">
			Change username
			</PrimaryButton>
		</div>
	</>
	);
};

export default Account;