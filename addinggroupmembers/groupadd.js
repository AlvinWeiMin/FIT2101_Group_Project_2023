
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
  

document.getElementById("addPerson").addEventListener('click', function(){
    const personName = document.getElementById('personName').value;
    const personAuthKey = document.getElementById('personAuthKey').value;

    if (personName && personAuthKey){
        const newPersonContact = push(ref(db, 'people'))
        set(newPersonContact, {
            identity: personName,
            auth: personAuthKey


        });
    }

});

const peopleList = document.getElementById('peopleList');

onValue(ref(db, 'people'), snapshot => {
    peopleList.innerHTML = '';
    snapshot.forEach(childSnapshot => {
        const person = childSnapshot.val();
        const li = document.createElement('li');
        li.textContent = `${person.name} by ${person.authkey}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            remove(ref(db, `person/${childSnapshot.key}`));
        });
        li.appendChild(removeButton);
        personList.appendChild(li);
    });
});
