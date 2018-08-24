import Flickity from 'flickity'

// Select a random image from the carousel to appear first
if (document.querySelectorAll('.js-rotate-order-carousel')[0]) {
    if (typeof (Storage) !== 'undefined') {
        // Set a unique index.
        var indexOfArray = 'bethel-carousel-counter_' + document.location.pathname

        // if the storage value exists
        if (window.localStorage.getItem(indexOfArray)) {
            // grab the old value.
            var oldIndex = window.localStorage.getItem(indexOfArray)
            var maxCarouselItems = document.querySelectorAll('.js-rotate-order-carousel')[0].children.length

            if (maxCarouselItems) {
                var initialLoad = (parseInt(oldIndex) + 1) % maxCarouselItems
                try {
                    window.localStorage.setItem(indexOfArray, initialLoad)
                } catch (error) {
                    initialLoad = 0
                }
            }
        } else {
            try {
                // iOS Safari Prive mode reports having window.localStorage available but
                // does not let you write to it.
                window.localStorage.setItem(indexOfArray, 0)
            } catch (error) {
                initialLoad = 0
            }
        }
    } else {
        // window.localStorage doesn't work on browser, so just use 0
        initialLoad = 0
    }
} else {
    initialLoad = 0
}

// Flickity customizations

var carousels = document.querySelectorAll('.flickity')

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
    }
}

var carouselsCustom = document.querySelectorAll('.flickityCustom--experience')

if (carouselsCustom.length > 0) {
    var flickityCustomExperience = new Flickity('.flickityCustom--experience', {
        autoPlay: 5000,
        cellAlign: 'left',
        lazyLoad: 10,
        percentPosition: false,
        wrapAround: true
    })
}
