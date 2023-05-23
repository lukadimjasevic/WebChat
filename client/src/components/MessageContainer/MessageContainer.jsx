import React, { useState, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import "./MessageContainer.css";
import { socket } from "../../socket";

const MessageContainer = () => {

	const messageRef = useRef();
	const [message, setMessage] = useState(null);
	const [messages, setMessages] = useState([]);

	const clientId = parseInt(localStorage.getItem("userId")) || 1;
	const client = localStorage.getItem("user") || "Luka";
	const color = localStorage.getItem("color") || "blue";

	useEffect(() => {
		socket.on("receive_message", (data) => {
			setMessages(data);
		});
	}, []);

	const sendMessage = () => {
		socket.emit("send_message", { userId: clientId, user: client, color, message });
		messageRef.current.value = "";
	}

    return (
        <div className="message-container">
            
			<div className="messages-receive">
				{messages.map(({ userId, user, color, message}, index) => (
					<div key={index} className={ userId === clientId ? "message-card me" : "message-card"}>
						<div className="message-left">
							<CgProfile size={35} color={color} />
						</div>
						<div className="message-right">
							<span className="profile-name">{userId === clientId ? "Me" : user}</span>
							<span className="message">{message}</span>
						</div>
					</div>
				))}
			</div>
            <div className="messages-send">
				<input 
					type="text" 
					placeholder="Enter a message" 
					onChange={(e) => setMessage(e.target.value)}
					ref={messageRef} 
				/>
				<button type="button" onClick={sendMessage}>Send</button>
			</div>

        </div>
    );
};

export default MessageContainer;
