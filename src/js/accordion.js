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
};

[].forEach.call(document.querySelectorAll('.accordion-list__button'), function (el) {
    el.addEventListener('click', openItem)
})

// Generic collapsible block
// Ex. https://www.bethel.edu/graduate/financial-aid/types/grants-scholarships/

function toggleOpen () {
    this.classList.toggle('open-block')
}

[].forEach.call(document.querySelectorAll('.collapsible'), function (el) {
    el.addEventListener('click', toggleOpen)
})

// Collapsible filter for program search
// Ex. https://www.bethel.edu/academics/program-search

const showFilters = function (e) {
    e.preventDefault()
    var filterList = document.querySelector('.form--search-filter__filters')
    filterList.classList.toggle('open-filters')
};

[].forEach.call(document.querySelectorAll('.form--search-filter__button'), function (el) {
    el.addEventListener('click', showFilters)
})
