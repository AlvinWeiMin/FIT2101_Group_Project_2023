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
        window.location.href = '../accounthandler/loginpage.html';
    });

    // Services link logic
    const accountNewRegLink = document.getElementById('accountNewRegLink');
    accountNewRegLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = '../accounthandler/registernewacc.html';
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