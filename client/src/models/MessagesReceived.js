import { loadMessages } from "../api/messages";
import { socket } from "../socket";


export class MessagesReceived {

	
	constructor(groupId=null, setMessagesReceived=null, messages=[]) {
		this.groupId = groupId;
		this.messages = messages;
		this.setMessagesReceived = setMessagesReceived;
	}


	setGroup(value) {
		this.groupId = value;
		return this; 
	}

	setMessages(value) {
		this.messages = value;
		return this;
	}


	getGroup() {
		return this.groupId;
	}

	
	getMessages() {
		return this.messages;
	}


	formatMessageTime = (messageTime) => {
		const date = new Date(messageTime);
		const hours = date.getHours();
		const minutes = date.getMinutes();
		return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
	}


	async load() {
		const res = await loadMessages(this.getGroup());

		if (res.status === "success") {
			// Emit join room event
			socket.emit("join_room", { groupId: this.getGroup() });
			this.setMessagesReceived(res.data);
		}
	}
}