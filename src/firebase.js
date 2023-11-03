import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyD0aRNzfnf6J-C45iAywBG7uATL2QMxXnU",
	authDomain: "news-9eb28.firebaseapp.com",
	projectId: "news-9eb28",
	storageBucket: "news-9eb28.appspot.com",
	messagingSenderId: "148868817453",
	appId: "1:148868817453:web:c85e9dc46552f4c5b98ea4"
  };

const app = initializeApp(firebaseConfig);
export const STORAGE = getStorage(app);
