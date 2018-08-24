const openItem = function (e) {
    e.preventDefault()

    // Toggles <button> ^ <li> class
    this.parentNode.classList.toggle('accordion--active')

    // Moves up a node from <button> ^ <li> then next to <ul>
    var subList = this.parentNode.nextElementSibling

    // Toggles <button> ^ <li> + <ul> class
    subList.classList.toggle('accordion-list--open')

    // Changes button text
    if (this.parentNode.classList.contains('accordion--active')) {
        this.innerHTML = '-'
    } else {
        this.innerHTML = '+'
    }
}

const accordionButtons = document.querySelectorAll('.accordion-list__button')
for (let index = 0; index < accordionButtons.length; index++) {
    accordionButtons[index].addEventListener('click', openItem)
}

// Generic collapsible block
// Ex. https://www.bethel.edu/graduate/financial-aid/types/grants-scholarships/

function toggleOpen () {
    this.parentNode.classList.toggle('open-block')
}

const collapsibleHeading = document.querySelectorAll('.collapsible-heading')
for (let index = 0; index < collapsibleHeading.length; index++) {
    collapsibleHeading[index].addEventListener('click', toggleOpen)
}

// Collapsible filter for program search
// Ex. https://www.bethel.edu/academics/program-search

const showFilters = function (e) {
    e.preventDefault()
    var filterList = document.querySelector('.form--search-filter__filters')
    filterList.classList.toggle('open-filters')
}

const formFilters = document.querySelectorAll('.form--search-filter__button')
for (let index = 0; index < formFilters.length; index++) {
    formFilters[index].addEventListener('click', showFilters)
}
