// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, get, child, push , onValue, query, orderByKey, remove} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
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
const dbRef =  ref(db);

// Global Variable
window.user = NaN;


// Function to perform validation with access token for editorial purpose
document.accessToken = function() {
    var accessToken = document.getElementById("accessToken").value;

    document.getElementById("accessToken").style.borderColor = "#AAAAAA";
    // document.getElementById("failedAccessToken").innerHTML = "";

    fetchAndCheckAccessToken(accessToken);
}

function fetchAndCheckAccessToken(accessToken) {
    // const dbRef = query(ref(db, 'projects'), orderByKey());
    get(child(dbRef, "projects/FIT2101 Project")).then((snapshot) => {
        VerifyAccessToken(accessToken,snapshot);
    });
}

function VerifyAccessToken(accessToken,snapshot) {

    if (accessToken == snapshot.val().projectaccesstoken) {
        let newWindow = window.open("popupeditstory.html", "_self", "width=600,height=600");
        alert("Correct Access Token");
    } else {
        alert("Wrong Access Token");
    }

}
