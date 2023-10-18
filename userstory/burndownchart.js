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


function sumArrayUpTo(arrData, index) {
  var total = 0;
  for (var i = 0; i <= index; i++) {
    if (arrData.length > i) {
      total += arrData[i];
        }
  }
  return total;
}

function showBurnDown(elementId, burndownData, scopeChange = []) {

  var speedCanvas = document.getElementById(elementId);

  Chart.defaults.global.defaultFontFamily = "Arial";
  Chart.defaults.global.defaultFontSize = 14;

  const totalHoursInSprint = burndownData[0];
  const idealHoursPerDay = totalHoursInSprint / 9;
  i = 0;

  var speedData = {
    labels: [ "Day 1",	"Day 2",	"Day 3",	"Day 4",	"Day 5",	"Day 6",	"Day 7",	"Day 8",	"Day 9", "Day 10"],
    datasets: [
      {
        label: "Burndown",
        data: burndownData,
        fill: false,
        borderColor: "#EE6868",
        backgroundColor: "#EE6868",
        lineTension: 0,
      },
      {
        label: "Ideal",
        borderColor: "#6C8893",
        backgroundColor: "#6C8893",
        lineTension: 0,
        borderDash: [5, 5],
        fill: false,
        data: [
          Math.round(totalHoursInSprint - (idealHoursPerDay * i++) + sumArrayUpTo(scopeChange, 0)), // 1
          Math.round(totalHoursInSprint - (idealHoursPerDay * i++) + sumArrayUpTo(scopeChange, 1)), // 2
          Math.round(totalHoursInSprint - (idealHoursPerDay * i++) + sumArrayUpTo(scopeChange, 2)), // 3
          Math.round(totalHoursInSprint - (idealHoursPerDay * i++) + sumArrayUpTo(scopeChange, 3)), // 4
          Math.round(totalHoursInSprint - (idealHoursPerDay * i++) + sumArrayUpTo(scopeChange, 4)), // 5
          Math.round(totalHoursInSprint - (idealHoursPerDay * i++) + sumArrayUpTo(scopeChange, 5)), // 6
          Math.round(totalHoursInSprint - (idealHoursPerDay * i++) + sumArrayUpTo(scopeChange, 6)), // 7
          Math.round(totalHoursInSprint - (idealHoursPerDay * i++) + sumArrayUpTo(scopeChange, 7)), // 8
          Math.round(totalHoursInSprint - (idealHoursPerDay * i++) + sumArrayUpTo(scopeChange, 8)), // 9
          Math.round(totalHoursInSprint - (idealHoursPerDay * i++) + sumArrayUpTo(scopeChange, 9))  // 10
        ]
      },
    ]
  };

  var chartOptions = {
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 80,
        fontColor: 'black'
      }
    },
    scales: {
        yAxes: [{
            ticks: {
                min: 0,
                max: Math.round(burndownData[0] * 1.1)
            }
        }]
    }
  };

  var lineChart = new Chart(speedCanvas, {
    type: 'line',
    data: speedData,
    options: chartOptions
  });

}



function fetchData(){


  var totalStoryPoints = Number(0);

  const sprintDbRef = ref(db, 'sprintUserStories');
  // adds total story points
  onValue(sprintDbRef, (snapshot) => {

    snapshot.forEach(childSnapshot => {
      totalStoryPoints += Number(childSnapshot.val().estimate);
      
    })

  })

  console.log(totalStoryPoints);
  var estimations = [];
  var days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];




}
window.onload = fetchData;
// 'sprintStoriesMarkedComplete/'


//   onValue(sprintDbRef, (snapshot) => {

//     var stories = [];

//     snapshot.forEach(childSnapshot => {

//       stories.push(childSnapshot.val());
    
//     });