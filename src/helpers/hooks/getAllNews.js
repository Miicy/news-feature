import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect, useCallback } from "react";
import {
	setDataState,
	displayNotification,
} from "../../store/reducers/notificationSlice";
import { DATA_STATE, NOTIFICATION_TYPES, SERVER_URL } from "../app.constants";
import newsData from "../../helpers/newsData.json";
import { STORAGE } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { setAllNews } from "../../store/reducers/userSlice";

const useGetAllNews = () => {
	const dispatch = useDispatch();

	const updateImageUrls = useCallback(async (data) => {
		const updatedData = await Promise.all(
			data.map(async (item, index) => {
				if (item.image) {
					const downloadUrl = await getDownloadURLFromStorage(item.image);
					return { ...item, image: downloadUrl };
				}
				return item;
			}),
		);
		return updatedData;
	}, []);

	const getDownloadURLFromStorage = async (storageUrl) => {
		const storageRef = ref(STORAGE, storageUrl);
		const downloadUrl = await getDownloadURL(storageRef);
		return downloadUrl;
	};
	const fetchNews = async () => {
		try {
			dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));

			let response;
			if (SERVER_URL) {
				response = await axios.get(`${SERVER_URL}news/`, { crossdomain: true });
			} else {
				await new Promise((resolve) => setTimeout(resolve, 100));
				const updatedNewsData = await updateImageUrls(newsData);
				response = { data: updatedNewsData };
			}

			const updatedNewsArray = response.data;
			dispatch(setAllNews(updatedNewsArray));

			// Return the updated news array
			return updatedNewsArray;
		} catch (error) {
			const notificationPayload = {
				text: "Error!",
				type: NOTIFICATION_TYPES.ERROR,
			};
			dispatch(displayNotification(notificationPayload));
		} finally {
			dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
		}
	};

	useEffect(() => {
		fetchNews();
	}, [updateImageUrls, dispatch]);

	return { fetchNews }; 
};

export default useGetAllNews;
