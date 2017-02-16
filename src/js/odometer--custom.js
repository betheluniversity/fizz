var Odometer = require("./odometer.min.js");
// var ScrollReveal = require("scrollreveal");

var odometers = document.getElementsByClassName('odometer');
for (var i = 0, len = odometers.length; i < len; i++) {
    var el = odometers[i];
    var od = new Odometer({
        el: el
    });
    el.innerHTML = el.getAttribute('data-final-number');
}

var proofPointCollection = document.querySelectorAll(".proof-point-collection")

sr.reveal(".proof-point-collection");