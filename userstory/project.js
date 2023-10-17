// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, get, child, push , onValue, query, orderByKey, update} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

const projectForm = document.getElementById('projectForm');
var storyID = 0

// CREATING A PROJECT
document.addEventListener("DOMContentLoaded", function() {
  fetchAndSetUsers();

  const projectForm = document.getElementById('projectForm');

  projectForm.addEventListener("submit", function(e) {
    e.preventDefault();

    createProject(
      'FIT2101 Project',
      document.getElementById('projectDescription').value,
      document.getElementById('productOwner').value,
      document.getElementById('scrumMaster').value,
      document.getElementById('projectStartDate').value,
      document.getElementById('projectEndDate').value,
      document.getElementById('projectAccessToken').value
    );
  });

  function createProject(projectName, projectDesc, prodOwner, scrumMaster, projectStart, projectEnd, projectAccessToken) {
    // Your code to save the user story to Firebase here

    const projectRef =  ref(db, 'projects/' + projectName);

    set(projectRef, {
      projectname: projectName,
      projectdesc: projectDesc,
      productowner: prodOwner,
      scrummaster: scrumMaster,
      projectstart: projectStart,
      projectend: projectEnd,
      projectaccesstoken: projectAccessToken

    });

    alert("ADDED PROJECT");
}
});

// 
// <label for="scrumMaster">Scrum Master</label>
// <select id="scrumMaster" name="scrumMaster" required>
// 

function fetchAndSetUsers() {
  const dbRef = query(ref(db, 'accounts'), orderByKey());
  onValue(dbRef, (snapshot) => {

    var users = [];

    snapshot.forEach(childSnapshot => {

      users.push(childSnapshot.val());
    
    });
    
    addAllUsersAsOptionProductOwner(users);
    addAllUsersAsOptionScrumMaster(users);
  })
}

function addAllUsersAsOptionProductOwner(users) {

  var optionStr = "";

  users.forEach(element => {
    optionStr += "<option value='" + element.username + "'>" + element.username + "</option>";
  });
  
  document.getElementById("productOwner").innerHTML += (optionStr);
}


function addAllUsersAsOptionScrumMaster(users) {

  var optionStr = "";

  users.forEach(element => {
    optionStr += "<option value='" + element.username + "'>" + element.username + "</option>";
  });
  
  document.getElementById("scrumMaster").innerHTML += (optionStr);
}
