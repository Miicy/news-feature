export const SERVER_URL =
	process.env.NODE_ENV === "production"
		? "https://brutal-server.onrender.com/"
		: "http://localhost:8001/";

export const DATA_STATE = {
	DATA_STATE_OK: "DATA_STATE_OK",
	DATA_STATE_LOADING: "DATA_STATE_LOADING",
};

export const NOTIFICATION_TYPES = {
	STANDARD: "STANDARD",
	SUCCESS: "SUCCESS",
	ERROR: "ERROR",
};
