import HOST from "../../../../data/host";


export const createGroup = async(data) => {
	const { name } = data;

	const res = await fetch(HOST + "/groups", {
		headers: {
			"Content-type": "application/json",
		},
		method: "POST",
		credentials: "include",
		body: JSON.stringify({ name }),
	});

	return await res.json();
}


export const joinGroup = async(data) => {
	const { code } = data;

	const res = await fetch(HOST + "/groups/join", {
		headers: {
			"Content-type": "application/json",
		},
		method: "POST",
		credentials: "include",
		body: JSON.stringify({ groupCode: code }),
	});

	return await res.json();
}