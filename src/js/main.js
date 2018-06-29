var Flickity = require('flickity')
require('svg4everybody')

// Custom
require('./off-canvas.js')
require('./accordion.js')
require('./responsive-tables.js')
require('./bu_animate.js')
require('./action-nav.js')
require('./lory--custom.js')

// Select a random image from the carousel to appear first

if (document.getElementsByClassName('js-rotate-order-carousel')[0]) {
    if (typeof (Storage) !== 'undefined') {
        // Set a unique index.
        var indexOfArray = 'bethel-carousel-counter_' + document.location.pathname

        // if the storage value exists
        if (localStorage.getItem(indexOfArray)) {
            // grab the old value.
            var oldIndex = localStorage.getItem(indexOfArray)
            var maxCarouselItems = document.getElementsByClassName('js-rotate-order-carousel')[0].children.length

            if (maxCarouselItems) {
                var initialLoad = (parseInt(oldIndex) + 1) % maxCarouselItems
                try {
                    localStorage.setItem(indexOfArray, initialLoad)
                } catch (error) {
                    initialLoad = 0
                }
            }
        } else {
            try {
                // iOS Safari Prive mode reports having localStorage available but
                // does not let you write to it.
                localStorage.setItem(indexOfArray, 0)
            } catch (error) {
                initialLoad = 0
            }
        }
    } else {
        // localStorage doesn't work on browser, so just use 0
        initialLoad = 0
    }
} else {
    initialLoad = 0
}

// Flickity customizations

var carousels = document.querySelectorAll('flickity')

if (carousels.length !== 0) {
    for (var i = 0, len = carousels.length; i < len; i++) {
        var carousel = carousels[i]

        // Checking if carousel has rotate class. If this is not set
        // and there is more than one carousel on the page, Flickity can't
        // set the proper target

        if (carousel.classList.contains('js-rotate-order-carousel')) {
            var localInitialLoad = initialLoad
        } else {
            localInitialLoad = 0
        }

        var flkty = new Flickity(carousels[i], {
            wrapAround: true,
            imagesLoaded: true,
            initialIndex: localInitialLoad,
            pageDots: false,
            percentPosition: false,
            draggable: false,
            cellAlign: 'left'
        })

        flkty.on('cellSelect', function () {
            isSelected()
        })
    }
}

function onLoadeddata (event) {
    var cell = flkty.getParentCell(event.target)
    flkty.cellSizeChange(cell && cell.element)
}

if (typeof flkty !== 'undefined') {
    if (flkty.selectedElement.querySelectorAll('video')) {
        var videos = flkty.selectedElement.querySelectorAll('video')
    }

    for (var j = 0, jLen = videos.length; j < jLen; j++) {
        var video = videos[i]
        video.play()
        addEvent(video, 'loadeddata', onLoadeddata)
    }
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

// Checking for 'is-selected' on load

addEvent(window, 'load', function () {
    isSelected()
})

// This function needs a double test because some carousels
// may not have the .lazyload class applied on load. If it already
// has the class, we don't want to remove it

function isSelected () {
    var fc = document.querySelectorAll('.js-load-on-demand .flickity--cell')
    for (var i = 0; i < fc.length; i++) {
        if (fc[i].classList.contains('is-selected')) {
            if (fc[i].querySelector('img').classList.contains('lazyload')) {} else {
                fc[i].querySelector('img').classList.add('lazyload')
            }
        }
    }
}

// var gallery = document.querySelector('.flickity')
if (carousels.length > 0) {
    var flkty = new Flickity(carousels[i])
}

function onLoadeddata (event) {
    var cell = flkty.getParentCell(event.target)
    flkty.cellSizeChange(cell && cell.element)
}

// Generic addEvent function

function addEvent (obj, type, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(type, fn, false)
    } else if (obj.attachEvent) {
        obj['e' + type + fn] = fn
        obj[type + fn] = function () {
            obj['e' + type + fn](window.event)
        }
        obj.attachEvent('on' + type, obj[type + fn])
    }
}
