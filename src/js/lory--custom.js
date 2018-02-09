import { lory } from 'lory.js'

const hasSliders = document.querySelectorAll('.slider')
const percentage = document.querySelector('.js_percentage')

if (hasSliders !== '') {
  Array.prototype.slice
    .call(document.querySelectorAll('.slider'))
    .forEach(function (element, index) {
      if (percentage !== '') {
        lory(element, {
          rewind: true
        })
        console.log('yes perc')
      } else {
        lory(element, {})
        console.log('no perc')
      }
    })
}
