import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkCS-8iRq7A1dK2K226BYqtjqdWg-Ww1M",
  authDomain: "news-updated-59ba9.firebaseapp.com",
  projectId: "news-updated-59ba9",
  storageBucket: "news-updated-59ba9.appspot.com",
  messagingSenderId: "121992311618",
  appId: "1:121992311618:web:6be3ab21e90001a05f0edb"
};

const app = initializeApp(firebaseConfig);
export const STORAGE = getStorage(app);