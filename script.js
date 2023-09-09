document.addEventListener("DOMContentLoaded", function() {
    // Your JS code will go here
    console.log("Document is fully loaded and parsed.");
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
