import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, useOutletContext, useNavigate } from "react-router-dom";
import { useUser } from "../../../store/hooks";
import { useCookies } from "react-cookie";
import { BsFillSendFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { GoKebabHorizontal } from "react-icons/go";
import { socket } from "../../../socket";
import { Message } from "./utils/Message";
import { loadMessages, sendMessage } from "../../../api/messages";
import { exitGroup } from "../../../api/groups";
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
			<div className="col text-end dropdown">
				<button type="button" data-bs-toggle="dropdown" aria-expanded="false">
					<GoKebabHorizontal size={24} style={{ transform: "rotate(90deg)" }}/>
				</button>
				<div className="dropdown-menu bg-custom-primary">
					<button className="dropdown-item btn-hover-primary" data-bs-toggle="modal" data-bs-target="#groupInfoModal">
						Group info
					</button>
					<button className="dropdown-item btn-hover-primary text-danger" data-bs-toggle="modal" data-bs-target="#exitGroupModal">
						Exit group
					</button>
				</div>
			</div>
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

		<GroupInfo group={group} />
		<ExitGroup group={group} />
	</>
    );
};


const GroupInfo = ({ group }) => {

	const admin = group.admin.username;
	const name = group.name;
	const code = group.group_code;
	const members = group.members;
	const memberCount = group.members.length;

	return (
		<div className="modal" id="groupInfoModal" tabIndex={-1}>
			<div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
				<div className="modal-content bg-custom-primary">

					<div className="modal-header border-custom-secondary">
						<h5 className="modal-title">Group info</h5>
						<button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
					</div>

					<div className="modal-body">
						<div className="row text-center">
							<span className="col">{name} - {memberCount} {memberCount > 1 ? "members" : "member"}</span>
						</div>
						<div className="row text-center my-3">
							<span className="col">Group code <span className="text-highlight">{code}</span></span>
						</div>
						<table className="table table-borderless my-3">
							<tbody>
								{members.map(({ username }, index) => (
									<tr key={index} className="text-primary btn-hover-primary row g-0">
										<td className="col-10">{username}</td>
										<td className="col-2">{username === admin ? "Admin" : "Member"}</td>
									</tr>	
								))}
							</tbody>
						</table>
					</div>

					<div className="modal-footer border-custom-secondary">
						<button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
							Close
						</button>
					</div>

				</div>
			</div>
		</div>
	)
}


const ExitGroup = ({ group }) => {

	const revalidator = useOutletContext();
	const navigate = useNavigate();
	const groupId = group.group_id;
	const name = group.name;
	
	const handleExitGroup = async() => {
		const { status, message } = await exitGroup(groupId);

		if (status === "success") {
			// Updating groups list
			revalidator.revalidate();
			navigate("/chats");
		}

		toast(message, { type: status });
	}


	return (
		<div className="modal" id="exitGroupModal" tabIndex={-1}>
			<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
				<div className="modal-content bg-custom-primary">

					<div className="modal-header border-custom-secondary text-danger">
						<h5 className="modal-title">Exit group</h5>
						<button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
					</div>

					<div className="modal-body">
						<span>Are you sure you want to exit group <span className="text-highlight">{name}</span> ?</span>
					</div>

					<div className="modal-footer border-custom-secondary">
						<button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleExitGroup}>
							Exit
							</button>
						<button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
							Close
						</button>
					</div>

				</div>
			</div>
		</div>
	)
}


export default Chat;