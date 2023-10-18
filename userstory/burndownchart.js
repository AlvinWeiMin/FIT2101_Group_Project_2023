// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, get, child, push , onValue, query, orderByKey, update} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

import {} from "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js";
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





function fetchData(){

  var days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  var totalStoryPoints = Number(0);
  var estimations = [];
  const sprintDbRef = ref(db, 'sprintUserStories');
  // adds total story points
  onValue(sprintDbRef, (snapshot) => {

    snapshot.forEach(childSnapshot => {
      totalStoryPoints += Number(childSnapshot.val().estimate);
      
    })

    console.log(totalStoryPoints);
    
    days.forEach(element => {
      estimations.push(totalStoryPoints);
      
        
    });

  
    console.log(totalStoryPoints);

    snapshot.forEach(childSnapshot => {
      if(childSnapshot.val().status == "Completed"){
         


        days.forEach(element => {
            
            if((element-1) >= (childSnapshot.val().dayCompleted -1)){
              if(!isNaN(childSnapshot.val().estimate)){}
              estimations[element-1] = Number(estimations[element-1] - childSnapshot.val().estimate);}
             
            
            

        })


      };
 

      console.log(estimations);
    })





    


  });







  
  




}
window.onload = fetchData;
// 'sprintStoriesMarkedComplete/'


//   onValue(sprintDbRef, (snapshot) => {

//     var stories = [];

//     snapshot.forEach(childSnapshot => {

//       stories.push(childSnapshot.val());
    
//     });