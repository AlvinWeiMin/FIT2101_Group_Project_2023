
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

  // window.onload = updateSprintStories;
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
      AddStoryToSprintTable(element.storynum , element.title , element.desc , element.epic , element.estimate , element.assignee, element.status);
    })
    
  }
  
  function AddStoryToSprintTable(storynum,  title, desc, epic, estimate , assignee , status){
    
  
    let strow = document.createElement('tr');
  
    let std0 = document.createElement('td');
    let std1 = document.createElement('td');
    let std2 = document.createElement('td');
    let std3 = document.createElement('td');
    let std4 = document.createElement('td');
    let std5 = document.createElement('td');
    let std6 = document.createElement('td');
    
    sprintStoryList.push([storynum, title,desc,epic,estimate,assignee])
    std0.innerHTML = storynum;
    std1.innerHTML = title;  
    std2.innerHTML = desc;
    std3.innerHTML = epic;
    std4.innerHTML = estimate;
    std5.innerHTML = assignee;
    std6.innerHTML = status;
  
    strow.appendChild(std0); strow.appendChild(std1); strow.appendChild(std2); strow.appendChild(std3); strow.appendChild(std4); strow.appendChild(std5), strow.appendChild(std6);
    
  
    var ControlDiv = document.createElement("div")
    ControlDiv.innerHTML += '<button type="button" class="btn-edit-status" onclick="EditStatus(' + storynum + ')">Edit Status</button>'
  
    strow.appendChild(ControlDiv);
    sbody.appendChild(strow)
  }
  
  
  // Edits the user story to mark it as completed

  // TODO: make a pop up so people can select the changes , also maybe an edit story button ?
  document.EditStatus = function(storynum){

    status_edit = storynum;
    
    let popup = document.getElementById('popup')
    popup.classList.add("open-popup")




  }


  document.closePopup = function(){

    var storyRef = ref(db, 'sprintUserStories/' + status_edit);

    update(storyRef ,{ 
        status : document.getElementById("story-status-val").value
    }
        )


    popup.classList.remove("open-popup")


  }

  // for creating sprint stuff

  const sprintInfoContainer = document.getElementById("sprint-information");
  const sprintInfoButtons = document.getElementById("sprint-information2");
  localStorage.setItem("hasCurrentSprint", "true")


  function updateSprintInfo()
  {
    document.addEventListener("DOMContentLoaded", function() {
    
      const activeSprintref = ref(db, "activeSprint")

        get(activeSprintref).then((snapshot) => {
          const isActiveSprint = snapshot.val();
    

          console.log(isActiveSprint)

          if (isActiveSprint == true) {

         
                
                sprintInfoContainer.textContent = 'Sprint Active'
              sprintInfoButtons.innerHTML = '<button onclick="endSprint()">End Sprint</button>';
              updateSprintStories();
          } 

         
      
          else {
            sprintInfoContainer.textContent = "No Active Sprint"
            sprintInfoButtons.innerHTML = '<button onclick="startSprint()">Create Sprint</button>';
      
      
    
              } } ) } ) }
      
  

      




  


 window.onload = updateSprintInfo();
setInterval(updateSprintInfo, 1000);




document.endSprint = function() {
     update(ref(db) , {

      activeSprint: false
    })

    alert('Sprint Ended!');

    SelectAllData();

    remove(ref(db, 'sprintUserStories'))

}

document.startSprint = function() {
  update(ref(db) , {

   activeSprint: true
 })
 alert('Sprint Created!');
}


function AddAllItemsToTable(story){
  story.forEach(element => {
    var completedSprintRef = ref(db , "completedSprintStories/" + element.storynum)
    set(completedSprintRef , { 

      storynum : element.storynum,
      title : element.title,
      desc : element.desc,
      epic : element.epic,
      estimate : element.estimate,
      assignee : element.assignee,
      status : element.status

    })
    
  })
  
}

function SelectAllData(){
  const sprintDbRef = query(ref(db, 'sprintUserStories'), orderByKey());
  onValue(sprintDbRef, (snapshot) => {

    var stories = [];

    snapshot.forEach(childSnapshot => {

      stories.push(childSnapshot.val());
    
    });

    AddAllItemsToTable(stories);
  })}