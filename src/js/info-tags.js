var infoTags = document.querySelector('.info-tags');

if(infoTags){

	var infoTagsLink = infoTags.querySelectorAll('.info-tags__link');
	var infoTagsContentPanel = infoTags.querySelectorAll('.info-tags__content-panel');

	document.body.addEventListener('click', function(e) {
	    if (infoTags.contains(event.target)) { 
	        openPanel(e);
	    } else {
	        shutDown();
	    }
	});

	openTags = function() {
		infoTags.classList.add('active');
	}

	openPanel = function(e){
		var panelNumber = e.path[0].id;
		var panelActive = document.querySelector(panelNumber).classList.contains('active');

		if(panelActive){
			shutDown();
		} else {
			openTags();
			removeActive(); // remove .active tag on an already open panel
			document.querySelector(panelNumber).classList.add('active');
		}
	}

	shutDown = function(i){
			infoTags.addEventListener("transitionend", function aB(event) {
				removeActive();
				infoTags.removeEventListener("transitionend", aB);
			}, false);
			infoTags.classList.remove('active');
	}

	removeActive = function() {
		for (var i=0;i<infoTagsContentPanel.length;i++){
			infoTagsContentPanel[i].classList.remove('active');
		}
	}
}