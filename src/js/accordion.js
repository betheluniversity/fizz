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

function hasClass (elem, cls) {
    var str = ' ' + elem.className + ' '
    var testCls = ' ' + cls + ' '
    return (str.indexOf(testCls) !== -1)
}

function nextByClass (node, cls) {
    while (node === node.nextSibling) {
        if (hasClass(node, cls)) {
            return node
        }
    }
    return null
}

const collapsibleBlock = function (e) {
    e.preventDefault()
    // var subList = this.('.collapsible-block');
    this.classList.toggle('open-block')
    var next = nextByClass(this, 'collapsible-block')
    next.classList.toggle('open-block')
};

[].forEach.call(document.querySelectorAll('.collapsible-heading'), function (el) {
    el.addEventListener('click', collapsibleBlock)
})

const showFilters = function (e) {
    e.preventDefault()
    // var subList = this.('.collapsible-block');
    var filterList = document.querySelector('.form--search-filter__filters')
    filterList.classList.toggle('open-filters')
    // var next = nextByClass(this, 'form--search-filter__filters');
    // next.classList.toggle('open-block');
};

[].forEach.call(document.querySelectorAll('.form--search-filter__button'), function (el) {
    el.addEventListener('click', showFilters)
})
