var infoTags = document.querySelector('.info-tags');

if(infoTags){

	var infoTagsLink = infoTags.querySelectorAll('.info-tags__link');
	var infoTagsContentPanel = infoTags.querySelectorAll('.info-tags__content-panel');

	document.body.addEventListener('click', function(e) {
	    if (infoTags.contains(event.target)) { 
	        // toggleInfoTag(e);
	        // infoTags.classList.add('active');
	        // openTags();
	        openPanel(e);
	    } else {
	        shutDown();
	    }
	});

	openTags = function() {
		infoTags.classList.add('active');
	}

	openPanel = function(e){
		var panNum = e.path[0].id;
		var panActive = document.querySelector(panNum).classList.contains('active');

		if(panActive){
			// shutDown();
		} else {
			openTags();
			document.querySelector(panNum).classList.add('active');
		}
	}

	shutDown = function(i){
		infoTags.classList.remove('active');
		// infoTags.addEventListener("transitionend", function(event) {
			for (var i=0;i<infoTagsContentPanel.length;i++){
				infoTagsContentPanel[i].classList.remove('active');
			}
		// }, false);
	}




	// toggleInfoTag = function(e) {
	// 	var panNum = e.path[1].id;
	// 	var infoTagsActive = document.querySelector('.info-tags.active');
		
	// 	for (var i=0;i<infoTagsContentPanel.length;i++){

	// 		var loopNum = i;

	// 		if(infoTagsContentPanel[i].id == panNum){

	// 			if(infoTagsContentPanel[i].classList.contains('active') && infoTagsActive){

	// 				infoTagsActive.classList.remove('active');

	// 				var erlement = infoTagsContentPanel[i];
	// 				infoTagsActive.addEventListener("transitionend", function(event) {
	// 					erlement.classList.remove('active');

	// 				}, false);

	// 				// infoTagsContentPanel[i].classList.remove('active');
	// 			} else {
	// 				infoTagsContentPanel[i].classList.add('active');
	// 				infoTags.classList.add('active');
	// 			}
	// 		} else {
	// 			infoTagsContentPanel[i].classList.remove('active');
	// 		}
	// 	}
	// };


}