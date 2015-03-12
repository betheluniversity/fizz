   var didScroll = false;
   var intervalID = '';
   
   function markScroll() {
       didScroll = true;
   }

   function findProofPointCollectionParentNode(childObj){
       var testObj = childObj;
       var count = 1;
       while(true) {
           testObj = testObj.parentNode;
           if(!testObj.classList) {
               continue;
           }
           if(testObj.classList.contains('proof-point-collection')){
               break;
           }
       }
       // go up one more because we need to add to the section
       return testObj.parentNode;
   }

   window.onload = function(){
       if(document.getElementsByClassName('odometer').length > 0){
           intervalID = setInterval(function() {
               if(didScroll) {
                   doAnimations();
                   didScroll = false;
               }
           }, 100);
           window.onscroll = markScroll;
           //trigger once if the odometers are in view on load
           doAnimations();
       }   
   }



   // Function which adds the 'animated' class to any '.animatable' in view
   var doAnimations = function() {
       // Calc current offset and get all animatables
       var offset = window.scrollY + window.innerHeight,
           odometers = document.getElementsByClassName('odometer');
           done_odometers = document.getElementsByClassName('odometer_done');
       
       // Unbind scroll handler if we have no animatables
       if (odometers.length == done_odometers.length) {
         window.onscroll = "";
         clearInterval(intervalID);
       }
       for (index = 0; index < odometers.length; ++index) {
           var odometer = odometers[index];
           var scrollPos = odometer.getBoundingClientRect().top + document.body.scrollTop - document.body.clientTop + odometer.offsetHeight - 20;
           if (scrollPos < offset) {
               var ppcParent = findProofPointCollectionParentNode(odometer);
               // don't add twice
               if(!ppcParent.classList){
                   ppcParent.className = "js-animate"
               }
               else if(!ppcParent.classList.contains('js-animate')){
                ppcParent.className = ppcParent.className + " js-animate"
               }
               odometer.innerHTML = odometer.dataset.finalNumber;
               odometer.className = odometer.className + " odometer_done"
           }
       }
   };