const hasSliders = document.querySelectorAll('.slider')
// const percentage = document.querySelector('.js_percentage')

if (hasSliders.length > 0) {
    const lory = require('lory.js').lory

    Array.prototype.slice
        .call(hasSliders)
        .forEach(function (element, index) {
            const percentage = element.classList.contains('js_percentage')
            const variableWidth = element.classList.contains('js_variableWidth')
            if (percentage) {
                lory(element, {
                    infinite: 1
                })
            } else if (variableWidth) {
                const slider = lory(element, {
                    infinite: 4,
                    slidesToScroll: 1
                })

                setInterval(function () {
                    slider.next()
                }, 4000 + 300) // interval + transition
            } else {
                lory(element, {

                })
            }
        })
}
