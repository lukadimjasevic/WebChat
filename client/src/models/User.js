import { registerUser, loginUser, logoutUser } from "../api/users";
import { toast } from "react-toastify";


export class User {


	constructor() {
		this.username = null;
		this.email = null;
		this.password = null;
		this.retypePassword = null;
	}


	setUsername(value) {
		this.username = value;
		return this;
	}


	setEmail(value) {
		this.email = value;
		return this;
	}


	setPassword(value) {
		this.password = value;
		return this;
	}


	setRetypePassword(value) {
		this.retypePassword = value;
		return this;
	}


	getUsername() {
		return this.username;
	}


	getEmail() {
		return this.email;
	}


	getPassword() {
		return this.password;
	}

	
	getRetypePassword() {
		return this.retypePassword;
	}


	comparePasswords() {
		return (this.getPassword() === this.getRetypePassword()) ? true : false;
	}


	async register() {
        if (!this.comparePasswords()) {
			toast.error("Passwords do not match, please retype");
			return;
		}
        
		const registerData = { 
			username	: this.getUsername(), 
			email		: this.getEmail(),
			password	: this.getPassword(),
		}
        const { status, message } = await registerUser(registerData);

        if (status === "success") {
            location.reload();
            return;
        }

        toast.error(message);
	}


	async login() {
		const loginData = { 
			email		: this.getEmail(), 
			password	: this.getPassword() 
		};
        const { status, message } = await loginUser(loginData);

        if (status === "success") {
            location.reload();
            return;
        }

        toast.error(message);
	}


	async logout() {
		const { status } = await logoutUser();
		
		if (status === "success") {
			location.reload();
		}
	}
}