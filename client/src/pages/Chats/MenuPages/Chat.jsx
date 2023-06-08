import React, { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useUser } from "../../../store/hooks";
import { useCookies } from "react-cookie";
import { PrimaryButton } from "../../../components";
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

	const handleOnSendMessage = async() => {
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
	<div>
		<div className="row g-0 align-items-center fs-18 px-2" style={chatHeadingStyle}>
			<span className="col">{group.name}</span>
		</div>
		<div className="d-flex flex-column gap-3 p-3" style={chatWhitespaceStyle}>
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
		<div className="row g-0 justify-content-center gap-3" style={chatEnterMessageStyle}>
			<input 
				type="text" 
				className="col-md-4 custom-input-input" 
				onChange={(e) => setMessage(message.setMessage(e.target.value))}
				ref={messageRef}
			/>
			<PrimaryButton onClick={handleOnSendMessage} className="col-md-2 h-100">
				Send
			</PrimaryButton>
		</div>
	</div>
    );
};

const chatHeadingStyle = {
	height: "4rem",
	backgroundColor: "var(--highlight-primary)",
}

const chatWhitespaceStyle = {
	minHeight: "20rem",
	height: "calc(100vh - 12rem)",
	maxHeight: "48rem",
	backgroundColor: "var(--background-primary)",
	overflowY: "auto",
}

const chatEnterMessageStyle = {
	height: "4rem",
	backgroundColor: "var(--highlight-primary)",
}

export default Chat;
