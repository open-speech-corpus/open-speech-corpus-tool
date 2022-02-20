import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


// Initialize Firebase Variables Here
const app = firebase.initializeApp({
    apiKey: "#",
    authDomain: "#",
    projectId: "#",
    storageBucket: "#",
    messagingSenderId: "#",
    appId: "#"
})

export const auth = app.auth()
export const db = app.firestore()
export const storage = app.storage()
