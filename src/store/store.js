import { combineReducers, configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationSlice";
import adminReducer from "./reducers/adminSlice";

const rootReducer = combineReducers({
	notification: notificationReducer,
	admin: adminReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
