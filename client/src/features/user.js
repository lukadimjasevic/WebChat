import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	username: null,
	email: null,
}

export const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		addUser: (state, action) => {
			const { username, email } = action.payload;
			state.username = username;
			state.email = email;
		},
		updateUsername: (state, action) => {
			const { username } = action.payload;
			state.username = username;
		}
	}
});

export const { addUser, updateUsername } = userSlice.actions;

export default userSlice.reducer;