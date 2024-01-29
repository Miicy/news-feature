import { combineReducers, configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationSlice";
import adminReducer from "./reducers/adminSlice";
import userReducer from "./reducers/userSlice";
import layoutReducer from "./reducers/layoutSlice";

const rootReducer = combineReducers({
	notification: notificationReducer,
	admin: adminReducer,
	user: userReducer,
	layout: layoutReducer,
});

const store = configureStore({
	reducer: rootReducer,
});


export default store;
