!function e(t,i,n){function o(r,s){if(!i[r]){if(!t[r]){var l="function"==typeof require&&require;if(!s&&l)return l(r,!0);if(a)return a(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var d=i[r]={exports:{}};t[r][0].call(d.exports,function(e){var i=t[r][1][e];return o(i?i:e)},d,d.exports,e,t,i,n)}return i[r].exports}for(var a="function"==typeof require&&require,r=0;r<n.length;r++)o(n[r]);return o}({1:[function(e){var t=e("../../node_modules/domready/src/ready.js"),i=(e("./off-canvas.js"),e("./accordion.js"),e("../../node_modules/imager.js/Imager.js"));new i({availableWidths:[300,400,500,600,700,800,900,1e3,1100,1200]}),t(function(){console.log("domReady is ready")})},{"../../node_modules/domready/src/ready.js":2,"../../node_modules/imager.js/Imager.js":3,"./accordion.js":4,"./off-canvas.js":5}],2:[function(e,t){!function(e,i){"undefined"!=typeof t?t.exports=i():"function"==typeof define&&"object"==typeof define.amd?define(i):this[e]=i()}("domready",function(){var e,t=[],i=document,n=i.documentElement.doScroll,o="DOMContentLoaded",a=(n?/^loaded|^c/:/^loaded|^i|^c/).test(i.readyState);return a||i.addEventListener(o,e=function(){for(i.removeEventListener(o,e),a=1;e=t.shift();)e()}),function(e){a?e():t.push(e)}})},{}],3:[function(e,t,i){!function(e,n){"use strict";function o(e,t){for(var i=0,n=e.length,o=[];n>i;i++)o[i]=t(e[i],i);return o}function a(e){return e}function r(){}function s(){return!0}function l(e,t){var i=this,s=n;t=t||{},void 0!==e&&("string"==typeof e?(t.selector=e,e=void 0):"undefined"==typeof e.length&&(t=e,e=void 0)),this.viewportHeight=s.documentElement.clientHeight,this.selector=t.selector||".delayed-image-load",this.className=t.className||"image-replace",this.gif=s.createElement("img"),this.gif.src="data:image/gif;base64,R0lGODlhEAAJAIAAAP///wAAACH5BAEAAAAALAAAAAAQAAkAAAIKhI+py+0Po5yUFQA7",this.gif.className=this.className,this.gif.alt="",this.lazyloadOffset=t.lazyloadOffset||0,this.scrollDelay=t.scrollDelay||250,this.onResize=t.hasOwnProperty("onResize")?t.onResize:!0,this.lazyload=t.hasOwnProperty("lazyload")?t.lazyload:!1,this.scrolled=!1,this.availablePixelRatios=t.availablePixelRatios||[1,2],this.availableWidths=t.availableWidths||c,this.onImagesReplaced=t.onImagesReplaced||r,this.widthsMap={},this.refreshPixelRatio(),this.widthInterpolator=t.widthInterpolator||a,this.gif.removeAttribute("height"),this.gif.removeAttribute("width"),"function"!=typeof this.availableWidths&&("number"==typeof this.availableWidths.length?this.widthsMap=l.createWidthsMap(this.availableWidths,this.widthInterpolator,this.devicePixelRatio):(this.widthsMap=this.availableWidths,this.availableWidths=d(this.availableWidths)),this.availableWidths=this.availableWidths.sort(function(e,t){return e-t})),e?(this.divs=o(e,a),this.selector=null):this.divs=o(s.querySelectorAll(this.selector),a),this.ready(t.onReady),this.changeDivsToEmptyImages(this.divs),h(function(){i.init()})}var c,d,u,h=e.requestAnimationFrame||e.mozRequestAnimationFrame||e.webkitRequestAnimationFrame||function(t){e.setTimeout(t,1e3/60)};u=function(){return n.addEventListener?function(e,t,i){return e.addEventListener(t,i,!1)}:function(e,t,i){return e.attachEvent("on"+t,i)}}(),c=[96,130,165,200,235,270,304,340,375,410,445,485,520,555,590,625,660,695,736],d="function"==typeof Object.keys?Object.keys:function(e){var t,i=[];for(t in e)i.push(t);return i},l.prototype.scrollCheck=function(){var t=this,i=0,n=[];this.scrolled&&(o(this.divs,function(e){t.isPlaceholder(e)&&(++i,t.isThisElementOnScreen(e)&&n.push(e))}),0===i&&e.clearInterval(t.interval),this.changeDivsToEmptyImages(n),this.scrolled=!1)},l.prototype.init=function(){var e=this;this.initialized=!0;var t=s;this.lazyload?(this.registerScrollEvent(),this.scrolled=!0,e.scrollCheck(),t=function(t){return e.isPlaceholder(t)===!1}):this.checkImagesNeedReplacing(this.divs),this.onResize&&this.registerResizeEvent(t),this.onReady()},l.prototype.ready=function(e){this.onReady=e||r},l.prototype.createGif=function(e){if(e.className.match(new RegExp("(^| )"+this.className+"( |$)")))return e;var t=e.getAttribute("data-class"),i=e.getAttribute("data-width"),n=this.gif.cloneNode(!1);return i&&(n.width=i,n.setAttribute("data-width",i)),n.className=(t?t+" ":"")+this.className,n.setAttribute("data-src",e.getAttribute("data-src")),n.setAttribute("alt",e.getAttribute("data-alt")||this.gif.alt),e.parentNode.replaceChild(n,e),n},l.prototype.changeDivsToEmptyImages=function(e){var t=this;o(e,function(i,n){e[n]=t.createGif(i)}),this.initialized&&this.checkImagesNeedReplacing(e)},l.prototype.isPlaceholder=function(e){return e.src===this.gif.src},l.prototype.isThisElementOnScreen=function(e){var t=0,i=l.getPageOffset()+this.lazyloadOffset;if(e.offsetParent)do t+=e.offsetTop;while(e=e.offsetParent);return t<this.viewportHeight+i},l.prototype.checkImagesNeedReplacing=function(e,t){var i=this;t=t||s,this.isResizing||(this.isResizing=!0,this.refreshPixelRatio(),o(e,function(e){t(e)&&i.replaceImagesBasedOnScreenDimensions(e)}),this.isResizing=!1,this.onImagesReplaced(e))},l.prototype.replaceImagesBasedOnScreenDimensions=function(e){var t,i;i=l.getNaturalWidth(e),t="function"==typeof this.availableWidths?this.availableWidths(e):this.determineAppropriateResolution(e),e.width=t,!this.isPlaceholder(e)&&i>=t||(e.src=this.changeImageSrcToUseNewImageDimensions(e.getAttribute("data-src"),t),e.removeAttribute("width"),e.removeAttribute("height"))},l.prototype.determineAppropriateResolution=function(e){return l.getClosestValue(e.getAttribute("data-width")||e.parentNode.clientWidth,this.availableWidths)},l.prototype.refreshPixelRatio=function(){this.devicePixelRatio=l.getClosestValue(l.getPixelRatio(),this.availablePixelRatios)},l.prototype.changeImageSrcToUseNewImageDimensions=function(e,t){return e.replace(/{width}/g,l.transforms.width(t,this.widthsMap)).replace(/{pixel_ratio}/g,l.transforms.pixelRatio(this.devicePixelRatio))},l.getPixelRatio=function(t){return(t||e).devicePixelRatio||1},l.createWidthsMap=function(e,t,i){for(var n={},o=e.length;o--;)n[e[o]]=t(e[o],i);return n},l.transforms={pixelRatio:function(e){return 1===e?"":"-"+e+"x"},width:function(e,t){return t[e]||e}},l.getClosestValue=function(e,t){var i=t.length,n=t[i-1];for(e=parseFloat(e);i--;)e<=t[i]&&(n=t[i]);return n},l.prototype.registerResizeEvent=function(t){var i=this;u(e,"resize",function(){i.checkImagesNeedReplacing(i.divs,t)})},l.prototype.registerScrollEvent=function(){var t=this;this.scrolled=!1,this.interval=e.setInterval(function(){t.scrollCheck()},t.scrollDelay),u(e,"scroll",function(){t.scrolled=!0}),u(e,"resize",function(){t.viewportHeight=n.documentElement.clientHeight,t.scrolled=!0})},l.getPageOffsetGenerator=function(t){return t?function(){return e.pageYOffset}:function(){return n.documentElement.scrollTop}},l.getNaturalWidth=function(){return"naturalWidth"in new Image?function(e){return e.naturalWidth}:function(e){var t=n.createElement("img");return t.src=e.src,t.width}}(),l.getPageOffset=l.getPageOffsetGenerator(Object.prototype.hasOwnProperty.call(e,"pageYOffset")),l.applyEach=o,"object"==typeof t&&"object"==typeof t.exports?t.exports=i=l:"function"==typeof define&&define.amd?define(function(){return l}):"object"==typeof e&&(e.Imager=l)}(window,document)},{}],4:[function(){openItem=function(e){e.preventDefault(),this.parentNode.classList.toggle("accordion--active");var t=this.parentNode.nextElementSibling;t.classList.toggle("accordion-list--open"),this.innerHTML=this.parentNode.classList.contains("accordion--active")?"-":"+"},[].forEach.call(document.querySelectorAll(".accordion-list__button"),function(e){e.addEventListener("click",openItem)}),openMenu=function(e){e.preventDefault();var t=document.querySelector("html");t.classList.toggle("menu-open")},[].forEach.call(document.querySelectorAll(".burger"),function(e){e.addEventListener("click",openMenu)}),collapsibleBlock=function(e){e.preventDefault();document.querySelectorAll(".collapsible-block");this.classList.toggle("open-block"),this.nextElementSibling.classList.toggle("open-block")},[].forEach.call(document.querySelectorAll(".collapsible-heading"),function(e){e.addEventListener("click",collapsibleBlock)})},{}],5:[function(){!function(e,t){var i=function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},n=function(e,t){return-1!==(" "+e.className+" ").indexOf(" "+t+" ")},o=function(e,t){n(e,t)||(e.className=""===e.className?t:e.className+" "+t)},a=function(e,t){e.className=i((" "+e.className+" ").replace(" "+t+" "," "))},r=t.documentElement,s=(e.Modernizr.prefixed("transform"),e.Modernizr.prefixed("transition")),l=function(){var e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",msTransition:"MSTransitionEnd",transition:"transitionend"};return e.hasOwnProperty(s)?e[s]:!1}();e.App=function(){var i=!1,c={},d=t.getElementById("inner-wrap"),u=!1,h="js-nav";return c.init=function(){if(!i){i=!0;var f=function(e){e&&e.target===d&&t.removeEventListener(l,f,!1),u=!1};c.closeNav=function(){if(u){var i=l&&s?parseFloat(e.getComputedStyle(d,"")[s+"Duration"]):0;i>0?t.addEventListener(l,f,!1):f(null)}a(r,h)},c.openNav=function(){u||(o(r,h),u=!0)},c.toggleNav=function(e){u&&n(r,h)?c.closeNav():c.openNav(),e&&e.preventDefault()},t.getElementById("site__title__button").addEventListener("click",c.toggleNav,!1),o(r,"js-ready")}},c}(),e.addEventListener&&e.addEventListener("DOMContentLoaded",e.App.init,!1)}(window,window.document)},{}]},{},[1]);