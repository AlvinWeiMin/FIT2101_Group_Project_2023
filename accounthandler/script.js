// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1JWDoe41ljxU6Wx2K3xDlzkTmQ_pHWyc",
  authDomain: "fit2101-a1-lean-3469e.firebaseapp.com",
  databaseURL: "https://fit2101-a1-lean-3469e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fit2101-a1-lean-3469e",
  storageBucket: "fit2101-a1-lean-3469e.appspot.com",
  messagingSenderId: "624522420359",
  appId: "1:624522420359:web:5912dbfcb057d58a6c1822"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Function to register a user
document.register = function() {
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Create an object to represent the user
    var user = {
        email: email,
        username: username,
        password: password
    };

    document.getElementById("password").style.borderColor = "#AAAAAA";
    document.getElementById("failedpassword").innerHTML = "";
    document.getElementById("email").style.borderColor = "#AAAAAA";
    document.getElementById("failedemail").innerHTML = "";

    // Register the user using Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Store additional user data in the Realtime Database
            const accountsRef = ref(db, 'accounts/' + user.uid);
            set(accountsRef, { username: username });
            document.getElementById("registernotif").innerHTML = "Account registered!";
            document.getElementById("loginlink").innerHTML = "Return to login page?";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            console.log(errorCode)
            console.log(errorMessage)
            if (errorCode === 'auth/weak-password') {
                document.getElementById("password").style.borderColor = "#FF0000";
                document.getElementById("failedpassword").innerHTML = "Password needs to be 6 characters or longer.";
                document.getElementById("password").value = "";
            } else if (errorCode === 'auth/email-already-in-use') {
                document.getElementById("email").style.borderColor = "#FF0000";
                document.getElementById("failedemail").innerHTML = "Email is currently already in use.";
            } else if (errorCode === 'auth/invalid-email') {
                document.getElementById("email").style.borderColor = "#FF0000";
                document.getElementById("failedemail").innerHTML = "Provided email is not valid";
            }
        });
}

// Function to perform login
document.login = function() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    document.getElementById("email").style.borderColor = "#AAAAAA";
    document.getElementById("password").style.borderColor = "#AAAAAA";
    document.getElementById("failedlogin").innerHTML = "";

    // Sign in the user using Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            document.getElementById("successfullogin").innerHTML = "Login successful! Redirecting...";
            setTimeout(function() {
                window.location.href = "../2101website.html";
            }, 1000);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            document.getElementById("email").style.borderColor = "#FF0000";
            document.getElementById("password").style.borderColor = "#FF0000";
            document.getElementById("failedlogin").innerHTML = "Provided username or password is invalid.";
            document.getElementById("password").value = "";
            console.error(errorCode, errorMessage);
        });
}