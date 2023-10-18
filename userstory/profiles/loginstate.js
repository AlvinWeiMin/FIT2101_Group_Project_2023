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
  if (sessionStorage.getItem("user") == null) {
    document.getElementById("content").innerHTML += "<p>This session does not have an account associated with it.</p>"
  } else {
    console.log(sessionStorage)
    fetchAccount()
  }
})

async function displayData(user) {

  var profileStr = "<p>";
  profileStr += "<h1>Current User Data:</h1><br>";

  var userdata = user[0];
  var keys = Object.keys(userdata);

  var stories = await loadStories();

  console.log(stories)

  for (var a = 0; a < keys.length; a++) {
    profileStr += "<h2>" + keys[a] + ":</h2>" + userdata[keys[a]] + '<input type="text" id="' + keys[a] + '" placeholder="new value here...">' + '<button type="button" onclick="profileOverwrite(\'' + keys[a] + '\')">Update</button>' + "<br>";
  }

  profileStr += "<h2>Assigned Stories:</h2><br>";
  
  stories.forEach(story => {
    if (story.assignee === userdata["username"]) {
      profileStr += "Assigned story: " + story.title + "<br>";
    }

  })

  profileStr += "</p>";

  document.getElementById("content").innerHTML += profileStr;
}

async function fetchAccount() {
  const userRef = query(ref(db, 'accounts/' + sessionStorage.getItem("user")), orderByKey());

  try {
    const userSnapshot = await Promise.all([
      get(userRef)
    ]);

    const user = [];

    userSnapshot.forEach(childSnapshot => {
      user.push(childSnapshot.val());
    });

    displayData(user)
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

async function loadStories() {
    const storyRef = query(ref(db, 'userstories'), orderByKey());
  
    try {
      const storiesSnapshot = await get(storyRef);

      const stories = [];

      storiesSnapshot.forEach(childSnapshot => {
        stories.push(childSnapshot.val());
      });

    return stories;
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  document.profileOverwrite = async function(key) {
    var userRef = ref(db, 'accounts/' + localStorage.getItem("user") + "/" + key);
    set(userRef, document.getElementById(key).value);
    document.getElementById(key).value = "";
    location.reload()
  }