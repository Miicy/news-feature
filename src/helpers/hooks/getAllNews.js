import axios from "axios";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
	setDataState,
	displayNotification,
} from "../../store/reducers/notificationSlice";
import { DATA_STATE, NOTIFICATION_TYPES, SERVER_URL } from "../app.constants";

import newsData from "../../helpers/newsData.json";

const useGetAllNews = () => {
	const dispatch = useDispatch();
	const [allNews, setAllNews] = useState(null);

	useEffect(() => {
		dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
		const fetchNews = async () => {
			try {
				setTimeout(() => {
					setAllNews(newsData);
                    dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
				}, 500);
				
			} catch (error) {
				const notificationPayload = {
					text: "Došlo je do greške!",
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			}
		};

		// const fetchNews = async () => {
		// 	try {
		// 		const response = await axios.get(`${SERVER_URL}/getallnews`);
		// 		setAllNews(response.data);
		// 	} catch (error) {
		// 		const notificationPayload = {
		// 			text: "Došlo je do greške!",
		// 			type: NOTIFICATION_TYPES.ERROR,
		// 		};
		// 		dispatch(displayNotification(notificationPayload));
		// 	} finally {
		// 		dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
		// 	}
		// };

		fetchNews();
	}, [dispatch]);

	return allNews;
    
};

export default useGetAllNews;
