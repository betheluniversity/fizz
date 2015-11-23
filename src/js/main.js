// var $ = require("jquery");
// var domReady = require("../../node_modules/domready");
var offCanvas = require("./off-canvas.js");
// var Flickity = require("../../node_modules/flickity");
var skrollr = require("./skrollr.min.js");
var bu_animate = require("./bu_animate.js");
var Odometer = require("./odometer.min.js");
var accordion = require("./accordion.js");
var responsiveTables = require("./responsive-tables.js");
var svg4everybody = require("../../node_modules/svg4everybody");
var lazysizesParentFit = require("./lazysizesParentFit.js");
var lazysizesBgset = require("./lazysizesBgset.js");


// Select a random image from the carousel to appear first

if( document.getElementsByClassName('js-rotate-order-carousel')[0] ){
    if(typeof(Storage) !== "undefined") {
        // Set a unique index.
        var index_of_array = "bethel-carousel-counter_" + document.location.pathname;

        // if the storage value exists
        if( localStorage.getItem(index_of_array) ){
            // grab the old value.
            var old_index = localStorage.getItem(index_of_array);
            var max_carousel_items = document.getElementsByClassName("js-rotate-order-carousel")[0].children.length;

            if( max_carousel_items ){
                var initial_load = (parseInt(old_index)+1) % max_carousel_items;
                try{
                    localStorage.setItem(index_of_array, initial_load);
                }catch(error){
                    var initial_load = 0;
                }
            }
        } else {

            try{
                // iOS Safari Prive mode reports having localStorage available but
                // does not let you write to it.
                localStorage.setItem(index_of_array, 0);
            }catch(error){
                var initial_load = 0;
            }
        }
    } else {
        // localStorage doesn't work on browser, so just use 0
        var initial_load = 0;
    }
}else{
    initial_load = 0;
}

// Flickity customizations

var carousels = document.getElementsByClassName('flickity');

for (var i = 0, len = carousels.length; i < len; i++) {
    var carousel = carousels[i];

// Checking if carousel has rotate class. If this is not set
// and there is more than one carousel on the page, Flickity can't 
// set the proper target

    if (carousel.classList.contains("js-rotate-order-carousel")){
        local_initial_load = initial_load;
    }
    else {
        local_initial_load = 0;
    }

    var flkty = new Flickity(carousels[i], {
        wrapAround: true,
        // imagesLoaded: true,
        initialIndex: local_initial_load,
        pageDots:false,
        // percentPosition:false,
        draggable: false,
        cellAlign: 'left'
    });
};

function onLoadeddata( event ) {
    var cell = flkty.getParentCell( event.target );
    flkty.cellSizeChange( cell && cell.element );
}

  // var gallery = document.querySelector('.flickity');
  // var flkty = new Flickity( carousels[i] );

if( typeof flkty !== 'undefined' ) {
  var videos = flkty.selectedElement.querySelectorAll('video');

  for ( var i=0, len = videos.length; i < len; i++ ) {
    var video = videos[i];
    // resume autoplay for WebKit
    video.play();
    addEvent( video, 'loadeddata', onLoadeddata );
  }
}

// Skrollr init
var isiPad = navigator.userAgent.match(/iPad/i) != null;
var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
window.onload = function() {
    if(window.innerWidth > 1024 && !(isiPhone || isiPad)){
        var s = skrollr.init();
    }
    // Odometer init
    var odometers = document.getElementsByClassName('odometer');
    for (var i = 0, len = odometers.length; i < len; i++) {
        var el = odometers[i];
        var od = new Odometer({
            el: el
        });
    }
};
