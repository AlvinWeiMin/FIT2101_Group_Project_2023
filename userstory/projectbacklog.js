  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getDatabase, ref, set, get, child, push , onValue, query, orderByKey, update , limitToLast , remove} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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

 var status_edit = null;
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getDatabase(app);
    window.onload = SelectAllData;



  var tbody = document.getElementById('backlogbody');


function AddStoryToTable(storynum,  title, desc, epic, estimate , assignee , status){
  

  let trow = document.createElement('tr');

  let td0 = document.createElement('td');
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');
  let td4 = document.createElement('td');
  let td5 = document.createElement('td');
  let td6 = document.createElement('td');
  

  td0.innerHTML = storynum;
  td1.innerHTML = title;  
  td2.innerHTML = desc;
  td3.innerHTML = epic;
  td4.innerHTML = estimate;
  td5.innerHTML = assignee;
  td6.innerHTML = status;

  trow.appendChild(td0); trow.appendChild(td1); trow.appendChild(td2); trow.appendChild(td3); trow.appendChild(td4); trow.appendChild(td5); trow.appendChild(td6);
  

  tbody.appendChild(trow)
}

function AddAllItemsToTable(story){
  tbody.innerHTML = "";
  
  story.forEach(element => {
    AddStoryToTable(element.storynum , element.title , element.desc , element.epic , element.estimate , element.assignee , element.status);
  })
  
}

function SelectAllData(){
  const dbRef = query(ref(db, "completedSprintStories/"), orderByKey());
  onValue(dbRef, (snapshot) => {

    var stories = [];

    snapshot.forEach(childSnapshot => {

      stories.push(childSnapshot.val());
    
    });

    AddAllItemsToTable(stories);
  })

}