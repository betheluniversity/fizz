const toggleGlobalNav = function (e) {
    e.preventDefault()
    document.querySelector('body').classList.toggle('js-openGlobalNav')
}

const toggleSiteNav = function (e) {
    e.preventDefault()
    document.querySelector('body').classList.toggle('js-openSiteNav')
}

const globalNavBtn = document.querySelector('#js-globalNav-button')
const globalNavBtnClose = document.querySelector('#js-globalNav-button--close')
const siteTitleBtn = document.querySelector('#js-site__title__button')

if (globalNavBtn) { globalNavBtn.addEventListener('click', toggleGlobalNav) }
if (globalNavBtnClose) { globalNavBtnClose.addEventListener('click', toggleGlobalNav) }
if (siteTitleBtn) { siteTitleBtn.addEventListener('click', toggleSiteNav) }
