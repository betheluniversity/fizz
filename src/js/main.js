// var $ = require("jquery");
// var	lazySizes = require("../../node_modules/lazysizes");
// var domReady = require("../../node_modules/domready");
var offCanvas = require("./off-canvas.js");
// var picturefill = require("../../node_modules/picturefill");
var Flickity = require("../../node_modules/flickity-imagesloaded");
var skrollr = require("./skrollr.min.js");
var bu_animate = require("./bu_animate.js");
var accordion = require("./accordion.js");
var responsiveTables = require("./responsive-tables.js");
var Odometer = require("./odometer.min.js");
var svg4everybody = require("../../node_modules/svg4everybody");

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
    var flkty = new Flickity(carousels[i], {
        wrapAround: true,
        imagesLoaded: true,
        initialIndex: initial_load,
        // pageDots:false,
        percentPosition:false,
        cellAlign: 'left'
    });
    flkty.on('cellSelect', function(){
        this.selectedElement.querySelector('img').classList.toggle('lazyload');
    })
};

addEvent(window, 'load', function() {
  var fc = document.querySelectorAll('.flickity--cell');
  for (var i = 0; i < fc.length; i++) {
    isSelected(fc[i]);
    console.log("butt:");
  };
});

function isSelected(e) {
  if (e.classList.contains('is-selected')) {
    e.querySelector('img').classList.toggle('lazyload');
    console.log("toot");
  };
}

function addEvent(obj, type, fn) {
  if (obj.addEventListener)
    obj.addEventListener(type, fn, false);
  else if (obj.attachEvent) {
    obj["e" + type + fn] = fn;
    obj[type + fn] = function() {
      obj["e" + type + fn](window.event);
    }
    obj.attachEvent("on" + type, obj[type + fn]);
  }
}