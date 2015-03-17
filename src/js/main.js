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
var picturefill = require("./picturefill.min.js");
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
    console.log("domReady is ready");

    // Init Skrollr
	$(window).load(function($){
		if(window.innerWidth > 960){
			var s = skrollr.init(); 
		}
	});

	// if a slick carousel exists
	if( $('.slick-carousel').length ){
	    // if the slick carousel needs a cookie to choose starting slide
	    if( $('.slick-cookie').length  ){
	        function getCookie(cname) {
	            var name = cname + "=";
	            var ca = document.cookie.split(';');
	            for(var i=0; i<ca.length; i++) {
	                var c = ca[i];
	                while (c.charAt(0)==' ') 
	                    c = c.substring(1);
	                if (c.indexOf(name) == 0) 
	                    return c.substring(name.length,c.length);
	            }
	            return "";
	        };

	        // Create cookie
	        var d = new Date();
	        // 180 days
	        d.setTime(d.getTime() + (180*24*60*60*1000));
	        var expires = "expires="+d.toUTCString();
	        var cookie = getCookie("bethel_carousel_cookie_counter:" + document.URL);
	        var initial_load = 0;
	        if( cookie == "" ){
	            // cookie doesn't exist
	            var index = 0;
	            document.cookie = "bethel_carousel_cookie_counter:" + document.URL + "=" + 0 + "; " + expires;
	            initial_load = index;
	        }
	        else{
	            // cookie exists
	            var index = parseInt(cookie)+1;
	            initial_load = index % ($('.slick-cookie').find('.slick-item:not(.slick-cloned)').length);
	            document.cookie = "bethel_carousel_cookie_counter:" + document.URL + "=" + initial_load + "; " + expires;
	        }
	        $('.slick-carousel').slick({
	            lazyLoad: 'ondemand',
	            prevArrow: '<button type="button" class="slick-prev"></button>',
	            nextArrow: '<button type="button" class="slick-next"></button>',
	            initialSlide: initial_load
	        });
	    }
	    else{
	        // normal slick carousel
	        $('.slick-carousel').slick({
                lazyLoad: 'ondemand',
	            prevArrow: '<button type="button" class="slick-prev"></button>',
	            nextArrow: '<button type="button" class="slick-next"></button>'
	        });
	    }

	    lazyloadSlide = function(slide){
		  var picture = $(slide).find('picture');
		  var srcset = $(picture.children()[0]);
		  var image = $(picture.children()[1]);
		  srcset.attr('srcset', srcset.attr('bethel-lazy'));
		  image.attr('src', image.attr('bethel-lazy'));
          //re-run picturefill
          picturefill({ reevaluate: true });
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
