/* eslint-disable no-unused-vars */
import Flickity from 'flickity'

const carouselList = document.querySelectorAll('.flickity')

carouselList.forEach(carousel => {
    let maxItems = carousel.children.length
    // If carousel has rotate class, assign it a random initial slide
    let initialSlide = carousel.classList.contains('js-rotate-order-carousel') ? Math.floor(Math.random() * (maxItems) + 1) : 0

    // custom homepage slider
    if (carousel.classList.contains('flickityCustom--experience')) {
        const flickityCustomExperience = new Flickity('.flickityCustom--experience', {
            autoPlay: 3000,
            lazyLoad: true,
            wrapAround: true,
            pageDots: true
        })
    }

    let flkty = new Flickity(carousel, {
        initialIndex: initialSlide,
        wrapAround: true,
        lazyLoad: true
    })
})
