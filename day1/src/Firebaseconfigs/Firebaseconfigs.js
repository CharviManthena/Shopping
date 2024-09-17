import { initializeApp } from "firebase/app";
import {getAuth} from  "firebase/auth";
import {getFirestore} from  "firebase/firestore";
import {getStorage} from   "firebase/storage";


const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "ecommerce-9bdbb.firebaseapp.com",
  projectId: "ecommerce-9bdbb",
  storageBucket: "ecommerce-9bdbb.appspot.com",
  messagingSenderId: "1023114788198",
  appId: "1:1023114788198:web:1505cc5d03dda8e978dca7"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export  const db = getFirestore(app);
export  const storage = getStorage(app);


