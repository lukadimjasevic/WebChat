import HOST from "../data/host";


export const getGroup = async(groupId) => {
	const res = await fetch(HOST + `/groups/${groupId}`, {
		headers: {
			"Content-type": "application/json",
		},
		method: "GET",
		credentials: "include"
	});

	return await res.json();
}


export const getUserGroups = async() => {
	const res = await fetch(HOST + "/groups", {
		headers: {
			"Content-type": "application/json",
		},
		method: "GET",
		credentials: "include"
	});

	return await res.json();
}