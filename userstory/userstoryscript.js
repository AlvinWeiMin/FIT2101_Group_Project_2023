
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getDatabase, ref, set, get, child, push , onValue} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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
  
const userStoryForm = document.getElementById('userStoryForm');


// CREATING A USER STORY
document.addEventListener("DOMContentLoaded", function() {
  const userStoryForm = document.getElementById('userStoryForm');

  userStoryForm.addEventListener("submit", function(e) {
    e.preventDefault();

    createStory(
      document.getElementById('title').value,
      document.getElementById('description').value,
      document.getElementById('epic').value,
      document.getElementById('estimate').value,
      document.getElementById('assigned-to').value
    );
  });

  function createStory(title, description, epic, estimate, assignee) {
    // Your code to save the user story to Firebase here

    const userStoryRef =  ref(db, 'userstories/');
    const newUserStory = push(userStoryRef);


    set(newUserStory, {
      title: title,
      desc: description,
      epic: epic,
      estimate: estimate,
      assignee: assignee
    });
    
    alert("ADDED STORY");
  }
});





 // DISPLAYING USER STORIES
var tbody = document.getElementById('backlogbody');

function AddStoryToTable(title, desc, epic, estimate , assignee){
  

  let trow = document.createElement('tr');

  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');
  let td4 = document.createElement('td');
  let td5 = document.createElement('td');

  td1.innerHTML = title;
  td2.innerHTML = desc;
  td3.innerHTML = epic;
  td4.innerHTML = estimate;
  td5.innerHTML = assignee;

  trow.appendChild(td1); trow.appendChild(td2); trow.appendChild(td3); trow.appendChild(td4); trow.appendChild(td5);
  tbody.appendChild(trow)
}

function AddAllItemsToTable(story){
  
  //tbody.innerHTML = "";
  story.forEach(element => {
    AddStoryToTable(element.title , element.desc , element.epic , element.estimate , element.assignee);
  })
}

function SelectAllData(){

  const dbRef = ref(db ,  "userstories");

  onValue(dbRef, (snapshot) => {

    var stories = [];

    snapshot.forEach(childSnapshot => {

      stories.push(childSnapshot.val());
    
    });

    AddAllItemsToTable(stories);
  })

}
window.onload = SelectAllData;
