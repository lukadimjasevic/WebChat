export class Message {
	constructor(groupId=null, accessToken=null, message=null) {
		this.groupId = groupId;
		this.accessToken = accessToken;
		this.message = message;
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