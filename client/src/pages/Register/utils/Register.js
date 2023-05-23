export class RegisterData {

	constructor(username="", email="", password="", retypePassword="") {
		this.username = username;
		this.email = email;
		this.password = password;
		this.retypePassword = retypePassword;
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

	comparePasswords() {
		return (this.password === this.retypePassword) ? true : false;
	}
}