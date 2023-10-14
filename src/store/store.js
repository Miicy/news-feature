import { combineReducers, configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationSlice";

const rootReducer = combineReducers({
	notification: notificationReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
