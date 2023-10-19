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

var ctx = document.getElementById('myChart').getContext('2d');



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





    drawChart(days , estimations , totalStoryPoints);


  });







  
  




}
window.onload = fetchData;

function drawChart(xAxis, yAxis , ytot) {
  var idealIncrement = ytot / 14;
  var ideal= [];
  for( var i=0; i <=15 -1 ; i++){
    ideal.push(idealIncrement * i);
  }
  ideal.reverse();
// Create a new chart instance
var myChart = new Chart(ctx, {
  type: 'line', // Specify the chart type
  data: {
      labels: xAxis, // X-axis labels
      datasets: [{
          label: 'Story Points Completed vs Days', // Label for the dataset
          data: yAxis, // Y-axis data points
          borderColor: 'rgba(0,20,150,1)', // Line color
          borderWidth: 2, // Line width
          fill: false // Do not fill the area under the line
      },
      {
        label: 'Story Estimate',
        data: ideal,
        borderColor: 'rgb(255,0,0)',
        borderWidth: 3,
        fill: false
      }
    
    ]



  },
  options: {
      scales: {
          x: {
              type: 'category', // Specify X-axis type as category for string labels
              labels: xAxis, // X-axis labels
              beginAtZero: true, // Start X-axis from zero
              title: {
                display: true,
                text: 'Days', // X-axis label
            },
          },
          y: {
              labels: yAxis,
              beginAtZero: true, // Start Y-axis from zero
              title: {
                display: true,
                text: 'Story Points', // X-axis label
                min: 0,
                max: ytot
            },
          }
      }
  }
})};