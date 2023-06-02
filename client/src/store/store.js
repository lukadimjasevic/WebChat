import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user";
import alertReducer from "../features/alert";

export const store = configureStore({
	reducer: {
		user: userReducer,
		alert: alertReducer,
	}
});