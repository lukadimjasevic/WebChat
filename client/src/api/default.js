import HOST from "./host"

export const request = async(route, method, body=null) => {
	const res = await fetch(HOST + route, {
		headers: {
			"Content-Type": "application/json"
		},
		method,
		credentials: "include",
		body
	});

	return res.json();
}