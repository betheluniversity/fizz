var $ = require("jquery");
var	lazySizes = require("../../node_modules/lazysizes");
var domReady = require("../../node_modules/domready/src/ready.js");
var slick = require("../../node_modules/slick-carousel/slick/slick.js");
var picturefill = require("../../node_modules/picturefill");
var skrollr = require("./skrollr.min.js");
var bu_animate = require("./bu_animate.js");
var odometer = require("./odometer.min.js");
var accordion = require("./accordion.js");
var responsiveTables = require("./responsive-tables.js");
<<<<<<< HEAD
var rotateText = require("./rotate-text.js");
var flickity = require("../../node_modules/flickity");

// var binPolyfill = require("bindPolyfill");
// var smothScroll = require("smoothScroll");
// var bindPolyfill = require("../../node_modules/smooth-scroll/dist/js/bind-polyfill.js")
// var smoothScroll = require("../../node_modules/smooth-scroll/dist/js/smooth-scroll.js")
=======
var Flickity = require("../../node_modules/flickity-imagesloaded");
>>>>>>> flickity


domReady(function () {
    // Init Skrollr
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
    var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
    $(window).load(function($){
        if(window.innerWidth > 1024 && !(isiPhone || isiPad)){
            var s = skrollr.init(); 
        }
    });
	// if a carousel exists that should have the cookie
	if( $('.rotate-order-carousel').length ){

        $('.slick-carousel').slick({
            lazyLoad: 'ondemand',
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>',
            initialSlide: initial_load
        });
        
    lazyloadSlide = function(slide) {
        var picture = $(slide).find('picture');
        var srcset = $(picture.children()[0]);
        var image = $(picture.children()[1]);
        srcset.attr('srcset', srcset.attr('bethel-lazy'));
        image.attr('src', image.attr('bethel-lazy'));
        //re-run picturefill
        picturefill({reevaluate: true});
    }

    	//lazyload
		var currentSlide = $('.slick-active');
		lazyloadSlide(currentSlide);
		$('.slick-carousel').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		  var next = slick.$slides.get(nextSlide);
		  lazyloadSlide(next);
		});

	}
});

if( $('.js-rotate-order-carousel').length ){
	if(typeof(Storage) !== "undefined") {
	    // Set a unique index.
	    var index_of_array = "bethel-carousel-counter_" + document.location.pathname;

	    // if the storage value exists
	    if( localStorage.getItem(index_of_array) ){
	        // grab the old value.
	        var old_index = localStorage.getItem(index_of_array);
	        var max_carousel_items = ($('.js-rotate-order-carousel').find('.flickity--cell').length);
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

var carousels = document.getElementsByClassName('flickity');
for (var i = 0, len = carousels.length; i < len; i++) {
	var fkty = new Flickity(carousels[i], {
		wrapAround: true,
		imagesLoaded: true,
		initialIndex: initial_load,
		pageDots:false,
		percentPosition:false
	});
}




<<<<<<< HEAD
if(typeof(Storage) !== "undefined") {
    // Set a unique index.
    var index_of_array = "bethel-carousel-counter_" + document.location.pathname;

    // if the storage value exists
    if( localStorage.getItem(index_of_array) ){
        // grab the old value.
        var old_index = localStorage.getItem(index_of_array);
        var max_carousel_items = ($('.rotate-order-carousel').find('.flickity--cell').length);
        if( max_carousel_items ){
            var initial_load = (parseInt(old_index)+1) % max_carousel_items;
            try{
                localStorage.setItem(index_of_array, initial_load);
            }catch(error){
                var initial_load = 0;
            }
        }
    } else {
        // Create a new default value of 0.
        try{
            localStorage.setItem(index_of_array, 0);
        }catch(error){
            var initial_load = 0;
        }
    }

} else {
    // localStorage doesn't work on browser, so just use 0
    var initial_load = 0;
}
var flkty = new Flickity('.flickity', { 
	wrapAround: true,
	imagesLoaded: true,
	initialIndex: initial_load,
	pageDots:false
});

// Calendar Stuff
// var mq  = matchMedia('(min-width: 800px)');
// mq.addListener(function(mql) {
//     if (mql.matches) {
//         document.querySelector("#calendar-mode").classList.add('calendar-grid');
//         document.querySelector("#calendar-mode").classList.remove('calendar-list');
//         document.querySelector(".view-mode--list > a").classList.remove('active');
//         document.querySelector(".view-mode--grid > a").classList.add('active');
//     }
//     else {
//     	document.querySelector("#calendar-mode").classList.add('calendar-list');
//     	document.querySelector("#calendar-mode").classList.remove('calendar-grid');
//     }
// });
=======
>>>>>>> flickity
