export class Message {
	constructor(username=null, groupId=null, accessToken=null, message=null) {
		this.username = username;
		this.groupId = groupId;
		this.accessToken = accessToken;
		this.message = message;
	}

	setUsername(value) {
		this.username = value;
		return this;
	}

	setGroup(value) {
		this.groupId = value;
		return this;
	}

	setAccessToken(value) {
		this.accessToken = value;
		return this;
	}

	setMessage(value) {
		this.message = value;
		return this;
	}
}