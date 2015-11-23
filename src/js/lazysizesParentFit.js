/*! lazysizes/parent-fit - v1.3.1 */
!function(a,b){"use strict";if(a.addEventListener){var c=/\s+(\d+)(w|h)\s+(\d+)(w|h)/,d=/^picture$/i,e={getFit:function(a){var b={fit:a.getAttribute("data-parent-fit")};return b.fit?(b.parent=a.parentNode,b.parent&&d.test(b.parent.nodeName||"")&&(b.parent=b.parent.parentNode)):b.fit=(getComputedStyle(a)||{getPropertyValue:function(){}}).getPropertyValue("object-fit"),b},getImageRatio:function(b){var e,f,g,h={},i=b.parentNode,j=i&&d.test(i.nodeName||"")?i.querySelectorAll("source, img"):[b];for(e=0;e<j.length;e++)if(b=j[e],f=b.getAttribute(lazySizesConfig.srcsetAttr)||b.getAttribute("srcset")||b.getAttribute("data-pfsrcset")||b.getAttribute("data-risrcset")||"",g=b.getAttribute("media"),g=lazySizesConfig.customMedia[b.getAttribute("data-media")||g]||g,f&&(!g||(a.matchMedia&&matchMedia(g)||{}).matches)){f.match(c)&&("w"==RegExp.$2?(h.w=RegExp.$1,h.h=RegExp.$3):(h.w=RegExp.$3,h.h=RegExp.$1));break}return h.w/h.h},calculateSize:function(a,b){var c,d,e,f,g=this.getFit(a),h=g.fit,i=g.parent;return"width"==h||("contain"==h||"cover"==h)&&(e=this.getImageRatio(a))?(i?b=i.offsetWidth:i=a,f=b,"width"==h?f=b:(d=i.offsetHeight,d>40&&(c=b/d)&&("cover"==h&&e>c||"contain"==h&&c>e)&&(f=b*(e/c))),f):b}},f=function(){a.lazySizes&&(lazySizes.parentFit||(lazySizes.parentFit=e),a.removeEventListener("lazybeforeunveil",f,!0))};a.addEventListener("lazybeforeunveil",f,!0),b.addEventListener("lazybeforesizes",function(a){a.defaultPrevented||(a.detail.width=e.calculateSize(a.target,a.detail.width))}),setTimeout(f)}}(window,document);
