// var sayHello = require('./say-hello');
// var imager = require('../../node_modules/imager.js/Imager.js')

// sayHello();
// imager();

// document.body.className = document.body.className.replace("no-js","js");

var $ = require("jquery");
var domReady = require("../../node_modules/domready/src/ready.js");
// var offCanvas = require("./off-canvas.js");
// var Imager = require("../../node_modules/imager.js/Imager.js");
var slick = require("../../node_modules/slick-carousel/slick/slick.js");
var picturefill = require("../../node_modules/dist/picturefill.min.js");
var skrollr = require("./skrollr.min.js");
var bu_animate = require("./bu_animate.js");
var odometer = require("./odometer.min.js");
var accordion = require("./accordion.js");
var responsiveTables = require("./responsive-tables.js");
var rotateText = require("./rotate-text.js");

// var binPolyfill = require("bindPolyfill");
// var smothScroll = require("smoothScroll");
// var bindPolyfill = require("../../node_modules/smooth-scroll/dist/js/bind-polyfill.js")
// var smoothScroll = require("../../node_modules/smooth-scroll/dist/js/smooth-scroll.js")

// new Imager({ availableWidths: [300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600] });

// if (window.matchMedia("(min-width: 400px)").matches) {
//   console.log("over 400px");
//   document.querySelector("#calendar-mode").classList.toggle('NOOGS');
// } else {
// 	console.log("under 400px")
// }

domReady(function () {
    // Init Skrollr
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
    var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
    $(window).load(function($){
        if(window.innerWidth > 1024 && (!isiPhone || !isiPad)){
            var s = skrollr.init(); 
        }
    });
	// if a slick carousel exists
	if( $('.slick-carousel').length ){
	    // if the slick carousel needs a cookie to choose starting slide

        if(typeof(Storage) !== "undefined") {
            // Set a unique index.
            var index_of_array = "bethel-carousel-counter_" + document.location.pathname;

            // if the storage value exists
            if( localStorage.getItem(index_of_array) ){
                // grab the old value.
                var old_index = localStorage.getItem(index_of_array);
                var max_carousel_items = ($('.slick-cookie').find('.slick-item:not(.slick-cloned)').length);
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

	// smoothScroll.init({
    //     speed: 500, // Integer. How fast to complete the scroll in milliseconds
    //     easing: 'easeInOutCubic', // Easing pattern to use
    //     updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
    //     offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
    // });
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
