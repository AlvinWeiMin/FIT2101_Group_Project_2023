
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
  
const userStoryForm = document.getElementById('userStoryForm');
var storyid = 0



window.onload = SelectAllData;



// CREATING A USER STORY
document.addEventListener("DOMContentLoaded", function() {
  const userStoryForm = document.getElementById('userStoryForm');
  fetchAndSetUsers()

  userStoryForm.addEventListener("submit", function(e) {
    e.preventDefault();

    createStory(
      document.getElementById('storynum').value,
      document.getElementById('title').value,
      document.getElementById('description').value,
      document.getElementById('epic').value,
      document.getElementById('estimate').value,
      document.getElementById('assigned-to').value
    );
  });

  function createStory(storynum , title, description, epic, estimate, assignee) {
    // Your code to save the user story to Firebase here

    const userStoryRef =  ref(db, 'userstories/' + storynum);


    set(userStoryRef, {
      storynum : storynum,
      title: title,
      desc: description,
      epic: epic,
      estimate: estimate,
      assignee: assignee
    });
    
    alert("ADDED STORY");
  }
});



var storyId = 0;
var storyList = [];
 // DISPLAYING USER STORIES
var tbody = document.getElementById('backlogbody');


function AddStoryToTable(storynum,  title, desc, epic, estimate , assignee){
  

  let trow = document.createElement('tr');

  let td0 = document.createElement('td');
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');
  let td4 = document.createElement('td');
  let td5 = document.createElement('td');
  
  storyList.push([storynum, title,desc,epic,estimate,assignee])
  td0.innerHTML = storynum;
  td1.innerHTML = title;  
  td2.innerHTML = desc;
  td3.innerHTML = epic;
  td4.innerHTML = estimate;
  td5.innerHTML = assignee;

  trow.appendChild(td0); trow.appendChild(td1); trow.appendChild(td2); trow.appendChild(td3); trow.appendChild(td4); trow.appendChild(td5);
  

  var ControlDiv = document.createElement("div")
  ControlDiv.innerHTML = '<button type=button" class="btn-usr-story"  data-toggle="modal" data-target="#examplemodalcentre" onclick="AddStoryToSprint('+ (storyList.length -1) +')">Add To Sprint</button>'
  
  ControlDiv.innerHTML += '<button type="button" class="btn-del-story" onclick="DeleteStory('+ storynum + ')">DeleteStory</button>'
  ControlDiv.innerHTML += '<button type="button" class="btn-edit-story" onclick="EditStory('+ storynum + ')">EditStory</button>'


  trow.appendChild(ControlDiv);
  tbody.appendChild(trow)
}

function AddAllItemsToTable(story){
  tbody.innerHTML = "";
  
  story.forEach(element => {
    AddStoryToTable(element.storynum , element.title , element.desc , element.epic , element.estimate , element.assignee);
  })
  
}

function SelectAllData(){
  const dbRef = query(ref(db, 'userstories'), orderByKey());
  onValue(dbRef, (snapshot) => {

    var stories = [];

    snapshot.forEach(childSnapshot => {

      stories.push(childSnapshot.val());
    
    });

    AddAllItemsToTable(stories);
  })

}

function fetchAndSetUsers() {
  const dbRef = query(ref(db, 'accounts'), orderByKey());
  onValue(dbRef, (snapshot) => {

    var users = [];

    snapshot.forEach(childSnapshot => {

      users.push(childSnapshot.val());
    
    });

    addAllUsersAsOption(users);
  })
}

function addAllUsersAsOption(users) {

  var optionStr = "";

  users.forEach(element => {
    optionStr += "<option value='" + element.username + "'>" + element.username + "</option>";
  });
  
  document.getElementById("assigned-to").innerHTML += (optionStr);
}


// ADDS THE STORY TO THE CURRENT SPRINT DATABASE
document.AddStoryToSprint = function(storynum){

  console.log("TEST");

  const sprintStoryRef =  ref(db, 'sprintUserStories/' + storyList[storynum][0]);
  const userStoryRef1 =  ref(db, 'userstories/' + storyList[storynum][0])

  set(sprintStoryRef, {
    storynum : storyList[storynum][0],
    title: storyList[storynum][1],
    desc: storyList[storynum][2],
    epic: storyList[storynum][3],
    estimate: storyList[storynum][4],
    assignee: storyList[storynum][5],
    status: "To Do"
  });

  remove(userStoryRef1)
  
  alert("ADDED STORY TO SPRINT");
}

document.DeleteStory = function(storynum){

  const userStoryRef =  ref(db, 'userstories/' + storynum);

  remove(userStoryRef)
}


