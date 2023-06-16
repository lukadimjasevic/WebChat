import { request } from "./default";


export const getGroup = async(groupId) => {
	const res = await request(`/groups/${groupId}`, "GET");
	return res;
}


export const getUserGroups = async() => {
	const res = await request(`/groups`, "GET");
	return res;
}


export const createGroup = async(data) => {
	const { name } = data;
	const res = await request("/groups", "POST", JSON.stringify({ name }))
	return res;
}


export const joinGroup = async(data) => {
	const { code } = data;
	const res = await request("/groups/join", "POST", JSON.stringify({ groupCode: code }));
	return res;
}