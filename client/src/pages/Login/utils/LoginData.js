export class LoginData {

	constructor(email="", password="") {
		this.email = email;
		this.password = password;
	}

	setEmail(value) {
		this.email = value;
		return this;
	}

	setPassword(value) {
		this.password = value;
		return this;
	}
}