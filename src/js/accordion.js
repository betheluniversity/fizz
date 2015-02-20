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

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        if(globalNavBtn){globalNavBtn.addEventListener('click',toggleGlobalNav);}
        if(globalNavBtnClose){globalNavBtnClose.addEventListener('click',toggleGlobalNav);}
        if(siteTitleBtn){siteTitleBtn.addEventListener('click',toggleSiteNav);}
    }
}


function hasClass(elem, cls) {
  var str = " " + elem.className + " ";
  var testCls = " " + cls + " ";
  return(str.indexOf(testCls) != -1) ;
}

function nextByClass(node, cls) {
  while (node = node.nextSibling) {
      if (hasClass(node, cls)) {
          return node;
      }
  }
  return null;
}

collapsibleBlock = function(e) {
  e.preventDefault();
  // var subList = this.('.collapsible-block');
  this.classList.toggle('open-block');
  var next = nextByClass(this, 'collapsible-block');
  next.classList.toggle('open-block');
};

[].forEach.call(document.querySelectorAll('.collapsible-heading'), function(el){
  el.addEventListener('click',collapsibleBlock);
});