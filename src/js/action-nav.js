var actionNav = document.querySelector('.action-nav');

if(actionNav){

	var actionNavLink = actionNav.querySelectorAll('.action-nav__link');
	var actionNavContentPanel = actionNav.querySelectorAll('.action-nav__content-panel');

	document.body.addEventListener('click', function(e) {
	    if (actionNav.contains(event.target)) { 
	        openPanel(e);
	    } else {
	        shutDown();
	    }
	});

	openTags = function() {
		actionNav.classList.add('active');
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
			actionNav.addEventListener("transitionend", function aB(event) {
				removeActive();
				actionNav.removeEventListener("transitionend", aB);
			}, false);
			actionNav.classList.remove('active');
	}

	removeActive = function() {
		for (var i=0;i<actionNavContentPanel.length;i++){
			actionNavContentPanel[i].classList.remove('active');
		}
	}
}