import { request } from "./default";
import HOST from "./host";


export const registerUser = async(data) => {
	const res = await request("/users/register", "POST", JSON.stringify(data));
	return res;
}


export const loginUser = async(data) => {
	const res = await request("/users/login", "POST", JSON.stringify(data));
	return res;
}

export const logoutUser = async() => {
	const res = await request("/users/logout", "POST");
	return res;
}


export const getUser = async() => {
	const res = await request("/users", "GET");
	return res;
}


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

	return res.json();
}


export const updateAccount = async(data) => {
	const res = await request("/users/account", "PUT", JSON.stringify(data));
	return res;
}