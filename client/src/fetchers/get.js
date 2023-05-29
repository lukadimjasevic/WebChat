import HOST from "../data/host";


export const getUser = async() => {

	const result = await fetch(HOST + "/users", {
		headers: {
			"Content-Type": "application/json",
		},
		method: "GET",
		credentials: "include"
	});

	return await result.json();
}