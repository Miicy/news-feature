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
		  })
		);
		return updatedData;
	  }, []);
	
	  const getDownloadURLFromStorage = async (storageUrl) => {
		const storageRef = ref(STORAGE, storageUrl);
		const downloadUrl = await getDownloadURL(storageRef);
		return downloadUrl;
	  };
	// console.log("useGetAllNews executed");
	useEffect(() => {
		// console.log("useEffect executed");
		dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
		const fetchNews = async () => {
		  try {
	
			if (!SERVER_URL) {
			  const response = await axios.get(`${SERVER_URL}news/`, { crossdomain: true });
			  dispatch(setAllNews(response.data));
			  console.log("news");
			} else {
			  await new Promise(resolve => setTimeout(resolve, 100)); 
			  const updatedNewsData = await updateImageUrls(newsData);
			  dispatch(setAllNews(updatedNewsData));
			  console.log(updatedNewsData);
			}
		  } catch (error) {
			const notificationPayload = {
			  text: "Error!",
			  type: NOTIFICATION_TYPES.ERROR,
			};
			console.log(error);
			dispatch(displayNotification(notificationPayload));
		  } finally {
			dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
		  }
		};
	  
		fetchNews();
	  }, [updateImageUrls, dispatch]);
};

export default useGetAllNews;
