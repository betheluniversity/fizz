openNav = function(e) {

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
    el.addEventListener('click',openNav);
});