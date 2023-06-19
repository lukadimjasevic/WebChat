import React, { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useUser } from "../../../store/hooks";
import { useCookies } from "react-cookie";
import { BsFillSendFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { socket } from "../../../socket";
import { Message } from "./utils/Message";
import { loadMessages, sendMessage } from "../../../api/messages";
import { toast } from "react-toastify";


const Chat = () => {

    const { group } = useLoaderData();

	if (!group) {
		return <div>Not found</div>
	}

	
	const user = useUser();
	const [{ access_token }] = useCookies(["access_token"]);
	const messageRef = useRef();
	const messagesEndRef = useRef();
	const [message, setMessage] = useState(new Message(group.group_id, access_token));
	const [messagesReceived, setMessagesReceived] = useState([]);


	// Scrolls to the bottom of the chat
	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behaviour: "smooth" });
	}

	useEffect(scrollToBottom, [messagesReceived]);


	useEffect(() => {
		const loadStoredMessages = async() => {
			const res = await loadMessages(group.group_id);

			if (res.status === "success") {
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

		if (res.status === "success") {
			socket.emit("receive_message", message);
			messageRef.current.value = "";
			return;
		}

		toast.error(res.message);
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

		<div className="d-flex flex-column gap-3 p-3 chat-body">
			{messagesReceived.map(({ message, username, picture, createdAt }, index) => (
				<div key={index} className={`${username === user.username ? "msg-me" : "msg-they"}`}>
					{picture 
						? <img src={`data:image/png;base64,${picture}`} className="msg-profile-picture" />
						: <AiOutlineUser className="msg-profile-picture"/>
					}
					<div className="row row-cols-1 g-0 p-3 align-items-center rounded msg">
						<div className="col row g-0">
							<span className="col msg-username">{username}</span>
							<span className="col msg-time">{formatMessageTime(createdAt)}</span>		
						</div>
						<p className="col m-0">{message}</p>
					</div>
				</div>
			))}
			<div ref={messagesEndRef} />
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

export default Chat;