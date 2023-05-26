import HOST from "../data/host";


export const registerUser = async(data) => {
	
	const result = await fetch(HOST + "/users/register", {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		credentials: "include",
		body: JSON.stringify(data)
	});

	return await result.json();
}


export const loginUser = async(data) => {

	const result = await fetch(HOST + "/users/login", {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		credentials: "include",
		body: JSON.stringify(data)
	});

	return await result.json();
}