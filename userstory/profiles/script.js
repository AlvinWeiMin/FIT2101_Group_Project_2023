// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, get, child, push , onValue, query, orderByKey, remove} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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

document.addEventListener("DOMContentLoaded", function() {
  loadProfiles();
})

function createProfiles(stories, users) {

  var profileStr = "<p>";
  
  users.forEach(user => {

    profileStr += "<h1>" + user.username + "</h1><br>";

    stories.forEach(story => {
      if (story.assignee === user.username) {
        profileStr += "Assigned story: " + story.title + "<br>";
      }
  
    })
  })

  profileStr += "</p>";

  document.getElementById("profiles").innerHTML += profileStr;
}

async function loadProfiles() {
  const storyRef = query(ref(db, 'userstories'), orderByKey());
  const userRef = query(ref(db, 'accounts'), orderByKey());

  try {
    const [storiesSnapshot, usersSnapshot] = await Promise.all([
      get(storyRef),
      get(userRef)
    ]);

    const stories = [];
    const users = [];

    storiesSnapshot.forEach(childSnapshot => {
      stories.push(childSnapshot.val());
    });

    usersSnapshot.forEach(childSnapshot => {
      users.push(childSnapshot.val());
    });

    createProfiles(stories, users);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}
