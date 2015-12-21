toggleGlobalNav = function(e) {
    e.preventDefault();
    document.querySelector('body').classList.toggle('js-openGlobalNav');
};

toggleSiteNav = function(e) {
    e.preventDefault();
    document.querySelector('body').classList.toggle('js-openSiteNav');
};

var globalNavBtn = document.querySelector('#js-globalNav-button');
var globalNavBtnClose = document.querySelector('#js-globalNav-button--close');
var siteTitleBtn = document.querySelector('#js-site__title__button');

if(globalNavBtn){globalNavBtn.addEventListener('click',toggleGlobalNav);}
if(globalNavBtnClose){globalNavBtnClose.addEventListener('click',toggleGlobalNav);}
if(siteTitleBtn){siteTitleBtn.addEventListener('click',toggleSiteNav);}