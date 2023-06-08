import HOST from "../data/host";


export const sendMessage = async(data) => {
	const { groupId, message } = data;
	const bodyData = { message };

	const res = await fetch(HOST + `/messages/${groupId}`, {
		headers: {
			"Content-type": "application/json",
		},
		method: "POST",
		credentials: "include",
		body: JSON.stringify(bodyData),
	});

	return await res.json();
}

export const loadMessages = async(groupId) => {
	const res = await fetch(HOST + `/messages/${groupId}`, {
		headers: {
			"Content-type": "application/json",
		},
		method: "GET",
		credentials: "include"
	});

	return await res.json();
}