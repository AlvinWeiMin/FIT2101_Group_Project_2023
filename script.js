document.addEventListener("DOMContentLoaded", function() {
    // Your JS code will go here
    console.log("Document is fully loaded and parsed.");
});

document.addEventListener('DOMContentLoaded', function() {
    const aboutLink = document.getElementById('aboutLink');

    aboutLink.addEventListener('click', function(event) {
        event.preventDefault();  // Prevent the default behavior of the link
        window.location.href = 'about.html';  // Redirect to the about.html page
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const aboutLink = document.getElementById('servicesLink');

    aboutLink.addEventListener('click', function(event) {
        event.preventDefault();  // Prevent the default behavior of the link
        window.location.href = 'services.html';  // Redirect to the about.html page
    });
});

