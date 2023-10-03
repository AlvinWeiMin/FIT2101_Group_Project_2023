
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getDatabase, ref, set, get, child, push , onValue, query, orderByKey} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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

  window.onload = updateSprintStories;
  var sbody = document.getElementById('sprintbody')
  var sprintStoryList = [];

  function updateSprintStories(){
    const sprintDbRef = query(ref(db, 'sprintUserStories'), orderByKey());
    //const dbRef = ref(db ,  "userstories");
  
    onValue(sprintDbRef, (snapshot) => {
  
      var stories = [];
  
      snapshot.forEach(childSnapshot => {
  
        stories.push(childSnapshot.val());
      
      });
  
      AddAllItemsToSprintTable(stories);
    })
  
  }
  
  function AddAllItemsToSprintTable(story){
    sbody.innerHTML = "";
    
    
    story.forEach(element => {
      AddStoryToSprintTable(element.storynum , element.title , element.desc , element.epic , element.estimate , element.assignee);
    })
    
  }
  
  function AddStoryToSprintTable(storynum,  title, desc, epic, estimate , assignee){
    
  
    let strow = document.createElement('tr');
  
    let std0 = document.createElement('td');
    let std1 = document.createElement('td');
    let std2 = document.createElement('td');
    let std3 = document.createElement('td');
    let std4 = document.createElement('td');
    let std5 = document.createElement('td');
    
    sprintStoryList.push([storynum, title,desc,epic,estimate,assignee])
    std0.innerHTML = storynum;
    std1.innerHTML = title;  
    std2.innerHTML = desc;
    std3.innerHTML = epic;
    std4.innerHTML = estimate;
    std5.innerHTML = assignee;
  
    strow.appendChild(std0); strow.appendChild(std1); strow.appendChild(std2); strow.appendChild(std3); strow.appendChild(std4); strow.appendChild(std5);
    
  
    var ControlDiv = document.createElement("div")
    ControlDiv.innerHTML += '<button type="button" class="btn-del-story" onclick="TestingStuff()">DeleteStory</button>'
  
    strow.appendChild(ControlDiv);
    sbody.appendChild(strow)
  }
  
  
  