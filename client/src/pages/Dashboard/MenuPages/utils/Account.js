export class AccountData {
	constructor(username=null) {
		this.username = username;
	}

	setUsername(value) {
		this.username = value;
		return this;
	}
}