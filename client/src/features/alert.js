import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	visible: false,
	type: null,
	message: null,
}

export const alertSlice = createSlice({
	name: "alert",
	initialState: initialState,
	reducers: {
		show: (state, action) => {
			const { status, message } = action.payload;

			switch (status) {
				case "ok":
					state.visible = true;
					state.type = "success";
					state.message = message;
					break;
				case "error":
					state.visible = true;
					state.type = "danger";
					state.message = message;
					break;
			}
		},
		showInfo: (state, action) => {
			state.visible = true;
			state.type = "info";
			state.message = action.payload;
		},
		hide: (state) => {
			state.visible = false;
			state.color = null;
			state.message = null;
		}
	}
});

export const { show, showInfo, hide } = alertSlice.actions;

export default alertSlice.reducer;