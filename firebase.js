// Import
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";



// Firebase
function writeUserData(inputUserId, inputUsername, inputEmail, inputPassword, inputDateOfBirth, inputPostalAddress, inputImageUrl) {
    const firebaseConfig = {
        databaseURL: "https://console.firebase.google.com/u/0/project/fit2101-a1-lean-3469e/database/fit2101-a1-lean-3469e-default-rtdb/data/~2F",
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Realtime Database and get a reference to the service
    const db = getDatabase(app);

    set(ref(db, 'user/' + userId), {
        username: inputUsername,
        email: inputEmail,
        password: inputPassword,
        dateOfBirth: inputDateOfBirth,
        postalAddress: inputPostalAddress,
        imageUrl: inputImageUrl

    })

}