import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsy555egO2xxgc89aYLoUo9VOts6KWkDk",
  authDomain: "team-management-dashboard.firebaseapp.com",
  projectId: "team-management-dashboard",
  storageBucket: "team-management-dashboard.appspot.com",
  messagingSenderId: "317671108309",
  appId: "1:317671108309:web:ed260c38ae78e3912bfc5c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
