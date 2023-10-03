// Search functionality moved out of DOMContentLoaded scope
function performSearch() {
    // Get the value from the search input
    let searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Map search terms to specific URLs or sections on your site
    const searchMapping = {
        "home": "2101website.html",
        "about": "about.html",
        "services": "services.html",
        "catalogue": "catalogue.html",
        "contact": "contact.html",
        "new account": "registermewacc.html",
        "register account": "registeraccount.html"
        // ... Add more terms and their respective URLs as needed
    };

    // Check if the search term exists in the mapping
    if (searchMapping[searchTerm]) {
        window.location.href = searchMapping[searchTerm];
    } else {
        // Default behavior if search term isn't found in the mapping
        window.location.href = `pagenotfound.html?search=${searchTerm}`;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("Document is fully loaded and parsed.");

    // About link logic
    const aboutLink = document.getElementById('aboutLink');
    aboutLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'about.html';
    });

    // Home link logic (fixed the element reference)
    const homeLink = document.getElementById('homeLink');
    homeLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = '2101website.html';
    });

    // Services link logic
    const servicesLink = document.getElementById('servicesLink');
    servicesLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'services.html';
    });

    const logInLink = document.getElementById('logInLink');
    logInLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'loginpage.html';
    });

    // Services link logic
    const accountNewRegLink = document.getElementById('accountNewRegLink');
    accountNewRegLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'registernewacc.html';
    });

    // Catalogue link logic
    const catalogueLink = document.getElementById('catalogueLink');
    catalogueLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'catalogue.html';
    });


    // Contact link logic
    const contactLink = document.getElementById('contactLink');
    contactLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'contact.html';
    });

    const searchButton = document.querySelector('.search-bar button');
    if (searchButton) {  // Ensure the search button is present on the page
        searchButton.addEventListener('click', performSearch);
    }

});


document.querySelector("#show-login").addEventListener("click",function(){
    document.querySelector(".popup").classList.add("active");
});

document.querySelector(".popup .close-btn").addEventListener("click",function(){
    document.querySelector(".popup").classList.remove("active");
});


document.querySelector(".popup .signup-link").addEventListener("click",function(){
    document.querySelector(".popup").classList.add("active");
});

// Function to register a user
function register() {
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Create an object to represent the user
    var user = {
        email: email,
        username: username,
        password: password
    };

    // Store the user data in localStorage
    localStorage.setItem(localStorage.length, JSON.stringify(user));
    document.getElementById("registernotif").innerHTML = "Account registered! ";
    document.getElementById("loginlink").innerHTML = "Return to login page?";
}

// Function to perform login
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var loginfailed = true;
    
    document.getElementById("failedlogin").innerHTML = "";
    document.getElementById("successfullogin").innerHTML = "";

    // Iterate through localStorage keys (usernames)
    for (let i = 0; i < localStorage.length; i++) {
        let storedUsername = localStorage.key(i); // Get the username from localStorage
        let storedUserData = JSON.parse(localStorage.getItem(storedUsername)); // Parse user data

        // Check if the provided username and password match a stored user
        if (storedUserData && username === storedUserData['username'] && password === storedUserData['password']) {
            document.getElementById("successfullogin").innerHTML = "Login successful! Redirecting...";
            loginfailed = false;
            setTimeout(function() {
                window.location.href = "2101website.html";
            }, 1000);
            break; // Exit the loop once a match is found
        }
    }

    if (loginfailed) {
        document.getElementById("failedlogin").innerHTML = "Provided username or password is invalid.";
    }
}


console.log("Hello World")