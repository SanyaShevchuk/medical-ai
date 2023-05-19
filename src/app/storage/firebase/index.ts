import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

export const storageUrl = "gs://medical-ai-79bcb.appspot.com";

// move to config
const firebaseConfig = {
  apiKey: process.env.firebaseApiKey,
  authDomain: process.env.firebaseAuthDomain,
  projectId: process.env.firebaseProjectId,
  storageBucket: "medical-ai-79bcb.appspot.com",
  messagingSenderId: process.env.firebaseMessagingSenderId,
  appId: process.env.firebaseAppId,
  measurementId: process.env.firebaseMeasurementId,
};

export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const storage = getStorage(app);
