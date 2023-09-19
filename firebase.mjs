// Import
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const DEFAULT_POSTAL_ADDRESS = "-";
const DEFAULT_DATE_OF_BIRTH = "01/01/2023";
const DEFAULT_IMAGE_URL = "https://i.imgur.com/n4I5e2e.png";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    databaseURL: "https://console.firebase.google.com/u/0/project/fit2101-a1-lean-3469e/database/fit2101-a1-lean-3469e-default-rtdb/data/~2F",
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
var database = firebase.database();

function createNewUserId() {
    var returnId;
    const dbRef = database.ref();

    dbRef.child("userTotalCount").get().then((snapshot) => {
        if (snapshot.exists()) {
            returnId = snapshot.val().userCount + 1;

        } else {
            database.ref("userTotalCount").set({
                userCount: 0
            });
            returnId = 0;
        }
    }).catch((error) => {
        console.error(error);
    });


    return returnId
}



function writeNewUserData(inputUserId, inputUsername, inputEmail, inputPassword, inputDateOfBirth, inputPostalAddress, inputImageUrl) {
    var returnVal;
    // Error detected
    if (inputUsername == null) {
        returnVal = "No username";
    } else if (inputEmail == null) {
        returnVal = "No email";
    } else if  (inputPassword == null) {
        returnVal = "No password";
    } else {
        // Placeholders
        if (inputUserId == null) {
            const newUserId = createNewUserId();
        }
        if (inputDateOfBirth == null) {
            inputDateOfBirth = DEFAULT_DATE_OF_BIRTH;
        }
        if (inputPostalAddress == null) {
            inputPostalAddress = DEFAULT_POSTAL_ADDRESS;
        } 
        if (inputImageUrl == null) {
            inputImageUrl = DEFAULT_IMAGE_URL;
        }

        // Actual inserting the data into Firebase
        database.ref('users/' + userId).set({
            username: inputUsername,
            email: inputEmail,
            password: inputPassword,
            dateOfBirth: inputDateOfBirth,
            postalAddress: inputPostalAddress,
            imageUrl: inputImageUrl
        });

        returnVal = "";
    }

    return returnVal
}

function updateUserData (inputUserId) {
    var returnVal = 1;
    // Error detected
    if (inputUserId == null) {
        returnVal = 0;
    }


    return returnVal
}

function validateUser(inputUsername, inputPassword){
    var returnVal = 0;
    const dbRef = database.ref();
    // Retrieve new posts as they are added to our database
    dbRef.child("users").on('child_added', (snapshot, prevChildKey) => {
        const newPost = snapshot.val();
        if ((newPost.username == inputUsername) && (newPost.password == inputPassword)) {
            returnVal = 1;
        } 
    });

    return returnVal
}

function readUserData(inputUserId) {
    var returnVal;
    const dbRef = database.ref();
    dbRef.child("users").child(inputUserId).get().then((snapshot) => {
        if (snapshot.exists()) {
            returnVal = snapshot.val();
        } else {
            returnVal = "No data available";
        }
    }).catch((error) => {
        console.error(error);
    });

    return returnVal
}

console.log(createNewUserId());
