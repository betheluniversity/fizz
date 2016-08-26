require("./off-canvas.js");
var Flickity = require("flickity");
var skrollr = require("./skrollr.min.js");
require("./accordion.js");
require("./responsive-tables.js");

// var ScrollReveal = require("exports?ScrollReveal!scrollreveal");
// require("imports?ScrollReveal=>undefined!exports?ScrollReveal!scrollreveal")

// require("./odometer--custom.js");
require("svg4everybody");
require("./bu_animate.js");

// document.getElementById("bachelors").addEventListener("click", function(){
//     // sortPosts(".title > a")
//     document.body.classList.toggle("WOOT");
//     console.log("did it");
// });

// var elem = document.getElementById('bachelors');
// elem.addEventListener('focus', function() {
//   alert('Selection changed!');
//   console.log("he")
// }, false);

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

if (carousels.length != 0){
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
            imagesLoaded: true,
            initialIndex: local_initial_load,
            pageDots:false,
            percentPosition:false,
            draggable: false,
            cellAlign: 'left'
        });
        
        flkty.on('cellSelect', function(){
            isSelected();
        });
    }
}

function onLoadeddata( event ) {
    var cell = flkty.getParentCell( event.target );
    flkty.cellSizeChange( cell && cell.element );
}


// if( typeof flkty !== 'undefined' ) {
//     if (flkty.selectedElement.querySelectorAll('video')){
//         var videos = flkty.selectedElement.querySelectorAll('video');
//     }

//     for ( var i=0, len = videos.length; i < len; i++ ) {
//         var video = videos[i];
//         // resume autoplay for WebKit
//         video.play();
//         addEvent( video, 'loadeddata', onLoadeddata );
//     }
// }

// Checking for 'is-selected' on load

addEvent(window, 'load', function() {
    isSelected();
});

// This function needs a double test because some carousels
// may not have the .lazyload class applied on load. If it already
// has the class, we don't want to remove it

function isSelected() {
    var fc = document.querySelectorAll('.js-load-on-demand .flickity--cell');
    for (var i = 0; i < fc.length; i++) {
      if (fc[i].classList.contains('is-selected')) {
        if (fc[i].querySelector('img').classList.contains('lazyload')){
        } else {
            fc[i].querySelector('img').classList.add('lazyload');
        }
      }
    }
}

  var gallery = document.querySelector('.flickity');
  var flkty = new Flickity( carousels[i] );
  
  function onLoadeddata( event ) {
    var cell = flkty.getParentCell( event.target );
    flkty.cellSizeChange( cell && cell.element );
  }

  // var videos = flkty.selectedElement.querySelectorAll('video');

  // if ( videos.length != 0){
  //     for ( var i=0, len = videos.length; i < len; i++ ) {
  //       var video = videos[i];
  //       // resume autoplay for WebKit
  //       video.play();
  //       addEvent( video, 'loadeddata', onLoadeddata );
  //     }
  // }

// Generic addEvent function

function addEvent(obj, type, fn) {
  if (obj.addEventListener)
    obj.addEventListener(type, fn, false);
  else if (obj.attachEvent) {
    obj["e" + type + fn] = fn;
    obj[type + fn] = function() {
      obj["e" + type + fn](window.event);
    };
    obj.attachEvent("on" + type, obj[type + fn]);
  }
}