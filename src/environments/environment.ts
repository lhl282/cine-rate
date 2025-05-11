// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const environment = {
    production: false,
    tmdbApiKey: "a9825b6c57baf1c7ea5814ced440a96a",
    firebaseConfig:{
        apiKey: "AIzaSyAtVJ0Iu5mklxYP9rQFmszEIZgZN7Q94VU",
        authDomain: "cine-rate.firebaseapp.com",
        projectId: "cine-rate",
        storageBucket: "cine-rate.firebasestorage.app",
        messagingSenderId: "130468715991",
        appId: "1:130468715991:web:fe4b9d05711f1498fd3f92"
      },
}


// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);