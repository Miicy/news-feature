import axios from "axios";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
	setDataState,
	displayNotification,
} from "../../store/reducers/notificationSlice";
import { DATA_STATE, NOTIFICATION_TYPES, SERVER_URL } from "../app.constants";
import newsData from "../../helpers/newsData.json";
import { STORAGE } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const useGetAllNews = () => {
	const dispatch = useDispatch();
	const [allNews, setAllNews] = useState(null);

	useEffect(() => {
		dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
		const fetchNews = async () => {
			try {
				setTimeout(async () => {
					const updatedNewsData = await updateImageUrls(newsData);
					setAllNews(updatedNewsData);
					dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
				}, 500);

				/* Uncomment the below code for the actual API call to retrieve data from the server */

				// const response = await axios.get(`${SERVER_URL}/getallnews`);
				// const updatedNewsData = await updateImageUrls(response.data);
				// setAllNews(updatedNewsData);
				// dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
			} catch (error) {
				const notificationPayload = {
					text: 'Došlo je do greške!',
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			}
		};

		fetchNews();
	}, [dispatch]);

	const updateImageUrls = async (data) => {
		const updatedData = [];
		for (const item of data) {
			if (item.image) {
				const downloadUrl = await getDownloadURLFromStorage(item.image);
				updatedData.push({ ...item, image: downloadUrl });
			} else {
				updatedData.push(item);
			}
		}
		return updatedData;
	};

	const getDownloadURLFromStorage = async (storageUrl) => {
		const storageRef = ref(STORAGE, storageUrl);
		const downloadUrl = await getDownloadURL(storageRef);
		return downloadUrl;
	};

	return allNews;
};

export default useGetAllNews;