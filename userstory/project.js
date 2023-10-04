// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9LgYBVCVqnQt3oGrXBwLDMY3GFMKZC7I",
  authDomain: "fit2101-482ae.firebaseapp.com",
  projectId: "fit2101-482ae",
  storageBucket: "fit2101-482ae.appspot.com",
  messagingSenderId: "386692113129",
  appId: "1:386692113129:web:94119aa1b4161851d6c678",
  measurementId: "G-VR8V7N1RBT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const projectForm = document.getElementById('projectForm');
var storyID = 0

// CREATING A PROJECT
document.addEventListener("DOMContentLoaded", function() {
  const projectForm = document.getElementById('projectForm');

  projectForm.addEventListener("submit", function(e) {
    e.preventDefault();

    createProject(
      document.getElementById('projectName').value,
      document.getElementById('projectDescription').value,
      document.getElementById('productOwner').value,
      document.getElementById('scrumMaster').value,
      document.getElementById('projectStartDate').value,
      document.getElementById('projectEndDate').value
    );
  });

  function createProject(projectName, projectDesc, prodOwner, scrumMaster, projectStart, projectEnd) {
    // Your code to save the user story to Firebase here

    const projectRef =  ref(database, 'projects/' + projectname);

    set(projectRef, {
      projectname: projectName,
      projectdesc: projectDesc,
      productowner: prodOwner,
      scrummaster: scrumMaster,
      projectstart: projectStart,
      projectend: projectEnd
    });

    alert("ADDED PROJECT");
}
});

