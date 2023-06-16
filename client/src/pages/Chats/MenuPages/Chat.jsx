import React, { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useUser } from "../../../store/hooks";
import { useCookies } from "react-cookie";
import { BsFillSendFill } from "react-icons/bs";
import { socket } from "../../../socket";
import { Message } from "./utils/Message";
import { loadMessages, sendMessage } from "../../../api/messages";

const Chat = () => {

	const user = useUser();
	const [{ access_token }] = useCookies(["access_token"]);
    const loaderData = useLoaderData();

	if (!loaderData.group) {
		return <div>Not found</div>
	}

	const { group } = loaderData;

	const messageRef = useRef();
	const [message, setMessage] = useState(new Message(user.username, group.group_id, access_token));
	const [messagesReceived, setMessagesReceived] = useState([]);
	
	useEffect(() => {
		const loadStoredMessages = async() => {
			const res = await loadMessages(group.group_id);

			if (res.status === "ok") {
				// Emit join room event
				socket.emit("join_room", { groupId: group.group_id });
				setMessagesReceived(res.data);
			}
		}

		loadStoredMessages();
	}, []);

	// Runs whenever a socket event is recieved from the server
	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessagesReceived((state) => [
				...state, data
			]);
		});
		
		// Remove event listener on component unmount
		return () => socket.off("receive_message");
	}, [socket]);

	const handleSendMessage = async() => {
		const res = await sendMessage(message);

		if (res.status === "ok") {
			socket.emit("receive_message", message);
			messageRef.current.value = "";
		}
	}

	const formatMessageTime = (messageTime) => {
		const date = new Date(messageTime);
		const hours = date.getHours();
		const minutes = date.getMinutes();
		return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
	}

    return (
	<>
		<div className="row g-0 align-items-center px-3 rounded-top chat-header">
			<span className="col">{group.name}</span>
		</div>
		<div className="d-flex flex-column gap-3 p-3 chat">
			{messagesReceived.map(({ message, username, createdAt }, index) => (
				<div key={index} className={`row g-0 w-100 ${username === user.username ? "msg-me" : "msg-they"}`}>
					<div className="row row-cols-1 g-0 p-3 align-items-center message">
						<div className={`col row g-0 fs-14`}>
							<span className="col msg-username">{username}</span>
							<span className="col msg-time">{formatMessageTime(createdAt)}</span>		
						</div>
						<p className="col m-0 fs-16 msg">{message}</p>
					</div>
				</div>
			))}
		</div>
		<div className="row g-0 input-group px-3 my-3 chat-footer">
			<input 
				type="text" 
				className="col-9 col-sm-10 form-control bg-custom-primary text-primary border-custom-primary" 
				placeholder="Message"
				onChange={(e) => setMessage(message.setMessage(e.target.value))}
				ref={messageRef}
			/>
			<button type="button" className="col-3 col-sm-2 btn btn-primary" onClick={handleSendMessage}>
				<BsFillSendFill size={20} />
			</button>
		</div>
	</>
    );
};

const chatHeadingStyle = {
	height: "4rem",
	backgroundColor: "var(--highlight-primary)",
}

const chatWhitespaceStyle = {
	height: "calc(100vh - 12rem)",
	maxHeight: "calc(100vh - 12rem)",
	overflowY: "auto",
}

const chatEnterMessageStyle = {
	height: "4rem",
	backgroundColor: "var(--highlight-primary)",
}

export default Chat;
