// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set, onValue} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const firebase = initializeApp(firebaseConfig);
console.log("World 1");
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(firebase);

function createNewUserId() {
    const dbRef =  ref(getDatabase(firebase));
    
    return get(child(dbRef, 'userTotalCount/userCount')).then((snapshot) => {
        if (snapshot.exists()) {
            let returnId = snapshot.val() + 1;
            
            set(ref(database, 'userTotalCount'), {
                userCount: returnId
            })

            return returnId;

        } else {
            set(ref(database, 'userTotalCount'), {
                userCount: 1
            })
            let returnId = 1;
            return returnId;
        }
      }).catch((error) => {
        console.error(error);
      });


}


// function updateTotalUserCount() {

// }

// function writeNewUserData(inputUserId, inputUsername, inputEmail, inputPassword, inputDateOfBirth, inputPostalAddress, inputImageUrl) {
//     var returnVal;
//     // Error detected
//     if (inputUsername == null) {
//         returnVal = "No username";
//     } else if (inputEmail == null) {
//         returnVal = "No email";
//     } else if  (inputPassword == null) {
//         returnVal = "No password";
//     } else {
//         // Placeholders
//         if (inputUserId == null) {
//             const newUserId = createNewUserId();
//         }
//         if (inputDateOfBirth == null) {
//             inputDateOfBirth = DEFAULT_DATE_OF_BIRTH;
//         }
//         if (inputPostalAddress == null) {
//             inputPostalAddress = DEFAULT_POSTAL_ADDRESS;
//         } 
//         if (inputImageUrl == null) {
//             inputImageUrl = DEFAULT_IMAGE_URL;
//         }

//         // Actual inserting the data into Firebase
//         database.ref('users/' + userId).set({
//             username: inputUsername,
//             email: inputEmail,
//             password: inputPassword,
//             dateOfBirth: inputDateOfBirth,
//             postalAddress: inputPostalAddress,
//             imageUrl: inputImageUrl
//         });

//         returnVal = "";
//     }

//     return returnVal
// }

// function updateUserData (inputUserId) {
//     var returnVal = 1;
//     // Error detected
//     if (inputUserId == null) {
//         returnVal = 0;
//     }


//     return returnVal
// }

// function validateUser(inputUsername, inputPassword){
//     var returnVal = 0;
//     const dbRef = database.ref();
//     // Retrieve new posts as they are added to our database
//     dbRef.child("users").on('child_added', (snapshot, prevChildKey) => {
//         const newPost = snapshot.val();
//         if ((newPost.username == inputUsername) && (newPost.password == inputPassword)) {
//             returnVal = 1;
//         } 
//     });

//     return returnVal
// }

// function readUserData(inputUserId) {
//     var returnVal;
//     const dbRef = database.ref();
//     dbRef.child("users").child(inputUserId).get().then((snapshot) => {
//         if (snapshot.exists()) {
//             returnVal = snapshot.val();
//         } else {
//             returnVal = "No data available";
//         }
//     }).catch((error) => {
//         console.error(error);
//     });

//     return returnVal
// }

console.log("Hello World");
const YEYEASS = createNewUserId();
console.log(YEYEASS);