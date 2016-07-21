
// Customizations for Scroll Reveal
// https://github.com/jlmakes/scrollreveal.js

var ScrollReveal = require("scrollreveal");

window.sr = ScrollReveal({reset:true});

var slideRight = {
    origin   : "left",
    distance : "9%",
    duration : 500,
    delay    : 100,
};

var slideLeft = {
    origin   : "right",
    distance : "9%",
    duration : 500,
    delay    : 100,
};

var intro = {
    origin   : "left",
    distance : "2em",
    duration : 900,
    delay    : 200,
    scale    : 1
};

var bottomUp = {
    origin   : "bottom",
    distance : "3em",
    duration : 600,
    delay    : 300,
    scale    : 0
};

sr.reveal(".js-animateSlideRight", slideRight);
sr.reveal(".js-animateSlideLeft", slideLeft);

sr.reveal(".search--program", { viewOffset: { top: 0 } } );
sr.reveal(".section--contact-visit .grid-cell", bottomUp, 500)
sr.reveal(".moving-picture__overlay > *", intro, 500)


var didScroll = false;
var intervalID = '';

function markScroll() {
    didScroll = true;
}

function findProofPointCollectionParentNode(childObj) {
    var testObj = childObj;
    var count = 1;
    while (true) {
        testObj = testObj.parentNode;
        if (!testObj.classList) {
            continue;
        }
        if (testObj.classList.contains('proof-point-collection')) {
            break;
        }
    }
    // go up one more because we need to add to the section
    return testObj.parentNode;
}

//Function which adds the 'animated' class to any '.animatable' in view
var doAnimations = function () {

    // Calc current offset and get all animatables
    var offset = (window.scrollY || window.pageYOffset) + window.innerHeight;
    
    var odometers = document.getElementsByClassName('odometer');
    done_odometers = document.getElementsByClassName('odometerdone');
    var noAnimation = document.getElementsByClassName("noAnimationProof");
    done_noAnimation = document.getElementsByClassName('noAnimationProofdone');

    //clears interval that runs doAnimations() everytime screen is scrolled
    //once all proof points are faded in
    if (odometers.length == done_odometers.length && noAnimation.length == done_noAnimation.length) {
        window.onscroll = "";
        clearInterval(intervalID);
    }
    for (index = 0; index < odometers.length; ++index) {
        var odometer = odometers[index];
        var scrollPos = odometer.getBoundingClientRect().top + document.body.scrollTop - document.body.clientTop + odometer.offsetHeight - 20;

        if (scrollPos < offset) {
            fadeIn(odometer);
            //setTimeout(function() {odometer.innerHTML = odometer.getAttribute('data-final-number');
            //odometer.className = odometer.className + " odometerdone";}, 50);
            odometer.innerHTML = odometer.getAttribute('data-final-number');
            odometer.className = odometer.className + " odometerdone";          
        }
    }
    
    for (index = 0; index < noAnimation.length; ++index) {
        noAnimation = noAnimation[index];
         var scrollPos1 = noAnimation.getBoundingClientRect().top + document.body.scrollTop - document.body.clientTop + noAnimation.offsetHeight - 20;
         if (scrollPos1 < offset) {
            fadeIn(noAnimation);
            noAnimation.className = noAnimation.className + " noAnimationProofdone";  
         }
    }
};

var fadeIn = function(documentObject){
    var ppcParent = findProofPointCollectionParentNode(documentObject);
    // don't add twice
    if (!ppcParent.classList) {
        ppcParent.className = "js-animate";
    }
    else if (!ppcParent.classList.contains('js-animate')) {
        ppcParent.className = ppcParent.className + " js-animate";
    }
};

function checkForSkrollr(){
    if(document.readyState === "complete"){
        doAnimations();
    }else{
        setTimeout(function(){
            checkForSkrollr();
        },500);
    }
    
}

(function () {
    //noAnimation proofs still need to fade in when scrolled to
    if (document.getElementsByClassName('odometer').length > 0 || document.getElementsByClassName('noAnimationProof').length > 0) {

        intervalID = setInterval(function () {
            if (didScroll) {
                doAnimations();
                didScroll = false;
            }
        }, 100);
        window.onscroll = function(){markScroll();};
        //trigger once if the odometers are in view on load
        checkForSkrollr();
    }

})();
