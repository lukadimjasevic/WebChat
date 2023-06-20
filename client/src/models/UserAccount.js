import { User } from "./User";
import { useRef } from "react";
import { updateAccount } from "../api/users";
import { updateUsername } from "../features/user";
import { toast } from "react-toastify";


export class UserAccount extends User {

	
	constructor(username=null) {
		super(username);
		this.usernameRef = useRef();
	}


	setUsernameRef(value) {
		this.usernameRef.current.value = value;
		return this;
	}


	getUsernameRef() {
		return this.usernameRef;
	}


	async update(dispatch) {
		const updateData = { username: this.getUsername() };
		const { status, message, data } = await updateAccount(updateData);

		if (status === "success") {
			dispatch(updateUsername(data));
		}

		toast(message, { type: status });
	}
}