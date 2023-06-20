import { request } from "./default";


export const sendMessage = async(groupId, message) => {
	const res = await request(`/messages/${groupId}`, "POST", JSON.stringify({ message }));
	return res;
}


export const loadMessages = async(groupId) => {
	const res = await request(`/messages/${groupId}`, "GET");
	return res;
}