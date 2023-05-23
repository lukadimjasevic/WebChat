import HOST from "../data/host";


export const postRegister = async(data) => {
	
	const result = await fetch(HOST + "/users/register", {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify(data)
	});

	return await result.json();
}