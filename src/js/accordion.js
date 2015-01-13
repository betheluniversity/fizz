openItem = function(e) {

    e.preventDefault();

    // Toggles <button> ^ <li> class
    this.parentNode.classList.toggle('accordion--active');

    // Moves up a node from <button> ^ <li> then next to <ul>
    var subList = this.parentNode.nextElementSibling;

    // Toggles <button> ^ <li> + <ul> class 
    subList.classList.toggle('accordion-list--open');

    // Changes button text    
    if (this.parentNode.classList.contains("accordion--active")){
        this.innerHTML = "-";
    } else {
        this.innerHTML = "+";
    }
};

[].forEach.call(document.querySelectorAll('.accordion-list__button'), function(el){
    el.addEventListener('click',openItem);
});

openMenu = function(e) {

    e.preventDefault();
    var subList = document.querySelector('html');
    subList.classList.toggle('menu-open');
};

[].forEach.call(document.querySelectorAll('.burger'), function(el){
    el.addEventListener('click',openMenu);
});

// openSiteNav = function(e) {

//     e.preventDefault();
//     var siteNav = document.querySelector('.off-canvas');
//     console.log('siteNav');
//     siteNav.classList.toggle('off-canvas--open');
// };

// [].forEach.call(document.querySelectorAll('.site__title__button'), function(el){
//     el.addEventListener('click',openSiteNav);
// });


collapsibleBlock = function(e) {
    e.preventDefault();
    var subList = document.querySelectorAll('.collapsible-block');
    this.classList.toggle('open-block');
    this.nextElementSibling.classList.toggle('open-block');
};

[].forEach.call(document.querySelectorAll('.collapsible-heading'), function(el){
    el.addEventListener('click',collapsibleBlock);
});