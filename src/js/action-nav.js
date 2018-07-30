var actionNav = document.querySelector('.action-nav')

function newHandle (event) {
    if (actionNav.contains(event.target)) {
        openPanel(event)
    } else {
        shutDown()
    }
}

if (actionNav) {
    var actionNavContentPanel = actionNav.querySelectorAll('.action-nav__content-panel')
    document.body.addEventListener('mousedown', newHandle, false)
}

const openTags = function () {
    actionNav.classList.add('active')
}

const openPanel = function (e) {
    var panelNumber = e.target.id
    var panelActive = document.querySelector(panelNumber).classList.contains('active')

    if (panelActive) {
        shutDown()
    } else {
        openTags()
        removeActive() // remove .active tag on an already open panel
        document.querySelector(panelNumber).classList.add('active')
    }
}

const shutDown = function (i) {
    if (actionNav.classList.contains('active')) {
        actionNav.addEventListener('transitionend', function aB (event) {
            removeActive()
            actionNav.removeEventListener('transitionend', aB)
        }, false)
        actionNav.classList.remove('active')
    }
}

const removeActive = function () {
    for (var i = 0; i < actionNavContentPanel.length; i++) {
        actionNavContentPanel[i].classList.remove('active')
    }
}
