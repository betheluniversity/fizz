/*! lazysizes - v4.1.0 */
!function(a,b){var c=function(d){b(a.lazySizes,d),a.removeEventListener("lazyunveilread",c,!0)};b=b.bind(null,a,a.document),"object"==typeof module&&module.exports?b(require("lazysizes")):a.lazySizes?c():a.addEventListener("lazyunveilread",c,!0)}(window,function(a,b,c,d){"use strict";function e(a){var b=getComputedStyle(a,null)||{},c=b.fontFamily||"",d=c.match(j)||"",e=d&&c.match(k)||"";return e&&(e=e[1]),{fit:d&&d[1]||"",position:n[e]||e||"center"}}function f(a,b){var d,e,f=c.cfg,g=a.cloneNode(!1),h=g.style,i=function(){var b=a.currentSrc||a.src;b&&e!==b&&(e=b,h.backgroundImage="url("+(m.test(b)?JSON.stringify(b):b)+")",d||(d=!0,c.rC(g,f.loadingClass),c.aC(g,f.loadedClass)))},j=function(){c.rAF(i)};a._lazysizesParentFit=b.fit,a.addEventListener("lazyloaded",j,!0),a.addEventListener("load",j,!0),g.addEventListener("load",function(){var a=g.currentSrc||g.src;a&&a!=l&&(g.src=l,g.srcset="")}),c.rAF(function(){var d=a,e=a.parentNode;"PICTURE"==e.nodeName.toUpperCase()&&(d=e,e=e.parentNode),c.rC(g,f.loadedClass),c.rC(g,f.lazyClass),c.aC(g,f.loadingClass),c.aC(g,f.objectFitClass||"lazysizes-display-clone"),g.getAttribute(f.srcsetAttr)&&g.setAttribute(f.srcsetAttr,""),g.getAttribute(f.srcAttr)&&g.setAttribute(f.srcAttr,""),g.src=l,g.srcset="",h.backgroundRepeat="no-repeat",h.backgroundPosition=b.position,h.backgroundSize=b.fit,d.style.display="none",a.setAttribute("data-parent-fit",b.fit),a.setAttribute("data-parent-container","prev"),e.insertBefore(g,d),a._lazysizesParentFit&&delete a._lazysizesParentFit,a.complete&&i()})}var g=b.createElement("a").style,h="objectFit"in g,i=h&&"objectPosition"in g,j=/object-fit["']*\s*:\s*["']*(contain|cover)/,k=/object-position["']*\s*:\s*["']*(.+?)(?=($|,|'|"|;))/,l="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",m=/\(|\)|'/,n={center:"center","50% 50%":"center"};if(!h||!i){var o=function(a){if(a.detail.instance==c){var b=a.target,d=e(b);!d.fit||h&&"center"==d.position||f(b,d)}};a.addEventListener("lazyunveilread",o,!0),d&&d.detail&&o(d)}});