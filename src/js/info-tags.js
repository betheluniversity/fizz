var infoTags = document.querySelector('.info-tags');

toggleInfoTag = function() {
	console.log(i);
	infoTagsContentPanel[i].classList.toggle('active');
};

if(infoTags){

	var infoTagsLink = infoTags.querySelectorAll('.info-tags__link');
	var infoTagsContentPanel = infoTags.querySelectorAll('.info-tags__content-panel');

	document.body.addEventListener('click', function (event) {
	    if (infoTags.contains(event.target)) {
	        if(infoTags.classList.contains('active')) {
	        } else {
	        	infoTags.classList.add('active')
	        }
	    } else {
	        console.log('clicked outside');
	        infoTags.classList.remove('active');
	    }
	});

	for (i=0;i<infoTagsLink.length;i++){
		infoTagsLink[i].addEventListener('click', function (x) {
	        return function (e) {
	            toggleInfoTag(x, e);
	        };
	    })(i);
	}
}