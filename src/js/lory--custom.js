const hasSliders = document.querySelectorAll('.slider')
// const percentage = document.querySelector('.js_percentage')

if (hasSliders.length > 0) {
  const lory = require('lory.js').lory

  Array.prototype.slice
    .call(hasSliders)
    .forEach(function (element, index) {
      const isPercentage = element.classList.contains('js_percentage')
      if (isPercentage) {
        lory(element, {
          infinite: 1
        })
      } else {
        lory(element, {})
      }
    })
}
