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
var Flickity = require("../../node_modules/flickity-imagesloaded");


domReady(function () {
    // Init Skrollr
	var isiPad = navigator.userAgent.match(/iPad/i) != null;
    var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
    $(window).load(function($){
        if(window.innerWidth > 1024 && !(isiPhone || isiPad)){
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
});