import { useRef } from "react";
import { sendMessage } from "../../../../api/messages";
import { socket } from "../../../../socket";
import { toast } from "react-toastify";


export class Message {

	
	constructor(groupId=null, accessToken=null, message=null) {
		this.groupId = groupId;
		this.accessToken = accessToken;
		this.message = message;
		this.messageRef = useRef();

		this.send = this.send.bind(this);
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


	async send() {
		const { groupId, message, accessToken } = this;
		const res = await sendMessage(groupId, message);

		if (res.status === "success") {
			socket.emit("receive_message", { groupId, accessToken, message });
			this.messageRef.current.value = "";
			return;
		}

		toast.error(res.message);
	}
}