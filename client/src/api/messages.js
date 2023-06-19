import { request } from "./default";


export const sendMessage = async(data) => {
	const { groupId, message } = data;
	const res = await request(`/messages/${groupId}`, "POST", JSON.stringify({ message }));
	return res;
}


export const loadMessages = async(groupId) => {
	const res = await request(`/messages/${groupId}`, "GET");
	return res;
}