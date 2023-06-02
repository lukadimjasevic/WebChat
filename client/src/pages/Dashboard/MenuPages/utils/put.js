import HOST from "../../../../data/host";


export const updateProfile = async(data) => {
	const { name, bio, picture } = data;
	
	const formData = new FormData();
	formData.append("name", name);
	formData.append("bio", bio);

	// If the picture has changed
	if (picture.name) formData.append("picture", picture);

	const res = await fetch(HOST + "/users/profile", {
		method: "PUT",
		credentials: "include",
		body: formData,
	});

	return await res.json();
}

export const updateAccount = async(data) => {
	const res = await fetch(HOST + "/users/account", {
		headers: {
			"Content-type": "application/json",
		},
		method: "PUT",
		credentials: "include",
		body: JSON.stringify(data),
	});

	return await res.json();
}